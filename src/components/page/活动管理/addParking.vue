<template>
  <div>
  	<div class="info">
				<div class="title">
					<span class="f1"></span>添加活动车位
				</div>
	    <el-form :model="form" class="chess">
	      <el-form-item style="width: 320px;float: left;margin-left: 20px;">
	          <el-input v-model="form.keyword" placeholder="请输入车位名称" style="width: 200px;"></el-input>
	          <el-button @click="check"  icon="el-icon-search" style="margin-left: -4px;">查询</el-button>
	      </el-form-item>
	      <el-form-item style="float: right;margin-right: 20px;">
	          <el-select v-model="form.region" placeholder="请选择区域" @change="provinceChange" style="width: 120px;"> 
							<el-option  :label="item.name" :value="item.id" v-for='item in provinceList' :key='item.id'></el-option>
						</el-select>
						<el-select v-model="form.storey" placeholder="请选择楼层" @change="storeyChange" style="width: 120px;">
							<el-option  :label="item.name" :value="item.id" v-for='item in storeyList' :key='item.id'></el-option>
						</el-select>
						<el-select v-model="form.building" placeholder="请选择楼栋" style="width: 120px;">
							<el-option  :label="item.name" :value="item.id" v-for='item in buildingList' :key='item.id'></el-option>
						</el-select>
	      </el-form-item>
	    </el-form>
	
	    <div class="table">
	      <!--表格-->
	      <el-table :data="activityCarList" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
	      	<el-table-column type="selection" align="center"></el-table-column>
	        <el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
	        <el-table-column prop="name" label="车位名称" align="center"></el-table-column>
	        <el-table-column prop="" label="区域" align="center"></el-table-column>
	        <el-table-column prop="" label="表价" align="center"></el-table-column>
	        <el-table-column prop="" label="底价" align="center"></el-table-column>
	      </el-table>
	
	      <!--分页器-->
	      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize" :total="total" layout="total, sizes, prev, pager, next,jumper">
	      </el-pagination>
	
	    
	    </div>
	  </div>
  </div>
</template>

<script>
export default {
	inject:['reload'],//注入依赖
  name: "addParking",
  data() {
    return {
      form: {
      	
      },
      provinceList:[],
      storeyList:[],
      buildingList:[],
      activityCarList: [],
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
    //搜索查询
    check() {
    	
    },
    //表格全选
	handleSelectionChange(val) {
    	this.multipleSelection = val;
    },
    //区域选择
    provinceChange(){
    	
    },
    //楼层选择
    storeyChange(){
    	
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
  .info{
		width:96% ;
		margin:40px auto;
	}
	.info .title{
		width: 100%;
		height: 40px;
		line-height: 40px;
		color: #000000;
		font-size:20px ;
		text-indent: 10px;
		margin-bottom: 20px;
	}
	.info .title .f1{
		display: inline-block;
		width: 20px;
		height: 100%;
		background:#9768e5 ;
		float: left;
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