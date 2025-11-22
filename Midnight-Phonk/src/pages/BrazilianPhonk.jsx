import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import API_BASE_URL from "../config/api";
import brazilianCover from "../assets/images/brazilian-phonk-cover.png";

const BrazilianPhonk = ({ onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        // Filter for Brazilian Phonk products (or legacy products without category)
        const filtered = data.filter(p => !p.category || p.category === 'brazilian');

        const mapped = filtered.map((p) => ({
          ...p,
          title: p.title || p.name || p.title,
          image: p.image,
        }));
        setProducts(mapped);
      } catch (err) {
        if (!cancelled) setError(err.message || "Error fetching products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageWrapper title={"Phonk Brasileño"}>
      <div className="brazilian-phonk-content">
        <div className="category-header" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${brazilianCover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem 2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          textAlign: 'center',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '0 0 10px #00ff00, 0 0 20px #ffff00',
            marginBottom: '1rem',
            fontFamily: "'Orbitron', sans-serif"
          }}>
            BRAZILIAN PHONK
          </h1>
          <p className="page-description" style={{ fontSize: '1.2rem', color: '#eee', textShadow: '1px 1px 2px #000' }}>
            Explora todos los elementos que tenemos para crear Phonk Brasileño.
            Ritmos funk, bajos pesados y vibras tropicales oscuras.
          </p>
        </div>

        <div className="products-section">
          <h2 className="section-title" style={{ borderLeft: '4px solid #00ff00', paddingLeft: '1rem' }}>Packs y Samples Disponibles</h2>
          <div className="products-grid">
            {loading && <p>Cargando productos...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && products.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <p>No hay productos disponibles en esta categoría aún.</p>
              </div>
            )}
            {!loading && !error &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                />
              ))}
          </div>
        </div>
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          onNavigate={onNavigate}
        />
      </div>
    </PageWrapper>
  );
};

export default BrazilianPhonk;
