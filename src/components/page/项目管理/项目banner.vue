<template>
	<div>
		<div class="info">
			<div class="title">
				<span class="f1"></span>项目banner
				<el-button style="float: right;" @click="addBanner" class="button">新增</el-button>
			</div>
			<!--表格列表-->
			<div class="ff1">
				
				<div style="width: 85%;margin: 70px auto 80px;">
					<el-table :data="bannerTabe" border :header-cell-style="{background:'#dcd3ef'}"  header-row-class-name="tableHead">
						<el-table-column prop="num" label="序号" align="center" width="100">
							<template scope="scope">
								<span>{{scope.$index+1}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="img_url" label="图片" align="center" width="300">
							<template slot-scope="scope">
								<img :src="scope.row.img_url"  style="width: 200px;height: 100px;"/>
							</template>
						</el-table-column>
						<el-table-column prop="id" label="" align="center" v-show:"1==2"></el-table-column>
						<el-table-column prop="href" label="跳转链接设置" align="center"></el-table-column>
						<el-table-column prop="description" label="图片描述" align="center"></el-table-column>
						<el-table-column prop="sort" label="排序值" align="center"></el-table-column>
						<el-table-column prop="caozuo" label="操作" align="center">
							<template slot-scope="scope">
			                    <a style="color: #409EFF;font-size: 14px;" @click="modifyBanner(scope.$index,bannerTabe[scope.$index].id)">修改</a>
		                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteBanner(scope.$index,bannerTabe[scope.$index].id)">删除</a>
			                </template>
						</el-table-column> 
					</el-table>
					<!--分页器-->	
					<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
					</el-pagination>
					
					<!--新增banner弹出框-->
					<el-dialog title="新增banner" :visible.sync="revise" width="25%">
			            <el-form ref="info" :model="info" label-width="110px" :label-position="labelPosition" :rules='rules'>
			                <el-form-item label="跳转链接地址:">
			                    <el-input v-model="info.href" placeholder="请输入跳转链接地址"></el-input>
			                </el-form-item>
			                <el-form-item label="图片描述:" prop='description'>
			                    <el-input v-model="info.description" placeholder="请输入图片描述"></el-input>
			                </el-form-item>
			                <el-form-item label="活动类型" prop="type">
					          <el-select v-model="info.type">
					            <el-option v-for="(item) in types" :key="item.id" :value="item.value" :label="item.value"></el-option>
					          </el-select>
					        </el-form-item>
			                <el-form-item label="排序值:" prop='sort'>
			                    <el-input v-model="info.sort" placeholder="请输入排序值"></el-input>
			                </el-form-item>
			                <el-form-item label="banner图片:">
			                    <div class="pic-box">
			                        <div class="upload_warp" >
			                            <div class="upload_warp_left img-upload" @click="homeImg_file">
			                                <img :src="imgUrl" v-if="imgUrl" class="avatar mt0">
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
			            	<el-button type="primary" @click="saveInfo">保存</el-button>
			                <el-button @click="revise=false">取 消</el-button> 
			            </span>
			        </el-dialog>
			        
			        <!--修改banner弹出框-->
					<el-dialog title="修改banner" :visible.sync="editVisible" width="25%" :rules='rules'>
			            <el-form ref="info1" :model="info1" label-width="110px" :label-position="labelPosition">
			                <el-form-item label="跳转链接地址:" prop='href'>
			                    <el-input v-model="info1.href" placeholder="请输入跳转链接地址"></el-input>
			                </el-form-item>
			                <el-form-item label="图片描述:" prop='description'>
			                    <el-input v-model="info1.description" placeholder="请输入图片描述"></el-input>
			                </el-form-item>
			                <el-form-item label="活动类型" prop="type">
					          <el-select v-model="info1.type">
					            <el-option v-for="(item) in types" :key="item.id" :value="item.value" :label="item.value"></el-option>
					          </el-select>
					        </el-form-item>
			                <el-form-item label="排序值:" prop='sort'>
			                    <el-input v-model="info1.sort" placeholder="请输入排序值"></el-input>
			                </el-form-item>
			                <el-form-item label="banner图片:">
			                    <div class="pic-box">
			                        <div class="upload_warp" >
			                            <div class="upload_warp_left img-upload" @click="homeImg_file">
			                                <img :src="imgUrl" v-if="imgUrl" class="avatar mt0">
			                            </div>
			                        </div>
			                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
			                    </div>
			                </el-form-item>
			                <el-form-item v-show="false">
			                    <el-input v-model="info1.id" ></el-input>
			                </el-form-item>
			            </el-form>
			            <span slot="footer" class="dialog-footer">
			            	<el-button type="primary" @click="saveEdit(info1.id)">保存</el-button>
			                <el-button @click="editVisible=false">取 消</el-button> 
			            </span>
			        </el-dialog>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'banner',
		data(){
	        return {
	        	labelPosition:'left',
	        	bannerTabe:[],
				info:{
					
				},
				types:[
				  {id:0,value:0},
		          {id:1,value:1},
		          {id:2,value:2},
		          {id:3,value:3}
		        ],
				info1:{},
				imgUrl:"",
	        	revise:false,
	        	editVisible:false,
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:5,//每页的数据
				total:100,
				rules:{
//						href:{ required: true, message: '请输入跳转链接', trigger: 'blur' },
						description:[
							{ required: true, message: '请输入图片描述', trigger: 'blur' },
							{ min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
						],
						sort:[{required:true,message:'请输入排序数字',trigger:'blur'},],
						type:[{required:true,message:'请选择活动类型',trigger:'blur'},]
					}
	        }
		   },
		created(){
			this.randerBannerList();
		},
	   	methods:{
			// 列表渲染
			randerBannerList(){
				this.$axios.get(request.testUrl+'/project/auth1/banner/pageSelect',{
				params:{
					page:this.currentPage,
					pageSize:this.pagesize
				}
				})
				.then(res=>{
					this.total=res.data.data.total;
					this.bannerTabe=res.data.data.records;
				})
			},
	   		//新增banner
	   		addBanner(){
				   this.revise=true;
	   		},
	   		//保存新增banner
	   		saveInfo(){
	   			this.$refs.info.validate((valid) => {
					if (valid) {
						this.revise=false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
                var params = new URLSearchParams();	
				params.append('imgUrl', this.imgUrl);
                params.append('href', this.info.href);
                params.append('type', this.info.type);
                params.append('description', this.info.description);
                params.append('sort', this.info.sort);				
                this.$axios.post(request.testUrl+"/project/auth1/banner/insert",params)
					.then(res=>{
						// console.log(res.data);
		    			if(res.data.code==0){
							this.revise=false;
							this.$message({
								type:'success',
								message:'添加成功'
							})
							this.info={};
							this.imgUrl='';
							this.randerBannerList();
		    			}else{
		    				this.$message({
				                type: 'info',
				                message: '添加失败',
			            	});
		    			}
					})
	   		},
	   		//修改banner
	   		modifyBanner(i,id){
				this.editVisible=true;
				//    获取单条数据
				this.$axios.get(request.testUrl+"/project/auth1/banner/getOne",{
					params:{
						id:id
					}
					})
					.then(res=>{
						if(res.data.code==0){
							this.editVisible=true;
							var obj={};
							obj.href=res.data.data.href;
							obj.description=res.data.data.description;
							obj.sort=res.data.data.sort;
							obj.id=res.data.data.id;
							obj.type=res.data.data.type;
							this.info1=obj;
							this.imgUrl=res.data.data.imgUrl;
						}
				})
			},
	   		//保存修改banner
	   		saveEdit(id){
				//    alert(id);
				   this.$refs.info1.validate((valid) => {
					if (valid) {
							this.editVisible=true;
						this.revise=false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
                var params = new URLSearchParams();	
				params.append('imgUrl', this.imgUrl);
                params.append('href', this.info1.href);
                params.append('type', this.info1.type);
                params.append('description', this.info1.description);
                params.append('sort', this.info1.sort);				
                params.append('id', this.info1.id);				
                this.$axios.post(request.testUrl+"/project/auth1/banner/insert",params)
					.then(res=>{
						console.log(res.data);
		    			if(res.data.code==0){
						this.editVisible=false;
							this.$message({
								type:'success',
								message:'添加成功'
							})
							this.info={};
							this.randerBannerList();
		    			}else{
		    				this.$message({
				                type: 'info',
				                message: '添加失败',
			            	});
		    			}
					})
	   		},
	   		//删除banner
	   		deleteBanner(i,id){
				// alert(id);
	   			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params=new URLSearchParams();
					params.append('id',id);
					this.$axios.post(request.testUrl+'/project/auth1/banner/delete',params)
					.then(res=>{
						console.log(res.data);
						if(res.data.code==0){
							this.$message({
								type:'success',
								message:'删除成功'
							});
							this.randerBannerList();
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
//	        homeImg_uploadImage(filesrc){
//	            var param = new FormData(); // FormData 对象
//				param.append("file", filesrc); // 文件对象
//	            param.append('type', 4);
//	            this.$axios({
//	                method: "post",
//	                url: request.testUrl+"/project/auth1/image/upload",
//	                data: param
//	            })
//	            .then(res => {
//	                if(res.data.code==0){
//						console.log(res.data.data);
//						this.imgUrl=res.data.data;
//	                    this.$message({
//	                        type: 'info',
//	                        message: "图片上传成功！"
//	                    }); 
//	                }  
//	            })
//	            .catch(error => {
//	              //console.log(error)
//	            });
//	        },
			//获取图片 
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
									self.imgUrl=res.data.data;
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
	   		
	   		//分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
				this.currentPage = currentPage; //点击第几页
				this.randerBannerList();
		    },
            handleSizeChange(size){
				this.pagesize = size; //每页下拉显示数据
				this.randerBannerList();
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
	.avatar{
		width:200px;
		height:100px;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>