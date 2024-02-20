//imports
import {createSelector} from 'reselect'


/** Action Type Constants: */
export const LOAD_EVENTS = '/events/LOAD_EVENTS'
export const LOAD_ALL_EVENTS = '/events/LOAD_EVENTS'
export const LOAD_EVENT_DETAILS = '/events/LOAD_EVENT_DETAILS'

/**  Action Creators: */
export const loadEventsByGroup = (events) => ({
    type: LOAD_EVENTS,
    events
})
export const loadEvents = (events) => ({
    type: LOAD_ALL_EVENTS,
    events
})
export const loadEventDetails = (eventDtl) => ({
    type: LOAD_EVENT_DETAILS,
    eventDtl
})

/** Thunk Action Creators: */
//fetch all events
export const fetchAllEventThunk = () => async (dispatch) => {
    // const response = await fetch(`/api/groups/${groupId}/events`)
    const response = await fetch(`/api/events`)
    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }
    const events = await response.json()
    console.log('events in groups.js ==>', events)
    dispatch(loadEvents(events))
}
//fetch events by groupId
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
//fetch event details by its ID
export const fetchEventDtlByIdThunk = (eventId) => async (dispatch) => {
    const response = await fetch (`/api/groups/${eventId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch event details')
    }
    const eventDtl = await response.json()
    console.log('response in events.js ==>', response)
    dispatch(loadEventDetails(eventDtl))
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
        case LOAD_ALL_EVENTS: {
            return {
                ...state,
                events: action.events
            };
        }
        case LOAD_EVENT_DETAILS: {
            return {
                ...state,
                eventDetails: action.eventDtl
            }
        }
        default:
            return state
    }
}

export default eventsReducer