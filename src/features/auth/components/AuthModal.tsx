import BaseModal from 'components/feedback/modal/Modal.tsx';
import useRegister from 'features/auth/hooks/useRegister.ts';
import { useTranslation } from 'react-i18next';
import useModal from 'src/features/navbar/hooks/useModal.ts';

import AuthWrapper from './AuthModal.styles.ts';
import SignInForm from './SignInForm.tsx';
import SignUpForm from './SignUpForm.tsx';

const AuthModal = () => {
  const { t: localizer } = useTranslation('global');
  const register = useRegister();
  const { isOpenModal, close } = useModal();

  return (
    <BaseModal
      open={isOpenModal}
      onClose={() => {
        register.close(); // reset to open sign in form
        close();
      }}
      title={
        register.isSignUp
          ? localizer('Label_SignUp')
          : localizer('Label_SignIn')
      }
      desc={register.isSignUp ? '' : localizer('Label_WelcomeBack')}
    >
      <AuthWrapper>
        {register.isSignUp ? <SignUpForm /> : <SignInForm />}
      </AuthWrapper>
    </BaseModal>
  );
};

export default AuthModal;
