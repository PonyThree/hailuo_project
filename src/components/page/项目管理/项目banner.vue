<template>
    <div>
        <div class="info">
            <div class="title">
                <span class="f1"></span>
                <div>
                    <span>活动管理</span>
                    <span>首页/ 活动管理 /项目图片</span>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" @click="addBan">新增</el-button>
            </div>
            <el-table :data="bannerAcTabe" border :header-cell-style="{background:'#dcd3ef'}"  header-row-class-name="tableHead">
						<el-table-column prop="num" label="序号" align="center" width="100">
							<template scope="scope">
								<span>{{scope.$index+1}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="imgUrl" label="图片" align="center" width="300">
							<template slot-scope="scope">
								<img :src="scope.row.imgUrl"  style="width: 200px;height: 100px;"/>
							</template>
						</el-table-column>
						<el-table-column prop="id" label="" align="center" v-show:"1==2"></el-table-column>
						<el-table-column prop="bannerType" label="位置" align="center">
							<template slot-scope="scope">
								<div>
									<span>{{scope.row.bannerType==1?'項目banner':scope.row.bannerType==2?'中间轮播图':'暂不清楚'}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="typeName" label="跳转" align="center">
							<template slot-scope="scope">
								<div>
									<span>{{scope.row.typeName}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="description" label="图片描述" align="center"></el-table-column>
						<el-table-column prop="sort" label="排序值" align="center"></el-table-column>
						<el-table-column prop="caozuo" label="操作" align="center">
							<template slot-scope="scope">
			                    <a style="color: #409EFF;font-size: 14px;" @click="modifyAcBanner(bannerAcTabe[scope.$index].id)">修改</a>
		                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteAcBanner(bannerAcTabe[scope.$index].id)">删除</a>
			                </template>
						</el-table-column> 
            </el-table>
            <!--分页器-->	
            <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pageSize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
            </el-pagination>
            <!--新增banner弹出框-->
            <el-dialog title="新增banner" :visible.sync="revise" width="35%">
                <el-form ref="info" :model="info" label-width="110px" :label-position="labelPosition" :rules='rules'>
                    <el-form-item label="图片描述:" prop='description'>
                        <el-input v-model="info.description" placeholder="请输入图片描述"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="位置:" prop='bannerType'>
                        <el-select v-model="info.bannerType" style="width:120px;">
                            <el-option v-for="(item) in bannerType" :key="item.id" :value="item.id" :label="item.value" style="width:150px;"></el-option>
                        </el-select>
                    </el-form-item> -->
					<el-form-item label="位置:">
						<span>中间轮播图</span>
					</el-form-item>
                    <el-form-item label="操作" prop="type">
                        <el-select v-model="info.type" style="width:150px;">
                            <el-option v-for="(item) in types" :key="item.id" :value="item.id" :label="item.value" style="width:150px;"></el-option>
                        </el-select>
                        <el-input v-model="info.href" placeholder="请输入跳转链接地址" v-if="info.type==3" style="width:240px;margin-left:30px;"></el-input>
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
            <el-dialog title="修改banner" :visible.sync="editVisible" width="35%" :rules='rules'>
                <el-form ref="info1" :model="info1" label-width="110px" :label-position="labelPosition">
                    <el-form-item label="图片描述:" prop='description'>
                        <el-input v-model="info1.description" placeholder="请输入图片描述"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="位置:" prop='bannerType'>
                        <el-select v-model="info1.bannerType" style="width:120px;">
                            <el-option v-for="(item) in bannerType" :key="item.id" :value="item.id" :label="item.value" style="width:150px;"></el-option>
                        </el-select>
                    </el-form-item> -->
					<el-form-item label="位置:">
						<span>中间轮播图</span>
					</el-form-item>
                    <el-form-item label="操作" prop="type">
                        <el-select v-model="info1.type" style="width:150px;">
                            <el-option v-for="(item) in types" :key="item.id" :value="item.id" :label="item.value" style="width:150px;"></el-option>
                        </el-select>
                        <el-input v-model="info1.href" placeholder="请输入跳转链接地址" v-if="info1.type==3" style="width:240px;margin-left:30px;"></el-input>
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
</template>
<script>

export default {
	inject:['reload'],
    data(){
        return {
            imgUrl:'',
            currentPage:1,
            pageSize:10,
            labelPosition:'left',
            revise:false,
            total:0,
            editVisible:false,
            info:{},
            types:[
				  {id:0,value:'不跳转'},
		          {id:1,value:'秒杀活动'},
		          {id:2,value:'项目首页'},
		          {id:3,value:'外部跳转'},
                ],
                bannerType:[
                    {id:1,value:'项目banner'},
                    {id:2,value:'中间轮播图'}, 
                ],
            info1:{},
            bannerAcTabe:[],
            rules:{
						bannerType:{ required: true, message: '请选择位置', trigger: 'blur' },
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
		this.randerBannerList(1)
		// console.log(self.$handlePic())
	},
    methods:{
		// 加載數據
		randerBannerList(currentPage){
			let obj={};
			if(currentPage==undefined){
				obj.page=this.currentPage
			}else{
				obj.page=currentPage
			}
			obj.pageSize=this.pageSize
			this.$axios.get(request.testUrl+'/project/auth1/banner/pageSelect',{
				params:obj
				})
				.then(res=>{
					this.bannerAcTabe=res.data.data.records;
					this.total=res.data.data.total;
			})
		},
        //新增按钮
        addBan(){
            this.revise=true;
		},
		//新增保存banner按钮
        saveInfo(){
			this.$refs.info.validate(valid=>{
				console.log(valid)
				if(valid){
					var params=new URLSearchParams()
					if(this.info.type==3){
						if(this.info.href==undefined){
								this.$message({
								type:'warning',
								message:'请先填入跳转地址'
							})
							return ;
						}
						params.append("href",this.info.href)

					}
					if(this.imgUrl){
						params.append("imgUrl",this.imgUrl)
					}else{
						this.$message({
							type:'warning',
							message:'请先上传图片'
						})
						return ;
					}
					
					params.append("bannerType",2)
					// params.append("bannerType",this.info.bannerType)
					params.append("description",this.info.description)
					params.append("type",this.info.type)
					params.append("sort",this.info.sort)
					this.$axios.post(request.testUrl+"/project/auth1/banner/insert",params).then(res=>{
						if(res.data.code==0){
							this.$message({
								type:'success',
								message:'保存成功'
							})
							this.revise=false;
							this.randerBannerList(1)
							this.reload();
						}else{
							this.$message({
								type:'error',
								message:res.data.msg
							})
						}
					})
				}
			})	
        },
        //修改bannner
        modifyAcBanner(id){
			this.editVisible=true;
			// 渲染单条数据
			// /project/auth1/banner/getOne
			this.$axios.get(request.testUrl+"/project/auth1/banner/getOne?id="+id).then(res=>{
				if(res.data.code==0){
					// console.log(res.data.data)
					this.info1=res.data.data
					this.imgUrl=res.data.data.imgUrl
				}
			})
		},
		//保存编辑banner
        saveEdit(id){
			var params=new URLSearchParams()
			if(this.info1.type==3){
				// console.log(this.info1.href)
				if(!this.info1.href){
						this.$message({
						type:'warning',
						message:'请先填入跳转地址'
					})
					return ;
				}
				params.append("href",this.info1.href)
			}
			params.append("bannerType",2)
			// params.append("bannerType",this.info1.bannerType)
			params.append("description",this.info1.description)
			params.append("type",this.info1.type)
			params.append("sort",this.info1.sort)
			params.append("id",this.info1.id)
			if(this.imgUrl){
				params.append("imgUrl",this.imgUrl)
			}else{
				this.$message({
					type:'warning',
					message:'请先上传一张图片'
				})
				return ;
			}
			// if(this.info1.bannerType==undefined){
			// 	this.$message({
			// 		type:'warning',
			// 		message:'请选择位置'
			// 	})
			// 	return ;
			// }
			if(this.info1.type==undefined){
				this.$message({
					type:'warning',
					message:'请选择操作'
				})
				return ;
			}
			this.$axios.post(request.testUrl+"/project/auth1/banner/insert",params).then(res=>{
				if(res.data.code==0){
					this.$message({
						type:'success',
						message:'修改'
					})
					this.revise=false;
					this.randerBannerList(1)
					this.reload();
				}else{
					this.$message({
						type:'error',
						message:res.data.msg
					})
				}
			})
        },
        //删除banner
        deleteAcBanner(id){

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
            //获取图片 
			imgPreview(file, callback) { 
				let self = this;
				var type=file.type.substring(file.type.lastIndexOf('/')+1).toLowerCase();
				var config = { 
								headers: { "Content-Type": "multipart/form-data" }
							};
				var formData = new FormData();
				console.log(file)
				// gif格式不不进行压缩
				if(type=='gif'){
					formData.append("file", file);
					// 发送请求; 
					self.$axios.post(request.testUrl+"/project/auth1/image/upload",formData , config).then(res => { 
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
				}else{
					//进行图片压缩
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
							console.log(result);
							img.src = result; 
							img.onload = function() {
								let data = self.$handlePic.compress(img);
								self.imgUrl = result; 
								let blob = self.$handlePic.dataURItoBlob(data); 
								var formData = new FormData();
								formData.append("file", blob); 
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
				}
			},
	   		//删除banner
	   		deleteAcBanner(id){
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
							this.randerBannerList(1);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			   //分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
				//点击第几页
				this.randerBannerList(currentPage)
		    },
            handleSizeChange(size){
				this.pageSize = size; //每页下拉显示数据
				this.randerBannerList(this.currentPage)
            },
    }
}
</script>
<style>
.el-button--primary {
  color: white;
  background-color: #9768e5 !important;
  border-color: #9768e5;
}
.info {
  width: 98%;
  margin: 40px auto;
}
/* 头部标题 */
.info .title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #000000;
  font-size: 20px;
  text-indent: 10px;
  margin-bottom: 20px;
}
.info .title::after {
  display: block;
  content: "";
  clear: both;
}
.info .title .f1 {
  float: left;
  display: inline-block;
  width: 20px;
  height: 100%;
  background: #9768e5;
}
.info .title > div {
  height: 40px;
  display: flex;
  align-items: center;
}
.info .title > div span:nth-child(1) {
  font-size: 24px;
  color: #000000;
  font-weight: 500;
  margin-right: 10px;
}
.info .title > div span:nth-child(2) {
  font-size: 12px;
  color: #aaaaaa;
}
.btn button{
    float: right;
    margin-bottom: 30px;
}
.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
}
.img-upload img{
    width: 200px;
    height: 100px;
}
</style>