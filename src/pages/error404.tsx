import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Btn from 'src/components/inputs/button/Button.tsx';

import illustration from '../assets/error404-illustration.png';

const Error404 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.pathname.match(/^\/([^/]+)/)![1] ?? null;
  const { t: localizer, i18n } = useTranslation('global');

  useEffect(() => {
    // handle invalid links with translation
    const validLang = i18n.languages.includes(language);
    if (validLang) i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="error-container">
      <div className="error-illustration">
        <img src={illustration} alt="error illustration" loading="lazy" />
      </div>
      <div className="error-description">
        <Typography
          align="left"
          gutterBottom
          noWrap
          variant="h4"
          sx={{ color: '#fcfcfc', fontWeight: 600 }}
        >
          {localizer('Title_Error404')}
        </Typography>
        <Typography
          align="left"
          gutterBottom
          noWrap
          variant="h6"
          sx={{ color: '#fcfcfc' }}
        >
          {localizer('Description_Error404')}
        </Typography>
        <Box sx={{ paddingTop: '1rem' }}>
          <Btn
            variant="filledPrimary"
            disabled={false}
            size="medium"
            // startIcon={}
            // endIcon={}
            isUploadBtn={false}
            text={localizer('Button_BackToHome')}
            onClick={() => navigate('/')}
          />
        </Box>
      </div>
    </div>
  );
};

export default Error404;
