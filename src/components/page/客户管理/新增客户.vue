<template>
	<div>
		<el-form class="main" >
			<!--基本信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>基本信息</div>
				<div class="ff1">
					<el-form :model="form" :label-position="labelPosition" label-width="120px">
						<div class="left">
							<el-form-item label="客户姓名 :" >
								<el-input v-model="form.name" placeholder="请输入客户名称" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="来源方式 :" >
								<el-select v-model="form.comeType" placeholder="请选择来源方式" style="width: 200px;">
								    <el-option label="线上" value="2" key="2"></el-option>
								    <el-option label="线下" value="1" key="1"></el-option>
							   	</el-select>
							</el-form-item>
						</div>
						<div class="right">
							<el-form-item label="客户电话 :">
								<el-input v-model="form.mobile" placeholder="请输入客户电话" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="所属置业顾问:">
								<el-select v-model="form.consultantId" placeholder="请选择" style="width: 200px;">
								    <el-option label="所有置业顾问" value="" key=""></el-option>
								    <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in listType"></el-option>
							   	</el-select>
							</el-form-item>
						</div>	
					</el-form>
				</div>
			</div>
			
			<!--购买信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>购买信息</div>
				<div class="ff1">
					<el-form :model="info" :label-position="labelPosition" label-width="120px">
						<el-form-item v-for="(item,index) in info.orderList"  label-width="2px" :label="(index+1)+':'">
							<el-button class="button" @click="deleteList(item)" v-if="info.orderList.length>1">删除</el-button>
							<el-button class="button" style="margin-right: 5px;" @click="addList" v-if="num==index">新增</el-button>
							<div class="left">
								<el-form-item label="选择车位 :">
									<el-select v-model="item.spaceAreaId" placeholder="请选择区域" style="width: 150px;">
									    <el-option v-for="item in level1Info" :label="item.name" :value="item.id" :key="item.id"></el-option>
								    </el-select>
								    <el-select v-model="item.spaceFloorId" placeholder="请选择层" style="width: 150px;">
									    <el-option v-for="item in level2Info" :label="item.name" :value="item.id" :key="item.id"></el-option>
								    </el-select>
								    <el-select v-model="item.spacetruckSpaceLevelTwoId" placeholder="请选择栋" style="width: 150px;">
									    <el-option v-for="item in level3Info" :label="item.name" :value="item.id" :key="item.id"></el-option>
								    </el-select>
									<el-input v-model="item.truckSpaceName" placeholder="请输入车位名称" style="width: 200px;margin-top: 5px;" @blur.prevent="examine(item)"></el-input>
								</el-form-item>
								<el-form-item label="购买状态 :" >
									<el-select v-model="item.payStatus" placeholder="请选择活动区域" style="width: 150px;">
									    <el-option label="认购" value="2" key="2"></el-option>
									    <el-option label="购买完成" value="3" key="3"></el-option>
									    <el-option label="预订单" value="6" key="6"></el-option>
								   </el-select>
								</el-form-item>
							</div>
							<div class="right">
								<el-form-item label="支付金额 :">
									<el-input v-model="item.payMoney" placeholder="请输入支付金额" style="width: 200px;" disabled></el-input>
								</el-form-item>
								<el-form-item label="签约时间 :">
									 <el-date-picker v-model="item.payTime" type="datetime" placeholder="选择日期时间" style="width: 200px;"></el-date-picker>
								</el-form-item>
							</div>
						</el-form-item>
					</el-form>
				</div>
				<div style="width: 15%;margin: 40px auto;">
					<el-button style="margin-left: 50px;" @click="back">返回</el-button>
					<el-button class="button" @click="save">保存</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'add',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{
	        		comeType:'',
	        		consultantId:'',
	        		mobile:'',
	        		name:'',
	        	},
	        	listType:[],
	        	info:{
	        		orderList:[{}]
	        	},
	        	level1Info:[],
	        	level2Info:[],
	        	level3Info:[],
	        	num:0,
	        	payMoney:0,
	        	payStatus:'',
	        	payTime:'',
	        	spaceAreaId:'',
	        	spaceFloorId:'',
	        	spacetruckSpaceLevelTwoId:'',
	        	truckSpaceName:''
	        }
	    },
	    created(){
	    	//所属置业顾问列表
	    	this.$axios.get(request.testUrl+"/consultant/auth1/consultant/findByProject")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.listType=res.data.data
		            }else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
		        })
		    //渲染区域列表
		    this.$axios.get(request.testUrl+"/product/auth1/truckSpaceArea/doSelectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.level1Info=res.data.data
		            }
		    	})
		    //渲染楼栋二级列表
		    this.$axios.get(request.testUrl+"/product/auth1/TruckSpaceLevelThree/doSelectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.level2Info=res.data.data
		            }
		    	})
		    //渲染楼栋三级列表
		    this.$axios.get(request.testUrl+"/product/auth1/TruckSpaceLevelTwo/doSelectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.level3Info=res.data.data
		            }
		    	})
	    },
	    methods:{
	    	//新增
	    	addList(){
	    		this.info.orderList.push({});
				this.num=this.info.orderList.length-1;
	    	},
	    	//删除
	    	deleteList(item){
	    		var i= this.info.orderList.indexOf(item)
				if (i !== -1) {
					this.info.orderList.splice(i, 1)
				}
				this.num=this.info.orderList.length-1; 
	    	},
	    	//检测车位是否售出
	    	examine(item){
	    		this.$axios({
		    	method:'post',
		    	url:request.testUrl+"/product/auth1/truckSpace/findHasSelled",
		    	data:{
		    		level1:item.spaceAreaId,
		    		level2:item.spaceFloorId,
		    		level3:item.spacetruckSpaceLevelTwoId,
		    		name:item.truckSpaceName
		    	}
				}).then(res=>{
					if(res.data.code==0){
						
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	    	},
	    	//保存
	    	save(){
	    		var data = {
		    		comeType:parseInt(this.form.comeType),
		    		consultantId:this.form.consultantId,
		    		mobile:this.form.mobile,
		    		name:this.form.name,
			    };
	    		var arr=[]
	    		for(var i=0;i<this.info.orderList.length;i++){
    				this.payMoney=this.info.orderList[i].payMoney,
    				this.payStatus=this.info.orderList[i].payStatus,
    				this.payTime=this.info.orderList[i].payTime,
    				this.spaceAreaId=this.info.orderList[i].spaceAreaId,
    				this.spaceFloorId=this.info.orderList[i].spaceFloorId,
    				this.spacetruckSpaceLevelTwoId=this.info.orderList[i].spacetruckSpaceLevelTwoId,
    				this.truckSpaceName=this.info.orderList[i].truckSpaceName
    				if(this.payStatus!=undefined&&this.truckSpaceName==undefined){
	    				this.$message({
							type: 'info',
							message: '请选择车位信息！'
						});
						return
	    			}
    				arr.push({
		    			payMoney:this.payMoney,
			        	payStatus:parseInt(this.payStatus),
			        	payTime:this.payTime,
			        	spaceAreaId:this.spaceAreaId,
			        	spaceFloorId:this.spaceFloorId,
			        	spacetruckSpaceLevelTwoId:this.spacetruckSpaceLevelTwoId,
			        	truckSpaceName:this.truckSpaceName
		    		})
	    		}
	    		
			    if(!this.arrIsEmpty(arr)){
			    	data.orderList = arr;
			    }
	    		this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/project/auth1/projectUser/addUserOrderInfo",
			    	data:data
				}).then(res=>{
					if(res.data.code==0){
						this.$router.push({ path: "/客户管理"});
						this.reload()
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	    	},
	    	//遍历数组
	    	arrIsEmpty(arr){
	    		if(arr == null || arr.length==0){
	    			return true;
	    		}
	    		let empty = true;
	    		arr.forEach(e=>{
	    			if(e.truckSpaceName !=null && e.truckSpaceName !='' && e.truckSpaceName !=undefined){
	    				empty = false;
	    			}
	    		})
	    		return empty;
	    	},
	    	//返回
	    	back(){
	    		this.$router.push({ path: "/客户管理"});
				this.reload()
	    	},
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
	.left{
		width:670px;
		float: left;
		margin-right: 80px;
	}
	.right{
		width: 610px;
		float: left;
		
	}
	.button{
		float: right;
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
</style>