<template>
  <div>
    <!--提现申请表-->
    <div class="info">
      <div class="ff1">
        <el-form :label-position="labelPosition" label-width="120px">
          <div class="left">
            <el-form-item label="申请人 :">{{dataList.applicant}}</el-form-item>
            <el-form-item label="联系电话 :">{{dataList.applicantPhone}}</el-form-item>
            <el-form-item label="申请时间 :">{{dataList.createTime}}</el-form-item>
            <el-form-item label="收款账号 :">{{dataList.account}}</el-form-item>
            <el-form-item label="提现方式 :">{{dataList.accountName}}</el-form-item>
          </div>
          <div class="right">
            <el-form-item label="可提现金额 :">
              <span style="color: #409EFF;font-size: 18px;">￥{{dataList.canOutMoney}}</span>
            </el-form-item>
            <el-form-item label="申请提现金额 :">
              <span style="color: #409EFF;font-size: 18px;">￥{{dataList.outMoney}}</span>
            </el-form-item>
            <el-form-item label="审核时间 :" style="color:red;">{{dataList.modifyTime}}</el-form-item>
            <el-form-item label="备注 :">{{dataList.remarks}}</el-form-item>
          </div>
        </el-form>
        <div style="width: 15%;margin: 40px auto;">
          <el-button class="aa1" style="margin-top: 10px;" v-if="dataList.status==1">已通过</el-button>
          <el-button class="aa1" style="margin-top: 10px;" v-if="dataList.status==0">审核中</el-button>
          <el-button class="aa1" style="margin-top: 10px;" v-if="dataList.status==2">被驳回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "management",
  data() {
    return {
      dataList: [],
      labelPosition: "left",
      form: {}
    };
  },
  created() {
    this.resh();
  },
  watch: {
    $route(to, from) {
    	if(to.path=="/查看申请记录"){
    		this.resh(); //
    	}
    }
  },
  methods: {
    resh() {
      let id = this.$route.query.id;
      if (id) {
        this.$axios
          .get(
            request.testUrl + "/finance/auth1/applyMoney/selOneData?id=" + id
          )
          .then(res => {
            if (res.data.code == 0) {
              this.dataList = res.data.data;
				//格式化时间戳
              this.dataList.createTime = this.dateFormat(
                res.data.data.createTime
              );
              this.dataList.modifyTime = this.dateFormat(
                res.data.data.modifyTime
              );
            }
          });
      }
    },
    //格式化时间戳
    dateFormat(row) {
      const daterc = row;
      if (daterc != null) {
        const dateMat = new Date(row);
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
    }
  }
};
</script>

<style>
.info {
  width: 96%;
  margin: 40px auto;
}
.info .title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #000000;
  font-size: 20px;
  text-indent: 10px;
  margin-bottom: 20px;
}
.info .ff1 {
  width: 100%;
  background: #f8f8f8;
  padding: 10px 0 10px 0;
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
.aa1 {
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
</style>