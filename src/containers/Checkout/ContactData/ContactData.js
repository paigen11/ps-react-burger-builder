import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
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
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <Input
          inputtype="normal"
          type="text"
          name="name"
          placeholder="Your name here"
        />
        <Input
          inputtype="normal"
          type="email"
          name="email"
          placeholder="Your email here"
        />
        <Input
          inputtype="normal"
          type="text"
          name="street"
          placeholder="Your street address here"
        />
        <Input
          inputtype="normal"
          type="text"
          name="postalCode"
          placeholder="Your zip code here"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
