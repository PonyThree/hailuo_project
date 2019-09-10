<template>
  <div>
    <el-form :model="form" class="chess" :label-position="labelPosition" label-width="120px">
      <div style="width: 40%;float: left;">
        <el-form-item label="审核状态:" style="width: 600px;float: left;">
          <el-select v-model="form.status" placeholder="请选择订单状态" style="width: 200px;">
            <el-option label="全部" value checked></el-option>
            <el-option label="审核中" value="0"></el-option>
            <el-option label="已通过" value="1"></el-option>
            <el-option label="被驳回" value="2"></el-option>
          </el-select>
          <el-input
            v-model="form.name"
            placeholder="请输入申请人或电话"
            style="width: 200px;margin-left:80px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label-width="50px" style="width: 600px;float: left;">
          <el-select v-model="form.region" placeholder="申请人" style="width: 100px;">
            <el-option label="申请人" value="1"></el-option>
            <el-option label="手机号" value="2"></el-option>
            <el-option label="订单编号" value="3"></el-option>
          </el-select>
          <el-input v-model="form.name" placeholder="请输入申请人或电话" style="width: 200px;"></el-input>
        </el-form-item>-->
      </div>
      <div style="width: 40%;height: auto;overflow: hidden;float: left;">
        <el-form-item label="申请时间:">
          <el-date-picker v-model="form.staTime" type="datetime" placeholder="选择日期时间" style="width: 200px;" value-format="timestamp"></el-date-picker>&nbsp;&nbsp;~&nbsp;&nbsp;
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间" style="width: 200px;" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </div>
      <div style="width: 200px;float: right;">
        <el-button style="float: right;margin-right: 20px;" @click="check">查询</el-button>
        <el-button style="float: right;margin-right: 20px;" @click="exported">导出</el-button>
      </div>
    </el-form>

    <div class="clear"></div>

    <!--表格-->
    <el-table :data="dataList" border style="width: 90%;margin: 40px auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column prop="applicant" label="申请人" align="center"></el-table-column>
      <el-table-column prop="applicantPhone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="outMoney" label="提现金额" align="center"></el-table-column>
      <el-table-column prop="account" label="收款账号" align="center"></el-table-column>
      <el-table-column prop="status" label="审核状态" align="center" :formatter="state"></el-table-column>
      <el-table-column prop="caozuo" label="操作" align="center">
        <template slot-scope="scope">
          <a style="color: #409EFF;font-size: 14px;" @click="checkeDetail(scope.row)">查看</a>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="pagesize" :total="total" layout="total, sizes, prev, pager, next,jumper"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "record",
  data() {
    return {
      labelPosition: "right",
      form: {},
      dataList: [],
      //分页
      currentPage: 1, //默认显示第一页
      pagesize: 20, //每页的数据
      total: 0
    };
  },
  created() {
    this.resh();
  },
  watch: {
    $route(to, from) {
      if (to.meta.title == "申请提现记录") this.resh();
    }
  },
  methods: {
    //时间格式化
    dateFormat(row) {
      const daterc = row;
      if (daterc != null) {
        const dateMat = new Date(row.createTime);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours();
        const mm = dateMat.getMinutes();
        const ss = dateMat.getSeconds();
        const timeFormat =
          year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
        return timeFormat;
      }
    },
    //格式化状态
    state(row) {
      if (row.status == 0) return "审核中";
      else if (row.status == 1) return "已通过";
      else if (row.status == 2) return "以驳回";
    },
    //查询
    check() {
      this.resh();
    },
    //导出
    exported() {},
    //查看订单
    checkeDetail(row) {
      console.log(row.id);
      this.$router.push({ path: "/查看申请记录", query: { id: row.id } });
    },
    //刷新查询
    resh() {
      let data = this.form;
      data.page = this.currentPage;
      data.pageSize = this.pagesize;
      data.applicant = this.form.name;
      data.applicantPhone = this.form.name;

      this.$axios.post(request.testUrl + "/finance/auth1/applyMoney/pageData", data)
        .then(res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.records;
            this.total = res.data.data.total;
          }
        });
    },

    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //点击第几页
    },
    handleSizeChange(size) {
      this.pagesize = size; //每页下拉显示数据
    }
  }
};
</script>

<style>
.info {
  width: 96%;
  margin: 40px auto;
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

.clear {
  clear: both;
}
.tableHead{
	font-size: 14px;
	letter-spacing: 1px;
}
</style>