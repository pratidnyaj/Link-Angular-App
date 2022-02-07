import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Routes } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { time } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';
@Component({
  selector: 'app-product-info-view',
  templateUrl: './product-info-view.component.html',
  styleUrls: ['./product-info-view.component.scss']
})
export class ProductInfoViewComponent implements OnInit {
  p: number = 1;
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 10;
  absoluteIndex: number = 0;
  userMasterData: any[] = [];
  isCitiesControlVisible = true;
  ///
  
  @ViewChild('select') select: any = MatSelect;
  accountId: any;
  productList: any;
  productMstrdropdown : any ;
  productsForm!: FormGroup;
  accountProductID : any ;
  disableSelect: boolean = false;  
  oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
  constructor(private activatedRoute: ActivatedRoute,private ClientService: ClientService,
    private modalService : NgbModal, private formBuilder: FormBuilder,private toastr: ToastrService) {
    this.accountId = this.activatedRoute.snapshot.params.id;
    console.log(this.accountId)
   }

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      productsId: [null],
      contractStartDate: [null],
      contractEndDate: [null],
      IsActive: [false],
    })
    this.getproductList();
    this.productdropDown();
  }
  getproductList(){
    let ReqparameterAccount =
    {
      "AccountId": this.accountId
    }
    this.ClientService.postData('GetAcctProdDetails', ReqparameterAccount)
      .subscribe((res) => {
        this.productList = res.data;
        console.log(this.productList)
      });
  }



  productdropDown(){
    let ReqparameterAccount =
    {
      "Flag": "GetProduct"
    }
    this.ClientService.postData('getProductMstrDetails', ReqparameterAccount)
      .subscribe((res) => {
        console.log('000000000000000000000000000000===>',res.data)
        this.productMstrdropdown = res.data;
      });
  }



  openVertically(producttModal){
    this.modalService.open(producttModal, { centered: true, scrollable: true, size: 'sm' });
  }



  save(){
    console.log(this.productsForm);

    // frmData.append('AccountId', (this.UpdateAcountID === undefined ? '' : this.UpdateAcountID));
     
let Reqparameter = {
  AccountId :this.accountId,  
ProductID :this.productsForm.value.productsId.toString(),  
CreatedBy :JSON.parse(this.oLoggedInUser).UserID,  
ContractStartDate :this.convert(this.productsForm.value.contractStartDate)+' 12:33:48.000',  
ContractEndDate :this.convert(this.productsForm.value.contractEndDate)+' 12:33:48.000',
IsActive :  (this.productsForm.value.IsActive === true ? '1' : '0')
}
// console.log(req)
//2022-01-06 12:33:48.000
    
this.ClientService.postData('createAcctProduct', Reqparameter)
.subscribe((result) => {
  console.log('000000000000000000000000000000===>',result.data[0].Message)

    this.toastr.success(result.data.Message);
    this.modalService.dismissAll()

  this.closefrom();
  // this.productMstrdropdown = res.data;
});


  }




  editSaveProduct(){
    console.log(this.productsForm);


    

let Reqparameter = {
  AccountId :this.accountId,  
ProductId :this.productsForm.value.productsId.toString(),  
ContractStartDate :this.convert(this.productsForm.value.contractStartDate)+' 12:33:48.000',  
ContractEndDate :this.convert(this.productsForm.value.contractEndDate)+' 12:33:48.000',
UpdatedBy :JSON.parse(this.oLoggedInUser).UserID, 
IsDeleted : '',
IsActive :  (this.productsForm.value.IsActive === true ? '1' : '0'),
}
    
this.ClientService.postData('updateAcctProduct', Reqparameter)
.subscribe((res) => {
  console.log('000000000000000000000000000000===>',res.data)

});
  }

  openVerticallyEdit(producttModal, data: any) {
    console.log('---------------->',data)
    this.editProduct(data)
    this.modalService.open(producttModal, { centered: true, scrollable: true, size: 'sm' });
  }

  editProduct(data){
   this.disableSelect = true;  
   this.accountProductID = data.AccountProductMappingID
   this.productsForm.patchValue({
    // productsId: data.ProductID.toString(),
    contractStartDate: data.ContractEndDate,
    contractEndDate: data.ContractStartDate ,
    IsActive: data.IsActive 
   })
//Select All  checkbox
   let productsoption : any = []
        productsoption.push(data.ProductID.toString())
         this.productsForm.patchValue({
          productsId:productsoption
         })
   
console.log(productsoption);


  }

  deleteProduct(data){
let req = {
  AccountId :this.accountId,  
  ProductID :data.ProductID
}
this.ClientService.postData('DeleteAcctProduct', req)
.subscribe((res) => {
  console.log('000000000000000000000000000000===>',res.data)

});
  }
  option : any =  [];
  selectAlla(){
    this.productMstrdropdown.map(item => {
      this.option.push(item.ProductID.toString());
    })
        this.productsForm.patchValue({
          productsId: this.option
        })
  }

  unSelectAlla(){
    this.option  =  [];
    this.productsForm.patchValue({
      productsId: null
    })
  }

//Date Convertion
convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}




closefrom() {
  this.getproductList();
  this.productsForm.reset();
  this.modalService.dismissAll();
  this.disableSelect = false; 
}

}
