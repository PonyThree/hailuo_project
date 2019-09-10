<template>
	<div>
		<el-form :model="form" class="chess" :label-position="labelPosition" label-width="120px">
			<div style="width: 40%;float: left;">
				<el-form-item label="订单步骤:" style="width: 600px;float: left;">
					<el-select v-model="form.buyType" placeholder="请选择订单状态" style="width: 200px;">
						<el-option label="所有状态" value="" key=""></el-option>
					    <el-option label="落位" value="1" key="1"></el-option>
					    <el-option label="认购" value="2" key="2"></el-option>
					    <el-option label="购买完成" value="3" key="3"></el-option>
					    <el-option label="预订单" value="4" key="4"></el-option>
					    <el-option label="已关闭" value="5" key="5"></el-option>
				    </el-select>
	           	</el-form-item>
	           	<el-form-item label="订单编号:"style="width: 600px;float: left;">
	                <el-input v-model="form.keyword" placeholder="请输入订单编号" style="width: 200px;"></el-input>
	            </el-form-item>
            </div>
           	<div style="width: 40%;height: auto;overflow: hidden;float: left;">
	            <el-form-item label="提交时间:">
	            	<el-date-picker v-model="form.minSubmitTime" type="datetime" placeholder="选择开始日期时间" style="width: 200px;"></el-date-picker>
	                &nbsp;&nbsp;~&nbsp;&nbsp;
	                <el-date-picker v-model="form.maxSubmitTime" type="datetime" placeholder="选择结束日期时间" style="width: 200px;"></el-date-picker>
	            </el-form-item>
            </div>
            <div style="width: 100px;float: right;">
	            <el-button style="float: right;margin-right: 20px;margin-top: 20px;" @click="check(1)">查询</el-button>
            </div>
		</el-form>
		
		<div class="table">
			<div class="oneself">
				<div class="leftInfo">客户姓名：<span>{{userName}}</span></div>
				<div class="rightInfo">电话：<span>{{mobile}}</span></div>
			</div>
			<div class="clear"></div>
	
			<!--表格-->
			<el-table :data="tableData" border style="width: 90%;margin: 30px auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
				<el-table-column type="index" label="序号" width="60" align="center">
				</el-table-column>
				<el-table-column prop="orderNo" label="订单编号" width="150" align="center"></el-table-column>
				<el-table-column prop="submitTime" label="提交时间" width="190" align="center"></el-table-column>
				<el-table-column prop="truckSpaceCode" label="车位编号" align="center" width="150"></el-table-column>
				<el-table-column prop="buyTypeName" label="订单步骤" align="center" width="150"></el-table-column>
				<el-table-column prop="money" label="支付金额" align="center" width="120"></el-table-column>
				<el-table-column prop="payWayName" label="支付方式" align="center" width="130"></el-table-column>
				<el-table-column prop="expire" v-show:'false'></el-table-column>
				<el-table-column prop="expireTime" label="待执行订单有效期" align="center" width="200">
					<template slot-scope="scope">
	                    <span style="color: red;cursor: pointer;" v-if="scope.row.expire==1">{{scope.row.expireTime}}</span>
	                    <span v-if="scope.row.expire!=1" @click="change(scope.$index)" >{{scope.row.expireTime}}</span>
	                </template>
				</el-table-column>
				<el-table-column prop="moneyStatusName" label="金额状态" align="center" width="103"></el-table-column>
				<el-table-column prop="caozuo" label="操作" align="center" width="200" >
					<template slot-scope="scope">
	                    <a style="margin-right: 20px;color: red;font-size: 14px;" @click="cancel(scope.$index)" v-if="!(scope.row.cannel==0&&scope.row.orderStatus!=0)">取消订单</a>
	                    <a style="color: #409EFF;font-size: 14px;" @click="checkeDetail(scope.$index)">查看</a>
	                </template>
				</el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
		</div>
		
		
		<!--修改订单时间弹出框-->
       	<el-dialog title="订单有效期" :visible.sync="visible" width="25%">
            <el-form ref="info" :model="info" label-width="100px" >
                <el-form-item label="订单有效期:">
                    <span style="color: red;">{{info.expireTime}}</span>
                </el-form-item>
                <el-form-item label="增加时间:">
                    <el-select v-model="info.num" placeholder="请选择" style="width: 300px;">
					    <el-option  v-for="item in 30" :label="item+'天'" :value="item">{{item}}天</el-option>
				    </el-select>
                </el-form-item>
                <el-form-item v-show="false">
                    <el-input v-model="info.id" ></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="info.remark" placeholder="请输入内容" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="save">保存</el-button>
                <el-button @click="visible=false">取 消</el-button> 
            </span>
        </el-dialog>
			
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'management',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{
	        		buyType:'',
	        		keyword:'',
	        		minSubmitTime:'',
	        		maxSubmitTime:'',
	        	},
	        	tableData:[{}],
	        	info: {
			      	expireTime:'',
			      	num:'',
			      	id:'',
			    },
	        	visible:false,
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:10,//每页的数据
		       	total:0,
		       	mobile:this.$route.query.mobile,
		       	userName:this.$route.query.userName
	        }
	    },
	    created(){
	    	//查询
	    	this.check(1)
	    },
	    watch: {
			'$route' (to, from) {
				if(to.path=="/订单详情"){
					this.mobile=this.$route.query.mobile
		       		this.userName=this.$route.query.userName
			  		//查询
	    			this.check(1)
				}
			}
		},
	    methods:{
	      	//查询
	      	check(currentPage){
	      		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
	      		this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/order/auth1/orderForm/pageList",
			    	data:{
			    		current:this.currentPage,
			    		pageSize:this.pagesize,
			    		buyType:this.form.buyType,
			    		keyword:this.mobile,
			    		maxSubmitTime:this.form.maxSubmitTime,
			    		minSubmitTime:this.form.minSubmitTime,
			    		type:0,
			    	}
				}).then(res=>{
					if(res.data.code==0){
						this.total = res.data.data.total
						this.tableData=res.data.data.records
						for(var i=0;i<this.tableData.length;i++){
							if(this.tableData[i].submitTime!=''&& this.tableData[i].submitTime!=undefined){
								var start=this.tableData[i].submitTime;//获取开始时间
								var d = new Date(start);    //根据时间戳生成的时间对象
								var startDate = (d.getFullYear()) + "-" + 
								           (d.getMonth() + 1) + "-" +
								           (d.getDate()) + " " + 
								           (d.getHours()) + ":" + 
								           (d.getMinutes()) + ":" + 
								           (d.getSeconds());      
								this.tableData[i].submitTime=startDate;//赋值
							}
							if(this.tableData[i].expireTime!=''&& this.tableData[i].expireTime!=undefined){
								var end=this.tableData[i].expireTime;//结束时间
								var b = new Date(end);    //根据时间戳生成的时间对象
								var endDate = (b.getFullYear()) + "-" + 
								           (b.getMonth() + 1) + "-" +
								           (b.getDate()) + " " + 
								           (b.getHours()) + ":" + 
								           (b.getMinutes()) + ":" + 
								           (b.getSeconds());  
								this.tableData[i].expireTime=endDate;//赋值
							}
						}	
					}
				})
	      	},
			//订单过期修改
	    	change(index) {
			    this.info.expireTime=this.tableData[index].expireTime
			    this.info.id=this.tableData[index].id
			    this.visible = true;
		    },
	    	//修改过期时间保存
	    	save(){
	    		this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/order/auth1/orderForm/addExpireTime",
			    	data:{
			    		id:this.info.id,
			    		num:this.info.num,
			    		remark:this.info.remark,
			    	}
				}).then(res=>{
					if(res.data.code==0){
						this.check(1)
						this.visible = false;
						this.reload()
					}
				})
	    	},
	    	//取消订单
	    	cancel(index){
	    		this.$router.push({ path: "/取消订单", query: { id: this.tableData[index].id,money: this.tableData[index].money}});
	    	},
	      	//查看订单
	      	checkeDetail(index){
	      		this.$router.push({ path: "/查看订单", query: { id: this.tableData[index].id,money: this.tableData[index].money }});
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
	.oneself{
		width: 100%;
		margin: 30px auto;
	}
	.oneself .leftInfo{
		width: 700px;
		float: left;
		height: 30px;
		line-height: 30px;
		padding-left: 350px;
		box-sizing: border-box;
	}
	.oneself .rightInfo{
		width: 700px;
		float: left;
		height: 30px;
		line-height: 30px;
		padding-left: 350px;
		box-sizing: border-box;
	}
	.clear{
		clear:both ;
	}
	.table{
		width: 96%;
		margin: 0 auto;
		margin-top: 40px;
		background: #F8F8F8;
		padding-bottom: 40px;
		padding-top: 20px;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>