import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const useMainLayout = () => {
  const { i18n } = useTranslation('global');
  const { language } = useParams();
  const [isLangValid, setIsLangValid] = useState(true);

  useEffect(() => {
    const validLang = i18n.languages.includes(language!.toString());
    // console.log('validLang', validLang);
    setIsLangValid(validLang);
    if (!validLang) i18n.changeLanguage(language);
  }, [language]);

  return { isLangValid };
};

export default useMainLayout;
