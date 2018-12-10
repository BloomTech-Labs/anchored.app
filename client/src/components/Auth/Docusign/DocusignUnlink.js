import React from 'react';
import { connect } from 'react-redux';
import { unlinkUser } from '../../../actions/user';
import { EditButton } from '../../Settings/styles/SettingsStyles.js';

class DocusignUnlink extends React.Component {
  render() {
    return (
      <EditButton size="lg" onClick={this.props.unlinkUser}>
        Unlink App
      </EditButton>
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
