<template>
	<div>
		<el-form class="main" :model="form" >
			<!--基本信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>基本信息</div>
				<div class="ff1">
					<el-form :model="form.info" :label-position="labelPosition" label-width="120px" :rules="rules" ref="info">
						<div class="left">
							<el-form-item label="楼层名称 :" prop="name">
		    					<el-input v-model="form.info.name" placeholder="请输入楼层名称" style="width: 400px;"></el-input>
							</el-form-item>
							<el-form-item label="当前状态 :">
		    					<el-checkbox v-model="form.info.stopSell" v-bind="{'checked': form.info.stopSell? true : false}" style="margin: 0 10px 0 0px;">暂停销售</el-checkbox>
							</el-form-item>
							<el-form-item label="开盘时间 :">
							    <el-date-picker v-model="form.info.openStartTime" type="datetime" placeholder="选择日期时间" v-if="form.info.timeFollowOpenTime==false"></el-date-picker>
							    <el-checkbox label="与开盘时间一致" style="margin-left: 10px;" v-model='form.info.timeFollowOpenTime' :checked="form.info.timeFollowOpenTime"></el-checkbox> 
							</el-form-item>	
						</div>
					</el-form>
				</div>
			</div>
			<!--车位展示信息管理-->
			<div class="info">
				<div class="title"><span class="f1"></span>楼层车位展示信息管理</div>
				<div class="ff1">
					<el-form :model="form.info" :label-position="labelPosition" label-width="120px">	
						<div class="leftOne">
							<el-form-item style="width: 100%;" label-width="0px">
								<el-checkbox v-model="form.info.showStrategy" v-bind="{'checked': form.info.showStrategy?true: false}">展示策略售出状态的车位</el-checkbox>
							</el-form-item>
						</div>
						<div class="rightOne">
							<el-form-item style="width: 100%;margin-left: 40px;" label-width="0px">
								<el-checkbox v-model="form.info.showSelled" v-bind="{'checked': form.info.showSelled? true: false}">展示已售出状态车位</el-checkbox>
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
						<el-form-item label="车位分布图 :"style="margin-left: 10px;">
							<div class="pic-box">
		                        <div class="upload_warp" >
		                            <div class="upload_warp_left img-upload" @click="homeImg_file">
		                                <img :src="form.info.imagesList[0].image" v-if="form.info.imagesList[0]" class="avatar mt0" style="width: 200px;height: 100px;">
		                            </div>
		                        </div>
		                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
		                    </div>
						</el-form-item>
					</el-form>
				</div>
			</div>
			
			<el-button class="save aa1" @click="saveInfo">保存</el-button>
		</el-form>
	</div>
</template>

<script>
	export default{
		inject:['reload'],
		name:'add_region1',
		data(){
	        return {
	        	labelPosition:'right',
	        	form:{
	        		info:{
	        			timeFollowOpenTime:true,
	        			imagesList:[]
	        		}
	        	},
	        	rules:{
					name:{required:true,message:'请输入楼层名称',trigger:'blur'},
				},
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
	                    this.imgPreview(files[i]);  
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
	        
	        imgPreview(file, callback) { 
				let self = this; 
				//判断支不支持FileReader 
				if (!file || !window.FileReader) return; 
				if (/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader(); 
					//将图片转成base64格式 
					reader.readAsDataURL(file); 
					//读取成功后的回调 
					reader.onloadend = function() { 
						let result = this.result; 
						let img = new Image();img.src = result; 
						img.onload = function() {
							let data = self.compress(img);self.imgUrl = result; 
							let blob = self.dataURItoBlob(data); 
							var formData = new FormData();
							formData.append("file", blob); 
							let config = { 
								headers: { "Content-Type": "multipart/form-data" }
							}; 
							// 发送请求; 
							self.$axios.post(request.testUrl+"/project/auth1/image/upload", formData, config).then(res => { 
								if (res.data.code == 0) {
									self.form.info.imagesList=[]
				                	var url={"image":res.data.data}
				                    self.form.info.imagesList.push(url);
				                    self.$message({
				                        type: 'info',
				                        message: "图片上传成功！"
				                    }); 
								} else {
									self.$message({ 
										message: "图片上传失败，请重试", 
										type: "warning"
										});
								}
							});
						};
					};
				}
			},
			// 压缩图片 
			compress(img) { 
				let canvas = document.createElement("canvas"); 
				let ctx = canvas.getContext("2d"); 
				let initSize = img.src.length; 
				let width = img.width; 
				let height = img.height;
				canvas.width = width;
				canvas.height = height; 
				// 铺底色 
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, width, height); 
				//进行最小压缩 
				let ndata = canvas.toDataURL("image/jpeg", 0.3); 
				return ndata;
			},
			// base64转成bolb对象 
			dataURItoBlob(base64Data) { 
				var byteString; 
				if (base64Data.split(",")[0].indexOf("base64") >= 0)
					byteString = atob(base64Data.split(",")[1]); 
				else byteString = unescape(base64Data.split(",")[1]); 
				var mimeString = base64Data
				.split(",")[0]
				.split(":")[1]
				.split(";")[0]; 
				var ia = new Uint8Array(byteString.length); 
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				} 
				return new Blob([ia], { type: mimeString });
			}, 
	        //保存
	        saveInfo(info){
	        	this.$refs.info.validate((valid) => {
					if (valid) {
			        	this.$axios({
				        	method:'post',
				        	url:request.testUrl+"/product/auth1/truckSpaceFloor/insert",
				        	data:{
				        		"code": '',
							    "id": "",
							    // "imagesList": this.form.info.imagesList,
							    "name": this.form.info .name,
							    "openStartTime": this.form.info.timeFollowOpenTime==false?this.form.info.openStartTime:'',
							    "timeFollowOpenTime":this.form.info.timeFollowOpenTime==true?1:0,
							    "projectId": "",
							    "showSelled": this.form.info.showSelled==true?1:0,
							    "showStrategy": this.form.info.showStrategy==true?1:0,
							    "stopSell": this.form.info.stopSell==true?1:0
				        	}
						}).then(res=>{
							if(res.data.code==0){
								this.$router.push({ path: '/楼层管理'})
								this.reload()
							}else{
								this.$message({
									type: 'info',
									message: res.data.msg
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