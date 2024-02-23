import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createEventThunk } from "../../store/events"

import { FaPersonRunning } from "react-icons/fa6";

import './EventForm.css'
import '../Groups/GroupForm.css'
import { fetchGroupDetailThunk } from "../../store/groups";


function CreateEventForm() {
    

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {groupId: groupId} = useParams()
    const user = useSelector(state => state.session.user)

    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [name, setName] = useState('')
    const [type, setType] = useState('In person')
    const [price, setPrice] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const [eventImgUrl, setEventImgUrl] = useState('')
    const [capacity, setCapacity] = useState(1)

    const group = useSelector(state => state.groups.Group)

    useEffect(() => {
        dispatch(fetchGroupDetailThunk(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        const errors = {}
        if (!name) errors.name = 'Name field is required';
        if (name < 5 || name.length > 60) errors.name = 'Name must be between 5 to 60 characters'
        if (type !== 'Online' && type !== 'In person') errors.type = 'Type must be "Online" or "In person"';
        if (price < 0) errors.price = 'Price is invalid'
        //check input date
        const startDateError = validateDateTime(startDate);
        if (startDateError) {
            errors.startDate = startDateError;
        }
        const endDateError = validateDateTime(endDate);
        if (endDateError) {
            errors.endDate = endDateError;
        }
        if (endDate >= startDate) {
            errors.endDate = 'End date but be later than the start date'
        }

        if (!description) errors.description = 'Description is required'
        if (description.length < 30) errors.description = 'Description needs 30 or more characters'
        if (capacity <= 0) errors.capacity = 'Capacity must be an integer and greater than 0'

        setErrors(errors)
        //validate user
        if (!user) {
            navigate('/')
        }

    }, [name, type, price, startDate, endDate, description, capacity, navigate, user])

    //date time validation
    const validateDateTime = (dateTimeString) => {
        const dateTimeParts = dateTimeString.split(' ')
        if (dateTimeParts.length !== 2) {
            return 'Please enter both date and time'
        }
        const [datePart, timePart] = dateTimeParts
        const [year, month, day] = datePart.split('-')
        const [hour, minute, second] = timePart.split(':')
        if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
            return 'Date must be in the format: YYYY-MM-DD'
        }
        if (hour.length !== 2 || minute.length !== 2 || second.length !== 2) {
            return 'Time must be in the format: HH:MM:SS'
        }
        const inputDate = new Date(dateTimeString)
        const currentDate = new Date()
        if (isNaN(inputDate.getTime())) {
            return 'Invalid date or time'
        }
        if (inputDate <= currentDate) {
            return 'Date and time must be in the future';
        }
        return null;
    };

    if (!group) {
        return <h2><FaPersonRunning /> Loading...</h2>
    }
    //validate user
    if (user && group) {
        console.log('user ==>', user)
        console.log('group ==>', group)
        if (user.id !== group.organizerId) {
            navigate('/')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        const newEvent = {
            name, type, price, startDate, endDate, description, capacity: parseInt(capacity), venueId: 1
        }
        console.log('newEvent ==>', newEvent)

        const eventCreated = await dispatch(createEventThunk(newEvent, group.id))
        navigate(`/events/${eventCreated.id}`)

        setName('')
        setType('In person')
        setPrice('')
        setStartDate('')
        setEndDate('')
        setDescription('')
        setEventImgUrl('')
        setCapacity(1)
    }

    return (
        <>
            {group && <form className="form-container" onSubmit={handleSubmit}>

                <section className="form-section-container">
                    {group && <h1>Create an event for {group.name}!</h1>}
                </section>

                <section className="form-section-container">
                    <h3>What is the name of your event?</h3>
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Event Name"
                    />
                    <div>
                        {hasSubmitted && errors.name && <p className="form-errors">* `{errors.name}`</p>}
                    </div>
                </section>

                <section className="form-section-container form-radio-section-container">
                    <h3>Is this an in-person or online event?</h3>
                    <div className="form-radio-containers">
                        <label className="form-radio-labels">In person
                            <input
                                className="form-input"
                                type="radio"
                                value='In person'
                                checked={type === 'In person'}
                                onChange={() => setType('In person')}
                            />
                        </label>
                        <label className="form-radio-labels">Online
                            <input
                                className="form-input"
                                type="radio"
                                value='Online'
                                checked={type === 'Online'}
                                onChange={() => setType('Online')}
                            />
                        </label>
                    </div>
                    <div>
                        {hasSubmitted && errors.type && <p className="form-errors">* `{errors.type}`</p>}
                    </div>
                </section>

                <section className="form-section-container">
                    <h3>What is the price for your event?</h3>
                    <input
                        className="form-input"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                    />
                    <div>
                        {hasSubmitted && errors.price && <p className="form-errors">* `{errors.price}`</p>}
                    </div>
                </section>

                <section className="form-section-container">
                    <h3>What is the capacity for your event?</h3>
                    <input
                        className="form-input"
                        type="text"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="0"
                    />
                    <div>
                        {hasSubmitted && errors.capacity && <p className="form-errors">* `{errors.capacity}`</p>}
                    </div>
                </section>

                <section className="form-section-container">
                    <h3>When does your event start?</h3>
                    <input
                        className="form-input"
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="YYYY-MM-DD 00:00:00"
                    />
                    <div>
                        {hasSubmitted && errors.startDate && <p className="form-errors">* `{errors.startDate}`</p>}
                    </div>
                    <h3>When does your event end?</h3>
                    <input
                        className="form-input"
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="YYYY-MM-DD 00:00:00"
                    />
                    <div>
                        {hasSubmitted && errors.endDate && <p className="form-errors">* `{errors.endDate}`</p>}
                    </div>
                </section>

                <section className="form-section-container">
                    <h3>Please add an image url for your event below</h3>
                    <input
                        className="form-input"
                        type="text"
                        value={eventImgUrl}
                        onChange={(e) => setEventImgUrl(e.target.value)}
                        placeholder="Image URL"
                    />
                    {/* <div>
                        {hasSubmitted && errors.eventImgUrl && <p className="form-errors">* {errors.eventImgUrl}</p>}
                    </div> */}
                </section>

                <section className="form-section-container">
                    <h3>Please describe your event</h3>
                    <p className="form-texts">Let people know about your event!</p>
                    <textarea
                        id="form-about-input"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                    />

                    <div>
                        {hasSubmitted && errors.description && <p className="form-errors">* `{errors.description}`</p>}
                    </div>
                </section>

                <section>
                    <button>Create Event</button>
                </section>

            </form>}
        </>
    )
}

export default CreateEventForm