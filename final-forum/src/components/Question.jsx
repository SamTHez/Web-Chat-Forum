function Question({ title, body, image, tags, comments, upvotes}) {

    return(
        <div className="Question">
            <h2>{title}</h2>
            <p>{body}</p>
            {image_url && <img src={image} alt="Image not found" />}
        </div>
    )
}

export default Question