import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllEventThunk } from "../../store/events";
import { Link } from "react-router-dom";
import '../Groups/Groups.css'
import EventItem from "./EventItem";

function Events() {

    const dispatch = useDispatch()
    const events = useSelector(state => state.events.events)
    const eventDetails = useSelector(state => state.events.eventDetails)

    // if (eventDetails) {
    //     console.log("eventDetails ==> ", eventDetails)
    // }

    useEffect(() => {
        dispatch(fetchAllEventThunk())
    }, [dispatch])
    
    let eventsArr = []
    if (events) {
        eventsArr = events.Events
    }
    // console.log('eventsArr ==>', eventsArr)

    let eventHeader = null
    if (events) {
        eventHeader = 'highlighted'
    }

    return (
        <div id="groupEvent-page-container">
            <div id='groupEvent-link-header'>
                <h1 className={eventHeader}>Events</h1>
                <Link className='un-highlighted-header' to='/groups'><h1>Groups</h1></Link>
            </div>
            <p id="groupEvent-header-text">Events in Meetup</p>

            <div id='groups-container'>
                {eventsArr && eventsArr.length !== 0 && Array.isArray(eventsArr) && eventsArr.map(eachEvent => (
                    <EventItem key={eachEvent.id} event={eachEvent} eventDetail={eventDetails[eachEvent.id]} />
                ))}
            </div>

        </div>

    )

    // return (
    //     <h1>Event Page!</h1>
    // )
}

export default Events;
