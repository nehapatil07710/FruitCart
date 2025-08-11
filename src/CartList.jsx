export default function CartList({
  cartItems,
  totalPrice,
  onbuttonincrement,
  onbuttondecrement,
  onhandlebuybtn,
  onhandlebillbutton,
}) {
  function handleBuyBtn() {
    if (onhandlebuybtn) onhandlebuybtn();
  }

  function handleBillButton() {
    if (onhandlebillbutton) onhandlebillbutton();
  }

  return (
    <div className="bg bg-white">
      <div className="text-center mt-3">
        <button className="btn btn-success me-3" onClick={handleBuyBtn}>
          Proceed to Buy 🛍️
        </button>
        <button className="btn btn-danger" onClick={handleBillButton}>
          Bill
        </button>
      </div>

      <div className="row p-2 mt-2 m-5">
        {cartItems.map((e, index) => {
          const finalprice = e.mrp - (e.mrp * e.discount) / 100;

          return (
            <div key={index} className="m-2 p-2 border border-black">
              <div className="row">
                <div className="col-6 text-start ps-5">{`${index + 1}) ${
                  e.name
                }`}</div>
                <div className="col-6 text-end pe-5">
                  {e.discount === 0 ? (
                    <h4>Rs. {e.mrp}</h4>
                  ) : (
                    <h4>
                      Rs.{" "}
                      <span className="text-decoration-line-through text-danger">
                        {e.mrp}
                      </span>{" "}
                      <span className="text-success">
                        {finalprice.toFixed(2)}
                      </span>
                    </h4>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-6 text-start ps-5">
                  <button
                    className="btn btn-danger me-3"
                    onClick={() => onbuttondecrement(e.id - 1)}
                  >
                    –
                  </button>
                  {e.qty}
                  <button
                    className="btn btn-success ms-3"
                    onClick={() => onbuttonincrement(e.id - 1)}
                  >
                    +
                  </button>
                </div>
                <div className="col-6 text-end pe-5">
                  Rs. {(e.qty * finalprice).toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h5 className="text-center mt-4">Total: Rs. {totalPrice.toFixed(2)}</h5>
    </div>
  );
}
