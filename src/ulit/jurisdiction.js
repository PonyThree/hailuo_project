let bool = false;
/**
 * 分配权限
 * @param {String} mainNode     
 * @param {String} childNode 
 */
function jurisdictionAllot(nodeName) {
    // 获取用户登录的时候的权限数据
    let jurisdictionData = JSON.parse(localStorage.getItem("jurisdiction"));
    // 获取登录用户状态是管理员(1)还是普通用户(0)
    let roleId = JSON.parse(localStorage.getItem("roleId"))
    // 不是超级管理员
    if (roleId != 1) {
        searchNode(jurisdictionData, nodeName);
        return bool
    }
    // 是超级管理员
    else {
        return true
    }
}
/**
 * 递归搜索节点
 * @param {String} nodeName 节点名
 */
function searchNode(arr, nodeName) {
    if (arr) {
        arr.forEach(item => {
            if (item.name === nodeName && item.ableWriter != null) {
                bool = !!item.ableWriter ? true : false;
                return false;
            } else {
                searchNode(item.menuList, nodeName);
            }
        })
    }
}

export {
    jurisdictionAllot
}