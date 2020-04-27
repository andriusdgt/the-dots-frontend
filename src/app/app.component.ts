import { flatten } from '@angular/compiler'
import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MatDialog, PageEvent } from '@angular/material'
import { Point } from './point'
import { PointList } from './point-list'
import { RenamePointListDialog } from './rename-point-list-dialog.component'
import { PointListService } from './service/point-list.service'
import { PointService } from './service/point.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'The Dots'

    newPointForm = this.formBuilder.group({
        x: ['', [Validators.required, Validators.min(-10000), Validators.max(10000)]],
        y: ['', [Validators.required, Validators.min(-10000), Validators.max(10000)]]
    })

    pointPageIndex = 0
    pointPageSize = 5
    pointCount = 5
    pointSource: Array<Point>
    selectedPointId: string

    pointLists: Array<PointList>
    selectedPointList: PointList

    squaresPageIndex = 0
    squaresPageSize = 5
    squarePointsCount = 5
    pointSquareSource: Array<Point>

    displayedColumns: string[] = ['x', 'y']
    private pointSquares: Array<Point>

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private pointService: PointService,
        private pointListService: PointListService
    ) {
        this.setPointLists(this.setInitPoints())
    }

    private setInitPoints() {
        return (pointLists: Array<PointList>) => {
            if (pointLists.length > 0) {
                this.selectedPointList = pointLists[0]
                this.updatePoints()
            }
        }
    }

    private setPointLists(callback: (pointLists: Array<PointList>) => void = () => {}) {
        this.pointListService
            .getPointLists()
            .then(
                pointLists => {
                    this.pointLists = pointLists
                    callback(pointLists)
                }
            )
    }

    addPoint() {
        this.pointService.addPoint(new Point(null, this.newPointForm.value.x, this.newPointForm.value.y, this.selectedPointList.id))
        this.updatePoints()
    }

    handlePointPage(event: PageEvent) {
        this.pointPageIndex = event.pageIndex
        this.pointPageSize = event.pageSize
        this.pointService
            .getAllPoints(this.selectedPointList.id, event.pageIndex, event.pageSize)
            .then(points => this.pointSource = points)
    }

    handlePointSquaresPage(event: PageEvent) {
        this.squaresPageIndex = event.pageIndex
        this.squaresPageSize = event.pageSize
        this.pointSquareSource = this.pointSquares.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize)
    }

    selectPoint(point: Point) {
        this.selectedPointId = point.id
    }

    selectPointList(pointList: PointList) {
        this.selectedPointList = pointList
        this.updatePoints()
    }

    deletePoint() {
        this.pointService.deletePoint(this.selectedPointId)
        this.updatePoints()
    }

    upload() {

    }

    download() {

    }

    clearPoints() {

    }

    findSquares() {
        this.updatePointSquares()
    }

    createList() {
        this.pointListService.createPointList().then(
            () => this.setPointLists()
        )
    }

    renameList() {
        const dialogRef = this.dialog.open(RenamePointListDialog, {
            width: '350px',
            data: this.selectedPointList.name
        })

        dialogRef.afterClosed().subscribe((newPointListName?: string) => {
            if (newPointListName)
                this.pointListService
                    .updatePointList(new PointList(this.selectedPointList.id, newPointListName))
                    .then(() => this.setPointLists())
        })
    }

    deleteList() {
        this.pointListService.deletePointList(this.selectedPointList.id).then(
            () => {
                this.setPointLists()
                this.updatePoints()
            }
        )
    }

    private updatePoints() {
        this.pointService.getPointCount(this.selectedPointList.id).then(pointCount => this.pointCount = pointCount)
        this.handlePointPage(this.createPointPageEvent())
    }

    private updatePointSquares() {
        this.pointListService
            .getPointListSquares(this.selectedPointList.id)
            .then(squares => {
                this.pointSquares = flatten(squares)
                this.squarePointsCount = this.pointSquares.length
                this.handlePointSquaresPage(this.createPointSquarePageEvent())
            })
    }

    private createPointPageEvent(): PageEvent {
        return {
            pageIndex: this.pointPageIndex,
            pageSize: this.pointPageSize,
            length: this.pointCount
        }
    }

    private createPointSquarePageEvent(): PageEvent {
        return {
            pageIndex: this.squaresPageIndex,
            pageSize: this.squaresPageSize,
            length: this.squarePointsCount
        }
    }

}
