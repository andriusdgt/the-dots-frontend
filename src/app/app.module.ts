import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule, MatSnackBarModule,
    MatTableModule
} from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { FileDownloaderModule } from './file-downloader/file-downloader.module'
import { RenamePointListDialog } from './rename-point-list-dialog.component'
import { BackendHttpService } from './service/backend-http.service'
import { PointListService } from './service/point-list.service'
import { PointService } from './service/point.service'
import { SnackBar } from './snack-bar/snack-bar.service'

@NgModule({
    declarations: [
        AppComponent,
        RenamePointListDialog
    ],
    entryComponents: [
        RenamePointListDialog
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        FileDownloaderModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSnackBarModule,
        MatTableModule,
        ReactiveFormsModule
    ],
    providers: [
        BackendHttpService,
        PointService,
        PointListService,
        SnackBar
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
