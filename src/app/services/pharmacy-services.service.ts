import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PharmacyServicesService {
  constructor(private firestore: AngularFirestore) {}

  getList() {
    return this.firestore.collection('vnpt-pharmacy').snapshotChanges();
  }

  countSohopdong() {}

  add(data) {
    this.firestore
      .collection('vnpt-pharmacy', x => x.orderBy('ngaytao', 'asc'))
      .add(data)
      .then(docRef => {
        this.firestore
          .collection('vnpt-pharmacy')
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
      .collection('vnpt-pharmacy')
      .doc(data.id)
      .delete()
      .then(() => console.log('deleted'))
      .catch(err => {
        console.log(err);
      });
  }
}
