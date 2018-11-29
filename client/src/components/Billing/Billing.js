import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserInfo } from '../../actions/billing';
import {
  CheckoutCredit1,
  CheckoutCredit3,
  CheckoutCredit5,
} from '../Stripe/Checkout';
import {
  Wrapper,
  MainHeader,
  ContentHeader,
  Invoice,
  ButtonWrapper,
} from './style/BillingStyles';

class Billing extends Component {
  render() {
    return (
      <Wrapper>
        <MainHeader>Billing</MainHeader>
        <ContentHeader>
          Current Plan:
          {this.props.subscription ? ' Premium Account' : ' Free Account'}
        </ContentHeader>
        <ContentHeader>
          Current Available Credits: {this.props.credits}
        </ContentHeader>
        <ContentHeader>Invoice</ContentHeader>
        <Invoice />
        <ButtonWrapper>
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
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
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
