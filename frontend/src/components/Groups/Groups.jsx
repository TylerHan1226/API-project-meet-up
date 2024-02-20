import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsThunk, selectGroupsArr } from "../../store/groups";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import GroupItem from './GroupItem'
import './Groups.css'

function Groups() {

    const dispatch = useDispatch()
    const groups = useSelector(selectGroupsArr)

    useEffect(() => {
        dispatch(fetchGroupsThunk())
    }, [dispatch])
    //chain 
    let groupHeader = null
    if (groups) {
        groupHeader = 'highlighted'
    }

    return (
        <div id="groupEvent-page-container">
            <div id='groupEvent-link-header'>
                <Link className='un-highlighted-header' to='/events'><h1>Events</h1></Link>
                <h1 className={groupHeader}>Groups</h1>
            </div>
            <p id="groupEvent-header-text">Groups in Meetup</p>

            <div id='groups-container'>
                {groups && Array.isArray(groups) && groups.map(eachGroup => (
                    <GroupItem key={eachGroup.id} group={eachGroup} />
                ))}
            </div>

        </div>

    )
}

export default Groups;
