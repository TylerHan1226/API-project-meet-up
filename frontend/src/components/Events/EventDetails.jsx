import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchEventByIdThunk } from "../../store/events"
import { IoChevronBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";

import { FaPersonRunning } from "react-icons/fa6";
import { WiTime4 } from "react-icons/wi";
import { TbPigMoney } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";

import './Events.css'


function EventDetails() {
    const { eventId } = useParams()
    const dispatch = useDispatch()

    const event = useSelector(state => state.events.eventDetails)[eventId]
    const group = useSelector(state => state.events.groupDetails)

    useEffect(() => {
        dispatch(fetchEventByIdThunk(eventId))
    }, [dispatch])

    let groupImgUrl = ''
    let isPublic = 'Public'
    let previewImgUrl = ''
    if (event && group) {
        console.log('event ===>', event)
        previewImgUrl = event.EventImages.filter((image) => image.preview === true)[0].url
        if (event.private == true) {
            isPublic = 'Private'
        }
        if (group[eventId]) {
            const groupImgUrlArr = group[eventId].GroupImages
            groupImgUrl = groupImgUrlArr.filter((img) => {
                return img.preview === true
            })[0].url
        }
    }

    return (
        <>

            {event ? ( // Added null check here
                <section id='event-detail-page-container'>
                    <NavLink className='back-button' to={`/events`}><IoChevronBack /> events</NavLink>

                    <div id="img-detail-container">
                        <img id='group-preview-img' src={previewImgUrl} alt='event preview img' />

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
                                    <div className="start-end-date">
                                        <p>START   {event.startDate}</p>
                                        <p>END   {event.endDate}</p>
                                    </div>
                                    <p className="event-price">{event.price} $</p>
                                    <p className="event-type">{event.type}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
            ) : (
                <h2><FaPersonRunning /> Loading ...</h2> // Render a message if no images
            )}
        </>
    )
}

export default EventDetails