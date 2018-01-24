import { Component, ChangeDetectorRef } from '@angular/core';
import { CommentsService } from './comments.service';
import { enableProdMode } from '@angular/core';
declare let Office: any;
declare let app: any;
declare let $: any;

enableProdMode();

export class Document {
    id: number;
    name: string;
    link: string;
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.link = data.link;
    }
}

export class Comment {
    id: number;
    date: Date;
    author: string;
    text: string;
    status: string;
    constructor(data: any) {
        this.id = data.id;
        this.date = data.date;
        this.author = data.author;
        this.text = data.text;
        this.status = data.status;
    }
}

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.tmp.html',
    //styles: [`.favorite{background-color: #e0e0eb; border-color: #e0e0eb;}`],
    //providers: [ProjectService, ProjectForSelectionService, SaveProjectsService]
})
export class AppComponent {
    documents: Document[] = [];
    comments: Comment[] = [];
    comment: string;
    email: string;
    body: string;
    UUID: string;

    constructor(private commentsService: CommentsService, private ref: ChangeDetectorRef) {
        this.email = Office.context.mailbox.userProfile.emailAddress;
    }
    ngOnInit() {
        this.lockForm();
        Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html, (result) => {
            if (result.status == Office.AsyncResultStatus.Succeeded) {
                this.body = result.value;
                var expr = /\[UUID=(.*)\]/;
                let UUID;
                if ((UUID = expr.exec(this.body)) !== null) {
                    this.UUID = UUID[1];
                    this.getComments();
                    this.getDocuments();
                    this.checkIsAgreementAvailable();
                }

            }
        });        
    }

    getComments() {
        this.comments = [];
        this.commentsService.getComments(this.UUID, this.email).subscribe((data) => {
            for(var i=0;i<data.length;i++){
                this.comments.push(new Comment(data[i]))
            }
            this.ref.detectChanges();
        });
    }

    getDocuments() {
        this.documents = [];
        this.commentsService.getDocuments(this.UUID, this.email).subscribe((data) => {
            for(var i=0;i<data.length;i++){
                this.documents.push(new Document(data[i]));
            }
            this.ref.detectChanges();
        });
    }

    checkIsAgreementAvailable() {
        this.commentsService.isAgreementAvailable(this.UUID, this.email).subscribe((data) => {
            if (data) {
                this.unlockForm();
            }
        });
    }


    agree() {
        this.commentsService.agree(this.UUID, this.email, this.comment).subscribe((agree) => {
            if (agree) {                
                this.lockForm();
                this.getComments();
            }
        });
    }

    disagree() {
        this.commentsService.disagree(this.UUID, this.email, this.comment).subscribe((disagree) => {
            if (disagree) {                
                this.lockForm();
                this.getComments();
            }
        });
    }

    lockForm() {
        $("#agreement_row").attr("disabled", "disabled");        
    }

    unlockForm() {
        $("#agreement_row").attr("disabled", false);
    }

}