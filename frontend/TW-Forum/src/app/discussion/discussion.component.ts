import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DiscussionService } from '../services/discussion.service';
import { Discussion } from 'src/models/Discussion';
import { TagService } from '../services/tag.service';
import { Tag } from 'src/models/tag';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddDiscussionComponent } from '../add-discussion/add-discussion.component';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  constructor(private route: ActivatedRoute,private location: Location,private discussionService:DiscussionService,private tagService:TagService,public dialog: MatDialog) { }

  tag_id=Number(this.route.snapshot.paramMap.get('id'));
  discussions:Discussion[]=[]
  tag:Tag|undefined

  ngOnInit(): void {
    this.getDiscussions()
    this.getTag()
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddDiscussionComponent, {
      
    });
  }

  getDiscussions():void{
    this.discussionService.getDiscussions(this.tag_id).subscribe(discussions=>{
      this.discussions=discussions;
    })
  }

  getTag():void{
    this.tagService.getTag(this.tag_id).subscribe(tag=>this.tag=tag)
  }
}
