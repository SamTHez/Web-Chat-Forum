function Post({ title, content, image_url}) {

    return(
        <div className="Post">
            <h2>{title}</h2>
            {content && <p>{content}</p>}
            {image_url && <img src={image_url} alt="Image not found" />}
        </div>
    )
}

export default Post