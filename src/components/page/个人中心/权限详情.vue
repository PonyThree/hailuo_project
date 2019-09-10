<template>
    <div class="details">
       	<div class="info">
				<div class="title">
					<span class="f1"></span>权限详情
				</div>
				<div class="roleinfo">
                    <p>用户名：{{employeeTable.username||'暂无数据'}}</p>
                    <p>真实姓名：{{employeeTable.realname||'暂无数据'}}</p>
                    <p>手机号码：{{employeeTable.mobile||'暂无数据'}}</p>
                    <p>职务：{{employeeTable.position||'暂无数据'}}</p>
                    <div class="roles" v-if="employeeTable.roleNames.length>0">
                        <p>拥有角色名称：</p>
                        <div style="width: 99%;background: #FFFFFF;">
	                        <div class="rolesName" v-for="(item,index) in employeeTable.roleNames" :key="item.id" >
	                         	<div style="float: left;width: 90%;margin-bottom: 20px;">
	                         		<div style="display:block;">{{index+1}}.{{item.name}} </div>
	                             	<div  style="display:block;">描述：{{item.description||'暂无数据'}} </div>
	                             	<div  style="display:block;">创建时间：{{item.createTime||'暂无数据'}} </div>
	                            	<div  style="display:block;"> 修改时间：{{item.modifyTime||'暂无数据'}} </div>
	                         	</div>
	                             
	                            <div style="float: left;width: 30%;">
	                            	角色拥有的菜单：
	                            	<el-tree :data="item.menuList" node-key="id" :default-expand-all="true" :props="defaultProp1">
								    </el-tree>
	                            </div>
	                            
	                        </div>
                        </div>
                    </div>
                </div> 
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.query.id,
            employeeTable:{
            	roleNames:[]
            },
            pretermit:[],
            defaultProp1:{
	        	children: 'menuTwoList',
	            label: 'name'
	        },
        }
    },
    created(){
        this.renderData();
    },
    methods:{
        // 时间站位+0
        addZero (n) {
            return n < 10 ? '0' + n : n
        },
        handleTime(d){
        	if(d!=null){
        		var d = new Date(d);    //根据时间戳生成的时间对象
	            var time = (d.getFullYear()) + "-" + 
	                        (this.addZero(d.getMonth() + 1)) + "-" +
	                        (this.addZero(d.getDate())) + " " + 
	                        (this.addZero(d.getHours())) + ":" + 
	                        (this.addZero(d.getMinutes())) + ":" + 
	                        (this.addZero(d.getSeconds()));    
	            return time;
        	}
            
        },
        //数据加载
        renderData(){
            this.$axios.get(request.testUrl+"/project/auth1/employee/"+this.id).then(res=>{
                if(res.data.code==0){
                    this.employeeTable=res.data.data;
                    for(var i=0;i<this.employeeTable.roleNames.length;i++){
                        this.employeeTable.roleNames[i].createTime=this.handleTime(this.employeeTable.roleNames[i].createTime)
                        this.employeeTable.roleNames[i].modifyTime=this.handleTime(this.employeeTable.roleNames[i].modifyTime)
                    }
                }
            })
        }
    }
}

</script>

<style scoped>
.details{
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
.info .roleinfo{
    width: 96%;
    background:#F8F8F8;
    padding-top:20px;
    padding-bottom:20px;
    padding-left: 60px;
}
.roleinfo  p{
    width: 25%;
    text-align: left;
    font-size:14px;
    color:#333333;
    display: inline-block;
}
.roles{
    width: 1500px;
}
.roles .rolesName{
    width: 50%;
    float: left;
    padding-left:100px;
    padding-top: 50px;
    box-sizing: border-box;
    padding-bottom: 20px;
}

.rolesName span{
    display: inline-block;
    /* padding:10px; */
    /* margin-left:100px; */
    font-size:14px;
    margin-left:60px;
}
.rolesName span:nth-child(1){
    font-size: 16px;
    margin-right: 40px;
}
.rolesName span{
	margin-right: 0!important;
	margin-left: 0!important;
}
.el-tree{
	color: #000000!important;
}
</style>