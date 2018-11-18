import * as types from "./mutation-types";
// import kuzzle from "../../services/kuzzle";
import kuzzleWrapper from "../../../services/kuzzleWrapper";

const state = {
  users: [],
  timeSheets: []
};

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
    state.notifications = [];
  },
  async [types.UPDATE_TIMESHEETS](state) {
    state.timeSheets = await kuzzleWrapper.performSearchTimesheets({}, 50);
  }
};

export default {
  state,
  mutations
};
