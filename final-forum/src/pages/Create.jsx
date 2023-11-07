import { useState, useEffect } from 'react'
import supabase from '../client'

function Create() {
    const [post, setPost] = useState({
        id: 0,
        type: "discussion",
        league: "general",
        title: "",
        body: "",
        image: "", //I want to add an image preview when the user puts a valid URL in the image section
        tags: [],
        comments: [],
        upvotes: 0
    })

    const createPost = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase
            .from("posts")
            .insert([{id:post.id, type:post.type, league:post.league, title:post.title, body:post.body, image:post.image, tags:post.tags, comments:post.comments, upvotes:post.upvotes}]);
            window.alert("Data: ", data)
            window.alert("Error: ", error)
        window.location = "/"
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
        console.log("Name: ", name, " Value: ", value);
    }

    return(
        <div className="Create">
            <form className="create-form">
                <div className="create-form-item">
                    <label>Type of Post</label>
                    <select name="type"  onChange={handleChange}>
                        <option value="discussion">Discussion</option>
                        <option value="question">Question</option>
                        <option value="Poll">Poll</option>
                    </select>
                </div>
                <div className="create-form-item">
                    <label>League</label>
                    <select name="league"  onChange={handleChange}>
                        <option value="general">General</option>
                        <option value="NFL">NFL</option>
                        <option value="MLB">MLB</option>
                        <option value="NBA">NBA</option>
                        <option value="NHL">NHL</option>
                        <option value="MLS">MLS</option>
                    </select>
                </div>
                <div className="create-form-item">
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChange}/>
                </div>
                <div className="create-form-item">
                    <label>Body</label>
                    <input type="text" name="body" onChange={handleChange}/>
                </div>
                <div className="create-form-item">
                    <label>Image URL</label>
                    <input type="text" name="image" onChange={handleChange}/>
                </div>
                <div className="create-form-item">
                    <label>Tags</label>
                    <input type="text" name="tags"/> {/*Add 'handle tags' here*/}
                </div>
                <div className="create-form-item">
                    <label>ID</label>
                    <input type="text" name="id" onChange={handleChange}/> {/*Purely for testing, implement ID genereator later and remove this input field*/}
                </div>
                <input type="submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default Create