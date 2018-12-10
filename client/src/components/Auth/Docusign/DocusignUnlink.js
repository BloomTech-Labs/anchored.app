import React from 'react';
import { connect } from 'react-redux';
import { unlinkUser } from '../../../actions/user';
import { EditButton } from '../../Settings/styles/SettingsStyles.js';

class DocusignUnlink extends React.Component {
  render() {
    const history = this.props.history;
    return (
      <EditButton size="lg" onClick={() => this.props.unlinkUser(history)}>
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
