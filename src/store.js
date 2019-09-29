import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stockInventory: Array
  },
  mutations: {
    setStockInventory(state, payload) {
      console.log(payload);
      console.log(state);
      state.stockInventory = payload;
    }
  },
  actions: {
    setStockInventory({ commit }) {
      commit('setStockInventory');
    }
  },
  getters: {
    stockInventory: state => {
      return state.stockInventory;
    }
  }
});
