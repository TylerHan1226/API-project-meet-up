//imports
import {createSelector} from 'reselect'


/** Action Type Constants: */
export const LOAD_EVENTS = 'events/LOAD_EVENTS'


/**  Action Creators: */
export const loadEventsByGroup = (events) => ({
    type: LOAD_EVENTS,
    events
})

/** Thunk Action Creators: */
//fetch all events
export const fetchEventsByGroupThunk = (groupId) => async (dispatch) => {
    const response = await fetch (`/api/groups/${groupId}/events`)
    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }
    // console.log('response ==>', response)
    const events = await response.json()
    // console.log('events in events.js ==>', events)
    dispatch(loadEventsByGroup(events))
    // dispatch(loadEventsByGroup(response))
} 


/** Selectors: */
export const selectEvents = (state) => state.events
//all events selector
export const selectEventsArr = createSelector(
    [selectEvents],
    (events) => Object.values(events)
)

/** Reducer: */
const eventsReducer = (state ={}, action) => {
    switch (action.type) {
        case LOAD_EVENTS: {
            return {
                ...state,
                events: action.events
            };
        }
        default:
            return state
    }
}

export default eventsReducer