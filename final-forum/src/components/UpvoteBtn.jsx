import { useState, useEffect } from 'react'
import supabase from '../client'
import UpvoteIcon from '../assets/upvote.svg'
import UpvoteConfirm from '../assets/UpvoteConfirm.svg'

function UpvoteBtn(props) {
    const id = props.id
    const [post, setPost] = useState({})
    const [upvoted, setUpvoted] = useState(false)

    const getPost = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select()
            .eq("id", id)
            .single()

        if(data) {
            setPost(data)
        } else {
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        getPost();
    },[])

    const addUpvote = async () => {
        const newUpvotes = post.upvotes+1
        console.log(newUpvotes)

        const { data, error } = await supabase
        .from('posts')
        .update([{upvotes:newUpvotes}]) 
        .eq("id", post.id)

        setUpvoted(true)
        getPost();
    }

    return(
        <div className="UpvoteBtn">
            {upvoted ? <img src={UpvoteConfirm} alt="upvoted" className="upvoted-icon" />: <img src={UpvoteIcon} alt="upvotes" className="upvote-icon" onClick={addUpvote} />}
            {post && <h3 className="upvote-num">{post.upvotes}</h3>}
        </div>
    )
}

export default UpvoteBtn