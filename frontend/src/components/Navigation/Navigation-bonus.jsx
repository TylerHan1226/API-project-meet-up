import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

import { FaMeetup } from "react-icons/fa"; //react icon

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // return (
  //   <ul>
  //     <li>
  //       <NavLink to="/">
  //         <FaMeetup className='app-icon' />
  //       </NavLink>
  //     </li>
  //     {isLoaded && (
  //       <li>
  //         <ProfileButton user={sessionUser} />
  //       </li>
  //     )}
  //   </ul>
  // );
  return (

    <div id="header-container">
      <NavLink to="/">
        <FaMeetup className='app-icon' />
      </NavLink>
      <div id="user-auth">
      {isLoaded && (
          <ProfileButton user={sessionUser} />
      )}
      </div>
    </div>
  );
}

export default Navigation;
