<template>
	<div>
		<el-form class="main" :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="120px">
			<!--小区详情-->
			<div class="info">
				<!--<span v-show="1==2">{{form.id}}</span>-->
				<div class="title">
					<span class="f1"></span>
					<div style="width:200px ;float: left;margin-right: 50px;">现场开盘</div>
					<el-checkbox label="是否打开现场开盘" v-model="form.localOpen" :checked="form.localOpen" @change="change1"></el-checkbox>
				</div>
				<!--<div class="ff1">
					<el-form-item label-width="100px" style="margin-top: 20px;">
						<el-form-item label="活动时限:" prop='limitTime'>
		              
							<el-input v-model="form.limitTime" placeholder="请输入时间" style="width: 150px;margin-right: 10px;" @blur="BlurText($event)"></el-input>
		                    <el-select v-model="form.timeUnit" placeholder="请选择" style="width: 150px;" @change="selectChange">
							    <el-option label="小时" :value="1"></el-option>
							    <el-option label="天" :value="2"></el-option>
						    </el-select>
		                </el-form-item>
		                <el-form-item label="项目开盘详情:" prop='detail'>
		                    <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.detail" style="width: 600px;"></el-input>
		                </el-form-item>
	               	</el-form-item>
               	</div>-->
               	<div class="title" style="margin-top: 50px;">
					<span class="f1"></span>
					<div style="width:200px ;float: left;margin-right: 50px;">模拟开盘</div>
					<el-checkbox label="是否打开模拟开盘" v-model="form.rehearseOpen" :checked="form.rehearseOpen" @change="change2"></el-checkbox>
				</div>
				<div class="ff1">
					<el-form-item label-width="100px" style="margin-top: 20px;">
						<el-form-item label="活动时限:">
		                    <el-date-picker v-model="form.mlStartTime" type="datetime" placeholder="选择日期时间"></el-date-picker> ~
							<el-date-picker v-model="form.mlEndTime" type="datetime" placeholder="选择日期时间" ></el-date-picker>
		                </el-form-item>
		                
	               	</el-form-item>
               	</div>
			</div>
			<el-button class="save" @click="save">保存</el-button>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'banner',
		data(){
	        return {
				//默认显示小时输入框
				// show:true,
				// 默认显示小时
				// timeDuge:0,
				labelPosition:'left',
				//存取活动时限
				// limitTime:'',
				localOpen:'',
				rehearseOpen:'',
	        	form:{
					//是否现场开盘
					localOpen:false,
					// 是否开启模拟开盘 0 关闭1 打开
					rehearseOpen:false,
				},
				rules:{
					limitTime:{required:true,message:'请输入时间',trigger:'blur'},
					detail:{required:true,message:'请输入内容',trigger:'blur'},
				}
	        }
		   },
		created(){
			this.renderData();
			// alert(this.form.localOpen);
		},
	   	methods:{
	   		//判断只能输入正整数
	   		BlurText(e){　　
		　　　	let boolean=new RegExp("^[1-9][0-9]*$").test(e.target.value)
				if(!boolean){
					this.$message.warning('输入框内请输入正整数！')
					this.form.limitTime=''
				}
		　　},
			//数据加载
	   		renderData(){
				   this.$axios.get(request.testUrl+'/project/auth1/openActivity/get')
				   .then(res=>{
						this.form.id=res.data.data.id;
						this.form=res.data.data;
						//没有数据 不赋值
						if(res.data.data.localOpen==null&&res.data.data.rehearseOpen==null){
							return;
						}else{
							// 有数据才赋值
							if(res.data.data.localOpen==1){
								this.form.localOpen=true;
							}else{
								this.form.localOpen=false;
							}
							if(res.data.data.rehearseOpen==1){
								this.form.rehearseOpen=true;
							}else{
								this.form.rehearseOpen=false;
							}
						}
				   })
			},
			//时间选择
			selectChange(val){
				// alert(val);
				//1小时
				if(val=='1'){
					this.form.timeUnit=parseInt(val);
					//显示 小时文本框
					// this.show=true;
					if(this.form.limitTime==undefined){
						this.$message({
							type:'error',
							message:'请输入时间'
						});
						return;
					}else{
						this.form.limitTime=this.form.limitTime;
					}
					// alert(this.form.limitTime);
				}else{
					this.form.timeUnit=parseInt(val);
					//显示 天文本框
					// this.show=false;
					if(this.form.limitTime==undefined){
						this.$message({
							type:'error',
							message:'请输入时间'
						});
						return;
					}else{
						this.form.limitTime=this.form.limitTime;
					}
					// alert(this.form.limitTime);
				}
				
			},
			//是否现场开盘
			change1(val){
				// alert(val);
				if(val==true){
					this.form.localOpen=val;
				}else{
					this.form.localOpen=val;
				}
				// alert(this.form.localOpen);
			},
			//是否需要模拟开盘
			change2(val){
				// alert(val);
				if(val==true){
					this.form.rehearseOpen=val;
				}else{
					this.form.rehearseOpen=val;
				}
				// alert(this.form.rehearseOpen);
			},
			//保存
			save(form){
				this.$refs.form.validate((valid) => {
					if (valid) {
						// 现场开盘
						if(this.form.localOpen==true){
							this.localOpen=1;
						}else{
							this.localOpen=0;
						}
						//模拟开盘
						if(this.form.rehearseOpen==true){
							this.rehearseOpen=1;
						}else{
							this.rehearseOpen=0;
						}
						var data={};
						data.localOpen=this.localOpen;
						data.rehearseOpen=this.rehearseOpen;
						if(!this.form.mlStartTime){
							this.$message({
								type:'warning',
								message:'请选择开始时间'
							})
							return;
						}else{
							data.mlStartTime=this.form.mlStartTime;
						}
						if(!this.form.mlEndTime){
							this.$message({
								type:'warning',
								message:'请选择结束时间'
							})
							return ;
						}else{
							data.mlEndTime=this.form.mlEndTime;
						}
						this.$axios({
							method:'post',
							url:request.testUrl+'/project/auth1/openActivity/update',
							data:JSON.stringify(data)
						}).then(res=>{
							if(res.data.code==0){
								this.renderData();
								this.$message({
									type:'info',
									message:'更改信息成功！'
								});
							}else{
								this.$message({
									type:'info',
									message:res.data.msg
								});
							}
							
						})
					}else {
			            return false;
			        }
				})
			}
	   	}
	}
</script>

<style>
	.mian{
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.info{
		width:96% ;
		height: auto;
		overflow: hidden;
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
		margin-bottom: 20px;
	}
	.save{
		display: block;
		margin: 0;
		margin: 50px auto;
		background:#9768e5 ;
		color: #FFFFFF;
	}
	.save:hover{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.save:focus{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}

</style>