import React from 'react';
import { useDispatch } from 'react-redux';
import { unlinkUser } from '../../../actions/user';
import { EditButton } from '../../Settings/styles/SettingsStyles.js';
import { useHistory } from 'react-router-dom';

const DocusignUnlink = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <EditButton size="lg" onClick={() => dispatch(unlinkUser(history))}>
      Unlink App
    </EditButton>
  );
};

export default DocusignUnlink;
