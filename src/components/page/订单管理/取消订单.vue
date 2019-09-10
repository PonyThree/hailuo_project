<template>
	<div>
		<el-form class="backgroudes" :model="form" :label-position="labelPosition" label-width="120px">
			<el-form-item label="操作备注:" style="width: 800px;margin: 50px auto 0;">
				<el-input type="textarea" v-model="form.remark" style="width: 600px;" :rows="6"></el-input>
			</el-form-item>
			<el-form-item label="取消原因:" style="width: 800px;margin: 30px auto 0;">
				<el-input type="textarea" v-model="form.reason" style="width: 600px;" :rows="6"></el-input>
				<div style="color: #606266;">会以站内消息的方式推送给用户</div>
			</el-form-item>
			<el-form-item label="落位/认购金额:" style="width: 800px;margin: 30px auto;">
				{{moneys}}
			</el-form-item>
			<el-form-item label="确认退款金额:" style="width: 800px;margin: 30px auto;">
				<el-input v-model="form.money"  style="width: 100px;"></el-input>
			</el-form-item>
			<el-form-item style="width: 200px;margin: 30px auto;" label-width="0px">
				<el-button type="primary" style="float: left;" @click="save">确认</el-button>
				<el-button type="primary" style="float: right;" @click="jump">取消</el-button>
			</el-form-item>
		</el-form>
		
		
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'tags',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{
	        		reason:'',
	        		remark:'',
	        		money:''
	        	},
	        	moneys:'',
	        	id:''
	        }
	    },
	    created(){
	    	this.moneys=this.$route.query.money
	        this.id=this.$route.query.id
	        this.form.money=this.$route.query.money
	        
	    },
	    watch: {
		    '$route'(to, from){
		      	if(to.path=="/取消订单"){
		      		this.moneys=this.$route.query.money
	        		this.id=this.$route.query.id
	        		this.form.money=this.$route.query.money
		      	}
		    }
		  },
	    methods:{
	    	//保存
	    	save(){
	    		this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/order/auth1/orderForm/cancel",
			    	data:{
			    		id:this.$route.query.id,
			    		money:this.form.money,
			    		reason:this.form.remark,
			    		remark:this.form.reason,
			    	}
					}).then(res=>{
						if(res.data.code==0){
							this.$router.go(-1);
						}else{
							this.$message({
					            type: "info",
					            message: res.data.msg
					        });
						}
					})
	    	},
	    	//取消
	    	jump(){
//	    		this.$router.push({ path: "/查看订单"});
				this.$router.go(-1)
				this.reload()
	    	}
	    }
	}
</script>

<style>
	.backgroudes{
		width: 95%;
		margin: 0 auto;
		height: auto;
		overflow: hidden;
		border: 1px solid #dcd3ef;
		margin-top: 50px;
	}
	
</style>