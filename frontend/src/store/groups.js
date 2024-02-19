//imports
import {createSelector} from 'reselect'


/** Action Type Constants: */
export const LOAD_GROUPS = 'groups/LOAD_GROUPS'

/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})


/** Thunk Action Creators: */
export const fetchGroupsThunk = () => async (dispatch) => {
    const response = await fetch ('/api/groups')
    // console.log('response ===>', response)
    if (!response.ok) {
        throw new Error('Failed to fetch groups')
    }
    const groups = await response.json()
    dispatch(loadGroups(groups))
}
// export const fetchGroupDetail = () => async (dispatch) => {

// }


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
            // const groupsState = {}
            // action.groups.forEach((group) => {
            //     groupsState[group.id] = group
            // })
            // return action.groupsState
            console.log("action.groups ==>", action.groups)
            return action.groups.Groups
        }
        default:
            return state
    }
}

export default groupsReducer