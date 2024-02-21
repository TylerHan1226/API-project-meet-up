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

    useEffect(() => {
        dispatch(fetchAllEventThunk())
    }, [dispatch])

    let eventsArr = []
    if (events) {
        eventsArr = events.Events
        // Sort events by startDate
        if (eventsArr) {
            eventsArr.sort((a, b) => {
                const eventA = new Date(a.startDate);
                const eventB = new Date(b.startDate);
                const now = new Date();
                // Compare start dates
                if (eventA > now && eventB <= now) return -1; // a is upcoming, b is past
                if (eventA <= now && eventB > now) return 1; // b is upcoming, a is past
                return eventA - eventB
        });
        }
    }

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
}

export default Events;
