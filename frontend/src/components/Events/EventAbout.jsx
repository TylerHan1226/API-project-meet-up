import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchEventDtlByIdThunk } from '../../store/events';

import '../Groups/Groups.css'

function EventAbout({eventId}) {

    const dispatch = useDispatch()
    const eventDetails = useSelector(state => state.events.eventDetails)

    useEffect(() => {
        dispatch(fetchEventDtlByIdThunk(eventId))
    }, [dispatch])

    if (eventDetails) {
        console.log('eventDetails ==>', eventDetails)
        console.log('eventDetails.about ==>', eventDetails.about)
    }

    return ( eventDetails &&
        <div id='event-about-text'>{eventDetails.about}</div>
    )
}

export default EventAbout