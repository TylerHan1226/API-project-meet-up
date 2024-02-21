import { Link } from 'react-router-dom'
import '../Groups/Groups.css'

function EventItem({ event, eventDetail }) {

    return (
        event.id && eventDetail && (
            <Link id='event-item-container' to={`/events/${event.id}`}>
                <div id='event-image-detail-container'>
                    <img className='item-image' src={event.previewImage} alt='group preview image' />
                    <div id='details-container'>
                        <h4 className='event-list-item-texts'>{event.startDate} - {event.endDate}</h4>
                        <h4 className='event-list-item-texts'>{event.name}</h4>
                        <p className='event-list-item-texts'>Location: {event.Venue.city}, {event.Venue.state}</p>
                        <p className='event-list-item-texts'>Type: {event.type}</p>
                        <p className='event-list-item-texts'>Number of Attending: {event.numAttending}</p>
                    </div>
                </div>
                <p>{eventDetail.description}</p>
            </Link>
        )
    );
}

export default EventItem