import Vuex from 'vuex';

// export const store = reactive({
//   user: null,
//   chartofight: null,
// });
export const store = new Vuex.Store({
  state () {
    return {
      user: null,
      chartofight: null,count: 0
    }
  },
})