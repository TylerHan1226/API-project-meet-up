import { useDispatch, useSelector } from "react-redux"
import { fetchEventsByGroupThunk, selectEventsArr } from "../../store/events"
import { useEffect } from "react"


function EventsList({ groupId }) {

    console.log('groupId ===>', groupId)

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
            console.log('event.startDate', event.startDate)
            if (now < eventStartDate) {
                upcomingEventsArr.push(event)
            } else {
                pastEventsArr.push(event)
            }
        })
    }
    if (eventDetails) {
        console.log('eventDetails[1] ==>', eventDetails[1])
        if (eventDetails[1]) {
            console.log('event description ==>', eventDetails[1].description)
        }
    }


    return (
        Array.isArray(eventArr) && eventDetails && (
            <>
                <div>
                    <h3>Upcoming Events ({upcomingEventsArr.length})</h3>
                </div>
                <div>
                    {upcomingEventsArr.length !== 0 && upcomingEventsArr.map((eachEvent) => (
                        <div key={eachEvent.id} id='event-list-item-container'>
                            <div id='event-list-image-detail-container'>
                                <img className='event-list-item-image' src={eachEvent.previewImage} alt='group preview image' />
                                <div id='event-list-details-container'>
                                    <h4 className='event-list-item-texts'>{eachEvent.startDate}</h4>
                                    <p className='event-list-item-texts'>{eachEvent.name}</p>
                                    <p className='event-list-item-texts'>{eachEvent.Venue.city}, {eachEvent.Venue.state}</p>
                                </div>
                            </div>
                            {eventDetails[eachEvent.id] && <p className="event-list-item-texts">{eventDetails[eachEvent.id].description}</p> }
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Past Events ({pastEventsArr.length})</h3>
                </div>
                <div>
                    {pastEventsArr.length !== 0 && pastEventsArr.map((eachEvent) => (
                        <div key={eachEvent.id} id='event-list-item-container'>
                            <div id='event-list-image-detail-container'>
                                <img className='event-list-item-image' src={eachEvent.previewImage} alt='group preview image' />
                                <div id='event-list-details-container'>
                                    <h4 className='event-list-item-texts'>{eachEvent.startDate}</h4>
                                    <p className='event-list-item-texts'>{eachEvent.name}</p>
                                    <p className='event-list-item-texts'>{eachEvent.Venue.city}, {eachEvent.Venue.state}</p>
                                </div>
                            </div>
                            {eventDetails[eachEvent.id] && <p className="event-list-item-texts">{eventDetails[eachEvent.id].description}</p> }
                        </div>
                    ))}
                </div>
            </>
        )
    )
}

export default EventsList