import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable()
export class BackendHttpService {

    constructor(private http: HttpClient) {
    }

    get<O>(partPath: string): Promise<O> {

        return new Promise((resolve, reject) => {
            this
                .http
                .get(environment.backendUrl + partPath)
                .toPromise()
                .then(response => {
                    resolve(response as O)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    getBlob(partPath: string): Promise<HttpResponse<Blob>> {

        return new Promise(resolve => {
            this
                .http
                .get(environment.backendUrl + partPath, {
                    responseType: 'blob',
                    observe: 'response'
                })
                .toPromise()
                .then(response => {
                    resolve(response)
                })
        })

    }

    postBlob<O>(partPath: string, file: File): Promise<O> {

        let body = new FormData();
        body.append("file", file)

        return new Promise((resolve, reject) => {
            this
                .http
                .post(environment.backendUrl + partPath, body)
                .toPromise()
                .then(response => resolve(response as O))
                .catch(error => {
                    reject(error)
                })
        })
    }

    put<O>(partPath: string, data?: any): Promise<O> {

        return new Promise((resolve, reject) => {
            this
                .http
                .put(environment.backendUrl + partPath, data, httpOptions)
                .toPromise()
                .then(response => {
                    resolve(response as O)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    delete<O>(partPath: string): Promise<O> {

        return new Promise((resolve, reject) => {
            this
                .http
                .delete(environment.backendUrl + partPath)
                .toPromise()
                .then(response => {
                    resolve(response as O)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
