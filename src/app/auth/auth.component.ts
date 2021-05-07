import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SignUpResponseData, LoginResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    let authObs:
      |Observable<LoginResponseData | HttpErrorResponse>
      |Observable<SignUpResponseData | HttpErrorResponse>;

    this.isLoading = true;
    if (this.isLoginMode){
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe((response: LoginResponseData | SignUpResponseData) => {
        this.isLoading = false;
        console.log(response);
        this.router.navigate(['/recipes']);
      },
      (errorMessage: string) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });
    authForm.reset();
  }

  onHandleError(): void {
    this.error = null;
  }


  private showErrorAlert(message: string): void {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
