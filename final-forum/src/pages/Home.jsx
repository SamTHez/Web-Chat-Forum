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
    
    const getPosts = async() => {
        const { data, error } = await supabase
            .from("posts")
            .select();
            setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, [])

    const postList = posts.map((post) => <Discussion key={post.id} {...post}/>)

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