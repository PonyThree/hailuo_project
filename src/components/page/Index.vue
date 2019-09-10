<template>
       <div>
           <div class="indexPage">
               <!-- 头部信息 -->
                <!-- <div class="title">
                    <span>海螺找位项目端后台</span>
                    <div class='head'>
                        <img src='../../assets/img/img.jpg' class='headPic'/>
                        <p @click="clickP" style="cursor: pointer;">{{name}}</p>
                    </div>
                </div>  -->
                <!-- 头部信息 -->
                <div class="title">
                    <span>平台后端</span>
                    <div class='head'>
                        <div class="headName" @click="showLogout">
                            <span>{{name}}</span>
                            <el-icon class="el-icon-caret-bottom"></el-icon>
                        </div>
                        <img src='../../assets/img/img.jpg' class='headPic'/>
                        <el-button class="logout" v-if="show" @click="logot">退出登录</el-button>
                    </div>
                </div>
                <!-- 内容区域 -->
                <div class="content">
                    <div class="list" v-for="(item,index) in projectList" :key="index">
                        <div class='desc'>
                            <p>{{item.title}}</p>
                            <p>{{item.desc}}</p>
                        </div>
                        <div class='btn'>
                            <el-button type='primary' @click='jumpPage(item.title)'>{{item.jumpTxt}}</el-button>
                        </div>
                    </div>
                </div>
           </div>
       </div>
</template>
<script>
export default {
    data(){
        return{
            show:false,
        	name:'',
        	roleId:'',
            projectList:[
                {
                    title:'项目管理',
                    desc:'创建项目,项目管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'车位管理',
                    desc:'项目车位管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'订单管理',
                    desc:'项目订单管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'客户管理',
                    desc:'项目客户管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'财务报表',
                    desc:'项目财务报表',
                    jumpTxt:'前往管理'
                },
                {
                    title:'个人中心',
                    desc:'项目个人中心',
                    jumpTxt:'前往管理'
                },
                {
                    title:'权限管理',
                    desc:'项目权限管理',
                    jumpTxt:'前往管理'
                },
            ],
            list:[]
        }
    },
    created(){
        let that=this;
    	that.$axios.get(request.testUrl+'/project/auth1/project/selectInfo')
			.then(res=>{
				if(res.data.code==0){
					that.name=res.data.data.projectInfoVo.name
				}
			})
			
		that.$axios({
		        	method:'post',
		        	url:request.testUrl+"/auth/project/login",
		        	data:{
		        		username:localStorage.getItem('account'),
		        		password:localStorage.getItem('password'),
		        	}
			}).then(res=>{
						if(res.data.code==0){
							that.roleId=res.data.data.roleId
							if(that.roleId==1){
								that.projectList
							}else{
								that.projectList=[]
								for(var i=0;i<res.data.data.menuList.length;i++){
									that.projectList.push({
										title:res.data.data.menuList[i].name,
										desc:'项目'+res.data.data.menuList[i].name,
										jumpTxt:'前往管理',
										menuTwoList:res.data.data.menuList[i].menuTwoList
									})
								}
								
							}
						}else{
							that.$message({
								type: 'info',
								message: res.data.msg
							});	
						}		
	        		})	
		
    },
    methods:{
        showLogout(){
            this.show=!this.show;
        },
        logot(){
            this.$router.push("/login");
        },
        jumpPage(i){
            if(this.roleId==1){
                console.log(i);
            	if(i=='项目管理'){
	                this.$router.push('/项目信息');
	            }
	            if(i=='车位管理'){
	                this.$router.push('/车位管理');
	            }
	            if(i=='订单管理'){
	                this.$router.push('/订单列表');
	            }
	            if(i=='客户管理'){
	                this.$router.push('/客户管理');
	            }
	             if(i=='财务报表'){
	                this.$router.push('/财务报表');
	            }
	             if(i=='个人中心'){
	                this.$router.push('/设置');
	            }
	             if(i=='权限管理'){
	                this.$router.push('/角色管理');
	            }
            }else{
            	for(var j=0;j<this.projectList.length;j++){
					if(i==this.projectList[j].title){
						if(i=='项目管理'){
							this.$router.push('/'+this.projectList[j].menuTwoList[0].name);
			            }
			            if(i=='车位管理'){
			                this.$router.push('/'+this.projectList[j].menuTwoList[0].name);
			            }
			            if(i=='订单管理'){
			                this.$router.push('/'+this.projectList[j].menuTwoList[0].name);
			            }
			            if(i=='订单管理'){
			                this.$router.push('/'+this.projectList[j].menuTwoList[0].name);
			            }
			             if(i=='财务管理'){
			                this.$router.push('/'+this.projectList[j].menuTwoList[0].name);
			            }
			             if(i=='个人中心'){
			                this.$router.push('/'+this.projectList[j].menuTwoList[0].name);
			            }
			             if(i=='权限管理'){
			                this.$router.push('/'+this.projectList[j].menuTwoList[0].name);
			            }
					}
				}
            	
            }
            
        },
        clickP(){
        	this.$confirm('确定要退出登录吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$router.push('/login');
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				});
			});
        }
    }

}
</script>
<style scoped>
    .el-button--primary {
	    color: #fff!important;
	    background-color: #9768e5!important;
	    border-color: #9768e5!important;
	}
    .indexPage{
       width:100%;
       height:auto;
       margin:30px auto 0;
       background-color: #fff;
       overflow: hidden;
    }
    /* 头部信息
    .title{
        box-sizing: border-box;
        display:flex;
        justify-content: space-between;
        width:80%;
        height:80px;
        padding-left:30px;
        padding-right:30px;
        margin:0 auto;
        background-color: #e9eaec;
        font-size:20px;
        line-height:80px;
    }
    .headPic{
        display: block;
        width:50px;
        height:50px;
        border-radius:50%;
        margin: 5px auto;
    }
    .title .head p{
    	display: block;
        text-align: center;
        line-height: 20px;
        font-size:14px;
        margin-top:1px;
        height:20px;
    } */
    /* 头部信息 */
    .title{
        box-sizing: border-box;
        display:flex;
        justify-content: space-between;
        width:60%;
        height:80px;
        padding-left:30px;
        padding-right:30px;
        margin:0 auto;
        background-color: #f3f3f3;
        font-size:14px;
        line-height:80px;
        border:1px solid #bbb;
    }
    .title .head{
        position: relative;
        float: right;
        width:300px;
        height:80px;
    }
    .headName{
        float:right;
        margin-top:17px;
        height:60px;
    }
    .title .head img{
        float:right;
        width:50px;
        height:50px;
        margin-right:6px;
        border-radius:5px;
        margin-top:17px;
    }
    .logout{
        position:absolute;
        right:0;
        top:84px;
    }
    /* 内容区域 */
    .content{
        width:80%;
        margin:0 auto;
        height:auto;
        overflow: hidden;
    }
    .content::after{
        display: block;
        content:'';
        clear: both;   
    }
    
    .list{
        float:left;
        width:220px;
        height:200px;
        border-radius:5px;
        margin-left:65px;
        margin-top:60px;
        overflow: hidden;
        border:1px solid gray;
    }
    .list .desc{
        box-sizing: border-box;
        text-align: center;
        width:220px;;
        height:140px;
        padding-top:30px;
        background-color: #fff;
    }
    .list .desc p:nth-child(1){
        font-size:20px;
        color:#606266;
    }
    .list .desc p:nth-child(2){
        font-size:16px;
        margin-top:30px;
        color:#909399;
    }
    .btn button{
        display: block;
        width:100%;
        color:#fff;
        height:60px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        letter-spacing: 1px;
    }
</style>
