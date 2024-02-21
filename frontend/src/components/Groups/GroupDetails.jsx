import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchGroupDetailThunk } from "../../store/groups";

import { IoChevronBack } from "react-icons/io5";
import { FaPersonRunning } from "react-icons/fa6";
import EventsList from '../Events/EventsList'

function GroupDetails() {

    const { groupId } = useParams()
    const dispatch = useDispatch()
    const group = useSelector(state => state.groups.Group);

    let events = []
    events = useSelector(state => state.events.events.Events)
    const currentUser = useSelector(state => state.session.user)
    console.log('currentUser ==>', currentUser)
    useEffect(() => {
        dispatch(fetchGroupDetailThunk(groupId))
    }, [dispatch, groupId])

    let previewImgUrl = ''
    let isPublic = 'Public'
    let displayJoinButton = true
    let displayActionButtons = false
    if (group && events) {
        previewImgUrl = group.GroupImages.filter((image) => image.preview === true)[0].url
        if (group.private == true) {
            isPublic = 'Private'
        }
        //check current user relationship with current group
        if (currentUser) {
            const currentUserId = currentUser.id
            const groupOrganizerId = group.organizerId
            // console.log('currentUser ==>', currentUser)
            // console.log('currentUserId ==>', currentUserId)
            // console.log('groupOrganizerId ==>', groupOrganizerId)
            if (groupOrganizerId == currentUserId) {
                displayJoinButton = false
                displayActionButtons = true
            }
        } else {
            displayJoinButton = false
        }
    }

    const featureAlert = () => {
        alert("Feature coming soon!");
    }

    return (
        <>

            {group ? (
                <section id='group-detail-page-container'>

                    <NavLink className='back-button' to={`/groups`}><IoChevronBack /> groups</NavLink>

                    <div className="img-detail-container">
                        <img id='group-preview-img' src={previewImgUrl} alt='group preview img' />
                        <div className="group-details">
                            <h2>{group.name}</h2>
                            <p>{group.city}, {group.state}</p>
                            <p>Organized by: {group.Organizer.firstName} {group.Organizer.lastName}</p>
                            {events && group && <p>{events.length} events · {isPublic}</p>}
                            <div className="action-buttons-container">
                                {displayActionButtons && <button className="group-action-button">Create event</button>}
                                {displayActionButtons && <button className="group-action-button">Update</button>}
                                {displayActionButtons && <button className="group-action-button">Delete</button>}
                            </div>
                            {displayJoinButton && <button className="join-group-button" onClick={featureAlert}>Join this group</button>}
                        </div>
                    </div>
                    <section id='group-detail-background-color'>
                        <div id='group-detail-container'>
                            <div className='detail-section'>
                                <h3 className='detail-title'>Organizer</h3>
                                <h5 className='detail-text'>{group.Organizer.firstName} {group.Organizer.lastName}</h5>
                            </div>
                            <div className='detail-section'>
                                <h3 className='detail-title'>What we are about</h3>
                                <h5 className='detail-text'>{group.about}</h5>
                            </div>
                            <div className='detail-section'>
                                <EventsList groupId={groupId} />
                            </div>
                        </div>
                    </section>

                </section>

            ) : (
                <h2><FaPersonRunning /> loading ...</h2> // Render a message if no images
            )}

        </>
    )
}

export default GroupDetails
