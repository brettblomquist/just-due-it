import { inject, Injectable } from '@angular/core';
import { collection, Firestore, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User{
  id: string
  username: string
  password: string
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private firestore = inject(Firestore)
  private usersCollection = collection(this.firestore, 'users');

  getUsers(): Observable<User[]>{
    return collectionData(this.usersCollection, ({idField: 'id'})) as Observable<User[]>
  }

  addUser(newUser: User){
    const userRef = doc(this.usersCollection)
    const newId = userRef.id;
    newUser.id = newId;
    setDoc(userRef, newUser)
  }
}
