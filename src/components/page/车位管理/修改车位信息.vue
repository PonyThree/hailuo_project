<template>
	<div>
		<el-form class="main" >
			<!--基本信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>基本信息</div>
				<div class="ff1">
					<el-form :model="form" :label-position="labelPosition" label-width="120px" :rules="rules" ref="form">
						<div class="left">
							<el-form-item label="车位名称:" prop="name">
				                <el-input v-model="form.name" placeholder="请输入车位名称" style="width: 410px;"></el-input>
				           	</el-form-item>
							<el-form-item label="车位位置:" prop="level3">
				                <el-select v-model="form.level1" placeholder="请选择状态" style="width: 130px;">
								    <el-option label="所有状态" value=""></el-option>
								    <el-option v-for="item in level1Info" :label="item.name" :value="item.id"></el-option>
							    </el-select>
							    <el-select v-model="form.level2" placeholder="请选择状态" style="width: 130px;margin: 0 10px 0 10px;">
								    <el-option label="所有状态" value=""></el-option>
								    <el-option v-for="item in level2Info" :label="item.name" :value="item.id"></el-option>
							    </el-select>
							    <el-select v-model="form.level3" placeholder="请选择状态" style="width: 130px;">
								    <el-option label="所有状态" value=""></el-option>
								    <el-option v-for="item in level3Info" :label="item.name" :value="item.id"></el-option>
							    </el-select>
				           	</el-form-item>
			           	</div>
			           	<div class="right">
				           	<el-form-item label="建筑面积（m²）:" prop="outsideArea">
				                <el-input v-model="form.outsideArea" placeholder="请输入车位面积（㎡）" style="width: 410px;"></el-input>
				           	</el-form-item>
				           	<el-form-item label="套内面积（m²）:">
				                <el-input v-model="form.insideArea" placeholder="请输入车位面积（㎡）" style="width: 410px;"></el-input>
				           	</el-form-item>
			           	</div>
					</el-form>
				</div>
			</div>
			<!--车位其他信息-->
			<div class="info">
				<div class="title"><span class="f1"></span>车位其他信息</div>
				<div class="ff1">
					<el-form :model="form" :label-position="labelPosition" label-width="160px" :rules="rules" ref="form">
						<div class="left">
							<el-form-item label="底价（元）:" prop="floorPrice">
				                <el-input v-model="form.floorPrice" placeholder="请输入车位底价" style="width: 410px;" @blur.prevent="down1"></el-input>
				            </el-form-item>
				           	<el-form-item label="最终销售价（元）:">
				                <el-input v-model="form.sellPrice" placeholder="请输入车位最终销售价" style="width: 410px;" @blur.prevent="down"></el-input>
				           	</el-form-item>
			           	</div>
			           	<div class="right">
				           	<el-form-item label="表价（元）:">
				                <el-input v-model="form.facePrice" placeholder="请输入车位表价，表价应大于底价" style="width: 410px;" @blur.prevent="downs"></el-input>
				           	</el-form-item>
			           	</div>
			           	<div style="width: 100%;height: auto;overflow: hidden;">
			           		<el-form-item label="车位类别标签:">
				                <el-select v-model="tagResp" placeholder="请选择状态" style="width: 200px;" @change="touchs">
								    <el-option label="所有状态" value="all" key="all"></el-option>
								    <el-option v-for="item in tagIdsInfo" :key="item.id" :label="item.typeName" :value="item.id" ></el-option>
							    </el-select>
							    <div style="width: 100%;margin-top: 30px;">
							    	<div class="tagg" v-for="item,index in infoTag" @click="downInfo(index)" :class="{active1:decide(listInfo,item)!=-1}">{{item.name}}
							    		<span v-show="false">{{item.id}}</span>
							    	</div>
							    </div>
							</el-form-item>
							<el-form-item label="已添加标签:">  
							    <el-checkbox-group v-model="tagRespDtos" style="display: inline-block;">
							    	<el-checkbox v-for="item in listInfo" :label="item.id" :key="item.name">{{item.name}}</el-checkbox> 
							    </el-checkbox-group>
								<a style="margin-left: 20px;color: #409EFF;" @click="deleted(tagRespDtos)">删除</a>
							</el-form-item>
			           	</div>
			           	<div style="width: 100%;height: auto;overflow: hidden;">
			           		<el-form-item label="发布:" style="width: 30%;float: left;">
				                <el-switch v-model="form.carSpaceStatus" active-color="#8d73c0" inactive-color="gray"></el-switch>
				           	</el-form-item>
				           	<el-form-item label="设为暂停销售:" style="width: 30%;float: left;">
				                <el-switch v-model="form.stopSell" active-color="#8d73c0" inactive-color="gray" @change="stopSell"></el-switch>
				           	</el-form-item>
				           	<el-form-item label="设为策略销售:" style="width: 30%;float: left;">
				                <el-switch v-model="form.sellStatus" active-color="#8d73c0" inactive-color="gray" @change="sellStatus"></el-switch>
				           	</el-form-item>
			           	</div>
					</el-form>
				</div>
			</div>
			<!--车位图片-->
			<div class="info">
				<div class="title"><span class="f1"></span>车位详情图片</div>
				<div class="ff1">
					<el-form>
						<el-form-item>
			               	<div style="width: 200px;float: left;margin-left: 60px;margin-right: 60px;">
			               		<img src="../../../assets/img/login-bg2.jpg" alt="" style="width: 200px;height:100px;"/>
			               		<div style="width: 200px;display: inline-block;line-height: 20px;">示例图说明：上传的车位详情图片需清晰，正面图片，方便用户进行选购车位。</div>
			               	</div>
			               		<div class="pic-box" style="width: 60%;height:auto;overflow: hidden;float: left;">
		                        <div class="upload_warp">
		                        	<div class="upload_warp_left img-uploads" v-for="(item,index) in form.truckSpaceImages" >
		                                <div class="upload_warp_img_div_del" @click="banner_fileDel(index)"></div>
		                                <img :src="item" v-if="item" class="avatar mt0">
		                            </div>
		                            <div class="upload_warp_left img-uploads" @click="homeImg_file">
		                                <img class="avatar mt0">
		                            </div>
		                        </div>
		                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
		                    </div>
			           	</el-form-item>
					</el-form>
				</div>
			</div>
			<div style="width: 25%;margin: 40px auto;">
				<el-button class="aa1" style="margin-left: 50px;" @click="release">保存并发布</el-button>
				<el-button class="aa1" style="margin-left: 50px;" @click="save">保存</el-button>
			</div>
			
		</el-form> 
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'modify-parking',
		data(){
	        return {
	        	labelPosition:'left',
	        	form:{
	        		name:'',
	        		level1:'',
	        		level2:'',
	        		level3:'',
	        		outsideArea:'',
	        		insideArea:'',
	        		floorPrice:'',
	        		sellPrice:'',
	        		facePrice:'',
	        		carSpaceStatus:false,
	        		stopSell:false,
	        		sellStatus:false,
	        		truckSpaceImages:[]
	        	},
	        	tagResp:'all',
	        	tagRespDtos:[],
	        	level1Info:[],
	        	level2Info:[],
	        	level3Info:[],
	        	tagIdsInfo:[],
	        	infoTag:[],
	        	listInfo:[],
	        	//判断已添加标签是否存在
	        	decide:(list,obj)=>{
		    		for(var i=0;i<list.length;i++){
		    			if(list[i].id==obj.id){
		    				return i
		    			}
		    		}
		    		return -1
	    		},
	    		rules:{
					name:{required:true,message:'请输入车位名称',trigger:'blur'},
					level3:{required:true,message:'请输入车位位置',trigger:'blur'},
					outsideArea:{required:true,message:'请输入建筑面积',trigger:'blur'},
					floorPrice:{required:true,message:'请输入底价',trigger:'blur'},
				},
	        }
	    },
	    created(){
	    	// chrome
		    document.body.scrollTop = 0
		    // firefox
		    document.documentElement.scrollTop = 0
		    // safari
		    window.pageYOffset = 0
	    	//渲染区域列表
		    this.$axios.get(request.testUrl+"/product/auth1/truckSpaceArea/selectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.level1Info=res.data.data
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
		    //渲染车位标签列表
		    this.$axios.get(request.testUrl+"/product/auth1/tagType/tagTypeNameList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.tagIdsInfo=res.data.data
		            }
		    	})
	    	//渲染单个车位信息
	    	let id=this.$route.query.id;
	    	this.$axios.get(request.testUrl+"/product/auth1/truckSpace/"+id)
			.then(res=>{
				if(res.data.code==0){
					this.form=res.data.data
					this.listInfo=res.data.data.tagRespDtos
					this.form.carSpaceStatus=res.data.data.carSpaceStatus==2?true:false
					this.form.stopSell=res.data.data.stopSell==1?true:false
					this.form.sellStatus=res.data.data.sellStatus==4?true:false
					this.form.truckSpaceImages=res.data.data.truckSpaceDetailImages
				}
			})
			//渲染车位标签下的标签 
		    this.touchs()
	    },
	    watch: {
			'$route' (to, from) {
				if(to.path=="/修改车位信息"){
					// chrome
				    document.body.scrollTop = 0
				    // firefox
				    document.documentElement.scrollTop = 0
				    // safari
				    window.pageYOffset = 0
					//渲染区域列表
				    this.$axios.get(request.testUrl+"/product/auth1/truckSpaceArea/selectAllList")
				    	.then(res=>{
				            if(res.data.code==0){
				            	this.level1Info=res.data.data
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
				    //渲染车位标签列表
				    this.$axios.get(request.testUrl+"/product/auth1/tagType/tagTypeNameList")
				    	.then(res=>{
				            if(res.data.code==0){
				            	this.tagIdsInfo=res.data.data
				            }
				    	})
			    	//渲染单个车位信息
			    	let id=this.$route.query.id;
			    	this.$axios.get(request.testUrl+"/product/auth1/truckSpace/"+id)
					.then(res=>{
						if(res.data.code==0){
							this.form=res.data.data
							this.listInfo=res.data.data.tagRespDtos
							this.form.carSpaceStatus=res.data.data.carSpaceStatus==2?true:false
							this.form.stopSell=res.data.data.stopSell==1?true:false
							this.form.sellStatus=res.data.data.sellStatus==4?true:false
							this.form.truckSpaceImages=res.data.data.truckSpaceDetailImages
						}
					})
					//渲染车位标签下的标签 
				    this.touchs()
				}
			 
			}
		},
	    methods:{
	    	down1(){
	    		if(parseInt(this.form.sellPrice)<parseInt(this.form.floorPrice)){
	    			this.$message({
						type: 'info',
						message: '销售价需高于底价'
					});
					this.form.floorPrice=''
					return
	    		}
	    	},
	    	downs(){
	    		if(parseInt(this.form.facePrice)<parseInt(this.form.floorPrice)){
	    			this.$message({
						type: 'info',
						message: '表价需高于底价'
					});
					this.form.facePrice=''
					return
	    		}
	    		if(parseInt(this.form.facePrice)<parseInt(this.form.sellPrice)){
	    			this.$message({
						type: 'info',
						message: '表价需高于销售价'
					});
					this.form.facePrice=''
					return
	    		}
	    	},
	    	down(){
	    		if(parseInt(this.form.sellPrice)<parseInt(this.form.floorPrice)){
	    			this.$message({
						type: 'info',
						message: '销售价需高于底价'
					});
					this.form.sellPrice=''
					return
	    		}
	    		if(parseInt(this.form.facePrice)<parseInt(this.form.sellPrice)){
	    			this.$message({
						type: 'info',
						message: '销售价需低于表价'
					});
					this.form.sellPrice=''
					return
	    		}
	    	},
	    	
	    	//车位标签选择
	    	touchs(){
	    		this.$axios.get(request.testUrl+"/product/auth1/tag/byTagType/"+this.tagResp)
				.then(res=>{
					if(res.data.code==0){
						this.infoTag=res.data.data
					}
				})
	    	},
	    	//标签点击选择
      		downInfo(index){
	    		let listInfo=this.listInfo
	    		let infoTag= this.infoTag[index]
	    		if(listInfo.indexOf(infoTag)==-1){//判断id和name是否存在
	    			listInfo.push(infoTag)//不存在push进数组
	    		}
	    		else{
	    			let infoindex=listInfo.indexOf(infoTag)//存在删除数组里的
	    			listInfo.splice(infoindex,1)
	    		}
	    		this.listInfo=listInfo
      		},
      		//标签删除
      		deleted(tagRespDtos){
      			for(var i=0;i<this.listInfo.length;i++){
      				var id=this.listInfo[i].id
      				if(tagRespDtos.indexOf(id)>-1){
      					this.listInfo.splice(i,1)
      					i--
      				}
      			}
      		},
	    	//删除
	    	deletes(){
	    		this.$confirm('是否删除已添加标签?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
	    	},
	    	//设为暂停销售按钮
      		stopSell(e){
      			if(e==true){
      				this.form.sellStatus=false
      			}
      		},
      		//设为策略销售
      		sellStatus(e){
      			if(e==true){
      				this.form.stopSell=false
      			}
      		},
	    	//保存并发布
	    	release(){
	            if(parseInt(this.form.outsideArea)<0||parseInt(this.form.insideArea)<0||parseInt(this.form.floorPrice)<0||parseInt(this.form.sellPrice)<0||parseInt(this.form.facePrice)<0){
	    			this.$message({
						type: 'info',
						message: '面积或金额不能为负数！'
					});
					return
	    		}
	            this.$refs.form.validate((valid) => {
					if (valid) {
			    		let ids=this.listInfo.map(e=>({id:e.id}))
			    		this.$axios({
				        	method:'post',
				        	url:request.testUrl+"/product/auth1/truckSpace/update",
				        	data:{
				        		id:this.$route.query.id,
				        		carSpaceStatus:2,
				        		expansionValues:[],
				        		facePrice:this.form.facePrice,
				        		floorPrice:this.form.floorPrice,
				        		insideArea:this.form.insideArea,
				        		level1:this.form.level1,
				        		level2:this.form.level2,
				        		level3:this.form.level3,
				        		name:this.form.name,
				        		outsideArea:this.form.outsideArea,
				        		sellPrice:this.form.sellPrice,
				        		sellStatus:this.form.sellStatus?4:0,
				        		stopSell:this.form.stopSell?1:0,
				        		tagRespDtos:ids,
				        		truckSpaceDetailImages:this.form.truckSpaceImages
				        	}
						}).then(res=>{
							if(res.data.code==0){
								this.$router.push({ path: '/车位管理'})
								this.reload()
							}else{
								this.$message({
									type: 'info',
									message: res.data.msg
								});
							}
						})
					}else {
			            return false;
			        }
				})	
				
	    	},
	    	//保存
	    	save(){
	    		if(parseInt(this.form.outsideArea)<0||parseInt(this.form.insideArea)<0||parseInt(this.form.floorPrice)<0||parseInt(this.form.sellPrice)<0||parseInt(this.form.facePrice)<0){
	    			this.$message({
						type: 'info',
						message: '面积或金额不能为负数！'
					});
					return
	    		}
	    		this.$refs.form.validate((valid) => {
					if (valid) {
			    		let ids=this.listInfo.map(e=>({id:e.id}))
			    		this.$axios({
				        	method:'post',
				        	url:request.testUrl+"/product/auth1/truckSpace/update",
				        	data:{
				        		id:this.$route.query.id,
				        		carSpaceStatus:this.form.carSpaceStatus?2:1,
				        		expansionValues:[],
				        		facePrice:this.form.facePrice,
				        		floorPrice:this.form.floorPrice,
				        		insideArea:this.form.insideArea,
				        		level1:this.form.level1,
				        		level2:this.form.level2,
				        		level3:this.form.level3,
				        		name:this.form.name,
				        		outsideArea:this.form.outsideArea,
				        		sellPrice:this.form.sellPrice,
				        		sellStatus:this.form.sellStatus?4:0,
				        		stopSell:this.form.stopSell?1:0,
				        		tagRespDtos:ids,
				        		truckSpaceDetailImages:this.form.truckSpaceDetailImages
				        	}
						}).then(res=>{
							if(res.data.code==0){
								this.$router.push({ path: '/车位管理'})
								this.reload()
							}else{
								this.$message({
									type: 'info',
									message: res.data.msg
								});
							}
						})
					}else {
			            return false;
			        }
				})	
	    	},
	    	
	    	
	    	//图片上传
			homeImg_file() {
	            document.getElementById('homeImg_upload_file').click()
	        },
	        homeImg_fileChange(el) {
	            if (!el.target.files[0].size) return;
	            this.homeImg_fileList(el.target);
	            el.target.value = ''
	        },
	        homeImg_fileList(fileList) {
	            let files = fileList.files;
	            for (let i = 0; i < files.length; i++) {
	                //判断是否为文件夹
	                if (files[i].type != '') {
	                    this.homeImg_uploadImage(files[i]);  
	                } else {
	                    //文件夹处理
	                    this.homeImg_folders(fileList.items[i]);
	                }
	            }
	        },
	        //文件夹处理
	        homeImg_folders(files) {
	            let _this = this;
	            //判断是否为原生file
	            if (files.kind) {
	                files = files.webkitGetAsEntry();
	            }
	            files.createReader().readEntries(function (file) {
	                for (let i = 0; i < file.length; i++) {
	                    _this.folders(file[i]);
	                }
	            })
	        },
	         homeImg_uploadImage(filesrc){
	            var param = new FormData(); // FormData 对象
	            param.append("file", filesrc); // 文件对象
	            this.$axios.post(request.testUrl+"/project/auth1/image/upload",param)
	            .then(res => {
	                if(res.data.code==0){
						this.form.truckSpaceImages.push(res.data.data)
	                    this.$message({
	                        type: 'info',
	                        message: "图片上传成功！"
	                    }); 
	                }  
	            })
	            .catch(error => {
	            });
	        },
      		//删除当前上传的图片
	        banner_fileDel(index){
	            this.form.truckSpaceImages.splice(index,1)
	        },
	    }
	}
</script>

<style>
	.main{
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
	.tagg{
		display:inline-block;
		color: #000000;
		background: #dcd3ef;
		padding: 2px 15px 2px 15px;
		border-radius: 5px;
		margin-right: 15px;
		margin-bottom: 10px;
	}
	.tagg:hover{
		cursor: pointer;
	}
	.aa1.aa1{
		background:#9768e5 ;
		color: #FFFFFF;
	}
	.aa1:hover{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.aa1:focus{
		background:#7764ea!important ;
		color: #FFFFFF!important;
	}
	.active1{
		background: #9768e5;
		color: #FFFFFF;
	}
</style>