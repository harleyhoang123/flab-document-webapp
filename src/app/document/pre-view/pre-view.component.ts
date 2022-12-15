import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faEllipsisH, faPenNib, faLockOpen, faLock} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {GetPageDetail} from "../../_models/get-page-detail";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Storage} from "../../_services";
import {DocumentService} from "../../_services/document.service";

@Component({
  selector: 'app-pre-view',
  templateUrl: './pre-view.component.html',
  styleUrls: ['./pre-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PreViewComponent implements OnInit {

  trustedHtml?: SafeHtml;

  @Input() htmlContent?: string;
 constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private storage: Storage,
    private documentService: DocumentService
  ) {
 }

  ngOnInit(): void {
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(<string>this.htmlContent);
 }

}
