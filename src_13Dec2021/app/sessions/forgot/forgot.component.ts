import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { first } from 'rxjs/operators';
import { MustMatch } from 'src/app/_helpers/PasswordValidator/must-match.validator';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  submitted = false;
  forgotsubmitted = false;
  email_phone_Error_msg: any;
  otp_Error_msg: any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
  ) { }

  //optNumber form
  otpNumberForm = this.formBuilder.group({
    otpOne: ['', [Validators.required]],
    otpTwo: ['', [Validators.required]],
    otpThree: ['', [Validators.required]],
    otpFour: ['', [Validators.required]]
  })

  //password rest form 
  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  forgotPhone = this.formBuilder.group({
    phoneEmail: ['', [Validators.required]],
  });

  ngOnInit() {
    this.forgot = true;
    this.phonenumber = true;
  }
  get f1() { return this.forgotPhone.controls; }
  get f2() { return this.otpNumberForm.controls; }
  get f3() { return this.passwordForm.controls; }

  // This part forgot password functionality implemented
  forgot: boolean = false;
  phonenumber: boolean = false
  otp: boolean = false;
  resetPwd: boolean = false;
  forgotClick() {
    this.forgot = true;
    this.phonenumber = true;
  }
  //validation for Email and Password in one txt box
  phoneEmailvalidate() {
    let value = this.f1.phoneEmail.value
    var regex = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$');
    if (value) {
      if (!regex.test(value)) {
        this.email_phone_Error_msg = 'Please enter valid email address or phone number';
      } else {
        this.forgot = true;
        this.otp = true;
        this.phonenumber = false;
        this.email_phone_Error_msg = null;
      }
    }
    else {
      this.email_phone_Error_msg = "This field is required"
    }
  }

  //verify otp Function
  sendOtpnumber() {
    if (this.otpNumberForm.invalid) {
      this.otp_Error_msg = "Otp is required"
      return;
    } else {
      let otpNumber = this.f2.otpOne.value + this.f2.otpTwo.value + this.f2.otpThree.value + this.f2.otpFour.value;
      this.otp_Error_msg = null;
      this.forgot = true;
      this.otp = false;
      this.phonenumber = false;
      this.resetPwd = true
    }
  }

  //Validation for only number
  numericOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43 ||
      charCode === 33 || charCode === 35 || charCode === 47 || charCode === 36 ||
      charCode === 37 || charCode === 38 || charCode === 40 || charCode === 41 || charCode === 42
      || charCode > 47 && (charCode < 48 || charCode > 57)) {
      return false;
    } else if (event.target.value.length >= 20) {
      return false;
    }
    return true;
  }

  //Close the all forgot pwd functionality
  resetLogin() {
    this.forgotPhone.reset();
    this.otpNumberForm.reset();
    this.passwordForm.reset();
    this.forgot = false;
    this.phonenumber = false
    this.otp = false;
    this.resetPwd = false;
    this.submitted = false;
    this.forgotsubmitted = false;
    this.router.navigateByUrl('/login');
  }

  passwordRest() {
    this.forgotsubmitted = true;
    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n');
  }

}

