function Product({
  product,
  handleAddToCart,
  incrementQuantity,
  decrementQuantity,
}) {
  const discountedPrice = product.mrp - (product.mrp * product.discount) / 100;

  return (
    <div className="col-10 col-md-5 col-lg-3 col-sm-3 border border-2 border-warning p-3 mb-3 rounded bg-dark">
      {/* Image with Discount Badge */}
      <div style={{ position: "relative" }}>
        {product.discount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "gray", // Bright orange
              color: "white",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              zIndex: 1,
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {product.discount}% OFF
          </span>
        )}
        <img
          src={`/public/Originals/${product.image}`}
          className="img-fluid rounded"
          alt={product.name}
        />
      </div>

      {/* Product Name */}
      <div className="text-white mt-2 fw-bold text-center">{product.name}</div>

      {/* Pricing */}
      <div className="h5 text-white text-center mt-2">
        {product.discount === 0 ? (
          <div>Rs. {product.mrp}</div>
        ) : (
          <div>
            <span className="text-decoration-line-through me-2">
              Rs. {product.mrp}
            </span>
            <span className="text-warning fw-bold">
              Rs. {discountedPrice.toFixed(2)}
            </span>
          </div>
        )}
        <div className="fs-6">(per {product.unit})</div>
      </div>

      {/* Cart Actions */}
      <div className="text-center mt-3">
        {product.inStock && product.qty === 0 && (
          <button className="btn btn-success px-4" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}

        {product.inStock && product.qty > 0 && (
          <div>
            <button
              className="btn btn-danger px-3 me-2"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="text-white fw-bold">{product.qty}</span>
            <button
              className="btn btn-danger px-3 ms-2"
              onClick={incrementQuantity}
            >
              +
            </button>
            <div className="mt-2 text-white">
              Total: Rs. {(discountedPrice * product.qty).toFixed(2)}
            </div>
          </div>
        )}

        {!product.inStock && (
          <button className="btn btn-secondary mt-2" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
