import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserInfo } from '../../actions/billing';

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
    subscription: state.billing.subscription,
    credits: state.billing.credits,
    fetching: state.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getAllUserInfo }
)(Billing);
