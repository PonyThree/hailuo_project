<template>
    <div>
        <div class="info">
            <div class="title">
                <span class="f1"></span>
                <div>
                    <span>车位管理</span>
                    <span>首页/ 车位管理 /车位分布图</span>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" @click="addBan">新增</el-button>
                <el-button type="primary" @click="allRelease" style="margin:0 20px;">批量发布</el-button>
                <el-button type="primary" @click="allDelete" style="margin:0 20px;">批量删除</el-button>
               
            </div>
            <div class="searchBtn">
                <div>
                    <span style="font-size:14px;color:#606266;">请选择区层:</span>
                    <el-select v-model="info3.levelId" style="width:120px; margin:10px;" @change="selectChange">
                        <el-option v-for="(item) in level1Info" :key="item.id" :value="item.id" :label="item.name" style="width:150px;"></el-option>
                    </el-select>
                    <el-select v-model="info3.levelThreeId" style="width:120px;" @change="selectChange">
                        <el-option v-for="(item) in level3Info" :key="item.id" :value="item.id" :label="item.name" style="width:150px;"></el-option>
                    </el-select>
                </div>
                <div>
                    <el-button style="float: right;margin-left:20px;" @click="checked(1)" type="primary">查询</el-button>
                    <el-input v-model="info.imageName1" placeholder="请输入分布图名称" style="width:200px;float: right"></el-input>
                </div>
            </div>
            <el-table :data="bannerAcTabe" border :header-cell-style="{background:'#dcd3ef'}"  header-row-class-name="tableHead"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" align="center"></el-table-column>
						<el-table-column prop="num" label="序号" align="center" width="100">
							<template scope="scope">
								<span>{{scope.$index+1}}</span>
							</template>
						</el-table-column>
                        <el-table-column prop="imageName" label="分布图名称" align="center" width="300">
						</el-table-column>
						<el-table-column prop="image" label="图片" align="center" width="300">
							<template slot-scope="scope">
								<img :src="scope.row.image"  style="width: 200px;height: 100px;"/>
							</template>
						</el-table-column>
						<el-table-column prop="id" label="" align="center" v-show:"1==2"></el-table-column>
						<el-table-column prop="relateFloor" label="关联楼层" align="center">
							<!-- <template slot-scope="scope">
								<div>
									<span>{{scope.row.bannerType==1?'項目banner':scope.row.bannerType==2?'中间轮播图':'暂不清楚'}}</span>
								</div>
							</template> -->
						</el-table-column>
                        <el-table-column align="center" label="状态">
                            <template slot-scope="scope">
                                <div>
                                    <span>{{scope.row.releaseStatus==1?'待发布':'已发布'}}</span>
                                </div>
                            </template>
                        </el-table-column>
						<el-table-column prop="updateTime" label="修改时间" align="center">
							<template slot-scope="scope">
								<div>
									<span>{{scope.row.updateTime}}</span>
								</div>
							</template>
						</el-table-column>
                        <!-- <el-table-column label="发布" align="center">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.releaseStatus" active-color="#409EFF" inactive-color="#909399" @change="changeSwitch(scope.row.releaseStatus)"></el-switch>
                            </template>
                        </el-table-column> -->
						<el-table-column prop="caozuo" label="操作" align="center">
							<template slot-scope="scope">
			                    <a style="color: #409EFF;font-size: 14px;" @click="modifyPic(scope.row.id)">编辑</a>
		                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deletePic(scope.row.id)">删除</a>
		                        <!-- <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="release(scope.row.id)">发布</a> -->
			                </template>
						</el-table-column> 
            </el-table>
            <!--分页器-->	
            <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pageSize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
            </el-pagination>
            <!--新增banner弹出框-->
            <el-dialog title="新增分布图" :visible.sync="revise" width="35%">
                <el-form ref="info" :model="info" label-width="110px" :label-position="labelPosition" :rules='rules'>
                    <el-form-item label="分布图名称:" prop='imageName'>
                        <el-input v-model="info.imageName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="关联楼层:" prop='levelId'>
                        <el-select v-model="info.levelId" style="width:120px;">
                            <el-option v-for="(item) in level1Info" :key="item.id" :value="item.id" :label="item.name" style="width:150px;"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop='levelThreeId'>
                        <el-select v-model="info.levelThreeId" style="width:120px;">
                            <el-option v-for="(item) in level3Info" :key="item.id" :value="item.id" :label="item.name" style="width:150px;"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="releaseStatus" label="发布操作:">
                         <!-- <el-checkbox v-model="info.releaseStatus" v-bind="{'checked': info.releaseStatus? true : false}" style="margin: 0 30px 0 0px;">发布</el-checkbox> -->
                         <el-switch v-model="info.releaseStatus" active-color="#409EFF" inactive-color="#909399" @change="changeSwitch(info.releaseStatus)"></el-switch>
                    </el-form-item>
                    <el-form-item label="添加分布图:" prop="imgUrl">
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
                    <el-button type="primary" @click="saveInfo(info)">保存</el-button>
                    <el-button @click="revise=false">取 消</el-button> 
                </span>
            </el-dialog>
            
            <!--修改banner弹出框-->
            <el-dialog title="修改分布图" :visible.sync="editVisible" width="35%">
                <el-form ref="info1" :model="info1" label-width="110px" :label-position="labelPosition" :rules='rules'>
                    <el-form-item label="分布图名称:" prop='imageName'>
                        <el-input v-model="info1.imageName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="关联楼层:" prop='levelId'>
                        <el-select v-model="info1.levelId" style="width:120px;">
                            <el-option v-for="(item) in level1Info" :key="item.id" :value="item.id" :label="item.name" style="width:150px;"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop='levelThreeId'>
                        <el-select v-model="info1.levelThreeId" style="width:120px;">
                            <el-option v-for="(item) in level3Info" :key="item.id" :value="item.id" :label="item.name" style="width:150px;"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item prop="releaseStatus" label="发布操作:">
                         <!-- <el-checkbox v-model="info.releaseStatus" v-bind="{'checked': info.releaseStatus? true : false}" style="margin: 0 30px 0 0px;">发布</el-checkbox> -->
                         <el-switch v-model="info1.releaseStatus" active-color="#409EFF" inactive-color="#909399" @change="changeSwitch1(info1.releaseStatus)"></el-switch>
                    </el-form-item>
                    <!-- <el-form-item prop="releaseStatus">
                         <el-checkbox v-model="info1.releaseStatus" v-bind="{'checked': info1.releaseStatus? true : false}" style="margin: 0 30px 0 0px;">发布</el-checkbox>
                    </el-form-item> -->
                    <el-form-item label="添加分布图:" prop="imgUrl1">
                        <div class="pic-box">
                            <div class="upload_warp" >
                                <div class="upload_warp_left img-upload" @click="homeImg_file">
                                    <img :src="imgUrl1" v-if="imgUrl1" class="avatar mt0">
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
                    <el-button type="primary" @click="saveEdit(info1,info1.id)">保存</el-button>
                    <el-button @click="editVisible=false">取 消</el-button> 
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
var level1Info=[];
var level2Info=[];
var level3Info=[];
export default {
    inject:['reload'],
    name:'picManger',
    data(){
        return {
            labelPosition:'left',
            // 新增
            imgUrl:'',
            // 修改
            imgUrl1:'',
            // 分布图表格
            bannerAcTabe:[],
            // 新增
            info:{
            },
            // 修改
            info1:{},
            // 查询
            info3:{},
            revise:false,
            editVisible:false,
            // 修改
            info1:{},
            currentPage:1,
            pageSize:10,
            total:0,
            // 存放多选项
            multipleSelection:[],
            level1Info:[],
            level2Info:[],
            level3Info:[],
            // relateInfo:[],
            levelId:'',
            levelThreeId:'',
            rules:{
                // description:[
						// 	{ required: true, message: '请输入图片描述', trigger: 'blur' },
						// 	{ min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
						// ]
                imageName:[
                    { required: true, message: '请输入分布图名称', trigger: 'blur' },
                    { min: 1, max:6, message: '长度在 1 到 6个字符', trigger: 'blur' }
                ],
                levelId:[
                    { required: true, message: '请选择区', trigger: 'blur' },
                ],
                levelThreeId:[
                    { required: true, message: '请选择层', trigger: 'blur' },
                ],
                // releaseStatus:[
                //     { required: true, message: '请选择发布状态', trigger: 'blur' },
                // ]
                // imgUrl:[
                //     { required: true, message: '请上传图片', trigger: 'blur' },
                // ]

            }
        }
    },
    created(){
        //渲染区域列表 区
        this.getLevel1Info();
        //    栋
        this.getLevel2Info();
        // 层
        this.getLevel3Info();
        // 处理数据
        // level1Info=JSON.parse(localStorage.getItem('level1Info'))
        // level2Info=JSON.parse(localStorage.getItem('level2Info'))
        // level3Info=JSON.parse(localStorage.getItem('level3Info'))
        // console.log(level1Info,level2Info,level3Info)
        // level1Info.forEach(item=>{
        //     item.level2Id=level2Info[0].id
        //     item.level3Id=level3Info
        // })
        // console.log(level1Info)
        // this.relateInfo=level1Info.length>0?level1Info:[];
        // console.log(this.relateInfo)
        this.checked(1)
    },
    methods:{
        // 区
        getLevel1Info(){
             this.$axios.get(request.testUrl+"/product/auth1/truckSpaceArea/selectAllList")
                .then(res=>{
                    if(res.data.code==0){
                        this.level1Info=res.data.data
                        
                        // console.log(this.level1Info)
                        // this.level1Info.forEach(item=>{
                        //     // item.level1Id=item.id
                        //     // delete item.id
                        //     delete item.code
                        //     // console.log(item)
                        // })
                        // this.relateInfo=level1Info
                        //  console.log(level1Info)
                        // localStorage.setItem('level1Info',JSON.stringify(level1Info))
                    }
                }) 
        },
        // 栋
        getLevel2Info(){
            //渲染楼栋二级列表 栋
            this.$axios.get(request.testUrl+"/product/auth1/TruckSpaceLevelTwo/doSelectAllList")
                .then(res=>{
                    if(res.data.code==0){
                        this.level2Info=res.data.data
                        // level2Info.forEach(item=>{
                        //     delete item.code
                        //     // console.log(item)
                        // })
                        // //  console.log(level2Info)
                        // localStorage.setItem('level2Info',JSON.stringify(level2Info))
                    }
                })
        },
        // 渲染楼栋三级列表
         getLevel3Info(){
             //层
            this.$axios.get(request.testUrl+"/product/auth1/TruckSpaceLevelThree/doSelectAllList")
                .then(res=>{
                    if(res.data.code==0){
                        this.level3Info=res.data.data
                        // level3Info.forEach(item=>{
                        //     delete item.code
                        //     // console.log(item)
                        // })
                        // //  console.log(level1Info)
                        // localStorage.setItem('level3Info',JSON.stringify(level3Info))
                    }
                })
         },
        checked(currentPage){
            var that=this;
            let reqDto ={};
            if(currentPage==undefined){
                reqDto.current=this.currentPage
            }else{
                reqDto.current=currentPage
            }
            if(this.info.imageName1!=undefined){
                reqDto.imageName=this.info.imageName1
            }
            reqDto.pageSize=this.pageSize
            if(this.info3.levelId!=undefined){
                reqDto.levelId=this.info3.levelId
            }
            if(this.info3.levelThreeId!=undefined){
                reqDto.levelThreeId=this.info3.levelThreeId
            }
            that.$axios({
                method:'post',
                url:request.testUrl+"/product/auth1/truckSpaceLayoutImage/pageList",
                data:JSON.stringify(reqDto)
                }).then(res=>{
                    if(res.data.code==0){
                        that.$message({
                            type:'success',
                            message:'查询成功'
                        })
                        res.data.data.records.forEach(item=>{
                            item.relateFloor=item.levelName+item.levelThreeName;
                            console.log(item.modifyTime)
                            if(item.modifyTime!=null){
                                item.updateTime=handleTime.getTime1(item.modifyTime)
                            }
                        })
                        that.bannerAcTabe=res.data.data.records;
                        that.total=res.data.data.total;
                    }else{
                        that.$message({
                            type:'error',
                            message:res.data.msg
                        })
                    }
            })

        },
        // 下拉筛选
        selectChange(){
            console.log(this.info3.levelId,this.info3.levelThreeId)
            this.checked(1)
        },
        handleSelectionChange(val){
            this.multipleSelection=val;
        },
        //新增按钮
        addBan(){
            this.revise=true;
        },
        // 新增切换
        changeSwitch(releaseStatus){
            console.log(releaseStatus)
            this.info.releaseStatus=releaseStatus
        },
        //新增保存按钮
        saveInfo(info){
            var that=this;
            let truckSpaceLayoutImage ={};
            console.log(that.info.releaseStatus)
            that.$refs.info.validate((valid)=>{
                if(valid){
                    if(!that.imgUrl){
                        that.$message({
                            type:'warning',
                            message:'请先上传图片'
                        })
                        return ;
                    }
                    truckSpaceLayoutImage.image=that.imgUrl;
                    truckSpaceLayoutImage.imageName=that.info.imageName;
                    truckSpaceLayoutImage.levelId=that.info.levelId;
                    truckSpaceLayoutImage.levelThreeId=that.info.levelThreeId;
                    // 已发布2 未发布1
                    if(that.info.releaseStatus==true){
                        truckSpaceLayoutImage.releaseStatus=2;
                    }else{
                        truckSpaceLayoutImage.releaseStatus=1;
                    }
                    that.$axios({
                        method:'post',
                        url:request.testUrl+"/product/auth1/truckSpaceLayoutImage/add",
                        data:JSON.stringify(truckSpaceLayoutImage)
                        }).then(res=>{
                            if(res.data.code==0){
                                that.$message({
                                    type:'success',
                                    message:'新增成功'
                                })
                                that.revise=false;
                                that.checked(1)
                                this.reload()
                            }else{
                                that.$message({
                                    type:'error',
                                    message:res.data.msg
                                })
                            }
                    })
                }
            })
        },
        // 批量删除
        allDelete(){
            let that=this;
            if(that.multipleSelection.length>0){
                var ids=[];
                that.multipleSelection.forEach(item=>{
                    ids.push(item.id)
                })
                // console.log(ids)
                that.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
                }).then(()=>{
                    that.$axios({
                        method:'post',
                        url:request.testUrl+"/product/auth1/truckSpaceLayoutImage/batchDelete",
                        data:ids
                    }).then(res=>{
                        if(res.data.code==0){
                            that.$message({
                                type:'success',
                                message:'删除成功'
                            })
                            that.checked(1)
                        }else{
                            that.$message({
                                type:'error',
                                message:res.data.msg
                            })
                        }
                    })
                }).catch(()=>{
                    that.$message({
						type: 'info',
						message: '已取消删除'
					});
                })
            }else{
                that.$message({
                    type:'warning',
                    message:'请先选择一个要删除的数据'
                })
            }
        },
        // 修改图片
        modifyPic(id){
            this.editVisible=true;
            // 加载单个数据
            this.$axios.get(request.testUrl+"/product/auth1/truckSpaceLayoutImage/"+id).then(res=>{
                if(res.data.code==0){
                    this.imgUrl1=res.data.data.image
                    this.info1=res.data.data
                    this.levelId=res.data.data.levelId
                    this.levelThreeId=res.data.data.levelThreeId
                    this.info1.releaseStatus=res.data.data.releaseStatus==2?true:false
                }
            })

        },
        // 修改切换
        changeSwitch1(releaseStatus){
            console.log(releaseStatus)
            this.info1.releaseStatus=releaseStatus
        },
        // 修改保存
        saveEdit(info1,id){
            // /product/auth1/truckSpaceLayoutImage/update
            let that=this;
            var obj={};
            that.$refs.info1.validate((valid)=>{
                if(!that.imgUrl1){
                    that.$message({
                        type:'warning',
                        message:'请先上传图片'
                    })
                    return ;
                }
                if(that.info1.levelId==that.levelId&&that.info1.levelThreeId==that.levelThreeId){
                    obj.isUpdateArea=0;
                }else{
                    obj.isUpdateArea=1;
                }
                obj.image=that.imgUrl1;
                obj.levelId=that.info1.levelId
                obj.imageName=that.info1.imageName
                obj.levelThreeId=that.info1.levelThreeId
                if(that.info1.releaseStatus==true){
                    obj.releaseStatus=2
                }else{
                    obj.releaseStatus=1
                }
                obj.id=id
                that.$axios({
                    method:'post',
                    url:request.testUrl+"/product/auth1/truckSpaceLayoutImage/update",
                    data:JSON.stringify(obj)
                }).then(res=>{
                    if(res.data.code==0){
                        that.$message({
                            type:'success',
                            message:'修改成功'
                        })
                        that.editVisible=false;
                        that.checked(1);
                    }else{
                        that.$message({
                            type:'error',
                            message:res.data.msg
                        })
                    }
                })
        })

            
            
           
        },
        // 单个删除图片
        deletePic(id){
            let that=this;
            let ids=[];
            ids.push(id)
            that.$confirm('此操作将会删除该文件,是否继续?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                that.$axios({
                    method:'post',
                    url:request.testUrl+"/product/auth1/truckSpaceLayoutImage/batchDelete",
                    data:ids
                    }).then(res=>{
                        if(res.data.code==0){
                            that.$message({
                                type:'success',
                                message:'删除成功'
                            })
                            that.checked(1);
                        }else{
                            that.$message({
                                type:'error',
                                message:res.data.msg
                            })
                        }
                })
            }).catch(()=>{
                that.$message({
						type: 'info',
						message: '已取消删除'
                });
            })
            
        },
        homeImg_file() {
            document.getElementById('homeImg_upload_file').click()
        },
        homeImg_fileChange(el) {
            // console.log(el)
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
							// console.log(result);
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
                let that=this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params=new URLSearchParams();
					params.append('id',id);
					that.$axios.post(request.testUrl+'/project/auth1/banner/delete',params)
					.then(res=>{
						console.log(res.data);
						if(res.data.code==0){
							that.$message({
								type:'success',
								message:'删除成功'
							});
							that.checked(1);
						}
					})
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
            },
        // 批量发布
        allRelease(){
            // console.log(this.multipleSelection)
            let ids=[];
            this.multipleSelection.forEach(item=>{
                ids.push(item.id)
            })
            console.log(ids)
            // /product/auth1/truckSpaceLayoutImage/batchRelease
            this.$axios({
                method:'post',
                url:request.testUrl+"/product/auth1/truckSpaceLayoutImage/batchRelease",
                data:ids
            }).then(res=>{
                if(res.data.code==0){
                    this.$message({
                        type:'success',
                        message:'发布成功'
                    })
                    this.reload()
                }else{
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })
                }
            })
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleCurrentChange(currentPage) {
            //点击第几页
            this.checked(currentPage)
        },
        handleSizeChange(size){
            this.pageSize = size; //每页下拉显示数据
            this.checked(this.currentPage)
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
.searchBtn{
    display: flex;
    justify-content: space-between;
    width:100%;
    height: 50px;
    margin: 20px 0;
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