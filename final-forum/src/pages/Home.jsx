import { useState, useEffect } from 'react'
import POSTS from '../assets/testData.json'
import Post from '../components/Post'

function Home() {
    const [activeFilter, setActiveFilter] = useState(-1)
    const filters = ["NFL", "MLB", "NBA", "NHL", "MLS"]

    const changeFilter = (i) => {
        if(i == activeFilter) {
            setActiveFilter(-1);
        } else {
            setActiveFilter(i);
        }
    }

    const filterSelect = filters.map((filter, i) => {
        if(i == activeFilter) { return(<button className='filter-btn active-filter' onClick={() => {changeFilter(i)}}>{filter}</button>)}
        return(<button className='filter-btn inactive-filter' onClick={() => {changeFilter(i)}}>{filter}</button>)
    })
    
    const postList = POSTS.map((post) => <Post {...post}/>)

    return(
        <div className="Home">
            <div className="filter-list">
                <h2>League: </h2>
                {filterSelect}
            </div>
           
        </div>
    )
}

export default Home