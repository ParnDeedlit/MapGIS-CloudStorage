import axios from 'axios'
var path = require('path');
axios.defaults.baseURL = 'http://localhost:8877';

export function getTreeByUser(user) {
    return axios.get('user/admin/myfile/tree.json');
}

export function getTreeByRole(role) {
    return axios.get('user/admin/download/tree.json');
}

export function getTreeById(id) {
    return axios.get('user/admin/download/tree.json');
}
export function getChildTreeNode(item, role) {
    if (item.title == "我的文件") {
        var filepath = path.join("/user/", role, "myfile/tree.json");
    }
    if (item.title == "下载文件夹") {
        var filepath = path.join("/user/", role, "download/tree.json");
    }
    if (item.title == "我的数据") {
        var filepath = path.join("/user/", role, "mydata/tree.json");
    }
    if (item.title == "共享数据") {
        var filepath = path.join("/user/", role, "sharedata/tree.json");
    }
    return axios.get(filepath);
}

