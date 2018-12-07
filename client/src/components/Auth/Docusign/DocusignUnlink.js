import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { unlinkUser } from '../../../actions/user';

class DocusignUnlink extends React.Component {
  render() {
    return (
      <Button color="primary" onClick={this.props.unlinkUser}>
        Unlink DocuSign
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(
  mapStateToProps,
  { unlinkUser }
)(DocusignUnlink);
