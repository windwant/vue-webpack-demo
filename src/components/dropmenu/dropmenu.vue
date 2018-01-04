<template>
  <Dropdown style="margin-left: 20px" @on-click="change" trigger="click">
    <Button type="primary">
      {{currentText}}
      <Icon type="arrow-down-b"></Icon>
    </Button>
    <DropdownMenu slot="list">
      <DropdownItem name="item1">item1</DropdownItem>
      <DropdownItem name="item2">item2</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        currentText:"item1"
      }
    },
    mounted(){
      this.change("lll");
    },
    methods:{
      change(pp){
        this.currentText=pp;
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
