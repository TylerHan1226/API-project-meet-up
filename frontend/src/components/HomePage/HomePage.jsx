// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './HomePage.css'
import { FaPeopleGroup } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { GiBarracksTent } from "react-icons/gi";

function HomePage() {

  return (
    <div className='homepage-container'>

        <div id='homepage-description-container'>
            <div id='homepage-description'>
                <h1>The people platform - Where interests become friendship</h1>
                <span>This is where you can find the people sharing interests with you!</span>
            </div>
            <FaPeopleGroup id='homepage-description-icon' />
        </div>

        <div id='homepage-link-container'>
            <h2 id='homepage-link-title'>How Meetup works</h2>
            <div id='homepage-links'>
                <div className='homepage-actions'>
                    <GiBarracksTent className='homepage-action-icons' />
                    <h4>See all groups</h4> {/* change to NavLinks */}
                </div>
                <div className='homepage-actions'>
                    <MdEventAvailable className='homepage-action-icons' />
                    <h4>Find an event</h4> {/* change to NavLinks */}
                </div>
                <div className='homepage-actions'>
                    <MdGroups2 className='homepage-action-icons' />
                    <h4>Start a new group</h4> {/* change to NavLinks */}
                </div>
            </div>
        </div>

    </div>
  );
}

export default HomePage;
