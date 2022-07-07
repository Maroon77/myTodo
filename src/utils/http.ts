import qs from "qs";

const API_URL = "http://localhost:3001"

interface Config extends RequestInit {
    token?: string;
    data?: object;
  }

export const http = async (
    endpoint: string,
    { data, token, headers, ...cumstomConfig} : Config = {}
) => {
    // PS: 1、当method为非"GET"时，需要设置headers里的content-type，且body的参数需要JSON.stringify
    const config = {
        method: "GET",
        headers: {
            "content-type": data ? "application/json" : ""
        },
        ...cumstomConfig
    }
    if(config.method.toUpperCase() === "GET"){
        endpoint += `?${qs.stringify(data)}`
    }else{
        config.body = JSON.stringify(data || {})
    }
    return window
            .fetch(`${API_URL}/${endpoint}`, config)
            .then(async (response) => {
                // if (response.status === 401) {
                //     await auth.logout();
                //     window.location.reload();
                //     return Promise.reject({ message: "请重新登录" });
                //   }
                const data = await response.json()
                if(response.ok){
                    return data
                }else {
                    return Promise.reject(data)
                }
            })

}