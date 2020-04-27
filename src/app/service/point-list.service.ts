import { HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FileDownloader } from '../file-downloader/file-downloader'
import { Point } from '../point'
import { PointList } from '../point-list'
import { BackendHttpService } from './backend-http.service'
import { POINT_PATH } from './point.service'

export const POINT_LIST_PATH = POINT_PATH + '/list'

@Injectable()
export class PointListService {

    constructor(private backendHttpService: BackendHttpService, private fileDownloader: FileDownloader) {
    }

    createPointList(): Promise<void> {
        return this.backendHttpService.put<void>(POINT_LIST_PATH, new PointList(null, 'Point list ' + new Date().toISOString()))
    }

    updatePointList(pointList: PointList): Promise<void> {
        return this.backendHttpService.put<void>(POINT_LIST_PATH, pointList)
    }

    downloadPointList(listId: string) {
        this.backendHttpService
            .getBlob(POINT_LIST_PATH + `/list-id/${listId}`)
            .then(pointListResponse => this.saveToDisk(pointListResponse))
    }

    getPointLists(): Promise<Array<PointList>> {
        return this.backendHttpService.get<Array<PointList>>(POINT_LIST_PATH)
    }

    getPointListSquares(listId: string): Promise<Array<Array<Point>>> {
        return this.backendHttpService.get<Array<Array<Point>>>(POINT_LIST_PATH + `/list-id/${listId}/squares`)
    }

    deletePointList(listId: string): Promise<void> {
        return this.backendHttpService.delete<void>(POINT_LIST_PATH + `/list-id/${listId}`)
    }

    private saveToDisk(pointListResponse: HttpResponse<Blob>) {
        this.fileDownloader.download(
            new Blob([pointListResponse.body], {type: pointListResponse.headers.get('Content-Type')}),
            this.getFilename(pointListResponse.headers.get('Content-Disposition'))
        )
    }

    private getFilename(headerValue: string): string {
        return new RegExp('(?<=filename=")(.*)(?=")').exec(headerValue)[0]
    }

}
