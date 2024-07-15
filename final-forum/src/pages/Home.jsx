import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Header from '../components/Header'
import Discussion from '../components/Discussion'
import supabase from '../client'
import UpvoteIcon from '../assets/upvote.svg'
import ClockIcon from '../assets/clock.svg'

function Home() {
    const [posts, setPosts] = useState([])
    const { league } = useParams()
    const [curLeague, setCurLeague] = useState(league)
    const [sortBy, setSortBy] = useState('created_at')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setCurLeague(league)
    },[league])

    const getPosts = async (sortBy) => {
            const { data, error } = await supabase
                .from("posts")
                .select()
                .order(sortBy, {ascending: false});
                setPosts(data);
    }

    useEffect(() => {
        getPosts(sortBy);
    }, [sortBy])

    const searchFilter = (post) => {
        if(post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return(post)
        }
    }

    const postList = posts.filter((post) => searchFilter(post)).map((post) => <Discussion key={post.id} {...post}/>)
    const filteredPostList = posts.filter((post) => searchFilter(post)).filter((post) => post.league.toLowerCase() == league).map((post) => <Discussion key={post.id} {...post}/>)

    const getStyle = () => {
        let styleClass = "bg-"
        styleClass += league
        return(styleClass)
    }

    const handleFilterSwitch = (filter) => {
        setSortBy(filter);
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return(
        <>
        {(curLeague == "general") && <Hero />}
        <Header withHero={(curLeague == "general")} activeTab={curLeague}/>
        <div className={`Home ${getStyle()}`}>
            <div className="search-box">
                <h3>Search</h3>
                <input className="search-text" type="text" onChange={handleChange}/>
                <h3>Sort By</h3>
                <button className={`filter-btn ${(sortBy=="upvotes") && "active-btn"}`} onClick={() => {handleFilterSwitch('upvotes')}}><img className="filter-icon" src={UpvoteIcon}></img></button>
                <button className={`filter-btn ${(sortBy=="created_at") && "active-btn"}`} onClick={() => {handleFilterSwitch('created_at')}}><img className="filter-icon" src={ClockIcon}></img></button>

            </div>
            <div className="post-list">
                {(league=="general" ? postList : filteredPostList)} 
            </div>
        </div>
        <Link className="create-btn" to="/create">Create a post</Link>
        </>
    )
}

export default Home