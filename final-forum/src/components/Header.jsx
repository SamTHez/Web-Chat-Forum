import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header(props) {
    const [sticky, setSticky] = useState(false)
    const homeTabs = ["general", "nfl", "mlb", "nba", "nhl", "mls"]
    const activeTab = props.activeTab

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => {
                let withHero = props.withHero
                setSticky((window.scrollY >= 400) || !(withHero))
            });
        }
      }, []);
    
    const tabList = homeTabs.map((tab, i) => <Link key={tab} className={`${tab}-link ${(tab==activeTab) ? "active-tab" : "inactive-tab"}`} to={`/home/${tab}`}>{(i==0) ? "General" : tab.toUpperCase()}</Link>)


    return(
        <div className={sticky ? 'page-header sticky-header' : 'page-header'}>
            {tabList}
        </div>
    )
}

export default Header