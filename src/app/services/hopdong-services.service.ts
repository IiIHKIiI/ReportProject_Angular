import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class HopdongServicesService {
  constructor(private firestore: AngularFirestore) {}

  getList() {
    return this.firestore.collection('hopdong').snapshotChanges();
  }

  countSohopdong() {}

  add(data) {
    this.firestore
      .collection('hopdong', x => x.orderBy('ngayhopdong', 'asc'))
      .add(data)
      .then(docRef => {
        this.firestore
          .collection('hopdong')
          .doc(docRef.id)
          .update({
            id: docRef.id
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  delete(data) {
    this.firestore
      .collection('hopdong')
      .doc(data.id)
      .delete()
      .then(() => console.log('deleted'))
      .catch(err => {
        console.log(err);
      });
  }
}
