import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="blog-card">
      <div className="blog-card-image">
        <img src={blog.thumbnail} alt={blog.title} />
        <div className="blog-card-category">{blog.category}</div>
      </div>
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-author">{blog.author}</span>
          <span className="blog-card-date">{formatDate(blog.date)}</span>
          <span className="blog-card-read-time">{blog.readTime}</span>
        </div>
        
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-description">{blog.shortDescription}</p>
        
        <div className="blog-card-tags">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="blog-card-tag">
              {tag}
            </span>
          ))}
        </div>
        
        <Link to={`/blog/${blog.id}`} className="btn blog-card-button">
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogCard; 