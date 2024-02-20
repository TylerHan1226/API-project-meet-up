//imports
import {createSelector} from 'reselect'
import {fetchAllEventThunk} from '../store/events' 


/** Action Type Constants: */
export const LOAD_GROUPS = 'groups/LOAD_GROUPS'
export const LOAD_GROUP_DETAIL = 'groups/LOAD_GROUP_DETAIL'


/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})
export const loadGroupDetails = (group) => ({
    type: LOAD_GROUP_DETAIL,
    group
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
        default:
            return state
    }
}

export default groupsReducer