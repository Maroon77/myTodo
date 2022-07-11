import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { IList } from "types/lists";
import { http } from "utils/http";
import { useDeleteConfig, useEditConfig, useAddConfig } from "utils/use-optimistic-options";

const API_URL = "http://localhost:3001"
const queryKey = ["lists"]

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
    return useMutation(
        (params: Partial<IList>) => 
        http('lists', {
            method: "POST",
            data: params
        }),
        useAddConfig(queryKey)
    )
}

/**
 * 删除列表项
 * @returns 
 */
export const useDeleteList = (() => {
    return useMutation(
        (id: number) => 
        http(`lists/${id}`, {
            method: 'DELETE'
        }),
        useDeleteConfig(queryKey)
    )
})

/**
 * 编辑列表
 * 改变状态
 * TODO:弹窗改变数据
 * @returns 
 */
export const useEditList = () => {
    return useMutation(
        (params: Partial<IList>) => 
            http(`lists/${params.id}`, {
                method: "PATCH",
                data: params
            }),
            useEditConfig(queryKey)
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

export const useModal = () => {
    const [editingItem, setEditingItem] = useState<IList | null>(null)
    const [modalOpen, setModalOpen] =  useState(false)

    const open = () => setModalOpen(true)

    const close = () => setModalOpen(false)

    const startEdit = (item: IList) => {
        setEditingItem(item)
    }

    return {
        modalOpen,
        open,
        close,
        startEdit,
        editingItem
    }
}