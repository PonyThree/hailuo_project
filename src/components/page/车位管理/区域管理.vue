<template>
	<div>
		<el-form :model="form" class="chess">
			<el-form-item label="状态:" style="width: 30%;float: left;margin-left: 50px;">
                <el-select v-model="form.status" placeholder="请选择状态" style="width: 200px;">
				    <el-option key="" label="所有状态" value=""></el-option>
                    <el-option key="1" label="已开盘" value="1"></el-option>
                    <el-option key="0" label="未开盘" value="0"></el-option>
                    <el-option key="2" label="已停售" value="2"></el-option>
			    </el-select>
           </el-form-item>
            <el-button style="float: right;margin-right: 50px;" @click="checked(1)">查询</el-button>
            <el-form-item style="width: 40%;float: right;margin-right: 50px;">
                <el-input v-model="form.name" placeholder="请输入区域名称" style="width: 300px;float: right;"></el-input>
            </el-form-item> 
		</el-form>
		<div class="table">
			<!--按钮-->
			<ul class="listTwo">
				<li><el-button  type="primary" @click="addTag">新增区域</el-button></li>
				<li><el-button  type="primary" @click="batchDelete()">批量删除</el-button></li>
			</ul>
			<!--表格-->
			<!--表格-->
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 91%;margin: 0 auto;" @selection-change="handleSelectionChange" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
				<el-table-column prop="name" label="区域" align="center"></el-table-column>
				<el-table-column prop="code" label="编号" align="center"></el-table-column>
				<el-table-column prop="openStatusName" label="状态" align="center"></el-table-column>
				<el-table-column prop="id" v-show:"false"></el-table-column>
				<!-- <el-table-column prop="image" label="车位分布图" align="center" width="300" >
					<template slot-scope="scope">
						<img :src="scope.row.image"  style="width: 280px;height: 100px;"/>
					</template>
				</el-table-column> -->
				<el-table-column prop="caozuo" label="操作" align="center">
					<template slot-scope="scope">
	                    <a style="color: #409EFF;font-size: 14px;" @click="modifyTable(scope.$index)">修改</a>
	                    <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteTable(scope.$index)">删除</a>
	                </template>
				</el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
			
		</div>
	</div>
</template>

<script>
	export default{
		name:'region',
		data(){
	        return {
	        	form:{
	        		status:'',
	        		name:''
	        	},
	        	tableData:[{}],
	        	info:{},
	        	value:false,
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:10,//每页的数据
		       	total:0,
	        }
	    },
	    created(){
            //查询
	    	this.checked(1);
	    },
	    watch: {
			'$route' (to, from) {
			 this.checked(1)
			}
		},
	    methods:{
	    	//查询
	    	checked(currentPage){
	    		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
				
				this.$axios.get(request.testUrl+"/product/auth1/truckSpaceArea/selectList?page="+this.currentPage+"&pageSize="+this.pagesize,{
					params:{
						status:this.form.status,
						name:this.form.name,
					}
				})
				.then(res=>{
					if(res.data.code==0){
						this.total = res.data.data.total
						this.tableData=res.data.data.records
						// for(var i=0;i<this.tableData.length;i++){
						// 	let images=this.tableData[i].truckSpaceImageList[0].image
						// 	this.tableData[i].image=images
						// }
					}
				})
	    	},
	    	//表格全选
	     	handleSelectionChange(val) {
	        	this.multipleSelection = val;
	        },
	    	//批量删除
	    	batchDelete(){
	    		let id=[]
	    		let list=this.multipleSelection
	    		for(let i in list){
	    			id.push(list[i].id)
	    		}
	    		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpaceArea/doDeleteBath",
			        	data:id
					}).then(res=>{
						if(res.data.code==0){
							this.checked()
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
	      	//新增区域按钮
	      	addTag(){
	      		this.$router.push({ path: '/新增区域'})
	      	},
	      	//修改
	      	modifyTable(index){
	      		this.$router.push({ path: '/修改区域',query:{id:this.tableData[index].id}})
	      	},
	      	//删除每一行
	      	deleteTable(index){
	      		console.log(this.tableData[index].id)
        		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpaceArea/doDeleteBath",
			        	data:[
			        		this.tableData[index].id
			        	]
					}).then(res=>{
						console.log(res.data)
						if(res.data.code==0){
							this.checked()
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
		    handleCurrentChange(currentPage){
		         this.checked(currentPage);
		    },
            handleSizeChange(size){
            	this.pagesize = size; //每页下拉显示数据
            	this.checked(this.currentPage);
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
	.listTwo li:first-child{
		margin-right: 0;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>