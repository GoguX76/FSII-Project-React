import React, { useState, useEffect } from "react";
import BlogModal from "../components/BlogModal";
import "../css/blog.css";
import API_BASE_URL from "../config/api";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar blogs desde la API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) throw new Error('Error al cargar blogs');
        const data = await response.json();

        // Cargar los likes desde localStorage
        const storedLikes = localStorage.getItem("blogLikes");
        const likesData = storedLikes ? JSON.parse(storedLikes) : {};

        const updatedPosts = data.map((post) => ({
          ...post,
          likes: likesData[post.idNew] || post.likes || 0,
        }));

        setPosts(updatedPosts);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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

  if (loading) {
    return <div className="blog-container"><p>Cargando blogs...</p></div>;
  }

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
