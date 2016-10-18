import React from 'react';
import {Router} from 'react-router'

import "./addmenu";

class AddMenuItem extends React.Component {

  constructor() {
    super();
    this.state = { types: [], models: [], sizes: []};
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/productOptions')
      .then(result=> {
        return result.json();
        
      })
      .then(function(parsedData) {
        this.setState({ types: parsedData.types, models: parsedData.models, sizes: parsedData.sizes });
      }.bind(this));
  }

  addMenuItem= (event) => {
    var formObj = event.target.form,
        name = formObj.name.value,
        type = formObj.type.value,
        model = formObj.model.value,
        size = formObj.size.value,
        price = formObj.price.value;
    var obj = {name: name, type: type, model: model, size: size, price: price}
    fetch('http://localhost:5000/api/addProduct', {
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
      }
    }.bind(this));
  }



  render() {
    return(
      <div className='base-container'>
        <div className='title'>Add Menu Item</div>
        <form name='AddMenuForm'>
          <table className='addmenuform'>
            <tr>
              <td>Name</td>
              <td>
                <input type='text' name='name' />
              </td>
            </tr>
            <tr>
              <td>Type</td>
              <td>
                <select name='type' className='option'>
                  <option value=''>Select product type</option>
                  { this.state.types.map(item=> {
                    return <option value={item.id}>{item.name}</option>
                    })
                  }
                </select>
              </td>
            </tr>
            <tr>
              <td>Model</td>
              <td>
                <select name='model' className='option'>
                  <option value=''>Select product model</option>
                  { this.state.models.map(item=> {
                    return <option value={item.id}>{item.name}</option>
                    })
                  }
                </select>
              </td>
            </tr>
            <tr>
              <td>Size</td>
              <td>
                <select name='size' className='option'>
                  <option value=''>Select product sie</option>
                  { this.state.sizes.map(item=> {
                    return <option value={item.id}>{item.name}</option>
                    })
                  }
                </select>
              </td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <input type='text' name='price' />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <button type='button' className='btn btn-primary big' onClick={this.addMenuItem}>Submit</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    );
  }



}

export default AddMenuItem;