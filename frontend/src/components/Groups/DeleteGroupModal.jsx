import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteGroupThunk } from '../../store/groups';
import './GroupForm.css'

function DeleteGroupModal({groupId}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteGroup = () => {
        dispatch(deleteGroupThunk(groupId))
        navigate('/groups')
    }
    // const keepGroup = () => {
    //     navigate(`/groups/${groupId}`)
    // }

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this group?</p>
            <button className='yes-button' onClick={deleteGroup}>YES (Delete Group)</button>
            <button className='no-button'>NO (Keep Group)</button>
        </>

    )
}

export default DeleteGroupModal