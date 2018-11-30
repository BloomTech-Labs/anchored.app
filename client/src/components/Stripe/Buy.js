import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserInfo } from '../../actions/billing';
import {
  CheckoutCredit1,
  CheckoutCredit3,
  CheckoutCredit5,
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
        />
        <CheckoutCredit3
          name={'PROOFD'}
          description={'Purchase 3 Credits'}
          amount={10}
        />
        <CheckoutCredit5
          name={'PROOFD'}
          description={'Purchase 5 Credits'}
          amount={15}
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
  { getAllUserInfo }
)(Billing);
