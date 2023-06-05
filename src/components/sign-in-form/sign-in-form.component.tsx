import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    // switch (error.code) {
    //   case 'auth/cancelled-popup-request':
    //     alert('Authentication with Google was canceled');
    //     break;
    //   case 'auth/popup-closed-by-user':
    //     alert('Authentication with Google was closed by user');
    //     break;
    //   case 'auth/popup-blocked':
    //     alert('Blocked by Firebase');
    //     break;

    //   default:
    //     console.log(error.code);
    // }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(emailSignInStart(email, password));

    resetFormFields();
    //   switch (error.code) {
    //     case 'auth/wrong-password':
    //       alert('Incorrect password for email');
    //       break;
    //     case 'auth/user-not-found':
    //       alert('No user associated with this email');
    //       break;
    //     case 'auth/network-request-failed':
    //       alert('Blocked by Firebase');
    //       break;

    //     default:
    //       console.log(error.code);
    //   }
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          value={password}
          onChange={handleChange}
          minLength={6}
        />

        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign in With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
