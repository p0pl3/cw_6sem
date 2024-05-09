import {axiosInstance} from "./requests";

export async function getOrderArticles(orderId) {
    try {
        return axiosInstance.get(`/order_article/${orderId}/article`).then(res => res.data)
    } catch (e) {
        throw e;
    }
}

export async function getOrderArticle(orderId, articleId) {
    try {
        return axiosInstance.get(`/order_article/${orderId}/article/${articleId}`).then(res => res.data)
    } catch (e) {
        throw e;
    }
}

export async function createOrderArticle(orderId, data) {
    try {
        return await axiosInstance.post(`/order_article/${orderId}/article`, data).then(res => res.data)
    } catch (e) {
        throw e;
    }
}

export async function updateOrderArticle(orderId, id, data) {
    try {
        return await axiosInstance.put(`/order_article/${orderId}/article/${id}`, data).then(res => res.data)
    } catch (e) {
        throw e;
    }
}

export async function deleteOrderArticle(orderId, id) {
    try {
        return await axiosInstance.delete(`/order_article/${orderId}/article/${id}`).then(res => res.data)
    } catch (e) {
        throw e;
    }
}