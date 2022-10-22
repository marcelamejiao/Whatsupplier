import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import SignUpImage from '../images/elements-web-design-opt.png'

import Auth from '../utils/auth';
import { SignupBody } from '../components/styles/Signup.styled';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    companyName: '',
    companyDetails: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SignupBody>
      <div className="card">
        <h4>Sign Up</h4>
        <div>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <p>Username</p>
              <input
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
              <p>E-mail</p>
              <input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <p>Password</p>
              <input
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <p>Company Name</p>
              <input
                placeholder="Company Name"
                name="companyName"
                type="text"
                value={formState.companyName}
                onChange={handleChange}
              />
              <p>Company Details</p>
              <input
                placeholder="Company Details"
                name="companyDetails"
                type="text"
                value={formState.companyDetails}
                onChange={handleChange}
              />
              <button
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </form>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
      <img src={SignUpImage} alt='signup'></img>
    </SignupBody>
  );
};

export default Signup;

