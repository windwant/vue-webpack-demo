<template>
  <div class="userlist">
    <div class="userTable" v-show="detail">
      <div class="search-box clearfix">
        <div class="search-list">
          <label for="">姓名：</label>
          <div class="input clearfix">
            <Input v-model="search.name" placeholder="请输入姓名"></Input>
          </div>
        </div>
        <div class="search-list">
          <Button type="primary" icon="ios-search" @click="_getData(1)">搜索</Button>
        </div>
      </div>
      <Table border :columns="table.columns1" :data="table.data1" class="table"></Table>
      <Page :total="table.total" show-elevator @on-change="onChange"></Page>
    </div>
    <div class="addShow" v-show="!detail">
      <Tabs value="name1"  type="card">
        <TabPane label="用户详情" name="name1">
          <Form :ref="userlist" :model="userlist" label-position="right" :label-width="100">
            <FormItem label="用户ID：">
              <Input v-model="userlist.id" readonly></Input>
            </FormItem>
            <FormItem label="用户名：">
              <Input v-model="userlist.name" readonly></Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="设置角色" name="name2">
          <Form  label-position="right" :label-width="100">
            <FormItem label="角色：">
              <Dropdown style="margin-left: 20px" trigger="click">
                <Button type="primary" :roleId="userid">
                  {{currentrole}}
                  <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="(list,index) in roles" :name="list.name" :key="list.id">{{list.name}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormItem>
            <FormItem label="角色有效期：">
              <DatePicker v-model="roleEdit.roleValildOff" type="date" placeholder="角色有效期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="userSubmit()">确定</Button>
              <Button type="ghost" style="margin-left: 8px" @click="userReset(roleEdit)">取消</Button>
            </FormItem>
          </Form>
          <Table border :columns="table.columns1" :data="table.data1" class="table"></Table>
          <Page :total="table.total" show-elevator @on-change="onChange"></Page>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        detail:true,
        roles:[
          {
            id:1,
            name:"admin"
          },{
            id:2,
            name:"guest"
          }
        ],
        currentrole:"admin",
        userid:"",
        table:{
          columns1:[
            {
              title: '用户ID',
              key: 'id'
            },
            {
              title: '姓名',
              key: 'name'
            },
            {
              title: '查看详情',
              key: 'action',
              width: 100,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.eidt(params.index)
                      }
                    }
                  }, '编辑')
                ]);
              }
            }
          ],
          data1:[
            {
              id: 1,
              name: 'user1'
            }
          ],
          total:1
        },
        search:{
          name:"",
          levelId:""
        },
        userlist:{
          id:"1",
          name:"user1"
        },
        //roleEdit
        roleEdit:{
          userId:"",
          roleId:"",
          roleValidOff:""
        }
      }
    },
    created(){
      this._getData(1);
    },
    methods:{
      _getData(page){},
      onChange(){

      },
      eidt(){
        this.detail = !this.detail;
      },
      userSubmit(){
         this.$Message.success("submit");
      },
      userReset(name){
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
