<template>
	<div>
		<el-form class="main" :model="form" >
			<!--基本信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>基本信息</div>
				<div class="ff1">
					<el-form :model="form.info" :label-position="labelPosition" label-width="120px">
						<div class="left">
							<el-form-item label="楼栋名称 :">
		    					<el-input v-model="form.info.name" placeholder="请输入楼栋名称" style="width: 400px;"></el-input>
							</el-form-item>
							<el-form-item label="当前状态 :">
								{{form.info.openStatusName}}
		    					<el-checkbox v-model="form.info.stopSell" style="margin: 0 10px 0 80px;">暂停销售</el-checkbox>
							</el-form-item>
							<el-form-item label="开盘时间 :">
								<el-date-picker v-model="form.info.openStartTime" type="datetime" placeholder="选择日期时间" v-if="form.info.timeFollowOpenTime==false"></el-date-picker>
								<el-checkbox label="与开盘时间一致" style="margin-left: 10px;" v-model='form.info.timeFollowOpenTime' :checked="form.info.timeFollowOpenTime"></el-checkbox>
							</el-form-item>	
						</div>
						<div class="right">
							<el-form-item label="楼栋编号 :">{{form.info.code}}</el-form-item>
						</div>	
					</el-form>
				</div>
			</div>
			<!--车位展示信息管理-->
			<div class="info">
				<div class="title"><span class="f1"></span>楼栋车位展示信息管理</div>
				<div class="ff1">
					<el-form :model="form.info" :label-position="labelPosition" label-width="120px">
						<div class="leftOne">
							<el-form-item label="此楼栋车位总数 :" style="width: 50%;float: left;">{{form.info.areaCarCount}}个</el-form-item>
							<el-form-item label="已售出 :" style="width: 50%;float: left;">{{form.info.hasSelled}}个</el-form-item>
						</div>
						<div class="rightOne">
							<el-form-item label="策略售出 :" style="width: 50%;float: left;">{{form.info.celueSelled}}个</el-form-item>
							<el-button style="margin-left: 50px;" class="aa1" @click="jump">前往管理</el-button>
						</div>	
						<div class="leftOne">
							<el-form-item style="width: 100%;" label-width="0px">
								<el-checkbox v-model="form.info.showStrategy">展示策略售出状态的车位</el-checkbox>
							</el-form-item>
						</div>
						<div class="rightOne">
							<el-form-item style="width: 100%;margin-left: 40px;" label-width="0px">
								<el-checkbox v-model="form.info.showSelled">展示已售出状态车位</el-checkbox>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</div>
			
			<!--车位图-->
			<div class="info" v-if="false">
				<div class="title"><span class="f1"></span>车位图</div>
				<div class="ff1">
					<el-form :model="form.info" :label-position="labelPosition" label-width="120px">
						<el-form-item label="楼栋车位图 :"style="margin-left: 10px;">
							<div class="pic-box">
		                        <div class="upload_warp" >
		                            <div class="upload_warp_left img-upload" @click="homeImg_file">
		                                <img :src="image" v-if="image" class="avatar mt0" style="width: 200px;height: 100px;">
		                            </div>
		                        </div>
		                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
		                    </div>
						</el-form-item>
					</el-form>
				</div>
			</div>
			
			<el-button class="save aa1" @click="save">保存</el-button>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'add_region',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{
	        		info:{
	        			timeFollowOpenTime:true
	        		}
	        	},
	        	image:""
	        }
	  	},
	  	created(){
	  		//渲染信息
	  		let id=this.$route.query.id;
			this.$axios.get(request.testUrl+"/product/auth1/TruckSpaceLevelThree/selectOne",{
					params:{
						truckSpaceLevelThreeId:id,
					}
			}).then(res=>{
				if(res.data.code==0){
					this.form.info=res.data.data
					// if(res.data.data.truckSpaceImageList.length!=0){
					// 	this.image=res.data.data.truckSpaceImageList[0].image
					// }
					this.form.info.stopSell=this.form.info.stopSell==1
					this.form.info.showStrategy=this.form.info.showStrategy==1
					this.form.info.showSelled=this.form.info.showSelled==1
					this.form.info.timeFollowOpenTime=this.form.info.timeFollowOpenTime==1?true:false
				}else{
					this.$message({
								type: 'info',
								message: res.data.msg
							});	
				}
			
			})
	  	},
	  	watch: {
			'$route' (to, from) {
			 	if(to.path=="/修改楼栋管理-第三级"){
			 		//渲染信息
			  		let id=this.$route.query.id;
					this.$axios.get(request.testUrl+"/product/auth1/TruckSpaceLevelThree/selectOne",{
							params:{
								truckSpaceLevelThreeId:id,
							}
					}).then(res=>{
						if(res.data.code==0){
							this.form.info=res.data.data
							// if(res.data.data.truckSpaceImageList.length!=0){
							// 	this.image=res.data.data.truckSpaceImageList[0].image
							// }
							this.form.info.stopSell=this.form.info.stopSell==1
							this.form.info.showStrategy=this.form.info.showStrategy==1
							this.form.info.showSelled=this.form.info.showSelled==1
							this.form.info.timeFollowOpenTime=this.form.info.timeFollowOpenTime==1?true:false
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});	
						}
					
					})
			 	}
			}
		},
	  	methods:{
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
	        homeImg_uploadImage(filesrc){
	            var param = new FormData(); // FormData 对象
	            param.append("file", filesrc); // 文件对象
	            this.$axios({
	                method: "post",
	                url: request.testUrl+"/project/auth1/image/upload",
	                data: param
	            })
	            .then(res => {
	                if(res.data.code==0){
	                	this.image=res.data.data
	                    this.$message({
	                        type: 'info',
	                        message: "图片上传成功！"
	                    }); 
	                }  
	            })
	            .catch(error => {
	            });
	        },
	        //前往管理页面
	        jump(){
	        	this.$router.push({ path: '/车位管理',query:{id:this.$route.query.id}})
	        },
	        //保存
	        save(){
	        	// var images=[]
	        	// var url={"image":this.image}
	        	// images.push(url)
	        	this.$axios({
		        	method:'post',
		        	url:request.testUrl+"/product/auth1/TruckSpaceLevelThree/doUpdate",
		        	data:{
		        		id:this.$route.query.id,
		        		name:this.form.info.name,
		        		stopSell:this.form.info.stopSell==true?1:0,
		        		openStartTime:this.form.info.timeFollowOpenTime==false?this.form.info.openStartTime:'',
		        		timeFollowOpenTime:this.form.info.timeFollowOpenTime==true?1:0,
		        		showStrategy:this.form.info.showStrategy==true?1:0,
		        		showSelled:this.form.info.showSelled==true?1:0,
		        		// imagesList:images
		        	}
				}).then(res=>{
						if(res.data.code==0){
							this.$router.push({ path: '/楼层管理'})
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
	.leftOne{
		width: 630px;
		float: left;
		margin-left: 40px;
	}
	.rightOne{
		width: 670px;
		float: left;
		
	}
	.info .drap{
		width: 100%;
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