<template>
    <div>
        <div class="info">
            <div class="title">
                <span class="f1"></span>
                <div>
                <span>项目管理</span>
                <span>首页/ 项目管理 /项目证书</span>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" @click="addCertificate">新增</el-button>
                <el-button type="primary" @click="allDel" style="margin-right:20px;">批量删除</el-button>
            </div>
               <el-table :data="tableData" border :header-cell-style="{background:'#dcd3ef'}"  header-row-class-name="tableHead" @selection-change="selectChange">
                        <el-table-column type="selection"></el-table-column>
						<el-table-column prop="num" label="序号" align="center" width="100">
							<template scope="scope">
								<span>{{scope.$index+1}}</span>
							</template>
						</el-table-column>
                        <el-table-column prop="certImage"  label="图片" align="center">
                            <template slot-scope="scope">
                                <div>
                                    <img :src="scope.row.certImage" alt="证书图片" style="width:200px;height:100px;">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sort" label="排序值" align="center"></el-table-column>
                        <el-table-column prop="certName" label="证书描述" align="center"></el-table-column>
						<el-table-column prop="caozuo" label="操作" align="center">
							<template slot-scope="scope">
			                    <a style="color: #409EFF;font-size: 14px;" @click="handleUpdate(scope.row.id)">修改</a>
		                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="handleDel(scope.row.id)">删除</a>
			                </template>
						</el-table-column> 
            </el-table>
            <!--分页器-->	
            <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pageSize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
            </el-pagination>
            <!-- 新增弹窗 -->
            <el-dialog :visible.sync="revise" title="新增项目证书" width="30%" :close-on-click-modal="false">
                <el-form ref="form" :model="form" label-position="left" :rules='rules'>
                    <el-form-item label="证书描述" prop="certName">
                        <el-input v-model="form.certName" style="width:360px;"></el-input>
                    </el-form-item>
                    <el-form-item label="排序值" prop="sort">
                         <el-input v-model="form.sort" style="width:100px;"></el-input>
                    </el-form-item>
                    <el-form-item prop="imgUrl">
                        <!-- <div class="pic-box"> -->
                            <span style="font-size:14px;color:#606266;font-family: '\5FAE\8F6F\96C5\9ED1';margin-left:10px;">证书图片:</span>
                            <div class="upload_warp" >
                                <div class="upload_warp_left img-upload" @click="homeImg_file">
                                    <img :src="form.imgUrl" v-if="form.imgUrl" class="avatar mt0">
                                </div>
                            </div>
                            <input @change="homeImg_fileChange($event,1)" type="file" id="homeImg_upload_file" multiple style="display:none;" value="1"/>
                        <!-- </div> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="revise=false" style="float:right;margin-left:20px;">取消</el-button>
                        <el-button type="primary" @click="saveInfo(form)" style="float:right;">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 修改 -->
            <el-dialog :visible.sync="revise1" title="修改项目证书" width="30%" :close-on-click-modal="false">
                <el-form ref="form1" :model="form1" label-position="left" :rules='rules'>
                    <el-form-item label="证书描述" prop="certName">
                        <el-input v-model="form1.certName" style="width:360px;"></el-input>
                    </el-form-item>
                    <el-form-item label="排序值" prop="sort">
                         <el-input v-model="form1.sort" style="width:100px;"></el-input>
                    </el-form-item>
                    <el-form-item prop="imgUrl">
                        <!-- <div class="pic-box"> -->
                            <span style="font-size:14px;color:#606266;font-family: '\5FAE\8F6F\96C5\9ED1';margin-left:10px;">证书图片:</span>
                            <div class="upload_warp" >
                                <div class="upload_warp_left img-upload" @click="homeImg_file">
                                    <img :src="form1.imgUrl" v-if="form1.imgUrl" class="avatar mt0">
                                </div>
                            </div>
                            <input @change="homeImg_fileChange($event,2)" type="file" id="homeImg_upload_file"  style="display:none;" value="2"/>
                        <!-- </div> -->
                    </el-form-item>
                    <el-form-item>
                        <template slot-scope="scope">
                            <div>
                                <el-button @click="revise1=false" style="float:right;margin-left:20px;">取消</el-button>
                                <el-button type="primary" @click="saveInfo1(form1,2)" style="float:right;">保存</el-button>
                            </div>
                        </template>
                        
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    name:'projectCertificate',
    inject:['reload'],
    data(){
        return {
            currentPage:1,
            pageSize:10,
            total:0,
            tableData:[],
            revise:false,
            // 新增
            form:{imgUrl:''},
            // 修改
            revise1:false,
            form1:{imgUrl:''},
            imgUrl:'',
            multipleSelection:[],
            rules:{
                description:[
                    {required: true, message: '请输入图片描述', trigger: 'blur'}
                ],
                sort:[
                    {required: true, message: '请输入排序值', trigger: 'blur'}
                ],
                imgUrl:[
                    {required: true, message: '请先上传图片', trigger: 'blur'}
                ],
                imgUrl1:[
                    {required: true, message: '请先上传图片', trigger: 'blur'}
                ]
            }

        }
    },
    created(){
        this.checked(1)
    },
    methods:{
        // 查询数据
        checked(currentPage){
            let obj={}
            if(currentPage==undefined){
                obj.current=this.currentPage
            }else{
                obj.current=currentPage
            }
            obj.pageSize=this.pageSize
            this.$axios({
                method:'post',
                url:request.testUrl+"/project/auth1/projectCert/pageList",
                data:JSON.stringify(obj)
            }).then(res=>{
                if(res.data.code==0){
                    this.tableData=res.data.data.records;
                    this.total=res.data.data.total;
                }
            })
        },
        // 新增项目证书按钮
        addCertificate(){
            this.revise=true;
        },
        // 新增保存按钮
        saveInfo(form){
            let that=this;
            // alert('保存')
            that.$refs.form.validate((valid)=>{
                if(valid){
                    let obj={};
                    obj.certImage=that.form.imgUrl
                    obj.certName=that.form.certName
                    obj.sort=that.form.sort
                    that.$axios({
                        method:'post',
                        url:request.testUrl+"/project/auth1/projectCert/add",
                        data:JSON.stringify(obj)
                    }).then(res=>{
                        if(res.data.code==0){
                            that.$message({
                                type:'success',
                                message:'新增成功'
                            })
                            that.revise=false;
                            that.reload()
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
        //选择项
        selectChange(val){
            this.multipleSelection=val
        },
        // 修改按钮
        handleUpdate(id){
            // 查询单条数据
            this.$axios.get(request.testUrl+"/project/auth1/projectCert/"+id).then(res=>{
                if(res.data.code==0){
                    let obj=res.data.data
                    for(var key in obj){
                        
                        obj.imgUrl=obj.certImage
                        // delete obj.certImage
                    }
                    // console.log(obj)
                    this.form1=obj
                }
            })
            this.revise1=true;
        },
        // 修改保存按钮
        saveInfo1(form1,num){
            console.log(form1)
            let that=this;
            that.$refs.form1.validate((valid)=>{
                if(valid){
                    let obj={}
                    obj.certImage=that.form1.imgUrl
                    obj.certName=that.form1.certName
                    obj.sort=that.form1.sort
                    obj.id=that.form1.id
                    that.$axios({
                        method:'post',
                        url:request.testUrl+"/project/auth1/projectCert/update",
                        data:JSON.stringify(obj)
                    }).then(res=>{
                        if(res.data.code==0){
                            that.$message({
                                type:'success',
                                message:'修改成功'
                            })
                            that.revise=false;
                            that.reload()
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
        allDel(){
            let that=this;
            let ids=[];
            if(that.multipleSelection.length<=0){
                that.$message({
                    type:'warning',
                    message:'请先选择至少一个证书再删除!'
                })
                return;
            }
            that.multipleSelection.forEach(item=>{
                ids.push(item.id)
            })
            that.$confirm('此操作将会删除该文件,是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                that.$axios({
                    method:'post',
                    url:request.testUrl+"/project/auth1/projectCert/batchDelete",
                    data:ids
                    }).then(res=>{
                    if(res.data.code==0){
                        that.$message({
                            type:'success',
                            message:'删除成功'
                        })
                        that.reload()
                    }else{
                        that.$message({
                            type:'error',
                            message:res.data.msg
                        })
                    }
                })
            }).catch(()=>{
                that.$message({
                    type:'info',
                    message:'已取消删除!'
                })
            })
            
        },
        // 删除按钮
        handleDel(id){
            // let arr=[]
            let that=this;
            that.$confirm('此操作将会删除该文件,是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                that.$axios({
                        method:'post',
                        url:request.testUrl+"/project/auth1/projectCert/batchDelete",
                        data:[id]
                    }).then(res=>{
                        if(res.data.code==0){
                            that.$message({
                                type:'success',
                                message:'删除成功'
                            })
                            that.reload()
                        }else{
                            that.$message({
                                type:'error',
                                message:res.data.msg
                            })
                        }
                })
            }).catch(()=>{
               that.$message({
                    type:'info',
                    message:'已取消删除!'
                }) 
            })
            
        },
        // 点击图片上传
        homeImg_file(){
            document.getElementById("homeImg_upload_file").click();
        },
        // 文件对象
        homeImg_fileChange(el,num){
            // console.log(el.target.files)
            // console.log(el.target,num)
            if (!el.target.files[0].size) return;
            // 新增
            if(num==1){
                this.homeImg_fileList(el.target,1);
            }
            // 修改
            if(num==2){
                this.homeImg_fileList(el.target,2);
            }
	        el.target.value = ''
        },
        homeImg_fileList(fileList,num) {
	            let files = fileList.files;
	            for (let i = 0; i < files.length; i++) {
	                //判断是否为文件夹
	                if (files[i].type != '') {
	                    this.imgPreview(files[i],num);  
	                } else {
	                    //文件夹处理
	                    this.homeImg_folders(fileList.items[i]);
	                }
	            }
        },
        // 获取图片文件上传
        imgPreview(file, num,callback) { 
            let self = this;
            var type=file.type.substring(file.type.lastIndexOf('/')+1).toLowerCase();
            var config = { 
                            headers: { "Content-Type": "multipart/form-data" }
                        };
            var formData = new FormData();
            // console.log(file)
            // gif格式不不进行压缩
            if(type=='gif'){
                formData.append("file", file);
                // 发送请求; 
                self.$axios.post(request.testUrl+"/project/auth1/image/upload",formData , config).then(res => { 
                    if (res.data.code == 0) {
                        if(num==1){
                            self.form.imgUrl=res.data.data;
                        }
                        if(num==2){
                            self.form1.imgUrl=res.data.data;
                        }
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
                            if(num==1){
                                self.form.imgUrl=result;
                            }
                            if(num==2){
                                self.form1.imgUrl1=result;
                            }
                            // self.form.imgUrl = result; 
                            let blob = self.$handlePic.dataURItoBlob(data); 
                            var formData = new FormData();
                            formData.append("file", blob); 
                            // 发送请求; 
                            self.$axios.post(request.testUrl+"/project/auth1/image/upload", formData, config).then(res => { 
                                if (res.data.code == 0) {
                                    if(num==1){
                                        self.form.imgUrl=res.data.data;
                                    }
                                    if(num==2){
                                        self.form1.imgUrl=res.data.data;
                                    }
                                    // self.form.imgUrl=res.data.data;
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
        handleSizeChange(size){
            this.pageSize=size
            this.checked(this.currentPage)
        },
        handleCurrentChange(currentPage){
            // this.currentPage=currentPage
            this.checked(currentPage)
        }
    }
}
</script>
<style>
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
.btn button {
  float: right;
  margin-bottom: 30px;
}
.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
}
.img-upload{
    margin-left: 65px;
}
.img-upload img{
    width: 200px;
    height: 100px;
}
</style>