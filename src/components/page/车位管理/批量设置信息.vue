<template>
	<div>
		<!--导入车位信息-->
		<div class="info">
			<div class="title"><span class="f1"></span>导入车位信息</div>
			<div class="ff1">
				<el-steps :active="3" align-center style="margin-top: 40px;">
				  	<el-step title="上传文件"></el-step>
				  	<el-step title="执行导入"></el-step>
				  	<el-step title="批量设置信息"></el-step>
				  	<el-step title="批量操作完成"></el-step>
				</el-steps>
				<div class="columns" style="border: none;">
					<el-row style="width: 100%;height:50px;border-top: 1px solid #dcd3ef;background:gainsboro;margin-top: 60px;">
						<el-col :span="8">
							<div style="margin-top: 8px;">
								<span style="margin-left: 50px;">车位层数：</span>
								<el-select v-model="level2" placeholder="请选择状态" style="width: 130px;">
								    <el-option label="所有状态" value=""></el-option>
								    <el-option v-for="item in typeList" :label="item.name" :value="item.id"></el-option>
							    </el-select>
							</div>
						</el-col>
						<el-col :span="8">
							<div style="margin-top: 12px;">
								<span style="margin-left: 180px;margin-right: 10px;">已导入车位</span>
								<!--<a style="color: #409EFF;font-size: 12px;" @click="clickView">点击查看</a>-->
							</div>
						</el-col>
						<el-col :span="8">
							<div style="margin-top: 8px;">
								<el-button class="aa1" style="float: right;margin-right: 50px;" @click="importImg">导入车位详情图</el-button>
								<el-button class="aa1" style="float: right;margin-right: 10px;" @click="switchs">切换展示</el-button>
							</div>
						</el-col>
					</el-row>
					
					<div>
						<!--查看车位-->
						<div style="width: 100%;margin: 40px auto 20px;" v-if="loginType === 'username'">
							<div style="width: 96%;margin: 0 auto 50px;">
								<div style="width: 90%;float: left;">
									<span class="pieces" @click="downs" :class="{actives:color==true}">全部</span>
									<span class="pieces" v-for="item,index in dongList" @click="down(index)" :class="{active:idlist.indexOf(item.id)!=-1}">{{item.name}}</span>
								</div>
								<el-button class="aa1" style="float: right;margin-right: 10px;" @click="checked(1)">查询</el-button>
							</div>
							<div class="clear"></div>
							<div style="width: 95.5%;height: auto;overflow: hidden;margin: 40px auto 10px;">
								<el-button class="aa1" @click="selectAll(1)" >删除选中车位</el-button>
								<el-button  type="primary" style="margin-left: 10px;" @click="selectAlls(2)">选择所有导入车位</el-button>
							</div>
							<!--表格-->
							<el-table ref="multipleTable" :data="tableParking" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 95.5%;margin: 0 auto;">
								<el-table-column type="selection" width="100" align="center"></el-table-column>
								<el-table-column type="index" label="序号" width="92" align="center"></el-table-column>
								<el-table-column prop="name" label="车位编号" width="250" align="center"></el-table-column>
								<el-table-column prop="location" label="车位位置" align="center" width="200"></el-table-column>
								<el-table-column prop="insideArea" label="面积（m²）" align="center" width="200"></el-table-column>
								<el-table-column prop="facePrice" label="表价（元）" width="250" align="center"></el-table-column>
								<el-table-column prop="id" v-show:"false"></el-table-column>
								<el-table-column prop="floorPrice" label="底价（元）" align="center" width="250"></el-table-column>
								<el-table-column label="操作" align="center" width="200">
									<template slot-scope="scope">
		                        		<a style="color: #409EFF;font-size: 14px;" @click="cancel(scope.$index)">删除</a>
		                        	</template>
								</el-table-column>
							</el-table>
							
							<!--分页器-->
							<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 100, 300, 500, 1000]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
							</el-pagination>
							
						</div>
						
						
						<!--查看车位-->
						<div style="width: 100%;margin: 40px auto 20px;" v-else>
							<div style="width: 96%;margin: 0 auto 20px;">
								<span class="pieces" @click="downs1" :class="{actives:color1==true}">全部</span>
								<span class="pieces" v-for="item,index in dongList1" @click="down1(index)" :class="{active:idlist1.indexOf(item.id)!=-1}">{{item.name}}</span>
								<el-button class="aa1" style="float: right;margin-right: 10px;" @click="checkeds">查询</el-button>
							</div>
							<div style="width: 95.5%;height: auto;overflow: hidden;margin: 40px auto 10px;">
								<el-button class="aa1" @click="deleted">删除选中车位</el-button>
								<el-button  type="primary" style="margin-left: 10px;" @click="selectAlls(2)">选择所有导入车位</el-button>
							</div>
							<!--表格-->
							
							<ul style="width: 94%;height:auto;overflow:hidden;margin: 40px auto;cursor: pointer;">
								<li class="square" v-for="item,index in list" @click="choose(index)" :class="{active5:chooselist.indexOf(item.id)!=-1}">{{item.name}}</li>
							</ul>
						</div>
					</div>
					
					<div style="width: 95.5%;margin: 100px auto;">
						<el-form :model="form">
							<div style="width: 100%;height: auto;overflow: hidden;">
								
				           		<el-form-item label="车位标签:">
					                <el-select v-model="form.tagType" placeholder="请选择状态" style="width: 200px;" @change="touchs">
									    <el-option label="所有状态" value="all"></el-option>
									    <el-option v-for="item in typeList1" :label="item.typeName" :value="item.id"></el-option>
								    </el-select>
								    <div style="width: 100%;margin-top: 30px;">
								    	<div class="tagg" v-for="item,index in infoTag" @click="downInfo(index)" :class="{active1:existArr(listInfo,item)}">{{item.name}}
								    		<span v-show="false">{{item.id}}</span>
								    	</div>
								    </div>
								</el-form-item>
								<el-form-item label="已添加标签:"> 
									<el-checkbox-group v-model="tagIds" style="display: inline-block;">
								    	<el-checkbox v-for="item in listInfo" :label="item.id" :key="item.name">{{item.name}}</el-checkbox> 
								    </el-checkbox-group>
									<a style="margin-left: 50px;color: #409EFF;" @click="deletes(tagIds)">删除</a>
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
					                <el-switch v-model="form.strategySell" active-color="#8d73c0" inactive-color="gray" @change="strategySell"></el-switch>
					           	</el-form-item>
				           	</div>
						</el-form>
					</div>
					
					<div style="width: 15%;margin:60px auto 260px;">
						<el-button class="aa1" style="display: block;float: left;" @click="determine">确定</el-button>
						<el-button class="aa1" style="display: block; float: right;" @click="returnBack">下一步</el-button>
					</div>
				</div>
				
				<!--导入车位图片弹出框-->
				<el-dialog title="导入车位详情图" :visible.sync="revise" width="27%">
		            <el-form ref="info" :model="info" label-width="100px" >
		                <el-form-item label="导入车位图片:">
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
		                        <input @change="homeImg_fileChange($event)" type="file" id="homeImg_upload_file" multiple style="display:none;"/>
		                    </div>
		                    <div style="font-size: 12px;margin-top: 10px;">上传图片文件（每一张图片命名样式为：区域-二级-三级+车位编号）</div>
		                </el-form-item>
		            </el-form>
		            <span slot="footer" class="dialog-footer">
		            	<el-button type="primary" @click="saveInfo">保存</el-button>
		                <el-button @click="revise=false">取 消</el-button> 
		            </span>
		        </el-dialog>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],//注入依赖
		name:'check-parking',
		data(){
	        return {
	        	labelPosition:'right',
	        	seen:false,//显示隐藏
	        	loginType : 'username',//切换
	        	typeList:[],//车位层数
	        	dongList:[],//车位栋数
	        	dongList1:[],//车位栋数
	        	color:true,
	        	color1:false,
	        	idlist:[],
		       	idlist1:[],
		       	chooselist:[],
				level2:'',
				tableParking:[{}],
				list:[],
				form:{
					tagType:'all',
					carSpaceStatus:false,
					stopSell:false,
					strategySell:false
				},
				info:{
					homeImg:[]
				},
				revise:false,
				typeList1:[],
				infoTag:[],
				listInfo:[],
				tagIds:[],
				infoName:[],
				allListid:[],
				existArr:(arr,item)=>{
	        		for(var i=0;i<arr.length;i++){
	        			if(arr[i].id===item.id){
	        				return true;
	        			}
	        		}
	        		return false;
	        	},
				//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:20,//每页的数据
		       	total:0,
		       	size:'',
		       	multipleSelection:[],
		       	nums:''
	        }
	    },
	    created(){
	    	this.size=this.$route.query.size,
	    	//渲染车位层数
	    	this.$axios.get(request.testUrl+"/product/auth1/truckSpaceFloor/selectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.typeList=res.data.data
		            }
		    	})
		    //渲染车位楼层
			this.$axios.get(request.testUrl+"/product/auth1/truckSpaceRidgepole/doSelectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.dongList=res.data.data
		            }
		    	})
			this.$axios.get(request.testUrl+"/product/auth1/truckSpaceRidgepole/doSelectAllList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.dongList1=res.data.data
		            }
		    	})
		   	//渲染车位标签
		   	this.$axios.get(request.testUrl+"/product/auth1/tagType/tagTypeNameList")
		    	.then(res=>{
		            if(res.data.code==0){
		            	this.typeList1=res.data.data
		            }
		    	})
		    //渲染车位标签下的标签 
		    this.touchs()
		    this.checked(1)
		    this.checkeds()
	    },
	    watch: {
			'$route'(to,from){
				if(to.path=="/批量设置信息"){
					this.size=this.$route.query.size,
					//渲染车位层数
			    	this.$axios.get(request.testUrl+"/product/auth1/truckSpaceFloor/selectAllList")
				    	.then(res=>{
				            if(res.data.code==0){
				            	this.typeList=res.data.data
				            }
				    	})
				    //渲染车位楼层
					this.$axios.get(request.testUrl+"/product/auth1/truckSpaceRidgepole/doSelectAllList")
				    	.then(res=>{
				            if(res.data.code==0){
				            	this.dongList=res.data.data
				            }
				    	})
					this.$axios.get(request.testUrl+"/product/auth1/truckSpaceRidgepole/doSelectAllList")
				    	.then(res=>{
				            if(res.data.code==0){
				            	this.dongList1=res.data.data
				            }
				    	})
				   	//渲染车位标签
				   	this.$axios.get(request.testUrl+"/product/auth1/tagType/tagTypeNameList")
				    	.then(res=>{
				            if(res.data.code==0){
				            	this.typeList1=res.data.data
				            }
				    	})
				    //渲染车位标签下的标签 
				    this.touchs()
				    this.checked(1)
				    this.checkeds()
		      	}
			}	
		},
	    methods:{
	    	//车位标签全部
	    	downs(){
	    		if(this.color==false){
	    			this.color=true
	    			this.idlist=[]
	    		}else{
	    			this.color=false
	    		}
	    	},
	    	//车位标签点击
	    	down(index){
	    		this.color=false
	    		let idlist=this.idlist
	    		let id= this.dongList[index].id
	    		if(idlist.indexOf(id)==-1){
	    			idlist.push(id)
	    		}
	    		else{
	    			let delindex=idlist.indexOf(id)
	    			idlist.splice(delindex,1)
	    		}
	    		this.idlist=idlist
	    	},
	    	//另个版本车位标签全部
	    	downs1(){
	    		if(this.color1==false){
	    			this.color1=true
	    			this.idlist1=[]
	    		}else{
	    			this.color1=false
	    		}
	    	},
	    	//另个版本车位标签点击
	    	down1(index){
	    		this.color1=false
	    		let idlist1=this.idlist1
	    		let id= this.dongList1[index].id
	    		if(idlist1.indexOf(id)==-1){
	    			idlist1.push(id)
	    		}
	    		else{
	    			let delindex1=idlist1.indexOf(id)
	    			idlist1.splice(delindex1,1)
	    		}
	    		this.idlist1=idlist1
	    	},
	    	//第一个版本查询
	    	checked(currentPage){
	    		if(currentPage==undefined){
					currentPage=this.currentPage
				}else{
					this.currentPage=currentPage;
				}
				
	    		var params = new URLSearchParams();	
              	params.append('level3', this.idlist);
                params.append('level2', this.level2);
				this.$axios.post(request.testUrl + "/product/auth1/truckSpace/importExcelSelectPage?current=" + this.currentPage + "&pageSize=" + this.pagesize, params)
					.then(res => {
						if(res.data.code == 0) {
							this.total = res.data.data.total
							this.tableParking = res.data.data.records
						} else {
							this.$message({
								type:'info',
					                message: res.data.msg,
				            	});
				    	}
				    })
	    	},
	    	//另个版本查询
	    	checkeds(){
	    		var params = new URLSearchParams();	
              	params.append('level3', this.idlist1);
                params.append('level2', this.level2);			
                this.$axios.post(request.testUrl+"/product/auth1/truckSpace/importExcelSelectList",params)
					.then(res=>{
		    			if(res.data.code==0){
		    				this.list=res.data.data
		    			}else{
		    				this.$message({
				                type: 'info',
				                message: res.data.msg,
			            	});
		    			}
		    		})
	    	},
	    	//点击查看导入车位表
	    	clickView(){
	    		this.seen = !this.seen
	    		this.checked(1)
	    	},
	    	//切换展示
	    	switchs(){
	    		if(this.loginType=='username'){
                    this.loginType='email'
                    this.checkeds()
                }
                else{
                    this.loginType='username'
                }
	    	},
	    	
	    	//导入车位弹出窗
      		importImg(){
      			this.revise=true;
      		},
      		//导入车位图片保存
      		saveInfo(){
      			this.revise=false;
      		},
      		
	    	//全选
	    	handleSelectionChange(val) {
        		this.multipleSelection = val;
      		},
      		//全选删除
      		selectAll(e){
      			this.nums=e
      			if(this.multipleSelection.length==0){
      				this.$message({
		                type: 'info',
		                message: '请选中要删除车位！',
	            	});
	            	return
      			}
      			let ids=[]
	    		let list=this.multipleSelection
	    		for(let i in list){
	    			ids.push(list[i].id)
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
      		},
      		//全选所有选中id
      		selectAlls(e){
				this.nums=e
				console.log(this.nums)
      			// this.$axios.post(request.testUrl+"/product/auth1/truckSpace/importExcelSelectList")
				// 	.then(res=>{
		    	// 		if(res.data.code==0){
		    	// 			this.allListid=res.data.data
		    	// 		}else{
		    	// 			this.$message({
				//                 type: 'info',
				//                 message: res.data.msg,
			    //         	});
		    	// 		}
				// })
      		},
      		//表格中单个删除
      		cancel(index){
      			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpace/bitchDelete",
			        	data:[
			        		this.tableParking[index].id
			        	]
					}).then(res=>{
						if(res.data.code==0){
							this.checked()
						}else{
							this.$message({
								type: 'success',
								message: res.data.msg
							});
						}
					})
				}).catch(() => {
					this.$message.error('已取消删除');
				});
      		},
			//另个版本选中状态
      		choose(index){
      			let chooselist=this.chooselist
	    		let id= this.list[index].id
	    		if(chooselist.indexOf(id)==-1){
	    			chooselist.push(id)
	    		}
	    		else{
	    			let delindex=chooselist.indexOf(id)
	    			chooselist=chooselist.splice(delindex,1)
	    		}
	    		this.chooselist=chooselist
      		},
      		//另个版本删除
      		deleted(){
      			this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpace/bitchDelete",
			        	data:this.chooselist
					}).then(res=>{
						if(res.data.code==0){
							this.checkeds()
							this.$message({
								type: 'success',
								message: '删除成功！'
							});
						}else{
							this.$message({
								type: 'info',
								message: res.data.msg
							});
						}
					})
      		},
      		//车位标签选择
      		touchs(){
      			this.$axios.get(request.testUrl+"/product/auth1/tag/byTagType/"+this.form.tagType)
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
	    		if(!this.existArr(listInfo,infoTag)){//判断id和name是否存在
	    			listInfo.push(infoTag)//不存在push进数组
	    		}
	    		else{
	    			let infoindex=listInfo.indexOf(infoTag)//存在删除数组里的
	    			listInfo.splice(infoindex,1)
	    		}
	    		this.listInfo=listInfo
      		},
      		//标签删除
      		deletes(tagIds){
      			for(var i=0;i<this.listInfo.length;i++){
      				var id=this.listInfo[i].id
      				if(tagIds.indexOf(id)>-1){
      					this.listInfo.splice(i,1)
      					i--
      				}
      			}
      		},
      		//设为暂停销售按钮
      		stopSell(e){
      			if(e==true){
      				this.form.strategySell=false
      			}
      		},
      		//设为策略销售
      		strategySell(e){
      			if(e==true){
      				this.form.stopSell=false
      			}
      		},
      		//确定
      		determine(){
      			let ids=[]
				if(this.multipleSelection.length!=0){
					ids=this.multipleSelection.map(e=>(e.id))
				}else if(this.nums==2){
					ids=this.allListid.map(e=>(e.id))
				}else{
					this.$message({
						type: 'info',
						message: '请选择要修改的车位！'
					});
					return
				}
                let idList=this.listInfo.map(e=>(e.id))
				this.$axios({
			        	method:'post',
			        	url:request.testUrl+"/product/auth1/truckSpace/batchUpdate",
			        	data:{
			        		ids:ids,
			        		tagIds:idList,
			        		strategySell:this.form.strategySell?1:0,
			        		stopSell:this.form.stopSell?1:0,
							carSpaceStatus:this.form.carSpaceStatus?2:1,
							setting :1
			        	}
				}).then(res=>{
					if(res.data.code==0){
						this.checked(1)
						this.checkeds()
						this.seen=true
					}else{
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					}
				})
      		},
      		//下一步
      		returnBack(){
      			this.reload()
      			this.$router.push({ path: '/操作成功',query:{size:this.size}})
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
	            	}
	            })
	        	
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
	.columns{
		width: 100%;
		height: auto;
		overflow: hidden;;
	}
	.pieces{
		height: 32px;
		line-height:32px ;
		display: inline-block;
		padding: 0px 25px 0px 25px;
		border: 1px solid #dcd3ef;
		margin: 0 20px 10px 5px;
		border-radius: 5px;
	}
	.pieces:hover{
		cursor: pointer;
	}
	.square{
		display: block;
		float: left;
		border: 1px solid gray;
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;

	}
	.active{
		background: #9768e5;
		color: #FFFFFF;
	}
	.active5{
		background: #9768e5;
		color: #FFFFFF;
	}
	.actives{
		background: #9768e5;
		color: #FFFFFF;
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
	.active1{
		background: #9768e5;
		color: #FFFFFF;
	}
	.aa1{
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
	.clear{
		clear: both;
	}
</style>