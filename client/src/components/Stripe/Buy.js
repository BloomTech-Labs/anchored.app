import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserInfo, onToken } from '../../actions/billing';
import BuyBox from './BuyBox.js';

import { ButtonContainer } from './styles/BuyStyles.js';

class Billing extends Component {
  render() {
    return (
      <ButtonContainer>
        <BuyBox
          title="1 Credit"
          copyOne="BUY"
          copyTwo="BUY"
          copyThree="BUY"
          name={'PROOFD'}
          description={'Purchase 1 Credit'}
          amount={5}
          color="primary"
          onToken={this.props.onToken}
          btnDescription="1 Credit"
        />

        <BuyBox
          title="3 Credits"
          copyOne="BUY"
          copyTwo="BUY"
          copyThree="BUY"
          name={'PROOFD'}
          description={'Purchase 3 Credits'}
          amount={10}
          color="success"
          onToken={this.props.onToken}
          btnDescription="3 Credits"
        />
        <BuyBox
          title="5 Credits"
          copyOne="BUY"
          copyTwo="BUY"
          copyThree="BUY"
          name={'PROOFD'}
          description={'Purchase 5 Credits'}
          amount={15}
          color="danger"
          onToken={this.props.onToken}
          btnDescription="5 Credits"
        />
        <BuyBox
          title="Monthly Subscription"
          copyOne="BUY"
          copyTwo="BUY"
          name={'PROOFD'}
          description={'Purchase Monthly Subscription'}
          amount={30}
          color="primary"
          onToken={this.props.onToken}
          btnDescription="Subscribe"
        />
        <BuyBox
          title="Annual Subscription"
          copyOne="BUY"
          copyTwo="BUY"
          name={'PROOFD'}
          description={'Purchase Annual Subscription'}
          amount={300}
          color="success"
          onToken={this.props.onToken}
          btnDescription="Subscribe"
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
