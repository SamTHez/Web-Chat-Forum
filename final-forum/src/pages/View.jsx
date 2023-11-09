import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../client'
import DiscussionIcon from '../assets/discussion.svg'
import UpvoteIcon from '../assets/upvote.svg'

function View() {
    const [ post, setPost ] = useState({})
    const { id } = useParams()

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
    }, [])

    return(
        <div className="View">
            <div className="dp-header">
                <img className="dp-icon" src={DiscussionIcon} alt="discussion post"/>
                <h2 className='dp-title'>{post.title}</h2>
                <div className="dp-upvote-box">
                    <img src={UpvoteIcon} alt="upvotes" className="upvote-icon" />
                    <h3 className="upvote-num">{post.upvotes}</h3>
            </div>
            </div>
            <p className='dp-body'>{post.body}</p>
            {post.image && <img href={post.image}/>}
            <h3 className='comment-header'>Comments</h3>
        </div>
    )
}

export default View