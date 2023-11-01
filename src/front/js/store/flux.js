const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			signUp: async (user_name, email, password) => {
				console.log("flux signup")
				const { apiFetch } = getActions();
				const response = await apiFetch("/signup", "POST", {
					user_name,
					email,
					password
				});
				return response
			}
		}
	};
};

export default getState;
