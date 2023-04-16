import { useState } from 'react';

import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = event => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('Wrong password');
      } else {
        console.log(error.code);
      }
    }
  };

  return (
    <div className='sign-in-container'>
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
          minLength='6'
        />

        <Button type='submit'>Sign In</Button>
        <Button type='button' buttonType='google' onClick={logGoogleUser}>
          Sign in With Google Popup
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
