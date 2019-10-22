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
          <el-input v-model="form.nameOrCode" placeholder="请输入名称或编号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item style="float: right;margin-right: 20px;">
          <el-button @click="searchKey">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
    	<ul class="listTwo">
			<li><el-button  type="primary" @click="importAcCar">导入活动车位</el-button></li>
			<li><el-button  type="primary" @click="addParking">添加车位</el-button></li>
			<li><el-button  type="primary" @click="manFavorablePrice">批量设置优惠金额</el-button></li>
			<li><el-button  type="primary" @click="exportCarList">导出</el-button></li>
			<li><el-button  type="primary" @click="allDel">批量刪除</el-button></li>
		</ul>
      <!--表格-->
      <el-table :data="tableCarList" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
      	<el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
        <!-- <el-table-column  label="车位名称" align="center" prop="actCode"></el-table-column> -->
        <el-table-column prop="name" label="车位名称" align="center" ></el-table-column>
        <el-table-column prop="level1Name" label="区域" align="center"></el-table-column>
        <el-table-column prop="level2Name" label="楼栋" align="center"></el-table-column>
        <el-table-column prop="level3Name" label="层数" align="center"></el-table-column>
        <el-table-column prop="floorPrice" label="底价" align="center"></el-table-column>
        <el-table-column prop="facePrice" label="原销售价" align="center"></el-table-column>
        <el-table-column label="优惠金额" align="center" prop="favorablePrice">
        	<!-- <template slot-scope="scope">
          		<el-input></el-input>
            </template> -->
        </el-table-column>
        <el-table-column prop="spikePrice" label="秒杀价" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a style="color: #409EFF;font-size: 14px;margin-right:20px;" @click="release(scope.row.facePrice,(scope.row.facePrice-scope.row.floorPrice),scope.row.truckSpaceId)">设置</a>
            <a style="color:  #409EFF;font-size: 14px;" @click="del(scope.row.truckSpaceId)">删除</a>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next,jumper">
      </el-pagination>
      <!-- 单个设置活动金额 -->
      <el-dialog title="设置活动金额" :visible.sync="controlMoney" width="30%" :close-on-click-modal="false">
        <el-form ref="formMoney" :model="formMoney">
          <el-form-item label="车位价格:" >
            <span>当前车位差价¥{{formMoney.spread}}</span>
          </el-form-item>
          <el-form-item label="优惠金额:" prop="yhMoney">
            <el-input v-model="formMoney.yhMoney" style="width:100px;margin-right:20px;"></el-input>
            <el-button type="primary" size="small" style="margin-right:10px;" @click="dugeMoney">验证</el-button>
            <span>活动优惠金额需小于销售价和底价之差</span>
          </el-form-item>
          <el-form-item v-if="showResult" >
            <span style="color:red;font-size:12px;">金额已超过请重新输入</span>
          </el-form-item>
          <el-form-item label="秒杀价:" v-if="msShow">
            <span ref="msPrice">{{formMoney.msPrice||''}}</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveInfo">保存</el-button>
            <el-button @click="controlMoney=false">取 消</el-button> 
        </span>
      </el-dialog>
      <!-- 批量设置活动优惠金额 -->
       <el-dialog title="批量设置活动优惠金额" :visible.sync="moreControlMoney" width="30%" :close-on-click-modal="false">
        <el-form ref="moreFormMoney" :model="moreFormMoney">
          <el-form-item label="车位信息:" >
            <span>已选择{{moreFormMoney.nub}}个车位</span>
            <span>当前选择车位最低差价:¥{{moreFormMoney.minPrice}}</span>
          </el-form-item>
          <el-form-item label="批量优惠金额:" prop="yhMoney">
            <el-input v-model="moreFormMoney.yhMoney" style="width:100px;margin-right:20px;"></el-input>
            <el-button type="primary" size="small" style="margin-right:10px;" @click="dugeMoney1">验证</el-button>
            <span>活动优惠金额需小于销售价和底价之差</span>
          </el-form-item>
          <el-form-item v-if="showResult1" >
            <span style="color:red;font-size:12px;">金额已超过请重新输入</span>
          </el-form-item>
           <el-form-item v-if="showResult2">
            <span style="color:#0f0;font-size:12px;">验证成功</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveInfo1">保存</el-button>
            <el-button @click="moreControlMoney=false">取 消</el-button> 
        </span>
      </el-dialog>
    
    </div>
  </div>
</template>

<script>
export default {
	inject:['reload'],//注入依赖
  name: "activityCarList",
  data() {
    return {
      controlMoney:false,
      showResult:false,
      showResult1:false,
      showResult2:false,
      // msPrice:0,
      // 活动金额
      formMoney:{},
      form: {
      	
      },
      //当前的表价
      currentFacePrice:'',
      // 当前车位id值
      currentId:'',
      // 活动id
      actId:'',
      // 批量设置金额
      moreControlMoney:false,
      moreFormMoney:{

      },
      msShow:false,
      tableCarList: [],
      //分页
      currentPage: 1, //默认显示第一页
      pageSize: 10, //每页的数据
      total: 0,
      // 活动id
      id:this.$route.query.id,
      //上下线,
      online:'',
      // 批量设置车位号
      multipleSelection:[],
    };
  },
  watch: {
    '$route'(to, from){
      
    }
  },
  created(){
    // localStorage.setItem('online',this.$route.query.online)
    console.log(localStorage.getItem('online'))
    this.check(1)
    this.online=this.$route.query.online||localStorage.getItem('online');
    console.log(this.online)
  },
  watch:{
    $route(to,from){
      if(to.path=="/活动车位列表"){
        this.check(1)
      }
    }
  },
  methods: {
    //导入活动车位
    importAcCar(){
      this.$router.push({path:'/导入活动车位',query:{
        id:this.id
      }});
    },
    // 单个设置
    release(facePrice,spread,id){
      this.showResult=false;
      this.formMoney.spread=spread;
      this.controlMoney=true;
      console.log(this.formMoney)
      this.currentFacePrice=facePrice;
      this.currentId=id;
    },
    // 单个验证
    dugeMoney(){
      var reg=/\d/ig;
      // console.log(Number(this.formMoney.yhMoney))
      // /^\+?[1-9][0-9]*$/
      if(Number(this.formMoney.yhMoney).toString() == "NaN"){
        this.$message({
          type:'warning',
          message:'请输入一个数字类型的值'
        })
        return ;
      }else{
        if(this.formMoney.yhMoney>0){
          if(this.formMoney.yhMoney>this.formMoney.spread){
            this.showResult=true;
            // this.formMoney.msPrice='';
            this.msShow=false;
            return ;
          }else{
            this.showResult=false;
            // this.formMoney.msPrice='';
            console.log(this.formMoney.yhMoney)
            this.msShow=true;
              // 设置秒杀价=表价-优惠金额
              this.$set(this.formMoney,'msPrice',this.currentFacePrice-this.formMoney.yhMoney)
          }
        }else{
          this.$message({
            type:'warning',
            message:'请输入一个大于零的数字'
          })
          return ;
        }
      }
    },
    // 单个保存
    saveInfo(){
      console.log(this.showResult)
      // 当不超过时才发请求
      if(this.showResult==false&&this.msShow==true){
        var params=new URLSearchParams()
        console.log(this.formMoney.yhMoney)
        if(this.formMoney.yhMoney!=undefined){
            params.append("favorablePrice",this.formMoney.yhMoney)
            var ids=[];
            ids.push(this.currentId)
            // console.log(ids)
            params.append("ids",ids)
            params.append("actId",this.id)
            this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/updData",params).then(res=>{
              if(res.data.code==0){
                this.$message({
                  type:'success',
                  message:'修改成功'
                })
                this.formMoney.yhMoney='';
                this.formMoney.msPrice='';
                this.controlMoney=false;
                this.check()
                // this.reload()
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
              message:'请先设置优惠金额'
            })
            return ;
          }
        }else{
          this.$message({
            type:'warning',
            message:'请先验证优惠金额是否合理'
          })
          return ;
        }
        // console.log(this.formMoney.yhMoney)
        
      
    },
    // 批量设置优惠金额
    manFavorablePrice(){
      this.showResult1=false;
      this.showResult2=false;
      if(this.multipleSelection.length>0){
         // 查询最低价和车位数量
          this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/selMinPrice",JSON.stringify(this.multipleSelection)).then(res=>{
                  if(res.data.code==0){
                    // console.log(res.data.data)
                    delete res.data.data.nub
                    this.moreFormMoney=res.data.data;
                    this.moreFormMoney.nub=this.multipleSelection.length;
                    this.moreControlMoney=true;
                  }else{
                    this.$message({
                      type:'error',
                      message:res.data.msg
                    })
                    return ;
                  }
                })  
              
              }else{
                this.$message({
                  type:'warning',
                  message:'请先至少选择一个车位'
                })
                return;
          } 
        
        
    },
    // 批量设置验证
    dugeMoney1(){
       if(parseFloat(this.moreFormMoney.yhMoney).toString() == "NaN"){
          this.$message({
            type:'warning',
            message:'请输入一个数字类型的值'
          })
          return ;
        }else{
          if(parseFloat(this.moreFormMoney.yhMoney)>0){
            if(parseFloat(this.moreFormMoney.yhMoney)>this.moreFormMoney.minPrice){
              this.showResult2=false;
              this.showResult1=true;
            }else{
              this.showResult1=false;
              this.showResult2=true;
            }
          }else{
            this.$message({
              type:'warning',
              message:'请输入一个大于零的数字'
            })
            return ;
          }
          
      }
    },
    // 批量优惠金额保存
    saveInfo1(){
      var params=new URLSearchParams()
      if(this.moreFormMoney.yhMoney){
        params.append("favorablePrice",this.moreFormMoney.yhMoney)
      }else{
        this.$message({
          type:'error',
          message:'请先设置优惠金额'
        })
        return;
      }
      if(this.showResult1==false&&this.showResult2==true){
        params.append("ids",this.multipleSelection)
        params.append("actId",this.id)
        if(this.multipleSelection.length>0){
          this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/updData",params).then(res=>{
            if(res.data.code==0){
              this.$message({
                type:'success',
                message:'修改成功'
              })
              this.moreControlMoney=false;
              console.log(this.currentPage,this.pageSize)
              this.check()
              // this.reload()
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          })
        }else{
          this.$message({
            type:'error',
            message:'请先选择活动车位'
          })
          return;
        }
      }else{
        this.$message({
          type:'warning',
          message:'请先验证输入的优惠金额'
        })
        return ;
      }
    },
    //搜索查询
    check(currentPage) {
      // console.log(currentPage)
      var params=new URLSearchParams()
      if(currentPage==undefined){
        params.append('current',this.currentPage)
      }else{
        params.append('current',currentPage)
      }
      params.append('size',this.pageSize)
      if(this.form.nameOrCode){
         params.append('nameOrCode',this.form.nameOrCode)
      }
      if(this.id){
        params.append("actId",this.id)
      }
      this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/getActList",params).then(res=>{
        if(res.data.code==0){
                if(res.data.data.records.length>0){
                  // console.log(res.data.data)
                  this.tableCarList=res.data.data.records;
                  this.total=res.data.data.total;
                  this.actId=res.data.data.records[0].actId;
                  // console.log(this.actId)
                  this.$message({
                    type:'success',
                    message:'查询成功'
                  })
                }
              }else{
                this.$message({
                  type:'error',
                  message:res.data.msg
                })
              }
      })
    },
    searchKey(){
      this.check(1)
    },
    //添加车位
    addParking(){
      var id=this.actId;
        this.$router.push({ path: "/添加活动车位",query:{
          id:this.$route.query.id
        }});	
    },
    // 导出
    exportCarList(){

    },
    // 删除
    del(id){
      console.log(localStorage.getItem('online'))
      let online=localStorage.getItem('online')
      //下线才可以删除
      if(online=='false'){
        var params=new URLSearchParams()
        params.append("ids",[id])
        params.append("actId",this.$route.query.id)
        this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/deleteBatch",params).then(res=>{
          if(res.data.code==0){
            this.$message({
              type:'success',
              message:'刪除成功'
            })
            this.reload()
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
          message:'下线状态才可以删除活动车位，请先将活动改为下线状态在进行操作'
        })

      }
      
    },
    // 批量刪除
    allDel(){
      console.log(localStorage.getItem('online'))
      let online=localStorage.getItem('online')
      console.log(online)
      // console.log(this.multipleSelection);
      if(online=='false'){
        var params=new URLSearchParams()
        params.append("ids",this.multipleSelection)
        params.append("actId",this.$route.query.id)
        this.$axios.post(request.testUrl+"/product/auth1/activityTruckSpace/deleteBatch",params).then(res=>{
          if(res.data.code==0){
            this.$message({
              type:'success',
              message:'刪除成功'
            })
            this.reload();
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
          message:'下线状态才可以删除活动车位，请先将活动改为下线状态在进行操作'
        })
      }
    },
    //表格全选
	handleSelectionChange(val) {
      var arr=[];
      val.forEach(item=>{
        arr.push(item.truckSpaceId)
      })
      this.multipleSelection=arr;
      // console.log(this.multipleSelection)
    },
    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(currentPage) {
      this.currentPage=currentPage;
      this.check(currentPage)
    },
    handleSizeChange(size) {
      this.pageSize=size;
      console.log(this.pageSize)
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