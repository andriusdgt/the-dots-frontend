import { Injectable } from '@angular/core'
import { BackendHttpService } from './backend-http.service';

export const POINT_PATH = '/point'

@Injectable()
export class PointService {

    constructor(private backendHttpService: BackendHttpService) {
    }

    getAllPoints(index: number): Promise<any> {
        console.log(index)
        return this.backendHttpService.get<any[]>(POINT_PATH)
    }

}
