<template>
	<Select v-model="city" @on-change="change">
	    <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">
	      {{ item.cityName }}
	    </Option>
	</Select>
</template>
<script>
	import { getCityList } from '@/service/fetch.js'
	export default{
		data(){
			return{
				city: '',
				cityList: []
			}
		},
		mounted(){
			this.getCity();
		},
		methods:{
			getCity(){
				getCityList().then(response=>{
					// this.cityList = response.cityList;
				});
			},
			change(value){
				this.$emit('changeVal',this.city);
			}
		}
	}
</script>