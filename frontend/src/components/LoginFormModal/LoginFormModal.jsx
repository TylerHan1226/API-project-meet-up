import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  let buttonActive = !(credential.length < 4 || password.length < 6)

  // console.log("errors ==>", errors)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        // console.log("data ==> ", data)
        if (data && data.message) {
          setErrors(data);
        }
      });
  };

  // const demoCredential = 'user1@user.io'
  // const demoPassword = 'password'
  const handleDemoLogin = () => {
    setCredential('user1@user.io')
    setPassword('password')
  }



  return (
    <div className='popup-form-container'>
      <h1>Log In</h1>
      <form className='popup-user-form' onSubmit={handleSubmit}>
        <label className='label'>
        Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='label'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.message && <p className='error-message'>* {errors.message}</p>}
        <button className='user-red-button' type="submit" disabled={!buttonActive}>Log In</button>
        <button className='demo-user-button' type="submit" onClick={handleDemoLogin}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
