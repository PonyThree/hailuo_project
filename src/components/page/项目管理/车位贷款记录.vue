<template>
  <div class="wrap">
    <div class="head">
      <div class="left">
        <el-button type="primary" @click="exportLoanData()">导出</el-button>
        <el-button @click="batchDelete()">批量删除</el-button>
        <el-button @click="openFollowWindow(null,'batch')">批量跟进</el-button>
      </div>
      <div class="right">
        <el-select class="inputItem" v-model="carType" placeholder="请选择车辆情况">
          <el-option
            v-for="item in carTypeData"
            :key="item.value"
            :label="item.value"
            :value="item.num"
          ></el-option>
        </el-select>
        <el-input class="inputItem" placeholder="姓名/联系电话" v-model="nameOrTel" clearable></el-input>
        <el-select v-model="status" placeholder="请选择状态">
          <el-option
            v-for="item in statusDefault"
            :key="item.value"
            :label="item.value"
            :value="item.num"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="queryLoanData">查询</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="loanData"
      @selection-change="selectChange"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" align="center" label="编号" width="160"></el-table-column>
      <el-table-column prop="loanName" align="center" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="loanPhone" align="center" label="联系电话"></el-table-column>
      <el-table-column prop="carType" align="center" label="车辆情况">
        <template slot-scope="scope">{{ scope.row.carType| manageCarType() }}</template>
      </el-table-column>
      <el-table-column prop="regionInfo" align="center" label="意向区域"></el-table-column>
      <el-table-column prop="loanMoney" align="center" label="贷款金额"></el-table-column>
      <el-table-column prop="loanTime" align="center" label="申请年限(年)"></el-table-column>
      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">{{ scope.row.commitTime| submitTime() }}</template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <div
            style="color:#bbb"
            v-if="scope.row.operateStatus===0?false:true"
          >{{ scope.row.operateStatus| manageStatus() }}</div>
          <div v-else>{{ scope.row.operateStatus| manageStatus() }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作信息">
        <div slot-scope="scope" class="btn">
          <a @click="getLoanDetail(scope.row.id)">查看</a>
          <a @click="singleDelete(scope.$index)">删除</a>
          <a @click="openFollowWindow(scope.$index,'single')">跟进</a>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPageNum"
      :page-size="currentPageSize"
      background
      layout="total, prev, pager, next, jumper"
      :total="allPageNum"
      @current-change="cutCurrentPage"
    ></el-pagination>
    <!-- 跟进对话框 -->
    <el-dialog title="客户跟进" :visible.sync="followWindow" width="500px">
      <el-form :model="formData">
        <el-form-item label="跟进人员" label-width="120px">
          <el-input v-model="formData.followName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="跟进意见" label-width="120px">
          <el-input type="textarea" :rows="6" v-model="formData.followRemark" resize="none"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="followWindow = false">取 消</el-button>
        <el-button type="primary" @click="affirmFollow()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  beforeRouteLeave(to, form, next) {
    console.log(to, form);
    if (to.path === "/车位贷款详情") {
      next();
      return;
    }
    let options = {
      currentPageNumber: 1,
      carType: "",
      nameOrTel: "",
      status: ""
    };
    sessionStorage.setItem("carLoanCache", JSON.stringify(options));
    next();
  },
  data() {
    return {
      currentPageNum: 1, //当前页码
      currentPageSize: 10, //当前页的数量
      nameOrTel: "", //搜索条件 姓名或联系电话
      status: "", //已跟进or为跟进
      carType: "", //搜索条件
      currentSearch: {
        nameOrTel: "",
        status: "",
        carType: ""
      },
      // isMore: true,
      loanData: [], // 车位贷款记录数据
      // 表单数据
      formData: {
        followName: "",
        followRemark: ""
      },
      followWindow: false, // 跟进弹窗
      currentFollowId: "", // 当前跟进id
      allPageNum: 1, // 页码  所有数据总和
      // 状态值
      statusDefault: [
        {
          value: "无",
          num: ""
        },
        {
          value: "已跟进",
          num: 1
        },
        {
          value: "未跟进",
          num: 0
        }
      ],
      carTypeData: [
        { value: "无", num: "" },
        { value: "单辆车", num: 1 },
        { value: "暂无车", num: 2 },
        { value: "多辆车", num: 3 }
      ],
      selectDataArr: [], //批量数据
      followState: "single" //跟进状态  single单个  batch批量

      // searchType: "default" //搜索状态
    };
  },
  filters: {
    /**
     * 车辆情况
     */
    manageCarType: function(typeValue) {
      let value;
      switch (typeValue) {
        case 1:
          value = "单辆车";
          break;
        case 2:
          value = "暂无车";
          break;
        case 3:
          value = "多辆车";
          break;
        default:
          value = "类型错误";
          break;
      }
      return value;
    },
    /**
     * 提交时间
     */
    submitTime: function(value) {
      let date = new Date(value);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    /**
     *处理跟进状态
     */
    manageStatus: function(value) {
      if (+value === 0) {
        return "未跟进";
      }
      if (+value === 1) {
        return "已跟进";
      } else {
        return "数据错误";
      }
    }
  },
  created() {
    if (sessionStorage.getItem("carLoanCache")) {
      let cache = JSON.parse(sessionStorage.getItem("carLoanCache"));

      let { nameOrTel, status, carType, currentPageNumber } = cache;
      this.nameOrTel = nameOrTel;
      this.status = status;
      this.carType = carType;
      this.currentPageNum = currentPageNumber;
      this.$set(this.currentSearch, "nameOrTel", nameOrTel);
      this.$set(this.currentSearch, "status", status);
      this.$set(this.currentSearch, "carType", carType);

      this.gainLoanData("default");
    } else {
      // this
      // 获取贷款列表数据
      this.gainLoanData("default");
    }
  },
  methods: {
    /**
     * 获取贷款列表数据
     */
    gainLoanData: function(state, query) {
      let { nameOrTel, status, carType } = this;
      let tokens = localStorage.getItem("tokens");
      // this.searchType = state;
      // 判断是搜索还是普通情况
      if (state === "default") {
      } else if (state === "search") {
        this.currentPageNum = 1;
      }
      this.$axios
        .get(request.testUrl + "/product/auth1/loanInfo/getDataList", {
          params: {
            current: this.currentPageNum,
            size: this.currentPageSize,
            nameOrPhone:nameOrTel,
            status,
            carType
          }
        })
        .then(res => {
          let result = res.data.data.records;
          this.allPageNum = res.data.data.total;
          if (result.length < 10) {
            this.loanData = new Array(result.length);
          } else {
            this.loanData = new Array(this.currentPageSize);
          }
          result.forEach((item, index) => {
            this.loanData.splice(index, 1, item);
          });
        });
    },
    /**
     * 查看
     */
    getLoanDetail: function(id) {
      let { carType, nameOrTel, status } = this.currentSearch;
      let options = {
        currentPageNumber: this.currentPageNum,
        carType,
        nameOrTel,
        status
      };
      console.log(options)
      sessionStorage.setItem("carLoanCache", JSON.stringify(options));
      this.$router.push({
        path: "/车位贷款详情",
        query: {
          id
        }
      });
    },
    /**
     * 单个删除
     */
    singleDelete: function(index) {
      this.$confirm("你真的要抛弃我吗!亲!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "放过你吧",
        type: "warning"
      })
        .then(() => {
          let id = this.loanData[index].id;
          this.deleteLoan([id]);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * 批量删除
     */
    batchDelete: function() {
      if (this.selectDataArr.length == 0) {
        return false;
      }

      this.$confirm("你真的要抛弃我吗!亲!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "放过你吧",
        type: "warning"
      })
        .then(() => {
          this.deleteLoan([...this.selectDataArr]);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * 删除请求
     */
    deleteLoan: function(idArr) {
      this.$axios
        .post(request.testUrl + "/product/auth1/loanInfo/delBatch", idArr)
        .then(res => {
          if (res.data.code === 0) {
            this.gainLoanData("default");
            this.$message({
              message: "删除成功！",
              type: "success"
            });
          }
        });
    },
    /**
     * 打开跟进窗口  查询当前跟进信息
     */
    openFollowWindow: function(index, state) {
      this.followWindow = true;
      this.$set(this.formData, "followName", "");
      this.$set(this.formData, "followRemark", "");
      if (state === "batch") {
        this.followState = state;
      } else if (state === "single") {
        let id = this.loanData[index].id;
        this.currentFollowId = id;
        this.followState = state;
        this.$axios({
          url: request.testUrl + "/product/auth1/loanInfo/getOneData",
          method: "post",
          params: {
            id
          }
        }).then(res => {
          let { followName, followRemark } = res.data.data;
          console.log(followName, followRemark);

          if (followName) {
            this.$set(this.formData, "followName", followName);
          }
          if (followRemark) {
            this.$set(this.formData, "followRemark", followRemark);
          }
        });
      }
    },
    /**
     * 确认跟进
     */
    affirmFollow: function() {
      if (this.followState === "single") {
        this.singleFollow();
      } else if (this.followState === "batch") {
        this.batchFollow();
      }
    },
    /**
     * 单个跟进
     */
    singleFollow: function() {
      this.followLoan([this.currentFollowId]);
    },
    /**
     * 批量跟进
     */
    batchFollow: function() {
      if (this.selectDataArr.length == 0) {
        this.$message({
          message: "请先选择要跟进的项！",
          type: "success"
        });
        return false;
      }
      this.followLoan([...this.selectDataArr]);
    },
    /**
     *  跟进请求
     */
    followLoan: function(followArr) {
      let { followName, followRemark } = this.formData;
      if (!followName || !followRemark) {
        this.$message({
          message: "跟进人员和跟进意见不能为空！",
          type: "success"
        });
      }
      this.$axios
        .post(
          request.testUrl +
            "/product/auth1/loanInfo/updBatch?followName=" +
            followName +
            "&followRemark=" +
            followRemark,
          followArr
        )
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "跟进成功！",
              type: "success"
            });
            // 初始化
            this.$set(this.formData, "followName", "");
            this.$set(this.formData, "followRemark", "");
            this.followWindow = false;
            // 刷新数据
            this.gainLoanData("default");
          }
        });
    },
    /**
     * 切换页
     */
    cutCurrentPage: function(pageNum) {
      this.currentPageNum = pageNum;
      if (sessionStorage.getItem("carLoanCache")) {
        let cache = JSON.parse(sessionStorage.getItem("carLoanCache"));
        cache.currentPageNumber = this.currentPageNum;
        sessionStorage.setItem("carLoanCache", JSON.stringify(cache));
        this.gainLoanData("default");
      } else {
        this.gainLoanData("default");
      }
    },
    /**
     *查询
     */
    queryLoanData: function() {
      let { nameOrTel, status, carType } = this;
      this.$set(this.currentSearch, "nameOrTel", nameOrTel);
      this.$set(this.currentSearch, "status", status);
      this.$set(this.currentSearch, "carType", carType);
      let options = {
        carType,
        nameOrTel,
        status,
        currentPageNumber:1
      };
      sessionStorage.setItem("carLoanCache", JSON.stringify(options));
      this.gainLoanData("search");
    },
    /**
     *批量选择贷款记录
     */
    selectChange: function(selection) {
      this.selectDataArr = [];
      selection.forEach(item => {
        this.selectDataArr.push(item.id);
      });
    },
    /**
     * 导出车位贷款信息
     */
    exportLoanData: function() {
      let { nameOrTel = "", status = "", carType = "" } = this;
      this.$axios({
        url: request.testUrl + "/product/auth1/loanInfo/loadExcel",
        methods: "get",
        responseType: "blob",
        params: {
          nameOrTel,
          status,
          carType
        }
      }).then(res => {
        console.log(res.data);
        if (!res) return;
        let blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf8"
        });
        var downloadElement = document.createElement("a");
        //创建下载的链接
        var href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        //下载文件名
        downloadElement.download = "车位贷款记录excel.xls";
        document.body.appendChild(downloadElement);
        // 点击下载
        downloadElement.click();
        // 下载完移除
        document.body.removeChild(downloadElement);
        // 释放掉blob对象
        window.URL.revokeObjectURL(href);
      });
    }
  }
};
</script>

<style scope>
* {
  box-sizing: border-box;
}
.wrap {
  width: 100%;
  padding: 10px 30px;
  position: relative;
  overflow: hidden;
}

.wrap .head {
  height: 85px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 25px 0;
  background-color: #fff;
}

.wrap .head .left {
  display: flex;
  width: 40%;
  height: 100%;
  align-items: center;
}

.wrap .head .right {
  display: flex;
  justify-content: flex-end;
  width: 60%;
  height: 100%;
  align-items: center;
}

.wrap .head .el-input {
  width: 180px;
  margin-right: 30px;
}

.wrap .btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrap .btn a {
  color: rgb(0, 0, 255);
}
.wrap .btn a:hover {
  text-decoration: underline;
}
</style>