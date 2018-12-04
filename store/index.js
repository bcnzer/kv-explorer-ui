import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      namespaces: null,
      currentNamespace: null
    }),
    mutations: {
      currentNamespace(state, namespace) {
        state.currentNamespace = namespace
      },
      setNamespaces(state, namespaces) {
        state.namespaces = namespaces
      }
    }
  })
}

export default createStore
