<template>
  <div class="login-contain">
    <div class="login">
      <h1 class="login-title">用户登录</h1>
      <form>
        <div v-show="login_error"
             class="login-error">{{ error }}</div>
        <input v-model="loginModel.username"
               type="text"
               class="login-user"
               placeholder="请输入用户名"
               @focus="focus">
        <input v-model="loginModel.password"
               type="password"
               class="login-pw"
               placeholder="请输入密码"
               @focus="focus">
        <input v-model="loginModel.code"
               type="text"
               class="login-code"
               placeholder="请输入验证码"
               @focus="focus">
        <img :src="imgurl" alt="" id="imgUrl"@click="getCode" class="imgurl">
        <i-button type="success"
                  long
                  @click="submit"
                  >{{ submitBtn }}</i-button>
      </form>
    </div>
    <div class="login-foot"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {login} from "@/service/fetch";
  //import jsonp from "@/config/jsonp";
  import {setStore} from "@/config/utils";
  export default {
    data() {
      return {
        'login_error': false,
        'error': '',
        imgurl:"http://localhost:8080/login/code",
        submitBtn: '登录',
        msg: '',
        loginModel: {
          username:'',
          password:'',
          code:""
        }
      }
    },
    methods: {
      focus() {
        let vm = this
        vm.login_error = false
        vm.error = ''
      },
      getCode(){
        this.imgurl ="http://localhost:8080/login/code?v="+new Date().getTime();
      },
      submit(event) {
        event.preventDefault();
        if(!this.loginModel.username || !this.loginModel.password || !this.loginModel.code) {
          this.login_error = true;
          this.error = "登录信息输入错误，请重新输入！";
        }else{
          //测试跳转
          setStore("userName", this.loginModel.username);
          this.$router.push({name: "首页", path: "/home"});

          /*login({
            name:this.loginModel.username,
            password:this.loginModel.password,
            code:this.loginModel.code
          }).then((res) => {
            if (res.code == 0) {
              if (this.$route.query.redirect) {
                //     let redirect = decodeURIComponent(this.$route.query.redirect);
                let redirect = this.$route.query.redirect;
                this.$router.push(redirect);
              } else {
                this.$router.push('/home');
              }
              setStore("userName", this.loginModel.username);
              this.$router.push({name: "首页", path: "/home"});
            } else {
              this.login_error = true;
              this.error = res.msg;
              this.$router.push('/login');
            }
          })
          */




          /*jsonp("http://localhost:8080/login",{
            name:this.loginModel.username,
            password:this.loginModel.password,
            code:this.loginModel.code
          }).then((data)=>{
            console.log(data);
          })*/

        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/color";
  .login-contain{
    background-size: cover;
    z-index:1;
    width:100%;
    height:100%;
    position: fixed;
  }
  .login{
    width:450px;
    height:440px;
    margin:auto;
    padding:30px;
    box-shadow: 0 0 10px #ccc;
    background: $background-qian-color;
    z-index:5;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;

    .ivu-btn-success{
      width:100%;
      height:45px;
      color: $font-color;
      font-size:16px;
      //border-color: @login-button;
    }

    .ivu-btn-success[disabled]{
      color: #c3cbd6;
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      cursor: not-allowed;
      -webkit-transition: all 0s;
      -moz-transition: all 0s;
      -ms-transition: all 0s;
      -o-transition: all 0s;
      transition: all 0s;
    }

    .ivu-btn-success[disabled]:hover{
      color: #c3cbd6;
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      cursor: not-allowed;
      -webkit-transition: all 0s;
      -moz-transition: all 0s;
      -ms-transition: all 0s;
      -o-transition: all 0s;
      transition: all 0s;
    }
  }
  .login-title{
    width:100%;
    height:60px;
    text-align: center;
    line-height:60px;
    color:#5b5f60;
    font-size:$font-header;
  }
  .login-error{
    color: red;
    line-height:20px;
  }
  .login-user:focus{
  }
  .login-pw,.login-user,{
    height:45px;
    background: #f8f8f8;
    margin:10px 0;
    border:2px solid transparent;
    text-indent: 10px;
    width:100%;
    outline:none;
  }
  .login-code{
    height:45px;
    background: #f8f8f8;
    margin:10px 0;
    border:2px solid transparent;
    text-indent: 10px;
    width:69%;
    outline:none;
  }
  .imgurl{
    width:116px;
    height:45px;
    margin:10px 0;
    float: right;
  }
  .clearfix{
    zoom: 1;
  }
  .clearfix:after{
    content: '*';
    height:0;
    widows:0;
    visibility: hidden;
    display: block;
    line-height:0;
    clear: both;
  }
  .remember{
    opacity: 0;
    width:0;
    height:0;
  }
  .login-btn{
    width:100%;
    height:45px;
    background:#4a9ede;
    color: #ffffff;
    font-size:16px;
    cursor: pointer;
    outline: none;
    border:none;
  }
  .login-foot{
    width:320px;
    height:20px;
    margin:auto;
    z-index:1;
    position: absolute;
    left:0;
    right:0;
    top:450px;
    bottom:0;
    color: #ffffff;
    text-align: center;
    font-size:15px;
  }
  .login-copyright{
    height:40px;
    width:100%;
    position: absolute;
    left:0;
    bottom:0;
    text-align: center;
    color: #ffffff;
    font-size:16px;
  }

</style>
