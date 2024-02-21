import { Link } from 'react-router-dom'
import '../Groups/Groups.css'

function EventItem({ event, eventDetail }) {
    
    return (
        event.id && eventDetail && (
            <Link id='event-item-container' to={`/events/${event.id}`}>
                <div id='event-image-detail-container'>
                    <img className='item-image' src={event.previewImage} alt='group preview image' />
                    <div id='details-container'>
                        <h2 className='item-texts'>{event.startDate}</h2>
                        <p className='item-texts'>{event.name}</p>
                        <p className='item-texts'>{event.Venue.city}, {event.Venue.state}</p>
                    </div>
                </div>
                <p>{eventDetail.description}</p>
            </Link>
        )
    );
}

export default EventItem