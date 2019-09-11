<template>
	<div>
		<el-form class="main" :model="form" >
			<!--基本信息-->
			<div class="info" v-show="false">
				<div class="title"><span class="f1"></span>基本信息</div>
				<div class="ff1">
					<el-form :model="form.projectInfoVo" :label-position="labelPosition" label-width="120px" :rules="rules" ref="projectInfoVo">
						<el-button class="button" @click='saveBasicInfo'>保存</el-button>
						<div class="left">
							<el-form-item label="项目名称 :" prop="name">
								<el-input v-model="form.projectInfoVo.name" placeholder="请输入项目名称" style="width: 450px;"></el-input>
							</el-form-item>
							<el-form-item label="区域:" prop='region'>
								<el-select v-model="form.projectInfoVo.region" placeholder="请选择" @change="provinceChange">
									<el-option  :label="item.name" :value="item.id" v-for='item in provinceList' :key='item.id'></el-option>
								</el-select>
                    		</el-form-item>
							<el-form-item label="城市:" prop='city'>
								<el-select v-model="form.projectInfoVo.city" placeholder="请选择" @change="cityChange">
									<el-option  :label="item.name" :value="item.id" v-for='item in cityList' :key='item.id'></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="地区:" prop='arr'>
								<el-select v-model="form.projectInfoVo.arr" placeholder="请选择"  @change="$set(form.projectInfoVo,form.projectInfoVo.arr,$event)">
									<el-option   :label="item.name" :value="item.id" v-for='item in areaList' :key='item.id'></el-option>
								</el-select>
							
							</el-form-item>
							<el-form-item label="详细地址:" prop='address'>
								<el-input v-model="form.projectInfoVo.address"  placeholder="请输入详细地址" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="项目二维码 :">
								<img class="img" style="width: 80px; height: 80px; border: 1px solid #999;float: left;margin-right: 20px;" :src="form.projectInfoVo.qrCodeUrl"/>
								<a class="down" @click="downLoad(form.projectInfoVo.qrCodeUrl)">下载</a>
							</el-form-item>
						</div>
						<div class="right">
							<el-form-item :label="form.projectInfoVo.accountName+':'">
								<template>
									<span>{{form.projectInfoVo.account}}</span>
								</template>
							</el-form-item>
							<el-form-item label="经度 :" prop='latitudes'>
								<el-input v-model="form.projectInfoVo.latitudes" placeholder="请输入经度" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="纬度 :" prop='longitudes'>
								<el-input v-model="form.projectInfoVo.longitudes" placeholder="请输入纬度" style="width:200px;"></el-input>
							</el-form-item>
						</div>	
					</el-form>
				</div>
			</div>
			<!--项目控制-->
			<div class="info">
				<div class="title">
					<span class="f1"></span>项目控制
					<el-button class="button" @click="saveControl">保存</el-button>
				</div>
				<div class="ff1">
					<el-form :model="form.controllRespDto" :label-position="labelPosition" label-width="120px">
						
						<el-form-item label="当前状态 :" style="width: 900px;"  v-show="false">
							<div style="width: 50px;float: left;margin-right: 60px;">
								<span v-if='openQuotation'>未知</span>
								<span v-else> {{form.controllRespDto.openQuotation==1?'已开盘':'未开盘'}}</span>
								<!-- <el-checkbox v-model='form.controllRespDto.openQuotation'>{{form.controllRespDto.openQuotation==1?'已开盘':'未开盘'}}</el-checkbox> -->
							</div>
						</el-form-item>
						<el-checkbox label="暂停销售" v-model="form.controllRespDto.stopSell" style="display: block;width: 50%;"></el-checkbox>
	    				<el-checkbox label="是否控制用户扫码查看项目" v-model="form.controllRespDto.local" style="display: block;margin: 40px 0 40px 0;"></el-checkbox>
	    				<el-checkbox label="在前端展示此项目" v-model="form.controllRespDto.showStatus" style="display: block;margin: 40px 0 40px 0;"></el-checkbox>
	    				<el-checkbox label="核销完成退款" v-model="form.controllRespDto.verifyFund" style="display: block;"></el-checkbox>
						<el-form-item label="开盘时间 :" style="width: 800px;" prop='totalTime' v-show="false">
							 <el-date-picker v-model="totalTime" type="daterange"  format="yyyy-MM-dd "
            	value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @blur="getStartTime"></el-date-picker>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!--项目认购控制-->
			<div class="info" v-show="false">
				<div class="title">
					<span class="f1"></span>
					<div style="width:200px ;float: left;margin-right: 50px;">项目认购控制</div>
					<el-checkbox label="允许用户线上认购" v-model="form.controllRgou.checked4" @change="change4" :checked="checked4==1"></el-checkbox>
				</div>
				<div class="ff1">
					<el-form :model="form.controllRgou" :label-position="labelPosition" label-width="120px" :rules="rule" ref="controllRgou">
						<el-button class="button" @click='saveRgou'>保存</el-button>
						<div class="choise">
							<div>
								<el-checkbox label="使用认购名称" v-model="form.controllRgou.checked1" @change="change1" :checked="form.controllRgou.checked1"></el-checkbox>
								<el-input v-model="form.controllRgou.buyName" placeholder="请输入认购名称" style="width: 450px;margin-left: 14px;" v-if='form.controllRgou.show1'></el-input>
							</div>
							<div>
								<el-checkbox label="使用认购金名称" v-model="form.controllRgou.checked2" @change="change2" :checked="form.controllRgou.checked2"></el-checkbox>
								<el-input v-model="form.controllRgou.buyMoneyName" placeholder="请输入认购金名称" style="width: 450px;" v-if='form.controllRgou.show2'></el-input>
							</div>
						</div>
						<el-form-item label="请设置认购金 :" prop='buyMoney'>
							<el-input v-model="form.controllRgou.buyMoney" placeholder="请输入认购金" style="width: 200px;"></el-input>&nbsp;&nbsp;元
						</el-form-item>
						<el-form-item label="可认购开始时间 :">
							<el-date-picker v-model="form.controllRgou.buyStartTime" type="datetime" placeholder="选择日期时间" v-if='form.controllRgou.show3' value-format="yyyy-MM-dd"></el-date-picker>
							<el-checkbox label="与开盘时间一致" style="margin-left: 20px;"  v-model="form.controllRgou.checked3" @change="change3" :checked="form.controllRgou.checked3"></el-checkbox>
						</el-form-item>
						<div class="text">
							认购后，线下签订合约的时间开始计时，若超过
							<el-input v-model="form.controllRgou.signTime" placeholder="请输入时间" style="width: 150px;margin-right: 5px;"></el-input>
							<el-select v-model="form.controllRgou.signTimeChoose" placeholder="请选择" style="width: 100px;" @change='selectChange'>
							    <el-option label="小时" value="0"></el-option>
							    <el-option label="天" value="1"></el-option>
						    </el-select>
							 后未到线下进行签约付尾款，则取消落位订单
						</div>
					</el-form>
				</div>
			</div>
			<!--项目落位控制-->
			<div class="info" v-show="false">
				<div class="title">
					<span class="f1"></span>
					<div style="width:200px ;float: left;margin-right: 50px;">项目落位控制</div>
					<el-checkbox label="允许用户落位" v-model='form.controllDownSpace.locationStatus' :checked='checked5==1' @change="change5"></el-checkbox>
				</div>
				<div class="ff1">
					<el-form :model="form.controllDownSpace" :label-position="labelPosition" label-width="120px">
						<el-button class="button" @click='saveDownSpace'>保存</el-button>
						<div class="choise">
							<div>
								<el-checkbox label="使用落位金名称" v-model='form.controllDownSpace.useDownMoneyName' :checked='checked6==1' @change="change6"></el-checkbox>
								<el-input v-model="form.controllDownSpace.downMoenyName" placeholder="请输入落位金名称" style="width: 200px;" v-if="checked6==0"></el-input>
							</div>
							<div>
								<el-checkbox label="允许落位后取消订单" v-model="form.controllDownSpace.downDelOrder" :checked="checked7==1" @change="change7"></el-checkbox>
							</div>
							<div style="margin-top: 20px;margin-bottom: 20px;">
								<el-checkbox label="退还的落位金是否需要解冻" v-model="form.controllDownSpace.downMoneyUnfreeze" :checked="checked8==1" @change="change8"></el-checkbox>
							</div>
						</div>
						<el-form-item label="请设置落位金 :">
							<el-input v-model="form.controllDownSpace.downMoney" placeholder="请输入落位金" style="width: 200px;"></el-input>&nbsp;&nbsp;元
						</el-form-item>
						<el-form-item label="可落位开始时间 :">
							<el-date-picker v-model="form.controllDownSpace.downStartTime" type="datetime" placeholder="选择日期时间" v-if="form.controllDownSpace.buyFollowOpen==false"></el-date-picker>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<el-date-picker v-model="form.controllDownSpace.downEndTime" type="datetime" placeholder="选择日期时间" v-if="form.controllDownSpace.buyFollowOpen==false"></el-date-picker>
							<el-checkbox label="与开盘时间一致" style="margin-left: 20px;" v-model='form.controllDownSpace.buyFollowOpen' :checked="form.controllDownSpace.buyFollowOpen"  @change="change10"></el-checkbox>
						</el-form-item>
						<el-form-item label="一个车位可 :">
							<el-input v-model="form.controllDownSpace.downLimitNum" placeholder="请输入人数" style="width: 200px;"></el-input>&nbsp;&nbsp;人落位
						</el-form-item>
						<el-form-item label="一个人可落 :">
							<el-input v-model="form.controllDownSpace.downCarspaceNum"  placeholder="请输入个数" style="width: 200px;"></el-input>&nbsp;&nbsp;个车位
						</el-form-item>
						<div class="text">
							认购后，线下签订合约的时间开始计时，若超过
							<el-input v-model="form.controllDownSpace.downExpireTime" placeholder="请输入时间" style="width: 150px;margin-right: 5px;"></el-input>
							<el-select v-model="form.controllDownSpace.signTimeChoose" placeholder="请选择" style="width: 100px;" @change='selectChange6'>
							    <el-option label="小时" value="0"></el-option>
							    <el-option label="天" value="1"></el-option>
						    </el-select>
							 后未到线下进行签约付尾款，则取消落位订单
						</div>
					</el-form>
				</div>
			</div>
			<!--公告信息-->
			<div class="info" v-show="false">
				<div class="title"><span class="f1"></span>公告信息</div>
				<div class="ff1">
					<el-form :model="form.noticeRespDto" :label-position="labelPosition" label-width="120px">
						<el-button class="button" @click="saveInfo">保存</el-button>
						<div>
							<div class="left">
								<el-form-item :label="'客服名称'+(index+1)+':'" prop='name' v-for='(item,index) in form.noticeRespDto.services' :key='item.id'>
									<el-input v-model="item.name" placeholder="请输入客服名称" style="width: 450px;"></el-input>
								</el-form-item>
								<el-form-item label="项目公告 :" prop='notice'>
									<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.noticeRespDto.notice" style="width: 450px;"></el-input>
								</el-form-item>
							</div>
							<div class="right">
								<el-form-item :label="'客服电话'+(index+1)+':'" prop='' v-for='(item,index) in form.noticeRespDto.services' :key='item.id'>
									<el-input v-model="item.mobile"  style="width: 200px;float: left;"></el-input>
									<el-input v-model="item.id" v-show="1==2" ></el-input>
									<i class="iconfont icon-jia use" @click="addTel" v-if='num==index'></i>
									<i class="iconfont icon-jian use" @click="reduceTel(item)" v-if="form.noticeRespDto.services.length>1"></i>
								</el-form-item>
							</div>
						</div>	
					</el-form>
				</div>
			</div>
			<!--置业顾问管理-->
			<div class="info" v-show="false">
				<div class="title"><span class="f1"></span>置业顾问管理</div>
				<!--表格列表-->
				<div class="ff1">
					<el-button style="float: right;margin: 10px 20px 0 0;" @click="addMember" class="button">新增成员</el-button>
					<div style="width: 70%;margin: 50px auto;overflow:hidden;">
						<el-table :data="form.consultantVo" border :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
							<el-table-column prop="num" label="序号" align="center" width="100">
								<template scope="scope">
									<span>{{scope.$index+1}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="置业顾问名称" align="center" width="266"></el-table-column>
							<el-table-column prop="id" label="" align="center" v-show:"1==2"></el-table-column> 
							<el-table-column prop="phone" label="手机号" align="center" width="266"></el-table-column>
							<el-table-column  label="状态" align="center" width="150">
								<template slot-scope="scope">
									<div>
										<span @click="lineChange(form.consultantVo[scope.$index].id,scope.$index)" v-if='form.consultantVo[scope.$index].status==1' style='color:#f00;'>{{form.consultantVo[scope.$index].cstatus}}</span>
										<span @click="lineChange(form.consultantVo[scope.$index].id,scope.$index)" v-else style='color:#ccc;'>{{form.consultantVo[scope.$index].cstatus}}</span>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="caozuo" label="操作" align="center" width="348">
								<template slot-scope="scope">
				                        <a @click="modifyInfo(scope.$index)" style='color:#00f;'>修改</a>
				                        <a style="margin-left: 20px;color:#f00;" @click="deleteInfo(scope.$index)">删除</a>
				                </template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</el-form>
		
		<!-- 新增成员弹出框 -->
        <el-dialog title="新增成员" :visible.sync="revise" width="25%" >
            <el-form ref="info" :model="info" :rules='rule5' :label-position="labelPosition" label-width="120px">
                <el-form-item label="置业顾问名称:" prop="name">
                    <el-input v-model="info.name" placeholder="请输入需要添加人员的姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop='phone'>
                    <el-input v-model="info.phone" placeholder="请输入需要添加人员的手机号"></el-input>
                </el-form-item>
                <el-form-item v-show="false">
                    <el-input v-model="info.id" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="saveInfos">保存</el-button>
                <el-button @click="revise=false">取 消</el-button> 
            </span>
        </el-dialog>
        
        <!-- 修改成员弹出框 -->
        <el-dialog title="修改成员" :visible.sync="editVisible" width="25%"> 
            <el-form ref="info" :model="info1" :label-position="labelPosition" label-width="150px" :rules='rules'>
                <el-form-item label="置业顾问名称:" prop='name'>
                    <el-input v-model="info1.name" placeholder="请输入需要添加人员的姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="phone">
                    <el-input v-model="info1.phone" placeholder="请输入需要添加人员的手机号"></el-input>
                </el-form-item>
                <el-form-item v-show="false">
                    <el-input v-model="info1.id" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="saveEdit">保存</el-button>
                <el-button @click="editVisible=false">取 消</el-button> 
            </span>
        </el-dialog>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'info',
		data(){
			 // 手机验证
			var isvalidPhone=/^1[3|4|5|7|8][0-9]\d{8}$/;
			var validatePhone=(rule,value,callback)=>{
				if(value===''){
					callback(new Error('请输入手机号'));
				}else if(value!==''){
					if(!isvalidPhone.test(value)){
						callback(new Error('请输入正确的11位手机号'));
					}
				}else{
					// callback();
				}
			};
	        return {
				//初始值 开盘状态未知
				openQuotation:true,
				labelPosition:'left',
				//开始时间和结束时间数组
				totalTime:[],
				// 当前日期时间
				currentTime:'',
				//用户选择的开始时间
				startTime:'',
				endTime:'',
				num:0,
				//省
				provinceList:[],
				//城市
				cityList:[],
				//地区
				areaList:[
					
				 ],
				checked1:0,
				checked2:0,
				checked3:0,
				checked4:0,
				//是否允许用户落位
				checked5:0,
				//是否使用落位金
				checked6:0,
				//是否允许落位后取消订单
				checked7:0,
				// 退还的落位金是否需要解冻
				checked8:0,
				//落位是否与开盘时间一致
				checked9:0,
				//天数转换小时
				day:'',
				day1:'',
	        	form:{
					//项目基本信息
	        		projectInfoVo:{
						region:'',
						city:'',
						arr:'',
						//收款账号类型
						accountName:'',
						// 收款账号
						account:'',
						//地址
						address:'',
						//经度
						latitudes:'',
						//纬度
						longitudes:'',
						//项目名称
						name:'',
	        			qrCodeUrl:'',
	        			// startTime:'',
	        			// endTime:''
					},
					//置业顾问
					consultantVo:[],
					//消息公告
	        		noticeRespDto:{
						notice:'',
						services:[
							{}
						]
					},
					//控制信息
					// "showStatus": "是否在前端展示此项目 0 否，1 是",
					// "local": "是否本小区业主才可购买",
					//  "openQuotation": "是否已开盘",
					controllRespDto:{
						openQuotation:'',
						stopSell:'',
						local:'',
						verifyFund:'',
						showStatus:'',
						id:null
					},
					// 控制认购信息
					controllRgou:{
						//是否使用认购名称
						checked1:false,
						//认购名称输入框
						show1:true,
						buyName:'',
						//是否使用认购金名称
						checked2:false,
						//认购金输入框
						show2:true,
						buyMoneyName:'',
						//与开盘时间一致
						checked3:false,
						show3:true,
						buyStartTime:null,
						// 认购金
						buyMoney:'',
						//签约时间
						signTime:'',
						//显示小时还是天
						signTimeChoose:'0',
						//线上认购
						checked4:false


					},
					//控制落位信息
					controllDownSpace:{
						//允许用户落位
						locationStatus:0,
						useDownMoneyName:0,
						downMoenyName:'',
						downDelOrder:0,
						downMoneyUnfreeze:0,
						downMoney:'',
						buyFollowOpen:false,
						downLimitNum:'',
						downCarspaceNum:'',
						//显示小时还是天
						signTimeChoose:'',
					}
	        	},
	        	typeList:{},
	        	typeList1:{},
	        	typeList2:{},
	        	info:{},
	        	info1:{},
	        	memberData:[{}],
	        	revise:false,
				editVisible:false,
				rules:{
					name:[
						{required:true,message:'请输入用户名称',trigger:'blur'}
					],
					region:{required:true,message:'请输入区域',trigger:'blur'},
					city:{required:true,message:'请输入城市',trigger:'blur'},
					arr:{required:true,message:'请输入地区',trigger:'blur'},
					address:{required:true,message:'请输入详细',trigger:'blur'},
					latitudes:{required:true,message:'请输入经度',trigger:'blur'},
					longitudes:{required:true,message:'请输入纬度',trigger:'blur'},
					phone:[
						{validator: validatePhone, trigger: 'blur'}
					]
				},
				rule:{
					buyMoney:{required:true,message:'请设置认购金',trigger:'blur'},
				},
				rule5:{
					name:[
						{required:true,message:'请输入置业顾问名称',trigger:'blur'}
					],
				}
			}
			
	    },
	    created(){
			this.getInfo();
			this.renderBasicInfo();
			this.getCurrentTime();
			this.getProvinceList();
			this.getStartTime();
	    },
	    methods:{
			addZero(n){
			return n<10? '0'+n :n;
			},
			// 时间戳转时间函数
			transformDate(time){
				var t=new Date(time);
				var y=t.getFullYear();
				var mon=t.getMonth()+1;
				var d=t.getDate();
				return y+'-'+this.addZero(mon)+'-'+this.addZero(d);
			},
			//获取当前时间
			getCurrentTime(){
				this.currentTime=new Date().getTime();
			},
			// 二维码下载
			downLoad(qrCodeUrl){
				window.location.href=request.testUrl+"/project/image/downloadFile?fileUrl="+qrCodeUrl;
			},
			//项目基本信息渲染
			renderBasicInfo(){
				this.$axios.get(request.testUrl+'/project/auth1/project/selectInfo')
				.then(res=>{
					if(res.data.code==0){
						//项目基本信息
						this.form.projectInfoVo=res.data.data.projectInfoVo;
						this.form.projectInfoVo.region=res.data.data.projectInfoVo.provinceId;
						this.provinceChange();
						this.form.projectInfoVo.city=res.data.data.projectInfoVo.cityId;
						this.form.projectInfoVo.arr=res.data.data.projectInfoVo.countyId;
						this.cityChange();
						// 置业顾问
						this.form.consultantVo=res.data.data.consultantVo;
						//公告信息
//						if(res.data.data.noticeRespDto==null){
//							this.$message({
//								type:'info',
//								message:'请先添加一条控制信息数据'
//							});
//						}else{
//							this.form.noticeRespDto=res.data.data.noticeRespDto;
//						}
						//项目控制信息
						//没有数据就添加
						if(res.data.data.controllRespDto==null){
							// this.form.controllRespDto=res.data.data.controllRespDto;
//							this.$message({
//								type:'info',
//								message:'请先添加一条项目控制信息数据'
//							});
						}else{
						 	//有数据就修改
							if(res.data.data.controllRespDto.stopSell==1){
								this.form.controllRespDto.stopSell=true;
							}else{
								this.form.controllRespDto.stopSell=false;
							}
							if(res.data.data.controllRespDto.local==1){
								this.form.controllRespDto.local=true;
							}else{
								this.form.controllRespDto.local=false;
							}
							if(res.data.data.controllRespDto.showStatus==1){
								this.form.controllRespDto.showStatus=true;
							}else{
								this.form.controllRespDto.showStatus=false;
							}
							if(res.data.data.controllRespDto.verifyFund==1){
								this.form.controllRespDto.verifyFund=true;
							}else{
								this.form.controllRespDto.verifyFund=false;
							}
							//是否开盘状态值
							this.openQuotation=false;
							this.form.controllRespDto.openQuotation=res.data.data.projectInfoVo.openStatus;
							this.form.controllRespDto.id=res.data.data.projectInfoVo.id;
							this.startTime=this.transformDate(res.data.data.controllRespDto.startTime);
							this.endTime=this.transformDate(res.data.data.controllRespDto.endTime);
							var arr=[];
							arr.push(this.startTime,this.endTime);
							//日期绑定
							this.totalTime=arr;
							this.firstPageTime(this.totalTime);
							// 项目控制数据绑定
							// 认购金
							this.form.controllRgou.buyMoney=res.data.data.controllRespDto.buyMoney;
						}
						// 项目认购信息
						if(res.data.data.controllRespDto==null){
//							this.$message({
//								type:'info',
//								message:'请先添加一条项目认购信息数据'
//							});
							return;
						}else{
							//有数据就修改
							// 认购名称
								if(parseInt(res.data.data.controllRespDto.useBuyName)==1){
									this.form.controllRgou.checked1=true;
									this.checked1=1;
								}else{
									this.form.controllRgou.checked1=false;
									this.form.controllRgou.buyName=res.data.data.controllRespDto.buyName==null?'':res.data.data.controllRespDto.buyNam;
								}
								// 认购金名称
								if(parseInt(res.data.data.controllRespDto.useBuyMoneyName)==1){
									this.form.controllRgou.checked2=true;
									this.change2();
									this.checked2=1;
								}else{
									this.change2();
									this.form.controllRgou.checked2=false;
									this.form.controllRgou.buyMoneyName=res.data.data.controllRespDto.buyMoneyName==null?'':res.data.data.controllRespDto.buyMoneyName;
								}
								// 开盘时间是否一致
								if(res.data.data.controllRespDto.openProjectStatus==1){
									this.form.controllRgou.checked3=true;
									this.checked3=1;
									this.change3();
								}else{
									this.form.controllRgou.checked3=false;
									this.change3();
									this.checked3=0;
									this.form.controllRgou.buyStartTime=this.transformDate(res.data.data.controllRespDto.buyStartTime);
								}
								// 用户线上认购
								if(res.data.data.controllRespDto.onlineBuyStatus==1){
									this.form.controllRgou.checked4=true;
									this.change4();
								}else{
									this.form.controllRgou.checked4=false;
									this.change4();
								}
							// 认购金
							this.form.controllRgou.buyMoney=res.data.data.controllRespDto.buyMoney;
							//认购时间
							if(parseInt(res.data.data.controllRespDto.buyExpireTime)<=24){
								this.form.controllRgou.signTimeChoose='0';
								this.form.controllRgou.signTime=parseInt(res.data.data.controllRespDto.buyExpireTime);
							}else{
								this.form.controllRgou.signTime=(parseInt(res.data.data.controllRespDto.buyExpireTime))/24;
								this.form.controllRgou.signTimeChoose='1';
							}
						}
						//项目落位数据
						this.form.controllDownSpace=res.data.data.controllRespDto;
						
						//落位时间
//						if(parseInt(res.data.data.controllRespDto.downExpireTime)<=24){
							this.form.controllDownSpace.downExpireTime=parseInt(res.data.data.controllRespDto.downExpireTime);
							this.form.controllDownSpace.signTimeChoose='0';
//						}else{
//							this.form.controllDownSpace.downExpireTime=(parseInt(res.data.data.controllRespDto.downExpireTime))/24;
//							this.form.controllDownSpace.signTimeChoose='1';
//						}
						//允许用户落位 checked5
						if(parseInt(res.data.data.controllRespDto.locationStatus)==1){
							this.form.controllDownSpace.locationStatus=true;
							this.checked5=1;
						}else{
							this.form.controllDownSpace.locationStatus=false;
							this.checked5=0;
						}
						//使用落位金名称
						if(parseInt(res.data.data.controllRespDto.useDownMoneyName)==1){
							this.form.controllDownSpace.useDownMoneyName=true;
							this.checked6=1;
						}else{
							this.form.controllDownSpace.useDownMoneyName=false;
							this.checked6=0;
							this.form.controllDownSpace.downMoenyName=res.data.data.controllRespDto.downMoenyName==null?'':res.data.data.controllRespDto.downMoenyName;
						}
						//是否取消订单
						// downDelOrder
						if(parseInt(res.data.data.controllRespDto.downDelOrder)==1){
							this.form.controllDownSpace.downDelOrder=true;
							this.checked7=1;
						}else{
							this.form.controllDownSpace.downDelOrder=false;
							this.checked7=0;
							this.form.controllDownSpace.downDelOrder=res.data.data.controllRespDto.downDelOrder;
						}
						//退还的落位金是否解冻
						if(parseInt(res.data.data.controllRespDto.downMoneyUnfreeze)==1){
							this.form.controllDownSpace.downMoneyUnfreeze=true;
							this.checked8=1;
						}else{
							this.form.controllDownSpace.downMoneyUnfreeze=false;
							this.checked8=0;
							this.form.controllDownSpace.downMoneyUnfreeze=res.data.data.controllRespDto.downMoneyUnfreeze;
						}
						//落位时间是否一致
						//1 一致
						if(res.data.data.controllRespDto.buyFollowOpen==1){
							this.checked9=1;
							this.form.controllDownSpace.buyFollowOpen=true;
						}else{
							//0 不一致
							this.checked9=0;
							this.form.controllDownSpace.buyFollowOpen=false;
						}
						//落位时间处理显示
						if(parseInt(res.data.data.controllRespDto.downExpireTime)<=24){
								this.form.controllDownSpace.signTimeChoose='0';
								this.form.controllDownSpace.downExpireTime=parseInt(res.data.data.controllRespDto.downExpireTime);
							}else{
								this.form.controllDownSpace.downExpireTime=(parseInt(res.data.data.controllRespDto.downExpireTime))/24;
								this.form.controllDownSpace.signTimeChoose='1';
						}
					}else{
						this.$message({
							type:'info',
							message:res.data.msg
						})
					}
				})
			},
			//失去焦点时 获取开始时间 结束时间
			getStartTime(){
				this.startTime=parseInt(new Date(this.totalTime[0]).getTime());
				this.endTime=parseInt(new Date(this.totalTime[1]).getTime());
				this.form.controllRespDto.startTime=this.transformDate(this.startTime);
				this.form.controllRespDto.endTime=this.transformDate(this.endTime);
				//当前时间小于开始时间---已开盘
				if(this.currentTime>=this.startTime&&this.currentTime<=this.endTime){
					this.openQuotation=false;
					this.form.controllRespDto.openQuotation=1;
				}else{
					this.openQuotation=false;
					this.form.controllRespDto.openQuotation=0;
				}
			},
			//一上来就进行时间判断
			firstPageTime(totalTime){
				this.startTime=parseInt(new Date(totalTime[0]).getTime());
				this.endTime=parseInt(new Date(totalTime[1]).getTime());
				this.form.controllRespDto.startTime=this.transformDate(this.startTime);
				this.form.controllRespDto.endTime=this.transformDate(this.endTime);
				// 当前时间小于开始时间---已开盘
				if(this.currentTime>=this.startTime&&this.currentTime<=this.endTime){
					this.openQuotation=false;
					this.form.controllRespDto.openQuotation=1;
				}else{
					this.openQuotation=false;
					this.form.controllRespDto.openQuotation=0;
				}
			},
			//公告信息首次查询
			getInfo(){
				this.$axios.get(request.testUrl+'/project/auth1/notice/get')
				.then(res=>{
					if(res.data.data.services.length<1){
//						this.$message({
//							type:'info',
//							message:'请添加一条数据'
//						})
					}else{
						this.form.noticeRespDto.notice=res.data.data.notice;
						this.form.noticeRespDto.services=res.data.data.services;
						this.num=this.form.noticeRespDto.services.length-1
					}
					
				})
			},
			//省份
			getProvinceList(){
				this.$axios.get(request.testUrl+'/project/sysRegion/select',{
					params:{
						parentId:0
					} 
				}).then(res=>{
					this.provinceList=res.data.data;
				})
        	},
			// 区域渲染
			provinceChange(){
				//得到城市列表
				this.$axios.get(request.testUrl+'/project/sysRegion/select',{
					params:{
						parentId:this.form.projectInfoVo.region
					}
				}).then(res=>{
					this.cityList=res.data.data;
				})
			},
			cityChange(){
				//得到地区
				this.$axios.get(request.testUrl+'/project/sysRegion/select',{
					params:{
						parentId:this.form.projectInfoVo.city
					}
				}).then(res=>{
					this.areaList=res.data.data;
				})
			},
//			areaChange(val){
//				console.log(val)
//				this.form.projectInfoVoarr=val;
//			},
			//基本信息保存
			saveBasicInfo(projectInfoVo){
				this.$refs.projectInfoVo.validate((valid) => {
					if (valid) {
						var params=new URLSearchParams();
						params.append('address',this.form.projectInfoVo.address);
						params.append('cityId',this.form.projectInfoVo.city);
						params.append('countyId',this.form.projectInfoVo.arr);
						params.append('latitudes',this.form.projectInfoVo.latitudes);
						params.append('longitudes',this.form.projectInfoVo.longitudes);
						params.append('name',this.form.projectInfoVo.name);
						params.append('provinceId',this.form.projectInfoVo.region);
						this.$axios.post(request.testUrl+'/project/auth1/project/selfDoUpdate',params)
						.then(res=>{
							this.$message({
									type: 'info',
									message: '基本信息保存成功！'
								});
						})
					}else {
			            return false;
			        }
				})
			},
			//上线下切换
			lineChange(id,i){
				if(this.form.consultantVo[i].status==1){
					this.form.consultantVo[i].status=0;
				}else{
					this.form.consultantVo[i].status=1;
				}
				var params=new URLSearchParams();
				params.append('id',id);
				params.append('status',this.form.consultantVo[i].status);
				this.$axios.post(request.testUrl+'/consultant/auth1/consultant/updateStatus',params)
				.then(res=>{
					if(res.data.code==0){
						this.renderBasicInfo();
						this.$message({
							type: 'info',
							message: '切换成功！'
						});
					}
				})
			},
			//新增成员按钮
	    	addMember(){
	    		this.revise=true;
	    	},
			//新增成员保存
	    	saveInfos(info){
	    		// console.log(1)
				this.$refs.info.validate((valid)=>{
					if(valid){
						var params=new URLSearchParams();
						params.append('name',this.info.name);
						params.append('phone',this.info.phone);
						this.$axios.post(request.testUrl+'/consultant/auth1/consultant/doInsertOrUpdate',params)
						.then(res=>{
							if(res.data.code==0){
								this.revise=false;
								this.$message({
									type:'success',
									message:'新增成功'
								});
								this.renderBasicInfo()
							}
						})
					}else{
                    	return false;
                	}
				})	
	    	},
	    	//修改成员按钮
	    	modifyInfo(index){
	    		console.log(index)
				this.editVisible=true;
				//修改之前的数据渲染
				this.$axios.get(request.testUrl+'/consultant/auth1/consultant/selectOne',{
					params:{
						id:this.form.consultantVo[index].id
					}
				})
				.then(res=>{
					this.info1=res.data.data;
				})

	    	},
			//修改成员保存
			saveEdit(){
				var params=new URLSearchParams();
				params.append('id',this.info1.id);
				params.append('name',this.info1.name);
				params.append('phone',this.info1.phone);
				this.$axios.post(request.testUrl+'/consultant/auth1/consultant/doInsertOrUpdate',params)
				.then(res=>{
					if(res.data.code==0){
						this.editVisible=false;
						this.$message({
							type:'success',
							message:'修改成功'
						});
						this.renderBasicInfo()
					}
				})
			},
			//删除成员
			deleteInfo(index){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params=new URLSearchParams();
					params.append('id',this.form.consultantVo[index].id);
					this.$axios.post(request.testUrl+'/consultant/auth1/consultant/doDelete',params)
					.then(res=>{
						if(res.data.code==0){
							this.$message({
								type:'success',
								message:'删除成功'
							});
							this.renderBasicInfo()
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//项目控制保存
			saveControl(){
				// alert(this.startTime);
				// if(!this.startTime){
				// 	this.$message({
				// 		type:'warning',
				// 		message:'请先在项目信息中选择开盘时间'
				// 	})
				// 	return ;
				// }
				this.renderBasicInfo();
				this.reload();
				alert(this.form.controllRespDto.startTime);
				// alert(this.startTime);
				if(this.form.controllRespDto.startTime==''||this.form.controllRespDto.startTime==undefined||this.form.controllRespDto.startTime==null){
					this.$message({
						type:'warning',
						message:'请先在项目信息中选择开盘时间！'
					});
					return;
				}
				if(this.form.controllRespDto.stopSell==true){
					this.form.controllRespDto.stopSell=1;
				}else{
					this.form.controllRespDto.stopSell=0;
				}
				if(this.form.controllRespDto.local==true){
						this.form.controllRespDto.local=1;
				}else{
					this.form.controllRespDto.local=0;
				}
				if(this.form.controllRespDto.showStatus==true){
					this.form.controllRespDto.showStatus=1;
				}else{
					this.form.controllRespDto.showStatus=0;
				}
				if(this.form.controllRespDto.verifyFund==true){
					this.form.controllRespDto.verifyFund=1;
				}else{
					this.form.controllRespDto.verifyFund=0;
				}
				//是否与开盘时间一致
				if(this.form.controllRespDto.openProjectStatus==1){
					this.form.controllRespDto.checked3=true;
					this.change3();
					params.append('openProjectStatus',1);
				}else{
					this.form.controllRespDto.checked3=false;
					this.change3();
					this.checked3=0;
					this.form.controllRgou.buyStartTime=this.transformDate(this.form.controllRespDto.buyStartTime);
				}
				var params=new URLSearchParams();
				params.append('stopSell',this.form.controllRespDto.stopSell);
				params.append('openStatus',this.form.controllRespDto.openQuotation);
				params.append('local',this.form.controllRespDto.local);
				params.append('showStatus',this.form.controllRespDto.showStatus);
				params.append('verifyFund',this.form.controllRespDto.verifyFund);
				// params.append('startTime',this.form.controllRespDto.startTime);
				// params.append('endTime',this.form.controllRespDto.endTime);
				if(!this.form.controllRespDto.startTime){
					params.append('startTime',this.form.controllRespDto.startTime)
				}
				if(!this.form.controllRespDto.endTime){
					params.append('endTime',this.form.controllRespDto.endTime);
				}
				params.append('id',this.form.controllRespDto.id);
				this.$axios.post(request.testUrl+'/project/auth1/controll/addOrUpdControll',params)
				.then(res=>{
					if(res.data.code==0){
						this.renderBasicInfo();
						this.$message({
							type: 'info',
							message: '信息更改成功！'
						});
						// this.reload();
						
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
			},
			//公告信息保存或者修改
			saveInfo(){
				this.$axios.post(request.testUrl+'/project/auth1/notice/update',JSON.stringify(this.form.noticeRespDto))
				.then(res=>{
					if(res.data.code==0){
						this.getInfo();
						this.$message({
							type: 'info',
							message: '信息更改成功！'
						});
					}
				})
			},
			//客服电话添加
			addTel(){
				this.form.noticeRespDto.services.push({

				});
				this.num=this.form.noticeRespDto.services.length-1;
			},
			//删除列表值
			reduceTel(item){
				var index=this.form.noticeRespDto.services.indexOf(item);
				if(index!=-1){
					this.form.noticeRespDto.services.splice(index,1);
					this.num=this.form.noticeRespDto.services.length-1;
				}
			},
			// //是否使用认购名称状态改变
			change1(){
				if(this.form.controllRgou.checked1==true){
					this.checked1=1;
					this.form.controllRgou.show1=false;
					this.form.controllRespDto.checked1=true;
				}else{
					this.checked1=0;
					this.form.controllRgou.show1=true;
					this.form.controllRespDto.checked1=false;
				}
			},
			//是否使用认购金名称状态改变
			change2(){
				if(this.form.controllRgou.checked2==true){
					this.checked2=1;
					this.form.controllRgou.show2=false;
					this.form.controllRespDto.checked2=true;
				}else{
					this.checked2=0;
					this.form.controllRgou.show2=true;
					this.form.controllRespDto.checked2=false;
				}
			},
			//是否与开盘时间一致
			change3(){
				//判断是否有开盘时间
				//没有就不能选中与开盘时间设置一致
				if(this.totalTime.length==0){
					this.$message({
						type:'error',
						message:'请先选择开盘时间'
					});
					return;
				}else{
					//有开盘时间就可以选中 并把开盘时间传给后台
					if(this.form.controllRgou.checked3==true){
						this.checked3=1;
						this.form.controllRgou.show3=false;
						this.form.controllRgou.checked3=true;
					}else{
						this.checked3=0;
						this.form.controllRgou.show3=true;
						this.form.controllRgou.checked3=false;
					}
				}
				
			},
			//允许用户线上认购
			change4(){
				if(this.form.controllRgou.checked4==true){
					this.checked4=1;
				}else{
					this.checked4=0;
				}
			},
			//允许用户落位
			change5(){
				if(this.form.controllDownSpace.locationStatus==1){
					this.checked5=1;
					this.form.controllDownSpace.locationStatus=true;
				}else{
					this.checked5=0;
					this.form.controllDownSpace.locationStatus=false;
				}
			},
			//是否使用落位金名称
			change6(){
				if(this.form.controllDownSpace.useDownMoneyName==1){
					this.checked6=1;
					this.form.controllDownSpace.useDownMoneyName=true;
				}else{
					this.checked6=0;
					this.form.controllDownSpace.useDownMoneyName=false;
				}
			},
			//允许落位后取消订单
			change7(){
				if(this.form.controllDownSpace.downDelOrder==1){
					this.checked7=1;
					this.form.controllDownSpace.downDelOrder=true;
				}else{
					this.checked7=0;
					this.form.controllDownSpace.downDelOrder=false;
				}
			},
			//退还的落位金是否需要解冻
			change8(val){
				if(val==true){
					this.checked8=1;
					this.form.controllDownSpace.downMoneyUnfreeze=true;
				}else{
					this.checked8=0;
					this.form.controllDownSpace.downMoneyUnfreeze=false;
				}
				if(this.form.controllDownSpace.downMoneyUnfreeze==1){
					this.checked8=1;
					this.form.controllDownSpace.downMoneyUnfreeze=true;
				}else{
					this.checked8=0;
					this.form.controllDownSpace.downMoneyUnfreeze=false;
				}
			},
			//落位是否与开盘时间一致
			change10(val){
				//判断是否有开盘时间
				//没有就不能选中与开盘时间设置一致
				if(this.totalTime.length==0){
					this.$message({
						type:'error',
						message:'请先选择开盘时间'
					});
					return;
				}else{
					if(val==true){
						this.checked9=1;
						this.form.controllDownSpace.buyFollowOpen=true;
					}else{
						this.checked9=0;
						this.form.controllDownSpace.buyFollowOpen=false;
					}
					
				}
				
			},
			//小时 天切换
			selectChange(val){
				if(val==0){
					this.form.controllRgou.signTimeChoose='0';
				}else{
					this.form.controllRgou.signTimeChoose='1';
					this.form.day=parseInt(this.form.controllRgou.signTime)*24;
				}
			},
			//落位小时 天切换
			selectChange6(val){
				this.$forceUpdate()
				if(val==0){
					this.form.controllDownSpace.signTimeChoose='0';
				}else{
					//1为天
					this.form.controllDownSpace.signTimeChoose='1';
					this.form.day1=parseInt(this.form.controllDownSpace.downExpireTime)*24;
				}	
			},
			//认购控制保存
			saveRgou(controllRgou){
				this.$refs.controllRgou.validate((valid) => {
					if (valid) {
						var params=new URLSearchParams();
						//认购名称
						this.change1();
						if(this.form.controllRespDto.checked1==true){
							this.change1();
							this.form.controllRespDto.show1=false;
							
						}else{
							this.change1();
							this.form.controllRespDto.show1=true;
							params.append('buyName',this.form.controllRgou.buyName);
						}
						// 认购金名称
						this.change2();
						if(this.form.controllRespDto.checked2==true){
							this.change2();
							this.form.controllRespDto.show1=false;
						}else{
							this.change2();
							this.form.controllRespDto.show1=true;
							params.append('buyMoneyName',this.form.controllRgou.buyMoneyName);
						}
						//与开盘时间一致传参
						//判断是否有开盘时间
						//没有就不能选中与开盘时间设置一致
						if(this.totalTime==[]){
							this.$message({
								type:'error',
								message:'请先选择开盘时间'
							});
							return;
						}else{
							//有开盘时间就可以选中 并把开盘时间传给后台
							this.change3();
							if(this.form.controllRgou.checked3==true){
								this.checked3=1;
								this.form.controllRgou.show3=false;
								params.append('openProjectStatus',this.checked3);
								params.append('startTime',this.startTime);
								params.append('endTime',this.endTime);
							}else{
								params.append('buyStartTime',this.form.controllRgou.buyStartTime);
							}
						}
						// 与开盘时间是否一致
						if(this.form.controllRespDto.checked3==true){
							this.change3();
							this.form.controllRespDto.show3=false;
		
						}else{
							this.change3();
							this.form.controllRespDto.show3=true;
		
						}
						// 是否线上认购
						if(this.form.controllRespDto.checked4==true){
							this.change4();
						}else{
							this.change4();
						}
						
						params.append('onlineBuyStatus',this.checked4);
						params.append('useBuyName',this.checked1);
						params.append('useBuyMoneyName',this.checked2);
						params.append('buyMoney',this.form.controllRgou.buyMoney);
						params.append('openStatus',this.form.controllRespDto.openQuotation);
						params.append('startTime',this.form.controllRespDto.startTime);
						params.append('endTime',this.form.controllRespDto.endTime);
						//小时 天处理传参
						if(this.form.controllRgou.signTimeChoose=='0'){
							params.append('buyExpireTime',this.form.controllRgou.signTime);
						}else{
							//1为天
							this.form.day=parseInt(this.form.controllRgou.signTime)*24;
							params.append('buyExpireTime',this.form.day);
						}
						this.$axios.post(request.testUrl+'/project/auth1/controll/buyControll',params)
							.then(res=>{
								this.$message({
									type: 'info',
									message: '信息保存成功！'
								});
						})
					}else {
			            return false;
			        }
				})
			},
			//落位认购保存
			saveDownSpace(){

				var params=new URLSearchParams();
				params.append('startTime',this.transformDate(this.startTime));
				params.append('endTime',this.transformDate(this.endTime));
				//是否允许落位
				if(this.form.controllDownSpace.locationStatus==1){
					this.form.controllDownSpace.locationStatus=1;
					params.append('locationStatus',1);
				}else{
					this.form.controllDownSpace.locationStatus=0;
					params.append('locationStatus',0);
				}
				//是否使用落位金名称
				if(this.form.controllDownSpace.useDownMoneyName==1){
					// 为1不传递落位金名称参数
					this.form.controllDownSpace.useDownMoneyName=1;
					params.append('useDownMoneyName',this.form.controllDownSpace.useDownMoneyName);
				}else{
					// 为0传递落位金名称参数
					this.form.controllDownSpace.useDownMoneyName=0;
					params.append('useDownMoneyName',this.form.controllDownSpace.useDownMoneyName);
					params.append('downMoenyName',this.form.controllDownSpace.downMoenyName);
				}
				//是否允许落位后取消订单
				if(this.form.controllDownSpace.downDelOrder==true){
					this.form.controllDownSpace.downDelOrder=1;
				}else{
					this.form.controllDownSpace.downDelOrder=0;
				}
				params.append('downDelOrder',this.form.controllDownSpace.downDelOrder);
				//退还落位金是否需要解冻
				if(this.form.controllDownSpace.downMoneyUnfreeze==true){
					this.form.controllDownSpace.downMoneyUnfreeze=1;
				}else{
					this.form.controllDownSpace.downMoneyUnfreeze=0;
				}
				params.append("downMoneyUnfreeze",this.form.controllDownSpace.downMoneyUnfreeze);
				//落位金
				params.append('downMoney',this.form.controllDownSpace.downMoney);
				//落位是否与开盘一致
				if(this.form.controllDownSpace.buyFollowOpen==true){
					//与开盘时间一致 不传递落位开始时间与结束时间
					params.append('buyFollowOpen',1);
				}else{
					//不一致 传递落位开始时间与结束时间
					params.append('buyFollowOpen',0);
					params.append('downStartTime',this.transformDate(this.form.controllDownSpace.downStartTime));
					params.append('downEndTime',this.transformDate(this.form.controllDownSpace.downEndTime));
				}
				//车位可落位人数
				params.append('downLimitNum',this.form.controllDownSpace.downLimitNum);
				//可落位车位数
				params.append('downCarspaceNum',this.form.controllDownSpace.downCarspaceNum);
				
				//小时 天处理传参
				if(this.form.controllDownSpace.signTimeChoose=='0'){
					params.append('downExpireTime',this.form.controllDownSpace.downExpireTime);
				}else{
					//1为天
					this.form.day1=parseInt(this.form.controllDownSpace.downExpireTime)*24;
					params.append('downExpireTime',this.form.day1);
				}		
				this.$axios.post(request.testUrl+'/project/auth1/controll/downSpaceControll',params)
				.then(res=>{
					if(res.data.code==0){
						this.$message({
							type: 'info',
							message: '信息更改成功！'
						});
						this.renderBasicInfo();
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
					
				})
					

			}	
	    }
	}
</script>

<style>
	.mian{
		width: 100%;
	}
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
	.info .ff1{
		width: 100%;
		background:#F8F8F8;
		padding: 10px 0 10px 0;
	}
	.info .title .f1{
		display: inline-block;
		width: 20px;
		height: 100%;
		background:#9768e5 ;
		float: left;
	}
	.info .el-form{
		width: 96%;
		padding-left: 50px;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
		margin: 20px auto 20px;
	}
	.left{
		width:670px;
		float: left;
		margin-right: 40px;
	}
	.right{
		width: 670px;
		float: left;
		
	}
	.button{
		background:#9768e5 ;
		float: right;
		color: #FFFFFF;
	}
	.button:hover{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.button:focus{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.down{
		color: #409EFF;
		font-size: 14px;
		margin-left: 20px;
		display: inline-block;
	}
	.down:active{
		color: rgb(50, 65, 87);
	}
	.down:hover{
		cursor: pointer;
	}
	.choise{
		width:900px ;
	}
	.choise div{
		margin-bottom: 10px;
	}
	.text{
		color: red;
		font-size: 14px;
		margin-bottom: 20px;
	}
	.iconfont.use{
		font-size: 30px;
		color:#dad9d9;
		margin-left: 40px;
		display: block;
		float: left;
	}
	.iconfont.use:hover{
		color: #1c1c1c;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
</style>