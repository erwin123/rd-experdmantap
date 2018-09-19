import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Feedback } from '../models/feedback';
import { FeedbackService } from '../services/feedback.service';
import { StatemanagementService } from '../services/statemanagement.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  @Input() kdDocument: string;
  empInfo: any;
  longAnswer: string;
  feedbacks: Feedback[] = new Array();
  feedback: Feedback;
  constructor(private feedbackService: FeedbackService, private stateService: StatemanagementService) { }

  ngOnInit() {
    this.feedback = new Feedback();
    this.longAnswer = "";
    this.empInfo = this.stateService.getStoredEmployee();
    
  }

  ngAfterViewInit(){
    this.getFeedback();
  }

  getFeedback() {
    console.log(this.kdDocument);
    this.feedbackService.getFeedback(this.kdDocument).subscribe(res => {
      this.feedbacks = res.sort((a, b) => {
        if (a.CreatedDate < b.CreatedDate) return -1;
        else if (a.CreatedDate > b.CreatedDate) return 1;
        else return 0;
      });
    }, err => {
      console.log("No data");
    }, () => {

    });
  }

  onSubmit() {
    this.stateService.setTraffic(true);
    this.feedback.BranchCode = this.empInfo.BranchCode;
    this.feedback.CreatedBy = this.empInfo.Username;
    this.feedback.KdDocument = this.kdDocument;
    this.feedback.ProjectCode = this.empInfo.ProjectCode;
    this.feedback.EmployeeCode = this.empInfo.EmployeeCode;

    this.feedbackService.postFeedback(this.feedback).subscribe(res => {
      this.stateService.setTraffic(false);
      this.getFeedback();
      this.feedback = new Feedback();
    });
  }

}
