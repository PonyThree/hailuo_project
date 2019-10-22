<template>
    <div id="app">
    
        <router-view v-if='isRouterAlive'>
        	
        	
        </router-view>
    </div>
</template>
<script>
console.log(window.innerWidth/3.75)
// 解决刷新页面
    export default{
        provide(){
            return {
                reload:this.reload
            }
        },
        data(){
            return {
                isRouterAlive:true
            }
        },
        methods:{
            reload(){
                this.isRouterAlive=false;
                this.$nextTick(function(){
                    this.isRouterAlive=true
                })
            }
        }
    }

</script>
<style>
    /* 平板之类的宽度 1024 以下设备 */
    /* @media only screen and (min-width: 321px) and (max-width: 1024px) {
        html {
        background: blue;
        font-size:32px;
        }
    } */
    /* PC客户端或大屏幕设备: 1028px 至更大 */
    /* @media only screen and (min-width: 1029px) {
        html {
        background: green;
         font-size:16px;
        }
    } */
    @import "./assets/css/main.css";
    /*@import "./assets/css/color-dark.css"; */    /*深色主题*/
    @import "./assets/css/theme-green/color-green.css";   /*浅绿色主题*/
    *{
        font-family: '微软雅黑'
    }
</style>