import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import "./common";

const menuitems = { '/addOrder': 'Add Order', '/orders': 'Orders', '/menu': 'Menu', '/addMenuItem': 'Add Menu Item'}

export default class App extends React.PureComponent {
  constructor(props) {
   super(props);
  };

  static propTypes = {
   children: PropTypes.object,
   selectedMenuItem: PropTypes.string
  };

  render() {
    const { children, route } = this.props;
  
    return (<div>
        <div className="logo">
          Coffee Shop
        </div>
        <header>
          { Object.keys(menuitems).map(key => {
            return <Link className={this.props.routes[this.props.routes.length - 1].selectedMenuItem === key ? 'active' : ''} to={key}>{menuitems[key]}</Link>
            })
          }
        </header>
        { children }
        <footer>
          Copyright @Prasad
        </footer>
    </div>)
  }
}
