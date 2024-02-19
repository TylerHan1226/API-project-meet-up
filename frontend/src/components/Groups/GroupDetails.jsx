import { useDispatch, useSelector } from "react-redux"
import { fetchGroupDetailThunk, selectGroupDetail } from "../../store/groups"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function GroupDetails() {

    const {groupId} = useParams()
    const dispatch = useDispatch()
    const group = useSelector(() => selectGroupDetail(groupId))
    
    useEffect(() => {
        dispatch(fetchGroupDetailThunk(groupId))
    }, [dispatch, groupId])

    console.log("group ==>", group)
    // console.log("group organizerId ==>", group.organizerId)
    console.log("groupId ==>", groupId)

    return (
        <div>
            Group Details Page!
        </div>
    )
}

export default GroupDetails