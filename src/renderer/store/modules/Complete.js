const state = {
    count: 0,
    result: []
};

const mutations = {
    addCompleteCount(state) {
        ++state.count;
    },
    addCompleteResult(state, payload) {
        state.result.push(payload.file);
    }
};

const actions = {
    //context是固定语法，表示全局上下文, 第二个是传递的参数
    AsyncTask(context, info) {
        let { commit, state } = context;
    },
    SyncTask(context, isloging) {
        let { commit, state } = context;
    }
};

export default {
    state,
    mutations,
    actions
};
