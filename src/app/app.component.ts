import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  instruction = 'Breathe in';

  constructor() {}

  ngOnInit() {
    const myObserv = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next('Breathe Out');
      }, 5000);
      setTimeout(() => {
        observer.complete();
      }, 10000);
    });

    const firstSub = myObserv.subscribe(
      (data: string) => {
        this.instruction = data;
      },
      (error: string) => {
        this.instruction = error;
      },
      () => {
        this.instruction = 'Breath In';
      }
    );

    setInterval(() => {
      const sub = myObserv.subscribe(
        (data: string) => {
          this.instruction = data;
        },
        (error: string) => {
          this.instruction = error;
        },
        () => {
          this.instruction = 'Breath In';
        }
      );
    }, 10000);
  }
}
