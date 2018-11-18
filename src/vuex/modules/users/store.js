import * as types from "./mutation-types";
// import kuzzle from "../../services/kuzzle";
import kuzzleWrapper from "../../../services/kuzzleWrapper";

const state = {
  users: [],
  timeSheets: []
};

const actions = {
  async [types.UPDATE_USERLIST]({ commit, dispatch }, data) {
    state.users = await kuzzleWrapper.performSearchUsers(
      null,
      null,
      {},
      50,
      []
    );
    commit(types.USERLIST, data);
  },
  async [types.UPDATE_TIMESHEETS]({ commit, dispatch }, data) {
    state.timeSheets = await kuzzleWrapper.performSearchTimesheets({}, 50);
    commit(types.TIMESHEETS, data);
  }
};

const mutations = {
  [types.USERLIST](state, data) {
    state.users = data;
  },
  async [types.TIMESHEETS](state, data) {
    state.timeSheets = data;
  }
};

export default {
  state,
  mutations,
  actions
};
