import Product from "./Product";

export default function ProductsPage(props) {
  let {productList}= props;
  let {handleAddToCart} =props
  let {handleIncrementQuantity}=props
  let {handleDecrementQuantity}=props;
  return (
    <div className="row container p-1">
      {productList.map((product, index) => (
        <Product
          key={product.id}
          product={product}
          handleAddToCart={() => handleAddToCart(index)}
          incrementQuantity={() => handleIncrementQuantity(index)}
          decrementQuantity={() => handleDecrementQuantity(index)}
        />
      ))}
    </div>
  );
}
