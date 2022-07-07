import { useQuery, useMutation, useQueryClient } from "react-query";
import { IList } from "types/lists";

const API_URL = "http://localhost:3001"

export const useLists = () => {
    // 使用泛型useQuery<IList[], Error>解决后面error.message报错的问题
    // 也可以使用类型守卫和ErrorBox组件解决
    // return useQuery<IList[]>('lists', async () => {
    //     const response = await fetch(`${API_URL}/lists`)
    //     if(!response.ok){
    //         throw new Error('not ok')
    //     }
    //     return response.json()
    // })
  };

// export const useEditList = () => {
//     const queryClient = useQueryClient()

//     return useMutation(() => {
       
//     }, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('lists')
//         }
//     })
// }

// export const useAddList = () => {
//     const queryClient = useQueryClient()

//     return useMutation(() => {

//     }, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('lists')
//         }
//     })
// }

export const useList = (id?: number) => {
    return useQuery<IList>(["list", {id}], async () => {
        const response = await fetch(`${API_URL}/list/${id}`)
        if(!response.ok){
            throw new Error('not ok')
        }
        return response.json()
    }, {
        enabled: !!id   //或者Boolean(id), 这个配置的意思是只有当id有值的时候，才会触发useList里的请求方法
    })
}

export const useDeleteList = () => {

}