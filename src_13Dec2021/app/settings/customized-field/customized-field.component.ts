import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-customized-field',
    templateUrl: './customized-field.component.html',
    styleUrls: ['./customized-field.component.scss']
})
export class CustomizedFieldComponent implements OnInit {

    selectedTeam: any = [];
    addCustomizedFields: FormGroup = new FormGroup({
        lableName: new FormControl(null, [Validators.required]),
        dataType: new FormControl(null, [Validators.required]),
        options: new FormControl(null, [Validators.required]),
        visibleToAgent : new FormControl(false, [Validators.requiredTrue]),
        visibleToContact : new FormControl(false, [Validators.requiredTrue])
    });
    constructor(private modalService: NgbModal) { }
    dataTypeObj = [
        { name: 'Textbox' },
        { name: 'List' }
    ];
    selectedCity: any;
    ngOnInit(): void {
    }
    SetChoice = false;
    EditChoices = false;
    setchoice(event: any) {
        if (event === 'List') {
            console.log('SetChoiceSetChoiceSetChoice');

            this.SetChoice = true;
        } else {
            this.SetChoice = false;
        }
    }
    TheChosenchoice: Array<string> = [];
    AddChoice = false;
    addChoice(val: any, type: any) {
        if (type === 0) {
            if (val.length !== 0) {
                this.AddChoice = true;
                if (this.TheChosenchoice.length === 0) {
                    this.TheChosenchoice.push(val);
                } else {
                    if (this.TheChosenchoice.includes(val) === true) {
                        alert(val + ' already exists');
                    } else {
                        this.TheChosenchoice.push(val);
                    }
                }
            } else {
                this.AddChoice = false;
            }
        }
    }
    removeMe(formal: any, actual: any, type: any) {
        if (type === 0) {
            if (this.TheChosenchoice.includes(actual)) {
                this.TheChosenchoice.splice(this.TheChosenchoice.indexOf(actual), 1);
            }
        }
    }
    saveCustomizedfield(){
        if (this.addCustomizedFields.controls.dataType.value === 'List') {
            this.addCustomizedFields.patchValue({options: this.TheChosenchoice });
        }
        console.log(this.addCustomizedFields.value)


        // localStorage.setItem("customizedFields", JSON.stringify( this.addCustomizedFields.value));

// console.log(localStorage.getItem('customizedFields'))

if(localStorage.getItem('customizedFields') != null){
    console.log(localStorage.getItem("customizedFields"))
    let y : any= localStorage.getItem("customizedFields");
   let addCustomizedFieldss =  JSON.stringify(this.addCustomizedFields.value);
    
   
let arr = JSON.parse(y);
let temp = [];
for(let i=0;i<arr.length;i++){
    console.log(arr[i])
    temp.push(arr[i]);
}
temp.push(this.addCustomizedFields.value)
console.log(temp)
    localStorage.setItem("customizedFields", JSON.stringify(temp));
}else{
    
    localStorage.setItem("customizedFields", JSON.stringify([this.addCustomizedFields.value]));
}

this.addCustomizedFields.reset()


    }

}
