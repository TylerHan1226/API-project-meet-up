import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import './Groups.css'


function GroupItem({ group }) {

    const events = useSelector(state => state.events.events.Events)
    let eventList = []
    if (events) {
        eventList = events.filter(event => event.groupId === group.id);
        console.log('events ==>', events)
    }

    let isPublic = 'Public'
    if (group.private == true) {
        isPublic = 'Private'
    }

    return (
        group.id && (
            <Link id='item-container' to={`/groups/${group.id}`}>
                <img className='item-image' src={group.previewImage} alt='group preview image' />
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