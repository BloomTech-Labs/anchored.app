import * as actions from '../../src/actions/user';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('user actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches action/payload', () => {
    const expectedActions = [
      { type: 'RETRIEVING_USER_INFO' },
      { type: 'RETRIEVED_USER_INFO', payload: {} },
    ];

    return store.dispatch(actions.getUserInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
