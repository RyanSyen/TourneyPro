import detectBrowserLanguage from 'detect-browser-language';
import { atom } from 'jotai';

const langCode = detectBrowserLanguage().split('-')[0];

const browserLangAtom = atom(langCode);

export default browserLangAtom;
