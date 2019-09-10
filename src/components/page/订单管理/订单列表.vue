<template>
  <div>
    <el-form :model="form" class="chess">
      <div style="width: 600px;float: left;margin-left: 50px;">
        <el-form-item label="提交时间:" style="width: 600px;float: left;">
		        <el-date-picker v-model="form.minSubmitTime" type="datetime" placeholder="选择日期时间" style="width: 200px;"></el-date-picker>&nbsp;&nbsp;~&nbsp;&nbsp;
					<el-date-picker v-model="form.maxSubmitTime" type="datetime" placeholder="选择日期时间" style="width: 200px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="支付类型:" style="width: 600px;float: left;">
          <el-select v-model="form.buyType" placeholder="请选择" style="width: 200px;">
          	<el-option label="所有状态" value="" key=""></el-option>
            <el-option label="落位支付" value="1" key="1"></el-option>
            <el-option label="认购支付" value="2" key="2"></el-option>
            <el-option label="购买支付" value="3" key="3"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="width: 600px;height: auto;overflow: hidden;float: right;">
      <!--  <el-button style="float: right;margin-right: 50px;" @click="exported">导出</el-button>-->
        <el-button style="float: right;margin-right: 50px;margin-left: 50px;" @click="check(1)">查询</el-button>
        <el-form-item style="width: 320px;float: right;">
          <el-select v-model="form.type" placeholder="请选择昵称" style="width: 120px;">
            <el-option label="手机号" value="0"></el-option>
            <el-option label="订单编号" value="1"></el-option>
          </el-select>
          <el-input v-model="form.keyword" placeholder="请输入用户手机号或订单编号" style="width: 200px;"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <div class="table">
    	<ul class="listTwo">
				<li><el-button  type="primary" @click="batchTag">批量审核</el-button></li>
				<li><el-button  type="primary" @click="batchDelete()">批量释放</el-button></li>
			</ul>
      <!--表格-->
      <el-table :data="tableList" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%;margin: 0 auto;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
      	<el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
        <el-table-column label="客户昵称" align="center">
        	<template slot-scope="scope">
            <span style="cursor: pointer;" @click="nickname(scope.$index)">{{scope.row.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="submitTime" label="提交时间" align="center"></el-table-column>
        <el-table-column prop="truckSpaceCode" label="车位编号" align="center"></el-table-column>
        <el-table-column prop="buyTypeName" label="支付类型" align="center"></el-table-column>
        <el-table-column prop="money" label="支付金额" align="center"></el-table-column>
        <el-table-column prop="payWayName" label="支付方式" align="center"></el-table-column>
        <el-table-column prop="expire" v-show:'false'></el-table-column>
        <el-table-column prop="subCheck" v-show:'false'></el-table-column>
        <el-table-column prop="orderStatus" v-show:'false'></el-table-column>
        <el-table-column prop="id" v-show:'false'></el-table-column>
        <el-table-column prop="cannel" v-show:'false'></el-table-column>
        <el-table-column prop="expireTime" label="待执行订单有效期" align="center" >
          <template slot-scope="scope">
          	<span v-if="scope.row.orderStatus==1&&scope.row.subCheck==1&&scope.row.buyType!=3" @click="change(scope.$index)" style="color: red;cursor: pointer;">{{scope.row.expireTime}}</span>
            <span v-else-if="scope.row.subCheck==1&&scope.row.buyType!=3" >{{scope.row.expireTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatusName" label="订单状态" align="center"></el-table-column>
        <el-table-column prop="caozuo" label="操作" align="center">
          <template slot-scope="scope">
            <!--<a style="color: #409EFF;font-size: 14px;margin-right: 20px;" @click="cancel(scope.$index)" v-if="scope.row.cannel==0&&scope.row.orderStatus!=0&&scope.row.buyType!=3">退款</a>-->
            <a style="color: #409EFF;font-size: 14px;" @click="checked(scope.$index)">查看</a>
            <a style=" margin-left: 20px; color: #409EFF;font-size: 14px;" @click="release(scope.$index)" v-if="scope.row.orderStatus==2">释放车位</a>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize" :total="total" layout="total, sizes, prev, pager, next,jumper">
      </el-pagination>

      <!--修改订单时间弹出框-->
      <el-dialog title="订单有效期" :visible.sync="visible" width="25%">
        <el-form ref="info" :model="info" label-width="100px">
          <el-form-item label="订单有效期:">
            <span style="color: red;">{{info.expireTime}}</span>
          </el-form-item>
          <el-form-item label="增加时间:">
            <el-select v-model="info.num" placeholder="请选择" style="width: 300px;">
              <el-option  v-for="(item, index) in 30" :key="index" :label="item+'天'" :value="item">{{item}}天</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="false">
            <el-input v-model="info.id"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="info.remark" placeholder="请输入内容" style="width: 300px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="visible=false">取 消</el-button>
        </span>
      </el-dialog>
      
      <!--批量审核弹窗-->
      <el-dialog title="批量审核" :visible.sync="visibles" width="25%">
        <span style="display: block;text-indent: 10px;">是否批量审核！</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saves">审核通过</el-button>
          <el-button @click="pass">审核不通过</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
	inject:['reload'],//注入依赖
  name: "category",
  data() {
    return {
      form: {
      	buyType:'',
      	keyword:'',
      	maxSubmitTime:'',
      	minSubmitTime:'',
      	type:''
      },
      tableList: [],
      info: {
      	expireTime:'',
      	num:'',
      	id:'',
      },
      value: false,
      visible: false,
      visibles:false,
      //分页
      currentPage: 1, //默认显示第一页
      pagesize: 10, //每页的数据
      total: 0
    };
  },
  watch: {
    '$route'(to, from){
      this.check(1)
    }
  },
  created(){
  	//搜索查询
  	this.check(1)
  },
  methods: {
    //搜索查询
    check(currentPage) {
    	if(currentPage==undefined){
				currentPage=this.currentPage
			}else{
				this.currentPage=currentPage;
			}
    	this.$axios({
	    	method:'post',
	    	url:request.testUrl+"/order/auth1/orderForm/pageList",
	    	data:{
	    		current:this.currentPage,
	    		pageSize:this.pagesize,
	    		buyType:this.form.buyType,
	    		keyword:this.form.keyword,
	    		maxSubmitTime:this.form.maxSubmitTime,
	    		minSubmitTime:this.form.minSubmitTime,
	    		type:this.form.type,
	    	}
			}).then(res=>{
				if(res.data.code==0){
					this.total = res.data.data.total
					this.tableList=res.data.data.records
					for(var i=0;i<this.tableList.length;i++){
						if(this.tableList[i].submitTime!=''&& this.tableList[i].submitTime!=undefined){
              var start=this.tableList[i].submitTime;//获取开始时间
							var d = new Date(start);    //根据时间戳生成的时间对象
							var startDate = (d.getFullYear()) + "-" + 
							           (this.addZero(d.getMonth() + 1)) + "-" +
							           (this.addZero(d.getDate())) + " " + 
							           (this.addZero(d.getHours())) + ":" + 
							           (this.addZero(d.getMinutes())) + ":" + 
							           (this.addZero(d.getSeconds()));      
							this.tableList[i].submitTime=startDate;//赋值
						}
						if(this.tableList[i].expireTime!=''&& this.tableList[i].expireTime!=undefined){
							var end=this.tableList[i].expireTime;//结束时间
							var b = new Date(end);    //根据时间戳生成的时间对象
							var endDate = (b.getFullYear()) + "-" + 
							           (this.addZero(b.getMonth() + 1)) + "-" +
							           (this.addZero(b.getDate())) + " " + 
							           (this.addZero(b.getHours())) + ":" + 
							           (this.addZero(b.getMinutes())) + ":" + 
							           (this.addZero(b.getSeconds()));  
							this.tableList[i].expireTime=endDate;//赋值
							
						}
						
					}
				}else{
					this.$message({
						type: 'info',
						message: res.data.msg
					});
				}
			})
    },
    // 时间站位+0
    addZero (n) {
      return n < 10 ? '0' + n : n
    },
    //客户昵称按钮
    nickname(index){
    	this.$router.push({ path: "/客户管理", query: { name: this.tableList[index].nickname}});
    },
    //表格全选
	 	handleSelectionChange(val) {
    	this.multipleSelection = val;
    },
    //批量审核
    batchTag(){
    	this.visibles=true
    },
    //批量审核通过
    saves(){
    	let id=[]
			let list=this.multipleSelection
			for(let i in list){
				id.push(list[i].id)
			}
			this.$axios({
	        	method:'post',
	        	url:request.testUrl+"/order/auth1/orderForm/subPayCheckBatchOk",
	        	data:id
			}).then(res=>{
				if(res.data.code==0){
					this.visibles=false
					this.check(1)
					this.$message({
						type: 'info',
						message: '操作成功！'
					});
				}else{
					this.$message({
						type: 'info',
						message: res.data.msg
					});
					this.visibles=false
				}
			})
				
    },
    //批量审核不通过
    pass(){
    	let id=[]
			let list=this.multipleSelection
			for(let i in list){
				id.push(list[i].id)
			}
			this.$axios({
	        	method:'post',
	        	url:request.testUrl+"/order/auth1/orderForm/subPayCheckBatchNo",
	        	data:id
			}).then(res=>{
				if(res.data.code==0){
					this.visibles=false
					this.check(1)
					this.$message({
						type: 'info',
						message: '操作成功！'
					});
				}else{
					this.visibles=false
					this.$message({
						type: 'info',
						message: res.data.msg
					});
				}
			})
    },
    //批量释放
    batchDelete(){
    	let id=[]
			let list=this.multipleSelection
			for(let i in list){
				id.push(list[i].id)
			}
			this.$axios({
	        	method:'post',
	        	url:request.testUrl+"/order/auth1/orderForm/releaseExpireSell",
	        	data:id
					}).then(res=>{
						if(res.data.code==0){
							this.check(1)
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
    },
    //导出
//  exported() {},
    //订单过期修改
    change(index) {
      this.info.expireTime=this.tableList[index].expireTime
      this.info.id=this.tableList[index].id
      this.visible = true;
    },
    //修改过期时间保存
    save(){
    	this.$axios({
	    	method:'post',
	    	url:request.testUrl+"/order/auth1/orderForm/addExpireTime",
	    	data:{
	    		id:this.info.id,
	    		num:this.info.num,
	    		remark:this.info.remark,
	    	}
			}).then(res=>{
				if(res.data.code==0){
					this.check(1)
					this.visible = false;
					this.reload()
				}
			})
    },
    //取消订单
    cancel(index) {
      this.$router.push({ path: "/取消订单", query: { id: this.tableList[index].id,money: this.tableList[index].money}});
    },
    //释放车位
    release(index){
    	this.$confirm("是否释放车位", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        	this.$axios({
	        	method:'post',
	        	url:request.testUrl+"/order/auth1/orderForm/releaseExpireSell",
	        	data:[
	        		this.tableList[index].id
	        	],
					}).then(res=>{
						if(res.data.code==0){
							this.check(1)
						}
					})
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看订单
    checked(index) {
      this.$router.push({ path: "/查看订单", query: { id: this.tableList[index].id,money: this.tableList[index].money }});
    },
    //分页功能
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange(currentPage) {
       this.check(currentPage);
    },
    handleSizeChange(size) {
      this.pagesize = size; //每页下拉显示数据
      this.check(this.currentPage);
    }
  }
};
</script>

<style>
.info {
  width: 96%;
  margin: 20px auto;
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