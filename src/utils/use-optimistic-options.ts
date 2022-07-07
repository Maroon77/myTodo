import { useQueryClient, QueryKey } from "react-query"

export const useConfig = (
    quertKey: QueryKey,
    callback: (target: any, old?: any[]) => any[]
) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => queryClient.invalidateQueries(quertKey),
        // TODO:乐观更新，成功了，但是先请求了一个lists，再执行的callback，再是成功回调lists，导致有bug，第一个lists请求不应该发出
        async onMutate(target: any) {
            const previous = queryClient.getQueryData(quertKey)
            queryClient.setQueryData(quertKey, (old?: any[]) => {
                return callback(target, old)
            })
            return {previous}
        },
        onError(error:any, newItem:any, context: any){
            queryClient.setQueryData(quertKey, context.previous)
        }
    }
}

export const useDeleteConfig = (queryKey: QueryKey) => 
    useConfig(
        queryKey, 
        (target, old) => old?.filter(item => item.id !== target.id) || []
    )

export const useEditConfig = (queryKey: QueryKey) => 
    useConfig(
        queryKey, 
        (target, old) => old?.map(item =>
            item.id === target.id ? {...item, ...target} : item) || []
    )

export const useAddConfig = (queryKey: QueryKey) =>
    useConfig(
        queryKey, 
        (target, old) => (old ? [...old, target] : [])
    );