import axios from 'axios';

export const userLogin = async (userInfo) => {
    try {
        console.log("用户登录："+userInfo);
        const response = await axios.post('/user/login', userInfo);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching answer:', error);
        throw new Error('Error fetching answer, please try again later.');
    }
};

export const register = async (userInfo) => {
    try {
        console.log("用户注册："+userInfo);
        console.log(userInfo);
        const response = await axios.post('/user/register', userInfo);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching answer:', error);
        throw new Error('Error fetching answer, please try again later.');
    }
};

export const sendSMS = async (email) => {
    try {
        console.log("发送邮箱验证码到："+email);
        const response = await axios.post('/user/sendSMS', {email: email});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching answer:', error);
        throw new Error('Error fetching answer, please try again later.');
    }
};