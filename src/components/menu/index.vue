<template>
  <Col span="3" class="layout-menu-left">
  <Menu ref="menu"
        theme="dark"
        width="auto"
        :open-names="openNames"
        :active-name="activeName" @on-select="changeMenu">
    <div class="layout-logo-left"></div>
    <Submenu :name="list.title" v-for="list in menu" :key="list.id">
      <template slot="title">
        <Icon :type="list.iconType" size="20px"></Icon>
        {{list.title}}
      </template>
      <router-link exact :to="{path:'/'+childsList.path}" v-for="childsList in list.children" :key="childsList.id">
        <MenuItem :name="childsList.path">{{childsList.title}}</MenuItem>
      </router-link>
    </Submenu>
  </Menu>
  </Col>
</template>
<script>
  import {getMenu} from '@/service/fetch';
  export default{
    data(){
      return{
        menu:[],
        openNames:[],
        activeName:"",
        nowPath:"accountlist"
      }
    },
    created(){
        this._getMenu();
    },
    methods:{
      _getMenu(){
        const that = this;
        getMenu().then(data =>{
          that.menu = data.result.tree;
          //设置首次默认打开的openNames和activeName；
          const nowPathArray = window.location.href.split("#")[1].split("/");
          that.nowPath = nowPathArray[1]+(!nowPathArray[2] ? "" : "/"+nowPathArray[2]);
          that.menu.forEach(it=>{
            if(it.children){
              it.children.forEach(item=>{
                if(item.path===that.nowPath){
                  that.openNames = [it.title];
                }
              })
            }
          })
          that.activeName = that.nowPath;
          that.$nextTick(()=>{
            //手动打开菜单；
            that.$refs.menu.updateOpened();
            that.$refs.menu.updateActiveName();
          })
        })
      },
      changeMenu(path){
        this.menu.forEach(it=>{
          if(it.children){
            it.children.forEach(item=>{
              if(item.path===path){
                this.openNames = [it.title];
              }
            })
          }
        })

        this.activeName = path;
        this.$nextTick(()=>{
          //手动打开菜单；
          this.$refs.menu.updateOpened();
          this.$refs.menu.updateActiveName();
        })

      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../../assets/css/color";
  .layout-menu-left{
    height: 100%;
    background: $background-slide-color;
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: $background-slide-di-color;
    border-radius: 3px;
    margin: 15px auto;
  }
  .ivu-menu-item{
    a{
      width: 100%;
      display:block;
      color:$font-color;
    }
  }
  .router-link-active{

  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    color:$font-color;
  }
</style>
