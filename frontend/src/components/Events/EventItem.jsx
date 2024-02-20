
import '../Groups/Groups.css'


function EventItem({ event }) {


    return (
        event.id && (
            <div id='item-container'>

                <img className='item-image' src={event.previewImage} alt='group preview image' />
                
                <div id='details-container'>
                    
                    <h2 className='item-texts'>{event.startDate}</h2>
                    <p className='item-texts'>{event.name}</p>
                    <p className='item-texts'>{event.Venue.city}, {event.Venue.state}</p>
                    {/* need to get description from eventDetails */}
                </div>
            </div>
        )
    );
}

export default EventItem