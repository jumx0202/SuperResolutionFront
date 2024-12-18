import axios from "axios";

export const uploadImage = async (imageFile) => {
    try {
        // 使用 FormData 传递图片
        const formData = new FormData();
        formData.append('image', imageFile);
        // 打印当前的 Authorization 头部
        console.log('Authorization Header:', axios.defaults.headers.common['Authorization']);
        // 使用相对路径，基于 Axios 的 baseURL
        const response = await axios.post('/image/upload', formData);
        console.log(response.data);
        return response.data; // 返回处理后的图片 URL

    } catch (error) {
        console.error('上传失败:', error);
        // 更详细的错误处理
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(`上传失败: ${error.response.data.error}`);
        } else {
            throw new Error('上传失败，请稍后再试');
        }
    }
};

export const getHistory = async () =>{
    try{
        console.log("获取历史记录");
        const response = await axios.get('/image/history');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching answer:', error);
        throw new Error('Error fetching answer, please try again later.');
    }
}