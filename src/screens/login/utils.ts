import { useMutation } from "react-query";
import { ILogin } from "types/login";
import { http } from "utils/http";

/**
 * 登录
 * @returns 
 */
 export const useLogin = () => {
    return useMutation(
        (params: ILogin) => 
            http(`login`, {
                method: "POST",
                data: params
            }),
        )
} 