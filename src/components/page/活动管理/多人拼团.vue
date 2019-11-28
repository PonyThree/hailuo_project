<template>
  <div class="wrap">
    <div class="title_box">
      <el-input v-model="activityNumber" class="input_item" placeholder="活动名称/编号"></el-input>
      <el-select v-model="searchState" placeholder="状态" class="input_item">
        <el-option
          v-for="item in stateSelectData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        class="picker_item"
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <div class="table_wrap">
      <div class="table_title">
        <el-button type="primary" @click="addActivity" icon="el-icon-plus">新增活动</el-button>
      </div>
      <div class="content">
        <el-table
          ref="multipleTable"
          :data="activityListData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="address" align="center" label="活动编号"></el-table-column>
          <el-table-column prop="address" align="center" label="活动名称"></el-table-column>
          <el-table-column prop="address" align="center" label="团数量"></el-table-column>
          <el-table-column prop="address" align="center" label="参与人数"></el-table-column>
          <el-table-column prop="address" align="center" label="开始时间"></el-table-column>
          <el-table-column prop="address" align="center" label="结束时间"></el-table-column>
          <el-table-column prop="address" align="center" label="上线/下线"></el-table-column>
          <el-table-column prop="address" align="center" label="状态"></el-table-column>
          <el-table-column prop="address" align="center" label="操作信息"></el-table-column>
        </el-table>
        <el-pagination
          background
          :current-page="currentPageNum"
          :page-size="currentPageSize"
          layout="total, prev, pager, next, jumper"
          :total="activityDataTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activityNumber: "", //搜索活动编号
      searchState: "", //搜索状态
      //   状态值
      stateSelectData: [
        {
          label: "",
          value: "无"
        }
      ],
      date: "", //搜索日期区间
      activityListData: [], //活动列表数据
      activityDataTotal: 200, //活动数据总数
      currentPageSize: 10,
      currentPageNum: 1
    };
  },
  methods: {
    /**
     * 添加活动
     */
    addActivity: function() {
      
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
}

.wrap .title_box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 95px;
  padding: 30px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.wrap .title_box .input_item {
  width: 180px;
  margin-right: 20px;
}

.wrap .title_box .picker_item {
  width: 350px;
  margin-right: 20px;
}

.wrap .table_wrap {
  box-sizing: border-box;
  padding: 20px 30px;
  width: 100%;
  border: 1px solid #eee;
}

.wrap .table_title {
  height: 35rpx;
  margin-bottom: 20px;
}

.wrap .table_wrap .content {
  overflow: hidden;
  width: 100%;
}
</style>