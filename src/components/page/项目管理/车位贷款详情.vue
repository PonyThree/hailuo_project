<template>
  <div class="wrap">
    <div class="messageItem">
      <div class="title">基本信息</div>
      <div class="box">
        <div class="item" v-for="(item,index) in basic" :key="index+item">
          <div class="label">{{item.name}}</div>
          <div class="content">{{item.value|manageListData(item)}}</div>
        </div>
      </div>
    </div>
    <div class="messageItem">
      <div class="title">状态信息</div>
      <div class="box">
        <div class="item" v-for="(item,index) in state" :key="index+item">
          <div class="label">{{item.name}}</div>
          <div class="content">{{item.value|manageListData(item)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      basic: [
        {
          title: "loanName",
          value: "",
          name: "真实姓名"
        },
        {
          title: "loanMoney",
          value: "",
          name: "贷款金额"
        },
        {
          title: "loanPhone",
          value: "",
          name: "联系电话"
        },
        {
          title: "loanTime",
          value: "",
          name: "申请年限(年)"
        },
        {
          title: "carType",
          value: "",
          name: "车辆情况"
        },
        {
          title: "regionInfo",
          value: "",
          name: "意向区域"
        }
      ],
      state: [
        {
          title: "operateStatus",
          value: "",
          name: "客户状态"
        },
        {
          title: "followName",
          value: "",
          name: "跟进人员"
        },
        {
          title: "followRemark",
          value: "",
          name: "跟进备注"
        },
        {
          title: "followTime",
          value: "",
          name: "跟进日期"
        }
      ]
    };
  },
  filters: {
    manageListData: function(value, target) {
      let title = target.title;
      let temp = "";
      switch (title) {
        case "carType":
          if (value === 1) {
            temp = "单辆车";
          } else if (value === 2) {
            temp = "暂无车";
          } else if (value === 3) {
            temp = "多辆车";
          }
          break;
        case "operateStatus":
          if (value === 1) {
            temp = "已跟进";
          } else if (value === 0) {
            temp = "未跟进";
          }
          break;
        case "followTime":
          if (!value) {
            return "";
          }
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
        default:
          temp = value;
          break;
      }
      return temp;
    }
  },
  created: function() {
    let id = this.$route.query.id;
    this.$axios
      .post(request.testUrl + "/product/auth1/loanInfo/getOneData?id=" + id)
      .then(res => {
        if (res.data.code === 0) {
          let result = res.data.data;
          let basic = this.basic;
          let state = this.state;
          for (let key in result) {
            basic.forEach(item => {
              if (key === item.title) {
                item.value = result[key];
              }
            });
            state.forEach(item => {
              if (key === item.title) {
                item.value = result[key];
              }
            });
          }
        }
      });
  }
};
</script>
<style scope>
.wrap {
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
}

.wrap .messageItem {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 100px;
}

.wrap .messageItem .title {
  height: 40rpx;
  border-left: 10px solid #9768e5;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  line-height: 40rpx;
  padding-left: 10px;
  margin-bottom: 20px;
}

.wrap .messageItem .box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-bottom: none;
}

.wrap .box .item {
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
}

.wrap .box .item .label {
  width: 120px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  background-color: #eee;
}

.wrap .box .item:nth-of-type(2n) .label {
  border-left: 1px solid #ddd;
}
.wrap .box .item .content {
  overflow: hidden;
  width: calc(100% - 120px);
  padding: 0 30px;
  height: 100%;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
</style>