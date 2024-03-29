//imports
import {createSelector} from 'reselect'
import Cookies from 'js-cookie'


/** Action Type Constants: */
export const LOAD_EVENTS = '/events/LOAD_EVENTS'
export const LOAD_ALL_EVENTS = '/events/LOAD_EVENTS'
export const LOAD_EVENT_DETAILS = '/events/LOAD_EVENT_DETAILS'
export const LOAD_GROUP_DETAILS = '/events/LOAD_GROUP_DETAILS'
export const CREATE_EVENT = '/events/:groupId/events'
export const DELETE_EVENT = '/events/DELETE_EVENT'

/**  Action Creators: */
export const loadEventsByGroup = (events) => ({
    type: LOAD_EVENTS,
    events
})
export const loadEvents = (events) => ({
    type: LOAD_ALL_EVENTS,
    events
})
export const loadEventDetails = (eventDetail) => ({
    type: LOAD_EVENT_DETAILS,
    eventDetail
})
export const loadGroupDetails = (groupDetail) => ({
    type: LOAD_GROUP_DETAILS,
    groupDetail
})
export const createEvent = (event) => ({
    type: CREATE_EVENT,
    payload: event
})
export const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    payload: eventId
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
    // console.log('events in groups.js ==>', events)
    dispatch(loadEvents(events))

    const eventDetails = {}
    await Promise.all(events.Events.map(async (event) => {
        const everyResponse = await fetch(`/api/events/${event.id}`)
        if (!everyResponse.ok) {
            throw new Error(`Fail to fetch event details`)
        }
        const eventDetail = await everyResponse.json()
        eventDetails[event.id] = eventDetail
        dispatch(loadEventDetails(eventDetail))
    }))
    // console.log("{events, eventDetails} ==>", {events, eventDetails})
    return {events, eventDetails}
}
//fetch events by groupId
export const fetchEventsByGroupThunk = (groupId) => async (dispatch) => {
    const response = await fetch (`/api/groups/${groupId}/events`)
    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }
    const events = await response.json()
    dispatch(loadEventsByGroup(events))

    //chain
    const eventDetails = {}
    await Promise.all(events.Events.map(async (event) => {
        const everyResponse = await fetch(`/api/events/${event.id}`)
        if (!everyResponse.ok) {
            throw new Error(`Fail to fetch event details`)
        }
        const eventDetail = await everyResponse.json()
        eventDetails[event.id] = eventDetail
        dispatch(loadEventDetails(eventDetail))
    }))
    return {events, eventDetails}
}
//fetch event by id
export const fetchEventByIdThunk = (eventId) => async (dispatch) => {
    const response = await fetch (`/api/events/${eventId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }
    const event = await response.json()
    dispatch(loadEventDetails(event))

    const groupDetail = {}
    const groupResponse = await fetch(`/api/groups/${event.Group.id}`)
    groupDetail[event.id] = await groupResponse.json()
    dispatch(loadGroupDetails(groupDetail))
}
//create event
export const createEventThunk = (payload, groupId) => async (dispatch) => {
    const getCookie = () => {
        return Cookies.get("XSRF-TOKEN");
    }
    const response = await fetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': getCookie()
        },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error('Failed to create event')
    }
    const newEvent = await response.json()
    dispatch(createEvent(newEvent))
    return newEvent
}
//delete event
export const deleteEventThunk = (eventId) => async dispatch => {
    const getCookie = () => {
        return Cookies.get("XSRF-TOKEN");
    };
    const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': getCookie()
        }
    })
    if (!response.ok) {
        throw new Error('Failed to delete event')
    } else {
        dispatch(deleteEvent(eventId))
    }
}


/** Selectors: */
export const selectEvents = (state) => state.events
//all events selector
export const selectEventsArr = createSelector(
    [selectEvents],
    (events) => Object.values(events)
)

/** Reducer: */
const initialState = {
    events: [],
    eventDetails: {},
};
const eventsReducer = (state =initialState, action) => {
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
                eventDetails: {
                    ...state.eventDetails,
                    [action.eventDetail.id]: action.eventDetail,
                },
            };
        }
        case LOAD_GROUP_DETAILS: {
            return {
                ...state,
                groupDetails: action.groupDetail
            }
        }
        case CREATE_EVENT: {
            return {
                ...state,
                events: {
                    ...state.events,
                    [action.payload.id]: action.payload
                }
            }
        }
        case DELETE_EVENT: {
            const newState = {...state}
            delete newState.events[action.payload.eventId]
            return newState
        }
        default:
            return state
    }
}

export default eventsReducer