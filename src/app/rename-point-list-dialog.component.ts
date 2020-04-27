import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
    selector: 'rename-point-list-dialog',
    templateUrl: 'rename-point-list-dialog.html'
})
export class RenamePointListDialog {

    constructor(
        public dialogRef: MatDialogRef<RenamePointListDialog>,
        @Inject(MAT_DIALOG_DATA) public pointListName: string) {}

    onNoClick(): void {
        this.dialogRef.close()
    }

}
