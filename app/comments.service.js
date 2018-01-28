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
var config_1 = require("./config");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var CommentsService = (function () {
    function CommentsService(http) {
        this.http = http;
        this.configData = new config_1.ConfigData;
    }
    CommentsService.prototype.getComments = function (id, email) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return this.http.get(this.configData.commentsURL + id + "/" + email, { headers: headers }).map(function (res) { return res.json(); });
    };
    CommentsService.prototype.getDocuments = function (id, email) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return this.http.get(this.configData.documentsURL + id + "/" + email, { headers: headers }).map(function (res) { return res.json(); });
    };
    CommentsService.prototype.isAgreementAvailable = function (id, email) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return this.http.get(this.configData.isAgreementAvailableURL + id + "/" + email, { headers: headers }).map(function (res) { return (res._body == "{true}"); });
    };
    CommentsService.prototype.agree = function (id, email, comment) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var jdoc = '{"id": "' + id + '"' +
            ' "email": "' + email + '"' +
            ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.agreeURL, jdoc, { headers: headers }).map(function (res) { return (res._body == "{true}"); });
    };
    CommentsService.prototype.disagree = function (id, email, comment) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + btoa("web" + ":" + "123"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var jdoc = '{"id": "' + id + '"' +
            ' "email": "' + email + '"' +
            ' "comment": "' + comment + '"}';
        return this.http.post(this.configData.disagreeURL, jdoc, { headers: headers }).map(function (res) { return (res._body == "{true}"); });
    };
    return CommentsService;
}());
CommentsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map