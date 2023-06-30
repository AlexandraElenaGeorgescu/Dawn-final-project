import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePageComponent } from './components/table-page/table-page.component';
import { PhoneComponent } from './components/phone/phone.component'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { AppRoutingModule } from '../app-routing.module';
import { TableRoutingModule } from './table-routing.module';
import { IconDefinition } from '@ant-design/icons-angular';
import {AccountBookFill, AlertOutline, AlertFill} from '@ant-design/icons-angular/icons';
import { NameUppercasePipe } from '../pipes/name-uppercase.pipe';

const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  declarations: [
    TablePageComponent,
    PhoneComponent,
    NameUppercasePipe
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule.forRoot(icons),
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableModule { }
