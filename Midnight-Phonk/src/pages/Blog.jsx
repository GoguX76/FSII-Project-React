import React, { useState, useEffect } from "react";
import { blogNews } from "../utils/Blog";
import BlogModal from "../components/BlogModal";
import "../css/blog.css";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  // Cargar los likes desde localStorage al iniciar
  useEffect(() => {
    const storedLikes = localStorage.getItem("blogLikes");
    if (storedLikes) {
      const likesData = JSON.parse(storedLikes);
      const updatedPosts = blogNews.map((post) => ({
        ...post,
        likes: likesData[post.idNew] || post.likes || 0,
      }));
      setPosts(updatedPosts);
    } else {
      setPosts(blogNews);
    }
  }, []);

  // Función para manejar los likes
  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.idNew === postId) {
        return { ...post, likes: (post.likes || 0) + 1 };
      }
      return post;
    });

    setPosts(updatedPosts);

    // Guardar en localStorage
    const likesData = {};
    updatedPosts.forEach((post) => {
      likesData[post.idNew] = post.likes;
    });
    localStorage.setItem("blogLikes", JSON.stringify(likesData));

    // Si el post seleccionado es el que recibió el like, actualizarlo también
    if (selectedPost && selectedPost.idNew === postId) {
      setSelectedPost(updatedPosts.find((p) => p.idNew === postId));
    }
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <>
      <div className="blog-container">
        {posts.map((post) => (
          <div key={post.idNew} className="blog-card">
            <img
              src={post.imageNew}
              alt={post.titleNew}
              className="blog-card-image"
            />
            <div className="blog-card-content">
              <span className="blog-card-category">{post.categoryNew}</span>

              <h2 className="blog-card-title">{post.titleNew}</h2>

              <div className="blog-card-meta">
                <span className="blog-card-date">📅 {post.dateNew}</span>
                <span className="blog-card-author">👤 {post.autorNew}</span>
              </div>

              <p className="blog-card-description">{post.shortDescNew}</p>

              <button
                className="blog-card-button"
                onClick={() => handleOpenModal(post)}
              >
                Leer más →
              </button>

              <div className="blog-card-footer">
                <div className="blog-card-stats">
                  <span className="blog-card-stat">❤️ {post.likes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLike={handleLike}
      />
    </>
  );
};

export default Blog;
