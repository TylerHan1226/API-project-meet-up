import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsThunk, selectGroupsArr } from "../../store/groups";
import { useEffect } from "react";

import GroupItem from './GroupItem'
import './Groups.css'

function Groups() {

    const dispatch = useDispatch()
    const groups = useSelector(selectGroupsArr)
    useEffect(() => {
        dispatch(fetchGroupsThunk())
    }, [dispatch])

    // console.log("groups in Groups.jsx ==>", groups)
    let groupHeader = null
    if (groups) {
        groupHeader = 'highlighted'
    }

    return (
        <div id="groupEvent-page-container">
            <div id='groupEvent-link-header'>
                <h1 id='event-header'>Events</h1>
                <h1 class={groupHeader}>Groups</h1>
            </div>
            <p id="groupEvent-header-text">Groups in Meetup</p>

            <div id='groups-container'>
                {groups.map(eachGroup => (
                    <GroupItem key={eachGroup.id} group={eachGroup} />
                ))}
            </div>

        </div>

    );
}

export default Groups;
