import DiscussionIcon from '../assets/discussion.svg'
import UpvoteIcon from '../assets/upvote.svg'

function Discussion({ id, type, league, title, body, image, tags, comments, upvotes }) {

    const tagList = tags.map((tag) => 
        <span className='post-tag'>
            <h4 className="tag-text">{tag}</h4>
        </span>)

    return(
        <div className="Discussion">
            <div className="icon-box">
                <img className="post-icon" src={DiscussionIcon} alt="discussion post"/>
            </div>
            <h2 className="post-title">{title}</h2>
            <div className="upvote-box">
                <img src={UpvoteIcon} alt="upvotes" className="upvote-icon" />
                <h3 className="upvote-num">{upvotes}</h3>
            </div>
            <div className="post-tags">
                <h3 className='tags-label'>Tags: </h3>
                {tagList}
            </div>
            <h4 className="post-time">6 hours ago</h4>
        </div>
    )
}

export default Discussion