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
        return this.http.get(this.configData.commentsURL + id + "/" + email).map(
            res => res.json()
        );
    }

    getDocuments(id:string, email:string):Observable<Document[]> {
        return this.http.get(this.configData.documentsURL + id + "/" + email).map(
            res => res.json()
        );
    }

    isAgreementAvailable(id:string, email:string):Observable<boolean> {
        return this.http.get(this.configData.isAgreementAvailableURL + id + "/" + email).map(
            res => res.json()
        );
    }
    agree(id:string, email:string, comment:string):Observable<boolean> {
        let jdoc = '{"id": "' + id + '"' +
                   ' "email": "' + email + '"' + 
                   ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.agreeURL, jdoc).map(
            res => res.json()
        );
    }

    disagree(id:string, email:string, comment:string):Observable<boolean> {
        let jdoc = '{"id": "' + id + '"' +
                   ' "email": "' + email + '"' + 
                   ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.disagreeURL, jdoc).map(
            res => res.json()
        );
    }
    
}