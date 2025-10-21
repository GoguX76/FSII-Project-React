import React from "react";

const ProductCard = ({ product, onSelect }) => {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    }
  };
  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = "placeholder-image.jpg"; //En caso de que no haya imagen, se usa una por defecto
            e.target.alt = "Imagen no disponible";
          }}
        />
      </div>
      <div className="product-card-content">
        <h3 className="product-title">{product.title}</h3>
        {product.desc && <p className="product-description">{product.desc}</p>}
        <p className="product-price">
          {product.price > 0 ? `$${product.price}` : "Gratis"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
