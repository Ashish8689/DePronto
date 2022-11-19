import React from 'react'
import { Link} from 'react-router-dom'

const BlogItem = ({data}) => {
  const { id, title, body } = data

  return (
    <div className='card'>
      <h1 className='card-title'>{title}</h1>
      <p className='card-description'>
        {body.slice(0,150)}  <Link  className='link' to={`blog/${id}`}> Read more..</Link></p>
    </div>
  )
}

export default BlogItem