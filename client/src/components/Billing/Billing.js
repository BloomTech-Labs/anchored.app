import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const Billing = () => {
  const [invoice, setInvoice] = useState([]);

  const user = useSelector(state => state.user.user);

  useEffect(() => {
    ReactGA.pageview('/account');

    if (process.env.REACT_APP_USERS_INVOICE) {
      axios
        .get(`${process.env.REACT_APP_USERS_INVOICE}`)
        .then(res => setInvoice(res.data))
        .catch(err => console.log('Error on billing', err.message));
    } else {
      axios
        .get(`http://localhost:9000/payment`)
        .then(res => setInvoice(res.data))
        .catch(err => console.log('Error on billing', err.message));
    }
  }, []);

  const getData = () => {
    const invoices = [];

    for (let i = 0; i < invoice.length; i++) {
      const inv = invoice[i];
      const invoice_info = {
        date_billed: moment(inv.created_at).format('D MMM YYYY hh:mma'),
        transaction: inv.description,
        amount_billed: `$${inv.amount / 100}.00 ${inv.currency.toUpperCase()}`,
      };
      invoices.push(invoice_info);
    }

    return invoices;
  };

  return (
    <MainWrapper>
      <MainHeader>Account</MainHeader>
      <InfoWrapper>
        <ContentContainer>
          <ContentHeader>
            {user.first_name
              ? user.first_name + ' ' + user.last_name
              : user.username}
          </ContentHeader>
        </ContentContainer>
        <ContentContainer>
          <ContentHeader>Available Credits</ContentHeader>
          {user.credits}
        </ContentContainer>
        <ContentContainer>
          <ContentHeader>Plan Type</ContentHeader>
          {user.subscription ? ' Premium' : ' Basic'}
        </ContentContainer>
      </InfoWrapper>
      <InvoiceContainer>
        <InvoiceInfo>Date billed</InvoiceInfo>
        <InvoiceInfo>Transaction</InvoiceInfo>
        <InvoiceInfo>Amount billed</InvoiceInfo>
      </InvoiceContainer>
      {invoice.map(invoice => {
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
                {`$${invoice.amount / 100}.00`} {invoice.currency.toUpperCase()}
              </InfoAmountBilled>
            </InfoWrapperTwo>
          </InfoContainer>
        );
      })}
      {invoice.length > 0 ? (
        <ExportContainer>
          <Export data={getData()} onClick={getData} filename={'invoices'}>
            Export
          </Export>
        </ExportContainer>
      ) : null}
    </MainWrapper>
  );
};

export default Billing;
