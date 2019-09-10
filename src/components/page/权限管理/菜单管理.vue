<template>
	<div>
		<div class="info">
			<div class="title">
				<span class="f1"></span>菜单管理
				<el-button style="float: right;" @click="addRole" class="button">新增菜单</el-button>
			</div>
			<!--表格列表-->
			<div class="ff1">
				
				<div style="width: 85%;margin: 70px auto 80px;">
					<el-table :data="menuTabe" border :header-cell-style="{background:'#dcd3ef'}"  header-row-class-name="tableHead" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
						<el-table-column label="序号" align="center" width="100">
							<template scope="scope">
								<span>{{scope.$index+1}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="id" label="" align="center" v-show:"1==2"></el-table-column>
						<el-table-column prop="name" label="角色名称" align="center"></el-table-column>
						<el-table-column prop="description" label="角色描述" align="center"></el-table-column>
						<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
						<el-table-column prop="caozuo" label="操作" align="center">
							<template slot-scope="scope">
								<a style="color: #409EFF;font-size: 14px;" @click="distribute(scope.$index)">分配菜单</a>
			                    <a style="margin-left: 20px; color: #409EFF;font-size: 14px;" @click="searchRole(scope.$index,roleTabe[scope.$index].id)">角色详情</a>
		                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteRole(scope.$index,roleTabe[scope.$index].id)">删除</a>
			                </template>
						</el-table-column> 
					</el-table>
					
					<!--新增banner弹出框-->
					<el-dialog title="新增角色" :visible.sync="revise" width="25%">
			            <el-form ref="roleInfo" :model="roleInfo" label-width="110px" :label-position="labelPosition" :rules='rules'>
			                <el-form-item label="角色名称:" prop='name'>
			                    <el-input v-model="roleInfo.name" placeholder="请输入角色名称"></el-input>
			                </el-form-item>
			                <el-form-item label="角色描述:" prop='description'>
			                    <el-input v-model="roleInfo.description" placeholder="请输入角色描述"></el-input>
			                </el-form-item>
			            </el-form>
			            <span slot="footer" class="dialog-footer">
			            	<el-button type="primary" @click="saveRole">保存</el-button>
			                <el-button @click="revise=false">取 消</el-button> 
			            </span>
			        </el-dialog>
			        
			        <!--分配菜单-->
			        <el-dialog title="分配菜单" :visible.sync="revises" width="25%">
			        	<span v-show="false">{{id}}</span>
			            <el-tree :data="menuList" show-checkbox node-key="id" :default-expand-all="true" :props="defaultProps"  @check="handleNodeClick"	ref="DeviceGroupTree">
						</el-tree>
			            <span slot="footer" class="dialog-footer">
			            	<el-button type="primary" @click="saveMenuList">保存</el-button>
			                <el-button @click="revises=false">取 消</el-button> 
			            </span>
			        </el-dialog>
			        
			        <!--分配菜单详情-->
			        <el-dialog title="分配菜单详情" :visible.sync="revise1" width="25%">
			        	<span v-show="false">{{id}}</span>
			            <el-tree :data="menuLists" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="pretermit" :props="defaultProp1">
						</el-tree>
			        </el-dialog>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'role',
		data(){
	        return {
	        labelPosition:'left',
	        	menuTabe:[],
	        	revise:false,
	        	revises:false,
	        	revise1:false,
	        	roleInfo:{
	        		name:'',
	        		description:""
	        	},
	        	id:'',
	        	menuList:[],
	        	menuLists:[],
	        	pretermit:[],
	        	defaultProps: {
		            children: 'menuTwoList',
		            label: 'name'
		        },
		        defaultProp1:{
		        	children: 'menuTwoList',
		            label: 'name'
		        },
		        checkedNodes:[],
		        halfCheckedKeys:[],
	        	rules:{
	        		name:{required:true,message:'请输入角色名称',trigger:'blur'},
	        		description:{required:true,message:'请输入角色描述',trigger:'blur'},
	        	}
	        }
		   },
		created(){
			this.randerrMenuTabe()
		},
	   	methods:{
	   		// 时间站位+0
		    addZero (n) {
		    	return n < 10 ? '0' + n : n
		    },
	   		//渲染列表
	   		randerrMenuTabe(){
	   			this.$axios.post(request.testUrl+'/project/auth1/menu/findAllMenuList')
				.then(res=>{
					if(res.data.code==0){
						this.menuTabe=res.data.data;
						
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
					
				})
	   		},
	   		//新增角色
	   		addRole(){
	   			
	   		},
	   		//新增保存
	   		saveRole(){
	   			
	   		},
	   		//角色详情
	   		searchRole(i,id){
	   			
	   		},
	   		//删除角色
	   		deleteRole(id){
	   			
	   		},
			//分配菜单
			distribute(index){
				
			},
			//树形结构点击
			handleNodeClick(a,b){
				
			},
			//分配菜单保存
			saveMenuList(){
				
	   		},
			
	   	}
	}
</script>

<style>
	.info{
		width:96% ;
		margin:40px auto;
	}
	.info .title{
		width: 100%;
		height: 40px;
		line-height: 40px;
		color: #000000;
		font-size:20px ;
		text-indent: 10px;
		margin-bottom: 20px;
	}
	.info .ff1{
		width: 100%;
		background:#F8F8F8;
		padding: 10px 0 10px 0;
	}
	.info .title .f1{
		display: inline-block;
		width: 20px;
		height: 100%;
		background:#9768e5 ;
		float: left;
	}
	.button{
		background:#9768e5 ;
		float: right;
		color: #FFFFFF;
	}
	.button:hover{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.button:focus{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.avatar{
		width:200px;
		height:100px;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>