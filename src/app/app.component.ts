import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MatDialog, PageEvent, Sort } from '@angular/material'
import { SortDirection } from '@angular/material/sort'
import { Point } from './point'
import { PointList } from './point-list'
import { RenamePointListDialog } from './rename-point-list/rename-point-list-dialog.component'
import { PointListService } from './service/point-list.service'
import { PointService } from './service/point.service'
import { SnackBar } from './snack-bar/snack-bar.service'
import { Square } from './square'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    newPointForm = this.formBuilder.group({
        x: ['', [Validators.required, Validators.min(-5000), Validators.max(5000)]],
        y: ['', [Validators.required, Validators.min(-5000), Validators.max(5000)]]
    })

    pointPageIndex = 0
    pointPageSize = 5
    pointCount = 0
    pointSource: Array<Point>
    selectedPointId: string

    pointLists: Array<PointList>
    selectedPointList: PointList

    squaresPageIndex = 0
    squaresPageSize = 5
    squaresCount = 0
    squaresSource: Array<Square>

    displayedColumns: string[] = ['x', 'y']
    private pointSortDirection: SortDirection = ''
    private squares: Array<Square>

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private pointService: PointService,
        private pointListService: PointListService,
        private snackBar: SnackBar
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
        this.pointService
            .addPoint(new Point(null, this.newPointForm.value.x, this.newPointForm.value.y, this.selectedPointList.id))
            .then(() => {
                    this.updatePoints()
                    this.updatePointSquares()
                }
            )
    }

    handlePointPage(event: PageEvent) {
        this.pointPageIndex = event.pageIndex
        this.pointPageSize = event.pageSize
        if (this.pointSortDirection === '')
            this.pointService
                .getPoints(this.selectedPointList.id, event.pageIndex, event.pageSize)
                .then(points => this.pointSource = points)
        else
            this.pointService
                .getSortedPoints(this.selectedPointList.id, this.pointPageIndex, this.pointPageSize, this.pointSortDirection)
                .then(points => this.pointSource = points)
    }

    handlePointSquaresPage(event: PageEvent) {
        this.squaresPageIndex = event.pageIndex
        this.squaresPageSize = event.pageSize
        this.squaresSource = this.squares.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize)
    }

    sortPoints(sort: Sort) {
        this.pointSortDirection = sort.direction
        this.updatePoints()
    }

    selectPoint(point: Point) {
        this.selectedPointId = point.id
    }

    selectPointList(pointList: PointList) {
        this.selectedPointList = pointList
        this.updatePoints()
    }

    deletePoint() {
        this.pointService
            .deletePoint(this.selectedPointId)
            .then(() => {
                    this.updatePoints()
                    this.updatePointSquares()
                }
            )
    }

    upload(file: File) {
        this.pointListService
            .uploadPointList(file, this.selectedPointList.id)
            .then(warnings => {
                this.setPointLists()
                this.updatePoints()
                if (warnings.length > 0)
                    this.snackBar.displayInfo(warnings.reduce((acc, warning) => acc + warning.message + '\n', ''))
            })
    }

    download() {
        this.pointListService.downloadPointList(this.selectedPointList.id)
    }

    clearPoints() {
        this.pointService
            .deletePoints(this.selectedPointList.id)
            .then(() => this.updatePoints())
    }

    findSquares() {
        this.updatePointSquares()
    }

    createList() {
        this.pointListService
            .createPointList()
            .then(() => this.setPointLists())
    }

    renameList() {
        const dialogRef = this.dialog.open(RenamePointListDialog, {
            width: '350px',
            data: this.selectedPointList.name
        })

        dialogRef.afterClosed().subscribe((newPointListName?: string) => {
            let newPointList = new PointList(this.selectedPointList.id, newPointListName)
            if (newPointListName)
                this.pointListService
                    .updatePointList(newPointList)
                    .then(() => {
                            this.setPointLists()
                            this.selectPointList(newPointList)
                        }
                    )
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
                this.squares = squares
                this.squaresCount = this.squares.length
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
            length: this.squaresCount
        }
    }

}
