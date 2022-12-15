import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../_services";
import {DocumentService} from "../../_services/document.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;

  @Input() accountId?: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout();
  }
  goToDocumentPage(){
    // this.router.navigate(["/document"], {state: {data: {accountId: this.accountId}}})
  }

}
