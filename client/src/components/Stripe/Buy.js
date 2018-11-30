import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserInfo, onToken } from '../../actions/billing';
import {
  CheckoutCredit1,
  CheckoutCredit2,
  CheckoutCredit3,
} from './Checkout.js';
import { ButtonContainer } from './styles/BuyStyles.js';

class Billing extends Component {
  render() {
    return (
      <ButtonContainer>
        <CheckoutCredit1
          name={'PROOFD'}
          description={'Purchase 1 Credit'}
          amount={5}
          color="primary"
          onToken={this.props.onToken}
        />
        <CheckoutCredit2
          name={'PROOFD'}
          description={'Purchase 3 Credits'}
          amount={10}
          color="success"
          onToken={this.props.onToken}
        />
        <CheckoutCredit3
          name={'PROOFD'}
          description={'Purchase 5 Credits'}
          amount={15}
          color="danger"
          onToken={this.props.onToken}
        />
      </ButtonContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscription: state.billing.subscription,
    credits: state.billing.credits,
    fetching: state.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getAllUserInfo, onToken }
)(Billing);
