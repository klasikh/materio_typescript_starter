import jwtInterceptor  from '@/shared/jwtInterceptor';

const state = () => ({
    loading: false,
    error: null,
    registerError: null,
});

const getters = {
    // getAlltodos(state){
    //     return state.todos;
    // }
};

const actions = {
    // async getAllTodos({commit}){
    //     var response = await jwtInterceptor.get('http://localhost:3000/todos');
    //     if(response && response.data){
    //         commit('setTodos', response.data);
    //     }
    // }
};

const mutations = {
    setLoading: (state, value) => {
        state.loading = value;
    },
    setError: (state, error) => {
        state.error = error;
    },
    setRegisterError: (state, registerError) => {
        state.registerError = registerError;
    },
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}