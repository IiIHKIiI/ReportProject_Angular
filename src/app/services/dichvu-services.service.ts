import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DichvuServicesService {
  constructor(private firestore: AngularFirestore) {}

  getList() {
    return this.firestore.collection('dichvu').snapshotChanges();
  }

  add(data) {
    this.firestore
      .collection('dichvu', x => x.orderBy('madichvu', 'asc'))
      .add(data)
      .then(docRef => {
        this.firestore
          .collection('dichvu')
          .doc(docRef.id)
          .update({
            id: docRef.id
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  lock(data) {
    this.firestore
      .collection('dichvu')
      .doc(data.id)
      .update({
        lock: data.lock
      })
      .then(() => console.log('updated'))
      .catch(err => {
        console.log(err);
      });
  }

  delete(data) {
    this.firestore
      .collection('dichvu')
      .doc(data.id)
      .delete()
      .then(() => console.log('deleted'))
      .catch(err => {
        console.log(err);
      });
  }
}
