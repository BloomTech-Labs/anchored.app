import configureStore from 'redux-mock-store';
import user from '../../src/actions/user';

const mockStore = configureStore();
const store = mockStore();

describe('user actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('retrieve user', () => {
    test('Dispatches action/paylod', () => {
      const Actions = {
        payload: 1,
        type: 'RETRIEVED_USER_INFO',
      };
      store.dispatch(user.getUserInfo(1));
      expect(store.getActions()).toEqual(Actions);
    });
  });
});
