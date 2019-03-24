import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from "rxjs";

import { AuthenticationService } from './../../core/services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    /**
     * We keep a reference of the auth service for unsubscribing it after component destruction
     */
    private authSubscription: Subscription;

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

    /**
     * Prevent memory leak
     */
    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
        });
    }


    onSubmit() {
        this.submitted = true;

        if (this.loginForm.valid) {
            this.loading = true;
            this.authSubscription = this.authenticationService.login(this.authForm.username.value,
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