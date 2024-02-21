import { useDispatch, useSelector } from "react-redux"
import { fetchEventsByGroupThunk, selectEventsArr } from "../../store/events"
import { useEffect } from "react"
import { Link } from "react-router-dom"


function EventsList({ groupId }) {

    const dispatch = useDispatch()
    const events = useSelector(selectEventsArr)
    const eventArr = events[0].Events
    const eventDetails = useSelector(state => state.events.eventDetails)

    useEffect(() => {
        dispatch(fetchEventsByGroupThunk(groupId))
    }, [dispatch, groupId])

    const now = new Date()
    const upcomingEventsArr = []
    const pastEventsArr = []
    if (Array.isArray(eventArr)) {
        eventArr.forEach(event => {
            const eventStartDate = new Date(event.startDate)
            if (now < eventStartDate) {
                upcomingEventsArr.push(event)
            } else {
                pastEventsArr.push(event)
            }
        })
        eventArr.sort((a, b) => {
            // Compare start dates
            return new Date(a.startDate) - new Date(b.startDate);
        });
    }

    return (
        Array.isArray(eventArr) && eventDetails && (
            <>
                <div>
                    <h4>Upcoming Events ({upcomingEventsArr.length})</h4>
                </div>
                <div>
                    {upcomingEventsArr.length !== 0 && upcomingEventsArr.map((eachEvent) => (
                        <Link key={eachEvent.id} id='event-list-item-container' to={`/events/${eachEvent.id}`}>
                            <div id='event-list-image-detail-container'>
                                <img className='event-list-item-image' src={eachEvent.previewImage} alt='group preview image' />
                                <div id='event-list-details-container'>
                                    <h5 className='event-list-item-texts'>{eachEvent.startDate.split(' ')[0]} · {eachEvent.startDate.split(' ')[1]}</h5>
                                    <h4 className='event-list-item-texts'>{eachEvent.name}</h4>
                                    <p className='event-list-item-texts'>Location: {eachEvent.Venue.city}, {eachEvent.Venue.state}</p>
                                    <p className='event-list-item-texts'>Type: {eachEvent.type}</p>
                                    {/* <p className='event-list-item-texts'>Number of Attending: {eachEvent.numAttending}</p> */}
                                </div>
                            </div>
                            {eventDetails[eachEvent.id] && <p className="event-list-item-texts">{eventDetails[eachEvent.id].description}</p>}
                        </Link>
                    ))}
                </div>
                <div>
                    <h4>Past Events ({pastEventsArr.length})</h4>
                </div>
                <div>
                    {pastEventsArr.length !== 0 && pastEventsArr.map((eachEvent) => (
                        <div key={eachEvent.id} id='event-list-item-container'>
                            <div id='event-list-image-detail-container'>
                                <img className='event-list-item-image' src={eachEvent.previewImage} alt='group preview image' />
                                <div id='event-list-details-container'>
                                <h5 className='event-list-item-texts'>{eachEvent.startDate.split(' ')[0]} · {eachEvent.startDate.split(' ')[1]}</h5>
                                    <h4 className='event-list-item-texts'>{eachEvent.name}</h4>
                                    <p className='event-list-item-texts'>Location: {eachEvent.Venue.city}, {eachEvent.Venue.state}</p>
                                    <p className='event-list-item-texts'>Type: {eachEvent.type}</p>
                                    {/* <p className='event-list-item-texts'>Number of Attending: {eachEvent.numAttending}</p> */}
                                </div>
                            </div>
                            {eventDetails[eachEvent.id] && <p className="event-list-item-texts">{eventDetails[eachEvent.id].description}</p>}
                        </div>
                    ))}
                </div>
            </>
        )
    )
}

export default EventsList