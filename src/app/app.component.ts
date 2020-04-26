import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { PointService } from './service/point.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'The Dots';

    newPointForm = this.formBuilder.group({
        x: ['', [Validators.required, Validators.min(-10000), Validators.max(10000)]],
        y: ['', [Validators.required, Validators.min(-10000), Validators.max(10000)]]
    });

    pageSize = 10;
    currentPage = 0;
    totalSize = 20;
    pointSource: any;
    displayedColumns: string[] = ['x', 'y'];

    constructor(private formBuilder: FormBuilder, private pointService: PointService) {
    }

    addPoint() {
        console.log(this.newPointForm.value.x);
        console.log(this.newPointForm.value.y);
    }

    handlePage(event: PageEvent) {
        this.pointService
            .getAllPoints(event.pageIndex)
            .then(points => this.pointSource = points);
    }

    deletePoint() {

    }

    upload() {

    }

    download() {

    }

    clearPoints() {

    }

    findSquares() {

    }

    createList() {

    }

    renameList() {

    }

    deleteList() {

    }
}
