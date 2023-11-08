import { useState } from 'react'
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

    const handleTags = (tagString) => {
        const postTags = tagString.split(",");
        for(let i=0; i<postTags.length; i++) {
            postTags[i] = postTags[i].trim();
        }
        setPost({...post, tags:postTags});
    }

    const createPost = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase
            .from("posts")
            .insert([{id:post.id, type:post.type, league:post.league, title:post.title, body:post.body, image:post.image, tags:post.tags, comments:post.comments, upvotes:post.upvotes}]);
        
        window.location = "/"
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name == "tags") {
            handleTags(value);
        } else {
            setPost((prev) => {
                return {
                    ...prev,
                    [name]:value,
                }
            })
        }
    }

    return(
        <div className="Create">
            <form className="create-form">
                <span>
                    <label>Type of Post:</label>
                    <select name="type"  onChange={handleChange}>
                        <option value="discussion">Discussion</option>
                        <option value="question">Question</option>
                        <option value="Poll">Poll</option>
                    </select>
                </span>
                <span>
                    <label>League:</label>
                    <select name="league"  onChange={handleChange}>
                        <option value="general">General</option>
                        <option value="NFL">NFL</option>
                        <option value="MLB">MLB</option>
                        <option value="NBA">NBA</option>
                        <option value="NHL">NHL</option>
                        <option value="MLS">MLS</option>
                    </select>
                </span>
                <div className="form-title">
                    <label>Title:</label>
                    <input type="text" name="title" placeholder="Post Title" onChange={handleChange}/>
                </div>
                <div className="form-body">
                    <label>Body:</label>
                    <textarea name="body" rows="6" placeholder="Post Text" onChange={handleChange}/>
                </div>
                <div className="form-image">
                    <label>Image:</label>
                    <input type="text" name="image" placeholder="External Image URL only | Ex: https://imgur.com/exampleurl.png" onChange={handleChange}/>
                </div>
                <div className="form-tags">
                    <label>Tags:</label>
                    <input type="text" name="tags" placeholder='Write tags as comma-seperated list'  onChange={handleChange}/> {/*Add 'handle tags' here*/}
                </div>
                <div className="form-id">
                    <label>ID:</label>
                    <input type="text" name="id" onChange={handleChange}/> {/*Purely for testing, implement ID genereator later and remove this input field*/}
                </div>
                <input type="submit" value="Create Post" className="form-submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default Create