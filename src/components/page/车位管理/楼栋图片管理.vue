<template>
  <div>
    <div class="info">
      <div class="title">
        <span class="f1"></span>
        <div>
          <span>车位管理</span>
          <span>首页/ 车位管理 /楼栋图片管理</span>
        </div>
      </div>
    </div>
    <!-- :show-checkbox="true" -->
      <el-tree
        :data="treeData"
        node-key="id"
        empty-text="暂无数据"
        default-expand-all
        ref="tree"
        @node-click="nodeClick"
        :accordion="true"
        :check-strictly="true"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, treeData }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="insertPic(node)">编辑</el-button>
          </span>
        </span>
      </el-tree>
    <el-dialog title="编辑楼栋图片" :visible.sync="show" :close-on-click-modal="false" width="25%" style="margin-top:6vh;">
      <el-form
        ref="info"
        :model="info"
        label-width="110px"
        :rules="rules"
      >
        <!-- <el-form-item label="图片描述:" prop="description">
          <el-input v-model="info.description" placeholder="请输入图片描述"></el-input>
        </el-form-item> -->
        <el-form-item label="banner图片:">
          <div class="pic-box">
            <div class="upload_warp">
              <div class="upload_warp_left img-upload" @click="homeImg_file">
                <img :src="imgUrl" v-if="imgUrl" class="avatar mt0" />
              </div>
            </div>
            <input
              @change="homeImg_fileChange($event)"
              type="file"
              id="homeImg_upload_file"
              multiple
              style="display:none;"
            />
          </div>
        </el-form-item>
        <el-form-item v-show="false">
          <el-input v-model="info.id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo">保存</el-button>
        <el-button @click="show=false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="buildInfo">

    </div>
  </div>
</template>
<script>
var obj;
export default {
  data() {
    return {
      bool:'',
      editCheckId:'',
      imgUrl:'',
      show: false,
      info:{},
      buildingTable: [],
      //区层栋信息
      addressInfo:{},
      allData:{
        // 区
        areaSelectVos:[],
        // 层
        floorSelectVos:[],
        // 栋
        TruckSpaceLevelTwoSelectVos:[],
      },
      treeData:[],
      // data:'',
      rules:{
//						href:{ required: true, message: '请输入跳转链接', trigger: 'blur' },
						// description:[
						// 	{ required: true, message: '请输入图片描述', trigger: 'blur' },
						// 	{ min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
						// ]
					}
    };
  },
  created() {
    this.renderData();
  },
  computed:{
  },
  methods: {
    // 格式化数据
    renderData(){
      this.$axios.get(request.testUrl+"/product/auth1/truckSpace/getRelationList").then(res=>{
        let arr=res.data.data.areaSelectVos;
        arr.forEach(item=>{
          item.children=item.truckSpaceLevelTwoSelectImageDtos;
          item.label=item.name;
          delete item.name;
          delete item.truckSpaceLevelTwoSelectImageDtos;
          item.children.forEach(item=>{
            item.children=item.truckSpaceLevelThreeSelectImageDtos;
            item.label=item.name;
            delete item.name;
            delete item.truckSpaceLevelThreeSelectImageDtos;
            item.children.forEach(item=>{
              item.children=item.children;
              item.label=item.name;
              delete item.name;
              delete item.children;
            })
          })
        })
        this.treeData=JSON.parse(JSON.stringify(arr))
      })
    },
    //编辑
    insertPic(node) {
      // console.log(node)
      obj={};
      if(!node.parent.id){
        // 当前id值
        obj.leveId=node.data.id;
      }else{
        if(!node.parent.parent.parent){
          obj.leveId=node.parent.data.id;
          obj.truckSpaceLevelTwoId=node.data.id;
        }else{
          // alert(node.parent.parent.data.id)
          // 区
          obj.leveId=node.parent.parent.data.id;
          // 栋
          obj.truckSpaceLevelTwoId=node.parent.data.id;
          // 层
          obj.truckSpaceLevelThreeId=node.data.id;
          
        }
        //上两级id
        // console.log(node.parent.parent.parent.data[0].id)
      }
      console.log(obj)
      // 编辑之前加载数据
      this.$axios({
        method:'post',
        url:request.testUrl+"/product/auth1/truckSpace/getRelationDetail",
        data:JSON.stringify(obj)
        }).then(res=>{
          if(res.data.data==null){
            //新增
             this.show=true;
             this.imgUrl='';
          }else{
            this.show=true;
            //修改
            this.imgUrl=res.data.data.image;
          }
      })
    },
    //保存按钮
    saveInfo(){
        //修改
        obj.image=this.imgUrl;
         this.$axios({
          method:'post',
          url:request.testUrl+"/product/auth1/truckSpace/updateRelationImage",
          data:JSON.stringify(obj)
          }).then(res=>{
            // console.log(res.data)
            if(res.data.code==0){
              this.$message({
                type:'success',
                message:'操作成功'
              })
              this.show=false;
            }
        })
      // }   
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
            let data = self.compress(img);
            self.imgUrl = result; 
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
                console.log(self.imgUrl)
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
    // 节点被点击时的回调
    nodeClick(item,node,self){
      if(node==true){//点击未选中
        this.editCheckId=item.id;
        console.log(this.editCheckId)
        this.$refs.tree.setCheckedKeys([item.id])
      }else{
        if(this.editCheckId==item.id){
          this.$refs.tree.setCheckedKeys([item.id])
        }
      }
    },
    // 节点选中状态发生变化时的回调
    checkChange(item,node,self){
      this.editCheckId=item.id;
      console.log(this.editCheckId)
      this.$refs.tree.setCheckedKeys([item.id])
    }
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
.custom-tree-node {
  flex: 1;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.avatar{
		width:200px;
		height:100px;
}
.el-tree{
  width: 600px;
  margin-left: 60px;
}
.el-tree-node__expand-icon {
    cursor: pointer;
    color: #9768e5;
    font-size: 20px;
}
.custom-tree-node {
  font-size: 16px;
}
.el-button--text {
  font-size: 14px;
  color: #409EFF;
}
.el-tree-node__content{
  height: 40px;
}
.buildInfo{
  width: 800rpx;
  height: auto;
  background-color: #aaf;
}
.el-dialog {
  margin-left:830px;
  margin-top: 100px;
}
</style>