<template>
	<div>
		<el-form class="main" :model="form" >
			<!--基本信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>基本信息</div>
				<div class="ff1">
					<el-form :model="form.aa" :label-position="labelPosition" label-width="120px">
						<div class="leftTwo">
							<el-form-item label="姓名 :" >{{userName}}</el-form-item>
							
							<el-form-item label="订单数量 :">
								<a style="color: #409EFF;font-size: 20px;" @click="down">订单</a>
							</el-form-item>
							
						</div>
						<div class="contentTwo">
							<el-form-item label="客户手机号 :" >{{mobile}}</el-form-item>
							<!--<el-form-item label="支付方式 :">微信支付</el-form-item>
							<el-form-item label="支付流水 :">15800001234</el-form-item>-->
						</div>
						<div class="rightTwo">
							<el-form-item label="交易金额 :">{{money}}</el-form-item>
							<!--<el-form-item label="退款金额 :">￥0</el-form-item>
							<el-form-item label="退款到账 :">无</el-form-item>
							<el-form-item label="退款流水号 :">无</el-form-item>-->
						</div>	
					</el-form>
				</div>
			</div>
			
			<!--基本信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>基本信息</div>
				<div class="ff1">
					<el-form :model="form.aa" :label-position="labelPosition" label-width="120px">
						<el-steps direction="vertical" :active="length" class="stepList" :space="120">
						    <el-step :title="item.truckSpaceCode+' 车位 '+item.payType+' ————'+item.money" class="stepOne" v-for="item,index in list">
						    	<template slot="description" >
							    	<div style="margin-top: 10px;font-size: 14px;">
								    	<div>支付方式：<span>{{item.payWay}}</span></div>
								    	<div v-if="item.payType==''">退款到账：<span>{{item.payWay}}</span></div>
								    	<div>支付流水号：<span>{{item.wxPayNo}}</span></div>
								    	<div v-if="item.payType==''">退款流水号：<span>{{item.wxPayNo}}</span></div>
								    	<div><span>{{item.createTime}}</span></div>
								    </div>
							    </template>
						    </el-step>
						   
						</el-steps>
					</el-form>
				</div>
			</div>
			<el-button class="aa1" style="margin: 20px auto;display: block;" @click="comeBack">确定</el-button>
			
			
			
		</el-form>
		
		
	</div>
</template>

<script>
	export default{
		name:'info',
		data(){
	        return {
	        	labelPosition:'left',
	        	form:{
	        		aa:{
	        			
	        		}
	        	},
	        	list:[],
	        	userId:this.$route.query.userId,
	        	mobile:this.$route.query.mobile,
	        	userName:this.$route.query.userName,
	        	money:this.$route.query.money,
	        	length:0
	        }
	    },
	    created(){
	    	this.$axios.get(request.testUrl + "/order/auth1/orderFormRecord",{
					params:{
						userId:this.userId
					}
	    	})
	        .then(res => {
		        if (res.data.code == 0) {
		        	this.list=res.data.data
		        	this.length=res.data.data.length
		        	for(var i=0;i<this.list.length;i++){
						if(this.list[i].createTime!=''&& this.list[i].createTime!=undefined){
							var start=this.list[i].createTime;//获取开始时间
							var d = new Date(start);    //根据时间戳生成的时间对象
							var startDate = (d.getFullYear()) + "-" + 
							           (d.getMonth() + 1) + "-" +
							           (d.getDate()) + " " + 
							           (d.getHours()) + ":" + 
							           (d.getMinutes()) + ":" + 
							           (d.getSeconds());      
							this.list[i].createTime=startDate;//赋值
						}
						if(this.list[i].payWay==0){
							this.list[i].payWay='零钱'
						}else if(this.list[i].payWay==1){
							this.list[i].payWay='微信'
						}else{
							this.list[i].payWay='线下支付'
						}
						if(this.list[i].payType==1){
							this.list[i].payType='落位'
						}else if(this.list[i].payType==2){
							this.list[i].payType='认购'
						}else{
							this.list[i].payType='购买完成'
						}
						if(this.list[i].wxPayNo==null){
							this.list[i].wxPayNo='无'
						}else{
							this.list[i].wxPayNo
						}

					}
		        }
	        });
	    },
	    watch: {
			'$route' (to, from) {
				if(to.path=="/查看客户详情"){
					this.userId=this.$route.query.userId,
		        	this.mobile=this.$route.query.mobile,
		        	this.userName=this.$route.query.userName,
		        	this.money=this.$route.query.money
			  		this.$axios.get(request.testUrl + "/order/auth1/orderFormRecord",{
						params:{
							userId:this.userId
						}
			    	})
			        .then(res => {
				        if (res.data.code == 0) {
				        	this.list=res.data.data
				        	for(var i=0;i<this.list.length;i++){
								if(this.list[i].createTime!=''&& this.list[i].createTime!=undefined){
									var start=this.list[i].createTime;//获取开始时间
									var d = new Date(start);    //根据时间戳生成的时间对象
									var startDate = (d.getFullYear()) + "-" + 
									           (d.getMonth() + 1) + "-" +
									           (d.getDate()) + " " + 
									           (d.getHours()) + ":" + 
									           (d.getMinutes()) + ":" + 
									           (d.getSeconds());      
									this.list[i].createTime=startDate;//赋值
								}
								if(this.list[i].payWay==0){
									this.list[i].payWay='零钱'
								}else if(this.list[i].payWay==1){
									this.list[i].payWay='微信'
								}else{
									this.list[i].payWay='线下支付'
								}
								if(this.list[i].payType==1){
									this.list[i].payType='落位'
								}else if(this.list[i].payType==2){
									this.list[i].payType='认购'
								}else{
									this.list[i].payType='购买完成'
								}
								if(this.list[i].wxPayNo==null){
									this.list[i].wxPayNo='无'
								}else{
									this.list[i].wxPayNo
								}
		
							}
				        }
			        });
				}
			}
		},
	    methods:{
			//查看订单详情
			down(){
				this.$router.push({ path: "/订单详情页", query: {mobile: this.mobile,userName:this.userName}});
			},
			//确定还回
			comeBack(){
				this.$router.go(-1)
			}
	    }
	}
</script>

<style>
	.mian{
		width: 100%;
	}
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
	.info .el-form{
		width: 96%;
		padding-left: 50px;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
		margin: 20px auto 20px;
	}
	.info .el-form{
		width: 96%;
		padding-left: 50px;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
		margin: 20px auto 20px;
	}
	.info .el-form .leftTwo{
		width:500px;
		float: left;
	}
	.info .el-form .contentTwo{
		width:500px;
		float: left;
	}
	.info .el-form .rightTwo{
		width: 500px;
		float: left;
		
	}
	.info .stepList{
		width: 90%;
		height: auto;
		overflow: hidden;
		margin: 50px auto;
	}
	.info .stepList .stepOne{
		height: 80px;
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
</style>