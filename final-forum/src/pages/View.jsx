import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../client'
import Header from '../components/Header'
import DiscussionIcon from '../assets/discussion.svg'
import UpvoteBtn from '../components/UpvoteBtn'
import EditIcon from '../assets/edit.svg'
import DeleteIcon from '../assets/delete.svg'

const EditWindow = (props) => {
    const { oldPost, setInEdit, getPost } = props
    const [post, setPost] = useState(oldPost)
    const [idInput, setIdInput] = useState("")

    const editPost = async (e) => {
        e.preventDefault()

        if(idInput == post.creationId) {
            const { data, error } = await supabase
            .from('posts')
            .update({title:post.title, body:post.body, image:post.image})
            .eq("id", post.id)
            .select()

            console.log("Data: ", data, " Error: ", error)
            getPost()
            setInEdit(false)

        } else {
            window.alert("Invalid Post ID: Edit Unsuccessful")
            setInEdit(false)
        }
    }

    const handleCancel = () => {
        setInEdit(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const handleIdChange = (e) => {
        setIdInput(e.target.value)
    }

    return(
        <div className="popup-shade">
            <div className="EditWindow">
                {post && <form className="edit-form">
                <h2 className='delete-header'>You are currently <span className="o-text">EDITING</span> this post</h2>
                    <div className="form-title">
                        <label>Title:</label>
                        <input type="text" name="title" value={post.title} placeholder="Post Title" onChange={handleChange}/>
                    </div>
                    <div className="form-body">
                        <label>Body:</label>
                        <textarea name="body" rows="6" value={post.body} placeholder="Post Text" onChange={handleChange}/>
                    </div>
                    <div className="form-image">
                        <label>Image:</label>
                        <input type="text" name="image" value={post.image} placeholder="External Image URL only | Ex: https://imgur.com/exampleurl.png" onChange={handleChange}/>
                    </div>
                    <div className="form-id">
                        <label>Post ID:</label>
                        <input type="text" name="creationId" placeholder="**Key required for editing**" onChange={handleIdChange}/>
                    </div>
                    <div className="edit-btns">
                        <button onClick={handleCancel}>Cancel</button>
                        <button className='g-text' onClick={editPost}>Confirm</button>
                    </div>
                </form>}
            </div>
        </div>
    )
}

const DeleteWindow = (props) => {
    const { post, setInDelete } = props
    const [idInput, setIdInput] = useState("")

    const handleIdChange = (e) => {
        setIdInput(e.target.value)
    }

    const handleCancel = () => {
        setInDelete(false)
    }

    const deletePost = async (e) => {
        e.preventDefault()

        console.log(idInput, post.creationId)
        if(idInput == post.creationId) {
            const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq("id", post.id)

            console.log("Data: ", data, " Error: ", error)
            window.location = "/home/general"
            setInDelete(false)

        } else {
            window.alert("Invalid Post ID: Delete Unsuccessful")
            setInDelete(false)
        }
    }

    return(
        <div className="popup-shade">
            <div className="DeleteWindow">
                <h2 className='delete-header'>Are you sure you want to <span className="r-text">DELETE</span> this post?</h2>
                <label>Post ID</label>
                <input type="text" onChange={handleIdChange}/>
                <div className="delete-btns">
                    <button onClick={handleCancel}>Cancel</button>
                    <button className='r-text' onClick={deletePost}>Delete</button>
                </div>
            </div>
        </div>
    )
}

function View() {
    const [ post, setPost ] = useState({})
    const [ comment, setComment ] = useState("")
    const [ inEdit, setInEdit ] = useState(false)
    const [ inDelete, setInDelete ] = useState(false)
    const [ tagList , setTagList ] = useState([])
    const { id } = useParams()
    let commentList = []

    const enterEdit = () => {
        setInEdit(true)
    }

    const enterDelete = () => {
        setInDelete(true)
    }

    const getPost = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select()
            .eq("id", id)
            .single()

        if(data) {
            setTagList(data.tags.map((tag) => <><span key={tag} className='dp-post-tag'><h4 className="tag-text">{tag}</h4></span></>))
            setPost(data)
        } else {
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const addComment = async (e) => {
        e.preventDefault()

        if(comment !== "") {
            const updatedComments = [...post.comments, comment];

            const { error, data } = await supabase
            .from('posts')
            .update([{comments:updatedComments}])
            .eq("id", id)

            if(error) {
                console.log(error)
            } 
            window.location = `/view/${id}`
        }
    }
    
    if(post.comments) {
        commentList = post.comments.map((comment) => <p className='comment-text'>{comment}</p>)
    }

    return(
        <>
        <Header />
        { post &&
        <div className="View">
            <div className="dp-header">
                <img className="dp-icon" src={DiscussionIcon} alt="discussion post"/>
                <h2 className='dp-title'>{post.title}</h2>
                <UpvoteBtn id={ id }/>
            </div>

            {post.body && <p className='dp-body'>{post.body}</p>}
            {post.image && <img className="dp-image" href={post.image}/>}
            <div className='tag-list'>
                <h3 className='tl-title'>Tags: </h3>    
                {tagList}
            </div>
            <div className="comment-section">
                <div className="comment-header">
                    <h3>Comments</h3>
                    <button onClick={enterEdit}><img className="edit-icon" src={EditIcon} alt="edit post" /></button>
                    <button onClick={enterDelete}><img className="delete-icon" src={DeleteIcon} alt="delete post" /></button>
                </div>
                <form className="new-comment">
                    <input type="text" onChange={handleChange}/>
                    <input type="submit" value={"Add Comment"} onClick={addComment}/>
                </form>
                <div className="comment-list">{commentList}</div>
            </div>
        </div>}
        {inDelete && <DeleteWindow post={post} setInDelete={setInDelete}/>}
        {inEdit && <EditWindow oldPost={post} setInEdit={setInEdit} getPost={getPost}/>}
        </>
    )
}

export default View