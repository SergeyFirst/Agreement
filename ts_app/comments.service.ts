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

    getComments(id:string):Observable<Comment[]> {
        
        return this.http.get(this.configData.commentsURL + id).map(res => res.json());
    }

    getDocuments(id:string):Observable<Document[]> {
        return this.http.get(this.configData.documentsURL + id).map(res => res.json());
    }

    
}