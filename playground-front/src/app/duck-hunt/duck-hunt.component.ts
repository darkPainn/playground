import { Component, OnInit, ViewChild } from '@angular/core';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-duck-hunt',
  templateUrl: './duck-hunt.component.html',
  styleUrls: ['./duck-hunt.component.css'],
  animations: [
    trigger('flyTheDuckAnimation', [
      state('beginning', style({
        top:'90%',
        left: '0',
      })),
      transition('* => flying', [
        animate(4000, keyframes([
          style({
            top: Math.floor(Math.random() * (90 - 80 + 1) + 80) + '%',
            left: Math.floor(Math.random() * (5 - 0 + 1) + 0) + '%',
            offset:0
          }),
          style({
            top:Math.floor(Math.random() * (85 - 60 + 1) + 60) + '%',
            left: Math.floor(Math.random() * (70 - 0 + 1) + 0) + '%',
            offset:0.25
          }),
          style({
            top:Math.floor(Math.random() * (85 - 10 + 1) + 10) + '%',
            left: Math.floor(Math.random() * (90 - 0 + 1) + 0) + '%',
            offset:0.50
          }),
          style({
            top:Math.floor(Math.random() * (85 - 5 + 1) + 5) + '%',
            left: Math.floor(Math.random() * (90 - 0 + 1) + 0) + '%',
            offset:0.75
          }),
          style({
            top:Math.floor(Math.random() * (85 - 0 + 1) + 0) + '%',
            left: Math.floor(Math.random() * (90 - 0 + 1) + 0) + '%',
            offset:1
          })
        ]))
      ])
    ])
  ]
})
export class DuckHuntComponent implements OnInit {

  private score:number = 0;
  private hasStarted:boolean = false;
  @ViewChild('duckDiv', {static:true}) duckDiv:HTMLDivElement;
  private animationState:string = 'beginning';
  private animationIntervals;  
  private hasHit:boolean = false;
  private displayTimer:boolean = false;
  private passedSeconds:number = 0;
  private elapsedTimeInterval;

  constructor() {    
   }

  ngOnInit() {
  }

  successfullHit(){     
    if(this.hasStarted){
      this.score++;
      this.hasHit = true; 
      window.setTimeout(() => {this.hasHit = false}, 200);
    }    
  }

  manageStart(){
    this.displayTimer = true;
    this.hasStarted = !this.hasStarted;
    if(this.hasStarted){
      this.elapsedTimeInterval = setInterval(()=>{this.passedSeconds++},1000)
      this.animationState = 'flying';
      this.animationIntervals = setInterval( function(){
        this.animationState = 'flying';
      }.bind(this),4100);
         
    }else{
      clearInterval(this.elapsedTimeInterval);
      clearInterval(this.animationIntervals);
      this.animationState = 'beginning';
    }
  }

  onAnimationDone(){
    this.animationState = 'beginning';
  }

  reset(){
    if(!this.hasStarted){
      this.score = 0;
      this.displayTimer = false;
      this.passedSeconds = 0;
    }    
  }
  
}
