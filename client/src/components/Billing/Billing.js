import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserInfo, getUserInvoice } from '../../actions/billing';
import {
  Wrapper,
  MainHeader,
  ContentHeader,
  Invoice,
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
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    // Invoice state
    description: state.billing.description,
    amount: state.billing.amount,
    currency: state.billing.currency,
    created_at: state.billing.created_at,
    // User Account Info
    subscription: state.billing.subscription,
    credits: state.billing.credits,
    fetching: state.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getAllUserInfo, getUserInvoice }
)(Billing);
