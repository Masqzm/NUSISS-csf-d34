import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
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
