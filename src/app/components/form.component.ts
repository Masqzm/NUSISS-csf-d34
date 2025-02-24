import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, Subject, Subscription } from 'rxjs';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder)
  protected form!: FormGroup

  private valueSub!: Subscription
  private statusSub!: Subscription

  private dogSvc = inject(DogService)
  images: string[] = []

  count = 0

  private counterSubj = new Subject<number>()

  pushData() {
    this.count++
    this.counterSubj.next(this.count)
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(5) ]),
      address: this.fb.control<string>('', [ Validators.required, Validators.minLength(5) ])
    })

    this.statusSub = this.dogSvc.newDogSearch.subscribe(
      (images) => this.images = images
    )

    // this.counterSubj.subscribe(
    //   (data) = { console.info('>>> received: ', data) }
    // )

    // this.valueSub = this.form.valueChanges.subscribe({
    //   next: (value) => {
    //     console.info('>>> value: ', value)
    //   },
    //   error: (err) => {
    //     console.info('>>> error: ', err)
    //   },
    //   complete: () => {
    //     console.info('>>> completed')
    //   }
    // })

    // this.statusSub = this.form.statusChanges
    //                 .pipe(
    //                   debounceTime(2000),      // return status every 2s (useful to stagger API calls)
    //                   map(v => v == "VALID")
    //                 )
    //                 .subscribe(
    //                   (changes) => {
    //                     console.info('>>> changes: ', changes)
    //                   }
    //                 )
  }

  ngOnDestroy(): void {
    // Unsub when component is deleted
    this.valueSub.unsubscribe()
    this.statusSub.unsubscribe()
  }
}
