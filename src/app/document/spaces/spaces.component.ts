import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faAlignLeft, faEllipsisH, faEllipsisV, faLock, faLockOpen, faPenNib, faPlus, faWrench} from "@fortawesome/free-solid-svg-icons";
import {DocumentService} from "../../_services/document.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetPageOfDocument} from "../../_models/get-page-of-document";
import {GetPageDetail} from "../../_models/get-page-detail";
import {Storage} from "../../_services";
import { asBlob } from 'html-docx-js-typescript';
// @ts-ignore
import { saveAs } from 'file-saver';
import { jsPDF, RGBAData} from 'jspdf';
// @ts-ignore
import domtoimage from 'dom-to-image';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  faAlignLeft = faAlignLeft;
  faWrench = faWrench;
  faPlus = faPlus;
  faEllipsisH = faEllipsisH;
  faPenNib = faPenNib;
  faLockOpen = faLockOpen;
  faLock = faLock;
  locked = false;
  spaceNav?: GetPageOfDocument;
  documentId?: string | null;
  trustedHTML?: SafeHtml;
  pageDetail?: GetPageDetail
  selectedPageId?: string;

  WELCOME_CONTENT = "<div style=\"background-color:rgb(227, 252, 239);\"><h3 style=\"text-align:start\"><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Welcome to your new space</span></span></strong></h3><p style=\"text-align:start\"><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Use it to create something wonderful.</span></span></p><p style=\"text-align:start\"><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">To start, you might want to:</span></span></strong></p><ul><li><p><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Customise this overview</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;using the&nbsp;</span></span><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">edit icon</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;at the top right of this page.</span></span></p></li><li><p><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Create a new page</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;by clicking the&nbsp;</span></span><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">+</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;in the space sidebar, then go ahead and fill it with plans, ideas, or anything else your heart desires.</span></span></p></li></ul></div>";

  WELCOME_CONTENT2 = "<h3 style=\"text-align:start\"><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Welcome to my space</span></span></strong></h3><p style=\"text-align:start\"><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Use it to create something wonderful.</span></span></p><p style=\"text-align:start\"><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">To start, you might want to:</span></span></strong></p><ul><li><p><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Customise this overview</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;using the&nbsp;</span></span><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">edit icon</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;at the top right of this page.</span></span></p></li><li><p><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">Create a new page</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;by clicking the&nbsp;</span></span><strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">+</span></span></strong><span style=\"color:rgb(23, 43, 77);\"><span style=\"background-color:rgb(227, 252, 239);\">&nbsp;in the space sidebar, then go ahead and fill it with plans, ideas, or anything else your heart desires.</span></span></p></li></ul>";


  constructor(
    private documentService: DocumentService,
    private storage: Storage,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
  }

  selectPage(pageId: string) {
    this.selectedPageId = pageId;
    this.getPageContent(pageId);
  }

  ngOnInit(): void {
    this.documentId = this.storage.getItem("currentDocumentId");
    this.getPageOfDocument(this.documentId);
    this.selectedPageId = <string>this.activatedRoute.snapshot.paramMap.get("selectedPageId");
    if (this.selectedPageId) {
      console.log("Call selected page id: " + this.selectedPageId)
      this.getPageContent(this.selectedPageId);
    } else {
      this.getOverviewPage();
    }
  }


  getOverviewPage() {
    this.documentService.getPageOverview(<string>this.documentId).subscribe(response => {
      this.pageDetail = response;
      this.selectedPageId = response?.pageId;
      this.trustedHTML = this.sanitizer.bypassSecurityTrustHtml(<string>response?.content)
    })
  }

  getPageOfDocument(documentId: any) {
    if (documentId != null) {
      this.documentService.getPageOfDocument(documentId).subscribe(response => {
        this.spaceNav = response;
      })
    } else {
      console.log("Document Id is null");
    }
  }

  getPageContent(pageId: string) {
    console.log("Get page content: " + pageId)
    if (pageId) {
      this.documentService.getPageDetail(pageId).subscribe(
        response => {
          this.pageDetail = response;
          this.trustedHTML = this.sanitizer.bypassSecurityTrustHtml(<string>response?.content);
        }
      )
    } else {
      this.pageDetail = new GetPageDetail();
      this.pageDetail.content = this.WELCOME_CONTENT;
    }
  }

  lockPage() {
    this.locked = !this.locked;
  }

  openEditorPage() {
    this.route.navigate(["editor", {selectedPageId: this.selectedPageId}], {relativeTo: this.activatedRoute});
  }

  goToSpaceSetting() {
    if (this.pageDetail != undefined) {
      this.trustedHTML = this.sanitizer.bypassSecurityTrustHtml(this.WELCOME_CONTENT2);
    } else {
      console.log("Page detail");
    }
  }

  createPageInWorkspace() {
    this.route.navigate(["editor"], {relativeTo: this.activatedRoute})
  }

  async exportToPDF() {
    let html = document.getElementById("pageContent");
    if (html) {
      const htmlHeight = html.clientHeight;
      const htmlWidth = html.clientWidth;
      const options = {background: 'white', width: htmlWidth, height: htmlHeight};

      domtoimage.toPng(html, options).then((imgData: string | Uint8Array | HTMLImageElement | HTMLCanvasElement | RGBAData) => {
        const doc = new jsPDF(htmlWidth > htmlHeight ? 'l' : 'p', 'mm', [htmlWidth, htmlHeight]);
        // @ts-ignore
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save(this.pageDetail?.title+ '.pdf');
      });
    }
  }

  async exportToWord(){
    const converted = await asBlob(<string>this.pageDetail?.content, {
      orientation: 'landscape',
      margins: {top: 720},
    });
    saveAs(converted, this.pageDetail?.title+".docx");
  }

  deletePage(){
    console.log("Delete page")
  }

  openHistory(){
    console.log("Open history")
  };
}
