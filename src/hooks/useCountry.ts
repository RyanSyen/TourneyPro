import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { getCountry } from 'src/util/helper';

interface ICountry {
  country: string;
  countryCode: string;
}

const countryAtom = atom<ICountry | undefined>(undefined);

const useCountry = () => {
  const [country, setCountry] = useAtom(countryAtom);
  const isDataFetched = useRef(false);

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const data = await getCountry();
        setCountry(data);
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching country data:', error);
      }
    };

    if (!isDataFetched.current) {
      getCountryData();
      isDataFetched.current = true;
    }
  }, [setCountry]);

  return country;
};

export { useCountry };
export type { ICountry };
