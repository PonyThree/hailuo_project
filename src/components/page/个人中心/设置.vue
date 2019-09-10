<template>
  <div>
    <h2>设置> {{tagTitle}}</h2>
    <div class="setting">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs" stretch v-if="show">
        <!-- 个人资料 -->
        <el-tab-pane label="个人资料" name="first">
          <div class="content">
            <div class="title">
              <span class="iconfont icon-shuxian"></span>
              <span style="font-size: 18px;color: #606266;">个人资料</span>
            </div>
            <!-- 用户个人信息 -->
            <div class="personInfo">
              <!--<div class="perPic">
                <img src="/src/assets/img/boy.jpg">
              </div>-->
              <div>
                <el-form
                  :model="personData"
                  style="width:600px;margin:0 auto;"
                  :label-position="labelPosition"
                  label-width="120px"
                >
                  <el-form-item label="账号:" prop="username">
                    <el-input v-model="personData.username" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item label="职务:" prop="position">
                    <el-input v-model="personData.position" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名:" prop="realname">
                    <el-input v-model="personData.realname" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item label="性别:" prop="sex">
                    <el-radio-group v-model="personData.sex">
                      <el-radio label="1">男</el-radio>
                      <el-radio label="0">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="手机号码:" prop="mobile">
                        <el-input v-model="personData.mobile" style="width:300px;"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <!-- 未验证时 -->
                      <el-form-item
                        prop="verification"
                        v-if="personData.verification"
                        label-width="0px"
                        style="margin-left: 40px;"
                      >
                        <!-- <el-button
                          type="text"
                          @click="handleTel"
                          v-if="personData.verification"
                        >立即验证</el-button>-->
                      </el-form-item>
                      <!-- 验证完成 -->
                      <!--<el-form-item
                        prop="verification"
                        v-else
                        label-width="0px"
                        style="margin-left: 40px;"
                      >
                        <span>验证完成</span>
                      </el-form-item>-->
                    </el-col>
                  </el-row>
                  <!-- <el-form-item label="籍贯:" prop="account" placeholder="请输入籍贯">
                    <el-input v-model="personData.account" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号:" prop="position">
                    <el-input v-model="personData.position" style="width:300px"></el-input>
                  </el-form-item>-->
                  <el-button @click="save" class="aa1" style="display: block;margin: 60px auto;">保存</el-button>
                </el-form>
              </div>
            </div>
            <!-- 手机号验证 -->
            <el-dialog title="验证手机" :visible.sync="dialogVisible" width="25%">
              <el-form :data="form" width="20%">
                <el-form-item label="手机号码:" prop="telPhone">
                  <template>
                    <el-input v-model="form.telPhone" style="width:200px;" placeholder="请输入手机号码"></el-input>
                  </template>
                </el-form-item>
                <el-form-item label="验证码:" prop="yzCode" class="yzCode">
                  <template>
                    <el-input v-model="form.yzCode" style="width:200px;" placeholder="请输入验证码"></el-input>
                    <el-button
                      type="primary"
                      size="small"
                      style="margin-left:10px"
                      @click="getCode"
                    >获取验证码</el-button>
                  </template>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer footBtn">
                <el-button type="primary" @click="nextStep" style="margin:0 auto">下一步</el-button>
              </span>
            </el-dialog>
            <!-- 手机完成提示 -->
            <el-dialog title="验证手机" width="25%" :visible.sync="dialogVisible1">
              <el-form :data="form" width="20%">
                <el-form-item label="手机号码:" prop="telPhone">18697706225</el-form-item>
                <span class="sucInfo">恭喜您手机号验证成功</span>
              </el-form>
              <span slot="footer" class="dialog-footer footBtn">
                <el-button type="primary" @click="success" style="margin:0 auto">完成</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>

        <!-- 员工管理 -->
        <el-tab-pane label="员工管理" name="second">
          <div class="content">
            <div class="title">
              <div class="tilTop">
                <span class="iconfont icon-shuxian"></span>
                <span style="font-size: 18px;color: #606266;">员工管理</span>
              </div>
              <div class="tilCon">
                <span style="font-size:14px;color:#409EFF">海螺找位账号:</span>
                <span style="color:#409EFF;font-size:16px">{{name}}</span>
                <el-input
                  placeholder="请输入员工账号或姓名"
                  style="width:300px;margin-right:5px;margin-left:20px;"
                  v-model="form1.searchTxt"
                ></el-input>
                <el-button size="small" @click="searchEmp" class="aa1">搜索</el-button>
              </div>
            </div>
            <!-- 员工信息表 -->
            <div class="empTable">
              <!-- 新增员工 -->
              <div class="addEmp">
                <el-button class="aa1" @click="addEmp" size="small">新增员工+</el-button>
              </div>
              <el-table :data="empData" border :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead">
              	<el-table-column prop="id" align="center" v-show:"false"></el-table-column>
              	<el-table-column prop="roleId" align="center" v-show:"false"></el-table-column>
                <el-table-column label="员工账号" prop="username" align="center"></el-table-column>
                <el-table-column label="姓名" prop="realname" align="center"></el-table-column>
                <el-table-column label="职务" prop="position" align="center"></el-table-column>
                <el-table-column label="手机号码" prop="mobile" align="center"></el-table-column>
                <el-table-column label="权限"  align="center">
                  <template slot-scope="scope">
                    <el-button type="text" style="color:#169BD5;" @click="goDetails(scope.$index)">详情</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                  	<a style="color: #409EFF;font-size: 14px;" @click="modifyRole(scope.row.id)" v-if="scope.row.roleId!=1">分配角色</a>
                  	<a style="color: #409EFF;font-size: 14px;"  v-else>超级管理员</a>
                    <a style="color: #409EFF;font-size: 14px;margin-left: 20px;" @click="deleteEmp(scope.row.id)" v-if="scope.row.roleId==2">删除</a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 新增的对话框 创建员工-->
            <el-dialog title="添加员工" :visible.sync="dialogAdd" width="30%" center :close-on-click-modal="stopClose">
              <el-form ref="merchantForm" :model="merchantForm" label-width="120px">
                <el-form-item label="*员工账号:" prop="username">
                  <el-input
                    placeholder="请输入内容"
                    v-model="merchantForm.username"
                    style="width: 350px;"
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="realname">
                  <el-input
                    placeholder="请输入内容"
                    v-model="merchantForm.realname"
                    style="width: 350px;"
                  ></el-input>
                </el-form-item>
                <div class="txt">添加完员工后方可编辑员工权限，详细权限请到权限管理设置</div>
                <el-form-item label="*登录密码:" prop="password">
                  <el-input v-model="merchantForm.password" style="width: 350px;" type="password"></el-input>
                </el-form-item>
                <el-form-item label="*确认密码:" prop="confirmpwd">
                  <el-input v-model="merchantForm.confirmpwd" style="width: 350px;" type="password"></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="mobile">
                  <el-input v-model="merchantForm.mobile" style="width: 350px;"></el-input>
                </el-form-item>
                <el-form-item label="职务:" prop="position">
                  <el-input v-model="merchantForm.position" style="width: 350px;"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePeople">保存</el-button>
                <el-button type="primary" @click="dialogAdd=false">取 消</el-button>
              </span>
            </el-dialog>
            
            <!--分配角色-->
			        <el-dialog title="分配角色" :visible.sync="revises" width="25%" :close-on-click-modal="stopClose">
			        	<span v-show="false">{{id}}</span>
			            <el-tree :data="menuList" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="pretermit" :props="defaultProps"  @check="handleNodeClick"	ref="DeviceGroupTree">
						</el-tree>
			            <span slot="footer" class="dialog-footer">
			            	<el-button type="primary" @click="saveMenuList">保存</el-button>
			                <el-button @click="reviseFalse">取 消</el-button> 
			            </span>
			        </el-dialog>
          </div>
        </el-tab-pane>

        <el-tab-pane label="消息通知" name="third">
          <div class="content">
            <div class="title">
              <span class="iconfont icon-shuxian"></span>
              <span style="font-size: 18px;color: #606266;">消息通知</span>
            </div>
            <el-form :data="form2" ref="form2" style="width:80%;margin:75px auto;">
              <el-form-item
                v-for="(domain, index) in form2.telPhoneList"
                :prop="'telPhoneList.'+index+'.telPhone'"
                :label="'接收手机号'+(index+1)"
                style="width: 60%;margin-left:30%;margin-bottom: 0;"
              >
                <template>
                  <div style="margin-bottom: 10px;">
                    <el-input v-model="domain.telPhone" style="width: 180px;"></el-input>
                    <el-input v-model="domain.id" v-show="1==2"></el-input>
                    <i class="iconfont icon-jia use" @click="addpromptList" v-if="num==index"></i>
                    <i
                      class="iconfont icon-jian use"
                      @click="deletepromptList(domain)"
                      v-if="form2.telPhoneList.length>1"
                    ></i>
                  </div>
                </template>
              </el-form-item>
              <div
                style="width:500px;margin:24px auto;font-size:14px;line-height:20px;color:red;text-align:center;"
              >一个人最多可以设置3个不同手机号接受信息</div>
              <div style="width:50%;margin:0 auto;">
                <el-form-item prop="checkedList" style="margin-top:0px;">
                  <div style="margin: 10px 33px;width:130px;color:#606266;">设置提醒内容:</div>
                 	<el-checkbox-group v-model="form2.checkedList" @change="handleCheckedListChange" style="margin-left:180px;">
                    <el-checkbox v-for="item in contentList" :label="item" :key="item" style="display:block;">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
              <el-button class="aa1" align="center" style="display: block;margin: 50px auto;" @click="submit">保存</el-button>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- 账号安全 -->
        <el-tab-pane label="账号安全" name="fourth">
          <div>
            <!-- 账号安全页面 -->
            <div class="content" v-if="show2">
              <div class="title">
                <span class="iconfont icon-shuxian"></span>
                <span style="font-size: 18px;color: #606266;">账号安全</span>
                <span style="margin-left:40px;font-size:14px;color:#409EFF">车位宝账号:</span>
                <span style="margin-left:5px;color:#409EFF;font-size:16px">boss</span>
              </div>
              <div class="accountSafe">
                <!-- 登录密码 -->
                <div class="box box1">
                  <!-- 四分之一圆 -->
                  <div class="circle">
                    <!-- 正确符号 -->
                    <span class="iconfont icon-zhengque"></span>
                  </div>
                  <div class="con">
                    <span class="iconfont icon-font50"></span>
                    <p>登录密码</p>
                    <p>定期更换有助于账号安全</p>
                    <el-button type="text" class="pwdBtn" @click="updatePwd">修改密码</el-button>
                  </div>
                </div>
                <!-- 修改手机 -->
                <div class="box box2">
                  <!-- 四分之一圆 -->
                  <div class="circle">
                    <!-- 正确符号 -->
                    <span class="iconfont icon-zhengque"></span>
                  </div>
                  <div class="con" style="padding-top:6px;">
                    <span class="iconfont icon-bangdingshouji" style="font-size:72px;"></span>
                    <p>绑定手机</p>
                    <p>176****5241</p>
                    <div class="phoneBtn">
                      <el-button type="text" @click="updateTel">修改</el-button>
                      <el-button type="text" @click="untied">解绑</el-button>
                    </div>
                  </div>
                  <!--弹出框-->
                  <el-dialog title="提示" :visible.sync="dialogVisibleAccount" width="30%">
                    <div style="font-size:14px;">
                      <span>确定解绑已验证的账号吗?</span>
                      <div style="margin-top:10px;">
                        <el-checkbox v-model="bindAccount">禁止此页再显示对话框。</el-checkbox>
                      </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button class="aa1" @click="dialogVisibleAccount = false">确 定</el-button>
                      <el-button @click="dialogVisibleAccount = false">取 消</el-button>
                    </span>
                  </el-dialog>
                </div>
              </div>
            </div>
            <!-- 修改手机页面 -->
            <div class="content">
              <div class="title" v-if="showTel">
                <span class="iconfont icon-shuxian"></span>
                <span style="font-size: 18px;color: #606266;">便捷登录</span>
              </div>
              <div class="updateTel">
                <div class="telHead">
                  <div class="circleTel">
                    <div class="pic">
                      <span class="iconfont icon-bangdingshouji1"></span>
                    </div>
                  </div>
                  <p>修改手机号码</p>
                </div>
                <div class="conTel">
                  <el-form
                    :data="form3"
                    ref="form3"
                    style="width:600px;"
                    label-width="180px"
                    v-if="updateTelInfo"
                  >
                    <el-form-item label="当前手机号码:" prop="currentTel">
                      <span>15213779663</span>
                    </el-form-item>
                    <el-form-item prop="newTel" label="新手机号码:">
                      <el-input v-model="form3.newTel" placeholder="输入新手机号码" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item prop="newTel" label="验证码:">
                      <template>
                        <div>
                          <el-input
                            v-model="form3.newTel"
                            placeholder="输入新手机号码"
                            style="width:128px;"
                          ></el-input>
                          <el-button
                            type="text"
                            @click="getyzCode"
                            style="color:#fff;margin-left:9px"
                            class="aa1"
                          >获取验证码</el-button>
                        </div>
                      </template>
                    </el-form-item>
                    <el-form-item prop="loginPwd" label="登录密码:">
                      <el-input v-model="form3.loginPwd" placeholder="输入登录密码" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="aa1" @click="telNextStep">下一步</el-button>
                    </el-form-item>
                  </el-form>
                  <p v-if="updateSuccess">修改绑定手机成功</p>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </el-tab-pane>
      </el-tabs>
      <div class="content" v-if="show1">
        <div style="width: 95%;height:40px;margin-left: 30px;margin-bottom: 40px;">
          <span class="f1"></span>
          <span style="display:inline-block;line-height: 40px;margin-left: 20px;">修改密码</span>
        </div>
        <div style="width: 50%;margin: 0 auto;">
          <div class="updateInfo">
            <span>136****1223</span>
            <el-button type="text" style="color:#409EFF">获取验证码</el-button>
            <span style="color:#f66;">显示手机号,中间四位为星号</span>
          </div>
          <el-form :data="form" ref="form" label-width="180px" v-if="updateTelInfo">
            <el-form-item label="验证码:" prop="yzCode">
              <el-input placeholder="验证码" style="width:160px"></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="yzCode">
              <el-input placeholder="请输入新密码" style="width:160px"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="yzCode">
              <el-input placeholder="请确认密码" style="width:160px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="aa1" size="small" style="width:160px;" @click="confirmUpdate">确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 250 194 88警告橙色
  inject: ["reload"], //注入依赖
  data() {
    return {
      stopClose:false,
      labelPosition: "right",
      contentList: [
        "用户退款异常",
        "商家组团成功",
        "用户付款成功",
        "活动兑换成功"
      ],
      name:'',
      tagTitle: "个人资料",
      form: {},
      form1: {
        parkAccount: "boss",
        searchTxt: ""
      },
      form2: {
        telPhoneList: [
          {
            telPhone: 12345698752,
            id: 1
          }
          // {
          //     telPhone:12345698956,
          //     id:2
          // },
        ],
        checkedList: ["用户退款异常", "用户付款成功"]
      },
      form3: {},
      show: true,
      show1: false,
      show2: true,
      showTel: false,
      updateTelInfo: true,
      updateSuccess: false,
      num: 0,
      merchantForm: {},
      checked: false,
      dialogVisible: false,
      dialogVisible1: false,
      //解绑手机对话框
      dialogVisibleAccount: false,
      //禁止此页再显示对话框
      bindAccount: false,
      dialogAdd: false,
      activeName: "first",
      personData: {},
      empData: [
        {
          id: "3656356837093015552",
          mobile: "11",
          password: "11",
          position: "11",
          realname: "11",
          username: "11"
        },
        {
          id: "3656356837093015552",
          mobile: "11",
          password: "11",
          position: "11",
          realname: "11",
          username: "11"
        }
      ],
      revises:false,
      menuList:[],
      pretermit:[],
      defaultProps:{
      	children: 'menuTwoList',
				label: 'name'
      },
      id:'',
      checkedNodes:[]
    };
  },
  created() {
    	this.$axios.get(request.testUrl+'/project/auth1/project/selectInfo')
			.then(res=>{
				if(res.data.code==0){
					this.name=res.data.data.projectInfoVo.name
				}
			})
			this.$axios.post(request.testUrl+'/project/auth1/role/findListRole')
				.then(res=>{
				if(res.data.code==0){
					this.menuList=res.data.data
				}else{
					this.$message({
						type:'success',
						message:res.data.msg
					})
				}
			})
    //查询所有员工信息
    this.resh();
    //渲染消息通知
    this.saveOne()
    //默认选择标签
    this.activeName=localStorage.getItem('activeName')||'first';
    // this.reload();
  },
  methods: {
    handleClick(tag) {
      this.tagTitle = tag.label;
      this.activeName=tag.name;
      localStorage.setItem('activeName',this.activeName)
    },
    //手机号验证弹窗
    handleTel() {
      this.dialogVisible = true;
    },
    //下一步
    nextStep() {
      this.dialogVisible = false;
      this.dialogVisible1 = true;
    },
    //获取验证码按钮
    getCode() {
      alert("获取验证码");
    },
    //获取验证码成功
    success() {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      this.personData.verification = false;
      this.show = true;
    },
    //保存跳到下一步
    save() {
      console.log(this.personData);
      let text = this.personData;
      this.$axios
        .post(request.testUrl + "/project/auth1/employee/update", text)
        .then(res => {
          if (res.data.code == 0) {
            this.resh();
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
    },

    //搜索按钮
    searchEmp() {
      console.log(this.form1.searchTxt);
      let value = this.form1.searchTxt;
      this.resh(value);
      this.reload();
    },
    //新增员工弹窗
    addEmp() {
      this.dialogAdd = true;
    },
    //新增员工保存
    savePeople() {
      let text = this.merchantForm;
      if(text.password==""){
        delete text.password;
      }
      if(text.username==""){
        delete text.username;
      }
      delete text.confirmpwd;
      if(this.merchantForm.confirmpwd!=this.merchantForm.password){
        this.$message({
          type:'warning',
          message:'两次密码不一致'
        })
        return;
      }
      this.$axios
        .post(request.testUrl + "/project/auth1/employee/add", text)
        .then(res => {
          if (res.data.code == 0) {
            this.resh();
            this.activeName=localStorage.getItem('activeName')||'first';
          }else{
          	this.$message({
							type:'info',
							message:res.data.msg
						})
          }
        });

      this.dialogAdd = false;
    },
    //权限详情
    goDetails(index) {
    	this.$router.push({ path: "/权限详情", query: { id: this.empData[index].id}});
    },
    //分配角色
    modifyRole(id){
    	this.id=id
			this.revises=true
			var params=new URLSearchParams();
			params.append('employeeId',id)
			this.$axios.post(request.testUrl+"/project/auth1/employeeRole/findRoleForEmployee",params)
			   .then(res=>{
				   	if(res.data.code==0){
				   		this.pretermit=res.data.data.map(e=>(e.id))
				   	}else{
				   		this.$message({
							type:'info',
							message:res.data.msg
						})
				   	}
				   
			   })
    },
    //树形结构点击
    handleNodeClick(a,b){
    	this.checkedNodes=b.checkedNodes
    },
    //分配角色保存
    saveMenuList(){
      console.log(this.checkedNodes)
    	if(this.checkedNodes.length>0){
    		let ids=this.checkedNodes.map(e=>(e.id))
				this.$axios({
					method:'post',
		        	url:request.testUrl+"/project/auth1/employeeRole/addRoleForEmployee",
		        	data:{
		        		id:this.id,
		        		roleIds:ids
		        	}
				}).then(res=>{
					if(res.data.code==0){
						this.revises=false
            this.reload()
            this.activeName=localStorage.getItem('activeName')||'first';
					}else{
						this.$message({
							type:'info',
							message:res.data.msg
						})
					}
				})
    	}else{
        var arr=['-1'];
        this.revises=false;
        this.$axios({
          method:'post',
          url:request.testUrl+"/project/auth1/employeeRole/addRoleForEmployee",
          data:{
            id:this.id,
            roleIds:arr
          }
        }).then(res=>{
          console.log(res.data)
        })
    		this.reload()
    	}
    		
    },
    reviseFalse(){
    	this.revises=false
    	this.reload()
    },
    //删除
    deleteEmp(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
	        .delete(request.testUrl + "/project/auth1/employee/" + id)
	        .then(res => {
	          if (res.data.code == 0) {
	            this.resh();
	          }else{
	          	this.$message({
		            type: "info",
		            message: res.data.msg
		          });
	          }
	        });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //增加提示
    addpromptList() {
      if (this.num == 2) {
        alert("一个人最多可以设置3个不同手机号接受信息");
        return;
      }
      this.form2.telPhoneList.push({});
      this.num = this.form2.telPhoneList.length - 1;
    },
    //删除
    deletepromptList(item) {
      var index = this.form2.telPhoneList.indexOf(item);
      if (index !== -1) {
        this.form2.telPhoneList.splice(index, 1);
      }
      this.num = this.form2.telPhoneList.length - 1;
    },
    //多选
    handleCheckedListChange() {},
    //消息通知渲染
    saveOne(){
    	this.$axios.get(request.testUrl + "/project/auth1/send/getSendData")
        .then(res => {
          if (res.data.code == 0) {
            
          }
        });
    },
    //消息通知保存
    submit(){},
    //修改密码
    updatePwd() {
      this.show = false;
      this.tagTitle = "账号安全";
      this.show1 = true;
    },
    //修改手机
    updateTel() {
      // alert('修改手机');
      this.tagTitle = "绑定手机";
      this.show2 = false;
      this.showTel = true;
    },
    confirmUpdate() {
      alert("确认修改");
    },
    //解绑手机
    untied() {
      // alert('解绑手机');
      this.dialogVisibleAccount = true;
    },
    //修改手机获得验证码
    getyzCode() {
      alert("获得验证码");
    },
    telNextStep() {
      alert("修改手机号码之后的下一步");
      this.updateTelInfo = false;
      this.updateSuccess = true;
    },
    //刷新页面
    resh(value) {
      let text = {
        current: "1",
        pageSize: "1000000",
        realname: value,
        username: value
      };
      //获取已添加员工列表
      this.$axios
        .post(request.testUrl + "/project/auth1/employee/pageList", text)
        .then(res => {
          if (res.data.code == 0) {
            this.empData = res.data.data.records;
            console.log(this.empData);
          }
        });
      //获取登陆人信息
      this.$axios
        .get(request.testUrl + "/auth/project/auth/" + localStorage.tokens)
        .then(res => {
          if (res.data.code == 0) {
            this.personData = res.data.data;
          }
        });
        this.activeName=localStorage.getItem('activeName')||'first';
    }
  }
};
</script>
<style scoped>
h2 {
  text-align: left;
  padding-left: 40px;
}
.title {
  display: flex;
  font-size: 14px;
  height: auto;
  line-height: 60px;
}
.tilCon {
  width: 580px;
  margin: 0 auto;
}
.title .icon-shuxian {
  font-size: 16px;
  padding-right: 4px;
  color: rgb(1, 119, 213);
}
/* 1 119 213 */
.tabs {
  width: 90%;
  height: auto;
  overflow: hidden;
  margin: 40px auto;
}
.content {
  /* height:900px; */
  overflow: hidden;
}
.el-button--primary {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.yzCode {
  margin-left: 13px;
  margin-right: 8px;
}
.footBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sucInfo {
  display: block;
  margin: 0 auto;
  text-indent: 70px;
}
.empInfo {
  width: 600px;
  margin: 10px auto 0;
}

.empTable {
  width: 80%;
  /* height:auto; */
  margin: 40px auto 0;
}
.empTable .addEmp {
  float: right;
  margin-bottom: 30px;
}
.txt {
  color: #f66;
  font-size: 14px;
  line-height: 20px;
  margin: 14px auto 36px;
  text-align: center;
}
/* 添加减少符号样式 */
.use {
  display: inline-block;
  font-size: 26px;
  margin-left: 10px;
  color: #409eff;
  line-height: 20px;
  vertical-align: middle;
}
/* 账号安全 */
.accountSafe {
  display: flex;
  width: 99%;
  height: 386px;
  overflow: hidden;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  margin-left: 10px;
}
.box {
  position: relative;
  width: 180px;
  height: 240px;
  margin: 50px 40px 0 80px;
  border: 1px solid #bbb;
  background-color: #fff;
  border-radius: 5px;
}
.accountSafe .box1 {
  box-shadow: 0px 0px 3px 4px rgba(1, 1, 1, 0.05);
}
/* 四分之一圆样式 */
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 26px;
  height: 26px;
  background-color: #09bb07;
  border-radius: 0 0 0 26px;
}
.circle .icon-zhengque {
  margin-left: 4px;
  margin-top: -2px;
  font-size: 22px;
  color: #fff;
  text-align: center;
  line-height: 26px;
}
/* 中间内容区域 */
.box .con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: center;
}
.con span {
  font-size: 68px;
  line-height: 68px;
  margin: 30px auto 20px;
  color: #409eff;
}
.con p {
  text-align: center;
  font-size: 14px;
  color: #000;
}
.con p:nth-child(2) {
  text-align: center;
  color: #aaa;
  margin: 10px 0;
}
.phoneBtn {
  display: flex;
  justify-content: center;
}
.pwdBtn {
  width: 60%;
  border: 1px solid #409eff;
  margin: 10px auto 0;
}
.phoneBtn button {
  border: 1px solid #409eff;
  padding: 5px 10px;
  margin-top: 15px;
}
/* 修改密码 */
.updateInfo {
  font-size: 14px;
  width: 900px;
  margin-left: 90px;
  margin-bottom: 20px;
}
.updateInfo > button {
  margin: 0 80px 0 20px;
}
.updateTel {
  width: 90%;
  height: auto;
  margin: 10px auto;
  padding: 35px 0 0 75px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.telHead {
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid #aaa;
  padding-bottom: 20px;
}
.circleTel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  background-color: rgb(102, 204, 255);
  border-radius: 50%;
  margin-right: 20px;
}
.circleTel .pic {
  width: 40px;
  height: 48px;
  background-color: #fff;
}
.circleTel .pic span {
  line-height: 48px;
  font-size: 40px;
}
.telHead p {
  font-size: 16px;
}
.conTel {
  margin-top: 30px;
}
.conTel p {
  font-size: 14px;
  color: #000;
  margin: 110px 0 90px 50px;
}
.aa1 {
  background: #9768e5;
  color: #ffffff;
}
.aa1:hover {
  background: #7764ea !important ;
  color: #ffffff !important;
}
.aa1:focus {
  background: #7764ea !important ;
  color: #ffffff !important;
}
.f1 {
  display: inline-block;
  width: 20px;
  height: 100%;
  background: #9768e5;
  float: left;
}
.tableHead{
	font-size: 14px;
	letter-spacing: 1px;
}
.el-dialog__headerbtn{
	display: none!important;
}
</style>