import React, { useEffect, useState } from 'react';
import './Blog.css';
import Image from "../assets/images/homeimage.jpg"

const blogData = [
  {
    id: 1,
    title: 'Revolutionizing Orthopedic Surgery with Precision Implants',
    image: Image,
    snippet: 'Discover how our latest implants are transforming trauma care...',
    content: 'At Sofia Surgical, our commitment to innovation ensures that surgeons have access to implants and instruments that elevate surgical outcomes. With ISO-certified manufacturing and global distribution, we deliver reliability and performance to every corner of the world.'
  },
  {
    id: 2,
    title: 'Top 5 Trends in Global Orthopedic Exports',
    image: Image,
    snippet: 'From regulatory compliance to custom branding—see what’s driving demand...',
    content: 'Export-ready excellence is key in 2025. Sofia Surgical ensures seamless customs clearance, packaging compliance, and premium dealer support, helping you scale globally with confidence.'
  },
  {
    id: 3,
    title: 'Private Label Solutions: Grow Your Brand with Our Implants',
    image: Image,
    snippet: 'Learn how Sofia Surgical’s white-label program boosts your visibility...',
    content: 'With full branding customization, we enable you to create a trusted brand in your region while leveraging our manufacturing expertise. Gain exclusive rights, packaging, and support that set you apart.'
  },
];

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBack = () => {
    setSelectedBlog(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBlog]);

  return (
    <div className="blog-section">
      <h2 className="blog-title">Sofia Surgical Blog</h2>

      {!selectedBlog ? (
        <div className="blog-list">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => setSelectedBlog(blog)}
            >
              <img src={blog.image} alt={blog.title} className="blog-img" />
              <div className="blog-card-body">
                <h4>{blog.title}</h4>
                <p>{blog.snippet}</p>
                <span className="read-more">Read More →</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="blog-detail">
          <button onClick={handleBack} className="back-btn">← Back to Other Blogs</button>
          <h3>{selectedBlog.title}</h3>
          <img src={selectedBlog.image} alt={selectedBlog.title} className="blog-detail-img" />
          <p>{selectedBlog.content}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
