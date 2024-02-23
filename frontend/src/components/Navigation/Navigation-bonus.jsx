import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

import { FaMeetup } from "react-icons/fa"; //react icon

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // console.log('sessionUser ==>', sessionUser)
  let displayStartNewGroup = false
  if (sessionUser) {
    displayStartNewGroup = true
  }


  return (

    <div id="header-container">

      <NavLink to="/">
        <FaMeetup className='app-icon' />
      </NavLink>

      <div id="start-new-group">
        {isLoaded && displayStartNewGroup && (
          <NavLink className="start-new-group-link" to='/groups/create'>Start a new group!</NavLink>
        )}
      </div>

      <div id="user-auth">
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>

    </div>
  );
}

export default Navigation;
