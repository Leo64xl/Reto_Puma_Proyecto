import React, {useState, useEffect} from 'react'
import { IoMail } from 'react-icons/io5'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

//formulario donde se editan productos

const FormEditProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(() => {
      const getProductById = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/products/${id}`);
          setName(response.data.name);
          setPrice(response.data.price);
          setDescription(response.data.description);
          setAvailable(response.data.available);
        } catch (error) {
          if(error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }
      getProductById();
    }, [id]);

    const updateProduct = async (e) => {
      e.preventDefault();
      try {
          await axios.patch(`http://localhost:5000/products/${id}`, {
            name: name,
            price: price,
            description: description,
            available: available,
          });
          navigate('/products');
      } catch (error) {
        if(error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }


  return (
    <div>
        <h1 className='title has-text-dark'>Products</h1>
        <h2 className='subtitle'>Edit Products</h2>
        <div className='card has-text-dark' style={{backgroundColor: '#ffffff'}}>
            <div className='card-content' style={{backgroundColor: '#ffffff'}}>
                <div className='content'>
                <form 
                  onSubmit={updateProduct}
                  className='has-text-dark' 
                  style={{backgroundColor: '#ffffff'}}>
                  <p className='has-text-centered'>{msg}</p>
                <div className="field" style={{backgroundColor: '#ffffff'}}>
                  <label className='label has-text-dark'><IoMail /> Product Name:</label> 
                  <div className="control">
                    <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type='text' 
                      className="input2"
                      placeholder='Product Name'                                 
                    />
                  </div>
                </div>
                <div className="field">
                  <label className='label has-text-dark'><IoMail /> Price:</label> 
                  <div className="control">
                    <input 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type='text' 
                      className="input2"
                      placeholder='Price'                                 
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoMail /> Description:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      className="input2"
                      placeholder='Description'  
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoMail /> Available:
                  </label> 
                  <div className="control">
                  <div className='selectOptions2'>
                      <select                      
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                      </select> 
                    </div>
                  </div>
                </div>
                
                <div className="field">
                    <div className='buttonSave'>
                        <button 
                          type='submit'
                          className='button is-success'>
                            Update Product
                          </button>
                    </div>
                </div>
              </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditProduct