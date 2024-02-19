import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchAllEventByGroupThunk } from "../../store/groups";
import './Groups.css'


function GroupItem({ group }) {
    const dispatch = useDispatch()
    // console.log('group.id ==>', group.id)

    const events = useSelector(state => state.groups.events)
    let eventList = []
    if (events) {
        eventList = events && events.Events.filter(event => event.groupId === group.id);
    }

    useEffect(() => {
        dispatch(fetchAllEventByGroupThunk());
    }, [dispatch]);

    let isPublic = 'Public'
    console.log('group.private ==>', group.private)
    if (group.private == true) {
        isPublic = 'Private'
    }

    return (
        group.id && (
            <Link id='group-item-container' to={`/groups/${group.id}`}>
                {eventList.length !== 0 && <img className='group-image' src={group.previewImage} alt='group preview image' />}
                <div id='group-detail-container'>
                    <h2>{group.name}</h2>
                    <p>{group.city}, {group.state}</p>
                    <p>{group.about}</p>
                    {eventList.length !== 0 && <p>{eventList.length} events · {isPublic}</p>}
                </div>
            </Link>
        )
    );
}

export default GroupItem