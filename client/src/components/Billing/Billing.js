import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/user';
import axios from 'axios';
import {
  Wrapper,
  MainHeader,
  InfoWrapper,
  InfoWrapperTwo,
  ContentHeader,
  Invoice,
} from './style/BillingStyles';
class Billing extends Component {
  constructor() {
    super();
    this.state = {
      invoice: [],
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:9000/payment/:id')
      .then(res => {
        let invoice = res.data;
        this.setState({ invoice });
      })
      .catch(err => {
        console.log('Error on billing', err.message);
      });
  }

  render() {
    return (
      <Wrapper>
        <MainHeader>Account Info</MainHeader>
        <InfoWrapper>
          <ContentHeader>
            Current Plan:
            {this.props.user.subscription ? ' Premium Plan' : ' Basic Plan'}
          </ContentHeader>
          <ContentHeader>
            Current Available Credits: {this.props.user.credits}
          </ContentHeader>
        </InfoWrapper>
        <ContentHeader>
          Invoice
          {this.state.invoice.map(invoice => {
            return (
              <InfoWrapperTwo key={invoice.id}>
                <li>{invoice.description}</li>
                <li>{`$${invoice.amount / 100}.00`}</li>
                <li>{invoice.currency.toUpperCase()}</li>
                <li>{invoice.created_at}</li>
                <li>{invoice.credits}</li>
              </InfoWrapperTwo>
            );
          })}
        </ContentHeader>
        <Invoice />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    // User Info Data
    user: state.user.user,
    fetching: state.user.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Billing);
