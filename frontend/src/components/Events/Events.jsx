import { useDispatch, useSelector } from "react-redux";
import { selectEventsArr } from "../../store/events";
import { useEffect } from "react";
import { fetchEventsByGroupThunk } from "../../store/events";
// import GroupItem from './GroupItem'
// import './Groups.css'

function Events({groupId}) {

    const dispatch = useDispatch()
    const events = useSelector(selectEventsArr)

    useEffect(() => {
        dispatch(fetchEventsByGroupThunk(groupId))
    }, [dispatch])

    let eventsArr = []
    if (events.length !== 0) {
        console.log('events array ==>', events[0].Events)
        eventsArr = events[0].Events
    }


    return (
        <div>
            <h1>Events component!</h1>
            
        </div>

    )
}

export default Events;
