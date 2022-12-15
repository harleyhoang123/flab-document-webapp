import {Component, OnInit} from '@angular/core';
import {faHouseUser, faHistory, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faStar, faFile, faFileWord} from "@fortawesome/free-regular-svg-icons";
import {DocumentService} from "../_services/document.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService, AlertService, Storage} from "../_services";
import {LeftOffPage} from "../_models/left-off-page";
import {SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  faHouseUser = faHouseUser;
  faHistory = faHistory;
  faStart = faStar;
  faFile = faFile;
  faFileWord = faFileWord;
  faPlus = faPlus;

  accountId?: string;
  documentId?: string | null;
  leftOff?: [LeftOffPage]

  constructor(
    private documentService: DocumentService,
    private accountService: AccountService,
    private storage: Storage,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.accountId = this.accountService.userValue?.accountId;
    this.documentId = this.storage.getItem("currentDocumentId");
    this.getDocumentDetail(this.documentId);
  }

  getDocumentDetail(documentId: any) {
    console.log("Document ID: "+ documentId);
    this.documentService.getDocumentDetail(documentId).subscribe(response => {
      this.leftOff = response?.leftOff;
      this.storage.setItem("memberId", <string>response?.memberInfo?.memberId);
    })
  }

  goToSpace(pageId?: string) {
    this.router.navigate(["/document/spaces", {selectedPageId: pageId}]);
  }
}
