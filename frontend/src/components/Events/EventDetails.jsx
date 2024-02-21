import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchEventsByIdThunk } from "../../store/events"
import { IoChevronBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";


function EventDetails() {
    const { eventId } = useParams()
    const dispatch = useDispatch()

    const event = useSelector(state => state.events.eventDetails)[eventId]
    if (event) {
        console.log('events ===>', event)
    }
    useEffect(() => {
        dispatch(fetchEventsByIdThunk(eventId))
    }, [dispatch])
    let previewImgUrl = ''
    if (event) {
        previewImgUrl = event.EventImages.filter((image) => image.preview === true)[0].url
    }

    return (
        <>

            {event ? ( // Added null check here
                <section id='event-detail-page-container'>
                    <NavLink className='back-button' to={`/events`}><IoChevronBack /> events</NavLink>
                    <div className="img-detail-container">
                        <img id='group-preview-img' src={previewImgUrl} alt='event preview img' />
                        <div className="event-details">
                            <button>Join this event</button>
                        </div>
                    </div>
                    <section id='event-detail-background-color'>
                        <div id='event-detail-container'>
                            <p>event details</p>
                        </div>
                    </section>
                </section>
            ) : (
                <p>No images available</p> // Render a message if no images
            )}
        </>
    )
}

export default EventDetails