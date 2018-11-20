import * as types from './mutation-types';
// import kuzzle from "../../services/kuzzle";
import {
  performSearchUsers,
  performSearchDocuments,
  clockInUser
} from '../../../services/kuzzleWrapper';

const state = {
  users: [],
  timeSheets: [],
  deviceUserlist: []
}

const actions = {
  async [types.UPDATE_USERLIST]({ commit, dispatch }) {
    var users = await performSearchUsers(null, null, {}, 50, {})
    commit(types.USERLIST, users)
  },
  async [types.DEVICE_USERLIST]({ commit, dispatch }) {
    var list = await performSearchDocuments(
      'timeSheets',
      'playground',
      [
        { term: { out_timestamp: "0" } },
        { term: { in_location: "74.192.100.17" } }
      ],
      50,
      {}
    )
    commit(types.DEVICE_USERLIST, list)
  },
  async [types.DO_CLOCKIN]({ commit, dispatch }, id) {
    // var status = await clockInUser(id);
    var status = await clockInUser(id)
    console.log(status);
    return status
    // var timeSheets = await performSearchDocuments(
    //   'timeSheets',
    //   'playground',
    //   {},
    //   50,
    //   {}
    // )
    // commit(types.TIMESHEETS, timeSheets)
  },
  async [types.UPDATE_TIMESHEETS]({ commit, dispatch }) {
    var timeSheets = await performSearchDocuments(
      'timeSheets',
      'playground',
      {},
      50,
      {}
    )
    commit(types.TIMESHEETS, timeSheets)
  }
}

const mutations = {
  [types.USERLIST](state, data) {
    state.users = data
  },
  [types.DEVICE_USERLIST](state, data) {
    state.deviceUserlist = data
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
