import React, { useState } from 'react';
import './Videos.css';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videos = [
    { id: 1, title: "Product Showcase 2024", duration: "5:42", views: "2.1K", category: "product", thumbnail: "📱" },
    { id: 2, title: "Behind the Scenes", duration: "8:15", views: "1.8K", category: "behind", thumbnail: "🎬" },
    { id: 3, title: "Tutorial: Getting Started", duration: "12:30", views: "5.2K", category: "tutorial", thumbnail: "📚" },
    { id: 4, title: "Customer Stories", duration: "6:45", views: "3.1K", category: "testimonial", thumbnail: "💬" }
  ];

  const categories = [
    { id: 'all', label: 'All Videos' },
    { id: 'product', label: 'Products' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'behind', label: 'Behind Scenes' },
    { id: 'testimonial', label: 'Testimonials' }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="videos-page">
      <div className="page-header">
        <h1>📺 Video Library</h1>
        <p>Discover our latest video content</p>
      </div>

      <div className="video-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="videos-grid">
        {filteredVideos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <div className="thumbnail-icon">{video.thumbnail}</div>
              <div className="play-overlay">▶️</div>
              <span className="video-duration">{video.duration}</span>
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
