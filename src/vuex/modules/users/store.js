import * as types from './mutation-types';
import kuzzle from '../../services/kuzzle';

const state = {
  users: []
}

export const mutations = {
  [types.SET_USERS](state) {
    state.users = kuzzle.security.searchUsers(null, null, function(
      error,
      result
    ) {
      return result
    });
  },
  [types.EMPTY_NOTIFICATION](state) {
    state.notifications = []
  }
}

export default {
  state,
  mutations
}
