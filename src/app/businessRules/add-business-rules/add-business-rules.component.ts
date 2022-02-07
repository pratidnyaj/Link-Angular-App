import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  
import { form } from 'src/app/case/case-interaction-list/case-interaction-list.component';
@Component({
  selector: 'app-add-business-rules',
  templateUrl: './add-business-rules.component.html',
  styleUrls: ['./add-business-rules.component.scss']
})
export class AddBusinessRulesComponent  implements OnInit {
  name = 'Angular';
  
  productForm: FormGroup;
   
  constructor(private fb:FormBuilder) {
    this.productForm = this.fb.group({
      name: '',
      description:'',
      quantities: this.fb.array([]) ,
    });
  }
  ngOnInit(): void {
    this.addQuantity();
  }
  
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }
   
  onSubmit() {
    console.log(this.productForm.value);
  }
}
