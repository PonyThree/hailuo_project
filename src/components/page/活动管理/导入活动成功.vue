<template>
	<div>
		<!--导入车位信息-->
		<div class="info">
			<div class="title"><span class="f1"></span>导入车位信息</div>
			<div class="ff1">
				<el-steps :active="3" align-center style="margin-top: 40px;">
				  	<el-step title="上传文件"></el-step>
				  	<el-step title="执行导入"></el-step>
				  	<el-step title="批量操作完成"></el-step>
				  	<el-step title="查看导入车位"></el-step>
				</el-steps>
				<div class="stencil" style="border: none;">
					<div style="display: block;font-size:22px;line-height: 60px;text-align: center;">导入完成</div>
					<div style="display: block;width:100%;line-height: 25px;text-align: center;">
						成功导入车位信息数量:
						<a style="color: #409EFF;font-size: 20px;line-height: 25px;">{{size}}</a>
					</div>
				</div>
				
				<div style="width: 5%; margin: 0 auto 150px;">
					<el-button class="aa1" @click="check">查看车位</el-button>
				</div>
				
				<div class="clear"></div>
				
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
	        	tableInfo:[{address:'jhdf '}],
	        	show:false,
				size:this.$route.query.size,
				id:this.$route.query.id
	        }
	    },
	    created(){
	    },
	    methods:{
	    	//查看车位
	    	check(){
	    		this.$router.push({ path: '/查看活动导入',query:{
						id:this.id
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