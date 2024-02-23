import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom"
import { useModal } from "../../context/Modal";

import { IoChevronBack } from "react-icons/io5";
import { FaPersonRunning } from "react-icons/fa6";
import { WiTime4 } from "react-icons/wi";
import { TbPigMoney } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";


import { fetchEventByIdThunk } from "../../store/events"
import DeleteEventModal from "./DeleteEventModal";
import './Events.css'


function EventDetails() {
    const { eventId } = useParams()
    const dispatch = useDispatch()

    const event = useSelector(state => state.events.eventDetails)[eventId]
    const group = useSelector(state => state.events.groupDetails)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchEventByIdThunk(eventId))
    }, [dispatch, eventId])


    //delete button
    let showDeleteModal = false
    const { setModalContent, setOnModalClose } = useModal()
    const openDeleteMenu = () => {
        if (showDeleteModal) setOnModalClose(showDeleteModal)
        setModalContent(<DeleteEventModal eventId={event.id} />)
    }
    if (!event || !group || !eventId) {
        return (
            <h2><FaPersonRunning /> loading ...</h2>
        )
    }
    //organizer name
    // const groupDetail = group[eventId]
    const groupDetail = group[eventId];
    const organizerFirstName = groupDetail && groupDetail.Organizer ? groupDetail.Organizer.firstName : '';
    const organizerLastName = groupDetail && groupDetail.Organizer ? groupDetail.Organizer.lastName : '';
    //preview img
    let previewImgUrl = ''
    if (event.EventImages) {
        previewImgUrl = event.EventImages.filter((image) => image.preview === true)[0].url
    }
    //isPublic?
    let isPublic = 'Public'
    if (event.private == true) {
        isPublic = 'Private'
    }
    //get group img
    const groupImgUrlArr = groupDetail && groupDetail.GroupImages ? groupDetail.GroupImages : [];
    const groupImgUrl = groupImgUrlArr.length > 0 ? groupImgUrlArr.filter((img) => img.preview === true)[0].url : '';
    
    //event start/end date
    const eventStartDate = event.startDate.split(' ')[0]
    const eventStartTime = event.startDate.split(' ')[1]
    const eventEndDate = event.endDate.split(' ')[0]
    const eventEndTime = event.endDate.split(' ')[1]

    console.log('event ==>', event)
    console.log('group ==>', group)
    console.log('currentUser ==>', currentUser)
    //show button?
    let isCreator = false
    if (groupDetail && currentUser.id == groupDetail.Organizer.id) {
        isCreator = true
    }



    //callbacks
    const featureAlert = () => {
        alert("Feature coming soon!");
    }

    return (
        <>

            {event ? ( // Added null check here
                <section id='event-detail-page-container'>
                    <NavLink className='back-button' to={`/events`}><IoChevronBack /> events</NavLink>

                    <section id='event-detail-container'>
                        <div className="event-detail-header-container">
                            <h1>{event.name}</h1>
                            <p>Hosted by: {organizerFirstName} {organizerLastName}</p>
                        </div>

                        <section id='event-detail-page-background'>

                            <div id="previewImg-and-detail-container">
                                <img className='preview-img' src={previewImgUrl} alt='event preview img' />
                                <div id="event-basic-detail-container">
                                    <div id='event-group-info-container'>
                                        <img className="event-group-img" src={groupImgUrl} alt='group image' />
                                        <div id='event-group-detail-container'>
                                            <h3>{event.Group.name}</h3>
                                            <p>{isPublic}</p>
                                        </div>
                                    </div>
                                    <div id='event-basic-info-container'>
                                        <div className="event-detail-icons">
                                            <WiTime4 className="event-detail-icon" />
                                            <TbPigMoney className="event-detail-icon" />
                                            <IoLocationOutline className="event-detail-icon" />
                                        </div>
                                        <div className="event-detail-texts">
                                            <p className="event-box-texts">Start {eventStartDate} · {eventStartTime}</p>
                                            <p className="event-box-texts">End {eventEndDate} · {eventEndTime}</p>
                                            <p className="event-box-texts">{event.price} $</p>
                                            <p className="event-box-texts">{event.type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isCreator ? <div className="event-action-buttons-container">
                                <button className="event-action-button" >Update</button>
                                <button className="event-action-button" onClick={openDeleteMenu}>Delete</button>
                            </div> : (
                                <div className="event-action-buttons-container">
                                    <button className="event-action-button" onClick={featureAlert}>Join this Event!</button>
                                </div>                      
                            )}

                            <div className="event-description-container">
                                <h3>Description</h3>
                                <p>{event.description}</p>
                            </div>

                        </section>
                    </section>
                </section>
            ) : (
                <h2><FaPersonRunning /> Loading ...</h2> // Render a message if no images
            )}
        </>
    )
}

export default EventDetails