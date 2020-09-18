import { CoursesService } from './courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        <h2>{{ title }}</h2>
        <ul>
            <li *ngFor="let course of courses">
                {{ course }}
            </li>
        </ul>

        <div>
            {{ course.title | uppercase | lowercase }} <p>
            {{ course.students | number }} <p>
            {{ course.rating | number: '2.1-1'}} <p>
            {{ course.price | currency:'AUD':true:'3.2-2' }} <p>
            {{ course.releaseDate | date:'shortDate' }}
        </div>

        <div (click)="onDivClicked()">
            <input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />
            <button (click)="onSave($event)" class="btn btn-primary">Save</button>
        </div>
        <p>
        {{ email }}
        <p>
        <div>
            {{ text | summary:10 }}
        </div>
    `
})
export class CoursesComponent {
    title = 'List of courses';
    courses;
    email = 'me@example.com';
    course = {
        title: 'The Complete Angular Course',
        rating: 4.9745,
        students: 30123,
        price: 190.95,
        releaseDate: new Date(2016, 3, 1)
    };
    text = `
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `;
    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }

    onSave($event) {
        $event.stopPropagation();
        console.log('Button was clicked', $event);
    }

    onDivClicked() {
        console.log('Div was clicked');
    }

    onKeyUp() {
        console.log(this.email);
    }
}
