import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await fetch('/data/blogs.json');
        const blogs = await response.json();
        const foundBlog = blogs.find(b => b.id === parseInt(id));
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError('Blog not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog:', error);
        // Fallback to imported data if fetch fails
        import('../data/blogs.json').then(data => {
          const foundBlog = data.default.find(b => b.id === parseInt(id));
          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            setError('Blog not found');
          }
          setLoading(false);
        });
      }
    };

    loadBlog();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      if (paragraph.startsWith('•')) {
        return <li key={index}>{paragraph.substring(1).trim()}</li>;
      }
      return <p key={index}>{paragraph}</p>;
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container">
        <div className="error">
          <h2>Blog Not Found</h2>
          <p>The blog you're looking for doesn't exist.</p>
          <Link to="/" className="btn">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="blog-detail">
        <div className="blog-detail-header">
          <Link to="/" className="back-button">
            ← Back to Blogs
          </Link>
          
          <div className="blog-detail-meta">
            <span className="blog-detail-category">{blog.category}</span>
            <span className="blog-detail-date">{formatDate(blog.date)}</span>
            <span className="blog-detail-read-time">{blog.readTime}</span>
          </div>
        </div>

        <article className="blog-detail-content">
          <header className="blog-detail-title-section">
            <h1>{blog.title}</h1>
            <p className="blog-detail-description">{blog.shortDescription}</p>
            <div className="blog-detail-author">
              <span>By {blog.author}</span>
            </div>
          </header>

          <div className="blog-detail-image">
            <img src={blog.thumbnail} alt={blog.title} />
          </div>

          <div className="blog-detail-tags">
            {blog.tags.map((tag, index) => (
              <span key={index} className="blog-detail-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="blog-detail-body">
            {formatContent(blog.content)}
          </div>
        </article>

        <div className="blog-detail-footer">
          <Link to="/" className="btn btn-secondary">
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 