import * as types from "./mutation-types";
// import kuzzle from "../../services/kuzzle";
import kuzzleWrapper from "../../../services/kuzzleWrapper";

const state = {
  users: [],
  timeSheets: []
};
export default {
  async[types.UPDATE_USERLIST]({ commit, dispatch }, data) {
    state.users = await kuzzleWrapper.performSearchUsers(
      null,
      null,
      {},
      50,
      []
    );
    commit(types.UPDATE_USERLIST, data)
  },
  async[types.UPDATE_TIMESHEETS]({ commit, dispatch }, data) {
    state.timeSheets = await kuzzleWrapper.performSearchTimesheets({}, 50);
    commit(types.UPDATE_TIMESHEETS, data)
  },
  async[types.EMPTY_NOTIFICATION]({ commit, dispatch }, data) {
    commit(types.EMPTY_NOTIFICATION, data)
  },
}
export const mutations = {
  async [types.UPDATE_USERLIST](state) {
    state.users = await kuzzleWrapper.performSearchUsers(
      null,
      null,
      {},
      50,
      []
    );
  },
  [types.EMPTY_NOTIFICATION](state) {

  async [types.UPDATE_TIMESHEETS](state) {

  }
};

export default {
  state,
  mutations
};
