<template>
	<div>
		<el-form :model="form" class="chess">
			<div style="width: 50%;float: left;">
				<el-form-item label="是否禁用:" style="width: 35%;float: left;margin-left: 50px;">
	                <el-select v-model="form.useStatus" placeholder="请选择状态" style="width: 100px;" >
					    <el-option key="" label="所有状态" value=""></el-option>
	                    <el-option key="0" label="禁用" value="0"></el-option>
	                    <el-option key="1" label="启用" value="1"></el-option>
				    </el-select>
	            </el-form-item>
	            <el-form-item label="标签类别:" style="width: 50%;float: left;margin-left: 50px;">
	                <el-select v-model="form.tagTypeId" placeholder="请选择">
	                	<el-option key="" label="所有状态" value=""></el-option>
                   		<el-option v-for="item in typeList" :label="item.typeName" :value="item.id"></el-option>
				    </el-select>
	            </el-form-item>
            </div>
            <div style="width: 50%;float:right;">
	            <el-button style="float: right;margin-right: 50px;" @click="checkeds(1)">查询</el-button>
	            <el-form-item style="width: 40%;float: right;margin-right: 50px;">
	                <el-input v-model="form.name" placeholder="请输入标签名称" style="width: 300px;float: right;"></el-input>
	            </el-form-item> 
            </div>
		</el-form>
		<div class="table">
			<!--按钮-->
			<ul class="listTwo">
				<li><el-button  type="primary" @click="addTag">新增标签</el-button></li>
			</ul>
			<!--表格-->
			<el-table :data="tableData" border style="width: 94%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
				<el-table-column type="index" label="序号" align="center"  width="60" ></el-table-column>
				<el-table-column prop="tagTypeName" label="标签类别" align="center"></el-table-column>
				<el-table-column prop="name" label="标签名称" align="center"></el-table-column>
				<el-table-column prop="sort" label="排序" align="center"></el-table-column>
				<el-table-column label="禁用" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.useStatus" active-color="#409EFF" inactive-color="#909399" @change="changeSwitch(scope.row)"></el-switch>
						<!-- <el-switch v-model="scope.row.useStatus" active-text="" inactive-text="" @change="changeStatus(scope.row.id,scope.row.online)" v-if="scope.row.actStatus!=3"></el-switch> -->
					</template>
				</el-table-column>
				<el-table-column prop="caozuo" label="操作" align="center">
					<template slot-scope="scope">
	                        <a style="color: #409EFF;font-size: 14px;" @click="modifyTable(scope.$index)" v-if="tableData[scope.$index].ableModify!=0">修改</a>
	                        <a style="color: #409EFF;font-size: 14px;"  v-else>不可修改</a>
	                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteTable(scope.$index)" v-if="tableData[scope.$index].ableModify!=0">删除</a>
	                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" v-else>不可删除</a>
	                </template>
				</el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
			
			<!--新增标签弹出窗-->
			<el-dialog title="新增标签" :visible.sync="revise" width="25%">
	            <el-form ref="info" :model="info" label-width="100px" >
	                <el-form-item label="标签名称:">
	                    <el-input v-model="info.name" placeholder="请输入前端展示字段"></el-input>
	                </el-form-item>
	                <el-form-item label="车位类别:">
	                    <el-select v-model="info.tagTypeId" placeholder="请选择" style="width: 100%;">
	                   		<el-option v-for="item in typeList1" :label="item.typeName" :value="item.id"></el-option>
					    </el-select>
	                </el-form-item>
	                <el-form-item label="排序:">
	                    <el-input v-model="info.sort" placeholder="请输入数字"></el-input>
	                </el-form-item>
	                <el-form-item v-show="false">
	                    <el-input v-model="info.id" ></el-input>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="saveInfo">保存</el-button>
	                <el-button @click="revise=false">取 消</el-button> 
	            </span>
	       </el-dialog>
	        
	       	<!--修改弹出框-->
	       	<el-dialog title="修改类别" :visible.sync="visible" width="25%">
	            <el-form ref="info" :model="reviseInfo" label-width="100px" >
	                <el-form-item label="标签名称:">
	                    <el-input v-model="reviseInfo.name" placeholder="请输入前端展示字段"></el-input>
	                </el-form-item>
	                <el-form-item label="标签类别:">
		                <el-select v-model="reviseInfo.tagTypeId" placeholder="请选择" style="width: 100%;">
	                   		<el-option v-for="item in typeList2" :label="item.typeName" :value="item.id"></el-option>
					    </el-select>
					</el-form-item>
	                <el-form-item label="排序:">
	                    <el-input v-model="reviseInfo.sort" placeholder="请输入数字"></el-input>
	                </el-form-item>
	                <el-form-item v-show="false">
	                    <el-input v-model="reviseInfo.id" ></el-input>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="save">保存</el-button>
	                <el-button @click="visible=false">取 消</el-button> 
	            </span>
	        </el-dialog>
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'tags',
		data(){
	        return {
	        	form:{
	        		name:'',
	        		useStatus:'',
	        		tagTypeId:''
	        	},
	        	typeList:[],
	        	tableData:[{}],
	        	typeList1:{},
	        	typeList2:{},
	        	info:{
	        		name:'',
	        		tagTypeId:'',
	        		sort:''
	        	},
	        	reviseInfo:{
	        		name:'',
	        		tagTypeId:'',
	        		sort:''
	        	},
	        	value:false,
	        	revise:false,
	        	visible:false,
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:10,//每页的数据
		       	total:0,
		       	id:''
	        }
	    },
	    created(){
	    	//标签类别名列表查询
			this.$axios.get(request.testUrl+"/product/auth1/tagType/tagTypeNameList")
				.then(res=>{
					if(res.data.code==0){
						this.typeList=res.data.data
						this.typeList1=res.data.data
						this.typeList2=res.data.data
					}
				})

	    	this.id=this.$route.query.id
			if(this.id!=undefined){
				this.form.tagTypeId=this.id
			}
	    	this.checkeds(1)

	    },
	    watch: {
		    '$route'(to, from){
			    this.id=this.$route.query.id
				if(this.id!=undefined){
					this.form.tagTypeId=this.id
				}
			      this.checkeds(1)
			}
		},
	    methods:{

	    	//查询
			checkeds(currentPage){
	    		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
				
				this.$axios.get(request.testUrl+"/product/auth1/tag/pageList?current="+this.currentPage+"&pageSize="+this.pagesize,{
					params:{
						name:this.form.name==''?null:this.form.name,
						useStatus:this.form.useStatus,
						tagTypeId:this.form.tagTypeId==''?null:this.form.tagTypeId,
					}
				})
				.then(res=>{
					if(res.data.code==0){
						this.total = res.data.data.total
						this.tableData=res.data.data.records
						for(var i in this.tableData){
							this.tableData[i].useStatus=this.tableData[i].useStatus==0
						}
					}
				})
	        },
	        //switch开关
	        changeSwitch(data){
	        	var params = new URLSearchParams();
        		params.append('id', data.id);      		
        		params.append('useStatus', data.useStatus==true?0:1,);
	        	this.$axios.post(request.testUrl+"/product/auth1/tag/updateUseStatus",params)
				.then(res=>{
					if(res.data.code==0){
						this.checkeds()
						this.$message({
							type: 'info',
							message: '切换成功！'
						});
					}
				})
	        },
	      	//新增标签按钮
	      	addTag(){
	      		this.revise=true;
	      	},
	      	//新增标签保存
	      	saveInfo(){
	      		this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/tag/add",
			        	data:{
			        		id:this.info.id,
			        		name:this.info.name,
			        		sort:this.info.sort,
			        		tagTypeId:this.info.tagTypeId
			        	}
				}).then(res=>{
					if(res.data.code==0){
						this.revise=false;
						this.checkeds()
						this.reload()
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	      	},
	      	//修改
	      	modifyTable(index){
	      		this.visible=true;
	      		var id=this.tableData[index].id
	      		this.$axios.get(request.testUrl+"/product/auth1/tag/"+id)
				.then(res=>{
					console.log(res.data.data)
					if(res.data.code==0){
						this.reviseInfo=res.data.data
					}
				})
	      	},
	      	//修改保存
	      	save(){
	      		this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/tag/update",
			        	data:{
			        		id:this.reviseInfo.id,
			        		sort:this.reviseInfo.sort,
			        		name:this.reviseInfo.name,
			        		tagTypeId:this.reviseInfo.tagTypeId
			        	}
					}).then(res=>{
						if(res.data.code==0){
							this.visible=false;
							this.checkeds()
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
	      	},
	      	//删除
	      	deleteTable(index){
        		 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/tag/delete",
			        	data:[
			        		this.tableData[index].id
			        	]
					}).then(res=>{
						if(res.data.code==0){
							this.checkeds()
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
	      	//分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
		        this.checkeds(currentPage);
		    },
            handleSizeChange(size){
            	this.pagesize = size; //每页下拉显示数据
            	this.checkeds(this.currentPage);
            },
	    }
	}
</script>

<style>
	.info{
		width:96% ;
		margin:20px auto;
	}
	.chess{
		background: #dcd3ef;
		width: 96%;
		margin: 0 auto;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		padding-top: 13px;
		box-sizing: border-box;
	}
	.table{
		width: 96%;
		margin: 0 auto;
		margin-top: 40px;
	}
	.listTwo{
		width: 97.5%;
		height: 32px;
		margin-bottom: 30px;
	}
	.listTwo li{
		display: inline-block;
		line-height: 32px;
		float: right;
		margin-right: 50px;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>