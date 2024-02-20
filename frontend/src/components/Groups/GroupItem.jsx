import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchAllEventThunk } from "../../store/groups";
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
        dispatch(fetchAllEventThunk());
    }, [dispatch]);

    let isPublic = 'Public'
    console.log('group.private ==>', group.private)
    if (group.private == true) {
        isPublic = 'Private'
    }

    return (
        group.id && (
            <Link id='item-container' to={`/groups/${group.id}`}>
                {eventList.length !== 0 && <img className='item-image' src={group.previewImage} alt='group preview image' />}
                <div id='details-container'>
                    <h2 className='item-texts'>{group.name}</h2>
                    <p className='item-texts'>{group.city}, {group.state}</p>
                    <p className='item-texts'>{group.about}</p>
                    {eventList.length !== 0 && <p className='item-texts'>{eventList.length} events · {isPublic}</p>}
                </div>
            </Link>
        )
    );
}

export default GroupItem