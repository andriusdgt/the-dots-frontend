import { Injectable } from '@angular/core'
import { PointList } from '../point-list';
import { BackendHttpService } from './backend-http.service';
import { POINT_PATH } from './point.service';

export const POINT_LIST_PATH = POINT_PATH + '/list'

@Injectable()
export class PointListService {

    constructor(private backendHttpService: BackendHttpService) {
    }

    getPointListIds(): Promise<Array<PointList>> {
        return this.backendHttpService.get<Array<PointList>>(POINT_LIST_PATH)
    }

}
