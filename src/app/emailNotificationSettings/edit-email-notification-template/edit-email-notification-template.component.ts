import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
import { ClientService } from 'src/app/service/client.service';
declare const $: any;
Quill.register('modules/imageResize', ImageResize);
// import { Editor } from 'ngx-editor';
// import 'quill-mention';
// import 'quill-emoji';
// import hljs from 'highlight.js'

// import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
// import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
@Component({
  selector: 'app-edit-email-notification-template',
  templateUrl: './edit-email-notification-template.component.html',
  styleUrls: ['./edit-email-notification-template.component.scss']
})
export class EditEmailNotificationTemplateComponent implements OnInit {
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
emailNotificationForm!: FormGroup;

  constructor(private clientService:ClientService,private formBuilder: FormBuilder) {
    this.modules = {
      table: true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
  
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
  
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
  
        ['clean'],                                         // remove formatting button
  
        ['link', 'image', 'video'],                         // link and image, video
     
  
      ],
      // imageDrop: true,
      imageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white'
        },
        modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
      }
    }
   
  }

  ngOnInit(): void {
    this.emailNotificationForm = this.formBuilder.group({
      htmlList: [null],
      subject: [null],
      description: [null],
     
    })
    this.getvaribleField();
  }

modules = {}
content = ''


addBindingCreated(quill) {
  console.log(quill);
  
  quill.keyboard.addBinding({
    key: 'b'
  }, (range, context) => {
    // tslint:disable-next-line:no-console
    console.log('KEYBINDING B', range, context)
  })

  quill.keyboard.addBinding({
    key: 'B',
    shiftKey: true
  }, (range, context) => {
    // tslint:disable-next-line:no-console
    console.log('KEYBINDING SHIFT + B', range, context)
  })
}
temp : any = []
selectHtmlValue(val){
  console.log('sss',this.emailNotificationForm.value)
  //var test=this.emailNotificationForm.value.htmlList;
// console.log('hhhhhhhhhhhh================',test.replace('"',''))







// let Array1 : any =[
//   "fish.jpg",
//   "animal.jpg",
//   "tree.jpg"]


// let removedData= Array1.replaceAll('"[""]""');


// console.log('hhhhhhhhhhhh',removedData)

// this.emailNotificationForm.value.htmlList.map(item => {

//   let option = e['option'] || [];
//   option.push(i.ListValue);
//   e['option'] = option;

// })
// console.log(this.temp)


// let abc = this.emailNotificationForm.value.htmlList;
// for(var i=0;i<abc.length;i++){
//   temp.push(abc)
// }
this.emailNotificationForm.patchValue({
  subject : JSON.stringify((Object.values({...this.emailNotificationForm.value.htmlList}))).replace(/[\[\]"\",\,']+/g,'')

})
}
getvaribleList : any ;
getvaribleField(){
  let req = {
    Type: "Email_NotiFication_Field"
  }
  this.clientService.postData('getFields',req).subscribe(result=>{
console.log('getvaribleList',result)
this.getvaribleList = result.data;

  })
}
saveEmailNotification(){
  console.log('sss===========================>',this.emailNotificationForm.value);
  
}

}
