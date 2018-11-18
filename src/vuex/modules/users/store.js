import * as types from './mutation-types';
// import kuzzle from "../../services/kuzzle";
import {
  performSearchUsers,
  performSearchDocuments
} from '../../../services/kuzzleWrapper';

const state = {
  users: [],
  timeSheets: []
}

const actions = {
  async [types.UPDATE_USERLIST]({ commit, dispatch }) {
    var users = await performSearchUsers(null, null, {}, 50, null)
    commit(types.USERLIST, users)
  },
  /*

export const performSearchDocuments = ( collection, index, filters = {}, pagination = {}, sort = []
)
*/
  async [types.UPDATE_TIMESHEETS]({ commit, dispatch }) {
    var timeSheets = await performSearchDocuments(
      'timeSheets',
      'playground',
      null,
      50,
      null
    )
    commit(types.TIMESHEETS, timeSheets)
  }
}

const mutations = {
  [types.USERLIST](state, data) {
    state.users = data
  },
  async [types.TIMESHEETS](state, data) {
    state.timeSheets = data
  }
}

export default {
  state,
  mutations,
  actions
}
