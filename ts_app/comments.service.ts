import { Comment } from './app.component';
import { Document } from './app.component';
import { ConfigData } from "./config";
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
declare let $: any;

@Injectable()
export class CommentsService {

    configData: ConfigData;

    constructor(private http: Http){
        this.configData = new ConfigData;
    }

    getComments(id:string, email:string):Observable<Comment[]> {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        return this.http.get(this.configData.commentsURL + id + "/" + email, {headers: headers}).map(
            res => res.json()
        );
    }

    getDocuments(id:string, email:string):Observable<Document[]> {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        return this.http.get(this.configData.documentsURL + id + "/" + email, {headers: headers}).map(
            res => res.json()
        );
    }

    isAgreementAvailable(id:string, email:string):Observable<boolean> {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        return this.http.get(this.configData.isAgreementAvailableURL + id + "/" + email, {headers: headers}).map(
            res => (res._body == "{true}")
        );
    }
    agree(id:string, email:string, comment:string):Observable<boolean> {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        let jdoc = '{"id": "' + id + '"' +
                   ' "email": "' + email + '"' + 
                   ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.agreeURL, jdoc, {headers: headers}).map(
            res => (res._body == "{true}")
        );
    }

    disagree(id:string, email:string, comment:string):Observable<boolean> {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        let jdoc = '{"id": "' + id + '"' +
                   ' "email": "' + email + '"' + 
                   ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.disagreeURL, jdoc, {headers: headers}).map(
            res => (res._body == "{true}")
        );
    }
    
}