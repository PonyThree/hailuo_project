<template>
  <div>
    <el-form class="main">
      <!--基本信息-->
      <div class="info">
        <div class="title">
          <span class="f1"></span>
          基本信息
        </div>
        <div class="ff1">
          <el-form
            :model="carSpaceMessage"
            :label-position="labelPosition"
            label-width="120px"
            ref="form"
          >
            <div class="left">
              <el-form-item label="车位名称:" prop="name">
                <el-input
                  v-model="carSpaceMessage.name"
                  :disabled="true"
                  placeholder="请输入车位名称"
                  style="width: 410px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="车位位置:" prop="level3">
                <el-select
                  v-model="carSpaceMessage.level1Name"
                  disabled
                  placeholder="请选择状态"
                  style="width: 130px;"
                ></el-select>
                <el-select
                  v-model="carSpaceMessage.level2Name"
                  disabled
                  placeholder="请选择状态"
                  style="width: 130px;margin: 0 10px 0 10px;"
                ></el-select>
                <el-select
                  v-model="carSpaceMessage.level3Name"
                  disabled
                  placeholder="请选择状态"
                  style="width: 130px;"
                ></el-select>
              </el-form-item>
            </div>
            <div class="right">
              <el-form-item label="建筑面积（m²）:" prop="outsideArea">
                <el-input
                  v-model="carSpaceMessage.outsideArea"
                  :disabled="true"
                  placeholder="请输入车位面积（㎡）"
                  style="width: 410px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="套内面积（m²）:">
                <el-input
                  v-model="carSpaceMessage.insideArea"
                  :disabled="true"
                  placeholder="请输入车位面积（㎡）"
                  style="width: 410px;"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <!--车位其他信息-->
      <div class="info">
        <div class="title">
          <span class="f1"></span>
          车位其他信息
        </div>
        <div class="ff1">
          <el-form :label-position="labelPosition" label-width="160px" ref="form">
            <div class="left">
              <el-form-item label="底价（元）:" prop="floorPrice">
                <el-input
                  v-model="carSpaceMessage.floorPrice"
                  :disabled="true"
                  placeholder="请输入车位底价"
                  style="width: 410px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="最终销售价（元）:">
                <el-input
                  v-model="carSpaceMessage.sellPrice"
                  :disabled="true"
                  placeholder="请输入车位最终销售价"
                  style="width: 410px;"
                ></el-input>
              </el-form-item>
            </div>
            <div class="right">
              <el-form-item label="表价（元）:">
                <el-input
                  v-model="carSpaceMessage.facePrice"
                  :disabled="true"
                  placeholder="请输入车位表价，表价应大于底价"
                  style="width: 410px;"
                ></el-input>
              </el-form-item>
            </div>
            <div style="width: 100%;height: auto;overflow: hidden;">
              <el-form-item label="车位类别标签:">
                <div style="width: 100%;margin-top: 30px;">
                  <div
                    class="tagg"
                    v-for="(item,index) in carSpaceMessage.tagRespDtos"
                    :key="index+item"
                  >{{item.name}}</div>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <!--车位图片-->
      <div class="info">
        <div class="title">
          <span class="f1"></span>
          车位详情图片
        </div>
        <div class="ff1">
          <div class="img_box">
            <template v-for="(item,index) in carSpaceMessage.truckSpaceImages">
              <div class="img_item" :style="'background-image: url('+item+');'" :key="item+index"></div>
            </template>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入依赖
  name: "modify-parking",
  data() {
    return {
      labelPosition: "left",
      value: "1",
      carSpaceMessage: {
        name: null, //车位名称
        level1Name: null, //车位位置
        level2Name: null,
        level3Name: null,
        outsideArea: null, //建筑面积
        insideArea: null, //套内面积
        floorPrice: null, //底价
        facePrice: null, //表价
        sellPrice: null, //最终销售价
        truckSpaceImages: null, //车位图片
        tagRespDtos: null //车位标签
      }
    };
  },
  created() {
    //渲染单个车位信息
    let id = this.$route.query.id;
    this.$axios
      .get(request.testUrl + "/product/auth1/truckSpace/" + id)
      .then(res => {
        if (res.data.code == 0) {
          console.log("这是车位数据", res);
          let {
            name,
            level1Name,
            level2Name,
            level3Name,
            outsideArea,
            insideArea,
            floorPrice,
            facePrice,
            sellPrice,
            truckSpaceImages,
            tagRespDtos
          } = res.data.data;
          let tempObj = {
            name,
            level1Name,
            level2Name,
            level3Name,
            outsideArea,
            insideArea,
            floorPrice,
            facePrice,
            sellPrice,
            truckSpaceImages,
            tagRespDtos
          };
          for (let key in tempObj) {
            this.$set(this.carSpaceMessage, key, tempObj[key]);
          }
        }
      });
  },
  methods: {}
};
</script>

<style>
.main {
  width: 100%;
}
.info {
  width: 96%;
  margin: 40px auto;
}
.info .title {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  color: #000000;
  font-size: 20px;
  margin-bottom: 20px;
}
.info .ff1 {
  width: 100%;
  background: #f8f8f8;
  padding: 10px 0 10px 0;
}

.info .ff1 .img_box {
  display: flex;
  width: 100%;
}

.info .ff1 .img_item {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  background-size: cover;
}
.info .ff1 .img_item:last-of-type {
  margin-right: 0;
}

.info .title .f1 {
  width: 20px;
  height: 100%;
  background: #9768e5;
  margin-right: 10px;
}
.info .el-form {
  width: 96%;
  padding-left: 50px;
  box-sizing: border-box;
  height: auto;
  overflow: hidden;
  margin: 20px auto 20px;
}
.left {
  width: 670px;
  float: left;
  margin-right: 40px;
}
.right {
  width: 670px;
  float: left;
}
.tagg {
  display: inline-block;
  color: #000000;
  background: #dcd3ef;
  padding: 2px 15px 2px 15px;
  border-radius: 5px;
  margin-right: 15px;
  margin-bottom: 10px;
}
.tagg:hover {
  cursor: pointer;
}
.aa1.aa1 {
  background: #9768e5;
  color: #ffffff;
}
.aa1:hover {
  background: #7764ea !important ;
  color: #ffffff !important;
}
.aa1:focus {
  background: #7764ea !important ;
  color: #ffffff !important;
}
.active1 {
  background: #9768e5;
  color: #ffffff;
}
</style>

