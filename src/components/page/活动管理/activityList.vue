<template>
  <div>
    <div class="info">
      <!-- 头部 -->
      <div class="title">
        <span class="f1"></span>
        <div>
          <span>活动管理</span>
          <span>首页/ 活动管理 /活动列表</span>
        </div>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <el-form ref="form" :model="form" :inline="true">
          <el-form-item label="搜索关键字" style="margin-top:30px;margin-left:33px;">
            <el-input v-model="form.kwords" placeholder="名称/活动编号" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" style="margin-top:30px;margin-left:310px;">
            <el-form-item label="选择时间:">
              <el-date-picker v-model="form.acStartTime" type="datetime" placeholder="开始时间"></el-date-picker>~
              <el-date-picker v-model="form.acEndTime" type="datetime" placeholder="结束时间"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-top:30px;margin-left:310px;">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div> 
      <div class="acTable">
        <!-- 表头部 -->
        <div class="acHead">
          <p>活动列表</p>
          <div>
            <el-button type="primary" icon="el-icon-upload2">导出</el-button>
            <el-button type="primary" @click="setRel">设置活动规则</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addActivity">添加活动</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-top:20px;"
          @selection-change="handleSelectionChange" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="nomber" label="活动编号" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="acStartTime" label="开始时间" width="120"></el-table-column>
          <el-table-column prop="acEndTime" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="controline" label="上线/下线" show-overflow-tooltip>
            <template scope="scope">
              <div>
                <el-switch v-model="value" active-text="上线" inactive-text="下线"></el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="acStatus" label="结束状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="acStatus" label="操作信息" show-overflow-tooltip>
            <template>
              <div>
                <el-button type="text">查看</el-button>
                <el-button type="text">编辑</el-button>
                <el-button  type="text">活动车位</el-button>
                <el-button type="text">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table> 
      </div>
    </div>
    <!-- 活动规则弹窗 -->
    <el-dialog
      title="设置活动规则:"
      :visible.sync="show1"
      width="25%"
      :close-on-click-modal="false"
      :show-close="false"
      style="margin-top:6vh;">
      <el-form
        ref="form"
        :model="form"
        label-width="110px"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="设置活动规则:" prop="regulation">
          <textarea name="regular" id="" cols="40" rows="10" v-model="form.regulation"></textarea>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo">保存</el-button>
        <el-button @click="show1=false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加活动弹窗 -->
    <el-dialog
      title="添加活动:"
      :visible.sync="show2"
      width="25%"
      :close-on-click-modal="false"
      :show-close="false"
      style="margin-top:6vh;">
      <el-form
        ref="form1"
        :model="form"
        label-width="110px"
        :label-position="labelPosition">
        <el-form-item label="活动名称:" prop="acName">
          <el-input v-model="form1.acName"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 :" style="width: 800px;" prop="startTime">
							<el-date-picker v-model="form1.startTime" type="datetime" @blur="getStartTime" placeholder="设置时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间 :" style="width: 800px;" prop="endTime">
							<el-date-picker v-model="form1.endTime" type="datetime" @blur="getEndTime" placeholder="设置时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线 :" style="width: 800px;" prop="jugeLine">
              <el-radio v-model="form1.radio" label="1">上线</el-radio>
              <el-radio v-model="form1.radio" label="2">下线</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo1">保存</el-button>
        <el-button @click="show2=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData:[],
      labelPosition:'left',
      show1:false,
      // 活动规则
      form: {
        regulation:'【活动门槛】\n需缴纳保证金方可参加活动【活动内容】\n1、活动期间，用户发起活动，邀请好友\n2、奖品将直接发放到用户账户中\n活动奖品数量有限，领完即止'
      },
      //添加活动
      show2:false,
      //活动
      form1:{},
      rules:{
          regulation:{require:true,message:'请填写活动规则',trigger:'blur'}
        }
    }
  },
  methods: {
        //选择项数据
        handleSelectionChange(e) {

        },
        // 设置活动规则
        setRel(){
          this.show1=true;
        },
        //活动规则保存按钮
        saveInfo(){
          console.log(this.regulation)
          this.show1=false;
        },
        // 添加活动按钮
        addActivity(){
          this.show2=true;
        },
        //添加活动保存按钮
        saveInfo1(){
          this.show2=false;
        },
        //获得开始时间
        getStartTime(){

        },
        // 获得结束时间
        getEndTime(){

        }

        
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
/* 查询 */
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: #f8f8f8;
}
/* 活动表 */
.acTable {
  width: 100%;
}
.acHead {
  display: flex;
  box-sizing: border-box;
  padding: 0 30px;
  height: 60px;
  margin-top: 40px;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: space-between;
}
.tableHead{
	font-size: 14px;
	letter-spacing: 1px;
}
</style>