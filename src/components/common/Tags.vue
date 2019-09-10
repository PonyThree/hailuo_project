<template>
    <div class="tags" v-if="showTags">
        <ul class="tagsLists">
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown" style="width: 97px;text-align: center;">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
//  import vSidebar from './Sidebar.vue';
    export default {
        data() {
            return {
                tagsList: [],
                btext:''
            }
        },
        methods: {
            isActive(path) {
            	var index = path.lastIndexOf("?");
            	if(index!=-1){
            		path = path.substring(0,index);
            	}
                return path === this.$route.path;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/Index');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/Index');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.name === route.matched[1].components.default.name;
                })
                if(!isExist){
                    if(this.tagsList.length >= 18){
                        this.tagsList.shift();
                    }
              
                	this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                    })
                    
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/Index');
                        }
                        this.tagsList.splice(i, 1);
                    }
                }
            })
        }
    }

</script>


<style>
    .tags {
        position: relative;
        height: 40px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags .tagsLists {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .tags-li {
        float: left;
        margin: 4px 3px 2px 5px;
        border-radius: 3px;
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        border: 1px solid #e9eaec;
        background: #dcd3ef;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color:gray;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: rgb(151, 104, 229);
        border: 1px solid #dcd3ef;
    	background-color: #dcd3ef;
    }
    .tags-li.active .tags-li-title{
    	color: rgb(151, 104, 229);
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: gray;
    }
	
    .tags-close-box {
        position: absolute;
        right: 13px;
        top: 2px;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 96px;
        height: 32px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
    .el-button{
		height:32px ;
	}
	.el-button--primary {
	    color: gray;
	    background-color: #dcd3ef!important;
	    border-color: #dcd3ef;
	}
	.el-button--primary:hover {
	    background: #dcd3ef!important;
	    border-color: #dcd3ef!important;
	    color: #fff;
	}
	.el-button--primary:focus {
	    background: #dcd3ef!important;
	    border-color: #dcd3ef!important;
	    color: #fff;
	}
	 .el-dropdown-menu__item:not(.is-disabled):hover {
	    background: #dcd3ef!important;
	    border-color: #dcd3ef!important;
	    color: #fff;
	}
	
</style>
