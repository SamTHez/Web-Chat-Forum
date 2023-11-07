import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {

    return(
        <div className="Header">
            <h1 className='page-header'>Sports Chat</h1>
            <Link to="/home">Home</Link>
            <Link to="/create">Create new Post</Link>
        </div>
    )
}

export default Header