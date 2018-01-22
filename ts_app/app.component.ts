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
    email: string;
    body: string;

    constructor(private commentsService: CommentsService, private ref: ChangeDetectorRef) {
        this.email = Office.context.mailbox.userProfile.emailAddress;
        Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html, (result) => {
            if (result.status == Office.AsyncResultStatus.Succeeded) {
                this.body = result.value;
                var expr = /\[UUID=(.*)\]/;
                let UUID;
                if ((UUID = expr.exec(this.body)) !== null) {
                    this.commentsService.getComments(UUID[1], this.email).subscribe((data) => {
                        for(var i=0;i<data.length;i++){
                            this.comments.push(new Comment(data[i]))
                        }
                        this.ref.detectChanges();
                    });

                    this.commentsService.getDocuments(UUID[1], this.email).subscribe((data) => {
                        for(var i=0;i<data.length;i++){
                            this.documents.push(new Document(data[i]));
                        }
                        this.ref.detectChanges();
                    });
                }

            }
        });
    }
    ngOnInit() {




    }
    getProjectsData() {
        this.lockForm();




    }

    agree() {

    }

    disagree() {

    }

    lockForm() {
        //$("#submit-btn").attr("disabled", "disabled");
        //$("#datepicker").attr("disabled", "disabled");
        //$("#add-project-btn").attr("disabled", "disabled");
        //$("#remove-project-btn").attr("disabled", "disabled");
        //$(".project-checked").attr("disabled", "disabled");
        //$(".project-hours").attr("disabled", "disabled");
        //$(".add-comment").attr("disabled", "disabled");
    }

    unlockForm() {
        //$("#submit-btn").attr("disabled", false);
        //$("#datepicker").attr("disabled", false);
        //$("#add-project-btn").attr("disabled", false);
        //$("#remove-project-btn").attr("disabled", false);
        //$(".project-checked").attr("disabled", false);
        //$(".project-hours").attr("disabled", false);
        //$(".add-comment").attr("disabled", false);
    }

}