
import '../Groups/Groups.css'

function EventItem({ event, eventDetail }) {
    
    return (
        event.id && eventDetail && (
            <div id='event-item-container'>
                <div id='event-image-detail-container'>
                    <img className='item-image' src={event.previewImage} alt='group preview image' />
                    <div id='details-container'>
                        <h2 className='item-texts'>{event.startDate}</h2>
                        <p className='item-texts'>{event.name}</p>
                        <p className='item-texts'>{event.Venue.city}, {event.Venue.state}</p>
                    </div>
                </div>
                <p>{eventDetail.description}</p>
            </div>
        )
    );
}

export default EventItem