import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/*
    <div className="Header">
        <h1 className='page-header'>Sport Chat</h1>
        <Link to="/home">Home</Link>
        <Link to="/create">Create new Post</Link>
    </div>

*/


function Header() {
    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
          window.addEventListener("scroll", () =>
            setSticky(window.scrollY > 400)
          );
        }
      }, []);
    
    return(
        <>
            <div className="page-hero">
                <h1 className='hero-main-text'>Sport Chat</h1>
            </div>
            <div className={sticky ? 'page-header sticky-header' : 'page-header'}>
                <Link className="home-link" to="/home/general">General</Link>
                <Link className="nfl-link" to="/home/nfl">NFL</Link>
                <Link className="mlb-link" to="/home/mlb">MLB</Link>
                <Link className="nba-link" to="/home/nba">NBA</Link>
                <Link className="nhl-link" to="/home/nhl">NHL</Link>
                <Link className="mls-link" to="/home/mls">MLS</Link>
            </div>
        </>
    )
}

export default Header