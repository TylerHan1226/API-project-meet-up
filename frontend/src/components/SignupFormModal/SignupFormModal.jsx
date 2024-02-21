import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  let buttonActive = !(
    email.length < 1 ||
    username.length < 4 ||
    firstName.length < 1 ||
    lastName.length < 1 ||
    password.length < 6 ||
    confirmPassword.length < 6
    )

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id='popup-form-container'>
      <h1 className='popup-form-title'>Sign Up</h1>
      <form className='popup-sign-up-form' onSubmit={handleSubmit}>
        <label className='label'>
          Email 
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='error-message'>* {errors.email}</p>}
        <label className='label'>
          Username 
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='error-message'>* {errors.username}</p>}
        <label className='label'>
          First Name 
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='error-message'>* {errors.firstName}</p>}
        <label className='label'>
          Last Name 
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='error-message'>* {errors.lastName}</p>}
        <label className='label'>
          Password 
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='error-message'>* {errors.password}</p>}
        <label className='label'>
          Confirm Password 
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className='error-message'>* {errors.confirmPassword}</p>}
        <button type="submit" disabled={!buttonActive}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
