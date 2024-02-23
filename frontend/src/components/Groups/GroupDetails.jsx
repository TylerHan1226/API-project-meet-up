import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchGroupDetailThunk } from "../../store/groups";
import { useModal } from '../../context/Modal';
import DeleteGroupModal from "./DeleteGroupModal";

import { IoChevronBack } from "react-icons/io5";
import { FaPersonRunning } from "react-icons/fa6";
import EventsList from '../Events/EventsList'
import { fetchEventsByGroupThunk } from "../../store/events";

function GroupDetails() {

    const { groupId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const group = useSelector(state => state.groups.Group);


    const events = useSelector(state => state.events.events.Events)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchGroupDetailThunk(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        if (!events) {
            dispatch(fetchEventsByGroupThunk(groupId))
        }
    }, [dispatch, groupId])

    let previewImgUrl = ''
    let isPublic = 'Public'
    let displayJoinButton = true
    let displayActionButtons = false
    let showDeleteModal = false
    if (groupId && group && events) {
        if (group.GroupImages.length !== 0) {
            previewImgUrl = group.GroupImages.filter((image) => image.preview === true)[0].url
        }
        if (group.private == true) {
            isPublic = 'Private'
        }
        //check current user relationship with current group
        if (currentUser) {
            const currentUserId = currentUser.id
            const groupOrganizerId = group.organizerId
            if (groupOrganizerId == currentUserId) {
                displayJoinButton = false
                displayActionButtons = true
            }
        } else {
            displayJoinButton = false
        }
    }

    const { setModalContent, setOnModalClose } = useModal();
    const openDeleteMenu = () => {
        if (showDeleteModal) setOnModalClose(showDeleteModal)
        setModalContent(<DeleteGroupModal groupId={groupId} />)
    }

    //callback functions
    const featureAlert = () => {
        alert("Feature coming soon!");
    }
    const handleUpdateGroup = () => {
        navigate(`/groups/${groupId}/update`)
    }
    const handleCreateEvent = () => {
        navigate(`/groups/${groupId}/events/create`)
    }

    return (
        <>

            {group ? (
                <section id='group-detail-page-container'>

                    <NavLink className='back-button' to={`/groups`}><IoChevronBack /> groups</NavLink>

                    <div className="img-detail-container">
                        {previewImgUrl ? <img className='preview-img' src={previewImgUrl} alt='group preview img' /> : <div>* new img feature coming soon!</div>}
                        <div className="group-details">
                            <h2>{group.name}</h2>
                            <p>{group.city}, {group.state}</p>
                            <p>Organized by: {group.Organizer.firstName} {group.Organizer.lastName}</p>
                            {events && group && <p>{events.length} events · {isPublic}</p>}
                            <div className="action-buttons-container">
                                {displayActionButtons && <button className="group-action-button" onClick={handleCreateEvent}>Create event</button>}
                                {displayActionButtons && <button className="group-action-button" onClick={handleUpdateGroup}>Update</button>}
                                {displayActionButtons && <button className="group-action-button" onClick={openDeleteMenu}>Delete</button>}
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
                            {events && <div className='detail-section'>
                                <h3>Events ({events.length})</h3>
                                <EventsList groupId={groupId} />
                            </div>}
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
