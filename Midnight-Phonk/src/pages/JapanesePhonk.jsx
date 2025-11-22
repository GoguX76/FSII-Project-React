import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import API_BASE_URL from "../config/api";
import japaneseCover from "../assets/images/japanese-phonk-cover.png";

const JapanesePhonk = ({ onNavigate }) => {
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

                const filtered = data.filter(p => p.category === 'japanese');

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
        <PageWrapper title={"Phonk Japonés"}>
            <div className="japanese-phonk-content">
                <div className="category-header" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${japaneseCover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '4rem 2rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 50, 50, 0.3)',
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000',
                        marginBottom: '1rem',
                        fontFamily: "'Orbitron', sans-serif" // Assuming a tech/cyber font might be available or fallback
                    }}>
                        JAPANESE PHONK
                    </h1>
                    <p className="page-description" style={{ fontSize: '1.2rem', color: '#ddd' }}>
                        Descubre los sonidos más oscuros y agresivos del Phonk Japonés.
                        Drift, velocidad y distorsión.
                    </p>
                </div>

                <div className="products-section">
                    <h2 className="section-title" style={{ borderLeft: '4px solid #ff0000', paddingLeft: '1rem' }}>Colección Japonesa</h2>
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

export default JapanesePhonk;
