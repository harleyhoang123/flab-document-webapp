import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule} from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCheckSquare, faSquare, faHouseUser, faHistory, faEllipsisV, faAlignLeft, faWrench, faPenSquare, faCaretRight, faCaretDown, faFileWord, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faCheckSquare as farCheckSquare, faSquare as farSquare, faStar, faFile} from "@fortawesome/free-regular-svg-icons";
import {faFacebook, faInstagram, faTelegram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { ErrorComponent } from './_components/error/error.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    NgbDropdownModule,
    NgbCollapseModule,
    OverlayModule,
    NgProgressModule.withConfig({
      color: "green"
    }),
    NgProgressHttpModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    PageNotFoundComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  constructor(library: FaIconLibrary) {
  library.addIcons(
    faSquare,
    faCheckSquare,
    farSquare,
    farCheckSquare,
    faFacebook,
    faInstagram,
    faTelegram,
    faTwitter,
    faHouseUser,
    faHistory,
    faStar,
    faFile,
    faEllipsisV,
    faAlignLeft,
    faWrench,
    faPenSquare,
    faCaretRight,
    faCaretDown,
    faFileWord,
    faPlus,
  )
}};
