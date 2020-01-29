import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User, auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  oldUrl:string;
  authState:Observable<any>
  constructor(private afAuth : AngularFireAuth,private afStore: AngularFirestore) {  
    this.authState = this.afAuth.authState;
  }

  userDateFromDB(user:User){
    return new Promise((resolve,reject)=>{
        this.afStore.doc("UserProfile/"+user.uid).valueChanges().subscribe(d=>{
          if(d && d["roles"]["isAdmin"]){
            resolve(true);
          }else{
            reject(false)
          }
        })
    })
  }
  
  get getAuthState():Observable<User>{
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const currentUser = auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  


  // canRead(user: Users): boolean {
  //   const allowed = ["isAdmin", 'isEditor', 'isStudent']
  //   return this.checkAuthorization(user, allowed)
  // }

  // canEdit(user: Users): boolean {
  //   const allowed = ['isAdmin', 'isEditor']
  //   return this.checkAuthorization(user, allowed)
  // }

  // canDelete(user: Users): boolean {
  //   const allowed = ['isAdmin']
  //   return this.checkAuthorization(user, allowed)
  // }

  private checkAuthorization(user, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }

  signOut() {
    this.afAuth.auth.signOut()
  }
}
