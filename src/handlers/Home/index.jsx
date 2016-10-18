import React from 'react';

import "./Home";

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = { items: []};
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/orders')
      .then(result=> {
        return result.json();
        console.log('result:', result.json());
        
      })
      .then(function(parsedData) {
        console.log('parsedData:', parsedData);
        this.setState({ items: parsedData.orders });
      }.bind(this));
  }


  render() {
    return (
      <div className="base-container">
        <div className="title">Orders</div>
        <table>
          <tr>
            <th>S.No</th>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
          </tr>
          { this.state.items.map((item, index)=> { 
            return <tr>
                <td>{index + 1}</td>
                <td>{item.order_id}</td>
                <td>{item.user_name}</td>
                <td>{item.total}</td>
              </tr>
            }) 
          }
        </table>
        
      </div>
    );
  }
}