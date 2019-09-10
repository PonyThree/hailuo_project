<template>
	<div>
		<!--导入车位信息-->
		<div class="info">
			<div class="title"><span class="f1"></span>批量操作车位信息</div>
			<div class="ff1">
				<el-steps :active="1" align-center style="margin-top: 40px;">
				  	<el-step title="上传文件"></el-step>
				  	<el-step title="执行导入"></el-step>
				  	<el-step title="批量设置信息"></el-step>
				  	<el-step title="批量操作完成"></el-step>
				</el-steps>
				<div class="stencil">
					<span style="width: 10%;height: 100%;background: #dcd3ef;display: block;float: left;"></span>
					<div style="width: 85%;float:left;margin-left: 30px;">
						<div style="display: block;width:100%;line-height: 45px;">填写导入车位的信息</div>
						<div style="display: block;width:100%;line-height: 15px;color: gray;font-size: 12px;">请按照模板的格式填入数据，模板的表头行名称不可更改，不能删除。</div>
						<div style="display: block;width:100%;line-height: 35px;font-size: 14px;">
							<a style="color: #409EFF;" :href="url">下载模版</a>
							<span style="color: red;margin-left: 20px;">车位信息上传发布后将显示在业主端，请务必确认“车位名称”填写无误，以免车位交易出现问题。</span>
						</div>
					</div>
				</div>
				
				<div class="stencil">
					<span style="width: 10%;height: 100%;background: #dcd3ef;display: block;float: left;"></span>
					<div style="width: 85%;float:left;margin-left: 30px;">
						<div style="display: block;width:100%;line-height: 45px;">上传填好的车位信息表</div>
						<div style="display: block;width:100%;line-height: 15px;color: gray;font-size: 12px;">文件后缀名必须为xls或xlsx(即Excel格式)</div>
						<div style="display: block;width:100%;line-height: 35px;font-size: 14px;">
							<el-upload action="auto" :before-upload="beforeUpload">上传文件</el-upload>
						</div>
					</div>
				</div>
				<div>
					<el-button class="aa1" style="display: block;margin: 20px auto 100px;" @click="nextStep">下一步</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'import-parking',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{},
	        	url:request.testUrl+"/product/truckSpace/downImportSelectTemplate",
	        	off:false,
	        }
	    },
	    methods:{
	    	//上传文件
	    	beforeUpload(file){
			    let fd = new FormData();
			    fd.append('excel',file);//传文件
			    this.$axios.post(request.testUrl+"/product/auth1/truckSpace/importExcelSelect",fd)
			    	.then(res=>{
			            if(res.data.code==0){
			            	this.$message({
		                        type: 'info',
		                        message: "文件上传成功！"
		                 	}); 
		                 	this.off=true
			            }else{
			            	this.$message({
		                        type: 'info',
		                        message: "文件上传失败！"
		                 	}); 
			            }
			    	})

			},
	    	//下一步
	    	nextStep(){
	    		if(this.off==true){
	    			this.$router.push({ path: '/批量执行导入'})
	    		}else{
	    			this.$message({
                        type: 'info',
                        message: "请导入车位！！"
                 	}); 
	    		}
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
	.el-upload--text{
		display: inline-block;
		width: 100px!important;
		height: 40px!important;
		text-align: left!important;
		line-height: 40px!important;
		background: none!important;
		border: none!important;
		color:#409EFF!important;
	}
	.el-upload-list__item-name{
		display: none!important;
	}
</style>