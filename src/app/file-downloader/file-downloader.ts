import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { UrlProvider } from './url-provider'

@Injectable()
export class FileDownloader {

    constructor(@Inject(DOCUMENT) private document: Document, private urlProvider: UrlProvider) {
    }

    download(file: Blob, filename: string) {
        const URL = this.urlProvider.provide()
        const link = this.document.createElement('a')
        link.href = URL.createObjectURL(file)
        link.download = filename
        link.click()
        URL.revokeObjectURL(link.href)
    }

}
