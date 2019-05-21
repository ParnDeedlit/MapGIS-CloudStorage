const EVENT_DEFAULT = "default";
const EVENT_OPEN_UPLOADER = "openUploader";
const EVENT_FILE_ADDED = "fileAdded";
const EVENT_FILE_SUCCESS = "fileSuccess";

const state = {
    count: 0,
    visible: false,
    param: {}
};

const mutations = {
    hideUploader(state) {
        state.visible = false;
    },
    showUploader(state) {
        state.visible = true;
    },
    addUploaderCount(state) {
        ++state.count;
    },
    subUploaderCount(state) {
        --state.count;
    },
    openUploader(state, payload) {
        state.param = payload.param;
    },
    fileAdded(state, payload) {

    },
    fileSuccess(state, payload) {

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
