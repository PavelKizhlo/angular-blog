import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../shared/post.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  searchStr = '';

  pSub: Subscription;
  rSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.rSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
