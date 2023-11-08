import { useState, useEffect } from 'react'
import Discussion from '../components/Discussion'
import supabase from '../client'

function Home() {
    const [activeFilter, setActiveFilter] = useState(-1)
    const [posts, setPosts] = useState([])
    const filters = ["NFL", "MLB", "NBA", "NHL", "MLS"]

    const changeFilter = (i) => {
        if(i == activeFilter) {
            setActiveFilter(-1);
        } else {
            setActiveFilter(i);
        }
    }

    const filterSelect = filters.map((filter, i) => {
        if(i == activeFilter) { return(<button key={filter} className='filter-btn active-filter' onClick={() => {changeFilter(i)}}>{filter}</button>)}
        return(<button key={filter} className='filter-btn inactive-filter' onClick={() => {changeFilter(i)}}>{filter}</button>)
    })

    //Delete later. Just test data to check post components
    const testPost = {
            id: 0,
            type: "discussion",
            league: "general",
            title: "This is a test title so deal with it",
            body: "This is some body content that makes no sense past here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec mattis turpis. Fusce sagittis dictum tincidunt. Pellentesque egestas tellus quis.",
            image: "https://imgur.com/vQoqwwi.gif", //I want to add an image preview when the user puts a valid URL in the image section
            tags: ["tag1", "tag2", "tag3", "tag4"],
            comments: ["This is the first test comment", "This is the second test comment"],
            upvotes: 32
    }
    
    const getPosts = async() => {
        const { data, error } = await supabase
            .from("posts")
            .select();
            setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, [])

    const postList = posts.map((post) => <Discussion {...post}/>)

    return(
        <div className="Home">
            {false && <div className="filter-list">
                <h2>League: </h2>
                {filterSelect}
            </div>}
            <div className="post-list">
                {postList} 
            </div>
        </div>
    )
}

export default Home