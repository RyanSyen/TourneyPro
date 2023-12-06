import detectBrowserLanguage from 'detect-browser-language';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const browserLangAtom = atom('');

const useAppLang = () => {
  const [lang, setLang] = useAtom(browserLangAtom);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const langCode = detectBrowserLanguage().split('-')[0];
    const path = `/${langCode}/home`;

    if (location.pathname !== path) {
      nav(path);
      setLang(langCode);
    }
  }, [location, nav]);

  const getUrlLang = () => {
    const lang = location.pathname.split('/')[1];
    console.log(lang);
  };

  return {
    lang,
    getUrlLang,
  };
};

export default useAppLang;
