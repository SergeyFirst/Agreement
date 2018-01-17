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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var comments_service_1 = require("./comments.service");
var core_2 = require("@angular/core");
core_2.enableProdMode();
var Document = /** @class */ (function () {
    function Document() {
    }
    return Document;
}());
exports.Document = Document;
var Comment = /** @class */ (function () {
    function Comment() {
    }
    return Comment;
}());
exports.Comment = Comment;
var AppComponent = /** @class */ (function () {
    function AppComponent(commentsService) {
        this.commentsService = commentsService;
        this.documents = [];
        this.comments = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.email = Office.context.mailbox.userProfile.emailAddress;
        Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html, function (result) {
            if (result.status == Office.AsyncResultStatus.Succeeded) {
                _this.body = result.value;
                var expr = /<div hidden="true" id="UUID">(.*)<\/div>/;
                var UUID = void 0;
                //if((UUID = expr.exec(this.body)) !== null) {
                _this.commentsService.getComments(UUID[1]).subscribe(function (data) {
                    _this.comments = data;
                });
                _this.commentsService.getDocuments(UUID[1]).subscribe(function (data) {
                    _this.documents = data;
                });
                //}
                console.log("Ok");
            }
        });
    };
    AppComponent.prototype.getProjectsData = function () {
        this.lockForm();
    };
    AppComponent.prototype.agree = function () {
    };
    AppComponent.prototype.disagree = function () {
    };
    AppComponent.prototype.lockForm = function () {
        //$("#submit-btn").attr("disabled", "disabled");
        //$("#datepicker").attr("disabled", "disabled");
        //$("#add-project-btn").attr("disabled", "disabled");
        //$("#remove-project-btn").attr("disabled", "disabled");
        //$(".project-checked").attr("disabled", "disabled");
        //$(".project-hours").attr("disabled", "disabled");
        //$(".add-comment").attr("disabled", "disabled");
    };
    AppComponent.prototype.unlockForm = function () {
        //$("#submit-btn").attr("disabled", false);
        //$("#datepicker").attr("disabled", false);
        //$("#add-project-btn").attr("disabled", false);
        //$("#remove-project-btn").attr("disabled", false);
        //$(".project-checked").attr("disabled", false);
        //$(".project-hours").attr("disabled", false);
        //$(".add-comment").attr("disabled", false);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.component.tmp.html',
        }),
        __metadata("design:paramtypes", [comments_service_1.CommentsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map