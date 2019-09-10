<template>
	<div>
		<div class="mains">
			<el-form :model="form">
				<div class="head">{{name}}销售数据看板</div>
				<div class="right" v-show="indexs==2||indexs==3">
					<el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束日期时间" class="data" @change="chaiseData"></el-date-picker>
					<el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始日期时间" class="data" ></el-date-picker>
				</div>
				
				<!--tabs切换-->
				<div class="search">
					<div @click="downs" :class="{actives:color==true}">全部</div>
					<div v-for="(item,index) in tabTitle" @click="downInfo(index)" :class="{active1:listInfo.indexOf(item)!=-1}">{{item}}
						<span v-if="(indexs==2||indexs==3)&&index==indexs">{{tabList.length}}</span>
					</div>
				</div>
				
				<div class="choise">
					<el-select v-model="form.level2" placeholder="请选择楼栋" style="width: 150px;float: right;margin-left: 10px;" @change="chaiseLevel2">
					    <el-option label="所有状态" value=""></el-option>
						<el-option v-for="item in level2Info" :label="item.name" :value="item.id"></el-option>
				    </el-select>
				    <el-select v-model="form.level3" placeholder="请选择楼层" style="width: 150px;float: right;" @change="chaiseLevel3">
					    <el-option label="所有状态" value=""></el-option>
						<el-option v-for="item in level3Info" :label="item.name" :value="item.id"></el-option>
				    </el-select>
				</div>
				
				<!--标识展示-->
				<div class="identification">
					<div><span style="background: #67c23a;"></span><div>可销售</div></div>
					<div><span style="background: #f56c6c;"></span><div>已落位</div></div>
					<div><span style="background: #e6a23c;"></span><div>已认购</div></div>
					<div><span style="background: #999999;"></span><div>不可购买</div></div>
					<!--<div><span style="background: rgb(151, 104, 229);"></span><div>暂停销售/策略售出</div></div>-->
				</div>
				
				<!--列表-->
				<ul class="listOne">
					<li v-for="item in tabList" :class="colorArr[item.status]" class="gary">
						<span>{{item.name}}</span>
						<div v-if="item.status==1">{{item.downSpaceNum}}人落位</div>
						<div v-else>{{item.sellPrice}}元</div>
					</li> 
				</ul>
				<!--底部统计-->
				<div class="bottom">
					<ul class="tal" v-model="statisticsRespDto">
						<li class="single">
							<span>累计已销售数</span>
							<div>{{statisticsRespDto.sellTotal}}</div>
						</li>
						<li class="single">
							<span>已落位人数</span>
							<div>{{statisticsRespDto.downSpaceNum}}</div>
						</li>
						<li class="single">
							<span>可销售数</span>
							<div>{{statisticsRespDto.ableSell}}</div>
						</li>
						<li class="single">
							<span>总认购数量</span>
							<div>{{statisticsRespDto.subPay}}</div>
						</li>
					</ul>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		name:'stencil',
		data(){
	        return {
	        	name:'',
	        	form:{
	        		startTime:'',
	        		endTime:'',
	        		level2:'',
	        		level3:'',
	        		sellStatus:'',
	        	},
	        	tabTitle: ['可销售', '已落位', '已认购','已出售'],
	        	cur: 0, //默认选中第一个tab
	        	level2Info:[],
	        	level3Info:[],
	        	listInfo:'',
	        	color:true,
	        	indexs:'',
	        	tabList:[],
	        	statisticsRespDto:{},
	        	colorArr:['green','red','oragin','gary','gary','gary','gary','gary','gary'],
	        }
	        
	  	},
	  	created(){
	  		this.$axios.get(request.testUrl+'/project/auth1/project/selectInfo')
				.then(res=>{
					if(res.data.code==0){
						this.name=res.data.data.projectInfoVo.name
					}
				})
	  		//渲染楼栋二级列表
		    this.$axios.get(request.testUrl+"/product/auth1/truckSpaceFloor/selectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.level2Info=res.data.data
		            }
		    	})
		    //渲染楼栋三级列表
		    this.$axios.get(request.testUrl+"/product/auth1/truckSpaceRidgepole/doSelectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.level3Info=res.data.data
		            }
		    	})
		    //查询信息
		    this.save()
	  	},
	  	methods:{
	  		//车位标签全部
	    	downs(){
	    		if(this.color==false){
	    			this.color=true
	    			this.listInfo=[]
	    		}else{
	    			this.color=false
	    		}
	    		this.indexs=''//时间日期消失
	    		this.save()
	    	},
	  		//标签点击选择
      		downInfo(index){
      			this.color=false
	    		let listInfo=this.listInfo
	    		let tabTitle= this.tabTitle[index]
	    		if(listInfo.indexOf(tabTitle)==-1){//判断id是否存在
	    			listInfo=tabTitle
	    		}
	    		else{
	    			let infoindex=listInfo.indexOf(tabTitle)//存在删除
	    			listInfo.splice(infoindex,1)
	    		}
	    		this.listInfo=listInfo
	    		this.indexs=index
	    		this.save()
      		},
      		//选择时间
      		chaiseData(){
      			this.save()
      		},
      		//选择层
      		chaiseLevel2(){
      			this.save()
      		},
      		//选择栋
      		chaiseLevel3(){
      			this.save()
      		},
      		//查询数据
      		save(){
      			this.$axios({
		        	method:'post',
		        	url:request.testUrl+"/product/auth1/truckSpace/truckSpacePanel",
		        	data:{
		        		startTime:this.form.startTime,
		        		endTime:this.form.endTime,
		        		level2:this.form.level2,
		        		level3:this.form.level3,
		        		sellStatus:this.indexs
		        	}
				}).then(res=>{
					if(res.data.code==0){
						this.tabList=res.data.data.panelOneRespDtos
						this.statisticsRespDto=res.data.data.statisticsRespDto
//						if(res.data.data.panelOneRespDtos!=[]){
//							this.name=res.data.data.panelOneRespDtos[0].name
//						}
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
	.mains{
		width: 96%;
		background: #d9ecff;
		height: auto;
		overflow: hidden;
		margin: 20px auto;
	}
	.mains .head{
		width: 50%;
		float: left;
		font-size: 16px;
		color:#303133;
		line-height: 30px;
		margin-top: 10px;
	}
	.mains .right{
		width: 50%;
		float: right;
		margin-top: 10px;
	}
	.mains .right .data{
		float: right;
	}
	.mains .search{
		width: 58%;
		margin-top: 20px;
		float: left;
		margin-left: 10px;
	}
	.mains .search:hover{
		cursor: pointer;
	}
	.mains .search .active1{
		background-color: #09f;
        color: #fff;
	}
	.actives{
		background-color: #09f;
        color: #fff;
	}
	.mains .search div{
		display: inline-block;
		border: 1px solid #dcdfe6;
		color: #606266;
		font-size: 14px;
		line-height: 36px;
		padding: 0 19px 0 19px;
	}
	.mains .choise{
		width: 40%;
		margin-top: 20px;
		float: right;
	}
	/*标识展示*/
	.mains .identification{
		width: 100%;
		float: left;
		margin-top: 40px;
		margin-bottom: 20px;
	}
	.identification div{
		display: inline-block;
		margin: 0 30px 0 10px;
	}
	.identification div span{
		display:block;
		width: 80px;
		height: 30px;
		border-radius: 1px;
		float: left;
		margin-right: 10px;
	}
	.identification div div{
		float: left;
		line-height: 30px;
		color: #606266;
		font-size: 14px;
		
	}
	/*列表展示*/
	.mains .listOne{
		width: 100%;
		height: auto;
		overflow: hidden;
		border-top:1px solid #dcdfe6;
		float: left;
		padding-bottom: 30px;
	}
	.mains .listOne li.gary{
		list-style: none;
		width: 80px;
		height: 74px;
		background:#999999;
		border-radius: 1px;
		margin: 20px 8px 0 8px;
		float: left;
	}
	.mains .listOne li.green{
		background:#67c23a
	}
	.mains .listOne li.red{
		background:#f56c6c
	}
	.mains .listOne li.oragin{
		background:rgb(230, 162, 60)
	}
	/*.mains .listOne li.gary{
		background:#999999
	}*/
	.mains .listOne li span{
		display: block;
		width: 100%;
		height: 32px;
		color: #FFFFFF;
		font-size: 16px;
		text-align: center;
		line-height: 32px;
	}
	.mains .listOne li div{
		width: 78px;
		height: 40px;
		font-size: 16px;
		background: #FFFFFF;
		color: #333333;
		line-height: 40px;
		text-align: center;
		margin: 0 auto;
	}
	/*底部统计*/
	.bottom{
		width: 100%;
		height: 220px;
		background: #FFFFFF;
		float: left;
	}
	.bottom .tal{
		width: 100%;
		height: 120px;
		margin-top: 40px;
		background: #f8f8f8;
	}
	.bottom .tal .single{
		display: inline-block;
		height: 80px;
		border-right: 1px solid #dcdfe6;
		margin-top: 20px;
	}
	.bottom .tal .single:last-child{
		border-right: none;
	}
	.bottom .tal .single span{
		display: inline-block;
		color: #909399;
		font-size: 18px;
		padding: 0 40px 0 40px;
		line-height: 50px;
		font-size: 18px;
	}
	.bottom .tal .single div{
		display: block;
		text-align: center;
		color: #303133;
		font-size: 16px;
		line-height: 20px;
		font-weight: bold;
	}
</style>