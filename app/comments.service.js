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
var config_1 = require("./config");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var CommentsService = /** @class */ (function () {
    function CommentsService(http) {
        this.http = http;
        this.configData = new config_1.ConfigData;
    }
    CommentsService.prototype.getComments = function (id, email) {
        return this.http.get(this.configData.commentsURL + id + "\\" + email).map(function (res) { return res.json(); });
    };
    CommentsService.prototype.getDocuments = function (id, email) {
        return this.http.get(this.configData.documentsURL + id + "\\" + email).map(function (res) { return res.json(); });
    };
    CommentsService.prototype.isAgreementAvailable = function (id, email) {
        return this.http.get(this.configData.isAgreementAvailableURL + id + "\\" + email).map(function (res) { return res.json(); });
    };
    CommentsService.prototype.agree = function (id, email, comment) {
        var jdoc = '{"id": "' + id + '"' +
            ' "email": "' + email + '"' +
            ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.agreeURL, jdoc).map(function (res) { return res.json(); });
    };
    CommentsService.prototype.disagree = function (id, email, comment) {
        var jdoc = '{"id": "' + id + '"' +
            ' "email": "' + email + '"' +
            ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.disagreeURL, jdoc).map(function (res) { return res.json(); });
    };
    CommentsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CommentsService);
    return CommentsService;
}());
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map