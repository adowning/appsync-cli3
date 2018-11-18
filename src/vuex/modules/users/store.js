import * as types from './mutation-types';
import kuzzle from '../../services/kuzzle';
import kuzzleWrapper from '../../../services/kuzzleWrapper';

const state = {
  users: []
}

export const mutations = {
  async [types.UPDATE_USERLIST](state) {
    state.users = await kuzzleWrapper.performSearchUsers()
  },
  [types.EMPTY_NOTIFICATION](state) {
    state.notifications = []
  },
  async [types.UPDATE_TIMESHEETS](state) {
    state.timeSheets = await kuzzleWrapper.performSearchTimesheets()
  }
}

export default {
  state,
  mutations
}
