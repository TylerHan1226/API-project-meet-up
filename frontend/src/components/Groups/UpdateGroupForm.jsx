import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import './GroupForm.css'
import { updateGroupThunk, fetchGroupDetailThunk } from "../../store/groups"
import { FaPersonRunning } from "react-icons/fa6";

function UpdateGroup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { groupId } = useParams()
    const user = useSelector(state => state.session.user);
    const group = useSelector(state => state.groups.Group)

    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (groupId) {
            dispatch(fetchGroupDetailThunk(groupId))
        }
    }, [groupId, dispatch])

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [type, setType] = useState('Online')
    const [IsPrivate, setIsPrivate] = useState(false)
    const [location, setLocation] = useState('')

    useEffect(() => {
        if (group) {
            setName(group.name || '');
            setAbout(group.about || '');
            setType(group.type || 'Online');
            setIsPrivate(group.private || false);
            setLocation(`${group.city || ''}, ${group.state || ''}`);
        }
    }, [group])

    useEffect(() => {
        const errors = {};
        if (!name) errors.name = 'Name field is required';
        if (name.length > 60) errors.name = 'Name must be 60 characters or less'
        if (about.length < 50) errors.about = 'About must have 50 characters or more';
        if (type !== 'Online' && type !== 'In person') errors.type = 'Type must be "Online" or "In person"';
        if (!location.split(', ')[0]) errors.city = 'City is required';
        if (!location.split(', ')[1]) errors.state = 'State is required';
        setErrors(errors)
        if (!user) {
            navigate('/')
        }
    }, [dispatch, name, about, type, IsPrivate, location, navigate, user])

    if (!group) {
        return <h2><FaPersonRunning /> Loading... (group cannot be found)</h2>
    }
    if (user) {
        if (user.id !== group.organizerId) {
            navigate(`/`)
        }
    }


    //call backs
    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        const city = location.split(', ')[0]
        const state = location.split(', ')[1]

        const updatedGroup = {
            name, about, type, private: IsPrivate, city, state
        }

        const groupCreated = await dispatch(updateGroupThunk(updatedGroup, groupId))

        navigate(`/groups/${groupCreated.id}`)

        // setName(`${group.name}`)
        // setAbout(`${group.about}`)
        // setType(`${group.type}`)
        // setIsPrivate(`${group.private}`)
        // setLocation(`${group.city}, ${group.state}`)
    }

    return (

        group ? (<form className="form-container" onSubmit={handleSubmit}>

            <section className="form-section-container">
                <h1>Update your group</h1>
                <h2>We&apos;ll walk you through a few steps to build your local community</h2>
            </section>

            <section className="form-section-container">
                <h2>First, set your group&apos;s location.</h2>
                <p className="form-texts">Meetup groups meet locally, in person and online. We&apos;ll connect you with people in your area, and more can join you online.</p>
                <input
                    className="form-input"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                // placeholder={currentLocation}
                />
                <div className="form-errors">
                    {hasSubmitted && errors.city && <p className="form-errors">* {errors.city}</p>}
                    {hasSubmitted && errors.state && <p className="form-errors">* {errors.state}</p>}
                </div>
            </section>

            <section className="form-section-container">
                <h2>What will your group&apos;s name be?</h2>
                <p className="form-texts">Choose a name that will give people a clear idea of what the group is about.</p>
                <p className="form-texts">Feel free to get creative! You can edit this later if you change your mind.</p>
                <input
                    className="form-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                // placeholder={currentName}
                />
                <div>
                    {hasSubmitted && errors.name && <p className="form-errors">* {errors.name}</p>}
                </div>
            </section>

            <section className="form-section-container">
                <h2>Describe what your group will be about</h2>
                <p className="form-texts">People will see this when we promote your group, but you&apos;ll be able to add to it later, too.</p>
                <ol>
                    <li className="form-texts">What&apos;s the purpose of the group?</li>
                    <li className="form-texts">Who should join?</li>
                    <li className="form-texts">What will you do at your events</li>
                </ol>
                <textarea
                    id="form-about-input"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                // placeholder={currentAbout}
                />

                <div>
                    {hasSubmitted && errors.about && <p className="form-errors">* {errors.about}</p>}
                </div>
            </section>

            <section className="form-section-container">
                <h2>Final steps...</h2>
                <p className="form-texts">Is this an in person or online group?</p>
                <select className="form-dropdowns" onChange={(e) => setType(e.target.value)}>
                    <option className="form-option" value='In person'>In person</option>
                    <option className="form-option" value='Online'>Online</option>
                </select>

                <p className="form-texts">Is this group private or public</p>
                <select className="form-dropdowns" onChange={(e) => setIsPrivate(e.target.value)}>
                    <option className="form-option" value={false}>Public</option>
                    <option className="form-option" value={true}>Private</option>
                </select>

                {/* <p className="form-texts">Please add an image url for your group below:</p>
                    <input
                        className="form-input"
                        type="text"
                        value={groupImgUrl}
                        onChange={(e) => setGroupImgUrl(e.target.value)}
                        placeholder="Image Url"
                    /> */}

            </section>

            <section>
                <button>Update Group</button>
            </section>

        </form>
        ) : (
            <div>loading</div>
        )
    )
}

export default UpdateGroup