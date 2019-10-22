<template>
    <div class="sidebar">
    	<div style="width: 100%;height: auto;overflow: hidden;">
	    	<img src="../../assets/img/img.jpg" alt="" style="border-radius: 50%;width: 100px;height: 100px;display: block;margin-left: 50px;margin-top:20px;margin-bottom:25px;float: left;"/>
        </div>
        <el-menu class="sidebar-el-menu" :collapse="collapse" background-color="#9768e5"
            text-color="#ffffff" active-text-color="#606266"  router>
            <!--unique-opened-->
            <!--折叠隐藏-->
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title" style="font-size: 18px;margin-left: 10px;">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index" style="margin-left: 15px;">
                                <template slot="title" >{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index" style="min-width: 180px;">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index" style="min-width: 180px;">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title" style="font-size: 18px;">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import vTags from './Tags.vue';
    export default {
        data() {
            return {
                collapse: false,
                roleId:'',
                items: [
                    {
						icon:'iconfont icon-xiangmuguanli1',
                        index: '1',
                        title: '项目管理',
                        subs: [
                            {
                                index: '项目信息',
                                title: '项目信息',
                                path:'/项目信息'
                            },
                            {
                                index: '项目介绍',
                                title: '项目介绍',
                                path:'/项目介绍'
                            },
                            {
                                index: '项目banner',
                                title: '项目banner',
                                path:'/项目banner'
                            },
                            {
                                index: '现场开盘',
                                title: '现场开盘',
                                path:'/现场开盘'
                            },
                            {
                                index: '项目控制',
                                title: '项目控制',
                                path:'/项目控制'
                            },
                            {
                                index: '项目公告',
                                title: '项目公告',
                                path:'/项目公告'
                            },
                             {
                                index: '项目证书',
                                title: '项目证书',
                                path:'/项目证书'
                            },
                        ]
                    },
                    {
						icon:'iconfont icon-chewei',
                        index: '2',
                        title: '车位管理',
                        subs: [
                            {
                                index: '前端车位展示信息',
                                title: '前端车位展示信息',
                                path:'/前端车位展示信息'
                            },
                            {
                                index: '销售数据看板',
                                title: '销售数据看板',
                                path:'/销售数据看板'
                            },
                            {
                               	index: '车位类别管理',
                                title: '车位类别管理',
                                path:'/车位类别管理'
                            },
                            {
                                index: '车位标签管理',
                                title: '车位标签管理',
                                path:'/车位标签管理'
                            },
                            {
                                index: '区域管理',
                                title: '区域管理',
                                path:'/区域管理'
                            },
                            {
                                index: '楼栋管理',
                                title: '楼栋管理',
                                path:'/楼栋管理'
                            },
                             {
                                index: '楼层管理',
                                title: '楼层管理',
                                path:'/楼层管理'
                            },
                            
                           
                            {
                                index: '车位管理',
                                title: '车位管理',
                                path:'/车位管理'
                            },
                            // 楼栋图片管理
                            {
                                index: '楼栋图片管理',
                                title: '楼栋图片管理',
                                path:'/楼栋图片管理'
                            },
                            {
                                index: '分布图管理',
                                title: '分布图管理',
                                path:'/分布图管理'
                            },
                        ]
                    },
                    {
						icon:'iconfont icon-xingzhuang',
                        index: '3',
                        title: '订单管理',
                        subs: [
                            {
                                index: '订单列表',
                                title: '订单列表' , 
                                path:'/订单列表'
                            },
                            {
                                index: '解冻管理',
                                title: '解冻管理',
                                path:'/解冻管理'
                            },
                            {
                                index: '解冻记录',
                                title: '解冻记录',
                                path:'/解冻记录'
                            }
                        ]
                    },
                    {
						icon:'iconfont icon-kehuguanli-copy',
                        index: '4',
                        title: '客户管理',
                        subs: [
                            {
                                index: '客户管理',
                                title: '客户管理' , 
                                path:'/客户管理'
                            }
                        ]
                    },
                    {
						icon:'iconfont icon-caiwubaobiao',
                        index: '5',
                        title: '财务报表',
                        subs: [
                            {
                                index: '财务报表',
                                title: '财务报表' , 
                                path:'/财务报表'
                            },
                            {
                                index: '申请提现记录',
                                title: '申请提现记录' , 
                                path:'/申请提现记录'
                            }
                        ]
                    },
                    {
						icon:'iconfont icon-gerenzhongxin',
                        index: '6',
                        title: '个人中心',
                        subs: [
                            {
                                index: '设置',
                                title: '设置' ,
                                path:'/设置'
                            }
                        ]
                    },
                    {
						icon:'iconfont icon-quanxianguanli',
                        index: '7',
                        title: '权限管理',
                        subs: [
                            {
                                index: '角色管理',
                                title: '角色管理' ,
                                path:'/角色管理'
                            },
                        ]
                    },
                    {
                       icon:'iconfont icon-huodongguanli',
                       index:"8",
                       title:'活动管理',
                       subs:[
                           {
                               index:'秒杀活动',
                               title:'秒杀活动',
                               subs:[
                                   {
                                       index:'活动列表',
                                       title:'活动列表',
                                       path:'/活动列表'
                                   },
                                //    {
                                //        index:'查看活动',
                                //        title:'查看活动',
                                //        path:'/查看活动'
                                //    },
                                //    {
                                //        index:'活动车位列表',
                                //        title:'活动车位列表',
                                //        path:'/活动车位列表'
                                //    },
                                   {
                                       index:'设置活动详情图',
                                       title:'设置活动详情图',
                                       path:'/设置活动详情图'
                                   },
                                
                               ]
                           },
                           {
                               index:'万人众筹',
                               title:'万人众筹',
                               subs:[
                                   {
                                       index:'暂未开放',
                                       title:'暂未开放'
                                   }
                               ]
                           },
                           {
                               index:'拼团活动',
                               title:'拼团活动',
                               subs:[
                                   {
                                       index:'暂未开放',
                                       title:'暂未开放'
                                   }
                               ]
                           }
                       ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods:{
        		
        },
        created(){
			this.$axios({
	        	method:'post',
	        	url:request.testUrl+"/auth/project/login",
	        	data:{
	        		username:localStorage.getItem('account'),
	        		password:localStorage.getItem('password'),
	        	}
			}).then(res=>{
				if(res.data.code==0){
					this.roleId=res.data.data.roleId ||1
				}
				if(this.roleId==1){
					this.items
				}else{
					this.items=[]
					var menuList=res.data.data.menuList
					for(var i=0;i<menuList.length;i++){
						var menuTwoList=menuList[i].menuTwoList
						var subs=[]
						for(var j=0;j<menuTwoList.length;j++){
                        	subs.push({
                        		index: menuTwoList[j].name,
                                title: menuTwoList[j].name ,
                                path:'/'+menuTwoList[j].name
                        	})
                       }
						if(menuList[i].name=='项目管理'){
							this.items.push({
								icon:'iconfont icon-xiangmuguanli1',
		                        index: '1',
		                        title: '项目管理',
		                        subs:subs, 
							})
							
						}
						if(menuList[i].name=='车位管理'){
							this.items.push({
								icon:'iconfont icon-chewei',
		                        index: '2',
		                        title: '车位管理',
		                        subs:subs, 
							})
							
						}
						if(menuList[i].name=='订单管理'){
							this.items.push({
								icon:'iconfont icon-xingzhuang',
		                        index: '3',
		                        title: '订单管理',
		                        subs:subs, 
							})
							
						}
						if(menuList[i].name=='客户管理'){
							this.items.push({
								icon:'iconfont icon-kehuguanli-copy',
		                        index: '4',
		                        title: '客户管理',
		                        subs:subs, 
							})
							
						}
						if(menuList[i].name=='财务管理'){
							this.items.push({
								icon:'iconfont icon-caiwubaobiao',
		                        index: '5',
		                        title: '财务报表',
		                        subs:subs, 
							})
							
						}
						if(menuList[i].name=='个人中心'){
							this.items.push({
								icon:'iconfont icon-gerenzhongxin',
		                        index: '6',
		                        title: '个人中心',
		                        subs:subs, 
							})
							
						}
						if(menuList[i].name=='权限管理'){
							this.items.push({
								icon:'iconfont icon-quanxianguanli',
		                        index: '7',
		                        title: '权限管理',
		                        subs:subs, 
							})
							
						}
					}
								
				}
			})
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        
    }
</script>

<style scoped>
    .sidebar{
    	height: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0px;
        bottom:0;
        overflow-y: scroll;
        float: left;
        background: #9768e5;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:90%;

    }
	.el-menu-item.is-active{
		background: #FFFFFF!important;
		color: #4a3978!important;	
		font-size: 15px!important;
	}
	.iconfont{
		font-size: 20px!important;
		margin-right: 5px;
	}
	.el-submenu__icon-arrow{
		font-size: 14px!important;
		margin-top: -10px!important;
	}
	.el-submenu__title i{
		color: #FFFFFF!important;
	}
	.el-submenu__title{
		background: #8d73c0!important;
	}
	.el-menu-item{
		padding-left: 55px!important;
	}
</style>
