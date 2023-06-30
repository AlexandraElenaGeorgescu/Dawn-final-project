import { Component, Input } from '@angular/core';
import { Phone } from 'src/models/phone';

@Component({
  selector: 'app-entry-details-modal',
  templateUrl: './entry-details-modal.component.html',
  styleUrls: ['./entry-details-modal.component.scss']
})
export class EntryDetailsModalComponent {
  @Input() phone!: Phone;

}
