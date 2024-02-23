
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteEventThunk } from '../../store/events';
import './EventForm.css'

function DeleteEventModal({eventId}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const deleteEvent = () => {
        dispatch(deleteEventThunk(eventId))
        navigate('/events')
        closeModal()
    }
    const keepEvent = () => {
        closeModal()
    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this event?</p>
            <button className='yes-button' onClick={deleteEvent}>YES (Delete Event)</button>
            <button className='no-button' onClick={keepEvent}>NO (Keep Event)</button>
        </>

    )
}

export default DeleteEventModal