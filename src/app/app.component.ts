import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Point } from './point';
import { PointListService } from './service/point-list.service';
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

    pageIndex = 0;
    pageSize = 5;
    totalSize = 5;
    pointSource: any;
    pointListId: string;

    displayedColumns: string[] = ['x', 'y'];

    constructor(private formBuilder: FormBuilder, private pointService: PointService, private pointListService: PointListService) {
        this.pointListService.getPointLists().then(
            pointListIds => {
                if (pointListIds.length > 0) {
                    this.pointListId = pointListIds[0].id;
                    this.updatePointList();
                }
            }
        );
    }

    addPoint() {
        this.pointService.addPoint(new Point(this.newPointForm.value.x, this.newPointForm.value.y, 1000));
        this.updatePointList();
    }

    handlePage(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.pointService
            .getAllPoints(this.pointListId, event.pageIndex, event.pageSize)
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

    private updatePointList() {
        this.pointService.getPointCount(this.pointListId).then(pointCount => this.totalSize = pointCount);
        this.handlePage(this.createPageEvent());
    }

    private createPageEvent(): PageEvent {
        return {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.totalSize
        };
    }
}
