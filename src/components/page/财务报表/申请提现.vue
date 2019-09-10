<template>
  <div>
    <!--提现申请表-->
    <div class="info">
      <div class="title">
        <span class="f1"></span>提现申请表
      </div>
      <div class="ff1">
        <el-form :model="form" :label-position="labelPosition" label-width="120px">
          <div class="left">
            <el-form-item label="项目名称 :">{{outmoney.name}}</el-form-item>
            <el-form-item label="收款账号 :">{{outmoney.account}}</el-form-item>
            <el-form-item label="可提现金额 :">
              <span style="color: #409EFF;font-size: 18px;">￥{{outmoney.canOutMoney}}</span>
            </el-form-item>
            <el-form-item label="提现方式 :">{{outmoney.accountName}}</el-form-item>
          </div>
          <div class="right">
            <el-form-item label="申请提现金额 :">
              <el-input v-model="form.outMoney" placeholder="请输入提现金额" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="申请人 :">
              <el-input v-model="form.applicant" placeholder="请输入申请人" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="联系电话 :">
              <el-input v-model="form.applicantPhone" placeholder="请输入联系电话" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="备注 :">
              <el-input type="textarea" :rows="6" v-model="form.remarks" placeholder="备注" style="width:400px;" ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div style="width: 12%;margin: 40px auto;">
          <el-button class="aa1" @click="back">取消</el-button>
          <el-button class="aa1" @click="addOutMoney">提交申请</el-button>
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
      labelPosition: "left",
      form: {},
      outmoney: ""
    };
  },
  created() {
    this.$axios
      .get(request.testUrl + "/finance/auth1/applyMoney/selCanOutMoney")
      .then(res => {
        if (res.data.code == 0) {
          this.outmoney = res.data.data;
        }
      });
  },
  watch: {
			'$route' (to, from) {
				if(to.path=="/申请提现"){
					this.$axios
			      .get(request.testUrl + "/finance/auth1/applyMoney/selCanOutMoney")
			      .then(res => {
			        if (res.data.code == 0) {
			          this.outmoney = res.data.data;
			        }
		      });
				}
			}
		},
  methods: {
    //新增提现
    addOutMoney() {
      let data = this.form;
      data.canOutMoney = this.outmoney.canOutMoney;
      console.log(data);

      this.$axios
        .post(request.testUrl + "/finance/auth1/applyMoney/addApplyMoney", data)
        .then(res => {
          if (res.data.code == 0) {
             this.$router.push({path:'/申请提现记录'})
            this.$message({
              message: "提交提现申请成功",
              type: "success"
            });
          }
        });
    },
    //取消
    back() {
      this.$router.back(-1); //返回上一层
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
.info .title .f1 {
  display: inline-block;
  width: 20px;
  height: 100%;
  background: #9768e5;
  float: left;
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