import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable()
export class SnackBar {

    constructor(private snackbar: MatSnackBar) {}

    displayInfo(message: string) {
        const config = SnackBar.createConfig()
        config.panelClass = ['info-snack-bar']
        this.snackbar.open(message, 'Close', config)
    }

    private static createConfig() {
        const config = new MatSnackBarConfig()
        config.verticalPosition = 'top'
        config.duration = 15000
        return config
    }
}
