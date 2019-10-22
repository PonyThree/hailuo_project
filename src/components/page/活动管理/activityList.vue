<template>
  <div>
    <div class="info">
      <!-- 头部 -->
      <div class="title">
        <span class="f1"></span>
        <div>
          <span>活动管理</span>
          <span>首页/ 活动管理 /活动列表</span>
        </div>
      </div>
      <!-- 搜索 -->
      <!-- <div class="search">
        <el-form ref="form" :model="form" :inline="true">
          <el-form-item  style="margin-top:30px;margin-left:33px;">
            <el-input placeholder="请输入内容" v-model="form.txt" class="input-with-select" style="width:260px;">
              <el-select v-model="selectNum" slot="prepend"  @change="selectChange">
                <el-option label="名称" :value="1"></el-option>
                <el-option label="活动编号" :value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label-width="100px" style="margin-top:30px;margin-left:310px;">
            <el-form-item label="选择时间:">
              <el-date-picker v-model="form.startTime" type="datetime" placeholder="开始时间" value-format="timestamp"></el-date-picker>~
              <el-date-picker v-model="form.endTime" type="datetime" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-top:30px;margin-left:310px;">
            <el-button type="primary" icon="el-icon-search" @click="searchData(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>  -->
      <div class="search">
         <el-form :model="form" class="chess" style="margin:60px auto;width:96%;" inline>
          <el-form-item style="width: 600px;margin-left:20px;">
            <!-- <span style="padding:0 10px;color:#000000;">搜索关键字</span> -->
            <!-- <el-input v-model="form.keyword" placeholder="车位名称/用户昵称/联系电话" style="width: 200px;"></el-input> -->
            <!-- <el-button @click="check" icon="el-icon-search" style="margin-left: -4px;">查询</el-button> -->
            <div style="margin-top: 15px;width:500px;">
              <el-form-item  style="margin-top:30px;margin-left:33px;">
                <!-- <el-input v-model="form.txt" placeholder="名称/活动编号" style="width:200px;"></el-input> -->
                <el-input placeholder="请输入内容" v-model="form.txt" class="input-with-select" style="width:260px;">
                  <el-select v-model="selectNum" slot="prepend"  @change="selectChange">
                    <el-option label="名称" :value="1"></el-option>
                    <el-option label="活动编号" :value="2"></el-option>
                  </el-select>
                  <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item style="margin-right: 20px;margin-top:45px;float:right;">
              <el-button type="default" icon="el-icon-search" @click="searchData(1)">搜索</el-button>
          </el-form-item>
          <el-form-item label-width="100px" style="margin-right: 100px;margin-top:45px;">
                <el-form-item label="选择时间:">
                  <el-date-picker v-model="form.startTime" type="datetime" placeholder="开始时间" value-format="timestamp"></el-date-picker>~
                  <el-date-picker v-model="form.endTime" type="datetime" placeholder="结束时间" value-format="timestamp"></el-date-picker>
                </el-form-item>
          </el-form-item>
        </el-form>
      </div>
     
      <div class="acTable">
        <!-- 表头部 -->
        <div class="acHead">
          <p>活动列表</p>
          <div>
            <!-- <el-button type="primary" icon="el-icon-upload2" @click="exportActList">导出</el-button> -->
            <el-button type="primary" @click="setRel">设置活动规则</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addActivity">添加活动</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-top:20px;"
          @selection-change="handleSelectionChange" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="nomber" label="活动编号" width="120">
            <template slot-scope="scope">{{ scope.row.actCode }}</template>
          </el-table-column>
          <el-table-column prop="actName" label="活动名称" width="140"></el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="140"></el-table-column>
          <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="controline" label="上线/下线" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                <el-switch v-model="scope.row.online" active-text="上线" inactive-text="下线" @change="changeStatus(scope.$index,scope.row.id,scope.row.online)" v-if="scope.row.actStatus!=3"></el-switch>
                <span v-if="scope.row.actStatus==3" style="color:#aaaaaa;font-size:16px;text-align:center;margin-left:36px;">N/A</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column  label="活动状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                  <span>{{scope.row.actStatus==1?"已开始":scope.row.actStatus==2?"未开始":scope.row.actStatus==3?"已结束":"暂不清楚"}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column  label="操作信息">
            <template slot-scope="scope">
              <div>
                <!-- <span>  </span> -->
                <a  @click="findDetail(scope.row.id)" style="font-size:12px;color:#409EFF;margin-left:10px;">查看</a>
                <a v-if="scope.row.actStatus!=3&&scope.row.online!=1" @click="updateAct(scope.row.id,scope.row.endTime)" style="font-size:12px;color:#409EFF;margin-left:10px;">编辑</a>
                <a  v-if="scope.row.actStatus!=3" @click="actParks(scope.row.id,scope.row.online)" style="font-size:12px;color:#409EFF;margin-left:10px;">活动车位</a>
                <!-- scope.row.actStatus==3||(scope.row.actStatus==0&&scope.row.actStatus==1) -->
                <!-- 除去上线状态都可以删除 -->
                <a  v-if="scope.row.online!=1"  @click="delAct(scope.row.id)" style="font-size:12px;color:#409EFF;margin-left:10px;">删除</a>
              </div>
            </template>
          </el-table-column>
        </el-table> 
        <!--分页器-->
        <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 50]" :page-size="pageSize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
        </el-pagination>
      </div>
    </div>
    <!-- 活动规则弹窗 -->
    <el-dialog
      title="设置活动规则:"
      :visible.sync="show1"
      width="25%"
      :close-on-click-modal="false"
      :show-close="false"
      style="margin-top:6vh;">
      <el-form
        ref="form"
        :model="form"
        label-width="110px"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="设置活动规则:" prop="regulation">
          <textarea name="regular" id="" cols="40" rows="10" v-model="form.regulation" class="regularCol"></textarea>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo">保存</el-button>
        <el-button @click="show1=false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加活动弹窗 -->
    <el-dialog
      title="添加活动:"
      :visible.sync="show2"
      width="25%"
      :close-on-click-modal="false"
      :show-close="false"
      style="margin-top:6vh;">
      <el-form
        ref="form1"
        :model="form1"
        label-width="110px"
        :label-position="labelPosition">
        <el-form-item label="活动名称:" prop="actName">
          <el-input v-model="form1.actName"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 :" style="width: 800px;" prop="startTime">
							<el-date-picker v-model="form1.startTime" type="datetime" @blur="getStartTime" placeholder="设置开始时间" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间 :" style="width: 800px;" prop="endTime" >
							<el-date-picker v-model="form1.endTime" type="datetime" @blur="getEndTime" placeholder="设置结束时间" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="上线/下线 :" style="width: 800px;" prop="jugeLine">
              <el-radio v-model="form1.online" :label="0">下线</el-radio>
              <el-radio v-model="form1.online" :label="1" disabled>上线</el-radio>
              <el-tooltip placement="top">
                <div slot="content">上线活动您需要:<br/>i.&nbsp;项目时间已开盘<br/>i.&nbsp;允许项目车位认购<br/>i.&nbsp;添加您需要的活动车位</div>
                <img src="../../../assets/img/tishi.png" alt="" style="width:12px;height:12px;display:inline-block;margin-left:-20px;padding-top:5px;">
              </el-tooltip>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo1">保存</el-button>
        <el-button @click="show2=false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改活动弹窗 -->
    <el-dialog
      title="修改活动:"
      :visible.sync="show3"
      width="25%"
      :close-on-click-modal="false"
      :show-close="false"
      style="margin-top:6vh;">
      <el-form
        ref="form3"
        :model="form3"
        label-width="110px"
        :label-position="labelPosition">
        <el-form-item label="活动名称:" prop="actName">
          <el-input v-model="form3.actName"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 :" style="width: 800px;" prop="startTime">
							<el-date-picker v-model="form3.startTime" type="datetime" @blur="getStartTime" placeholder="设置开始时间" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间 :" style="width: 800px;" prop="endTime" >
							<el-date-picker v-model="form3.endTime" type="datetime" @blur="getEndTime" placeholder="设置结束时间" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="上线/下线 :" style="width: 800px;" prop="online">
              <el-radio v-model="form3.online" :label="0">下线</el-radio>
              <el-radio v-model="form3.online" :label="1" disabled>上线</el-radio>
              <el-tooltip placement="top" >
                <div slot="content"><h4>上线活动您需要:</h4><br/>i.&nbsp;项目时间已开盘<br/>i.&nbsp;允许项目车位认购<br/>i.&nbsp;添加您需要的活动车位</div>
                <img src="../../../assets/img/tishi.png" alt="" style="width:12px;height:12px;display:inline-block;margin-left:-20px;padding-top:5px;">
              </el-tooltip>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo3">保存</el-button>
        <el-button @click="show3=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
var data={};
export default {
  inject:['reload'],
  data() {
    return {
      //默认选择名称
      selectNum:1,
      tableData:[],
      labelPosition:'left',
      show1:false,
      
      // 活动规则
      form: {
        regulation:'【活动门槛】\n需缴纳保证金方可参加活动【活动内容】\n1、活动期间，用户发起活动，邀请好友\n2、奖品将直接发放到用户账户中\n活动奖品数量有限，领完即止'
      },
      currentPage:1,
      pageSize:10,
      total:0,
      //添加活动
      show2:false,
      //活动
      form1:{
        online:0
      },
      // 活动修改
      show3:false,
      form3:{},
      rules:{
          regulation:{require:true,message:'请填写活动规则',trigger:'blur'}
        }
    }
  },
  
  created(){
    this.searchData(1)
  },
  methods: {
        // 搜索
        searchData(currentPage){
          let data={};
          if(currentPage==undefined){
            data.page=this.currentPage
          }else{
            data.page=currentPage;
          }
          data.pageSize=this.pageSize;
          if(this.form.txt){
            data.actName=this.form.txt
          }
          if(this.form.startTime){
            data.startTime=this.form.startTime
          }
          if(this.form.endTime){
            data.endTime=this.form.endTime
          }
          if(this.selectNum==1){
            data.actName=this.form.txt
          }
          if(this.selectNum==2){
            data.actCode=this.form.txt
          }
          // console.log(data);
          this.$axios({
            method:'post',
            url:request.testUrl+"/activity/auth1/activityTab/pageList",
            data:JSON.stringify(data)
          }).then(res=>{
            if(res.data.code==0){
              if(res.data.data.records.length>0){
                res.data.data.records.forEach(item=>{
                item.startTime=handleTime.getTime1(item.startTime)
                item.endTime=handleTime.getTime1(item.endTime)
                item.online=item.online==1?true:false;
                })
                // console.log(res.data.data)
                
                   this.tableData=res.data.data.records;
                    this.total=res.data.data.total;
                    // this.$message({
                    //   type:'success',
                    //   message:'查询成功'
                    // })
              }
            }else{
               this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          })
        },
        // 修改上下线
        changeStatus(i,id,online){
          // console.log(id+"===="+online)
          var params=new URLSearchParams();
          params.append("id",id);
          var that=this;
          if(online){
            params.append("onlineStatus",1);
          }else{
            params.append("onlineStatus",0);
          }
          this.$axios.post(request.testUrl+"/activity/auth1/activityTab/updateOnline",params).then(res=>{
            if(res.data.code==0){
              that.$message({
                type:'success',
                message:'修改成功'
              })
              this.reload();
              // let lock=setTimeout(()=>{
              //   this.reload();
              //   clearTimeout(lock)
              // },1000)
            }else{
              
              console.log(this.tableData);
              that.$message({
                type:'error',
                message:res.data.msg
              })
              
              // that.tableData[i].online=false;
              setTimeout(()=>{
                that.tableData[i].online=false;
              },100)
            }
          })
        },
        // 跳转活动车位列表
        actParks(id,online){
          this.$router.push({
            path:'/活动车位列表',query:{
              id,
              online
            }
          })
          localStorage.setItem('online',online)
        },
        //编辑活动
        updateAct(id,endTime){
          // 获取当前本机时间
          var currentTime=new Date().getTime();
          var endTime1=new Date(endTime).getTime()
          // console.log(currentTime,endTime1)
          //本机时间大于结束时间时 刷新页面 改变状态为NaN
          if(currentTime>=endTime1){
            this.reload();
          }
          this.show3=true;
          //查询单个活动数据
          var params=new URLSearchParams()
          params.append("actId",id)
          this.$axios.post(request.testUrl+"/activity/inner/activityTab/findById",params).then(res=>{
            if(res.data.code==0){
              // console.log(res.data.data)
              this.form3=res.data.data
              this.searchData(1)
            }
          })
        },
        // 修改保存活动按钮
        saveInfo3(){
           this.$axios({
            method:'post',
            url:request.testUrl+"/activity/auth1/activityTab/updateActivity",
            data:JSON.stringify(this.form3)
            }).then(res=>{
              if(res.data.code==0){
                this.$message({
                  type:'success',
                  message:'修改成功'
                })
                this.reload();
                // let lock=setTimeout(()=>{
                //   // this.searchData(1)
                //   this.reload();
                //   clearTimeout(lock)
                // },1000)
                
                // this.$router.go(0)
              }else{
                this.$message({
                  type:'error',
                  message:res.data.msg
                })
              }
          })
        },
        // 删除单个活动
        delAct(id){
          this.$confirm('此操作将会删除该文件,是否继续?','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }).then(()=>{
              var params=new URLSearchParams()
            params.append("id",id)
            this.$axios.post(request.testUrl+"/activity/auth1/activityTab/deleteActivity",params).then(res=>{
              if(res.data.code==0){
                this.$message({
                  type:'success',
                  message:'删除成功'
                })
                this.reload() 
              }else{
                this.$message({
                  type:'error',
                  message:res.data.msg
                })
              }
            })
          }).catch(()=>{
              this.$message({
                  type:'info',
                  message:'以取消删除'
                })
          })
          // /activity/auth1/activityTab/deleteActivity
        },
        //选择项数据
        handleSelectionChange(e) {

        },
        // 设置活动规则
        setRel(){
          this.show1=true;
        },
        //活动规则保存按钮
        saveInfo(){
          // console.log(this.regulation)
          var data={};
          // 活动类型
          data.actType=1;
          data.content=this.form.regulation;
          this.$axios({
            method:'post',
            url:request.testUrl+"/activity/auth1/activityRule/updateRule",
            data:JSON.stringify(data)
          }).then(res=>{
            if(res.data.code==0){
              this.$message({
                type:'success',
                message:'新增成功'
              })
              this.show1=false;
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          })
          this.show1=false;
        },
        // 添加活动按钮
        addActivity(){
          this.show2=true;
        },
        findDetail(id){
          console.log(id)
          this.$router.push({
            path:'查看活动',
            query:{
              actId:id
            }
          })
        },
        //添加活动保存按钮
        saveInfo1(){
          if(this.form1.startTime&&this.form1.endTime){
            if(this.form1.startTime==this.form1.endTime){
              this.form1.endTime='';
              this.$message({
                type:'warning',
                message:'请重新选择结束时间'
              })
              return ;
            }
          }
          if(this.form1.endTime<=this.form1.startTime){
            this.form1.endTime='';
              this.$message({
                type:'warning',
                message:'结束时间需大于开始时间'
              })
              return ;
          }
          this.show2=false;
          // console.log(this.form1)
          this.$axios({
            method:'post',
            url:request.testUrl+"/activity/auth1/activityTab/updateActivity",
            data:JSON.stringify(this.form1)
            }).then(res=>{
              if(res.data.code==0){
                this.$message({
                  type:'success',
                  message:'新增成功'
                })
                let lock=setTimeout(()=>{
                  this.searchData(1)
                  // this.reload()
                  clearTimeout(lock)
                },1000)
                
              }else{
                this.$message({
                  type:'error',
                  message:res.data.msg
                })
              }
          })
        },
        selectChange(){
          // alert(this.selectNum)
        },
        //获得开始时间
        getStartTime(){

        },
        // 获得结束时间
        getEndTime(){

        },
        // 导出活动列表
			exportActList(){
				this.$axios({
					method:'post',
					url:request.testUrl+"/activity/auth1/activityTab/report",
					headers:{
						'content-type':'application/x-www-form-urlencoded'
					},
					responseType:'blob'
					}).then(res=>{
						console.log(res.data)
						if(!res) return 
						let blob=new Blob([res.data],{type:'application/vnd.ms-excel;charset=utf8'})
						var downloadElement=document.createElement('a');
						//创建下载的链接
						var href=window.URL.createObjectURL(blob)
						downloadElement.href=href;
						//下载文件名
						downloadElement.download="活动列表excel.xls";
						document.body.appendChild(downloadElement);
						// 点击下载
						downloadElement.click();
						// 下载完移除
						document.body.removeChild(downloadElement);
						// 释放掉blob对象
						window.URL.revokeObjectURL(href);
					}).catch(error=>{
						console.log(error)
				})
			},
        //分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
          // delete data.currentPage
          //   data.currentPage=currentPage;
		         this.searchData(currentPage);
		    },
        handleSizeChange(size){
          this.pageSize = size; //每页下拉显示数据
          this.searchData(this.currentPage);
        },

        
  }
}
</script>
<style>
.el-button--primary {
  color: white!important;
  background-color: #9768e5 !important;
  border-color: #9768e5!important;
}
.el-button--text {
    color: #409EFF!important;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
}
.info {
  width: 98%;
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
/* 查询 */
.search {
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 100%;
  height: 128px;
  background-color: #f8f8f8;
}
/* 活动表 */
.acTable {
  width: 100%;
}
.acHead {
  display: flex;
  box-sizing: border-box;
  padding: 0 30px;
  height: 60px;
  margin-top: 40px;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: space-between;
}
.tableHead{
	font-size: 14px;
	letter-spacing: 1px;
}
.regularCol{
  color: #aaaaaa;
}
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>