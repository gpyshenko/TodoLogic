const database = {
    namespaced: true,
    state: {
        db: null,
        notes: null,
        loaded: false
    },
    getters: {
        instance(state) {
            return state.db
        },
        loaded(state) {
            return state.loaded
        }
    },
    mutations: {
        init(state, value) {
            state.db = value;
            state.loaded = true
        },
        createNotesStore(state, value) {
            state.notes = []
        }
    },
    actions: {
        init({commit}, value) {
            commit('init', value)
        }
    }
};

export default database
