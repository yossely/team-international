import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
  entryComponents: [ConfirmationModalComponent],
})
export class SharedModule { }
