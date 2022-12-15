import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentComponent} from "./document.component";
import {EditorComponent} from "./editor/editor.component";
import {PreViewComponent} from "./pre-view/pre-view.component";
import {DocumentLayoutComponent} from "./document.layout.component";
import {SpacesComponent} from "./spaces/spaces.component";
import {AuthGuard} from "../_helpers";

const routes: Routes = [
  {
    path: '', component: DocumentLayoutComponent,
    children: [
      { path: '', component: DocumentComponent, canActivate: [AuthGuard] },
      {path: 'spaces', component: SpacesComponent, canActivate: [AuthGuard]},
      { path: 'spaces/editor', component: EditorComponent, canActivate: [AuthGuard] },
      { path: 'spaces/pre-view', component: PreViewComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
