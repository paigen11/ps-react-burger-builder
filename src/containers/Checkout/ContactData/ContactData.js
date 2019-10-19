import React, { Component } from 'react';
import axios from 'axios';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Paige Niedringhaus',
        address: {
          street: 'Teststreet 1',
          zipCode: '12345',
          country: 'USA',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    console.log(order.customer);
    // firebase endpoint is node-name-of-choice.json
    axios
      .post('/orders.json', order)
      .then(
        res => console.log(res),
        this.setState({ loading: false, purchasing: false }),
      )
      .catch(
        err => console.log(err),
        this.setState({ loading: false, purchasing: false }),
      );
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your name here"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your email here"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Your street address here"
          />
          <input
            className={classes.Input}
            type="text"
            name="postalCode"
            placeholder="Your zip code here"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
