import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import API_BASE_URL from "../config/api";

const CategoryPage = ({ onNavigate }) => {
    const { categoryName } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Format title (e.g., "russian-phonk" -> "Russian Phonk")
    const formattedTitle = categoryName
        ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Category';

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

                // Filter by category (URL param vs Product category field)
                const targetCategory = categoryName.toLowerCase();

                const filtered = data.filter(p =>
                    p.category && p.category.toLowerCase() === targetCategory
                );

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
    }, [categoryName]);

    return (
        <PageWrapper title={formattedTitle}>
            <div className="category-page-content">
                <div className="category-header" style={{
                    background: 'linear-gradient(135deg, #000428, #004e92)',
                    padding: '4rem 2rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 0 30px rgba(0, 100, 255, 0.4)',
                    border: '1px solid rgba(0, 150, 255, 0.3)'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        textShadow: '0 0 10px #00bfff, 0 0 20px #0000ff',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        fontFamily: "'Orbitron', sans-serif"
                    }}>
                        {formattedTitle}
                    </h1>
                    <p className="page-description" style={{ fontSize: '1.2rem', color: '#e0f7fa', textShadow: '0 0 5px rgba(0,255,255,0.5)' }}>
                        Explora nuestra colección de {formattedTitle}.
                    </p>
                </div>

                <div className="products-section">
                    <h2 className="section-title" style={{ borderLeft: '4px solid #00bfff', paddingLeft: '1rem' }}>Packs y Samples Disponibles</h2>
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

export default CategoryPage;
