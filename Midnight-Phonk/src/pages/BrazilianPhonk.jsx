import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/productCard";
import ProductModal from "../components/ProductModal";
import phonkProducts from "../utils/Phonk-Catalog";

const BrazilianPhonk = ({ onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <PageWrapper title={"Phonk Brasileño"}>
      <div className="brazilian-phonk-content">
        <p className="page-description">
          Explora todos los elementos que tenemos para crear Phonk Brasileño
        </p>

        <div className="products-section">
          <h2 className="section-title">Packs y Samples Disponibles</h2>
          <div className="products-grid">
            {phonkProducts.map((product) => (
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
