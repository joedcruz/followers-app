import { combineLatest } from 'rxjs';
import { GithubFollowersService } from './../github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any;

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).pipe(
      switchMap( combined => {
        const id = combined[0].get('id');
        const page = combined[1].get('page');
        return this.service.getAll();
      })
    )
    .subscribe(followers => this.followers = followers);
  }

}
