import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h5>Fruitastic Fruits</h5>
            <p className="text-white-50">
              Your one-stop shop for the freshest fruits, delivered right to your doorstep.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-envelope-fill me-2"></i>
                <a href="mailto:support@fruitastic.com" className="text-white text-decoration-none">
                  support@fruitastic.com
                </a>
              </li>
              <li className="mt-2">
                <i className="bi bi-telephone-fill me-2"></i>
                <span>+91 12345 67890</span>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-white me-3 fs-4 text-decoration-none">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white me-3 fs-4 text-decoration-none">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white fs-4 text-decoration-none">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 border-top border-secondary pt-3">
          <p>&copy; 2025 GunDeep FruitMart!</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;