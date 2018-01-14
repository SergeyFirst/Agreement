import { NgModule }         from '@angular/core';
import { HttpModule }       from '@angular/http';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { AppComponent }     from './app.component';
import { CommentsService }  from './comments.service';
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers:    [ CommentsService ]    
})
export class AppModule { }