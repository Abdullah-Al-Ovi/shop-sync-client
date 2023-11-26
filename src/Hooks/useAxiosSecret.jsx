import axios from "axios";

const axiosSecret = axios.create({
    baseURL:''
})
const useAxiosSecret = () => {
    return axiosSecret
};

export default useAxiosSecret;