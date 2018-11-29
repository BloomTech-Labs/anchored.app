import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserInfo } from '../../actions/billing';
import Checkout from '../Stripe/Checkout';
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
          <Checkout
            name={'PROOFD'}
            description={'Purchase Credit'}
            amount={10}
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
