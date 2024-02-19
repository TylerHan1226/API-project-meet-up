//imports
import {createSelector} from 'reselect'


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
export const fetchGroupsThunk = () => async (dispatch) => {
    const response = await fetch ('/api/groups')
    if (!response.ok) {
        throw new Error('Failed to fetch groups')
    }
    const groups = await response.json()
    dispatch(loadGroups(groups))
}
export const fetchGroupDetailThunk = (groupId) => async (dispatch) => {
    const response = await fetch (`api/groups/${groupId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch group detail')
    }
    // const group = await response.json()
    // dispatch(loadGroupDetails(group))
    dispatch(loadGroupDetails(response))
}


/** Selectors: */
export const selectGroups = (state) => state.groups
//all groups selector
export const selectGroupsArr = createSelector(
    [selectGroups],
    (groups) => Object.values(groups)
)
export const selectGroupDetail = (groupId) => {
    [selectGroups],
    (groups) => groups.filter((group) => group.id == groupId)
};

/** Reducer: */
const groupsReducer = (state ={}, action) => {
    switch (action.type) {
        case LOAD_GROUPS: {
            return action.groups.Groups
        }
        case LOAD_GROUP_DETAIL: {
            return action.group
        }
        default:
            return state
    }
}

export default groupsReducer