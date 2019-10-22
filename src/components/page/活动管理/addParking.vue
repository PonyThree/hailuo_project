<template>
  <div>
    <div class="info">
      <div class="title">
        <span class="f1"></span>添加活动车位
      </div>
      <el-form :model="form" class="chess" inline>
        <el-form-item style="width: 320px;margin-left: 20px;">
          <el-input v-model="form.name" placeholder="请输入车位名称" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 20px;">
          <el-select
            v-model="form.leave1"
            placeholder="请选择区域"
            @change="provinceChange"
            style="width: 120px;margin-right: 20px;"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in level1Info"
              :key="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.leave2"
            placeholder="请选择楼栋"
            style="width: 120px;margin-right: 20px;"
            @change="buildChange"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in level2Info"
              :key="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.leave3"
            placeholder="请选择楼层"
            @change="storeyChange"
            style="width: 120px;margin-right: 20px;"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in level3Info"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button @click="checkData" icon="el-icon-search" style="margin-left: -4px;">查询</el-button>
        </el-form-item>
      </el-form>
	  <div class="addBtn">
		  <el-button type="primary" size="small" @click="addActParking">批量添加活动车位</el-button>
	  </div>
      <div class="table">
        <!--表格-->
        <el-table
          :data="activityCarList"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          border
          style="width: 100%;margin: 0 auto;"
          :header-cell-style="{background:'#dcd3ef',color:'#606266'}"
          header-row-class-name="tableHead"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
          <el-table-column prop="name" label="车位名称" align="center"></el-table-column>
          <el-table-column  label="区域" align="center" prop="area">
            <template slot-scope="scope">
              <div>
                  <span>{{scope.row.level1Name}}{{scope.row.level2Name}}{{scope.row.level3Name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="facePrice" label="表价" align="center"></el-table-column>
          <el-table-column prop="floorPrice" label="底价" align="center"></el-table-column>
        </el-table>

        <!--分页器-->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50,100]"
          :page-size="pagesize"
          :total="total"
          layout="total, sizes, prev, pager, next,jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入依赖
  name: "addParking",
  data() {
    return {
      form: {},
      provinceList: [],
      storeyList: [],
      buildingList: [],
      activityCarList: [],
      //   区
      level1Info: [],
      //   栋
      level2Info: [],
      // 层
      level3Info: [],
      //分页
      currentPage: 1, //默认显示第一页
      pagesize: 10, //每页的数据
      total: 0,
      //   多选取值
      multipleSelection: [],
      id:this.$route.query.id
    };
  },
  watch: {
    $route(to, from) {}
  },
  created() {
    console.log(this.id)
    //搜索查询
    this.check(1);
    //渲染区域列表
    this.$axios
      .get(request.testUrl + "/product/auth1/truckSpaceArea/selectAllList")
      .then(res => {
        if (res.data.code == 0) {
          this.level1Info = res.data.data;
        }
      });
    //渲染楼栋三级列表
    this.$axios
      .get(
        request.testUrl + "/product/auth1/TruckSpaceLevelThree/doSelectAllList"
      )
      .then(res => {
        if (res.data.code == 0) {
          this.level3Info = res.data.data;
        }
      });
    //渲染楼栋二级列表
    this.$axios
      .get(
        request.testUrl + "/product/auth1/TruckSpaceLevelTwo/doSelectAllList"
      )
      .then(res => {
        if (res.data.code == 0) {
          this.level2Info = res.data.data;
        }
      });
  },
  methods: {
    //   /product/auth1/activityTruckSpace/pageTruckSpace
    //搜索查询
    check(currentPage) {
      if (currentPage == undefined) {
        currentPage = this.currentPage;
      } else {
        this.currentPage = currentPage;
      }
      var params = new URLSearchParams();
      params.append("current",  this.currentPage);
      params.append("size", this.pagesize);
      params.append("actId", this.$route.query.id);
      if (this.form.name) {
        params.append("name", this.form.name);
      }
      if (this.form.leave1) {
        params.append("leave1", this.form.leave1);
      }
      if (this.form.leave2) {
        params.append("leave2", this.form.leave2);
      }
      if (this.form.leave3) {
        params.append("leave3", this.form.leave3);
      }
      // current pages
      this.$axios
        .post(
          request.testUrl + "/product/auth1/activityTruckSpace/pageTruckSpace",
          params
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            console.log(res.data.data);
            // res.data.data.records.forEach(item=>{
            //   item.area=item.
            // })
            this.activityCarList=res.data.data.records;
            this.total=res.data.data.total;
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        });
    },
    checkData(){
      this.check(1)
    },
    //表格全选
    handleSelectionChange(val) {
    console.log(val)
	  var ascs = [];
    val.forEach(item=>{
      ascs.push({"truckSpaceId":item.truckSpaceId})
    })
    console.log(ascs)
	  this.multipleSelection =ascs;
	},
	// 批量添加活动车位按钮
	addActParking(){
    var that=this;
    console.log(this.id)
		if(this.multipleSelection.length>0){
			this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/addList",JSON.stringify({
				"actId":this.id,
				"dtos":this.multipleSelection
			})).then(res=>{
				if(res.data.code==0){
					this.$message({
						type:'success',
						message:'添加成功'
					})
					var lock=setTimeout(()=>{
            that.$router.push({
              path:'/活动车位列表',query:{
                id:this.id
              }
            })
            clearTimeout(lock)
          },2000)
				}else{
					this.$message({
						type:'error',
						message:res.data.msg
          })
				}
			})
		}else{
      	this.$message({
						type:'warning',
						message:'请先选择车位'
					})
    }
		
	},
    //区域选择
    provinceChange(val) {
      console.log(val)
    },
    // 楼栋选择
    buildChange(val){
      console.log(val)
    },
    //楼层选择
    storeyChange(val) {
      console.log(val)
    },
    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(currentPage) {
      this.check(currentPage)
    },
    handleSizeChange(size) {
      this.pagesize=size;
      this.check(this.currentPage)
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
.info .title .f1 {
  display: inline-block;
  width: 20px;
  height: 100%;
  background: #9768e5;
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
.listTwo {
  width: 100%;
  height: 32px;
  margin-bottom: 30px;
}
.listTwo li {
  display: inline-block;
  line-height: 32px;
  float: right;
  margin-right: 40px;
}
.tableHead {
  font-size: 14px;
  letter-spacing: 1px;
}
.addBtn button{
  float:right;
  margin-right: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>