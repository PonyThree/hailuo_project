<template>
	<div>
		<div class="info">
			<div class="title">
				<span class="f1"></span>角色管理
				<el-button style="float: right;" @click="addRole" class="button">新增角色</el-button>
			</div>
			<!--表格列表-->
			<div class="ff1">
				
				<div style="width: 85%;margin: 70px auto 80px;">
					<el-table :data="roleTabe" border :header-cell-style="{background:'#dcd3ef'}"  header-row-class-name="tableHead">
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
		                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteRole(roleTabe[scope.$index].id)">删除</a>
			                </template>
						</el-table-column> 
					</el-table>
					
					<!--新增角色弹出框-->
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
			        <el-dialog title="分配菜单" :visible.sync="revises" width="25%" :close-on-click-modal="stopClose">
			        	<span v-show="false">{{id}}</span>
			            <el-tree :data="menuList" show-checkbox node-key="id" :default-expand-all="true" :props="defaultProps"  @check="handleNodeClick" ref="DeviceGroupTree" :default-checked-keys="pretermits">
						</el-tree>
			            <span slot="footer" class="dialog-footer">
			            	<el-button type="primary" @click="saveMenuList">保存</el-button>
			                <el-button @click="reviseFalse">取 消</el-button> 
			            </span>
			        </el-dialog>
			        
			        <!--分配菜单详情-->
			        <el-dialog title="分配菜单详情" :visible.sync="revise1" width="25%" :close-on-click-modal="stopClose">
			        	<span v-show="false">{{id}}</span>
			            <el-tree :data="menuLists" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="pretermit" :props="defaultProp1">
						</el-tree>
						<span slot="footer" class="dialog-footer">
			            	<el-button type="primary" @click="saveMenuLists">保存</el-button>
			            </span>
			        </el-dialog>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'role',
		data(){
	        return {
				stopClose:false,
	        labelPosition:'left',
	        	roleTabe:[],
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
	        	pretermits:[],
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
	        	},
	        	idd:[]
	        }
		   },
		created(){
			this.randerrRoleTabe()
			this.$axios.post(request.testUrl+'/project/auth1/menu/findAllMenuList')
			.then(res=>{
				if(res.data.code==0){
					this.menuList=res.data.data
				}else{
					this.$message({
						type:'success',
						message:res.data.msg
					})
				}
			})
		},
	   	methods:{
	   		// 时间站位+0
		    addZero (n) {
		    	return n < 10 ? '0' + n : n
		    },
	   		//渲染列表
	   		randerrRoleTabe(){
	   			this.$axios.post(request.testUrl+'/project/auth1/role/findListRole')
				.then(res=>{
					if(res.data.code==0){
						this.roleTabe=res.data.data;
						for(var i=0;i<this.roleTabe.length;i++){
							if(this.roleTabe[i].createTime!=''&& this.roleTabe[i].createTime!=undefined){
	              				var start=this.roleTabe[i].createTime;//获取开始时间
								var d = new Date(start);    //根据时间戳生成的时间对象
								var startDate = (d.getFullYear()) + "-" + 
								           (this.addZero(d.getMonth() + 1)) + "-" +
								           (this.addZero(d.getDate())) + " " + 
								           (this.addZero(d.getHours())) + ":" + 
								           (this.addZero(d.getMinutes())) + ":" + 
								           (this.addZero(d.getSeconds()));      
								this.roleTabe[i].createTime=startDate;//赋值
							}
							
						}
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
	   			this.revise=true
	   		},
	   		//新增保存
	   		saveRole(){
	   			this.$axios({
		        	method:'post',
		        	url:request.testUrl+"/project/auth1/role/addRole",
		        	data:{
		        		name:this.roleInfo.name,
		        		description:this.roleInfo.description
		        	}
				}).then(res=>{
					if(res.data.code==0){
						this.$message({
							type:'success',
							message:'添加成功'
						})
						this.revise=false
						this.roleInfo={}
						this.randerrRoleTabe()
					}else{
						this.$message({
							type:'info',
							message:res.data.msg
						})
					}
				})
	   		},
	   		//角色详情
	   		searchRole(i,id){
	   			this.revise1=true
			   var params=new URLSearchParams();
			   params.append('roleId',id)
			   this.$axios.post(request.testUrl+"/project/auth1/menu/findAllMenuByRole",params)
			   .then(res=>{
				   	if(res.data.code==0){
				   		this.menuLists=res.data.data
						this.pretermit=res.data.data.map(e=>(e.id))
						console.log(this.pretermit)
				   	}else{
				   		this.$message({
							type:'success',
							message:res.data.msg
						})
				   	}
				   
			   })
	   		},
	   		//删除角色
	   		deleteRole(id){

	   			var params=new URLSearchParams();
			    params.append('roleId',id)
			    this.$axios.post(request.testUrl+"/project/auth1/role/deleteById",params)
				    .then(res=>{
					    if(res.data.code==0){
					    	this.randerrRoleTabe()
					    }else{
					    	this.$message({
								type:'success',
								message:res.data.msg
							})
					    }
				    })
	   		},
			//分配菜单查详情
			distribute(index){
				this.id=this.roleTabe[index].id
				this.revises=true
				var params=new URLSearchParams();
			    params.append('roleId',this.id)
			    this.$axios.post(request.testUrl+"/project/auth1/menu/findAllMenuByRole",params)
			    .then(res=>{
				   	if(res.data.code==0){
				   		this.idd=[]
						var ids=res.data.data.map(e=>(e.menuTwoList.map(i=>(i.id))))
						console.log(ids)
						for(var i=0;i<ids.length;i++){
							var idds=ids[i]
							for(var j=0;j<idds.length;j++){
								this.idd.push(idds[j])
							}
						}
				   		this.pretermits=this.idd
				   	}else{
				   		this.$message({
							type:'success',
							message:res.data.msg
						})
				   	}
				   
			    })
					
			},
			//树形结构点击
			handleNodeClick(a,b){
				this.checkedNodes=b.checkedNodes
				this.halfCheckedKeys=b.halfCheckedKeys
			},
			//分配菜单保存
			saveMenuList(){
				if(this.checkedNodes.length>0){
					let ids=this.checkedNodes.map(e=>(e.id))
					for(var i=0;i<this.halfCheckedKeys.length;i++){
						ids.push(this.halfCheckedKeys[i])
					}
					this.$axios({
						method:'post',
			        	url:request.testUrl+"/project/auth1/roleMenu/addMenuForRole",
			        	data:{
			        		roleId:this.id,
			        		menuIds:ids
			        	}
					}).then(res=>{
						if(res.data.code==0){
							this.revises=false
							this.randerrRoleTabe()
							this.reload()
						
						}else{
							this.$message({
								type:'success',
								message:res.data.msg
							})
						}
					})
				}else{
					this.revises=false
					this.reload()
				}
				
	   		},
			reviseFalse(){
				this.revises=false
				this.reload()
			},
			saveMenuLists(){
				this.revise1=false
			}
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
	.el-dialog__headerbtn{
		display: none!important;	
	}
</style>