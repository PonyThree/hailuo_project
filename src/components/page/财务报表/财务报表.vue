<template>
  <div>
    <div class="dataList">
      <ul class="listTol">
        <!--<li>购买成功（{{title.buySuccessMoney}}元）</li>-->
        <li>落位收入（{{title.dropPositionMoney}}元）</li>
        <li>认购收入（{{title.buyMoney}}元）</li>
        <li>退款支出（{{title.refundMoney}}元）</li>
        <!--<li>平台总收入（{{title.sumMoney}}元）</li>-->
        <li>项目总收入（{{title.projectSumMoney}}元）</li>
        <li>可提现金额（{{title.canOutMoney}}元）</li>
      </ul>
      <el-button type="primary" style="float: right;" @click="withdraw">申请提现</el-button>
    </div>
    <div class="clear"></div>

    <!--搜索-->
    <el-form :model="form" class="chessForm">
      <div style="width: 280px;float: right;">
        <el-input
          v-model="form.name"
          placeholder="请输入项目名称或联系人"
          style="width: 200px;margin-right:20px"
        ></el-input>
        <el-button @click="check">查询</el-button>
        <!-- <el-button style="margin-right: 20px;" @click="exported">导出财务报表</el-button> -->
      </div>
    </el-form>

    <!--表格-->
    <el-table :data="tableList" border style="width:78%;margin: 50px auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
      <el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
      <el-table-column prop="name" label="客户昵称" align="center"></el-table-column>
      <el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="money" label="交易金额" align="center"></el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <a style="color: #409EFF;font-size: 14px;" @click="checkStatus(scope.$index)">查看</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <a style="color: #409EFF;font-size: 14px;" @click="checked(scope.$index)">查看</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="set">总计：￥30000000</div> -->

    <!--分页器-->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15, 20]" :page-size="pagesize" :total="total" layout="total, sizes, prev, pager, next,jumper"></el-pagination>
  </div>
</template>
 
<script>
export default {
  name: "category",
  data() {
    return {
      form: {},
      title: "",
      tableList: [{}],
      //分页
      currentPage: 1, //默认显示第一页
      pagesize: 20, //每页的数据
      total: 1
    };
  },
  created() {
    this.resh();
  },
  watch: {
    $route(to, from) {
      if (to.meta.title == "财务报表") {
      	this.resh();
      }
    }
  },
  methods: {
    //申请提现
    withdraw() {
      this.$router.push({ path: "/申请提现" });
    },
    //导出财务报表
    exported() {},
    //查询
    check() {
      this.resh();
    },
    //查看订单状态
    checkStatus(index) {
      this.$router.push({ path: "/订单详情页", query: {mobile: this.tableList[index].mobile,userName:this.tableList[index].name}});
    },
    //操作查看
    checked(index) {
    	this.$router.push({ path: "/查看客户详情", query: {mobile: 			this.tableList[index].mobile,userName:this.tableList[index].name,userId:this.tableList[index].userId,money:this.tableList[index].money}});
    },
    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //点击第几页
    },
    handleSizeChange(size) {
      this.pagesize = size; //每页下拉显示数据
    },
    //刷新
    resh() {
      //获取头部标签金额

      this.$axios
        .get(request.testUrl + "/finance/auth1/financial/getFinnceTitle")
        .then(res => {
          if (res.data.code == 0) {
            this.title = res.data.data;
          }
        });
      //获取表格查询

      this.$axios
        .post(request.testUrl + "/finance/auth1/financial/page", {
          page: this.currentPage,
          pageSize: this.pagesize,
          name: this.form.name,
          mobile: this.form.name
        })
	    .then(res => {
	      if (res.data.code == 0) {
	        this.tableList = res.data.data.records;
	        this.total = res.data.data.total;
	      }
	    });
    }
  }
}
</script>

<style>
.dataList {
  width: 98%;
  margin: 20px auto;
}
.dataList .listTol {
  width: 90%;
  float: left;
}
.dataList .listTol li {
  display: inline-block;
  padding: 0 5px 0 15px;
  float: left;
  margin-right: 20px;
  border: 1px solid gainsboro;
  line-height: 30px;
  background: gainsboro;
  margin-bottom: 5px;
}
.clear {
  clear: both;
}
.chessForm {
  background: #dcd3ef;
  width: 98%;
  height: 48px;
  overflow: hidden;
  margin: 20px auto;
  line-height: 48px;
  box-sizing: border-box;
}
.set {
  width: 77%;
  margin: 0 auto;
  text-align: center;
  line-height: 60px;
  border: 1px solid #ebeef5;
  border-top: none;
  font-size: 20px;
  color: red;
}
.tableHead{
	font-size: 14px;
	letter-spacing: 1px;
}
</style>