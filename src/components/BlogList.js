import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from JSON file
    const loadBlogs = async () => {
      try {
        const response = await fetch('/data/blogs.json');
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading blogs:', error);
        // Fallback to imported data if fetch fails
        import('../data/blogs.json').then(data => {
          setBlogs(data.default);
          setFilteredBlogs(data.default);
          setLoading(false);
        });
      }
    };

    loadBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory]);

  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="blog-list-header">
        <h2>Knowledge Repository</h2>
        <p>Explore our curated collection of insightful articles, technical guides, and knowledge resources</p>
      </div>

      <div className="filters-section">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="no-results">
          <h3>No blogs found</h3>
          <p>Try adjusting your search terms or category filter.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {filteredBlogs.length > 0 && (
        <div className="results-info">
          <p>Showing {filteredBlogs.length} of {blogs.length} blogs</p>
        </div>
      )}
    </div>
  );
};

export default BlogList; 