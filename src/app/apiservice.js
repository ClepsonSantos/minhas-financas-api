import axios from "axios";

const httpClient = axios.create({
    //baseURL: 'http://localhost:8080'https://minhas-financas-api.herokuapp.com/
    baseURL: 'https://minhas-financas-api.herokuapp.com'

});

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
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