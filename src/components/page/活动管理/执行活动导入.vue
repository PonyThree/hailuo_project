<template>
	<div>
		<!--导入车位信息-->
		<div class="info">
			<div class="title"><span class="f1"></span>导入车位信息</div>
			<div class="ff1">
				<el-steps :active="2" align-center style="margin-top: 40px;">
				  	<el-step title="上传文件"></el-step>
				  	<el-step title="执行导入"></el-step>
				  	<el-step title="批量操作完成"></el-step>
				  	<el-step title="查看导入车位"></el-step>
				</el-steps>
				<div class="stencil">
					<span style="width: 10%;height: 100%;background: #dcd3ef;display: block;float: left;"></span>
					<div style="width: 85%;float:left;margin-left: 30px;">
						<div style="display: block;width:100%;line-height: 60px;">本次可导入车位信息数量</div>
						<div style="display: block;width:100%;line-height: 25px;">
							<a style="color: #409EFF;font-size: 20px">{{ableRespDtos==undefined?0:ableRespDtos.length}}</a>
						</div>
					</div>
				</div>
				
				<div class="stencil">
					<span style="width: 10%;height: 100%;background: #dcd3ef;display: block;float: left;"></span>
					<div style="width: 85%;float:left;margin-left: 30px;">
						<div style="display: block;width:100%;line-height: 60px;">本次不可导入车位信息数量</div>
						<div style="display: block;width:100%;line-height: 25px;">
							<a style="color: red;font-size: 20px;"  @click="prompt">{{errorRespDtos.length}}</a>
						</div>
					</div>
				</div>
				<div style="width:20%; margin: 0 auto 250px;">
					<el-button class="aa1" style="display:block;float: left;margin-top: 20px;" @click="returnBack">返回重新上传</el-button>
					<el-button class="aa1" style="display:block;float: right;margin-top: 20px;"@click="nextStep">下一步</el-button>	
				</div>
				
				<div class="clear"></div>
				
				<div style="width: 80%;margin: 20px auto;">
					<div style="width: 100%;line-height: 40px;font-size: 18px;">不可导入车位信息列表</div>
					<!--表格-->
					<el-table :data="tableInfo" border style="width: 100%;margin: 0 auto;">
						<el-table-column type="index" label="行数" width="50" align="center"></el-table-column>
						<el-table-column prop="name" label="车位编号" width="150" align="center"></el-table-column>
						<el-table-column prop="location" label="车位位置" align="center" width="150"></el-table-column>
						<el-table-column prop="insideArea" label="面积（平方米）" width="150" align="center"></el-table-column>
						<el-table-column prop="facePrice" label="表价（元）" align="center" width="145"></el-table-column>
						<el-table-column prop="floorPrice" label="底价（元）" align="center" width="145"></el-table-column>
						<el-table-column prop="tagNames" label="车位标签" align="center" width="250"></el-table-column>
						<el-table-column prop="error" label="错误提示 " align="center" width="250" class="last">
						</el-table-column>
					</el-table>
					<div style="margin-top: 20px;margin-bottom:20px;line-height: 22px;">
						<div style="color: red;font-size: 18px;">规则说明：</div>
						<div style="font-size: 14px;">导入车位：将车位信息用Excel的方式导入，可以一次性完成信息的录入。导入车位信息，需要对价格进行验证：</div>
						<div style="font-size: 14px;">①车位底价<表价（表价有可能没有填写；）</div>
						<div style="font-size: 14px;">②车位表底价差额，是否高于所有车位表底价平均值1万以上；</div>
						<div style="font-size: 14px;">③车位底价是否低于其他车位1万以上。若有。则需要将这些车位列出来，让导入车位的人员进行确定；</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'import-parking',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{},
	        	tableInfo:[],
	        	show:false,
	        	ableRespDtos:[],
				errorRespDtos:[],
				id:this.$route.query.id
	        }
	    },
	    created(){
	    	this.renderData();
	    },
	    watch: {
			'$route'(to,from){
				if(to.path=="/执行活动导入"){
					// this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/getActList")
	        		// .then(res=>{
	        		// 	if(res.data.code==0){
	        		// 		this.ableRespDtos=res.data.data.ableRespDtos
	        		// 		this.errorRespDtos=res.data.data.errorRespDtos
	        		// 		this.tableInfo=res.data.data.errorRespDtos
					// 	}
					// })
					this.renderData();
				}
			}	
		},
	    methods:{
			renderData(){
				// var params=new URLSearchParams();
				// params.append("current",1)
				// params.append("pages",10)
				this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/getActivityExcelSelect")
        		.then(res=>{
        			if(res.data.code==0){
						// console.log(res.data.data)
        				this.ableRespDtos=res.data.data.ableRespDtos
        				this.errorRespDtos=res.data.data.errorRespDtos
        				this.tableInfo=res.data.data.errorRespDtos
					}
        		})
			},
	    	//错误模版提示
	    	prompt(){
	    		this.show=true;
	    	},
	    	//下一步
	    	nextStep(){
				// console.log(this.ableRespDtos)
	    		if(this.ableRespDtos.length>0){
		    		this.$axios({
						method:'post',
						url:request.testUrl+"/product/auth1/activityTruckSpace/addList",
						data:JSON.stringify(
							{
							'actId':this.id,
							'dtos':this.ableRespDtos
							}
						)
					}).then(res=>{
						if(res.data.code==0){
							this.$router.push({ path: '/导入活动成功',query:{size:res.data.data,id:this.id}})
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
				}
	    	},
	    	//返回重新上传
	    	returnBack(){
//	    		this.reload()
	    		this.$router.push({ path: '/导入活动车位',query:{
					id:this.$route.query.id
				}})
	    	},
	    }
	}
</script>

<style>
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
	.stencil{
		width: 80%;
		height: 100px;
		margin: 60px auto;
		border: 1px solid gainsboro;
	}
	/*.el-table_1_column_9{
		color: red!important;
	}*/
	.clear{
		clear: both;
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