import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Phone } from 'src/models/phone';
import { PhoneService } from 'src/app/services/phone.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PhoneComponent } from '../phone/phone.component';
import { EntryDetailsModalComponent } from '../entry-details-modal/entry-details-modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {
  
  phones$!: Observable<Phone[]>;
  searchQuery: string = '';


  constructor(private phoneService: PhoneService, private modal: NzModalService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadPhones();
    this.getPhones();
  }

  loadPhones(): void {
    this.phones$ = this.phoneService.getPhones();
  }

  public addPhone(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Add Phone',
      nzContent: PhoneComponent,
      nzComponentParams: {},
      nzOnOk: () => {
        const phoneComponent = modalRef.getContentComponent() as PhoneComponent;
        phoneComponent.submitForm();
        const newPhone = phoneComponent.newPhone;
        if (newPhone) {
          this.phoneService.addPhone(newPhone);
          this.loadPhones();
          console.log(this.phones$)
        }
      }
    })
  
    modalRef.afterClose.subscribe((result: Phone) => {
      if (result) {
        this.phoneService.addPhone(result);
        this.loadPhones();
        console.log(this.phones$)
      }
    });
  }
  
  public editPhone(phone: Phone): void {
    
    const modalRef = this.modal.create({
      nzTitle: 'Edit Phone',
      nzContent: PhoneComponent,
      nzComponentParams: {
        phone: { ...phone },
      },
      nzOnOk: () => {
        const phoneComponent = modalRef.getContentComponent() as PhoneComponent;
        phoneComponent.submitForm();
        const newPhone = phoneComponent.newPhone;
        if (newPhone) {
          this.phoneService.updatePhone(newPhone);
          this.loadPhones();
        }
      }
      
    });    
  
    modalRef.afterClose.subscribe((result: Phone) => {
      if (result) {
        this.phoneService.updatePhone(result);
        this.loadPhones();
        console.log(this.phones$)
      }
    });
    
  }
  currentPage: number = 1;
  pageSize: number = 8;
  @Output() phones! : Phone[];

  getPhones(): void {
    this.phoneService.getPhones().subscribe((phones) => {
      this.phones = phones;
    });
  }

  getPaginatedPhones(): Phone[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.phones.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getFilteredPhones(): Phone[] {
    if (!this.searchQuery) {
      return this.getPaginatedPhones();
    }
    
    const filteredPhones = this.getPaginatedPhones().filter(phone => {
      // Modify the condition based on your specific search requirements
      return phone.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
             phone.model.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
             phone.storage.toString().includes(this.searchQuery.toLowerCase()) ||
             phone.price.toString().includes(this.searchQuery.toLowerCase());
    });
  
    return filteredPhones;

  }

  deletePhone(phoneId: number): void {
    this.phoneService.deletePhone(phoneId);
    // Reload the phones after deletion
    this.loadPhones();
  }  

  sortPhones(column: string): void {
      // Implement the sorting logic based on the selected column
      switch (column) {
        case 'id':
          this.phones.sort((a, b) => a.id - b.id);
          break;
        case 'brand':
          this.phones.sort((a, b) => a.brand.localeCompare(b.brand));
          break;
        case 'model':
          this.phones.sort((a, b) => a.model.localeCompare(b.model));
          break;
        case 'storage':
          this.phones.sort((a, b) => a.storage - b.storage);
          break;
        case 'price':
          this.phones.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }
    }

  openDetailsModal(phone: Phone): void {
    const modalRef = this.modal.create({
      nzTitle: 'Phone Details',
      nzContent: EntryDetailsModalComponent,
      nzComponentParams: {
        phone: phone
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
  
}
