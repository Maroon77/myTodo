import { useQuery, useMutation, useQueryClient } from "react-query";
import { IList } from "types/lists";
import { http } from "utils/http";

const API_URL = "http://localhost:3001"

/**
 * 获取列表
 * @returns 
 */
export const useLists = () => {
    // 使用泛型useQuery<IList[], Error>解决后面error.message报错的问题
    // 也可以使用类型守卫和ErrorBox组件解决
    return useQuery<IList[]>('lists', async () => {
        return http('lists')
    })
  };

/**
 * 添加列表项
 * @returns 
 */
export const useAddList = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<IList>) => 
        http('lists', {
            method: "POST",
            data: params
        }),
        {
            onSuccess: () => {
                console.log("add success");
                queryClient.invalidateQueries('lists')
            }
        }
    )
}

/**
 * 删除列表项
 * @returns 
 */
export const useDeleteList = (() => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ id }: { id: number }) => 
        http(`lists/${id}`, {
            method: 'DELETE'
        }),
        {
            onSuccess: () => {
                console.log('delete success');
                queryClient.invalidateQueries('lists')
            }
        }
    )
})

/**
 * 编辑列表
 * 改变状态
 * TODO:弹窗改变数据
 * @returns 
 */
export const useEditList = () => {
    const queryClient = useQueryClient()
    const queryKey = ["lists"]
    return useMutation(
        (params: Partial<IList>) => 
            http(`lists/${params.id}`, {
                method: "PATCH",
                data: params
            }),
            {
                onSuccess: () => queryClient.invalidateQueries(queryKey),
                //实现乐观更新
                // async onMutate(target){
                //     const previousLists = queryClient.getQueryData(queryKey)
                //     queryClient.setQueryData(queryKey, (old?: IList[]) => {
                //         return old?.map( list => list.id === target.id ? {...list, ...target}: list) || []
                //     })
                //     return {previousLists}
                // },
                // onError(error, newItem, context){
                //     queryClient.setQueryData(queryKey, context?.previousLists)
                // }
            }
        )
}

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