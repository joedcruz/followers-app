import { AuthorsService } from './../authors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit {

  title = 'List of authors';
  authors;

  constructor(service: AuthorsService) {
    this.authors = service.getAuthors();
  }

  ngOnInit(): void {
  }

}
