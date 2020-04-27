import { flatten } from '@angular/compiler'
import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { PageEvent } from '@angular/material'
import { Point } from './point'
import { PointList } from './point-list'
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
    selectedPointListId: string

    squaresPageIndex = 0
    squaresPageSize = 5
    squarePointsCount = 5
    pointSquareSource: Array<Point>

    displayedColumns: string[] = ['x', 'y']
    private pointSquares: Array<Point>

    constructor(private formBuilder: FormBuilder, private pointService: PointService, private pointListService: PointListService) {
        this.setPointLists(this.setInitPoints())
    }

    private setInitPoints() {
        return (pointLists: Array<PointList>) => {
            if (pointLists.length > 0) {
                this.selectedPointListId = pointLists[0].id
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
        this.pointService.addPoint(new Point(null, this.newPointForm.value.x, this.newPointForm.value.y, this.selectedPointListId))
        this.updatePoints()
    }

    handlePointPage(event: PageEvent) {
        this.pointPageIndex = event.pageIndex
        this.pointPageSize = event.pageSize
        this.pointService
            .getAllPoints(this.selectedPointListId, event.pageIndex, event.pageSize)
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
        this.selectedPointListId = pointList.id
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

    }

    renameList() {

    }

    deleteList() {

    }

    private updatePoints() {
        this.pointService.getPointCount(this.selectedPointListId).then(pointCount => this.pointCount = pointCount)
        this.handlePointPage(this.createPointPageEvent())
    }

    private updatePointSquares() {
        this.pointListService
            .getPointListSquares(this.selectedPointListId)
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
