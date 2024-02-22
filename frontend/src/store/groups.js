//imports
import {createSelector} from 'reselect'
import {fetchAllEventThunk} from '../store/events'
import Cookies from "js-cookie";


/** Action Type Constants: */
export const LOAD_GROUPS = 'groups/LOAD_GROUPS'
export const LOAD_GROUP_DETAIL = 'groups/LOAD_GROUP_DETAIL'
export const CREATE_GROUP = 'groups/create'
export const UPDATE_GROUP = 'groups/:groupId/update'
export const DELETE_GROUP = 'groups/DELETE_GROUP'


/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})
export const loadGroupDetails = (group) => ({
    type: LOAD_GROUP_DETAIL,
    group
})
export const createGroup = (group) => ({
    type: CREATE_GROUP,
    payload: group
})
export const updateGroup = (updatedGroup) => ({
    type: UPDATE_GROUP,
    payload: updatedGroup
})
export const deleteGroup = (groupId) => ({
    type: DELETE_GROUP,
    payload: groupId
})



/** Thunk Action Creators: */
//fetch all groups
export const fetchGroupsThunk = () => async (dispatch) => {
    const response = await fetch ('/api/groups')
    if (!response.ok) {
        throw new Error('Failed to fetch groups')
    }
    const groups = await response.json()
    //dispatch thunk for each of the group
    dispatch(fetchAllEventThunk())
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
//create group
export const createGroupThunk = (payload) => async (dispatch) => {
    const getCookie = () => {
        return Cookies.get("XSRF-TOKEN");
    };
    const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': getCookie()
        },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error('Failed to create group')
    }
    const newGroup = await response.json()
    dispatch(createGroup(newGroup))
    return newGroup
}
//update group
export const updateGroupThunk = (payload, id) => async (dispatch) => {
    const getCookie = () => {
        return Cookies.get("XSRF-TOKEN");
    };
    // console.log('payload ==> ', payload)
    const response = await fetch(`/api/groups/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': getCookie()
        },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error('Failed to update group')
    }
    const updatedGroup = await response.json()
    dispatch(updateGroup(updatedGroup))
    return updatedGroup
}
//delete group
export const deleteGroupThunk = (groupId) => async dispatch => {
    const getCookie = () => {
        return Cookies.get("XSRF-TOKEN");
    };
    const response = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': getCookie()
        }
    })
    if (!response.ok) {
        throw new Error('Failed to delete group')
    } else {
        dispatch(deleteGroup(groupId))
    }
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
        case CREATE_GROUP: {
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: action.payload
                }
            }
        }
        case UPDATE_GROUP: {
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: action.payload
                }
            }
        }
        case DELETE_GROUP: {
            const newState = {...state}
            console.log('newState ==>', newState)
            delete newState.groups[action.payload.groupId]
            return newState
        }
        default:
            return state
    }
}

export default groupsReducer