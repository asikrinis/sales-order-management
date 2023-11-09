import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): boolean {
    // Close the dialog and confirm the action
    try {
      if (this.dialogRef) {
        this.dialogRef.close(true);
      }
    } catch (error) {
      console.error('Error occurred while closing the dialog:', error);
    }
    return true;
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
