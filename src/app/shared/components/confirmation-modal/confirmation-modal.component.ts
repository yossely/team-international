import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

interface Texts {
  title: string;
  body: string;
  cancelButton: string;
  confirmButton: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Texts,
  ) { }

  ngOnInit() {
  }

}
