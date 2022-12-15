import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-header',
  templateUrl: './document-header.component.html',
  styleUrls: ['./document-header.component.css']
})
export class DocumentHeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
