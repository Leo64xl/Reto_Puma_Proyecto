import React from 'react';
import '../styles/FormBuyProduct.css';

const FormBuyProduct = () => {
  return (
    <div>
      <h1 className='title has-text-dark'>Products</h1>
      <h2 className='subtitle'>Buy Product</h2>
      <div className='card has-text-dark' style={{backgroundColor: '#ffffff'}}>
        <div className='card-content' style={{backgroundColor: '#ffffff'}}>
          <div className='content'>
            <form className='has-text-dark' style={{backgroundColor: '#ffffff'}}>
              <div className="field" style={{backgroundColor: '#ffffff'}}>
                <label className='label has-text-dark'>Product Name:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2"
                    placeholder='Product Name'
                  />
                </div>
              </div>
              <div className="field">
                <label className='label has-text-dark'>Price:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2"
                    placeholder='Price'
                  />
                </div>
              </div>
              <div className="field">
                <label className='label has-text-dark'>Quantity:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2" 
                    placeholder='Quantity'
                  />
                </div>
              </div>
              <div className="field">
                <label className='label has-text-dark'>Total:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2" 
                    placeholder='Total'
                  />
                </div>
              </div>
              <div className="field">
                <label className='label has-text-dark'>Payment Method:</label>
                <div className="control">
                  <div className='selectOptions'>
                    <select>
                      <option value="cash">Cash</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className='label has-text-dark'>Payment Status:</label>
                <div className="control">
                  <div className='selectOptions'>
                    <select>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className='label has-text-dark'>Delivery Address:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2" 
                    placeholder='Delivery Address'
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormBuyProduct;
