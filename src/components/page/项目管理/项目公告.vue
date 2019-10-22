<template>
  <div>
    <div class="info">
      <div class="title">
        <span class="f1"></span>
        <div>
          <span>项目管理</span>
          <span>首页/ 项目管理 /项目公告</span>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="addGonggao">新增</el-button>
      </div>
    </div>
    <el-table :data="gonggaoTabe" border :header-cell-style="{background:'#dcd3ef'}"  header-row-class-name="tableHead">
        <el-table-column prop="num" label="序号" align="center" width="100">
            <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="imgUrl" label="展示图片" align="center" width="300">
            <template slot-scope="scope">
                <img :src="scope.row.imageUrl"  style="width: 200px;height: 100px;"/>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="" align="center" v-show="1==2"></el-table-column>
        <el-table-column prop="content" label="展示文字" align="center"></el-table-column>
        <el-table-column prop="createTime" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="caozuo" label="操作" align="center">
            <template slot-scope="scope">
                <a style="color: #409EFF;font-size: 14px;" @click="modifyBanner(scope.row.id)">修改</a>
                <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteBanner(scope.row.id)">删除</a>
            </template>
        </el-table-column> 
    </el-table>
    <!--分页器-->	
    <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[2, 5, 10]" :page-size="pageSize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
    </el-pagination>
    <!--新增banner弹出框-->
    <el-dialog title="新增项目公告" :visible.sync="revise" width="25%" :close-on-click-modal="false">
        <el-form ref="info" :model="info" label-width="110px" :label-position="labelPosition" :rules='rules'>
            <!-- <el-form-item label="图片描述:" prop='description'>
                <el-input v-model="info.description" placeholder="请输入图片描述"></el-input>
            </el-form-item> -->
            <el-form-item label="首页展示文字:" prop='content'>
                <el-input v-model="info.content" placeholder="请输入图片描述"></el-input>
            </el-form-item>
            <el-form-item label="首页展示图片:" prop="imageUrl">
                <div class="pic-box">
                    <div class="upload_warp" >
                        <div class="upload_warp_left img-upload" @click="homeImg_file">
                            <img :src="imgUrl" v-if="imgUrl" class="avatar mt0" style="width: 200px;height: 100px;">
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
    <el-dialog title="修改项目公告" :visible.sync="editVisible" width="25%" :close-on-click-modal="false">
        <el-form ref="info1" :model="info1" label-width="110px" :label-position="labelPosition" :rules='rules'>
            <el-form-item label="首页展示文字:" prop='content'>
                <el-input v-model="info1.content" placeholder="请输入图片描述"></el-input>
            </el-form-item>
            <el-form-item label="首页展示图片:" prop="imageUrl">
                <div class="pic-box">
                    <div class="upload_warp" >
                        <div class="upload_warp_left img-upload" @click="homeImg_file">
                            <img :src="imgUrl" v-if="imgUrl" class="avatar mt0" style="width: 200px;height: 100px;">
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
</template>
<script>
export default {
  inject:['reload'],//注入依赖
  data() {
    return {
        total:0,
        labelPosition:'left',
        gonggaoTabe:[],
        img_url:'',
        info:{},
        info1:{},
        // 首页展示图片
        imgUrl:'https://china185.com/file/image/20190902/c45987a0939f4337a95c3d1598a5ecc1.blob',
        page:1,
        pageSize:10,
        revise:false,
        editVisible:false,
        rules:{
                content:{required: true, message: '请输入首页展示文字', trigger: 'blur'},
                }
    }
  },
  created(){
      this.renderData(this.page,this.pageSize)
      console.log(handleTime.getTime);
  },
  methods:{
      //渲染活动列表
    renderData(page,pageSize){
        var params=new URLSearchParams();
        params.append('page',page)
        params.append('pageSize',pageSize)
        this.$axios.post(request.testUrl+"/project/auth1/notice/pageList",params).then(res=>{
            // console.log(res.data.data.records)
            this.total=res.data.data.total;
            
            //处理时间
            var len=res.data.data.records.length;
            
            for(let i=0;i<len;i++){
                res.data.data.records[i].createTime=handleTime.getTime(res.data.data.records[i].createTime)
            }
            this.gonggaoTabe=res.data.data.records;
            console.log(res.data.data.records)
        })
    },
    //新增项目公告按钮
    addGonggao(){
        this.revise=true;
    },
    //修改按钮
    modifyBanner(id){
        console.log(id)
        this.editVisible=true;
        this.editData(id)
    },
    //删除
    deleteBanner(id){
        this.$confirm('此操作将会删除该文件,是否继续?','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
        }).then(()=>{
            var params=new URLSearchParams();
            params.append('id',id);
            this.$axios.post(request.testUrl+"/project/auth1/notice/doDeleteNotice",params).then(res=>{
                    console.log(res.data)
                    if(res.data.code==0){
                        // this.info1=res.data.data;
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                        this.reload();
                    }else{
                        this.$message({
                            type:'error',
                            message:res.data.msg
                        })
                    }
            })
        }).catch(()=>{
            this.$message({
                type:'info',
                message:'已取消删除'
            })
        })
        
    },
    //   修改之前加载数据
    editData(id){
        var params=new URLSearchParams();
        params.append('id',id);
        this.$axios.post(request.testUrl+"/project/auth1/notice/findById",params).then(res=>{
            console.log(res.data)
            if(res.data.code==0){
                this.info1=res.data.data;
                this.imgUrl=res.data.data.imageUrl;
            }else{
                this.$message({
                    type:'error',
                    message:res.data.msg
                })
            }
        })
    },
    //修改保存按钮
    saveEdit(id){
        if(this.imgUrl==''){
            this.$message({
                typr:'warning',
                message:'请上传图片'
            })
            return ;
        }else{
            this.$refs.info1.validate(vidate=>{
            if(vidate){
                let obj=this.info1;
                obj.imageUrl=this.imgUrl;
                obj.id=id;
                // console.log(obj)
                this.$axios({
                    method:'post',
                    url:request.testUrl+"/project/auth1/notice/updeteOrInsertNotice",
                    data:JSON.stringify(obj)
                }).then(res=>{
                    if(res.data.code==0){
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        })
                        //处理时间
                        var len=res.data.data.length;
                        for(let i=0;i<len;i++){
                            res.data.data[i].createTime=handleTime.getTime(res.data.data[i].createTime)
                        }
                        this.gonggaoTabe=res.data.data;
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
        }
    },
    //新增保存按钮
    saveInfo(){
        if(this.imgUrl==''){
            this.$message({
                typr:'warning',
                message:'请上传图片'
            })
            return ;
        }else{
            this.$refs.info.validate(vidate=>{
            if(vidate){
            //   alert('保存成功')
                if(this.info.description==''){
                    delete info.description
                }
                let obj=this.info;
                obj.imageUrl=this.imgUrl;
            //   console.log(obj)
                this.$axios({
                    method:'post',
                    url:request.testUrl+"/project/auth1/notice/updeteOrInsertNotice",
                    data:JSON.stringify(obj)
                }).then(res=>{
                    if(res.data.code==0){
                    //处理时间
                    var len=res.data.data.length;
                    for(let i=0;i<len;i++){
                        res.data.data[i].createTime=this.getTime(res.data.data[i].createTime)
                    }
                    this.gonggaoTabe=res.data.data;
                    this.reload();
                    }else{
                        this.$message({
                            type:'error',
                            message:res.data.msg
                        })
                    }
                })
            }else{

            }
        })
        }
        
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
    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(page) {
        this.page = page; //点击第几页
        this.renderData(this.page,this.pageSize);
    },
    handleSizeChange(size){
        this.pageSize = size; //每页下拉显示数据
        this.renderData(this.page,this.pageSize);
    },
  }
};
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
.tableHead {
  font-size: 14px;
  letter-spacing: 1px;
}
</style>