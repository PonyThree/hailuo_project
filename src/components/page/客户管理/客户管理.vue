<template>
	<div>
		<el-form :model="form" class="chess" :label-position="labelPosition" label-width="120px">
			<div style="width: 40%;float: left;">
				<el-form-item label="所属置业顾问:" style="width: 600px;float: left;">
					<el-select v-model="form.consultantId" placeholder="请选择置业顾问" style="width: 200px;">
						<el-option label="所有置业顾问" value="" key=""></el-option>
					    <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in listType"></el-option>
				    </el-select>
	           	</el-form-item>
	           	<el-form-item label-width="20px" style="width: 600px;float: left;">
	           		<el-select v-model="form.region" placeholder="请选择筛选方式" style="width: 100px;">
					    <el-option label="昵称" value="0" key="0"></el-option>
					    <el-option label="手机号" value="1" key="1"></el-option>
				    </el-select>
	                <el-input v-model="form.valueType" placeholder="请输入客户昵称或手机号" style="width: 200px;"></el-input>
	            </el-form-item>
            </div>
           	<div style="width: 40%;height: auto;overflow: hidden;float: left;">
	            <el-form-item label="来源方式:">
	            	<el-select v-model="form.comeType" placeholder="请选择来源方式" style="width: 200px;">
	            		<el-option label="所有状态" value="" key=""></el-option>
					    <el-option label="线上" value="2" key="2"></el-option>
					    <el-option label="线下" value="1" key="1"></el-option>
				    </el-select>
	            </el-form-item>
	            <el-form-item label="加入时间:">
	            	<el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始日期时间" style="width: 200px;"></el-date-picker>
	                &nbsp;&nbsp;~&nbsp;&nbsp;
	                <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束日期时间" style="width: 200px;"></el-date-picker>
	            </el-form-item>
            </div>
            <div style="width: 100px;float: right;">
            	<!--<el-button style="float: right;margin-right: 20px;"  @click="exported">导出数据</el-button>-->
	            <el-button style="float: right;margin-right: 20px;margin-top: 20px;" @click="check(1)">查询</el-button>
            </div>
		</el-form>
		
		<div class="table">
			<!--按钮-->
			<ul class="listTwo">
				<li style="margin-right: 40px;"><el-button  type="primary" @click="addTag">新增客户</el-button></li>
				<!-- 白名单控制按钮 -->
				<li><el-button  type="primary" @click="cancleWhitePeo(0)">取消白名单用户</el-button></li>
				<li><el-button  type="primary" @click="addWhitePeo(1)">添加白名单用户</el-button></li>
				<li style="float:left;margin-left:-30px;">
					<el-checkbox v-model="whiteOperation" @change="controlOpe" >只有白名单用户才能进行落位、认购操作</el-checkbox>
				</li>
			</ul>
			
			<!--表格-->
			<el-table :data="tableData" border style="width: 100%;" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead" @selection-change="selectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
				<el-table-column prop="haveOrder" v-show:"false"></el-table-column>
				<el-table-column prop="forbidden" v-show:"false"></el-table-column>
				<el-table-column prop="userId" v-show:"false"></el-table-column>
				<el-table-column prop="comeType" v-show:"false"></el-table-column>
				<el-table-column prop="comeType" v-show:"false"></el-table-column>
				<el-table-column prop="userName" label="客户昵称" align="center"></el-table-column>
				<el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
				<el-table-column prop="comeType" label="来源方式" align="center"></el-table-column>
				<el-table-column prop="joinTime" label="加入时间" align="center"></el-table-column>
				<el-table-column prop="loveCarSpaceName" label="心仪车位" align="center"></el-table-column>
				<el-table-column label="车位浏览详情" align="center">
					<template slot-scope="scope">
	                    <a style="color: #409EFF;font-size: 14px;" @click="checked(scope.$index)">点击查看</a>
	                </template>
				</el-table-column>
				<el-table-column prop="seeNum" label="最高浏览量" align="center"></el-table-column>
				<el-table-column prop="consultantName" label="所属置业顾问" align="center"></el-table-column>
				<el-table-column label="订单详情" align="center">
					<template slot-scope="scope">
	                    <a style="color: #409EFF;font-size: 14px;" @click="checkeDetail(scope.$index)" v-if="scope.row.haveOrder==1">查看</a>
	                    <span v-else>暂无订单</span>
	                </template>
				</el-table-column>
				<el-table-column label="白名单用户" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.forbidden" active-color="#409EFF" inactive-color="#909399" @change="changeSwitch(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
                        <a style="display: block; text-align: center; margin-bottom:5px;color: #409EFF;font-size: 14px;" @click="modifyTable(scope.$index)" v-if="scope.row.comeType=='线下'">修改</a>
                        <a style=" display: block; color: #409EFF;font-size: 14px;margin-top:5px;" @click="derail(scope.$index)" v-if="scope.row.comeType=='线上'&&scope.row.forbidden==1">禁用</a>
                        <a style=" display: block; color: red;font-size: 14px;margin-top:5px;" @click="derails(scope.$index)" v-if="scope.row.comeType=='线上'&&scope.row.forbidden==0">解禁</a>
	                </template>
				</el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
			
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],
		name:'management',
		data(){
	        return {
				//白名单控制
				whiteOperation:false,
				//用来存取选中的多选框
				selectOptions:'',
	        	labelPosition:'right',
	        	form:{
	        		consultantId:'',
	        		region:null,
	        		valueType:null,
	        		comeType:'',
	        		startTime:'',
	        		endTime:'',
	        	},
	        	listType:[],
	        	tableData:[{}],
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:10,//每页的数据
		       	total:0,
		       	name:''
	        }
	    },
	    created(){
			this.searchData();
	    	this.name=this.$route.query.name
			if(this.name!=undefined){
				this.form.valueType=this.name
				this.form.region='0'
			}
			this.check(1)
	    	this.$axios.get(request.testUrl+"/consultant/auth1/consultant/findByProject")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.listType=res.data.data
		            }else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
		        })
		    
	    },
	    watch: {
		    '$route'(to, from){
			    this.name=this.$route.query.name
				if(this.name!=undefined){
					this.form.valueType=this.name
					this.form.region='0'
				}
			      this.check(1)
			}
		},
	    methods:{
			//查询用户是否被允许落位、认购
			searchData(){
				this.$axios.get(request.testUrl+"/project/auth1/projectUser/getIsDoStatus").then(res=>{
					if(res.data.code==0){
						console.log(res.data)
						//初始状态值
						// this.whiteOperation=res.data.data;
						if(res.data.data==0){
							this.whiteOperation=false;
						}else{
							this.whiteOperation=true;
						}
					}
				})
			},
	      	//导出数据
			//exported(){},
	      	//查询
	      	check(currentPage){
	      		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
				
				if(this.form.startTime!=''&& this.form.startTime!=undefined){
					var date = new Date(this.form.startTime);
				    var startTime = Date.parse(date);
				}
				if(this.form.endTime!=''&& this.form.endTime!=undefined){
					var date = new Date(this.form.endTime);
				    var endTime = Date.parse(date);
				}
	      		var params=new URLSearchParams();
					params.append('page',this.currentPage);
					params.append('pageSize',this.pagesize);
					params.append('consultantId',this.form.consultantId);
					params.append('comeType',this.form.comeType);
					params.append('endTime',endTime!=null?endTime:'');
					params.append('startTime',startTime!=null?startTime:'');
					params.append('mobile',this.form.region=='1'?this.form.valueType:'');
					params.append('userName',this.form.region=='0'?this.form.valueType:'');
				this.$axios.post(request.testUrl+'/project/auth1/projectUser/findProjectUserList',params)
				.then(res=>{
					if(res.data.code==0){
						this.total = res.data.data.total
						this.tableData=res.data.data.records
						for(var i=0;i<this.tableData.length;i++){
						if(this.tableData[i].joinTime!=''&& this.tableData[i].joinTime!=undefined){
							var start=this.tableData[i].joinTime;//获取开始时间
							var d = new Date(start);    //根据时间戳生成的时间对象
							var startDate = (d.getFullYear()) + "-" + 
							           (d.getMonth() + 1) + "-" +
							           (d.getDate()) + " " + 
							           (d.getHours()) + ":" + 
							           (d.getMinutes()) + ":" + 
							           (d.getSeconds());      
							this.tableData[i].joinTime=startDate;//赋值
							// this.tableData[i].forbidden=false;
							if(this.tableData[i].forbidden==1){
								this.tableData[i].forbidden=true;
							}else{
								this.tableData[i].forbidden=false;
							}
						}
					}	
					}
				})
	      	},
	      	//新增客户
	      	addTag(){
	      		this.$router.push({ path: "/新增客户"});
	      	},
	      	//点击查看车位浏览详情
	      	checked(index){
	      		this.$router.push({ path: "/车位浏览历史",query: { id: this.tableData[index].userId,mobile: this.tableData[index].mobile,userName:this.tableData[index].userName}});
	      	},
	      	//查看订单
	      	checkeDetail(index){
	      		this.$router.push({ path: "/订单详情",query: { mobile: this.tableData[index].mobile,userName:this.tableData[index].userName}});
	      	},
	      	//修改
	      	modifyTable(index){
	      		this.$router.push({ path: "/修改客户信息",query: { id: this.tableData[index].userId}});
	      	},
	      	//禁用
			derail(index){
				var params=new URLSearchParams();
					params.append('userId',this.tableData[index].userId);
					params.append('forbiddenNum',1);
				this.$axios.post(request.testUrl+'/project/auth1/projectUser/forbiddenUser',params)
				.then(res=>{
					if(res.data.code==0){
						this.check(1)
						this.$message({
							type: 'info',
							message: '禁用成功！'
						});
						
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
			},
			//解禁
			derails(index){
				var params=new URLSearchParams();
					params.append('userId',this.tableData[index].userId);
					params.append('forbiddenNum',0);
				this.$axios.post(request.testUrl+'/project/auth1/projectUser/forbiddenUser',params)
				.then(res=>{
					if(res.data.code==0){
						this.check(1)
						this.$message({
							type: 'info',
							message: '解禁成功！'
						});
						
					}
				})
			},
	      	//分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
		        this.check(currentPage);
		    },
            handleSizeChange(size){
            	this.pagesize = size; //每页下拉显示数据
            	this.check(this.currentPage);
			},
			//多选操作 白名单
			selectionChange(val){
				this.selectOptions=val
			},
			//白名单按钮切换 单个控制
			changeSwitch(row){
				console.log(row.forbidden)
				console.log(row.userId)
				let params=[];
				let obj={};
				obj.userId=row.userId;
				if(row.forbidden==true){
					obj.forbidden=1;
				}else{
					obj.forbidden=0;
				}
				params.push(obj)
				//添加白名单
					this.$axios({
						method:'post',
						url:request.testUrl+'/project/auth1/projectUser/updProjectUserForbidden',
						data:JSON.stringify(params)
						}).then(res=>{
							if(res.data.code==0){
								// console.log(res.data)
								this.$message({
									type:'success',
									message:'操作成功'
								})
							}else{
								this.$message({
									type:'error',
									message:res.data.msg
								})
							}
					})
			},
			//添加白名单用户 多个控制
			addWhitePeo(num){
				let params=[];
				if(this.selectOptions.length>=1){
					this.selectOptions.forEach(item=>{
						console.log(item)
							var obj={};
							obj.forbidden=num;
							obj.userId=item.userId;
							params.push(obj)
							console.log(params)
							this.$axios({
								method:'post',
								url:request.testUrl+'/project/auth1/projectUser/updProjectUserForbidden',
								data:JSON.stringify(params)
								}).then(res=>{
								if(res.data.code==0){
									console.log(res.data)
									this.reload();
								}else{
									this.$message({
										type:'error',
										message:res.data.msg
									})
								}
							})
						// }
					})
					
					}else{
					this.$message({
						type:'warning',
						message:'请至少先选择一个操作对象'
					})
				}
			},
			//取消白名单用户 多个控制
			cancleWhitePeo(num){
				this.addWhitePeo(num);
			},
			//控制白名单是否可进行落位
			controlOpe(val){
				if(this.tableData.length>0){
					var params=new URLSearchParams();
					if(val==false){
						params.append('isDoStatus',0)
					}else{
						params.append('isDoStatus',1)
					}
					this.$axios.post(request.testUrl+'/project/auth1/projectUser/getIsDoStatus',params).then(res=>{
						if(res.data.code==0){
							console.log(res.data)
							this.$message({
								type:'success',
								message:'操作成功'
							})
						}else{
							this.$message({
								type:'error',
								message:res.data.msg
							})
						}
					})
				}else{
					this.$message({
						type:'success',
						message:'没有数据操作失败！'
					})
				}
			}
	    }
	}
</script>

<style>
	.info{
		width:96% ;
		margin:20px auto;
	}
	.chess{
		background: #dcd3ef;
		width: 96%;
		margin: 0 auto;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		padding-top: 13px;
		box-sizing: border-box;
	}
	.table{
		width: 96%;
		margin: 0 auto;
		margin-top: 40px;
		background: #F8F8F8;
		padding-top: 20px;
		padding-bottom: 40px;
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
		margin-right: 50px;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
	.whiteStyle{
		margin:10px 0;
		font-size:12px;
		height:18px;
		line-height: 18px;
	}
</style>