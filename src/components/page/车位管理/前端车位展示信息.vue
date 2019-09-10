<template>
	<div>
		<el-form class="main" :model="form" >
			<!--通用车位前端车位详情展示信息-->
			<div class="info" style="margin-bottom: 60px;">
				<div class="title">
					<span class="f1"></span>
					<div style="width:400px ;float: left;margin-right: 50px;">通用车位前端车位详情展示信息</div>
					<el-checkbox label="是否启用未开盘展示信息" v-model="unopenedShow" @change="handleChecked"></el-checkbox>
				</div>
				<div class="ff1">
					<el-form :model="form.open" :label-position="labelPosition" label-width="100px" style="padding-left: 0;">
						<div class="top">
							<el-form-item label="所在位置:" style="width: 25%;float: left;"></el-form-item>
			                <el-form-item label="建筑面积:" style="width: 25%;float: left;"></el-form-item>
			                <el-form-item label="所属社区:" style="width: 25%;float: left;"></el-form-item>
			                <el-form-item label="销售状态:" style="width: 25%;float: left;"></el-form-item>
						</div>
						<el-button style="float: right;" @click="addInfo">新增字段</el-button>
						<div class="top" style="margin: 10px 0 30px 0;">
							<el-checkbox label="套内面积" v-model="form.open.coverArea" style="width: 22.5%;float: left;margin-left: 30px;"></el-checkbox>
							<el-checkbox label="开盘状态" v-model="form.open.openStatusShow" style="width: 22.5%;float: left;"></el-checkbox>
							<el-checkbox label="开盘时间" v-model="form.open.openTimeShow" style="width: 24%;float: left;"></el-checkbox>
						</div>
						<div class="top" style="margin-bottom: 20px;">
							<el-checkbox label="贷款信息" v-model="form.open.whetherShow" style="width: 10%;float: left;margin-left: 30px;margin-top: 8px;"></el-checkbox>
							<el-form-item label="贷款公式:" style="width: 70%;float: left;">
								<div>
			                                                            最低首付<el-input v-model="form.open.lowNum" placeholder="请输入数字" style="width: 100px;margin: 0 10px 0 10px;"></el-input>
			                                                            元，当车位价格为<el-input v-model="form.open.payPrice" placeholder="请输入数字" style="width: 100px;margin: 0 10px 0 10px;"></el-input>元时，
			                    </div>
			                    <div style="margin-top: 10px;">                             
				                                                  最长分期<el-input v-model="form.open.longTime" placeholder="请输入数字" style="width: 100px;margin: 0 5px 0 10px;"></el-input>
				                                                  ， 每月最低还款为 <el-input v-model="form.open.lowPayNub" placeholder="请输入数字" style="width: 100px;margin: 0 10px 0 10px;"></el-input>元 
			                    </div> 
			                </el-form-item>
						</div>
						<div class="new" >
							<div style="width: 100%;float: left;font-size: 18px;margin: 20px 0 10px 25px;color: #606266;">新增字段：</div>
							<div class="location" v-for="item,index in locatin">
								<span style="margin-right: 5px;color: rgb(96, 98, 102);">{{item.fieldName}}：</span>
								<span style="color: rgb(96, 98, 102);">{{item.value}}</span>
								<span v-show="false">{{item.id}}</span>
								<a style="color: #409EFF;margin-left: 50px;" @click="deleta(index)">删除</a>
							</div>
						</div>
					</el-form>
				</div>
			</div>
			
			<!--未开盘-->
			<div class="info" v-show="show">
				<div class="title"><span class="f1"></span>未开盘前端车位详情展示信息</div>
				<div class="ff1">
					<el-form  :model="form.unopened" :label-position="labelPosition" label-width="100px" style="padding-left: 0;">
						<div class="top">
							<el-form-item label="所在位置:" style="width: 25%;float: left;"></el-form-item>
			                <el-form-item label="建筑面积:" style="width: 25%;float: left;"></el-form-item>
			                <el-form-item label="所属社区:" style="width: 25%;float: left;"></el-form-item>
			                <el-form-item label="销售状态:" style="width: 25%;float: left;"></el-form-item>
						</div>
						<el-button style="float: right;" @click="addNewinfo">新增字段</el-button>
						<div class="top" style="margin: 10px 0 30px 0;">
							<el-checkbox label="套内面积" v-model="form.unopened.coverArea" style="width: 22.5%;float: left;margin-left: 30px;"></el-checkbox>
							<el-checkbox label="开盘状态" v-model="form.unopened.openStatus" style="width: 22.5%;float: left;"></el-checkbox>
							<el-checkbox label="开盘时间" v-model="form.unopened.openTimeShow" style="width: 20%;float: left;"></el-checkbox>
						</div>
						<div class="top" style="margin-bottom: 20px;">
							<el-checkbox label="贷款信息" v-model="form.unopened.whetherShow" style="width: 10%;float: left;margin-left: 30px;margin-top: 8px;"></el-checkbox>
							<el-form-item label="贷款公式:" style="width: 70%;float: left;">
								<div>
			                                                             最低首付<el-input v-model="form.unopened.lowNum" placeholder="请输入数字" style="width: 100px;margin: 0 10px 0 10px;"></el-input>
			                                                  元，当车位价格为<el-input v-model="form.unopened.payPrice" placeholder="请输入数字" style="width: 100px;margin: 0 10px 0 10px;"></el-input>元时，
			                    </div>
			                    <div style="margin-top: 10px;">                             
				                                                  最长分期<el-input v-model="form.unopened.longTime" placeholder="请输入数字" style="width: 100px;margin: 0 5px 0 10px;"></el-input>      	
				                                                  ， 每月最低还款为 <el-input v-model="form.unopened.lowPayNub" placeholder="请输入数字" style="width: 100px;margin: 0 10px 0 10px;"></el-input>元 
			                    </div> 
			                </el-form-item>
						</div>
						<div class="new">
							<div style="width: 100%;float: left;font-size: 18px;margin: 20px 0 10px 25px;color: #606266;">新增字段：</div>
							<div class="location" v-for="item,index in locatin1">
								<span style="margin-right: 5px;color: rgb(96, 98, 102);">{{item.fieldName}}：</span>
								<span style="color: rgb(96, 98, 102);">{{item.value}}</span>
								<span v-show="false">{{item.id}}</span>
								<a style="color: #409EFF;margin-left: 50px;" @click="deletaInfo(index)">删除</a>
							</div>
						</div>
					</el-form>
				</div>
			</div>
			<el-button class="save aa1" @click="saveAll">保存</el-button>
			
			<!--通用新增弹框-->
			<el-dialog title="新增" :visible.sync="revise" width="25%">
	            <el-form ref="info" :model="info" label-width="100px" >
	                <el-form-item label="前端展示字段:">
	                    <el-input v-model="info.fieldName" placeholder="请输入前端展示字段"></el-input>
	                </el-form-item>
	                <el-form-item label="显示内容:">
	                    <el-input v-model="info.value" placeholder="请输入显示内容"></el-input>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="saveInfo">保存</el-button>
	                <el-button @click="revise=false">取 消</el-button> 
	            </span>
	        </el-dialog>
	        
	        <!--未开盘新增弹框-->
			<el-dialog title="新增" :visible.sync="editVisible" width="25%">
	            <el-form ref="infos" :model="infos" label-width="100px" >
	                <el-form-item label="前端展示字段:">
	                    <el-input v-model="infos.fieldName" placeholder="请输入前端展示字段"></el-input>
	                </el-form-item>
	                <el-form-item label="显示内容:">
	                    <el-input v-model="infos.value" placeholder="请输入显示内容"></el-input>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="saveEdit">保存</el-button>
	                <el-button @click="editVisible=false">取 消</el-button> 
	            </span>
	        </el-dialog>
		</el-form>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'show',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{
	        		open:{
	        			coverArea:true,
	        			openStatusShow:true,
	        			openTimeShow:true,
	        			whetherShow:'',
	        			lowNum:'',
	        			payPrice:'',
	        			longTime:'',
	        			lowPayNub:''
	        		},
	        		unopened:{
	        			coverArea:'',
	        			openStatus:'',
	        			openTimeShow:'',
	        			whetherShow:'',
	        			lowNum:'',
	        			payPrice:'',
	        			longTime:'',
	        			lowPayNub:''
	        		}
	        	},
	        	info:{
	        		fieldName:'',
	        		value:'',
	        	},
	        	infos:{
	        		fieldName:'',
	        		value:'',
	        	},
	        	locatin:[{
	        		fieldName:'',
	        		value:'',
	        		id:''
	        	}],
	        	locatin1:[{
	        		fieldName:'',
	        		value:'',
	        		id:''
	        	}],
	        	listType:[],
	        	revise:false,
	        	editVisible:false,
	        	unopenedShow:false,
	        	show:true
	        }
	        
	  	},
	  	created(){
	  		//渲染基本信息
	  		this.checked()
	  		//渲染通用新增字段
	  		this.save()
	  		//渲染未开盘新增字段
	  		this.save1()
	  		if(this.unopenedShow==true){
  				this.show = true
  			}else{
  				this.show = false
  			}
	  	},
	  	methods:{
	  		//是否启用未开盘
	  		handleChecked(){
	  			if(this.unopenedShow==true){
	  				this.show = true
	  			}else{
	  				this.show = false
	  			}
	  		},
	  		//渲染基本信息
	  		checked(){
	  			this.$axios.get(request.testUrl+"/project/auth1/byStages/selByProjectId")
					.then(res=>{
			            if(res.data.code==0){
			            	if(res.data.data.open!=null){
			            		this.unopenedShow=res.data.data.open.unopenedShow==0?false:true
				            	this.form.open=res.data.data.open
				            	this.form.open.coverArea=res.data.data.open.coverArea==0?false:true
				            	this.form.open.openStatusShow=res.data.data.open.openStatusShow==0?false:true
				            	this.form.open.openTimeShow=res.data.data.open.openTimeShow==0?false:true
				            	this.form.open.whetherShow=res.data.data.open.whetherShow==0?false:true
				            	if(this.unopenedShow==true){
					  				this.show = true
					  			}else{
					  				this.show = false
					  			}
			            	}
			            	if(this.unopenedShow==true&&res.data.data.unopened!=null){
				            	this.form.unopened=res.data.data.unopened
				            	this.form.unopened.coverArea=res.data.data.unopened.coverArea==0?false:true
				            	this.form.unopened.openStatus=res.data.data.unopened.openStatus==0?false:true
				            	this.form.unopened.openTimeShow=res.data.data.unopened.openTimeShow==0?false:true
				            	this.form.unopened.whetherShow=res.data.data.unopened.whetherShow==0?false:true
			            	}
			            }
			       })
	  		},
	  		//渲染通用新增字段
	  		save(){
	  			this.$axios({
			    	method:'get',
			    	url:request.testUrl+"/product/auth1/truckSpaceExpansion/list?pageType=2",
				}).then(res=>{
					if(res.data.code==0){
						this.locatin=res.data.data
					}
				})
	  		},
	  		//渲染未开盘新增字段
	  		save1(){
	  			this.$axios({
			    	method:'get',
			    	url:request.testUrl+"/product/auth1/truckSpaceExpansion/list?pageType=0",
				}).then(res=>{
					if(res.data.code==0){
						this.locatin1=res.data.data
					}
				})
	  		},
			//新增字段
			addInfo(){
				this.revise=true;
			},
			//新增字段保存
			saveInfo(){
				this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/product/auth1/truckSpaceExpansion/add",
			    	data:{
			    		fieldName:this.info.fieldName,
			    		show:1,
			    		showPage:2,
			    		value:this.info.value,
			    	}
				}).then(res=>{
					if(res.data.code==0){
						this.save()
						this.revise=false;
						this.reload()
					}
				})
			},
			//未开盘新增字段
			addNewinfo(){
				this.editVisible=true;
			},
			//未开盘新增字段保存
			saveEdit(){
				this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/product/auth1/truckSpaceExpansion/add",
			    	data:{
			    		fieldName:this.infos.fieldName,
			    		show:1,
			    		showPage:0,
			    		value:this.infos.value,
			    	}
				}).then(res=>{
					if(res.data.code==0){
						this.save1()
						this.editVisible=false;
						this.reload()
					}
				})
			},
			//通用新增字段删除
			deleta(index){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.delete(request.testUrl+"/product/auth1/truckSpaceExpansion/"+this.locatin[index].id)
					.then(res=>{
			            if(res.data.code==0){
			            	this.save(),
			            	this.$message({
								type: 'info',
								message: '已删除成功'
							});
			            }
			       })
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//未开盘新增字段删除
			deletaInfo(index){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.delete(request.testUrl+"/product/auth1/truckSpaceExpansion/"+this.locatin1[index].id)
					.then(res=>{
			            if(res.data.code==0){
			            	this.save1(),
			            	this.$message({
								type: 'info',
								message: '已删除成功'
							});
			            }
			        })
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//数据保存
			saveAll(){
				var data=[{
		    		unopenedShow:this.unopenedShow==true?1:0,
		    		coverArea:this.form.open.coverArea==true?1:0,
		    		openStatusShow:this.form.open.openStatusShow==true?1:0,
		            openTimeShow:this.form.open.openTimeShow==true?1:0,
		            whetherShow:this.form.open.whetherShow==true?1:0,
		            lowNum:this.form.open.lowNum,
        			payPrice:this.form.open.payPrice,
        			longTime:this.form.open.longTime,
        			lowPayNub:this.form.open.lowPayNub,
        			dataType:0
		    	}]
				if(this.unopenedShow!=false){
					data.push({
						dataType:1,
						coverArea:this.form.unopened.coverArea==true?1:0,
						openStatus:this.form.unopened.openStatus==true?1:0,
			            openTimeShow:this.form.unopened.openTimeShow==true?1:0,
			            whetherShow:this.form.unopened.whetherShow==true?1:0,
			            lowNum:this.form.unopened.lowNum,
	        			payPrice:this.form.unopened.payPrice,
	        			longTime:this.form.unopened.longTime,
	        			lowPayNub:this.form.unopened.lowPayNub,
	        			unopenedShow:0
					})
				}
				this.$axios({
			    	method:'post',
			    	url:request.testUrl+"/project/auth1/byStages/addOrUpdByStages",
			    	data:data
				}).then(res=>{
					if(res.data.code==0){
						this.checked()
						this.$message({
							type: 'info',
							message: '更新成功！'
						});
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
		margin: 0 auto;
		margin-top: 20px;
	}
	.info .el-form .top{
		width: 80%;
		float: left;
	}
	.info .el-form .new{
		width: 100%;
		border-top:1px dashed #acacac ;
		float: left;
	}
	.location{
		float: left;
		margin-bottom: 20px;
		margin-top: 10px;
		margin-left: 25px;
		margin-right: 30px; 
	}
	.save{
		display: block;
		margin: 0;
		margin: 50px auto;
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