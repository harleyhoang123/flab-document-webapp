import { Component, OnInit } from '@angular/core';
import {MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-get-title-name-modal',
  templateUrl: './get-title-name-modal.component.html',
  styleUrls: ['./get-title-name-modal.component.css'],
  providers: [MdbModalService]
})
export class GetTitleNameModalComponent implements OnInit {

  errorMessage?: string;
  form!: FormGroup;
  constructor(public modalRef: MdbModalRef<GetTitleNameModalComponent>,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  close(){
    this.modalRef.close("CLOSE");
  }

  cancel(){
    this.modalRef.close("CANCEL");
  }

  save(){
    const titleInModal = this.form.value.title;
    if(titleInModal){
      console.log("Title not empty")
      this.modalRef.close(titleInModal);
    }else{
      console.log("Title empty")
      this.errorMessage = "Title can be empty!"
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 2000);
    }
  }

}
