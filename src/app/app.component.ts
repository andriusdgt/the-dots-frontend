import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'The Dots';

    newPointForm = this.formBuilder.group({
        x: ['', [Validators.required, Validators.min(-10000), Validators.max(10000)]],
        y: ['', [Validators.required, Validators.min(-10000), Validators.max(10000)]],
    });

    constructor(private formBuilder: FormBuilder) {
    }

    addPoint() {
        console.log(this.newPointForm.value.x);
        console.log(this.newPointForm.value.y);
    }

    deletePoint() {

    }

    upload() {

    }

    download() {

    }

    clearPoints() {

    }

    findSquares() {

    }

    createList() {

    }

    renameList() {

    }

    deleteList() {

    }
}
