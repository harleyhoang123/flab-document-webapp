import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService, AlertService} from '../_services';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  form2!: FormGroup;
  loading = false;
  submitted = false;
  loginErrorMessage?= null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.form2 = this.formBuilder.group({});
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.setErrorMessage(error);
          this.loading = false;
        }
      });
  }

  setErrorMessage(error: any){
    this.loginErrorMessage = error;
    setTimeout(()=> {
      this.loginErrorMessage = null;
    }, 3000);
  }

  goToRegister(){
    try {
      this.router.navigate(['/account/register'], {relativeTo: this.route});
    }catch ({error}){
    }

  }
}
