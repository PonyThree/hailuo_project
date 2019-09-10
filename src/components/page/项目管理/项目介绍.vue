<template>
	<div>
		<el-form class="main" :model="form" >
			<!--小区详情-->
			<div class="info">
				<div class="title">
					<span class="f1"></span>小区详情
					<el-button class="button" @click="savePolity(form.aa.id)" style='float: right;'>保存</el-button>
				</div>
				<div class="ff1">
					<span v-show='1==2'>{{form.aa.id}}</span>
					
					<el-form :model="form.aa" :label-position="labelPosition" label-width="120px">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
						<div class="left">
							<el-form-item label="总业主数 :" >
							    <el-input v-model="form.aa.ownerNobuy" placeholder="请输入数量" style="width: 200px;"></el-input>&nbsp;&nbsp;位
							</el-form-item>
							<el-form-item label="可选车位 :" >
								<el-input v-model="form.aa.surplusTruckSpace" placeholder="请输入数量" style="width: 200px;"></el-input>&nbsp;&nbsp;个
							</el-form-item>
							<!-- <el-form-item label="车位配比 :">
								<el-input v-model="form.aa.compareA" placeholder="请输入数量" style="width: 200px;"></el-input>&nbsp;&nbsp;：
								<el-input v-model="form.aa.compareB" placeholder="请输入数量" style="width: 200px;"></el-input>&nbsp;&nbsp;个
							</el-form-item> -->
						</div>
						<div class="right">
							<el-form-item :label=" '小区政策'+(index+1)+':' " v-for='(item,index) in form.aa.policyList' :key="index">
								<el-input v-model="item.policy"  style="width: 200px;float: left;"></el-input>
								<el-input v-model="item.id" v-show="1==2" ></el-input>
								<i class="iconfont icon-jia use" @click='addPolity' v-if='num==index'></i>
								<i class="iconfont icon-jian use" @click='reducePolity(item)' v-if='form.aa.policyList.length>1'></i>
							</el-form-item>
						</div>	
					</el-form>
				</div>
			</div>
			<!--用户认购协议-->
			<div class="info">
				<div class="title">
					<span class="f1"></span>用户认购协议
					<el-button class="button" @click="saveAgreement" style='float: right;'>保存</el-button>
				</div>
				<div class="ff1">
					
					<el-form :model="form" :label-position="labelPosition" label-width="120px">
						<el-form-item label-width="0px">
							<el-input v-model="form.buyAgreement" placeholder="请输用户购买协议" type="textarea" :rows="20" style="width: 1200px;margin-left: 45px;margin-top: 20px;margin-bottom: 20px;"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!-- 用户认购核销协议 -->
			<div class="info">
				<div class="title">
					<span class="f1"></span>用户认购核销协议
					<el-button class="button" @click="buyHxAgreement(2)" style='float: right;'>保存</el-button>
				</div>
				<div class="ff1">
					
					<el-form :model="form" :label-position="labelPosition" label-width="120px">
						<el-form-item label-width="0px">
							<el-input v-model="form.buyHxAgreement" placeholder="请输用户购买核销协议" type="textarea" :rows="20" style="width: 1200px;margin-left: 45px;margin-top: 20px;margin-bottom: 20px;"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!-- 用户落位协议 -->
			<div class="info">
				<div class="title">
					<span class="f1"></span>用户落位协议
					<el-button class="button" @click="saveAgreement1" style='float: right;'>保存</el-button>
				</div>
				<div class="ff1">
					
					<el-form :model="form" :label-position="labelPosition" label-width="120px">
						<el-form-item label-width="0px">
							<el-input v-model="form.downAgreement" placeholder="请输用户落位协议" type="textarea" :rows="20" style="width: 1200px;margin-left: 45px;margin-top: 20px;margin-bottom: 20px;"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!-- 用户落位核销协议 -->
			<div class="info">
				<div class="title">
					<span class="f1"></span>用户落位核销协议
					<el-button class="button" @click="buyHxAgreement(1)" style='float: right;'>保存</el-button>
				</div>
				<div class="ff1">
					
					<el-form :model="form" :label-position="labelPosition" label-width="120px">
						<el-form-item label-width="0px">
							<el-input v-model="form.downHxAgreement" placeholder="请输用户落位核销协议" type="textarea" :rows="20" style="width: 1200px;margin-left: 45px;margin-top: 20px;margin-bottom: 20px;"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!--项目介绍-->
			<div class="info">
				<div class="title">
					<span class="f1"></span>项目介绍
					<el-button class="button" @click="add">新增</el-button>
				</div>
				<div class="ff1">
					<el-form :model="form" :label-position="labelPosition" label-width="120px">
						
	    				<el-form-item style="width: 45%;float: left;" label-width="50px" v-for="(domains, index2) in form.activityPresentationVoList">
	    					<i style="display: inline-block;float: left;margin-top: 36px;margin-right: 5px;">{{index2+1}}:</i>
							<span class="list">{{domains.linkName}}</span>
							<img :src="domains.image"/>
							<!-- <span v-show='1==2'>{{domains.id}}</span> -->
							<!-- <el-button type='primary' @click="modifyInfo(index2,domains.id)">修改</el-button> -->
							<!-- <el-button type='dander' @click="derails(index2,domains.id)">删除</el-button> -->
							<a @click="modifyInfo(index2,domains.id)" class="introduction" style='color:#00f;'>修改</a>
							<a @click="derails(index2,domains.id)" class="introduction"  style='color:#f66;'>删除</a>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</el-form>
		
		<!-- 修改项目介绍弹出框 -->
        <el-dialog title="修改项目介绍" :visible.sync="revise" width="25%">
            <el-form ref="info" :model="info" label-width="100px" >
                <el-form-item label="链接名称:">
                    <el-input v-model="info.linkName" placeholder="请输入链接名称"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接地址:">
                    <el-input v-model="info.content" placeholder="请输入跳转链接地址"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍图片:">
                    <div class="pic-box">
                        <div class="upload_warp" >
                            <div class="upload_warp_left img-upload" @click="homeImg_file">
                                <img :src="homeImg" v-if="homeImg" class="avatar mt0">
                            </div>
                        </div>
                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
                    </div>
                </el-form-item>
                <!-- <el-form-item v-show="false">
                    <el-input v-model="info.id" ></el-input>
                </el-form-item>	 -->
				<el-form-item>
					<template>
						<div style='margin:0 auto'>
							<el-input v-model="info.id" v-show="false"></el-input>
							<el-button type="primary" @click="saveInfo(info.id)" style='float:right;'>保存</el-button>
							<el-button @click="revise=false" style='float:right;'>取 消</el-button>
						</div>
					</template>
				</el-form-item>
            </el-form>
			<!-- <span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveInfo">保存</el-button>
					<el-button @click="revise=false">取 消</el-button> 
			</span> -->
            
        </el-dialog>
        
        <!-- 新增项目介绍弹出框 -->
        <el-dialog title="新增项目介绍" :visible.sync="editVisible" width="25%">
            <el-form ref="info" :model="info" label-width="120px" :rules="rules" >
                <el-form-item label="链接名称:" prop="linkName">
                    <el-input v-model="info.linkName" placeholder="请输入链接名称"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接地址:" prop="content">
                    <el-input v-model="info.content" placeholder="请输入跳转链接地址"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍图片:">
                    <div class="pic-box">
                        <div class="upload_warp" >
                            <div class="upload_warp_left img-upload" @click="homeImg_file">
                                <img :src="homeImg" v-if="homeImg" class="avatar mt0">
                            </div>
                        </div>
                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
                    </div>
                </el-form-item>
                <el-form-item v-show="false">
                    <el-input v-model="info.id" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="saveEdit">保存</el-button>
                <el-button @click="editVisible=false">取 消</el-button> 
            </span>
        </el-dialog>
	</div>
</template>

<script>
	export default{
		name:'introduction',
		inject:['reload'],
		data(){
	        return {
				labelPosition:'right',
				//用来记录小区政策的数量值
				num:0,
	        	form:{
					buyAgreement:'',
					//认购核销协议
					buyHxAgreement:" 1.请在有效期内核销，过期认购核销码自动失效，认购订单同时失效，认购金原路退回，即时到账；\n 2.核销前可修改线下签约人、电话及身份证号码，核销后不可修改；\n 3.请提前联系置业顾问确定线下核销时间，出示认购核销码，由置业顾问扫码核销，认购成功。",
					//落位协议
					downAgreement:'222222222',
					//落位核销协议
					downHxAgreement:' 1.请在有效期内核销，过期落位核销码自动失效，落位订单同时失效；\n 2.落位订单失效，落位金去向有以下两种情况：\n （1）原路退回，即时到账。\n （2）落位金退回到钱包，请联系置业顾问解冻。\n 3.核销前可修改线下签约人、电话及身份证号码，核销后不可修改；\n 4.请提前联系置业顾问确定线下核销时间，出示落位核销码，由置业顾问扫码核销，落位成功。',
					activityPresentationVoList:[],
	        		aa:{
						//车位配比
	        			compareA:'',
	        			compareB:'',
						// startTime:'',
						//业主数
						ownerNobuy:'',
						id:'',
						//剩余车位
						surplusTruckSpace:'',
						// endTime:'',
						//小区政策
	        			policyList:[{
	        				policy:'',
	        				id:''
	        			}]
	        		}
				},
				homeImg:'',
	        	info:{
	        		// homeImg:''
	        	},
	        	revise:false,
	        	editVisible:false,
	        	rules:{
					linkName:{required:true,message:'请输入链接名称',trigger:'blur'},
					content:{required:true,message:'请输入跳转链接地址',trigger:'blur'},
				}
	        }
		},
		created(){
			this.renderProList();
			this.renderStartPility();
			this.renderAgreeMent();
		},
	    methods:{
			// 项目介绍列表渲染
			renderProList(){
				this.$axios.get(request.testUrl+'/project/auth1/activityInfo/select')
				.then(res=>{
					// console.log(res.data.data);
					this.form.activityPresentationVoList=res.data.data;
				})
			},
			//渲染小区政策初始的数据
			renderStartPility(){
				this.$axios.post(request.testUrl+'/project/auth1/district/select')
				.then(res=>{
					//初始化没有数据就调用新增接口
//					if(res.data.data==null){
//						this.$message({
//							type:'info',
//							message:'请新增一条小区政策信息再修改'
//						});
//					}else{
						if(res.data.code==0){
							if(res.data.data){
								this.form.aa=res.data.data;
								this.num=res.data.data.policyList.length-1;
							}
						}
						if(this.form.aa.policyList.length<1){
							this.addPolity()
						}
							
//					}
				})
			},
			//用户协议渲染
			renderAgreeMent(){
				this.$axios.get(request.testUrl+'/project/auth1/project/selProjectInfo')
				.then(res=>{
					// console.log(res.data);
//					if(res.data.data.buyAgreement==null){
//						this.$message({
//							type:'info',
//							message:'请新增一条用户协议信息再修改'
//						});
//					}else{
						if(res.data.code==0){
							this.form.buyAgreement=res.data.data.buyAgreement;
							this.form.buyHxAgreement=res.data.data.buyVerificationAgreement;
							this.form.downAgreement=res.data.data.downAgreement;
							this.form.downHxAgreement=res.data.data.downVerificationAgreement;
						}else{
							this.$message({
								type:'info',
								message:res.data.msg
							});
						}
							
//					}
				})
			},
			//项目介绍修改
			modifyInfo(i,id){
				this.revise=true;
				// alert(id);
				//修改之前的数据加载
				this.$axios.get(request.testUrl+'/project/auth1/activityInfo/findOne',{
					params:{
						id:id
					}
				}).then(res=>{
					// console.log(res.data.data)
					var obj={};
					obj.linkName=res.data.data.linkName;
					obj.content=res.data.data.content;
					obj.id=res.data.data.id;
					this.info=obj;
					this.homeImg=res.data.data.image;
					
				})
			},
			//修改保存
			saveInfo(id){
				// alert(id);
				var params=new URLSearchParams();
				params.append('linkName',this.info.linkName);
				params.append('content',this.info.content);
				params.append('image',this.homeImg);
				params.append('id',id);
				this.$axios.post(request.testUrl+'/project/auth1/activityInfo/insertOrUpdate',params)
				.then(res=>{
					if(res.data.code==0){
						this.revise=false;
						this.$message({
							type:'success',
							message:'修改成功'
						});
						this.renderProList();
					}
				})
			},
			//项目介绍删除
			derails(i,id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params=new URLSearchParams();
					params.append('id',id);
					this.$axios.post(request.testUrl+'/project/auth1/activityInfo/delete',params).then(res=>{
						if(res.data.code==0){
							this.$message({
								type:'success',
								message:'删除成功'
							})
							this.renderProList();
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//新增项目介绍
			add(){
				this.editVisible=true;
			},
			//新增项目介绍保存
			saveEdit(info){
				this.$refs.info.validate((valid) => {
					if (valid) {
						if(this.homeImg==''){
							this.$message({
								type:'info',
								message:'请上传活动介绍图片'
							});
							return
						}
						var params=new URLSearchParams();
						params.append('linkName',this.info.linkName);
						params.append('content',this.info.content);
						params.append('image',this.homeImg);
						this.$axios.post(request.testUrl+'/project/auth1/activityInfo/insertOrUpdate',params)
						.then(res=>{
							if(res.data.code==0){
								this.editVisible=false;
								this.$message({
									type:'success',
									message:'新增成功'
								});
								this.reload();
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
			},
			//保存用户协议
			saveAgreement(){
				if(this.form.buyAgreement.split(" ").join("").length==0){
					this.$message({
						type:'info',
						message:'不可输入空格！'
					})
					return
				}
				var params=new URLSearchParams();
				params.append('buyAgreement',this.form.buyAgreement);
				this.$axios.post(request.testUrl+'/project/auth1/project/updateBuyAgreement',params)
				.then(res=>{
					if(res.data.code==0){
						this.$message({
							type:'success',
							message:'操作成功'
						})
						this.renderProList();
						this.renderStartPility();
						this.renderAgreeMent();
					}
				})
			},
			// 认购核销协议 type=2
			buyHxAgreement(type){
				console.log(type);
				var params=new URLSearchParams();
				if(type==1){
					params.append('agreement',this.form.downHxAgreement);
					params.append('type',1);
				}else{
					params.append('agreement',this.form.buyHxAgreement)
					params.append('type',2);
				}
				this.$axios.post(request.testUrl+'/project/auth1/project/verificationAgreement',params).then(res=>{
					if(res.data.code==0){
						this.$message({
							type:'success',
							message:'保存成功'
						})
					}else{
						this.$message({
							type:'success',
							message:res.data.msg
						})
					}
				})
			},
			//保存落位协议
			saveAgreement1(){
				if(this.form.downAgreement.split(" ").join("").length==0){
					this.$message({
						type:'info',
						message:'不可输入空格！'
					})
					return
				}
				var params=new URLSearchParams();
				params.append('downAgreement',this.form.downAgreement);
				this.$axios.post(request.testUrl+'/project/auth1/project/updateDownAgreement ',params)
				.then(res=>{
					if(res.data.code==0){
						this.$message({
							type:'success',
							message:'操作成功'
						})
						this.renderProList();
						this.renderStartPility();
						this.renderAgreeMent();
					}
				})
			},
			//小区政策添加
			addPolity(){
				this.form.aa.policyList.push({

				});
				this.num=this.form.aa.policyList.length-1;
				// alert(this.num);
			},
			// 减少小区政策
			reducePolity(item){
				var index=this.form.aa.policyList.indexOf(item);
				if(index!=-1){
					this.form.aa.policyList.splice(index,1);
				}
				this.num=this.form.aa.policyList.length-1;
			},
			//小区政策修改保存
			//保存小区政策
			savePolity(id){
				if(id==''){
					this.form.aa.id=null;
				}else{
					this.form.aa.id=id;
					
				}
				let compareAs = parseFloat(this.form.aa.compareA)
				this.form.aa.compareA = compareAs
					this.$axios.post(request.testUrl+'/project/auth1/district/update',JSON.stringify(this.form.aa))
						.then(res=>{
							if(res.data.code==0){
								this.$message({
									type:'success',
									message:'操作成功'
								});
								this.renderProList();
								this.renderStartPility();
								this.renderAgreeMent();
							}else{
								this.$message({
									type:'info',
									message:res.data.msg
								});
							}
				})
				
			},
			
			//图片上传
			homeImg_file() {
	            document.getElementById('homeImg_upload_file').click()
	        },
	        homeImg_fileChange(el) {
	            if (!el.target.files[0].size) return;
	            this.homeImg_fileList(el.target);
	            el.target.value = ''
	        },
	        homeImg_fileList(fileList) {
	            let files = fileList.files;
	            for (let i = 0; i < files.length; i++) {
	                //判断是否为文件夹
	                if (files[i].type != '') {
	                    this.homeImg_uploadImage(files[i]);  
	                } else {
	                    //文件夹处理
	                    this.homeImg_folders(fileList.items[i]);
	                }
	            }
	        },
	        //文件夹处理
	        homeImg_folders(files) {
	            let _this = this;
	            //判断是否为原生file
	            if (files.kind) {
	                files = files.webkitGetAsEntry();
	            }
	            files.createReader().readEntries(function (file) {
	                for (let i = 0; i < file.length; i++) {
	                    _this.folders(file[i]);
	                }
	            })
			},
			//图片上传成功
	        homeImg_uploadImage(filesrc){
	            var param = new FormData(); // FormData 对象
	            param.append("file", filesrc); // 文件对象
	            param.append('type', 4);
	            this.$axios({
	                method: "post",
	                url:request.testUrl+"/project/auth1/image/upload",
	                data: param
	            })
	            .then(res => {
	                if(res.data.code==0){
	                    this.homeImg=res.data.data;
	                    this.$message({
	                        type: 'success',
	                        message: "图片上传成功！"
	                    }); 
	                }  
	            })
	            .catch(error => {
	            });
			},
			
	    }
	}
</script>

<style>
	.main{
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
		margin-right: 40px;
	}
	.right{
		width: 670px;
		float: left;
		
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
	.iconfont.use{
		font-size: 30px;
		color:#dad9d9;
		margin-left: 40px;
		display: block;
		float: left;
	}
	.iconfont.use:hover{
		color: #1c1c1c;
	}
	.list{
		display: inline-block;
		float: left;
		margin: 36px 50px 0 0;
	}
	img{
		width: 200px;
		height: 100px;
		display: block;
		float: left;
	}
	.introduction{
		display: inline-block;
		margin: 36px 0 0 40px;
	}
	.avatar{
		width:200px;
		height:100px;
	}
</style>