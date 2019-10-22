import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'//默认跳转页面
        },
        {
            path: '/Index',
            component: resolve => require(['../components/page/Index.vue'], resolve),
            meta: { title: 'Index' }
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/项目介绍',
                    component: resolve => require(['../components/page/项目管理/项目介绍.vue'], resolve),
                    meta: { title: '项目介绍' }
                },
                {
                    path: '/项目信息',
                    component: resolve => require(['../components/page/项目管理/项目信息.vue'], resolve),
                    meta: { title: '项目信息' }
                },
                {
                    path: '/项目banner',
                    component: resolve => require(['../components/page/项目管理/项目banner.vue'], resolve),
                    meta: { title: '项目banner' }
                },
                {
                    path: '/现场开盘',
                    component: resolve => require(['../components/page/项目管理/现场开盘.vue'], resolve),
                    meta: { title: '现场开盘' }
                },
                {
                    path: '/项目控制',
                    component: resolve => require(['../components/page/项目管理/项目控制.vue'], resolve),
                    meta: { title: '项目控制' }
                },
                {
                    path: '/项目公告',
                    component: resolve => require(['../components/page/项目管理/项目公告.vue'], resolve),
                    meta: { title: '项目公告' }
                },
                {
                    path: '/项目证书',
                    component: resolve => require(['../components/page/项目管理/项目证书.vue'], resolve),
                    meta: { title: '项目证书' }
                },
                {
                    path: '/前端车位展示信息',
                    component: resolve => require(['../components/page/车位管理/前端车位展示信息.vue'], resolve),
                    meta: { title: '前端车位展示信息' }
                },
                {
                    path: '/销售数据看板',
                    component: resolve => require(['../components/page/车位管理/销售数据看板.vue'], resolve),
                    meta: { title: '销售数据看板' }
                },
                {
                    path: '/车位类别管理',
                    component: resolve => require(['../components/page/车位管理/车位类别管理.vue'], resolve),
                    meta: { title: '车位类别管理' }
                },
                {
                    path: '/车位标签管理',
                    component: resolve => require(['../components/page/车位管理/车位标签管理.vue'], resolve),
                    meta: { title: '车位标签管理' }
                },
                {
                    path: '/区域管理',
                    component: resolve => require(['../components/page/车位管理/区域管理.vue'], resolve),
                    meta: { title: '区域管理' }
                },
                {
                    path: '/新增区域',
                    component: resolve => require(['../components/page/车位管理/新增区域.vue'], resolve),
                    meta: { title: '新增区域' }
                },
                {
                    path: '/修改区域',
                    component: resolve => require(['../components/page/车位管理/修改区域.vue'], resolve),
                    meta: { title: '修改区域' }
                },
                {
                    path: '/楼栋管理',
                    component: resolve => require(['../components/page/车位管理/楼栋管理.vue'], resolve),
                    meta: { title: '楼栋管理' }
                },
                {
                    path: '/楼层管理',
                    component: resolve => require(['../components/page/车位管理/楼层管理.vue'], resolve),
                    meta: { title: '楼层管理' }
                },
                {
                    path: '/新增楼栋管理-第二级',
                    component: resolve => require(['../components/page/车位管理/新增楼栋管理-第二级.vue'], resolve),
                    meta: { title: '新增楼栋管理-第二级' }
                },
                {
                    path: '/修改楼栋管理-第二级',
                    component: resolve => require(['../components/page/车位管理/修改楼栋管理-第二级.vue'], resolve),
                    meta: { title: '修改楼栋管理-第二级' }
                },
               
                {
                    path: '/新增楼栋管理-第三级',
                    component: resolve => require(['../components/page/车位管理/新增楼栋管理-第三级.vue'], resolve),
                    meta: { title: '新增楼栋管理-第三级' }
                },
                {
                    path: '/修改楼栋管理-第三级',
                    component: resolve => require(['../components/page/车位管理/修改楼栋管理-第三级.vue'], resolve),
                    meta: { title: '修改楼栋管理-第三级' }
                },
                {
                    path: '/车位管理',
                    component: resolve => require(['../components/page/车位管理/车位管理.vue'], resolve),
                    meta: { 
                        title: '车位管理' ,
                        keepAlive: false // 不需要缓存
                    }
                },
                {
                    path: '/分布图管理',
                    component: resolve => require(['../components/page/车位管理/分布图管理.vue'], resolve),
                    meta: { 
                        title: '分布图管理' ,
                    }
                },
                {
                    path: '/新增车位',
                    component: resolve => require(['../components/page/车位管理/新增车位.vue'], resolve),
                    meta: { title: '新增车位' }
                },
                {
                    path: '/修改车位信息',
                    component: resolve => require(['../components/page/车位管理/修改车位信息.vue'], resolve),
                    meta: { title: '修改车位信息' }
                },
                {
                    path: '/导入车位',
                    component: resolve => require(['../components/page/车位管理/导入车位.vue'], resolve),
                    meta: { title: '导入车位' }
                },
                {
                    path: '/执行导入',
                    component: resolve => require(['../components/page/车位管理/执行导入.vue'], resolve),
                    meta: { title: '执行导入' }
                },
                {
                    path: '/导入成功',
                    component: resolve => require(['../components/page/车位管理/导入成功.vue'], resolve),
                    meta: { title: '导入成功' }
                },
                {
                    path: '/查看导入',
                    component: resolve => require(['../components/page/车位管理/查看导入.vue'], resolve),
                    meta: { title: '查看导入' }
                },
                {
                    path: '/导入车位批量操作',
                    component: resolve => require(['../components/page/车位管理/导入车位批量操作.vue'], resolve),
                    meta: { title: '导入车位批量操作' }
                },
                {
                    path: '/批量执行导入',
                    component: resolve => require(['../components/page/车位管理/批量执行导入.vue'], resolve),
                    meta: { title: '批量执行导入' }
                },
                {
                    path: '/批量设置信息',
                    component: resolve => require(['../components/page/车位管理/批量设置信息.vue'], resolve),
                    meta: { title: '批量设置信息' }
                },
                {
                    path: '/操作成功',
                    component: resolve => require(['../components/page/车位管理/操作成功.vue'], resolve),
                    meta: { title: '操作成功' }
                },
                {
                    path: '/订单列表',
                    component: resolve => require(['../components/page/订单管理/订单列表.vue'], resolve),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/查看订单',
                    component: resolve => require(['../components/page/订单管理/查看订单.vue'], resolve),
                    meta: { title: '查看订单' }
                },
                {
                    path: '/取消订单',
                    component: resolve => require(['../components/page/订单管理/取消订单.vue'], resolve),
                    meta: { title: '取消订单' }
                },
                {
                    path: '/解冻管理',
                    component: resolve => require(['../components/page/订单管理/解冻管理.vue'], resolve),
                    meta: { title: '解冻管理' }
                },
                {
                    path: '/解冻记录',
                    component: resolve => require(['../components/page/订单管理/解冻记录.vue'], resolve),
                    meta: { title: '解冻记录' }
                },
                {
                    path: '/查看详情',
                    component: resolve => require(['../components/page/订单管理/查看详情.vue'], resolve),
                    meta: { title: '查看详情' }
                },
                {
                    path: '/申请时间-更多',
                    component: resolve => require(['../components/page/订单管理/申请时间-更多.vue'], resolve),
                    meta: { title: '申请时间-更多' }
                },
                {
                    path: '/客户管理',
                    component: resolve => require(['../components/page/客户管理/客户管理.vue'], resolve),
                    meta: { title: '客户管理' }
                },
                {
                    path: '/新增客户',
                    component: resolve => require(['../components/page/客户管理/新增客户.vue'], resolve),
                    meta: { title: '新增客户' }
                },
                {
                    path: '/车位浏览历史',
                    component: resolve => require(['../components/page/客户管理/车位浏览历史.vue'], resolve),
                    meta: { title: '车位浏览历史' }
                },
                {
                    path: '/修改客户信息',
                    component: resolve => require(['../components/page/客户管理/修改客户信息.vue'], resolve),
                    meta: { title: '修改客户信息' }
                },
                {
                    path: '/订单详情',
                    component: resolve => require(['../components/page/客户管理/订单详情.vue'], resolve),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/财务报表',
                    component: resolve => require(['../components/page/财务报表/财务报表.vue'], resolve),
                    meta: { title: '财务报表' }
                },
                {
                    path: '/查看客户详情',
                    component: resolve => require(['../components/page/财务报表/查看客户详情.vue'], resolve),
                    meta: { title: '查看客户详情' }
                },
                {
                    path: '/订单详情页',
                    component: resolve => require(['../components/page/财务报表/订单详情页.vue'], resolve),
                    meta: { title: '订单详情页' }
                },
                {
                    path: '/申请提现',
                    component: resolve => require(['../components/page/财务报表/申请提现.vue'], resolve),
                    meta: { title: '申请提现' }
                },
                {
                    path: '/申请提现记录',
                    component: resolve => require(['../components/page/财务报表/申请提现记录.vue'], resolve),
                    meta: { title: '申请提现记录' }
                },
                {
                    path: '/查看申请记录',
                    component: resolve => require(['../components/page/财务报表/查看申请记录.vue'], resolve),
                    meta: { title: '查看申请记录' }
                },
                {
                    path: '/设置',
                    component: resolve => require(['../components/page/个人中心/设置.vue'], resolve),
                    meta: { title: '设置' }
                },
                {
                    path: '/权限详情',
                    component: resolve => require(['../components/page/个人中心/权限详情.vue'], resolve),
                    meta: { title: '权限详情' }
                },
               	{
                    path: '/角色管理',
                    component: resolve => require(['../components/page/权限管理/角色管理.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/菜单管理',
                    component: resolve => require(['../components/page/权限管理/菜单管理.vue'], resolve),
                    meta: { title: '菜单管理' }
                },
                {
                    path:'/活动列表',
                    component:resolve=>require(['../components/page/活动管理/activityList.vue'],resolve),
                    meta:{title:'活动列表'}
                },
                {
                    path:'/查看活动',
                    component:resolve=>require(['../components/page/活动管理/findActivity.vue'],resolve),
                    meta:{title:'查看活动'}
                },
                {
                    path:'/活动车位列表',
                    component:resolve=>require(['../components/page/活动管理/activityCarList.vue'],resolve),
                    meta:{title:'活动车位列表'}
                },
                {
                    path:'/导入活动车位',
                    component:resolve=>require(['../components/page/活动管理/导入活动车位.vue'],resolve),
                    meta:{title:'导入活动车位'}
                },
                // 设置活动详情图
                {
                    path:'/设置活动详情图',
                    component:resolve=>require(['../components/page/活动管理/设置活动详情图.vue'],resolve),
                    meta:{title:'设置活动详情图'}
                },
                {
                    path:'/执行活动导入',
                    component:resolve=>require(['../components/page/活动管理/执行活动导入.vue'],resolve),
                    meta:{title:'执行活动导入'}
                },
                {
                    path:'/导入活动成功',
                    component:resolve=>require(['../components/page/活动管理/导入活动成功.vue'],resolve),
                    meta:{title:'导入活动成功'}
                },
                {
                    path:'/查看活动导入',
                    component:resolve=>require(['../components/page/活动管理/查看活动导入.vue'],resolve),
                    meta:{title:'查看活动导入'}
                },
                {
                    path:'/添加活动车位',
                    component:resolve=>require(['../components/page/活动管理/addParking.vue'],resolve),
                    meta:{title:'添加活动车位'}
                },
                {
                    path:'/楼栋图片管理',
                    component:resolve=>require(['../components/page/车位管理/楼栋图片管理.vue'],resolve),
                    meta:{title:'楼栋图片管理'}
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
