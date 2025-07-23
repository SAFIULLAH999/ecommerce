import React, { useState } from 'react';
import './Blogs.css';

const Blogs = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: "10 Must-Have Tech Gadgets for 2024",
      excerpt: "Discover the latest technology trends and gadgets that are revolutionizing our daily lives.",
      author: "Tech Expert",
      date: "2024-01-15",
      category: "Technology",
      image: "💻",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Sustainable Fashion: The Future of Style",
      excerpt: "Learn how eco-friendly fashion choices are shaping the industry and our planet's future.",
      author: "Fashion Writer",
      date: "2024-01-12",
      category: "Fashion",
      image: "🌱",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Home Office Setup Ideas for Maximum Productivity",
      excerpt: "Transform your workspace with these practical tips and creative design solutions.",
      author: "Productivity Coach",
      date: "2024-01-10",
      category: "Lifestyle",
      image: "🏠",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "The Rise of Smart Home Technology",
      excerpt: "Explore how smart devices are making our homes more efficient and connected.",
      author: "Smart Home Specialist",
      date: "2024-01-08",
      category: "Technology",
      image: "🏡",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Fitness Equipment for Small Spaces",
      excerpt: "Stay fit with compact exercise equipment perfect for apartments and small homes.",
      author: "Fitness Guru",
      date: "2024-01-05",
      category: "Health",
      image: "💪",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Budget-Friendly Kitchen Essentials",
      excerpt: "Build your dream kitchen without breaking the bank with these affordable essentials.",
      author: "Chef's Assistant",
      date: "2024-01-03",
      category: "Home",
      image: "🍳",
      readTime: "5 min read"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Technology', 'Fashion', 'Lifestyle', 'Health', 'Home'];

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className="blogs-page">
      <div className="page-header">
        <h1>Blog Posts</h1>
        <p>Stay updated with the latest trends and insights</p>
      </div>

      <div className="blog-controls">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </div>

        <button className="new-post-btn">
          ✏️ Write New Post
        </button>
      </div>

      <div className="blogs-grid">
        {filteredBlogs.map(blog => (
          <article key={blog.id} className="blog-card">
            <div className="blog-image">
              <span className="blog-emoji">{blog.image}</span>
              <div className="blog-category">{blog.category}</div>
            </div>
            
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-excerpt">{blog.excerpt}</p>
              
              <div className="blog-meta">
                <div className="author-info">
                  <span className="author">By {blog.author}</span>
                  <span className="date">{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <span className="read-time">{blog.readTime}</span>
              </div>
            </div>
            
            <div className="blog-actions">
              <button className="read-more-btn">Read More</button>
              <div className="action-buttons">
                <button className="action-btn" title="Edit">✏️</button>
                <button className="action-btn" title="Share">📤</button>
                <button className="action-btn" title="Delete">🗑️</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
