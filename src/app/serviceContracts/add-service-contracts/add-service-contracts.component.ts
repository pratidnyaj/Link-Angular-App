import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-service-contracts',
  templateUrl: './add-service-contracts.component.html',
  styleUrls: ['./add-service-contracts.component.scss']
})
export class AddServiceContractsComponent implements OnInit {

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
