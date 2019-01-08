import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onToken } from '../../actions/billing';
import BuyBox from './BuyBox.js';
import { BoxContainer, BasicDiv } from './styles/BuyStyles.js';
import ReactGA from 'react-ga';

class Buy extends Component {
  componentDidMount() {
    ReactGA.pageview('/buy');
  }

  render() {
    return (
      <BoxContainer>
        <BasicDiv>
          <BuyBox
            title="1 Credit"
            copyOne="Proof 1 Document"
            copyTwo="Convenient Pricing"
            copyThree="One Time Purchase"
            name={'PROOFD'}
            description={'Purchase 1 Credit'}
            amount={5}
            color="primary"
            onToken={this.props.onToken}
            btnDescription="$5"
          />

          <BuyBox
            title="3 Credits"
            copyOne="Proof 3 Documents"
            copyTwo="One Time Purchase"
            copyThree="Discounted Pricing"
            name={'PROOFD'}
            description={'Purchase 3 Credits'}
            amount={10}
            color="success"
            onToken={this.props.onToken}
            btnDescription="$10"
          />
          <BuyBox
            title="5 Credits"
            copyOne="Proof 5 Documents"
            copyTwo="Value Pricing"
            copyThree="One Time Purchase"
            name={'PROOFD'}
            description={'Purchase 5 Credits'}
            amount={15}
            color="danger"
            onToken={this.props.onToken}
            btnDescription="$15"
          />
        </BasicDiv>
        {/* Uncomment below when ready to go live with premium */}
        {/* <PremiumDiv>
          <BuyBox
            title="Monthly Subscription"
            name={'PROOFD'}
            description={'Purchase Monthly Subscription'}
            amount={30}
            color="primary"
            onToken={this.props.onToken}
            btnDescription="Subscribe"
          />

          <BuyBox
            title="Annual Subscription"
            name={'PROOFD'}
            description={'Purchase Annual Subscription'}
            amount={300}
            color="success"
            onToken={this.props.onToken}
            btnDescription="Subscribe"
          />
        </PremiumDiv> */}
      </BoxContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { onToken }
)(Buy);
