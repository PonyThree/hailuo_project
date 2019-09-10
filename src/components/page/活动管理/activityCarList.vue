<template>
  <div>
    <div class="info">
      <div class="title">
        <span class="f1"></span>
        <div>
          <span>活动管理</span>
          <span>首页/ 活动管理 /活动车位列表</span>
        </div>
      </div>
    </div>
    <el-form :model="form" class="chess">
      <el-form-item label="搜索关键字:" style="width: 320px;float: left;margin-left: 20px;">
          <el-input v-model="form.keyword" placeholder="请输入名称或编号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item style="float: right;margin-right: 20px;">
          <el-button @click="check">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
    	<ul class="listTwo">
			<li><el-button  type="primary" @click="importAcCar">导入活动车位</el-button></li>
			<li><el-button  type="primary" @click="addParking">添加车位</el-button></li>
			<li><el-button  type="primary" @click="">删除</el-button></li>
			<li><el-button  type="primary" @click="">反选</el-button></li>
			<li><el-button  type="primary" @click="">全选</el-button></li>
		</ul>
      <!--表格-->
      <el-table :data="tableCarList" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
      	<el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
        <el-table-column prop="num" label="活动编号" align="center"></el-table-column>
        <el-table-column prop="name" label="车位名称" align="center"></el-table-column>
        <el-table-column prop="" label="区域" align="center"></el-table-column>
        <el-table-column prop="" label="层数" align="center"></el-table-column>
        <el-table-column prop="" label="楼栋" align="center"></el-table-column>
        <el-table-column prop="" label="底价" align="center"></el-table-column>
        <el-table-column prop="" label="表价" align="center"></el-table-column>
        <el-table-column label="优惠金额" align="center">
        	<template slot-scope="scope">
          		<el-input></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="" label="秒杀价" align="center"></el-table-column>
        <el-table-column label="排序" align="center">
        	<template slot-scope="scope">
          		<el-input></el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a style="color: #409EFF;font-size: 14px;" @click="release(scope.$index)">删除</a>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize" :total="total" layout="total, sizes, prev, pager, next,jumper">
      </el-pagination>

    
    </div>
  </div>
</template>

<script>
export default {
	inject:['reload'],//注入依赖
  name: "activityCarList",
  data() {
    return {
      form: {
      	
      },
      tableCarList: [],
      //分页
      currentPage: 1, //默认显示第一页
      pagesize: 10, //每页的数据
      total: 0
    };
  },
  watch: {
    '$route'(to, from){
      
    }
  },
  created(){
  	//搜索查询
  	
  },
  methods: {
    //导入活动车位
    importAcCar(){
      this.$router.push({path:'/导入活动车位'});
    },
    //搜索查询
    check() {
    	
    },
    //添加车位
    addParking(){
    	this.$router.push({ path: "/添加车位"});
    },
    //表格全选
	handleSelectionChange(val) {
    	this.multipleSelection = val;
    },
    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(currentPage) {
       
    },
    handleSizeChange(size) {
      
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
.listTwo{
		width: 100%;
		height: 32px;
		margin-bottom: 30px;
	}
.listTwo li{
	display: inline-block;
	line-height: 32px;
	float: right;
	margin-right: 40px;
}
.tableHead{
	font-size: 14px;
	letter-spacing: 1px;
}
</style>