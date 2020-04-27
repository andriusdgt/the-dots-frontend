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
    MatRippleModule,
    MatTableModule
} from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { RenamePointListDialog } from './rename-point-list-dialog.component'
import { BackendHttpService } from './service/backend-http.service'
import { PointListService } from './service/point-list.service'
import { PointService } from './service/point.service'

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
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatTableModule,
        ReactiveFormsModule
    ],
    providers: [
        BackendHttpService,
        PointService,
        PointListService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
