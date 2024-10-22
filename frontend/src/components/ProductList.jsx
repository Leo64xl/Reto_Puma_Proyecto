import React, {useState, useEffect} from "react";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoBrush, IoTrash, IoAddCircle, IoHome } from "react-icons/io5";
import { useSelector } from 'react-redux';

const ProductList = () => {
  const [products, setProducts] = useState([]);
    const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);   
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
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
              <td>{product.user.name}</td>
              <td>

              {user && user.role === 'admin' && (
                <>
                  <Link to={`/products/edit/${product.uuid}`} className="buttonEdit">Edit<IoBrush /></Link>
                  <button 
                    onClick={()=> deleteProduct(product.uuid)} 
                    className="buttonDelete">Delete<IoTrash />
                  </button>
                </>
              )}

              {user && user.role === 'user' && (
                <>
                  <Link to={`/products/buy/${product.uuid}`} className="buttonEdit">Buy product</Link>
                </>
              )}

              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
