import './sign-in.styles.scss';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  return (
    <div className='sign-in'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default SignIn;
