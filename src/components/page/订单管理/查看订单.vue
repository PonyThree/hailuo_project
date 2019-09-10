<template>
	<div>
		<!-- 只有落位订单状态 -->
		<el-steps :active="a" align-center style="margin-top: 40px;" v-if="downPayTime!=undefined&& subPayTime==undefined">
		  	<el-step title="提交订单" :description="submitTime"></el-step>
		  	<el-step title="已落位" :description="downPayTime"></el-step>
		  	<el-step title="已完成" :description="buyPayTime"></el-step>
		</el-steps>
		<!-- 只有认购订单状态 -->
		<el-steps :active="b" align-center style="margin-top: 40px;" v-if="downPayTime==undefined&& subPayTime!=undefined">
		  	<el-step title="提交订单" :description="submitTime"></el-step>
		  	<el-step title="已认购待审核" :description="subPayTime"></el-step>
		  	<el-step title="已认购" :description="checkTime"></el-step>
		  	<el-step title="已完成" :description="buyPayTime"></el-step>
		</el-steps>
		<!-- 既有落位又有认购 -->
		<el-steps :active="c" align-center style="margin-top: 40px;" v-if="downPayTime!=undefined&& subPayTime!=undefined">
		  	<el-step title="提交订单" :description="submitTime"></el-step>
		  	<el-step title="已落位" :description="downPayTime"></el-step>
		  	<el-step title="已认购待审核" :description="subPayTime"></el-step>
		  	<el-step title="已认购" :description="checkTime"></el-step>
		  	<el-step title="已完成" :description="buyPayTime"></el-step>
		</el-steps>
		<el-form class="status">
			<el-form-item label="当前订单状态:" style="width: 200px;float: left;margin-top: 18px;margin-left: 10px;">{{statusName}}</el-form-item>
			<el-button style="float: right;margin-top: 18px;margin-right: 10px;" @click="deletes" v-if="(status==1||status==3)&&orderStatus!=0&&buyType!=6">取消订单</el-button>
			<el-button style="float: right;margin-top: 18px;margin-right: 10px;" @click="reviewedNo" v-if="orderStatus!=0&&subCheck==0&&buyType==2">审核不通过并取消订单</el-button>
			<el-button style="float: right;margin-top: 18px;margin-right: 10px;" @click="reviewed" v-if="orderStatus!=0&&subCheck==0&&buyType==2">审核通过</el-button>
			<el-button style="float: right;margin-top: 18px;margin-right: 10px;" @click="release" v-if="orderStatus==2">释放车位</el-button>
			<el-button style="float: right;margin-top: 18px;margin-right: 10px;" @click="refund('1')" v-if="expire==3">退款</el-button>
			<el-button style="float: right;margin-top: 18px;margin-right: 10px;" @click="refund('2')" v-if="orderStatus==2">释放并退款</el-button>
		</el-form>
		
		<div class="box" style="margin-bottom: 50px;">
			<!--基本信息-->
			<div class="box-1">
				<div class="box-1-1">
					<span class="piece"></span><span class="font">基本信息</span>
				</div>
				<!--表格-->
				<el-table :data="tableInfo" border style="width: 100%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
					<el-table-column prop="orderNo" label="订单编号" width="260" align="center"></el-table-column>
					<el-table-column prop="submitTime" label="提交时间" width="260" align="center"></el-table-column>
					<el-table-column prop="mobile" label="用户手机号码" align="center" width="200"></el-table-column>
					<el-table-column prop="payWayName" label="支付方式" align="center" width="198"></el-table-column>
					<el-table-column prop="contractName" label="签约人" width="190" align="center"></el-table-column>
					<el-table-column prop="contractMobile" label="签约人电话" align="center" width="200"></el-table-column>
					<el-table-column prop="contractIdcard" label="签约人身份信息" align="center" width="210"></el-table-column>
				</el-table>
			</div>
			<!--车位信息-->
			<div class="box-1">
				<div class="box-1-1">
					<span class="piece"></span><span class="font">车位信息</span>
				</div>
				<!--表格-->
				<el-table :data="tableParkinginfo" border style="width: 100%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
					<el-table-column prop="truckSpaceDetailImages" label="车位图片" width="300" align="center">
						<template slot-scope="scope">
							<el-scrollbar style="height: 100px;width: 100%;">
								<img :src="item" v-for="item in scope.row.truckSpaceDetailImages" style="width: 280px;height: 100px;display: block;margin-bottom: 10px;" />
							</el-scrollbar>
						</template>
					</el-table-column>
					<el-table-column prop="code" label="车位编号" width="188" align="center"></el-table-column>
					<el-table-column prop="name" label="车位名称" align="center" width="160"></el-table-column>
					<el-table-column prop="location" label="车位位置" align="center" width="200"></el-table-column>
					<el-table-column prop="sellPrice" label="车位销售价（元）" width="170" align="center"></el-table-column>
					<el-table-column prop="facePrice" label="车位表价（元）" align="center" width="170"></el-table-column>
					<el-table-column prop="downMoney" label="落位金额" align="center" width="165"></el-table-column>
					<el-table-column prop="subMoney" label="认购金额" align="center" width="165"></el-table-column>
				</el-table>
			</div>
			<!--操作信息-->
			<div class="box-1" style="margin-bottom: 50px;"> 
				<div class="box-1-1">
					<span class="piece"></span><span class="font">操作信息</span>
				</div>
				<!--表格-->
				<el-table :data="tableParking" border style="width: 100%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
					<el-table-column prop="userTypeName" label="操作者" width="200" align="center"></el-table-column>
					<el-table-column prop="createTime" label="操作时间" width="300" align="center"></el-table-column>
					<el-table-column prop="orderStatusName" label="订单状态" align="center" width="220"></el-table-column>
					<el-table-column prop="payStatusName" label="付款状态" align="center" width="200"></el-table-column>
					<el-table-column prop="moneyStatus" label="金额状态" width="200" align="center"></el-table-column>
					<el-table-column prop="remark" label="备注" align="center" width="398"></el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'tags',
		data(){
	        return {
	        	tableInfo:[{}],
	        	tableParkinginfo:[{}],
	        	tableParking:[{}],
	        	buyType:'',
	        	submitTime:'',
	        	downPayTime:'',
	        	buyPayTime:'',
	        	subPayTime:'',
	        	controllRespDto:{},
	        	checkTime:'',
	        	statusName:'',
				status:'',
				orderNo: '',
	        	orderStatus:'',
				subCheck:'',
				expire: '',
	        	a:1,
	        	b:1,
	        	c:1,
	        	id:this.$route.query.id,
	        	money:this.$route.query.money
	        }
	    },
	    created() {
			this.fallings()
		},
		watch: {
			'$route'(to,from){
				if(to.path=="/查看订单"){
					this.fallings()
		      	}
			}	
		},
	    methods:{
	    	//初始渲染数据
	    	save(){
	    		this.$axios.get(request.testUrl+"/order/auth1/orderForm/detail/"+this.id)
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.buyType=res.data.data.buyType
		            	this.statusName=res.data.data.statusName
		            	this.status=res.data.data.status
		            	this.orderStatus=res.data.data.orderStatus
		            	this.subCheck=res.data.data.subCheck
		            	this.submitTime=this.dateFormat(res.data.data.submitTime)
		            	this.downPayTime=this.dateFormat(res.data.data.downPayTime)
		            	this.buyPayTime=this.dateFormat(res.data.data.buyPayTime)
		            	this.subPayTime=this.dateFormat(res.data.data.subPayTime)
		            	this.checkTime=this.dateFormat(res.data.data.checkTime)
		            	this.tableInfo=[res.data.data]
		            	this.tableInfo[0].submitTime=this.dateFormat(this.tableInfo[0].submitTime)
		            	this.tableParking=res.data.data.orderFormDetailRecord
		            	this.tableParking[0].createTime=this.dateFormat(this.tableParking[0].createTime)
		            	this.tableParkinginfo=[res.data.data.truckSpace]
		            	this.tableParkinginfo[0].downMoney=[res.data.data.downMoney]
		            	this.tableParkinginfo[0].subMoney=[res.data.data.subMoney]
		            	this.controllRespDto = res.data.data.controllRespDto
		            	if(this.downPayTime!=undefined){
							this.a=2,
							this.c=2
						}
						if(this.buyPayTime!=undefined){
							this.a=3,
							this.b=4,
							this.c=5
						}
						if(this.subPayTime!=undefined){
							this.b=2,
							this.c=3
						}
						if(this.checkTime!=undefined){
							this.b=3,
							this.c=4
						}
						
					}else{
						this.$message({
								type: 'info',
								message: res.data.msg
							});
					}
		    	})
			},
			fallings () {
				this.id=this.$route.query.id,
				this.money=this.$route.query.money
				this.$axios.get(request.testUrl+"/order/auth1/orderForm/detail/"+this.id)
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.buyType=res.data.data.buyType
		            	this.statusName=res.data.data.statusName
		            	this.status=res.data.data.status
						this.orderStatus=res.data.data.orderStatus
						this.expire=res.data.data.expire
						this.subCheck=res.data.data.subCheck
						this.orderNo=res.data.data.orderNo
		            	this.submitTime=this.dateFormat(res.data.data.submitTime)
		            	this.downPayTime=this.dateFormat(res.data.data.downPayTime)
		            	this.buyPayTime=this.dateFormat(res.data.data.buyPayTime)
		            	this.subPayTime=this.dateFormat(res.data.data.subPayTime)
		            	this.checkTime=this.dateFormat(res.data.data.checkTime)
		            	this.tableInfo=[res.data.data]
		            	this.tableInfo[0].submitTime=this.dateFormat(this.tableInfo[0].submitTime)
		            	this.tableParking=res.data.data.orderFormDetailRecord
		            	for(var i=0;i<this.tableParking.length;i++){
		            		this.tableParking[i].createTime=this.dateFormat(this.tableParking[i].createTime)
		            	}
		            	this.tableParkinginfo=[res.data.data.truckSpace]
		            	this.tableParkinginfo[0].downMoney=[res.data.data.downMoney]
		            	this.tableParkinginfo[0].subMoney=[res.data.data.subMoney]
		            	this.controllRespDto = res.data.data.controllRespDto
		            	if(this.downPayTime!=undefined){
							this.a=2,
							this.c=2
						}
						if(this.buyPayTime!=undefined){
							this.a=3,
							this.b=4,
							this.c=5
						}
						if(this.subPayTime!=undefined){
							this.b=2,
							this.c=3
						}
						if(this.checkTime!=undefined){
							this.b=3,
							this.c=4
						}
						
					}else{
						this.$message({
								type: 'info',
								message: res.data.msg
							});
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
	    	//取消订单
	    	deletes(){
	    		this.$router.push({ path: "/取消订单", query: { id: this.id,money: this.$route.query.money}});
	    	},
	    	//审核订单
	    	reviewed(){
	    		this.$axios.get(request.testUrl+"/order/auth1/orderForm/subPayCheckOk/"+this.id)
	        		.then(res=>{
						if(res.data.code==0){
							this.$message({
								type: 'info',
								message: '审核成功！'
							});
							this.save()
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
	    	},
	    	//审核不通过且取消订单
	    	reviewedNo(){
	    		this.$axios.get(request.testUrl+"/order/auth1/orderForm/subPayCheckNo/"+this.id)
	        		.then(res=>{
						if(res.data.code==0){
							this.$message({
								type: 'info',
								message: '取消成功！'
							});
							this.save()
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
			},
			// 退款
			refund(type) {
				this.$axios({
		        	method:'post',
		        	url:request.testUrl+"/order/auth1/orderForm/releaseFund",
		        	data:{
						orderNo: this.orderNo,
						type
		        	},
				}).then(res=>{
					if(res.data.code==0){
						this.$message({
							type: 'info',
							message: '退款成功！'
						});
						this.fallings()
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
			},
	    	//释放车位
	    	release(){
	    		this.$axios({
		        	method:'post',
					url:request.testUrl+"/order/auth1/orderForm/releaseExpireSell",
		        	data:[
		        		this.$route.query.id
		        	],
				}).then(res=>{
					if(res.data.code==0){
						this.$message({
							type: 'info',
							message: '释放车位成功！'
						});
						this.fallings()
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	    	}
		}
	}
</script>

<style>
	.status{
		width: 95%;
		margin: 0 auto;
		height: auto;
		overflow: hidden;
		background: #dcd3ef;
		margin-top: 50px;
	}
	.box{
		width: 95%;
		margin: 0 auto;
		height: auto;
		overflow: hidden;
		border: 1px solid #dcd3ef;
		margin-top: 50px;
	}
	.box .box-1{
		width: 95%;
		height: auto;
		overflow: hidden;
		margin: 10px auto 20px;
	}
	.box .box-1 .box-1-1{
		width: 100%;
		height: 60px;
	}
	.box .box-1 .box-1-1 .piece{
		width: 10px;
		height: 30px;
		margin-top: 15px;
		display:block;
		background:#dcd3ef ;
		float: left;
		margin-right: 10px;
	}
	.box .box-1 .box-1-1 .font{
		width: 100px;
		height: 60px;
		line-height: 60px;
		display:block;
		float: left;
	}
	.el-scrollbar .el-scrollbar__wrap {
		overflow-x: hidden;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>