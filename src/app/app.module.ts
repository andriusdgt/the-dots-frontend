import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FileDownloaderModule } from './file-downloader/file-downloader.module';
import { RenamePointListDialog } from './rename-point-list-dialog.component';
import { BackendHttpService } from './service/backend-http.service';
import { PointListService } from './service/point-list.service';
import { PointService } from './service/point.service';
import { SnackBar } from './snack-bar/snack-bar.service';

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
        MatSortModule,
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
