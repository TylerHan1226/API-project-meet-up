import { useDispatch, useSelector } from "react-redux"
import { fetchEventsByGroupThunk, selectEventsArr } from "../../store/events"
import { useEffect } from "react"
import EventItem from "./EventItem"

function EventsList({ groupId }) {

    console.log('groupId ===>', groupId)

    const dispatch = useDispatch()
    const events = useSelector(selectEventsArr)
    useEffect(() => {
        dispatch(fetchEventsByGroupThunk(groupId))
    }, [dispatch])

    let eventsArr = []
    if (events.length !== 0) {
        eventsArr = [...events[0].Events]
    }
    console.log('eventsArr ==>', eventsArr)

    const now = new Date()
    const upcomingEventsArr = []
    const pastEventsArr = []
    eventsArr.forEach(event => {
        const eventStartDate = new Date(event.startDate)
        if (now < eventStartDate) {
            upcomingEventsArr.push(event)
        } else {
            pastEventsArr.push(event)
        }
    })
    // console.log('upcomingEventsArr', upcomingEventsArr)

    return (
        eventsArr.length !== 0 && (
            <>
                <div>
                    <h3>Upcoming Events ({upcomingEventsArr.length})</h3>
                </div>
                <div>
                    {upcomingEventsArr.length !== 0 && upcomingEventsArr.length !== 0 && upcomingEventsArr.map((eachEvent) => (
                        <EventItem key={eachEvent.id} event={eachEvent} />
                        ))}
                </div>
                <div>
                    <h3>Past Events ({pastEventsArr.length})</h3>
                </div>
                <div>
                    {pastEventsArr.length !== 0 && pastEventsArr.length !== 0 && pastEventsArr.map((eachEvent) => (
                        <EventItem key={eachEvent.id} event={eachEvent} />
                        ))}
                </div>
            </>
        )
    )
}

export default EventsList