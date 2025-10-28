import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/productCard";
import ProductModal from "../components/ProductModal";
import brazilVocalsImg from "../assets/images/brazil-vocals.png";
import brazilSamplesImg from "../assets/images/brazilian-samples.png";
import brazilDrumKit from "../assets/images/brazilian-drum-kit.png";
import brazilSampleFusion from "../assets/images/brazilian-sample-fusion.png";
import brazilSampleGems from "../assets/images/brazilian-sample-gems.png";
import brazilSampleTrend from "../assets/images/brazilian-sample-trend.png";

const IMAGES_MAP = {
  "brazil-vocals.png": brazilVocalsImg,
  "brazilian-samples.png": brazilSamplesImg,
  "brazilian-drum-kit.png": brazilDrumKit,
  "brazilian-sample-fusion.png": brazilSampleFusion,
  "brazilian-sample-gems.png": brazilSampleGems,
  "brazilian-sample-trend.png": brazilSampleTrend,
};

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
  const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        // Map image filename to imported module so components get usable src
        const mapped = data.map((p) => ({
          ...p,
          // keep compatibility: some components expect `title` key and `image`
          title: p.title || p.name || p.title,
          image: IMAGES_MAP[p.image] || p.image,
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
        <p className="page-description">
          Explora todos los elementos que tenemos para crear Phonk Brasileño
        </p>

        <div className="products-section">
          <h2 className="section-title">Packs y Samples Disponibles</h2>
          <div className="products-grid">
            {loading && <p>Cargando productos...</p>}
            {error && <p className="error">Error: {error}</p>}
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
