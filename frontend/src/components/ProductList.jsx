import React, { useState, useEffect } from "react";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoAddCircle, IoHome, IoCart, IoEye } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProductList(response.data);
  };

  const handleDeleteProduct = async (uuid, name) => {
    const confirmDelete = window.confirm(`'¿Está seguro de que desea eliminar el producto ${name}?'`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/products/${uuid}`);
        setMessage('Producto eliminado exitosamente.');
        setProductList(productList.filter(product => product.uuid !== uuid));
        setTimeout(() => setMessage(''), 2500);
      } catch (error) {
        setMessage('No se pudo eliminar el producto.');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  return (  
    <div className="product-list-container">
      <div>
        <h1 className="title" style={{ color: '#E3B04B' }}>Productos</h1>
        <h2 className="subtitle" style={{ color: '#ffffff' }}>Catalogo De Productos</h2>

        {user && user.role === 'admin' && (
          <>
            <Link to="/products/add" className="btn btn-add-product mb-3">Añadir Producto <IoAddCircle /></Link>
          </>
        )}
        
        <div className="row">
          {productList.map((product) => (
            <div className="col-md-3 mb-4 mt-2" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.url}
                  alt="Image"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.available} Disponibles</p>
                  <p className="card-text">Precio: ${product.price}</p>
                </div>
                {user && user.role === 'admin' && (
                  <div className="card-footer d-flex justify-content-between">
                    <Link to={`/products/edit/${product.uuid}`} className="btn btn-edit-product me-2">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.uuid, product.name)}
                      className="btn btn-delete-product ms-0" 
                    >
                      Eliminar
                    </button>
                  </div>
                )}
                {user && user.role === 'user' && (
                  <div className="card-footer">
                    <Link to={`/products/buy/${product.uuid}`} className="btn-buy-product w-100">
                      Detalles Producto <IoCart />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default ProductList;