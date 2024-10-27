import React, {useState, useEffect} from "react";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoBrush, IoTrash, IoAddCircle, IoHome, IoPricetagOutline } from "react-icons/io5";
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
      <h1 className="titleUsers2">Products</h1>
      <h2 className="subtitleUsers2">List of Products</h2>
      
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

      <div className="designTableProducts">
        <table className="tableDesingProducts">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th> 
              <th>Adviable</th> 
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td> 
              <td>{product.available}</td>
              <td>{product.user.name}</td>
              <td>

              {user && user.role === 'admin' && (
                <>
                  <Link to={`/products/edit/${product.uuid}`} className="buttonEdit">Edit</Link>
                  <button 
                    onClick={()=> handleDelete(product.uuid)} 
                    className="buttonDelete">Delete<IoTrash />
                  </button>
                </>
              )}

              {user && user.role === 'user' && (
                <>
                  <Link to={`/products/buy/${product.uuid}`} className="buttonEdit">Buy product <IoPricetagOutline/></Link>
                </>
              )}

              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      {msg && <div className="notification is-success">{msg}</div>}            
    </div>
  );
};

export default ProductList;
