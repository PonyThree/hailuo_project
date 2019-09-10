<template>
	<div>
		<el-form :model="form" class="chess" :label-position="labelPosition" label-width="130px">			
			<div style="width: 48%;float: left;">
				<el-form-item label="车位状态:">
	                <el-select v-model="form.sellStatus" placeholder="请选择状态" style="width: 275px;">
					    <el-option label="所有状态" value=""></el-option>
					    <el-option v-for="item in typeList" :label="item.name" :value="item.code"></el-option>
				    </el-select>
	           	</el-form-item>
	           	<el-form-item label="车位销售价:">
					<el-input v-model="form.minSellPrice" placeholder="请输入金额" style="width: 130px;"></el-input> 元&nbsp;&nbsp;~&nbsp;&nbsp;
					<el-input v-model="form.maxSellPrice" placeholder="请输入金额" style="width: 130px;"></el-input> 元
	           	</el-form-item>
	           	<el-form-item label="车位底价:">
					<el-input v-model="form.minFloorPrice" placeholder="请输入金额" style="width: 130px;"></el-input> 元&nbsp;&nbsp;~&nbsp;&nbsp;
					<el-input v-model="form.maxFloorPrice" placeholder="请输入金额" style="width: 130px;"></el-input> 元
	           	</el-form-item>
			</div>
			<div style="width: 42%;float: left;">
				<el-form-item label="锁定状态:">
	                <el-select v-model="form.lockStatus" placeholder="请选择状态" style="width: 275px;">
					    <el-option label="所有状态" value=""></el-option>
					    <el-option label="锁定" value="1"></el-option>
					    <el-option label="未锁定" value="0"></el-option>
				    </el-select>
	           	</el-form-item>
	           	<el-form-item label="建筑面积:">
					<el-input v-model="form.minOutsideArea" placeholder="请输入面积" style="width: 130px;"></el-input> 平方米&nbsp;&nbsp;~&nbsp;&nbsp;
					<el-input v-model="form.maxOutsideArea" placeholder="请输入面积" style="width: 130px;"></el-input> 平方米
	           	</el-form-item>
	           	<el-form-item label="套内面积:">
					<el-input v-model="form.minInsideArea" placeholder="请输入面积" style="width: 130px;"></el-input> 平方米&nbsp;&nbsp;~&nbsp;&nbsp;
					<el-input v-model="form.maxInsideArea" placeholder="请输入面积" style="width: 130px;"></el-input> 平方米
	           	</el-form-item>
			</div>
			
			<div class="clear"></div>
			<div style="width: 100%;margin-top: 20px;">
				<el-form-item label="所在区域：">
	               	<el-checkbox-group v-model="form.level1">
						<el-checkbox v-for="item in level1Info" :label="item.id" :key="item.id">{{item.name}}</el-checkbox> 
					</el-checkbox-group>
	            </el-form-item> 
	            <el-form-item label="所在楼栋">
	               <el-checkbox-group v-model="form.level2">
					    <el-checkbox v-for="item in level2Info" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
	            </el-form-item> 
	            <el-form-item label="所在楼栋">
	               <el-checkbox-group v-model="form.level3">
					    <el-checkbox v-for="item in level3Info" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
	            </el-form-item> 
	            <el-form-item label="车位标签：">
	               <el-checkbox-group v-model="form.tagIds">
					    <el-checkbox v-for="item in tagIdsInfo" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
	            </el-form-item>
			</div>
			<div style="width: 100%;float: left;margin-top: 30px;margin-bottom: 30px;">
	            <el-form-item label-width="0px" style="width: 50%;float: right;margin-right: 10%;">
	                <el-button @click="checked(1)" style="float: right;margin-left: 10px;">查询</el-button>
	                <el-input v-model="form.name" placeholder="请输入车位名称" style="width: 300px;float: right;"></el-input>
	                <!--<el-button style="margin-left: 20px;" @click="exports">导出</el-button>-->
	            </el-form-item>
			</div>
		</el-form>
		<div style="width: 96%;height:auto;overflow:hidden;margin: 20px auto 40px;">
			<ul class="ulBtn">
				<li class="li" @click="add">新增车位</li>
				<li class="li" @click="imports">批量导入车位图</li>
				<li class="li" @click="delate">批量删除</li>
				<li class="li" @click="release">部分发布</li>
				<li class="li" @click="releaseAll">全部发布</li>
				<li class="li" @click="pause">暂停销售</li>
				<li class="li" @click="manage">策略售出</li>
				<li class="li" @click="batch">批量管理导入车位</li>
				<li class="li" @click="importPark">首次导入车位</li>
			</ul>
		</div>
		<div style="width: 100%;height: auto;overflow: hidden;margin-bottom: 40px;">
			<!--表格-->
			<div  style="width: 96%;height:auto;overflow:hidden;margin: 20px auto">
				<el-checkbox v-model="showFace" style="float: right;" @change="changes">是否在业主端展示车位表价</el-checkbox> 
			</div>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%;" @selection-change="handleSelectionChange" :header-cell-style="{background:'#dcd3ef',color:'#606266'}"  header-row-class-name="tableHead" height="550">
				<el-table-column type="selection" width="50" align="center"></el-table-column>
				<el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="车位名称" width="85" align="center"></el-table-column>
				<el-table-column prop="code" label="车位编号" width="85" align="center"></el-table-column>
				<el-table-column prop="level1Name" label="区域" align="center" width="55"></el-table-column>
				<el-table-column prop="level2Name" label="楼栋" align="center" width="55"></el-table-column>
				<el-table-column prop="level3Name" label="楼层" align="center" width="55"></el-table-column>
				<el-table-column prop="truckSpaceImages" label="车位图片" align="center" width="180">
					<template slot-scope="scope">
						<el-scrollbar style="height: 80px;width: 100%;">
							<img :src="item" v-for="item in scope.row.truckSpaceImages" style="width: 158px;height: 80px;display: block;margin-bottom: 10px;" />
						</el-scrollbar>
					</template>
				</el-table-column>
				<el-table-column prop="outsideArea" label="建筑面积（m²）" align="center" width="105"></el-table-column>
				<el-table-column prop="id" v-if:"false"></el-table-column>
				<el-table-column prop="insideArea" label="套内面积（m²）" align="center" width="105"></el-table-column>
				<el-table-column prop="floorPrice" label="底价（元）" align="center" width="90"></el-table-column>
				<el-table-column prop="facePrice" label="表价（元）" align="center" width="90"></el-table-column>
				<el-table-column prop="sellPrice" label="销售价（元）" align="center" width="97"></el-table-column>
				<el-table-column prop="tagRespDtos.length" label="车位标签数量" align="center" width="115"></el-table-column>
				<el-table-column prop="openStatusName" label="开盘状态" align="center" width="85"></el-table-column>
				<el-table-column prop="carSpaceStatusName" label="发布状态" align="center" width="85"></el-table-column>
				<el-table-column prop="lockStatusName" label="锁定状态" align="center" width="85"></el-table-column>
				<el-table-column prop="sellStatusName" label="车位状态" align="center" width="85"></el-table-column>
				<el-table-column prop="caozuo" label="操作" align="center" width="120" >
					<template slot-scope="scope">
	                        <a style="color: #409EFF;font-size: 14px;" @click="modifyTable(scope.$index)">修改</a>
	                        <a style="margin-left: 20px;color: #409EFF;font-size: 14px;" @click="deleteTable(scope.$index)">删除</a>
	                </template>
				</el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 100, 300, 500, 1000]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
		</div>
		
		<!--导入车位图弹出框-->
		<el-dialog title="批量导入车位图" :visible.sync="revise" width="25%">
            <el-form ref="info" :model="info" label-width="120px" :label-position="labelPositions">
            	<el-checkbox v-model="info.stopSell" style="float: left;margin-right: 8px;margin-top: 8px;"></el-checkbox>
            	<el-form-item label="车位详情默认图:" style="width: 91%;float: left;">
                    <div class="pic-box">
                        <div class="upload_warp" >
                            <div class="upload_warp_left img-upload" @click="homeImg_files">
                                <img :src="headImage" v-if="headImage" class="avatar mt0" style="width: 200px;">
                            </div>
                        </div>
                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
                    </div>
                </el-form-item>
                <el-form-item label="车位列表默认图:" style="width: 91%;float: left;margin-left: 22px;">
                    <div class="pic-box" style="margin-top: 10px;">
                        <div class="upload_warp" >
                            <div class="upload_warp_left img-upload1" @click="homeImg_file1">
                                <img :src="headImages" v-if="headImages" class="avatar mt0" style="width: 100px;">
                            </div>
                        </div>
                        <input @change="homeImg_fileChange1($event)" type="file" id="homeImg_upload_files" multiple style="display:none;"/>
                    </div>
                </el-form-item>
                <el-checkbox v-model="info.stopSells" style="float: left;margin-right: 8px;margin-top: 8px;"></el-checkbox>
                <el-form-item label="车位实景图:" style="width: 91%;float: left;">
                    <div class="pic-box" style="width: 100%;height:auto;overflow: hidden;">
                        <div class="upload_warp">
                        	<div class="upload_warp_left img-uploads" v-for="(item,index) in info.homeImg">
                                <div class="upload_warp_img_div_del" @click="banner_fileDel(index)"></div>
                                <img :src="item.img" v-if="item.img" class="avatar mt0">
                            </div>
                            <div class="upload_warp_left img-uploads" @click="homeImg_file">
                                <img class="avatar mt0">
                            </div>
                        </div>
                        <input @change="homeImg_fileChanges($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
		            </div>
                </el-form-item>
                <el-form-item label-width="0px" style="width: 90%;float: left;margin-left: 30px;">上传图片文件（每一张图片命名样式为：区域-二级-三级+车位编号）</el-form-item>
               	
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="saveInfo">保存</el-button>
                <el-button @click="revise=false">取 消</el-button> 
            </span>
        </el-dialog>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'region',
		data(){
	        return {
	        	labelPosition:'right',
	        	labelPositions:'left',
	        	form:{
	        		level1:[],
	        		level2:[],
	        		level3:[],
	        		tagIds:[],
	        		lockStatus:'',
	        		maxFloorPrice:'',
	        		maxInsideArea:'',
	        		maxOutsideArea:'',
	        		maxSellPrice:'',
	        		minFloorPrice:'',
	        		minInsideArea:'',
	        		minOutsideArea:'',
	        		minSellPrice:'',
	        		name:'',
	        		sellStatus:''
	        	},
	        	showFace:false,
	        	level1Info:[],
	        	level2Info:[],
	        	level3Info:[],
	        	tagIdsInfo:[],
	        	typeList:[],
	        	tableData:[],
	        	info:{
	        		stopSells:false,
	        		stopSell:false,
	        		homeImg:[]
	        	},
	        	revise:false,
	        	headImage:'',
	        	headImages:'',
	        	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:20,//每页的数据
		       	total:0,
	        }
	    },
	    created(){
	    	//渲染车位状态
	    	this.$axios.post(request.testUrl+"/product/auth1/truckSpace/statusList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.typeList=res.data.data
		            }
		    	})
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
		    this.$axios.get(request.testUrl+"/product/auth1/tag/byTagType/all")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.tagIdsInfo=res.data.data
		            }
		    	})
		    //车位项目配置是否在前端展示车位标价
		    this.save()
		    //查询所有信息
		    this.checked(1)
	    },
	    watch: {
			'$route' (to, from) {
				this.checked(1)
			}
		},
	    methods:{ 
	    	//车位项目配置是否在前端展示车位标价
	    	save(){
			    this.$axios.get(request.testUrl+"/product/auth1/projectTruckSpaceConfig")
			    	.then(res=>{
			            if(res.data.code==0){
			            	if(res.data.data!=null){
			            		this.showFace=res.data.data.showFace==1
			            	}
			            }
			    	})
			},
	    	//是否在前端展示车位标价
	    	changes(){	
                this.$axios({
	                method: "post",
	                url: request.testUrl+"/product/auth1/projectTruckSpaceConfig",
	                data: {
	                	showFace:this.showFace==true?1:0
	                }
	            })
					.then(res=>{
		    			if(res.data.code==0){
							this.save()
		    			}else{
		    				this.$message({
				                type: 'info',
				                message: res.data.msg,
			            	});
		    			}
		    		})
	    	},
	    	//全局查询
	    	checked(currentPage){
	    		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
				
	    		this.$axios({
		        	method:'post',
		        	url:request.testUrl+"/product/auth1/truckSpace/pageList",
		        	data:{
		        		current:this.currentPage,
		        		pageSize:this.pagesize,
		        		level1:this.form.level1,
		        		level2:this.form.level2,
		        		level3:this.form.level3,
		        		tagIds:this.form.tagIds,
		        		lockStatus:this.form.lockStatus,
		        		maxFloorPrice:this.form.maxFloorPrice,
		        		maxInsideArea:this.form.maxInsideArea,
		        		maxOutsideArea:this.form.maxOutsideArea,
		        		maxSellPrice:this.form.maxSellPrice,
		        		minFloorPrice:this.form.minFloorPrice,
		        		minInsideArea:this.form.minInsideArea,
		        		minOutsideArea:this.form.minOutsideArea,
		        		minSellPrice:this.form.minSellPrice,
		        		name:this.form.name,
		        		sellStatus:this.form.sellStatus,
		        	}
				}).then(res=>{
					if(res.data.code==0){
						this.total = res.data.data.total
						this.tableData=res.data.data.records
						// facePrice sellPrice insideArea
						this.tableData.forEach(item=>{
							item.facePrice=item.facePrice==0?"":item.facePrice;
							item.sellPrice=item.sellPrice==0?"":item.sellPrice;
							item.insideArea=item.insideArea==0?"":item.insideArea;
						})
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	    	},
	    	//导出
	    	exports(){
	    		
	    	},
			//表格全选
	     	handleSelectionChange(val) {
	        	this.multipleSelection = val;
	      	},
	      	//新增车位
	      	add(){
	      		this.$router.push({ path: '/新增车位'})
	      	},
	      	//导入车位图
	      	imports(){
	      		this.$axios.get(request.testUrl+"/product/auth1/projectTruckSpaceConfig")
			    	.then(res=>{
			            if(res.data.code==0){
			            	this.revise=true;
			            	if(res.data.data!=null){
			            		this.headImages=res.data.data.listImage
			            		this.headImage=res.data.data.detailImage
			            		this.info.stopSell=true	
			            	}
			            }
			    	})
	      	},
	      	//导入车位图保存按钮
	      	saveInfo(){
	      		if(this.info.stopSell==true){
	      			this.$axios({
	      				method:'post',
			        	url:request.testUrl+"/product/auth1/projectTruckSpaceConfig",
			        	data:{
			        		listImage:this.headImages,
			        		detailImage:this.headImage
			        	}
	      			}).then(res=>{
						if(res.data.code==0){
							this.revise=false;
							this.$message({
								type: 'info',
								message: "图片上传成功！"
							});
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
	      		}else if(this.info.stopSells==true){
	      			this.revise=false;
		      		this.reload()
		      		this.checked(1)
	      		}
	      	},
	      	//批量删除车位
	      	delate(){
      			let ids=[]
	    		let list=this.multipleSelection
	    		for(let i in list){
	    			ids.push(list[i].id)
	    		}
	    		if(ids.length==0){
	    			this.$message({
						type: 'info',
						message: '请选择要发布的车位！'
					});
					return
	    		}
	      		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpace/bitchDelete",
			        	data:ids
					}).then(res=>{
						if(res.data.code==0){
							this.checked(1)
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
	      	},
	      	//发布
	      	release(){
	      		let id=[]
	    		let list=this.multipleSelection
	    		for(let i in list){
	    			id.push(list[i].id)
	    		} 
	    		if(id.length==0){
	    			this.$message({
						type: 'info',
						message: '请选择要发布的车位！'
					});
					return
	    		}
	      		this.$confirm('确定要发布该车位信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpace/batchUpdate",
			        	data:{
			        		ids:id,
			        		carSpaceStatus:2
			        	}
					}).then(res=>{
						if(res.data.code==0){
							this.checked()
							this.$message({
								type: 'info',
								message: '设置发布成功！'
							});
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
	      	},
	      	releaseAll(){
	      		this.$confirm('确定要发布该车位信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpace/allPublish",
					}).then(res=>{
						if(res.data.code==0){
							this.checked()
							this.$message({
								type: 'info',
								message: '设置发布成功！'
							});
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
	      	},
	      	//暂停销售
	      	pause(){
	      		let id=[]
	    		let list=this.multipleSelection
	    		for(let i in list){
	    			id.push(list[i].id)
	    		} 
	    		if(id.length==0){
	    			this.$message({
						type: 'info',
						message: '请选择要暂停销售的车位！'
					});
					return
	    		}
				this.$axios({
		        	method:'post',
		        	url:request.testUrl+"/product/auth1/truckSpace/batchUpdate",
		        	data:{
		        		ids:id,
		        		stopSell:1
		        	}
				}).then(res=>{
					if(res.data.code==0){
						this.checked()
						this.$message({
							type: 'info',
							message: '设置暂停销售成功！'
						});
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	      	},
	      	//策略售出管理
	      	manage(){
	      		let id=[]
	    		let list=this.multipleSelection
	    		for(let i in list){
	    			id.push(list[i].id)
	    		} 
	    		if(id.length==0){
	    			this.$message({
						type: 'info',
						message: '请选择要策略售出管理的车位！'
					});
					return
	    		}
				this.$axios({
		        	method:'post',
		        	url:request.testUrl+"/product/auth1/truckSpace/batchUpdate",
		        	data:{
		        		ids:id,
		        		strategySell:1
		        	}
				}).then(res=>{
					if(res.data.code==0){
						this.checked()
						this.$message({
							type: 'info',
							message: '设置策略售出成功！'
						});
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
	      	},
	      	//导入车位批量操作
	      	batch(){
	      		this.$router.push({ path: '/导入车位批量操作'})
	      	},
	      	//导入车位
	      	importPark(){
	      		this.$router.push({ path: '/导入车位'})
	      	},
	      	//修改车位信息
	      	modifyTable(index){
	      		this.$router.push({ path: '/修改车位信息',query:{id:this.tableData[index].id}})
	      	},
	      	//删除车位信息
          deleteTable(index){
	        console.log(this.tableData[index].sellStatusName=="落位")
	        var bool=this.tableData[index].sellStatusName=="落位"||this.tableData[index].sellStatusName=="认购"||this.tableData[index].sellStatusName=="认购失效待处理";
	        console.log(bool)
	        if(bool){
	          this.$message({
	            type:'info',
	            message:'用户已对该车位发起操作,无法进行删除'
	          })
	          return ;
	        }else{
	          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	          }).then(() => {
	            this.$axios({
	              method:'post',
	              url:request.testUrl+"/product/auth1/truckSpace/bitchDelete",
	              data:[
	                this.tableData[index].id
	              ]
	            }).then(res=>{
	              if(res.data.code==0){
	                this.checked()
	              }else{
	                this.$message({
	                  type: 'info',
	                  message: res.data.msg
	                });
	              }
	            })
	          }).catch(() => {
	            this.$message({
	              type: 'info',
	              message: '已取消删除'
	            });
	          });
	        }
          },

	      	
	      	//图片上传
			homeImg_file() {
	            document.getElementById('homeImg_upload_file').click()
	        },
	        homeImg_fileChanges(el) {
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
	        //图片上传
	        homeImg_uploadImage(filesrc){
	            var param = new FormData(); // FormData 对象
	            param.append("image", filesrc); // 文件对象
	            this.$axios({
	                method: "post",
	                url: request.testUrl+"/product/auth1/truckSpace/batchDetailImage",
	                data: param
	            })
	            .then(res => {
	                if(res.data.code==0){
						this.info.homeImg.push({img:res.data.data})
	                    this.$message({
	                        type: 'info',
	                        message: "图片上传成功！"
	                    }); 
	                }else{
	                	this.$message({
	                        type: 'info',
	                        message: res.data.msg
	                    }); 
	                }
	            })
	            .catch(error => {
	            });
	        },
      		//删除当前上传的图片
	        banner_fileDel(index){
	        	
	        	var param = new FormData(); // FormData 对象
	            param.append("image", this.info.homeImg[index].img); // 文件对象
	        	this.$axios({
	                method: "post",
	                url: request.testUrl+"/product/auth1/truckSpace/deleteDetailImage",
	                data: param
	            })
	            .then(res => {
	            	console.log(res.data.data)
	            	if(res.data.code==0){
	            		this.info.homeImg.splice(index,1);
	            		this.$message({
	                        type: 'info',
	                        message: "图片删除成功！"
	                    }); 
	            	}
	            })
	        	
	        },
	        
	        //详情默认图片上传
			homeImg_files() {
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
	                	this.imgPreview(files[i]);
	                } else {
	                    //文件夹处理
	                    this.homeImg_folders(fileList.items[i]);
	                }
	            }
	        },
	        //获取图片 
			imgPreview(file, callback) { 
				let self = this; 
				//判断支不支持FileReader 
				if (!file || !window.FileReader) return; 
				if (/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader(); 
					//将图片转成base64格式 
					reader.readAsDataURL(file); 
					//读取成功后的回调 
					reader.onloadend = function() { 
						let result = this.result; 
						let img = new Image();img.src = result; 
						img.onload = function() {
							let data = self.compress(img);self.imgUrl = result; 
							let blob = self.dataURItoBlob(data); 
							var formData = new FormData();
							formData.append("file", blob); 
							let config = { 
								headers: { "Content-Type": "multipart/form-data" }
							}; 
							// 发送请求; 
							self.$axios.post(request.testUrl+"/project/auth1/image/upload", formData, config).then(res => { 
								if (res.data.code == 0) {
									self.headImage=res.data.data;
				                    self.$message({
				                        type: 'info',
				                        message: "图片上传成功！"
				                    }); 
								} else {
									self.$message({ 
										message: "图片上传失败，请重试", 
										type: "warning"
										});
								}
							});
						};
					};
				}
			},
			
	        //列表默认图片
	        homeImg_file1() {
	            document.getElementById('homeImg_upload_files').click()
	        },
	        homeImg_fileChange1(el) {
	            if (!el.target.files[0].size) return;
	            this.homeImg_fileList1(el.target);
	            el.target.value = ''
	        },
	        homeImg_fileList1(fileList) {
	            let files = fileList.files;
	            for (let i = 0; i < files.length; i++) {
	                //判断是否为文件夹
	                if (files[i].type != '') {
	                	this.imgPreview1(files[i]);
	                } else {
	                    //文件夹处理
	                    this.homeImg_folders(fileList.items[i]);
	                }
	            }
	        },
	        imgPreview1(file, callback) { 
				let self = this; 
				//判断支不支持FileReader 
				if (!file || !window.FileReader) return; 
				if (/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader(); 
					//将图片转成base64格式 
					reader.readAsDataURL(file); 
					//读取成功后的回调 
					reader.onloadend = function() { 
						let result = this.result; 
						let img = new Image();img.src = result; 
						img.onload = function() {
							let data = self.compress(img);self.imgUrl = result; 
							let blob = self.dataURItoBlob(data); 
							var formData = new FormData();
							formData.append("file", blob); 
							let config = { 
								headers: { "Content-Type": "multipart/form-data" }
							}; 
							// 发送请求; 
							self.$axios.post(request.testUrl+"/project/auth1/image/upload", formData, config).then(res => { 
								if (res.data.code == 0) {
									self.headImages=res.data.data;
				                    self.$message({
				                        type: 'info',
				                        message: "图片上传成功！"
				                    }); 
								} else {
									self.$message({ 
										message: "图片上传失败，请重试", 
										type: "warning"
										});
								}
							});
						};
					};
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
	        
			
			
			// 压缩图片 
			compress(img) { 
				let canvas = document.createElement("canvas"); 
				let ctx = canvas.getContext("2d"); 
				let initSize = img.src.length; 
				let width = img.width; 
				let height = img.height;
				canvas.width = width;
				canvas.height = height; 
				// 铺底色 
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, width, height); 
				//进行最小压缩 
				let ndata = canvas.toDataURL("image/jpeg", 0.3); 
				return ndata;
			},
			// base64转成bolb对象 
			dataURItoBlob(base64Data) { 
				var byteString; 
				if (base64Data.split(",")[0].indexOf("base64") >= 0)
					byteString = atob(base64Data.split(",")[1]); 
				else byteString = unescape(base64Data.split(",")[1]); 
				var mimeString = base64Data
				.split(",")[0]
				.split(":")[1]
				.split(";")[0]; 
				var ia = new Uint8Array(byteString.length); 
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				} 
				return new Blob([ia], { type: mimeString });
			}, 
	      	//分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
		        this.checked(currentPage);
		    },
            handleSizeChange(size){
            	this.pagesize = size; //每页下拉显示数据
            	this.checked(this.currentPage);
            },
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
	.clear{
		clear: both;
	}
	.ulBtn{
		width: 100%;
		display: block;
		height: auto;
	}
	.li{
		display: inline-block;
		float: right;
		margin-left: 15px;
		border: 1px solid #dcd3ef;
		font-size: 16px;
		padding: 5px 10px 5px 10px;
		border-radius: 5px;
	}
	.li:first-child{
		margin-right: 40px;
	}
	.li:hover{
		background: #8d73c0;
		cursor: pointer;
	}
	.el-scrollbar .el-scrollbar__wrap {
		overflow-x: hidden;
	}
	.tableHead{
		font-size: 14px;
		letter-spacing: 1px;
	}
	.el-table_1_column_9 {
	    color: rgb(96, 98, 102)!important;
	}
</style>