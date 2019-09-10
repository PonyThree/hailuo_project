<template>
	<div>
		<div class="history">
			<div style="width: 50%;height:auto;overflow:hidden;margin: 0 auto;">
				<div class="leftInfo">客户姓名：<span>{{userName}}</span></div>
				<div class="rightInfo">电话：<span>{{mobile}}</span>
					<!--<a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="copy">复制</a>-->
				</div>
			</div>
			
			<!--表格-->
			<el-table :data="tableList" border style="width: 66%;margin: 80px auto 0;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
				<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
				<el-table-column prop="truckSpaceName" label="浏览车位" align="center"></el-table-column>
				<el-table-column prop="seeNum" label="浏览量（次）" align="center"></el-table-column>
				<el-table-column prop="buyStatus" label="认购状态" align="center"></el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper" style="margin-bottom: 50px;">
			</el-pagination>
			
		</div>
		<el-button @click="back" style="margin: 0 auto;display: block;" class="aa1">返回</el-button>
	</div>
</template>

<script>
	export default{
		name:'history',
		data(){
	        return {
	        	tableList:[{}],
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:10,//每页的数据
		       	total:0,
		       	id:'',
		       	userName:'',
		       	mobile:'',
	        }
	    },
	    created(){
	    	this.id=this.$route.query.id,
	    	this.userName=this.$route.query.userName,
	    	this.mobile=this.$route.query.mobile,
	    	//渲染信息
	    	this.check(1)
	    },
	    watch: {
			'$route' (to, from) {
				if(to.path=="/车位浏览历史"){
					this.id=this.$route.query.id,
					this.userName=this.$route.query.userName,
		       		this.mobile=this.$route.query.mobile,
			  		//查询
	    			this.check(1)
				}
			}
		},
	    methods:{
	    	//渲染信息
	    	check(currentPage){
	    		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
	    		this.$axios.get(request.testUrl+"/product/auth1/truckSpaceSeeRecord/seeCarSpaceRecord?page="+this.currentPage+"&pageSize="+this.pagesize,
	    		{
					params:{
						userId:this.id
					}
			    })
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.total = res.data.data.total
		            	this.tableList=res.data.data.records
		            }else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
		        })
	    	},
	    	//复制
	    	copy(){},
	    	//返回
	    	back(){
	    		this.$router.go(-1)
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
	    },
	}
</script>

<style>
	.history{
		width: 96%;
		height: auto;
		overflow: hidden;
		margin: 40px auto;
		padding-top: 40px;
		background: #F8F8F8;
	}
	.history .leftInfo{
		width: 50%;
		float: left;
		height: 30px;
		line-height: 30px;
	}
	.history .rightInfo{
		width: 50%;
		float: right;
		height: 30px;
		line-height: 30px;
	}
	.aa1{
		background:#9768e5 ;
		color: #FFFFFF;
	}
	.aa1:hover{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.aa1:focus{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>