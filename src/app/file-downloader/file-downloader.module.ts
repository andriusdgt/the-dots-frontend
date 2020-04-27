import { NgModule } from '@angular/core'
import { FileDownloader } from './file-downloader'
import { UrlProvider } from './url-provider'

@NgModule({
    providers: [
        FileDownloader,
        UrlProvider
    ]
})
export class FileDownloaderModule {
}
