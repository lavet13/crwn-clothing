import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = event => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // confirm that the password matches confirmPassword
    if (!(password === confirmPassword)) return;

    // authenticate that user with email and password
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      user.displayName = displayName;
      console.log(user);

      // create a user doc from what we got authenticated
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);

      setFormFields(defaultFormFields);
      setError(null);
    } catch (error) {
      const message = error.message;
      console.log(message);
      setError({ message });
    }
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='displayName'>Display Name</label>
        <input
          type='text'
          id='displayName'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <label htmlFor='confirm-password'>Confirm password</label>
        <input
          type='password'
          id='confirm-password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />

        <button type='submit'>Sign Up</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default SignUpForm;
