// import { atom, useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import browserLangAtom from 'src/atoms/browserLangAtom';

// const langAtom = atom('');

const useLanguageDropdown = () => {
  const { language } = useParams();
  const [lang, setLang] = useState(language);
  const { i18n } = useTranslation('global');
  const nav = useNavigate();
  const location = useLocation();

  const onChange = useCallback(
    (val: unknown) => {
      const value = val ?? '';
      setLang(value.toString());
      i18n.changeLanguage(value.toString());

      const newPath = location.pathname.replace(
        /^\/[a-z]{2}/,
        `/${value.toString()}`
      );
      nav(newPath);
    },
    [lang]
  );

  return {
    lang,
    onChange,
  };
};

export default useLanguageDropdown;
