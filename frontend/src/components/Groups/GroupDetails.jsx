import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchGroupDetailThunk } from "../../store/groups";
import { IoChevronBack } from "react-icons/io5";

import EventsList from '../Events/EventsList'

function GroupDetails() {

    const { groupId } = useParams()
    const dispatch = useDispatch()
    const group = useSelector(state => state.groups.Group);

    useEffect(() => {
        dispatch(fetchGroupDetailThunk(groupId))
    }, [dispatch, groupId])

    let previewImgUrl = ''
    if (group) {
        previewImgUrl = group.GroupImages.filter((image) => image.preview === true)[0].url
    }

    return (
        <section id='group-detail-page-container'>

            {group ? ( // Added null check here
                <>

                    <NavLink className='back-button' to={`/groups`}><IoChevronBack /> groups</NavLink>

                    <div className="img-detail-container">
                        <img id='group-preview-img' src={previewImgUrl} alt='group preview img' />
                        <div className="group-details">
                            <h2>{group.name}</h2>
                            <h5>{group.city}, {group.state}</h5>
                            <h5>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</h5>
                            <button>Join this group</button>
                        </div>
                    </div>

                    <div id='group-detail-container'>
                        <div className='detail-section'>
                            <h3 className='detail-title'>Organizer</h3>
                            <h5 className='detail-text'>{group.Organizer.firstName} {group.Organizer.lastName}</h5>
                        </div>
                        <div className='detail-section'>
                            <h3 className='detail-title'>What we are about</h3>
                            <h5 className='detail-text'>{group.about}</h5>
                        </div>
                        <div className='detail-section'>
                            <EventsList groupId={groupId} />
                        </div>
                    </div>
                </>

            ) : (
                <p>No images available</p> // Render a message if no images
            )}

        </section>
    )
}

export default GroupDetails
