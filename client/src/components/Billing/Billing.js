import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  MainWrapper,
  MainHeader,
  InfoWrapper,
  InfoWrapperTwo,
  InfoContainer,
  InfoDate,
  InfoTransaction,
  InfoAmountBilled,
  InvoiceContainer,
  InvoiceInfo,
  ContentContainer,
  ContentHeader,
  Invoice,
} from './styles/BillingStyles';
import moment from 'moment';

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/payment/:id')
      .then(res => this.setState({ invoice: res.data }))
      .catch(err => console.log('Error on billing', err.message));
  }

  render() {
    return (
      <MainWrapper>
        <MainHeader>Account: {this.props.user.username}</MainHeader>
        <InfoWrapper>
          <ContentContainer>
            <ContentHeader>Available Credits</ContentHeader>
            {this.props.user.credits}
          </ContentContainer>

          <ContentContainer>
            <ContentHeader>Plan Type</ContentHeader>
            {this.props.user.subscription ? ' Premium' : ' Basic'}
          </ContentContainer>
        </InfoWrapper>

        <InvoiceContainer>
          <InvoiceInfo>Date billed</InvoiceInfo>
          <InvoiceInfo>Transaction</InvoiceInfo>
          <InvoiceInfo>Amount billed (USD)</InvoiceInfo>
        </InvoiceContainer>

        {this.state.invoice.map(invoice => {
          return (
            <InfoContainer key={invoice.id}>
              <InfoWrapperTwo>
                <InfoDate>
                  {moment(invoice.created_at).format('D MMM YYYY hh:mma')}
                </InfoDate>
                <InfoTransaction>{invoice.description}</InfoTransaction>
                <InfoAmountBilled>
                  {`$${invoice.amount / 100}.00`}{' '}
                  {invoice.currency.toUpperCase()}
                </InfoAmountBilled>
              </InfoWrapperTwo>
            </InfoContainer>
          );
        })}

        <Invoice />
      </MainWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    // User Info Data
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Billing);
