import React from 'react';

import "./default";

class Menu extends React.Component {

  constructor() {
    super();
    this.state = { products: {}, cartItems: [], types: {}};
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/products')
      .then(result=> {
        return result.json();
      })
      .then(function(parsedData) {
        var data = parsedData.products;
        var finalArr = {};
        for(var i=0; i< data.length; i++) {
          var type = data[i].type;
          finalArr[type] = (typeof finalArr[type] == 'undefined') ? [] : finalArr[type];
          finalArr[type].push(data[i]);
          this.state.types[type] = data[i].type_name;
        }
        this.setState({ products: finalArr });
      }.bind(this));
  }

  render() {
    return(
      <div className='base-container'>
        <div className='title'>Menu Items</div>

        { Object.keys(this.state.products).map( key => { 
          return <div className='products clearfix'>

            <h2>{this.state.types[key]}</h2>
            <ul className='product-list'>
              { this.state.products[key].map( item => {
                return <li>
                    <img src ='https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/CoffeeCup.svg/400px-CoffeeCup.svg.png' />
                    <div>
                      {item.name} 
                      <span>({item.model_name} {item.type_name})</span>
                    </div>
                    <div className='price'>${item.price}</div>
                  </li>
                })
              }
            </ul>
            </div>
          })
        }
      </div>
    );
  }
}

export default Menu;