import React, {useState, useEffect} from "react";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoAddCircle, IoHome, IoCart } from "react-icons/io5";
import { useSelector } from 'react-redux';

//formulario donde se muestran productos, y se eliminan directamente

const ProductList = () => {
  const [products, setProducts] = useState([]);
    const {user} = useSelector((state) => state.auth);
    const [msg, setMsg] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);   
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/products/${uuid}`);
        setMsg('Product deleted successfully.');
        setProducts(products.filter(product => product.uuid !== uuid)); 
        setTimeout(() => setMsg(''), 2500); 
      } catch (error) {
        setMsg('Failed to delete the Product.');
        setTimeout(() => setMsg(''), 3000); 
      }
    }
  };

  return (
    <div>
      <h1 className="title has-text-dark mt-1">Products</h1>
      <h2 className="subtitle">Catalog of Products</h2>
      
      {user && user.role === 'admin' && (
        <>
           <Link to="/products/add" className="buttonAdd" >Add New <IoAddCircle /></Link>
        </>
      )}

      {user && user.role === 'user' && (
        <>
           <Link to="/dashboard" className="buttonAdd" ><IoHome /></Link>
        </>
      )}

      <div className="container mt-45">
      <div className="columns is-multiline">
        {products.map((product) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card" style={{ maxWidth: '250px', margin: 'auto' }}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img 
                     src={product.url} 
                     alt="Image" 
                     style={{ width: '100%', height: '35vh', backgroundColor: '#ffffff' }}
                    />
                </figure>
              </div>
              <div className="card-content" style={{backgroundColor: '#grey'}}>
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 mt-5">{product.name}</p>
                    <p className="subtitle is-6 mt-1">Available: {product.available}</p>
                    <p className="title is-6 mt-2">${product.price}</p>
                  </div>
                </div>
              </div>
              {user && user.role === 'admin' && (
              <footer className="card-footer">
              <Link to={`/products/edit/${product.uuid}`} className="card-footer-item">
                  Edit
              </Link>
                
                <button
                  onClick={() => handleDelete(product.uuid)}
                  className="card-footer-item"
                >
                  Delete
                </button>
                
              </footer>
              )}
             
              {user && user.role === 'user' && (
              <footer className="card-footer">
              <Link to={`/products/buy/${product.uuid}`} className="card-footer-item">
                  Buy Product $ 
                </Link>                
              </footer>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
      {msg && <div className="notification is-success">{msg}</div>}            
    </div>
  );
};

export default ProductList;
