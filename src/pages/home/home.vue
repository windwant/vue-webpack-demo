<template>
  <div class="layout">
    <Row type="flex">
      <v-menu></v-menu>
      <Col span="21">
      <div class="layout-header">
        <span class="userName">{{username}}</span>
        <Button type="success" class="lgout" @click="lgout">退出</Button>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view>
              
          </router-view>
        </div>
      </div>
      </Col>
    </Row>
    <BackTop><div class="toTop">返回顶端</div></BackTop>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from "axios";
  import menu from "@/components/menu/index";
  import {getStore,clearStore} from "@/config/utils";
  export default{
    data(){
      return{
        username:getStore("userName")
      }
    },
    created(){

    },
    methods:{
      lgout(){
        let that = this;
        that.$Modal.confirm({
          title: "退出登录",
          content: "<p>你确定要退出登录吗？</p>",
          onOk(){
            clearStore();
            that.$router.push({name:"用户登录",path:"/login"});
          }
        });
      }
    },
    components:{
      "v-menu":menu
    }
  }
</script>


<style scoped lang="scss">
  @import "../../assets/css/color.scss";
  .layout{
    width: 100%;
    min-height:100%;
    background: $background-color;
    position: relative;
    height:100%;
  }
  .ivu-row-flex{
    width: 100%;
    min-height:810px;
  }
  .layout-content{
    margin: 15px;
    overflow: hidden;
    background: $background-qian-color;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: $font-shen-color;
  }
  .layout-header{
    height: 60px;
    line-height: 60px;
    background: $background-qian-color;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding-right:20px;
    text-align: right;
    .userName{
      margin-right:10px;
      font-size:16px;
    }
  }
</style>
