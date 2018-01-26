"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var comments_service_1 = require("./comments.service");
var core_2 = require("@angular/core");
core_2.enableProdMode();
var Document = (function () {
    function Document(data) {
        this.id = data.id;
        this.name = data.name;
        this.link = data.link;
    }
    return Document;
}());
exports.Document = Document;
var Comment = (function () {
    function Comment(data) {
        this.id = data.id;
        this.date = data.date;
        this.author = data.author;
        this.text = data.text;
        this.status = data.status;
    }
    return Comment;
}());
exports.Comment = Comment;
var AppComponent = (function () {
    function AppComponent(commentsService, ref) {
        this.commentsService = commentsService;
        this.ref = ref;
        this.documents = [];
        this.comments = [];
        this.comment = "";
        this.email = Office.context.mailbox.userProfile.emailAddress;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lockForm();
        Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html, function (result) {
            if (result.status == Office.AsyncResultStatus.Succeeded) {
                _this.body = result.value;
                var expr = /\[UUID=(.*)\]/;
                var UUID = void 0;
                if ((UUID = expr.exec(_this.body)) !== null) {
                    _this.UUID = UUID[1];
                    _this.getComments();
                    _this.getDocuments();
                    _this.checkIsAgreementAvailable();
                }
            }
        });
    };
    AppComponent.prototype.getComments = function () {
        var _this = this;
        this.comments = [];
        this.commentsService.getComments(this.UUID, this.email).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                _this.comments.push(new Comment(data[i]));
            }
            _this.ref.detectChanges();
        });
    };
    AppComponent.prototype.getDocuments = function () {
        var _this = this;
        this.documents = [];
        this.commentsService.getDocuments(this.UUID, this.email).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                _this.documents.push(new Document(data[i]));
            }
            _this.ref.detectChanges();
        });
    };
    AppComponent.prototype.checkIsAgreementAvailable = function () {
        var _this = this;
        this.commentsService.isAgreementAvailable(this.UUID, this.email).subscribe(function (data) {
            if (data) {
                _this.unlockForm();
            }
        });
    };
    AppComponent.prototype.agree = function () {
        var _this = this;
        this.commentsService.agree(this.UUID, this.email, this.comment).subscribe(function (agree) {
            if (agree) {
                _this.lockForm();
                _this.getComments();
            }
        });
    };
    AppComponent.prototype.disagree = function () {
        var _this = this;
        this.commentsService.disagree(this.UUID, this.email, this.comment).subscribe(function (disagree) {
            if (disagree) {
                _this.lockForm();
                _this.getComments();
            }
        });
    };
    AppComponent.prototype.lockForm = function () {
        $("#comment-text").attr("disabled", true);
        $("#agree-btn").attr("disabled", true);
        $("#disagree-btn").attr("disabled", true);
    };
    AppComponent.prototype.unlockForm = function () {
        $("#comment-text").attr("disabled", false);
        $("#agree-btn").attr("disabled", false);
        $("#disagree-btn").attr("disabled", false);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.tmp.html',
    }),
    __metadata("design:paramtypes", [comments_service_1.CommentsService, core_1.ChangeDetectorRef])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map