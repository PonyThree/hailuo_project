<template>
  <div>
    <div class="info">
      <div class="title">
        <span class="f1"></span>
        <div>
          <span>活动管理</span>
          <span>首页/ 活动管理 /活动列表/查看活动</span>
        </div>
      </div>
    </div>
    <div style="width:100%;height:50px;">
      <el-button   type="primary" @click="exportData" size="small" style="float:right;margin-right:40px;">导出</el-button>
    </div>
    <div>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="titleName">活动类型</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="titleName">活动名称</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="titleName">活动开始时间</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="titleName">活动结束时间</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="titleName">活动车位数</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="titleName">秒杀认购车位数</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.actTypeName}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.actName}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.startTimeString}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.endTimeString}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.activityTruckSpaceNub}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.buyTruckSpaceNub}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="titleName">分享次数</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="titleName">参与人数</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="titleName">成功人数</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="titleName">成功比例</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="titleName">平均优惠金额</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="titleName">总优惠金额</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.sharesNub}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.participateNub}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.successNub}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.successRatio}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.avgDiscountsPrice}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div style="text-align:center;margin-top:30px;">{{data.actInfo.sumDiscountsPrice}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-form :model="form" class="chess" style="margin:60px auto;width:96%;" inline>
      <el-form-item style="width: 600px;margin-left:20px;">
        <!-- <span style="padding:0 10px;color:#000000;">搜索关键字</span> -->
        <!-- <el-input v-model="form.keyword" placeholder="车位名称/用户昵称/联系电话" style="width: 200px;"></el-input> -->
        <!-- <el-button @click="check" icon="el-icon-search" style="margin-left: -4px;">查询</el-button> -->
        <!-- v-if="showSearch" -->
        <div style="margin-top: 15px;width:500px;">
          <el-input placeholder="请输入内容" v-model="form.truckSpaceName" class="input-with-select" >
            <el-select v-model="selectNum" slot="prepend" placeholder="请选择" @change="selectChange">
              <el-option label="车位名称" :value="1"></el-option>
              <el-option label="用户昵称" :value="2"></el-option>
              <el-option label="联系电话" :value="3"></el-option>
              <el-option label="全部" :value="4"></el-option>
            </el-select>
          </el-input>
        </div>
      </el-form-item>
      
      <el-form-item style="margin-right: 20px;margin-top:10px;float:right">
        <el-button   type="default" @click="checkCar" size="small">搜索</el-button>
      </el-form-item>
      <el-form-item style="margin-right: 460px;margin-top:10px;float:right">
        <span style="padding:0 10px;color:#000000;">车位状态</span>
        <el-select
          v-model="form.carStatus"
          @change="statusChange"
          style="width: 120px;"
        >
          <el-option :label="item.label" :value="item.id" v-for="item in statusList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="table">
      <!--表格-->
      <el-table
        :data="activityCarList"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%;margin: 30px auto;"
        :header-cell-style="{background:'#dcd3ef',color:'#606266'}"
        header-row-class-name="tableHead"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="truckSpaceCode" label="认购车位名称" align="center"></el-table-column>
        <el-table-column prop="buyMoney" label="秒杀价格" align="center"></el-table-column>
        <el-table-column prop="buyTime" label="秒杀认购时间" align="center"></el-table-column>
        <el-table-column prop="orderStatusName" label="车位状态" align="center"></el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10]"
        :page-size="pagesize"
        :total="total"
        layout="total, sizes, prev, pager, next,jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入依赖
  name: "findActivity",
  data() {
    return {
      // 选择方式
      selectNum:'',
      showSearch:true,
      form: {},
      actId:'',
      provinceList: [],
      storeyList: [],
      buildingList: [],
      activityCarList: [],
      //分页
      currentPage: 1, //默认显示第一页
      pagesize: 10, //每页的数据
      total: 0,
      // 活动数据
      data:{
        actInfo:{}
      },
      actInfo:{},
      // 查询活动订单的筛选条件   //2失败 1待审核 4.待核销 3交易成功 5失效
      statusList:[
        {id:1,label:'待审核'},
        {id:2,label:'失败'},
        {id:3,label:'交易成功'},
        {id:4,label:'待核销'},
        {id:6,label:'全部'},
      ]
    };
  },
  created() {
    this.renderData(this.$route.query.actId);
    this.check(1);
  },
   watch:{
      $route(to,form){
        if(to.path=="/查看活动"){
          this.renderData(this.$route.query.actId)
          this.check(1)
        }
      }
    },
  methods: {
    renderData(actId) {
      var params = new URLSearchParams();
      params.append("actId", actId);
      // /activity/inner/activityTab/findById
      this.$axios
        .post(
          request.testUrl + "/activity/auth1/activityTab/activityDataInfo",
          params
        )
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data.data.actTypeName);
            if(res.data.data.actTypeName){
              this.$set(this.data,"actInfo",res.data.data)
            }
          }
        });
    },
    // 筛选状态
    selectChange(){
      console.log(this.selectNum)
      if(this.selectNum==4){
        this.form.truckSpaceName='';
      }
      console.log(this.showSearch)
    },
    //搜索查询
    check(currentPage) {
      var obj={};
      obj.page=currentPage?currentPage:this.currentPage;
      obj.pageSize=this.pagesize;
      obj.activityId=this.$route.query.actId;
      if(this.form.carStatus){
        if(this.form.carStatus!=6){
          obj.orderStatus=this.form.carStatus
        }
      }
      if(this.selectNum==1){
        if(this.form.truckSpaceName){
          obj.truckSpaceName=this.form.truckSpaceName
        }else{
          this.$message({
            type:'warning',
            massage:'请输入合适的查找内容'
          })
          return;
        }
      }
      if(this.selectNum==2){
        if(this.form.truckSpaceName){
           obj.userName=this.form.truckSpaceName
        }else{
          this.$message({
            type:'warning',
            massage:'请输入合适的查找内容'
          })
          return;
        }
       
      }
      if(this.selectNum==3){
        if(this.form.truckSpaceName){
           obj.mobile=this.form.truckSpaceName
        }else{
          this.$message({
            type:'warning',
            massage:'请输入合适的查找内容'
          })
          return;
        }
        
      }
      // obj.truckSpaceName=form.truckSpaceName
      this.$axios.post(request.testUrl+"/order/auth1/orderForm/activityOrderList",JSON.stringify(obj)).then(res=>{
        if(res.data.code==0){
          // 查询活动订单的筛选条件   //2失败 1待审核 4.待核销 3交易成功 5失效
          console.log(res.data.data.records)
            if(res.data.data.records){
              this.total=res.data.data.total
              res.data.data.records.forEach(item=>{
                item.buyTime=handleTime.getTime1(item.buyTime)||''
              })
              this.activityCarList=res.data.data.records
            }else{
              this.total=0;
              this.activityCarList=[]
            }
        }
      })
    },
    // 车位搜索
    checkCar(){
      this.check(1)
    },
  //  导出活动详情数据
    exportData(){
      var params=new URLSearchParams()
      params.append("actId",this.$route.query.actId)
      let config={
        headers:{
						'content-type':'application/x-www-form-urlencoded'
        },
        responseType:'blob'
      }
      this.$axios.post(request.testUrl+"/activity/auth1/activityTab/activityDataInfo/export",params,config).then(res=>{
        if(!res) return 
						let blob=new Blob([res.data],{type:'application/vnd.ms-excel;charset=utf8'})
						var downloadElement=document.createElement('a');
						//创建下载的链接
						var href=window.URL.createObjectURL(blob)
						downloadElement.href=href;
						//下载文件名
						downloadElement.download="活动详情excel.xls";
						document.body.appendChild(downloadElement);
						// 点击下载
						downloadElement.click();
						// 下载完移除
						document.body.removeChild(downloadElement);
						// 释放掉blob对象
						window.URL.revokeObjectURL(href);
      }).catch(error=>{
          console.log(error)
      })
    },
    //表格全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    statusChange() {
      //2认购 1待审核 4.待核销 3交易成功
      console.log(this.form.carStatus)
    },
    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(currentPage) {
      this.check(currentPage);
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.check(this.currentPage);
    }
  }
};
</script>

<style>
.info {
  width: 96%;
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
.chess {
  background: #dcd3ef;
  width: 96%;
  margin: 0 auto;
  height: auto;
  overflow: hidden;
  margin-top: 20px;
  padding-top: 13px;
  box-sizing: border-box;
}
.table {
  width: 96%;
  margin: 0 auto;
  margin-top: 40px;
}
.listTwo {
  width: 100%;
  height: 32px;
  margin-bottom: 30px;
}
.listTwo li {
  display: inline-block;
  line-height: 32px;
  float: right;
  margin-right: 40px;
}
.tableHead {
  font-size: 14px;
  letter-spacing: 1px;
}
.el-row {
  width: 96%;
  margin-bottom: 20px;
  margin: 0 auto;
}
.el-col {
  border: 1px solid #f2f2f2;
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple {
  background: #ffffff;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  min-height: 50px;
}
.row-bg {
  padding: 10px 0;
  background-color: #ffffff;
}
.titleName {
  width: 100%;
  height: 50px;
  background: #dcd3ef;
  text-align: center;
  line-height: 50px;
}
.item--small.el-form-item {
    margin-bottom: 27px;
}
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>