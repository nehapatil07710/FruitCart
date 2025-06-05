function Product({
  product,
  handleAddToCart,
  incrementQuantity,
  decrementQuantity,
}) {
  const discountedPrice = product.mrp - (product.mrp * product.discount) / 100;

  return (
    <div className="col-10 col-md-5 col-lg-3 col-sm-3 border border-2 border-warning p-2">
      <div>
        <div className="block w-50 bg bg-secondary">
          {product.discount > 0 && `${product.discount}% Discount`}
        </div>
        <img
          src={`/public/Originals/${product.image}`}
          className="img-fluid"
          alt={product.name}
        />
        <div className="text-white">{product.name}</div>
      </div>

      <div className="h3 text-white">
        
        {product.discount === 0 && <h4>Rs. {product.mrp}</h4>}
        {product.discount !== 0 && (
          <h3 className="text-white">
            Rs.{" "}
            <span className="text-decoration-line-through">{product.mrp}</span>{" "}
            <span>{discountedPrice}</span>
          </h3>
        )}

        <h5 className="text-white">(per {product.unit})</h5>
      </div>

      
      {product.inStock && product.qty === 0 && (
        <button className="btn btn-danger" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}

      
      {product.inStock && product.qty > 0 && (
        <div>
          <button
            className="btn btn-danger text-white"
            onClick={decrementQuantity}
          >
            -
          </button>
          <span> {product.qty} </span>
          <button
            className="btn btn-danger text-white"
            onClick={incrementQuantity}
          >
            +
          </button>
          <h5 className="text-white">
            Total: Rs. {discountedPrice * product.qty}
          </h5>
        </div>
      )}

      
      {!product.inStock && <button disabled>Out of Stock</button>}
    </div>
  );
}

export default Product;
