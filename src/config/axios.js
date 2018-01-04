import axios from './http.js';

axios.defaults.withCredentials=true;
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'static/';

export default async(url = '', data = {}, type = 'GET')=>{
	type = type.toUpperCase();
	const params = Object.assign({},data,{
    //公共参数
  	})
	try{
		let response;
		if(type === 'POST'){
			response = await axios({
				url: url,
				type: type,
				data: params
			})
		}else{  //默认按照get方式处理
			response = await axios({
				url: url,
				type: type,
				params: params
			});
		}
		return response.data;
	}
	catch(error){
		// throw new Error(error);
	}
}
