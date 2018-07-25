import { Observable, Subject, never, timer } from 'rxjs'
import { switchMap, timeInterval, map } from 'rxjs/operators'


const pauser = new Subject()

pauser
  .pipe(switchMap(paused => paused ? never() : source()))
  .subscribe(console.log)

pauser.next(false)
setTimeout(() => {
  console.log('Pause...')
  pauser.next(true)

  setTimeout(() => {
    console.log('Unpause...')
    pauser.next(false)
  }, 3000)
}, 1500)

function source(): Observable<Date> {
  return new Observable(observer => {
    timer(0, 1000)
      .pipe(timeInterval(), map(() => observer.next(new Date())))
      .subscribe()
  })
}
