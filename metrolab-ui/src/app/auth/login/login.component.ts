import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './../../core/services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.buildForm();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }


    onSubmit() {
        this.submitted = true;

        if (this.loginForm.valid) {
            this.loading = true;
            this.authenticationService.login(this.authForm.username.value,
                this.authForm.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    });
        }
    }

    get authForm() {
        return this.loginForm.controls;
    }

}