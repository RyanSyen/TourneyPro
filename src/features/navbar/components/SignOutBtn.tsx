import { useSignOut } from 'react-firebase-hooks/auth';
import CustomLoader from 'src/components/common/CustomLoader';
import Btn from 'src/components/inputs/button/Button';
import auth from 'src/lib/firebase/initAuth';

const SignOutBtn = () => {
  const [signOut, loading, error] = useSignOut(auth);

  if (loading) return <CustomLoader />;

  if (error) console.error(error);

  return (
    <Btn
      disableRipple
      disableFocusRipple
      disableTouchRipple
      variant="login"
      disabled={false}
      size="medium"
      isUploadBtn={false}
      type="button"
      onClick={async () => {
        const success = await signOut();
        if (success) console.log('signed out successfully');
      }}
    >
      sign out
    </Btn>
  );
};

export default SignOutBtn;
