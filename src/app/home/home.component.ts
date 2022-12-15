import {Component, OnInit} from '@angular/core';

import {User} from '../_models';
import {AccountService, Storage} from '../_services';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Space} from "../_models/space";
import {DocumentService} from "../_services/document.service";
import {PageableResponse} from "../_models/pageable-response";
import doc from "../document/editor/doc";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  user: User | null;
  form!: FormGroup;
  form2!: FormGroup;
  accountId?: string;
  spaces?: Space | undefined;
  constructor(
    private accountService: AccountService,
    private documentService: DocumentService,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.form2 = this.formBuilder.group({});
    this.accountId = this.user?.accountId;
    if(this.accountId == undefined){
       this.router.navigate(["/account/login"]);
    }else{
      this.getSpacesByAccountId(this.accountId);
    }
  }

  onSubmit() {
    this.accountService.logout();
  }

  getSpacesByAccountId(accountId: string){
    this.documentService.getSpaceByAccountId(accountId)
      .subscribe(response => {
        this.spaces = response?.items;
      })
  }

  goToDocumentDetail(space: Space){
    console.log("Space selected: "+ JSON.stringify(space))
    this.storage.setItem("currentDocumentId", <string>space.documentId);
    this.storage.setItem("currentMemberId", <string>space.memberId);
    // this.router.navigate(["document"]);
    this.router.navigate(["/document/spaces"]);
  }
}
