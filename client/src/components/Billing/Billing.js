import React, { Component } from 'react';
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
  Export,
  ExportContainer,
} from './styles/BillingStyles';
import moment from 'moment';
import ReactGA from 'react-ga';

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: [],
    };
  }

  componentDidMount() {
    ReactGA.pageview('/account');
    if (process.env.REACT_APP_USERS_INVOICE) {
      axios
        .get(`${process.env.REACT_APP_USERS_INVOICE}`)
        .then(res => {
          this.setState({ invoice: res.data });
        })
        .catch(err => console.log('Error on billing', err.message));
    } else {
      axios
        .get(`http://localhost:9000/payment`)
        .then(res => {
          this.setState({ invoice: res.data });
        })
        .catch(err => console.log('Error on billing', err.message));
    }
  }

  getData = () => {
    const invoices = [];
    for (let i = 0; i < this.state.invoice.length; i++) {
      const invoice = this.state.invoice[i];
      const invoice_info = {
        date_billed: moment(invoice.created_at).format('D MMM YYYY hh:mma'),
        transaction: invoice.description,
        amount_billed: `$${invoice.amount /
          100}.00 ${invoice.currency.toUpperCase()}`,
      };
      invoices.push(invoice_info);
    }
    return invoices;
  };

  render() {
    return (
      <MainWrapper>
        <MainHeader>Account</MainHeader>
        <InfoWrapper>
          <ContentContainer>
            <ContentHeader>
              {this.props.user.first_name
                ? this.props.user.first_name + ' ' + this.props.user.last_name
                : this.props.user.username}
            </ContentHeader>
          </ContentContainer>
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
          <InvoiceInfo>Amount billed</InvoiceInfo>
        </InvoiceContainer>
        {this.state.invoice.map(invoice => {
          return (
            <InfoContainer key={invoice.id}>
              <InfoWrapperTwo>
                <InfoDate>
                  {moment
                    .utc(invoice.created_at)
                    .local()
                    .format('D MMM YYYY hh:mma')}
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
        {this.state.invoice.length > 0 ? (
          <ExportContainer>
            <Export
              data={this.getData()}
              onClick={this.getData}
              filename={'invoices'}
            >
              Export
            </Export>
          </ExportContainer>
        ) : null}
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
