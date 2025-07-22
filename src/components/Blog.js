import React from 'react';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Marketing Guide: 5 Steps to Success in any business.',
      date: 'April 25, 2024',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fb3a66b16d7db4a3ba7b701c37f30a6c2?format=webp&width=800'
    },
    {
      id: 2,
      title: 'Best way to solve business issue in market.',
      date: 'April 22, 2024',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Ff19e5884c8c3442f939896c64d90798b?format=webp&width=800'
    },
    {
      id: 3,
      title: '10 grocery customer service skills to aim in 2024.',
      date: 'April 20, 2024',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fc66a8c6d1a884446b31366c4f52eaed7?format=webp&width=800'
    },
    {
      id: 4,
      title: 'Business ideas to grow your business traffic.',
      date: 'April 18, 2024',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2F2bbbb4775bbb45b4807085c054158c37?format=webp&width=800'
    }
  ];

  const testimonial = {
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour, or randomised words which don't look even slightly believable.",
    author: "Nancy Lyke",
    role: "Consultant"
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="section-header">
          <h2 className="section-title">Our Blogs</h2>
          <button className="view-all-btn">View All →</button>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-content">
                <p className="blog-date">{post.date}</p>
                <h3 className="blog-title">{post.title}</h3>
                <button className="read-more">Read More →</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonial-section">
          <div className="testimonial-content">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Ffb094f865b2b4bf989d5b813377937c9?format=webp&width=800" alt={testimonial.author} />
              </div>
              <div className="author-info">
                <h4 className="author-name">{testimonial.author}</h4>
                <p className="author-role">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="blog-carousel">
          <div className="carousel-images">
            {blogPosts.map((post) => (
              <div key={post.id} className="carousel-item">
                <img src={post.image} alt={`Blog ${post.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
