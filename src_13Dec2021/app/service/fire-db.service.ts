import { Injectable } from '@angular/core';
import FireDbItem from '../shared/model/FireDbItem';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FireDbService {

  //Refers to DB path root object
  private dbPath = '/items';

  //AngularFireList service helps us to synchronize data as lists
  fireDbRef: AngularFireList<FireDbItem>;


  //AngularFireDatabase service injected in ctor allows us to work with the Realtime Database.
  constructor(private firedb: AngularFireDatabase) {
    this.fireDbRef = firedb.list(this.dbPath);
  }

  //push will generate a new random key and insert the data.
  create(notification: FireDbItem): any {
    return this.fireDbRef.push(notification);
  }

  //set the specific record with whatever data you passed in.
  createObject(key: string, value: any): Promise<void> {
    return this.fireDbRef.set(key,value);
  }

  update(key: string, value: any): Promise<void> {
    return this.fireDbRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.fireDbRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.fireDbRef.remove();
  }
}
