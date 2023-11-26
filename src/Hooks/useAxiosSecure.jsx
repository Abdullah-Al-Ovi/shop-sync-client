import axios from "axios";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5001'
})
const useAxiosSecure = () => {

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });


    return axiosSecure
};

export default useAxiosSecure;