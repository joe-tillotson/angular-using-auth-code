import {Component} from '@angular/core';
import {DataService} from '../services/data.service';
import {Post} from '../models/post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';
import {MatDialog} from '@angular/material';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dataService: DataService, public auth: AuthService, public dialog: MatDialog) {
  }

  displayedColumns = ['datePosted', 'title', 'category', 'delete'];
  dataSource = new PostDataSource(this.dataService);

  deletePost(id: number): void {
    if (this.auth.isAuthenticated()) {
      this.dataService.deletePost(id);
      this.dataSource = new PostDataSource(this.dataService);
    } else {
      alert('You must Login in before deleting');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result: any) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}
