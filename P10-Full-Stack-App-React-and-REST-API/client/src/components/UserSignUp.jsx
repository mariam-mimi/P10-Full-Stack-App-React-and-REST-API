import { useContext, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  // Allows a new user to sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Creates a new user
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };
    // Different options for a post request
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user),
    }
    // the post request
    try {
      const response = await fetch('https://full-stack-react-app-production-13be.up.railway.app/api/users', fetchOptions);
      // If the user is created successfully, sign in the user
      if (response.status === 201) {
        actions.signIn({ username: user.emailAddress, password: user.password });
        console.log('Sign up successful');
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch(error) {
      console.log('Error:', error);
      // shows error when issue signing up
      navigate('/error');
    }
  }

  // cancels the sign up process
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  }

  return (
    <main>
        <div className="form--centered">
            <h2>Sign Up</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" ref={firstName} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" ref={lastName} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    </main>
  )
}

export default UserSignUp