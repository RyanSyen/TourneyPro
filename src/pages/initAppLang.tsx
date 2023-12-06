import detectBrowserLanguage from 'detect-browser-language';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InitAppLang = () => {
  console.log('init app lang');
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lang = detectBrowserLanguage().split('-')[0];
    const path = `/${lang}/home`;

    if (location.pathname !== path) {
      nav(path);
    }
  }, [location, nav]);
  return null;
};

export default InitAppLang;
