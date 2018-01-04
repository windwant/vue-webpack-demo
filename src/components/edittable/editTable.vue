<template>
	<div class="">
		<!-- <table class="border editTable">
			<thead>
				<tr>
					<td v-for="item in columns" :key = "item.key">
						{{ item.title }}
					</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in data">
					
				</tr>
			</tbody>
		</table> -->
		<Table border :columns="columns" :data="data"></Table>
		<Button @click="creat">新增</Button>
	</div>
</template>
<script>
	 export default {
        data () {
            return {
                columns: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params)=>{
                        	return h('Input', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                })
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        render: (h, params)=>{
                        	return h('Input', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                })
                        }
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        render: (h, params)=>{
                        	return h('Input', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                })
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [
                ]
            }
        },
        methods: {
            edit (index) { //编辑时该行的index
            	console.log(index);
            	this.data[index];
            	console.log(this.data[index]);
                /*this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
                })*/
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            creat () {
            	this.data.push({
            		render: (h, params) =>{
            				return ('input',{
            					key: 'name',
            					on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
            				})
            		},
            	});
            	console.log(this.data);

            }
        }
    }
</script>