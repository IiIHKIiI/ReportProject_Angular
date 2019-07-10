import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Donvi } from 'src/app/models/donvi.model';

@Injectable({
  providedIn: 'root'
})
export class DonviServicesService {
  constructor(private firestore: AngularFirestore) {}

  getListDonVi() {
    return this.firestore.collection('donvi').snapshotChanges();
  }
}
