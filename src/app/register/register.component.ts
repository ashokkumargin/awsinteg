import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';
import {Auth} from 'aws-amplify';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            password: ['', [Validators.required, Validators.minLength(6)]],
			mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
		//alert(this.registerForm.value.firstName)
        /*this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }); */
		try {
		  Auth.signUp({
			username: this.registerForm.value.username,
			password: this.registerForm.value.password,
			attributes: {
			  email: this.registerForm.value.username,
			  given_name: this.registerForm.value.firstName,
			  middle_name: this.registerForm.value.lastName,
			  phone_number: '+91' + this.registerForm.value.mobile
			}
		  }).then(() => {
			  this.alertService.success('Registration successful', true);
			  this.router.navigate(['login']);
		  }).catch(error => {
			  this.alertService.error(error.message);
			  this.loading = false;
		  });
		} catch (error) {
		  this.alertService.error(error);
          this.loading = false;
		}
    }
}
