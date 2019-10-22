<template>
	<div>
		<div class="info">
			<div class="title">
				<span class="f1"></span>活动详情图
				<!-- <el-button style="float: right;" @click="addBanner" class="button">新增</el-button> -->
			</div>
			<!--表格列表-->
			<div class="ff1">
				<div style="width: 85%;margin: 70px auto 80px;">	
					<div class="pic-box">
						<div class="upload_warp" >
							<div class="upload_warp_left img-upload" @click="homeImg_file">
								<img :src="imgUrl" v-if="imgUrl" class="avatar mt0">
							</div>
						</div>
						<input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],
		name:'banner',
		data(){
	        return {
				imgUrl:'https://china185.com/file/image/20191021/b24cb460088945ec8c3621fbab600d02.blob',
				id:'',
	        }
		   },
		created(){
			this.renderData();
		},
	   	methods:{
			renderData(){
				this.$axios.post(request.testUrl+"/activity/auth1/activityImage/getActImg").then(res=>{
					console.log(res.data.data)
					this.imgUrl=res.data.data.imagePath||'';
					this.id=res.data.data.id||'';
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
				console.log(files)
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
			//获取图片 
			imgPreview(file, callback) { 
				console.log(file)
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
						let img = new Image();
						img.src = result; 
						img.onload = function() {
							let data = self.$handlePic.compress(img);
							// self.imgUrl = result; 
							let blob = self.$handlePic.dataURItoBlob(data); 
							var formData = new FormData();
							formData.append("file", blob); 
							let config = { 
								headers: { "Content-Type": "multipart/form-data" }
							}; 
							// 发送请求; 
							self.$axios.post(request.testUrl+"/project/auth1/image/upload", formData, config).then(res => { 
								if (res.data.code == 0) {
									var params=new URLSearchParams()
									params.append("imgPath",res.data.data);
									console.log(self.id)
									if(self.id){
										params.append("id",self.id);
									}
									var imgPath=res.data.data;
									self.$axios.post(request.testUrl+"/activity/auth1/activityImage/addData",params).then(res=>{
										if(res.data.code==0){
											self.imgUrl=imgPath;
											self.$message({
												type: 'success',
												message: "图片上传成功！"
											});
											self.reload();
											
										}else{
											self.$message({ 
												message: res.data.msg, 
												type: "error"
											});
										}
									}) 
								} else {
									self.$message({ 
										message: res.data.msg, 
										type: "error"
									});
								}
							});
						};
					};
				}
			}
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
		height: 400px;
		padding: 10px 0 10px 0;
	}
	.info .title .f1{
		display: inline-block;
		width: 20px;
		height: 100%;
		background:#9768e5 ;
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
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
  .img-upload img{
		width:300px;
		height: 200px;
	}
</style>