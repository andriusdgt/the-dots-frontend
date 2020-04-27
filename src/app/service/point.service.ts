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

    getAllPoints(listId: string, pageIndex: number, pageSize: number): Promise<any> {
        return this.backendHttpService.get<any[]>(POINT_PATH + `/list-id/${listId}/page-index/${pageIndex}/page-size/${pageSize}`)
    }

    getPointCount(listId: string): Promise<number> {
        return this.backendHttpService.get<number>(POINT_PATH + `/list-id/${listId}/count`)
    }

}
