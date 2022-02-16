import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

const httpClient = axios.create({
    baseURL: baseURL,
    withCredentials: true 
    //https://minhas-financas-api.herokuapp.com/
    //baseURL: 'https://minhas-financas-api.herokuapp.com'

});

class ApiService {

    constructor(apiurl){
        console.log('baseURL: ', baseURL);
        this.apiurl = apiurl;
    }

    static registrarToken(token){
        if(token){
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    post(url, objeto){
        const request = `${this.apiurl}${url}`;
        return httpClient.post(request, objeto);
    }

    put(url, objeto){
        const request = `${this.apiurl}${url}`;
        return httpClient.put(request, objeto);
    }

    delete(url){
        const request = `${this.apiurl}${url}`;
        return httpClient.delete(request);
    }

    get(url){
        const request = `${this.apiurl}${url}`;
        return httpClient.get(request);
    }
}

export default ApiService;