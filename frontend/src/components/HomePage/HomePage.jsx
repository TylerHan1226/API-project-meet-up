import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
import { useModal } from '../../context/Modal';

import './HomePage.css'
import { FaPeopleGroup } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { GiBarracksTent } from "react-icons/gi";
import SignupFormModal from '../SignupFormModal';

function HomePage() {

    let showSignupModal = false
    const { setModalContent, setOnModalClose } = useModal(); //getting the hooks from Modal
    const onClick = () => {
        if (showSignupModal) setOnModalClose(showSignupModal)
        setModalContent(<SignupFormModal />)
    }

    return (
        <div id='homepage-container'>

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
                        {/* <h4>See all groups</h4> change to NavLinks */}
                        <NavLink to='/groups'>See all groups</NavLink>
                    </div>
                    <div className='homepage-actions'>
                        <MdEventAvailable className='homepage-action-icons' />
                        <NavLink to='/events'>Find an event</NavLink>
                    </div>
                    <div className='homepage-actions'>
                        <MdGroups2 className='homepage-action-icons' />
                        <NavLink to='/groups/create'>Start a new group!</NavLink>
                    </div>
                </div>
            </div>

            <button id='join-meetup-button' onClick={onClick}>Join Meetup</button>

        </div>
    );
}

export default HomePage;
