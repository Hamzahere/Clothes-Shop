import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userLogin,userSignUp } from 'src/app/store/pages.action';
import { select, Store } from '@ngrx/store';
import { selectPages } from '../../store/pages.selector';
import { Router } from '@angular/router';
import { ElementRef,ViewChild,Renderer2 ,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string;
  password: string;
  signupUsername: string;
  signupEmail: string;
  signupPassword: string;
  pages$ = this.store.pipe(select(selectPages));
  userLogin: boolean = false;
  displayStyle = "none";
  displayStyleSignUp = "none"
  userSignedUp: any;
  // @ViewChild('successModal', { static: false }) successModalRef!: ElementRef;
  @ViewChild('successModal') successModal: ElementRef;
  @ViewChild('signupModal') signupModal: any;
  
  @ViewChild('signUpModalRef', { static: true }) signUpModalRef!: ElementRef;
  oneTimeRedirected: boolean = true;
  displayStyleSignUpFailure: string = 'none';
  submittedRequestForSignup: boolean = false;
  stateObersvable: any;
  constructor(private store:Store,private router: Router,private elementRef: ElementRef,private renderer: Renderer2,@Inject(DOCUMENT) private document: any) { 
    this.username = '';
    this.password = '';
    this.signupPassword = '';
    this.signupEmail = '';
    this.signupUsername = '';

    this.successModal = this.elementRef.nativeElement.querySelector('#successModal');
  }

  ngOnInit(): void {
    
   

     this.stateObersvable = this.pages$.subscribe((currentState) => {
      //let obj = {...x[0]};
      console.log(currentState);
       this.userLogin= currentState['userLoggedIn'];
       this.userSignedUp= currentState['UserSignedUp']?.userSignedUp;
       console.log("this.userSignedUp",this.userSignedUp);
       
       console.log('this.userLoginMsg',this.userLogin );
       
      if(this.userLogin == true){
        console.log("User Logged In");
        this.openPopup();
        setTimeout(()=>{

          this.router.navigate(['/']);
        },3000)
      }

      if(this.userSignedUp == true && this.oneTimeRedirected == false){
        //console.log("User Logged In");
        this.removeSignUpModal();
        this.closeSignUpPopup();
        this.openSignUpPopup();
        this.oneTimeRedirected = true;
        setTimeout(()=>{

          this.router.navigate(['/']);
        },3000)
        
      }
      if(this.userSignedUp == false && this.submittedRequestForSignup == true){
        
        this.openSignUpFailureModal();
        setTimeout(()=>{
          this.submittedRequestForSignup = false;
this.closeSignUpFailureModal();
        },2000)
      }
      
      
      //return x;
    });
  }

  
  ngAfterViewInit() {
   
  }

  removeSignUpModal() {
    // this.signUpModalRef.nativeElement.remove();
    // this.renderer.removeClass(document.body, 'modal-open');
    // this.renderer.removeClass(document.documentElement, 'modal-open');
    // this.renderer.removeClass(document.documentElement, 'modal-backdrop');

    
    // this.renderer.removeClass(document.body, 'modal-open');
    // this.renderer.removeClass(document.querySelector('.modal-backdrop'), 'show');
    // this.signUpModalRef.nativeElement.remove();

   

  //   const body = this.document.body;
  // this.renderer.addClass(body, 'modal-backdrop');

  // const signUpModal = this.elementRef.nativeElement.querySelector('#signupModal');
  // const backdrop = this.elementRef.nativeElement.querySelector('.modal-backdrop');
  // this.renderer.removeChild(this.elementRef.nativeElement, signUpModal);
  // this.renderer.removeChild(this.elementRef.nativeElement, backdrop);


  // this.signUpModalRef.nativeElement.classList.remove('show'); // remove the 'show' class from the modal element
  // this.signUpModalRef.nativeElement.style.display = 'none'; // hide the modal by setting its 'display' style to 'none'
  // document.body.classList.remove('modal-open'); // remove the 'modal-open' class from the body element
  // const modalBackdrop = document.querySelector('.modal-backdrop'); // get the modal backdrop element
  // if (modalBackdrop) {
  //   modalBackdrop.remove(); // remove the modal backdrop if it exists
  // }

  this.signUpModalRef.nativeElement.remove(); // remove the modal element
  const modalBackdropElements  = document.querySelectorAll('.modal-backdrop'); // get the modal backdrop element
 
  modalBackdropElements.forEach(modalBackdrop => modalBackdrop.remove()); // remove all modal-backdrop elements

  document.body.classList.remove('modal-open'); // remove the 'modal-open' class from the body element

}


  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  // openSignUpPopup(){
  //   this.displayStyleSignUp = "block";
  // }

  // closeSignUpPopup(){
  //   this.successModalRef.nativeElement.remove();
  // }

  // closeModal() {
  //   const modal = document.getElementById('signupModal');
  //   if (modal) {
  //     modal.classList.remove('show');
  //     modal.style.display = 'none';
  //     const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
  //     modalBackdrop.parentNode?.removeChild(modalBackdrop);
  //   }
  // }

  openSignUpPopup() {
    this.displayStyleSignUp = 'block';
  }

  closeSignUpPopup() {
    this.displayStyleSignUp = 'none';
  }

  openSignUpFailureModal(){
this.displayStyleSignUpFailure = 'block';
  }

  closeSignUpFailureModal(){
    this.displayStyleSignUpFailure = 'none';
  }

  openModal() {
    const modalElement = this.successModal.nativeElement as HTMLElement;
    modalElement.style.display = 'block';
  }

  closeModal() {
    const modalElement = this.successModal.nativeElement as HTMLElement;
    modalElement.style.display = 'none';
  }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      // TODO: implement login functionality
      console.log(`Logging in with username ${this.username} and password ${this.password}`);

      let loginObj = {
        email:this.username,
        password:this.password
      }

      console.log("loginObj",loginObj);
      
      this.store.dispatch(userLogin({ data: loginObj }));
    }
  }


  signup(signupForm: NgForm) {
   // this.signUpModalRef.nativeElement.remove();
    
    if (signupForm.valid) {
      this.submittedRequestForSignup = true;
      // TODO: implement signup functionality
      console.log(`Signing up with username ${this.signupEmail} and password ${this.signupPassword}`);

      let signUpObj = {
        email:this.signupEmail,
        password:this.signupPassword
      }
      this.store.dispatch(userSignUp({ data: signUpObj }));
      this.oneTimeRedirected = false;
    }
  }

  // openSignupModal(content) {
  //   this.modalService.open(content);
  // }

  ngOnDestroy() {
    if (this.stateObersvable) {
      this.stateObersvable.unsubscribe();
    }
    
  
}

}
