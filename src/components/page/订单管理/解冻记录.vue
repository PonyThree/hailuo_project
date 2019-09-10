<template>
	<div>
		<el-form :model="form" class="chess" :label-position="labelPosition" label-width="120px">
			<div style="width: 40%;float: left;">
	           	<el-form-item label="用户手机号码:" style="width: 600px;float: left;">
	                <el-input v-model="form.mobile" placeholder="用户手机号码" style="width: 200px;"></el-input>
	            </el-form-item>
           </div>
            <div style="width: 100px;float: right;">
            	<!--<el-button style="float: right;margin-right: 20px;" @click="exported">导出数据</el-button>-->
	            <el-button style="float: right;margin-right: 20px;" @click="check(1)">查询</el-button>
            </div>
		</el-form>
		
		<div class="table">
			<!--表格-->
			<el-table :data="tableList" border style="width:83%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
				<el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
				<el-table-column prop="userId" v-show:"false"></el-table-column>
				<el-table-column prop="userName" label="用户名" align="center"></el-table-column>
				<el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
				<el-table-column prop="money" label="解冻金额" align="center"></el-table-column>
				<el-table-column prop="operateUserName" label="操作人" align="center" ></el-table-column>
				<el-table-column prop="remark" label="备注" align="center" ></el-table-column>
				<el-table-column prop="createTime" label="操作时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
	                    <!--<a style="color: #409EFF;font-size: 14px;" @click="checked(scope.$index)">查看详情</a>-->
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
		name:'thaw',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{
	        		mobile:'',
	        	},
	        	tableList:[],
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:10,//每页的数据
		       	total:0,
	        }
	    },
	    created(){
	    	//查询
	    	this.check(1)
	    },
	    watch: {
			'$route'(to,from){
				this.check(1)
			}	
		},
	    methods:{
	    	//导出数据
			//exported(){},
	    	//查询
	    	check(currentPage){
	    		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
	    		this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/order/auth1/unfreezeHandleRecord/findRecordList",
			    	data:{
			    		page:this.currentPage,
			    		pageSize:this.pagesize,
			    		mobile:this.form.mobile,
			    	}
				}).then(res=>{
					if(res.data.code==0){
						this.total = res.data.data.total
						this.tableList=res.data.data.records
						for(var i=0;i<this.tableList.length;i++){
		            		this.tableList[i].createTime=this.dateFormat(this.tableList[i].createTime)
		            	}
					}
				})
	    	},
	    	//时间转换
	    	 dateFormat(row) {
			    const daterc = row;
			    if (daterc != null) {
			        const dateMat = new Date(row);
			        const year = dateMat.getFullYear();
			        const month = dateMat.getMonth() + 1;
			        const day = dateMat.getDate();
			        const hh = dateMat.getHours();
			        const mm = dateMat.getMinutes();
			        const ss = dateMat.getSeconds();
			        const timeFormat =
			        year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
			        return timeFormat;
			    }
		    },
	    	//查看详情
	    	checked(index){
	    		this.$router.push({ path: "/查看详情", query: { id: this.tableList[index].userId}});
	    	},
	    	//分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
		        this.check(currentPage);
		    },
            handleSizeChange(size){
            	this.pagesize = size; //每页下拉显示数据
            	this.check(this.currentPage);
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
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>