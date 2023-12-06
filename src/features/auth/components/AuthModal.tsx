import BaseModal from 'components/feedback/modal/Modal.tsx';
import useLogin from 'features/auth/hooks/useLogin.ts';
import useRegister from 'features/auth/hooks/useRegister.ts';
import { useTranslation } from 'react-i18next';

import AuthWrapper from './AuthModal.styles.ts';
import SignInForm from './SignInForm.tsx';

const AuthModal = () => {
  const { t: localizer } = useTranslation('global');
  const login = useLogin();
  const register = useRegister();

  if (register.isSignUp) {
    return (
      <BaseModal
        open={register.isSignUp}
        onClose={register.close}
        title={localizer('Label_SignUp')}
        desc=""
      >
        <AuthWrapper>Sign up</AuthWrapper>
      </BaseModal>
    );
  }
  return (
    <BaseModal
      open={login.isOpen}
      onClose={login.close}
      title={localizer('Label_SignIn')}
      desc={localizer('Label_WelcomeBack')}
    >
      <AuthWrapper>
        <SignInForm />
      </AuthWrapper>
    </BaseModal>
  );
};

export default AuthModal;
