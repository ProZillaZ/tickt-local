// hooks/useAxios.ts
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { showSuccess } from 'app/utils/toast-config';

const HOST_API = 'http://172.101.101.87:3000/api/v1';

export function useAxios() {
    const queryClient = useQueryClient();

    const axiosInstance = axios.create({
        baseURL: HOST_API,
    });

    axiosInstance.interceptors.response.use(
        (res) => {
            if (res.data?.success === true) {
                return res.data;
            }

            throw Error(res.data.message);
        },
        (error) => {
            console.log('Axios error:', error);
            return Promise.reject(error);
        },
    );
    const successAndInvalidate = (queryKey: [string]) => {
        showSuccess({
            text: 'Actioned successfully',
        });
        queryClient.invalidateQueries({ queryKey: queryKey });
    };
    return { axiosInstance, successAndInvalidate };
}
