import './Groups.css'

function GroupItem(group) {

    console.log("group in GroupItem.jsx ==>", group.group)
    const eachGroup = group.group

    return (
        <div id='group-item-container'>
            <img className='group-image' src={eachGroup.previewImage} alt='group preview image' />
            <div id='group-detail-container'>
                <h2>{eachGroup.name}</h2>
                <p>{eachGroup.city}, {eachGroup.state}</p>
                <p>{eachGroup.about}</p>
                <p></p>
            </div>
        </div>
    )
}

export default GroupItem