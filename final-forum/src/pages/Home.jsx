import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Hero from '../components/Hero'
import Header from '../components/Header'
import Discussion from '../components/Discussion'
import supabase from '../client'

function Home() {
    const [activeFilter, setActiveFilter] = useState(-1)
    const [posts, setPosts] = useState([])
    const { league } = useParams()
    const [curLeague, setCurLeague] = useState(league)
    
    useEffect(() => {
        setCurLeague(league)
    },[league])

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
        <>
        {(curLeague == "general") && <Hero />}
        <Header />
        <div className="Home">
            <div className="post-list">
                {postList} 
            </div>
        </div>
        </>
    )
}

export default Home