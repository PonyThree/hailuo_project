<template>
	<div>
		<div class="thaw">
			<ul class="details" v-model="menus">
				<li>
					<div class="contents">用户名</div>
					<div class="results">
						{{menus.name}}
					</div>
				</li>
				<li>
					<div class="contents">联系电话</div>
					<div class="results">
						{{menus.mobile}}
					</div>
				</li>
				<li style="margin-top: 40px;">
					<div class="contents">解冻金额</div>
					<div class="results">
						￥{{menus.freezeMoney}}
					</div>
				</li>
				<li>
					<div class="contents">解冻方式</div>
					<div class="results">
						退款到零钱
					</div>
				</li>
				<li>
					<div class="contents">解冻类型</div>
					<div class="results">
						零钱解冻
					</div>
				</li>
				<li style="margin-top: 40px;">
					<div class="contents">处理备注</div>
					<div class="results">
						<input type="text" placeholder="非必填" v-model="menus.remarks" style="width:97.5%;height: 54px;border: none;"/>
						{{menus.remark}}
					</div>
				</li>
				<li style="border: none;margin: 50px auto;width: 16%;">
					<!--<el-button type="primary" style="margin: 0 auto;margin-left: 15px;margin-top: 20px;" @click="refuse">拒绝解冻</el-button>-->
					<el-button type="primary" style="margin: 0 auto;margin-left: 60px;margin-top: 20px;" @click="sure">确认解冻</el-button>
				</li>
			</ul>
		</div>
		<div class="thaw">
			<el-steps direction="vertical" :active="orderStatus" class="step" :space="100">
			    <el-step :title="item.createTime+'  ————发起申请'" class="stepOne" v-for="item in list"></el-step>
			</el-steps>
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'fulfill',
		data(){
	        return {
	        	id:'',
	        	menus:{
		        	name:'',
		        	mobile:'',
		        	freezeMoney:'',
	        	},
	        	list:[
	        		{createTime:''}
	        	],
	        	orderStatus:0
	        }
	    },
	    created(){
	    	this.id=this.$route.query.id,
	    	this.save()
	    },
	    watch: {
			'$route'(to,from){
				if(to.path=="/查看详情"){
					this.id=this.$route.query.id,
					this.save()
				}
			}	
		},
	    methods:{
	    	//渲染数据
	    	save(){
	    		var params=new URLSearchParams();
				params.append('userId',this.id);
	    		this.$axios.post(request.testUrl+"/user/auth1/userProjectUseMoney/findFreezeMoneyInfo",params)
			    	.then(res=>{
			            if(res.data.code==0){
			            	this.menus=res.data.data
			            	this.list=res.data.data.applyUnfreezeList
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
									this.orderStatus=this.list.length
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
	    	//拒绝解冻
	    	refuse(){
	    		this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/order/auth1/applyUnfreeze/unfreeze",
			    	data:{
			    		userId:this.$route.query.id,
			    		remark:this.menus.remarks,
			    		status:2,
			    	}
				}).then(res=>{
					if(res.data.code==0){
						this.$message({
							type: 'info',
							message: '已拒绝'
						});
						this.save()
						this.$router.push({ path: "/解冻管理"})
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	    	},
	    	//确认解冻
	    	sure(){
	    		this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/order/auth1/applyUnfreeze/unfreeze",
			    	data:{
			    		userId:this.$route.query.id,
			    		remark:this.menus.remarks,
			    		status:1,
			    	}
				}).then(res=>{
					if(res.data.code==0){
						this.$message({
							type: 'info',
							message: '解冻成功'
						});
						this.save()
						this.$router.push({ path: "/解冻管理"})
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
	.thaw{
		width: 96%;
		height: auto;
		overflow: hidden;
		margin: 20px auto;
		border: 1px solid #8d73c0;
	}
	.thaw .details{
		width: 96%;
		height: auto;
		overflow: hidden;
		margin: 30px auto;
	}
	.thaw .details li{
		width: 100%;
		height: 60px;
		border:1px solid gainsboro;
		box-sizing: border-box;
	}
	.thaw .details li:nth-child(2){
		border-top: none;
	}
	.thaw .details li:nth-child(2) .contents{
		height: 59px;
		line-height: 59px;
	}
	.thaw .details li:nth-child(3) .contents{
		height: 59px;
		line-height: 59px;
	}
	.thaw .details li:nth-child(4) .contents{
		height: 59px;
		line-height: 59px;
	}
	.thaw .details li:nth-child(5) .contents{
		height: 59px;
		line-height: 59px;
	}
	.thaw .details li:nth-child(7){
		border-top: none;
	}
	.thaw .details li:nth-child(7) .contents{
		height: 59px;
		line-height: 59px;
	}
	.thaw .details li:nth-child(8){
		border-top: none;
	}
	.thaw .details li:nth-child(8) .contents{
		height: 59px;
		line-height: 59px;
	}
	.thaw .details li .contents{
		width: 15%;
		height: 58px;
		background: #8d73c0;
		color: #FFFFFF;
		text-align: center;
		line-height: 58px;
		float: left;
	}
	.thaw .details li .results{
		width: 85%;
		line-height: 58px;
		float: right;
		text-indent: 30px;
	}
	.thaw .details li .results .enter{
		
	}
	.thaw .step{
		width: 20%;
		height: auto;
		overflow: hidden;
		margin: 70px auto;
	}
	.thaw .step .stepOne{
		height: 80px;
	}
</style>