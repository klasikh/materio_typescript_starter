import { createStore } from "vuex";
import globalsModule from './modules/globals';
import authModule from './modules/auth';
import todoModule from './modules/todo';

const store = createStore({
    modules:{
        globals: globalsModule,
        auth: authModule,
        todo: todoModule
    }
});

export default store;