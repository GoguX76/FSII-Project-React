import React from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/productCard";
import phonkProducts from "../utils/Phonk-Catalog";

const BrazilianPhonk = () => {
  const handleProductSelect = (product) => {
    console.log("Producto seleccionado:", product);
    alert(`Seleccionaste: ${product.title}`);
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
      </div>
    </PageWrapper>
  );
};

export default BrazilianPhonk;
