import * as types from './mutation-types';
// import kuzzle from "../../services/kuzzle";
import {
  performSearchUsers,
  performSearchTimesheets
} from '../../../services/kuzzleWrapper';

const state = {
  users: [],
  timeSheets: []
}

const actions = {
  async [types.UPDATE_USERLIST]({ commit, dispatch }) {
    var users = await performSearchUsers(null, null, {}, 50, [])
    commit(types.USERLIST, users)
  },
  async [types.UPDATE_TIMESHEETS]({ commit, dispatch }) {
    var timeSheets = await performSearchTimesheets({}, 50)
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
