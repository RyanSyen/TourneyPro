import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
// eslint-disable-next-line import/no-unresolved
import { fx_dayjs } from 'lib/dayjs';

const getEncryptionKey = async () => {
  const AGK = JSON.parse(localStorage.getItem('AGK')); // aesGcmKey
  const isExp = AGK.exp < fx_dayjs.CurrentUTC();

  if (AGK && isExp) return AGK.key;

  const newKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true, // extractable
    ['encrypt', 'decrypt']
  );
  const exportedKey = await window.crypto.subtle.exportKey('raw', newKey);
  const base64Key = btoa(
    String.fromCharCode.apply(null, new Uint8Array(exportedKey))
  );

  const encObj = {
    key: base64Key,
    exp: fx_dayjs.NextDayUTC(),
  };

  localStorage.setItem('AGK', JSON.stringify(encObj));

  return base64Key;
};

export async function encrypt(base64Key, text) {
  try {
    // decode base64 string to binary data
    const binaryData = atob(base64Key);

    // create Unit8Array from binary data
    const keyBuffer = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i += 1) {
      keyBuffer[i] = binaryData.charCodeAt(i);
    }

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );

    // Generate a random initialization vector (IV)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the plain text
    const plainTextBuffer = new TextEncoder().encode(text);
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      plainTextBuffer
    );

    // Combine the IV and encrypted buffer for decryption later
    const resultBuffer = new Uint8Array(12 + encryptedBuffer.byteLength);
    resultBuffer.set(iv);
    resultBuffer.set(new Uint8Array(encryptedBuffer), 12);

    // Convert the result to a base64 string
    const resultBase64 = btoa(String.fromCharCode(...resultBuffer));

    return resultBase64;
  } catch (error) {
    console.error('Error encrypting text', error);
    return false;
  }
}

export async function decrypt(base64Key, base64String) {
  try {
    // Convert base64 input to ArrayBuffer
    const inputBinary = atob(base64String);
    const inputBuffer = new Uint8Array(inputBinary.length);
    for (let i = 0; i < inputBinary.length; i += 1) {
      inputBuffer[i] = inputBinary.charCodeAt(i);
    }

    // Extract iv and encrypted data
    const iv = inputBuffer.slice(0, 12);
    const encryptedData = inputBuffer.slice(12);

    // Convert base64 key to ArrayBuffer
    const binaryData = atob(base64Key); // Decode base64 string to binary data
    // Create Uint8Array from binary data
    const keyBuffer = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i += 1) {
      keyBuffer[i] = binaryData.charCodeAt(i);
    }

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    const decryptedData = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encryptedData
    );

    // Convert decrypted buffer into string
    const decryptedText = new TextDecoder().decode(decryptedData);
    console.log(decryptedText);
    return decryptedText;
  } catch (error) {
    console.error('Error decrypting text', error);
    return '';
  }
}

export async function getCountry() {
  //! called 4 times, need to optimize this
  const res = await axios.get('https://freeipapi.com/api/json/');
  const data = {
    country: '',
    countryCode: '',
  };

  // console.log(res);

  if (res.status === 200) {
    data.country = res.data.countryName;
    data.countryCode = res.data.countryCode;
    return data;
    // eslint-disable-next-line no-else-return
  } else {
    // const res2 = await axios.get('http://ip-api.com/json/');
    // if (res2.data.status === 'success') {
    //   data.country = res2.data.country;
    //   data.countryCode = res2.data.countryCode;
    //   return data;
    // }
  }

  return data;
}
