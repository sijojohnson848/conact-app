import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from 'src/models/myContact';
import { MyGroup } from 'src/models/myGroup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  contactId: string = ''
  contact: MyContact = {} as MyContact
  groups:MyGroup[] = [] as MyGroup []


  constructor(private activeRoute: ActivatedRoute, private api: ApiService,private router:Router) { }

  ngOnInit(): void {
    // get contact id from url parameter using ActivatedRoute class
    this.activeRoute.params.subscribe((data) => {
      console.log(data['contactId']);
      this.contactId = data['contactId']
    })

    // call api for getting particular details
    this.api.viewContact(this.contactId).subscribe
      (
        (data: any) => {
          this.contact = data
          console.log(this.contact);
        }
      )
      // call api for getting all groups from services class
      this.api.getAllGroups().subscribe(
        (data:any)=>{
          this.groups = data
        }
      )
  }

  // updataContact
  updataContact(){
    // api call for updating existing contacts, ags: contact ,contact id
    this.api.updateContact(this.contactId,this.contact).subscribe(
      (data:any)=>{
        this.router.navigateByUrl('')
      })
  }
}
