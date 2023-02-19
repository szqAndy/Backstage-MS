// 获取品牌管理数据模块
import request from '@/utils/request'
// 获取品牌列表接口
export const reqTradeMartList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

// 处理添加品牌
// 新增品牌：
// 携带两个参数：品牌名称、品牌logo
// 注意：对于新增的品牌，给服务器传递数据，不需要传递ID，ID是由服务器生成


// 修改品牌
// 携带三个参数：ID、品牌名称、品牌LOGO
// 注意：对于修改某一个品牌的操作，前端携带的参数需要携带ID

export const reqAddOrUpdateTradeMart = (tradeMart) => {
    // 带给服务器数据携带ID 修改
    if (tradeMart.id) {
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMart
        })
    } else {
        // 新增品牌
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMart
        })
    }
}

// 删除品牌
export const reqDeleteTradeMark = (id) => request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
})