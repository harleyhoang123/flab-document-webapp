import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpaceNav} from "../../../_models";
import {faCaretRight, faCaretDown, faFileWord, faPlus} from "@fortawesome/free-solid-svg-icons";
import {GetPageOfDocument} from "../../../_models/get-page-of-document";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-space-navigation',
  templateUrl: './space-navigation.component.html',
  styleUrls: ['./space-navigation.component.css']
})
export class SpaceNavigationComponent implements OnInit {

  @Input() spaceNav?: GetPageOfDocument;
  showSubPage = false;
  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  faFileWord = faFileWord;
  faPlus = faPlus;


  @Output() pageId = new EventEmitter<string>();
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  changePageId(pageId: string){
    console.log("Change paged id in navigation: "+ pageId)
    this.pageId.emit(pageId);
  }

  createPageInPage(pageId: string){
    this.route.navigate(["editor", {parentPageId: pageId}], {relativeTo: this.activatedRoute});
  }
}
