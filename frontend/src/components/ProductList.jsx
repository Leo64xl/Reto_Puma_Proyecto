import React, { useState, useEffect } from "react";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoAddCircle, IoHome, IoCart } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const handleDelete = async (uuid, name) => {
    const confirmDelete = window.confirm(`'¿Está seguro de que desea eliminar el producto ${name}?'`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/products/${uuid}`);
        setMsg('Producto eliminado exitosamente.');
        setProducts(products.filter(product => product.uuid !== uuid));
        setTimeout(() => setMsg(''), 2500);
      } catch (error) {
        setMsg('No se pudo eliminar el producto.');
        setTimeout(() => setMsg(''), 3000);
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

        {user && user.role === 'user' && (
          <>
            <Link to="/dashboard" className="btn btn-success mb-3"><IoHome /></Link>
          </>
        )}

        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4 mt-2" key={product.id}>
              <div className="card h-100 bg-dark" style={{color: '#ffffff'}}>
                <img
                  src={product.url}
                  alt="Image"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{color: '#e3b04b'}}>{product.name}</h5>
                  <p className="card-text">Disponible: {product.available}</p>
                  <p className="card-text">Precio: ${product.price}</p>
                </div>
                {user && user.role === 'admin' && (
                  <div className="card-footer d-flex justify-content-between" style={{backgroundColor: '#000000'}}>
                    <Link to={`/products/edit/${product.uuid}`} className="btn btn-edit-product me-2">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.uuid, product.name)}
                      className="btn btn-delete-product ms-0" 
                    >
                      Eliminar
                    </button>
                  </div>
                )}
                {user && user.role === 'user' && (
                  <div className="card-footer" style={{backgroundColor: '#000000'}}>
                    <Link to={`/products/buy/${product.uuid}`} className="btnBuyProduct w-100">
                      Comprar Producto <IoCart />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {msg && <div className="alert alert-success mt-3">{msg}</div>}
      </div>
    </div>
  );
};

export default ProductList;