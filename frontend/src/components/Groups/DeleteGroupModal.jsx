
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteGroupThunk } from '../../store/groups';
import './GroupForm.css'

function DeleteGroupModal({groupId}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const deleteGroup = () => {
        dispatch(deleteGroupThunk(groupId))
        navigate('/groups')
        closeModal()
    }
    const keepGroup = () => {
        closeModal()
    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this group?</p>
            <button className='yes-button' onClick={deleteGroup}>YES (Delete Group)</button>
            <button className='no-button' onClick={keepGroup}>NO (Keep Group)</button>
        </>

    )
}

export default DeleteGroupModal