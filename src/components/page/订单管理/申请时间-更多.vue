<template>
	<div>
		<div class="thaw">
			<el-steps direction="vertical" :active="orderStatus" class="step" :space="100">
			    <el-step :title="item.createTime+'  ————发起申请'" class="stepOne" v-for="item in list"></el-step>
			</el-steps>
			
		</div>
		<el-button type="primary" style="margin: 20px auto;display: block;" @click="comeBack">确定</el-button>
	</div>
</template>

<script>
	export default{
		name:'more',
		data(){
	        return {
	        	id:this.$route.query.id,
	        	list:[
	        		{createTime:''}
	        	],
	        	orderStatus:0
	        }
	    },
	    created(){
	    	this.$axios.post(request.testUrl+"/order/auth1/applyUnfreeze/applyList/"+this.id)
		    	.then(res=>{
		            if(res.data.code==0){
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
	    methods:{
	    	//确定
	    	comeBack(){
	    		this.$router.go(-1)
	    	}
	    }
	}
</script>

<style>
	.thaw{
		width: 96%;
		height: auto;
		overflow: hidden;
		margin: 40px auto;
		border: 1px solid #8d73c0;
	}
	.thaw .step{
		width: 20%;
		height: auto;
		overflow: hidden;
		margin: 120px auto;
	}
	.thaw .step .stepOne{
		height: 80px;
	}
</style>