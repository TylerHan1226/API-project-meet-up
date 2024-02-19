//imports
import {createSelector} from 'reselect'


/** Action Type Constants: */
export const LOAD_GROUPS = 'groups/LOAD_GROUPS'
export const LOAD_GROUP_DETAIL = 'groups/LOAD_GROUP_DETAIL'
export const LOAD_EVENTS = '/groups/LOAD_EVENTS'

/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})
export const loadGroupDetails = (group) => ({
    type: LOAD_GROUP_DETAIL,
    group
})
export const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events
})


/** Thunk Action Creators: */
//fetch all groups
export const fetchGroupsThunk = () => async (dispatch) => {
    const response = await fetch ('/api/groups')
    if (!response.ok) {
        throw new Error('Failed to fetch groups')
    }
    // console.log('groups in groups.js ==>', response)
    const groups = await response.json()
    dispatch(loadGroups(groups))
}
//fetch group by groupId
export const fetchGroupDetailThunk = (groupId) => async (dispatch) => {
    const response = await fetch (`/api/groups/${groupId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch group detail')
    }
    const group = await response.json()
    // console.log('group in groups.js ==>', group)
    dispatch(loadGroupDetails(group))
}
//fetch events by groupId
export const fetchAllEventByGroupThunk = () => async (dispatch) => {
    // const response = await fetch(`/api/groups/${groupId}/events`)
    const response = await fetch(`/api/events`)
    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }
    const events = await response.json()
    // console.log('events in groups.js ==>', events)
    dispatch(loadEvents(events))
}


/** Selectors: */
export const selectGroups = (state) => state.groups
//all groups selector
export const selectGroupsArr = createSelector(
    [selectGroups],
    (groups) => Object.values(groups)
)

/** Reducer: */
const groupsReducer = (state ={}, action) => {
    switch (action.type) {
        case LOAD_GROUPS: {
            const groupsState = {};
            action.groups.Groups.forEach((group) => {
                groupsState[group.id] = group;
            });
            return groupsState;
        }
        case LOAD_GROUP_DETAIL: {
            const groupState = {}
            groupState.Group = action.group
            return groupState
        }
        case LOAD_EVENTS: {
            return {
                ...state,
                events: action.events // Assuming `events` is the key where events should be stored in the state
            };
        }
        default:
            return state
    }
}

export default groupsReducer