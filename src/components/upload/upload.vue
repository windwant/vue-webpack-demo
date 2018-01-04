<template>
  <div>
  <div class="demo-upload-list" v-for="item in uploadList">
    <template v-if="item.status === 'finished'">
      <img :src="item.url">
      <div class="demo-upload-list-cover" 
      v-if="upload.isView||upload.isFirstSet||upload.isRemove">
        <Icon type="ios-eye-outline" @click.native="handleView(item.name)" 
        v-if="upload.isView"></Icon>
        <Icon :type="item.lock" @click.native="handleSetFirst(item)" 
        v-if="upload.isFirstSet"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)" 
        v-if="upload.isRemove"></Icon>
      </div>
    </template>
    <template v-else>
      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
    </template>
  </div>
  <Upload
    ref="upload"
    :show-upload-list="false"
    :default-file-list="defaultList"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png']"
    :max-size="2048"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
    multiple
    type="drag"
    action="//jsonplaceholder.typicode.com/posts/"
    style="display: inline-block;width:100px;">
    <div style="width: 100px;height:100px;line-height: 100px;">
      <Icon type="camera" size="50"></Icon>
    </div>
  </Upload>
  <Modal title="View Image" v-model="visible">
    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
  </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    props:{
      upload:{
        type: Object,
        default: function () {
          return {
            maxSize: 5, //上传图片最大张数
            isView: false,  //是否可查看大图
            isFirstSet: false, //是否可设置为首图
            isRemove: false    //是否有删除
          }
        }
      },
    },
    methods: {
      handleSetFirst (file) {
        const fileList = this.$refs.upload.fileList;
        console.log(fileList);
        fileList.forEach(function(item){
          item.isFirst = false;
          item.lock = 'unlocked';
        });
        file.isFirst = true;
        file.lock = 'locked';
        this.$refs.upload.fileList.splice(fileList.indexOf(file),0);
      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        if(file.isFirst){
          this.$Notice.warning({
            title: '提示',
            desc: '您目前将该图片设置为首图了请选择其他图为首图才可进行删除。'
          });
          return;
        }
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        file.lock = 'unlocked';
        file.isFirst = false;
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '上传图片格式不正确',
          desc: '图片' + file.name + ' 的格式不正确，请选择jpg或者png格式。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '图片太大',
          desc: '图片  ' + file.name + ' 太大，请上传不超过2M的图片'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < this.upload.maxSize;
        if (!check) {
          this.$Notice.warning({
            title: '上传个数不能超过'+this.upload.maxSize+'张',
          });
        }
        return check;
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
