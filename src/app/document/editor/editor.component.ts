import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Validators, Editor, Toolbar, toHTML} from 'ngx-editor';

import {ActivatedRoute, Router} from "@angular/router";
import {DocumentService} from "../../_services/document.service";
import {Storage} from "../../_services";
import {GetPageDetail} from "../../_models/get-page-detail";
import {UpdatePageRequest} from "../../_models/update-page-request";
import {first} from "rxjs/operators";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {GetTitleNameModalComponent} from "./get-title-name-modal/get-title-name-modal.component";
import {CreatePageInDocument} from "../../_models/create-page-in-document";

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.css'],
  providers: [MdbModalService],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit, OnDestroy {

  modalRef: MdbModalRef<GetTitleNameModalComponent> | null = null;
  htmlContent?: string;
  editor?: Editor;
  pageDetail?: GetPageDetail;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  allowEdit: boolean;
  isSelected: boolean;
  editable: boolean;
  documentId?: string;
  selectedPageId?: string;
  parentPageId?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    private storage: Storage,
    private modalService: MdbModalService
  ) {
    this.allowEdit = false;
    this.isSelected = false;
    this.editable = true;
  }

  form = new FormGroup({
    editorContent: new FormControl(
      {value: this.htmlContent, disabled: false},
      Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent') as AbstractControl;
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.documentId = <string>this.storage.getItem("currentDocumentId");
    this.selectedPageId = <string>this.activatedRoute.snapshot.paramMap.get("selectedPageId");
    this.parentPageId = <string>this.activatedRoute.snapshot.paramMap.get("parentPageId");
    if (this.selectedPageId) {
      this.getPageContent(this.selectedPageId);
    }
  }


  getPageContent(pageId: string) {
    return this.documentService.getPageDetail(pageId).subscribe(response => {
      this.pageDetail = response;
      this.updateHtmlContent();
    });
  }

  updateHtmlContent() {
    this.form.setValue({
        editorContent: this.pageDetail?.content
      }
    )
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  closeEditor() {
    this.router.navigate(["/document/spaces"]);
  }

  publishDoc() {
    console.log(this.doc.value)
    if (this.pageDetail && this.selectedPageId) {
      const content = this.doc.value ? this.doc.value : "";
      let title = document.getElementById("title")?.innerHTML;
      if (title) {
        const data: UpdatePageRequest = {
          memberId: <string>this.storage.getItem("currentMemberId"),
          title: title,
          content: content
        };
        this.documentService.updatePage(<string>this.pageDetail?.pageId, data)
          .pipe(first())
          .subscribe({
            next: () => {
              this.router.navigate(["/document/spaces"]);
            }
          });
      } else {
        this.openGetTitleNameModal();
        this.modalRef?.onClose.subscribe(result => {
          if (result !== "CANCEL" && result != "CLOSE") {
            const data: UpdatePageRequest = {
              memberId: <string>this.storage.getItem("currentMemberId"),
              title: result,
              content: content
            };
            this.documentService.updatePage(<string>this.selectedPageId, data)
              .pipe(first())
              .subscribe({
                next: () => {
                  this.router.navigate(["/document/spaces"]);
                }
              });
          } else {
            title = undefined;
          }
        })
      }
    } else {
      const content = this.doc.value ? toHTML(this.doc.value).toString() : "";
      let title = document.getElementById("newTitle")?.innerHTML;
      if (title === "Enter page title here") {
        this.openGetTitleNameModal();
        this.modalRef?.onClose.subscribe(result => {
          console.log("TITLE IN EDITOR: " + this.doc.value);
          if (result !== "CANCEL" && result != "CLOSE") {
            const data: CreatePageInDocument = {
              memberId: <string>this.storage.getItem("currentMemberId"),
              title: result,
              content: content
            };
            if (this.parentPageId) {
              console.log("parentPageId: call")
              this.documentService.createPageInPage(this.parentPageId, data)
                .pipe(first())
                .subscribe({
                  next: () => {
                    this.router.navigate(["/document/spaces"]);
                  }
                });
            } else {
              this.documentService.createPageInDocument(<string>this.documentId, data)
                .pipe(first())
                .subscribe({
                  next: () => {
                    this.router.navigate(["/document/spaces"]);
                  }
                });
            }
          } else {
            title = undefined;
          }
        })
      } else {
        console.log("1")
        const data: CreatePageInDocument = {
          memberId: <string>this.storage.getItem("currentMemberId"),
          title: <string>title,
          content: content
        };
        console.log("data: " + JSON.stringify(data));
        if (this.parentPageId) {
          console.log("parentPageId: call")
          this.documentService.createPageInPage(this.parentPageId, data)
            .pipe(first())
            .subscribe({
              next: () => {
                this.router.navigate(["/document/spaces"]);
              }
            });
        } else {
          this.documentService.createPageInDocument(<string>this.documentId, data)
            .pipe(first())
            .subscribe({
              next: () => {
                this.router.navigate(["/document/spaces"]);
              }
            });
        }
      }

    }
  }

  openGetTitleNameModal() {
    this.modalRef = this.modalService.open(GetTitleNameModalComponent);
  }

  onClick($event: any) {
    this.isSelected = true;
  }

  onDblClick($event: any) {
    this.isSelected = true;
    if (this.editable) {
      this.allowEdit = true;
    }
  }

  onBlur($event: any) {
    this.isSelected = false;
    if (this.editable) {
      this.allowEdit = false;
    }
  }

}
