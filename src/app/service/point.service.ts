import { Injectable } from '@angular/core'
import { Point } from '../point';
import { BackendHttpService } from './backend-http.service';

export const POINT_PATH = '/point'

@Injectable()
export class PointService {

    constructor(private backendHttpService: BackendHttpService) {
    }

    addPoint(point: Point){
        this.backendHttpService.put<Point>(POINT_PATH, point)
    }

    deletePoint(id: string){
        this.backendHttpService.delete<void>(POINT_PATH + '/' + id)
    }

    deletePoints(listId: string){
        this.backendHttpService.delete<void>(POINT_PATH + `/list-id/${listId}`)
    }

    getAllPoints(listId: string, pageIndex: number, pageSize: number): Promise<Array<Point>> {
        return this.backendHttpService.get<Array<Point>>(POINT_PATH + `/list-id/${listId}/page-index/${pageIndex}/page-size/${pageSize}`)
    }

    getPointCount(listId: string): Promise<number> {
        return this.backendHttpService.get<number>(POINT_PATH + `/list-id/${listId}/count`)
    }

}
