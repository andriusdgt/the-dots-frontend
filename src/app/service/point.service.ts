import { Injectable } from '@angular/core'
import { SortDirection } from '@angular/material/sort'
import { Point } from '../point';
import { BackendHttpService } from './backend-http.service';

export const POINT_PATH = '/point'

@Injectable()
export class PointService {

    constructor(private backendHttpService: BackendHttpService) {
    }

    addPoint(point: Point): Promise<void>{
        return this.backendHttpService.put<void>(POINT_PATH, point)
    }

    deletePoint(id: string): Promise<void>{
        return this.backendHttpService.delete<void>(POINT_PATH + '/' + id)
    }

    deletePoints(listId: string): Promise<void>{
        return this.backendHttpService.delete<void>(POINT_PATH + `/list-id/${listId}`)
    }

    getPoints(listId: string, pageIndex: number, pageSize: number): Promise<Array<Point>> {
        return this.backendHttpService.get<Array<Point>>(POINT_PATH + `/list-id/${listId}/page-index/${pageIndex}/page-size/${pageSize}`)
    }

    getSortedPoints(listId: string, pageIndex: number, pageSize: number, sortDirection: SortDirection): Promise<Array<Point>> {
        return this.backendHttpService.get<Array<Point>>(POINT_PATH + `/list-id/${listId}/page-index/${pageIndex}/page-size/${pageSize}/${sortDirection}`)
    }

    getPointCount(listId: string): Promise<number> {
        return this.backendHttpService.get<number>(POINT_PATH + `/list-id/${listId}/count`)
    }

}
