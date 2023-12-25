import axios from "axios";
// import { useNavigate } from 'react-router-dom';
//  import { CheckExpiry } from './TokenExpiry';
// import * as notifications from '../store/notifyActions';

const API_URL = process.env.REACT_APP_ENDPOINT_URL;

const Client = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json'
    },
    timeout: 300000
});

Client.interceptors.request.use(
    config => {
        const accessToken = sessionStorage.getItem('token');
        console.log("accessToken:", accessToken);
        if (accessToken) {
            config.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`;
        }
        return config;
    },
    error => {
        console.log("error: ", error);
        Promise.reject(error.response || error.message);
    }
);

Client.interceptors.response.use(
    (response) => {
        console.log("response:", response);
        return response;
    },
    (error) => {
        console.log("error in intercepter: ", error);
        if (error.response.status === 401) {
            console.log("erorr in 401")
            //   notifications.addNotification({ message: 'Unauthorized Access', type: 'error' });
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       ...notifications
//     },
//     dispatch
//   );

export default Client;