import React from 'react';
import Product from './Product'; 

function SearchPage({ productList, searchQuery, handleAddToCart, handleIncrementQuantity, handleDecrementQuantity }) {
  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const findProductIndex = (productId) => {
    return productList.findIndex(p => p.id === productId);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-white">Search Results for "{searchQuery}"</h2>
      <div className="row justify-content-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAddToCart={() => handleAddToCart(findProductIndex(product.id))}
              incrementQuantity={() => handleIncrementQuantity(findProductIndex(product.id))}
              decrementQuantity={() => handleDecrementQuantity(findProductIndex(product.id))}
            />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="h5 text-white">No fruits found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;