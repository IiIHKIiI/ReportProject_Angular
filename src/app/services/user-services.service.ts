import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(private firestore: AngularFirestore) {}

  getList() {
    return this.firestore.collection('users').snapshotChanges();
  }

  add(data) {
    this.firestore
      .collection('users', x => x.orderBy('hotennv', 'asc'))
      .add(data)
      .then(docRef => {
        this.firestore
          .collection('users')
          .doc(docRef.id)
          .update({
            id: docRef.id
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  resetPass(data) {
    this.firestore
      .collection('users')
      .doc(data.id)
      .update({
        pass: '123456'
      })
      .then(() => console.log('updated'))
      .catch(err => {
        console.log(err);
      });
  }

  delete(data) {
    this.firestore
      .collection('users')
      .doc(data.id)
      .delete()
      .then(() => console.log('deleted'))
      .catch(err => {
        console.log(err);
      });
  }
}
