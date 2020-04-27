import { Injectable } from '@angular/core'
import { Point } from '../point'
import { PointList } from '../point-list';
import { BackendHttpService } from './backend-http.service';
import { POINT_PATH } from './point.service';

export const POINT_LIST_PATH = POINT_PATH + '/list'

@Injectable()
export class PointListService {

    constructor(private backendHttpService: BackendHttpService) {
    }

    createPointList(): Promise<void> {
        return this.backendHttpService.put<void>(POINT_LIST_PATH, new PointList(null, 'Point list ' + new Date().toISOString()))
    }

    updatePointList(pointList: PointList): Promise<void> {
        return this.backendHttpService.put<void>(POINT_LIST_PATH, pointList)
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

}
