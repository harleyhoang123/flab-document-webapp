import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { EditorComponent } from './editor/editor.component';
import { DocumentHeaderComponent } from './document-header/document-header.component';
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { PreViewComponent } from './pre-view/pre-view.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxEditorModule} from "ngx-editor";
import {DocumentLayoutComponent} from "./document.layout.component";
import { SpacesComponent } from './spaces/spaces.component';
import { SpaceNavigationComponent } from './spaces/space-navigation/space-navigation.component';
import { GetTitleNameModalComponent } from './editor/get-title-name-modal/get-title-name-modal.component';


@NgModule({
  declarations: [
    DocumentComponent,
    EditorComponent,
    DocumentHeaderComponent,
    PreViewComponent,
    DocumentLayoutComponent,
    SpacesComponent,
    SpaceNavigationComponent,
    GetTitleNameModalComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxEditorModule
  ]
})
export class DocumentModule { }
