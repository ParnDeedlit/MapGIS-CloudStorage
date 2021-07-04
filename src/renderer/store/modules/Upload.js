const EVENT_DEFAULT = "default";
const EVENT_OPEN_UPLOADER = "openUploader";
const EVENT_FILE_ADDED = "fileAdded";
const EVENT_FILE_SUCCESS = "fileSuccess";

const state = {
    count: 0,
    visible: false,
    current: [],
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
    addCurrentFile(state, payload) {
        //state.current.push(payload.file);
    },
    deleteCurrentFile(state, payload) {
        let file = payload.file;
        state.current = state.current.filter(item => {
            let { uniqueIdentifier, name } = item;
            if (file.name == name && file.uniqueIdentifier == uniqueIdentifier) {
                console.log("find file", file);
                return;
            } else {
                return item;
            }
        });
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
