import { Component, inject } from '@angular/core';
import { DogService } from './dog.service';
import { DogResults } from './models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  private dogSvc = inject(DogService)

  protected dogImages: string[] = []
  
  private sub!: Subscription

  fetchDogImagesAsStrArr() {
    this.dogSvc.getDogsAsStringArr().then(result => {
        console.info('>>> PROMISE result: ', result)
        this.dogImages = result
      }
    )
    // .catch(err => { 
    //   console.info('>>> error: ', err) 
    //   alert(`ERROR: ${JSON.stringify(err)}`)
    // })
  }

  fetchDogImagesAsPromise() {
    this.dogSvc.getDogsAsPromise().then(result => {
        console.info('>>> PROMISE result: ', result)
        this.dogImages = result.message
      }
    )
    .catch(err => { 
      console.info('>>> error: ', err) 
      alert(`ERROR: ${JSON.stringify(err)}`)
    })
  }

  fetchDogImages() {
    this.sub = this.dogSvc.getDogs().subscribe({
      next: (result) => {
        console.info('>>> result: ', result)
        this.dogImages = result.message
      },
      error: (err) => {
        console.info('>>> error: ', err)
      },
      complete: () => {
        console.info('>>> completed')
        this.sub.unsubscribe()
      }
    })
  }

  promiseDemo() {
    const taskSuccess = true

    let p = new Promise(
      // Pass the promise a fn.
      (resolve, reject) => {
        // Perform task
        // Assume task takes 3s

        // If task successful, call resolve(result)
        if(taskSuccess) {
          setTimeout(() => {
            console.info("Task completed")
            resolve("Task completed")
          }, 3000)

        } else {
          // Else call reject(reason)
          setTimeout(() => {
            console.info("Task failed")
            reject("Task failed")
          }, 3000)
        }
      }
    )

    // Single promise
    // p
    // .then(result => {
    //     console.info('>>> promise resolved: ', result)  
    // })
    // .catch(error => {
    //     console.info('>>> promise failed: ', error)
    // })

    // Chain promises
    p
    .then(result => {
        console.info('>>> promise resolved: ', result)

        //throw 'error from first promise'    // jumps to catch and breaks chain if error thrown
        return 'this is another result'   
    })
    .then(result => {
      console.info('>>> 2nd promise: ', result)
      return 123
    })
    // If there's a catch here, it will be handled here and continues to next .then
    // .catch(error => {
    //     console.info('>>> promise failed: ', error)
    // })
    .then(result => {
      console.info('>>> 3rd promise value: ', result)
    })
    .catch(error => {
        console.info('>>> promise failed: ', error)
    })

    console.info('>>> p = ', p)
  }
}
