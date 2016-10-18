import React from 'react';
import {Router} from 'react-router'

import "./Add";

class Add extends React.Component {

  constructor() {
    super();
    this.state = { products: [], cartItems: []};
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/products')
      .then(result=> {
        return result.json();
      })
      .then(function(parsedData) {
        this.setState({ products: parsedData.products });
      }.bind(this));
  }

  addItemToCart = (event) => {
    var formObj = event.target.form;
    var id = formObj.product.value;
    var qty = formObj.quantity.value;
    var index = formObj.product.selectedIndex;
    var text = formObj.product[index].text;
    var textArr = text.split('-');
    var price = textArr[textArr.length-1];
    if(qty) {
      var obj = { id: id, quantity: qty, name: textArr[0], price: parseFloat(price)};
      this.setState( {cartItems: this.state.cartItems.concat([obj])} ); 
      formObj.product.value = "";
      formObj.quantity.value = ""; 
    }  
  }

  submitOrder = (event) => {
    var formObj = event.target.form;
    var totalPrice = 0;
    for(var i=0; i< this.state.cartItems.length; i++) {
      var item = this.state.cartItems[i];
      totalPrice += (item.price * item.quantity);
    }
    var data = new FormData();
    var obj = {user_name: formObj.user_name.value, total: totalPrice, items: this.state.cartItems}
    data.append( "json", JSON.stringify({a: 1, b: 2}) );

    fetch('http://localhost:5000/api/add', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(result=> {
      return result.json();
    })
    .then(function(parsedData) {
      if(!parsedData.Error) {
        this.setState( {cartItems: []} );
      }
    }.bind(this));
  }



  render() {
    return(
      <div className='base-container'>
        <div className='title'>Add Order</div>
        <form name='SearchForm'>
        <div className='selection'>
          <select name='product' className='option product'>
            <option value=''>Select an option</option>
            { this.state.products.map(item=> {
              return <option value={item.id}>{item.name}({item.model_name} {item.type_name}) - {item.size_name} - {item.price}</option>
              })
            }
          </select>
          <select name='quantity' className='option'>
            <option value=''>Select Quantity</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          
          <button type='button' className='btn btn-primary' onClick={this.addItemToCart}>Submit</button>
        </div>
        </form>


        {this.state.cartItems.length > 0 && 
          <form name='OrderForm'>
            <table>
              <tr>
                <td>S.No</td>
                <td>Product</td>
                <td>Quantity</td>
                <td>Amount</td>
              </tr>
              { this.state.cartItems.map((item, index)=> { 
                return <tr>
                    <td>{index + 1}</td>
                    <td>
                      {item.name}
                      <input type='hidden' name={'product_id_' + index} value={item.id}/>
                    </td>
                    <td>
                      {item.quantity}
                      <input type='hidden' name={'quantity_' + index}  value={item.quantity}/>
                    </td>
                    <td>
                      {item.price}
                      <input type='hidden' name={'price_' + index} value={item.price}/>
                    </td>
                  </tr>
                }) 
              }
            </table>
            <div className='person'>
              Username: <input type='text' name='user_name'/>
            </div>
            <button type='button' className='btn btn-primary big' onClick={this.submitOrder}>Place Order</button>
          </form>
        }
      </div>
    );
  }
}

export default Add;