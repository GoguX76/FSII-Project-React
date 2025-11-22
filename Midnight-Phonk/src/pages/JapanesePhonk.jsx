import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import API_BASE_URL from "../config/api";

const JapanesePhonk = () => {
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
            <div className="brazilian-phonk-content">
                <p className="page-description">
                    Descubre los sonidos más oscuros y agresivos del Phonk Japonés
                </p>

                <div className="products-section">
                    <h2 className="section-title">Colección Japonesa</h2>
                    <div className="products-grid">
                        {loading && <p>Cargando productos...</p>}
                        {error && <p className="error">Error: {error}</p>}
                        {!loading && !error && products.length === 0 && <p>No hay productos disponibles en esta categoría.</p>}
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
                />
            </div>
        </PageWrapper>
    );
};

export default JapanesePhonk;
