import { Link } from 'react-router-dom'
import DiscussionIcon from '../assets/discussion.svg'
import UpvoteBtn from './UpvoteBtn'

function Discussion({ id, title, tags, created_at}) {
    
    const getPostTime = () => {
        let curTime = new Date();
        let createTime = new Date(created_at);
        let timeDiff = curTime - createTime
        
        let seconds = Math.floor(timeDiff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        let timePosted = {
            seconds: seconds,
            minutes: minutes,
            hours: hours,
            days: days
        }

        return(timePosted)
    }
    
    const handleTimeText = ({ seconds, minutes, hours, days}) => {
        if(seconds<60) {
            return("Posted just now")
        } else if(minutes<60) {
            return(`Posted ${minutes} ${minutes==1 ? "minute" : "minutes"} ago`)
        } else if(hours<24) {
            return(`Posted ${hours} ${hours==1 ? "hour" : "hours"} ago`)
        } else {
            return(`Posted ${days} ${days==1 ? "day" : "days"} ago`)
        }
    }

    const tagList = tags.map((tag) => 
        <span key={tag} className='post-tag'>
            <h4 className="tag-text">{tag}</h4>
        </span>)

    return(
        <div className="Discussion">
            <div className="icon-box">
                <img className="post-icon" src={DiscussionIcon} alt="discussion post"/>
            </div>
            <Link className="post-title" to={`/view/${id}`}>{title}</Link>
            <UpvoteBtn id={ id }/>
            <div className="post-tags">
                <h3 className='tags-label'>Tags: </h3>
                {tagList}
            </div>
            <h4 className="post-time">{handleTimeText(getPostTime())}</h4>
        </div>
    )
}

export default Discussion