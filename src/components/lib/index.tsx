//类型守卫
// 当符合value?.message, value就是Error类型
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({error}: {error: unknown}) => {
    // 如果有message属性，就判定为Error类型
    // error为unknown类型，使用error?.message也不能解决ts的报错，使用类型守卫解决
    if(isError(error)){
        return <h3>{error?.message}</h3>
    }
    return null
}