const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			current_user:{}
		},
		actions: {
			apiFetch: async (endpoint, method="GET", body=null) => {
				var request;
				if (method=="GET"){
					request = await fetch(process.env.BACKEND_URL+"/api"+endpoint);
				}
				else {
					const params = {
						method,
						headers: {
							"Content-Type":"application/json"
						}
					}
					if(body) {
						params.body = JSON.stringify(body);
					}
					request = fetch(process.env.BACKEND_URL+"/api"+endpoint, params);
				}
				const resp = await request;
				const data = await resp.json();
				return {code: resp.status, data};
			},
			apiFetchProtected: async (endpoint, method="GET", body=null)=>{
				let access_token = sessionStorage.getItem("access_token");
				if (access_token===null){
					return "No token";
				}
				const params = {
					method,
					headers:{
						"Authorization":"Bearer "+access_token
					}
				}
				if(body){
					params.headers["Content-Type"]="application/json";
					params.body=JSON.stringify(body);
				}
				const response = await fetch(process.env.BACKEND_URL+"/api"+endpoint, params)
				const data = await response.json();
				return {code:response.code,data}
			},
			signUp: async (user_name, email, password) => {
				const { apiFetch } = getActions();
				const response = await apiFetch("/signup", "POST", {
					user_name,
					email,
					password
				});
				return response
			},
			logIn: async (email, password) => {
				const { apiFetch } = getActions();
				const response = await apiFetch("/login", "POST", {
					email,
					password
				});
				const {token, user} = response.data;
				if(response.code == 200) {
					sessionStorage.setItem("access_token", token);
					sessionStorage.setItem("user", JSON.stringify(user));
					setStore({current_user: user});
				}
				return response
			},
			logOut: async () =>{
				let jti = sessionStorage.getItem("access_token");
				if(jti===null) return;
				const {apiFetchProtected} = getActions();
				apiFetchProtected('/logout', "POST", {
					jti
				})
				setStore({current_user:{}});
				sessionStorage.removeItem("access_token");
				sessionStorage.removeItem("user");
				
			},
			loadTokens: () => {
				let token = sessionStorage.getItem("access_token");
				if (token != null){
					let user_data = JSON.parse(sessionStorage.getItem("user"));
					setStore({current_user: user_data});
				}
			},
			checkToken: async () => {
				const { apiFetchProtected } = getActions();
				const response = await apiFetchProtected("/private", "POST");
				console.log(response.status)
				if(!response.data.claims.jti){
					const {logOut} = getActions();
					logOut();
				}
				return response;
			}
		}
	};
};

export default getState;
