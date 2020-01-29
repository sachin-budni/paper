import { Injectable, NgZone } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { auth, User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  oldUrl:any;
  errmessage;
  prograssFlag:boolean = false;
  private afFirebaseData:AngularFirestoreCollection<any>;
  constructor(private afAuth:AngularFireAuth,private router:Router,private afDB:AngularFirestore,
    private title:Title,private ngZone:NgZone,private route:ActivatedRoute) {
    this.afFirebaseData = this.afDB.collection('UserProfile');
  }

  logIn(data){
    return this.afAuth.auth.signInWithEmailAndPassword(data["email"],data["password"]).then((auth)=>{
      this.oldUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.ngZone.run(()=>this.router.navigate([this.oldUrl]));
    }); 
  }

  oAuthLogin(provider){
    console.log(this.oldUrl)
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user,undefined);
      this.oldUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.ngZone.run(()=>this.router.navigate([this.oldUrl]));
    },err=>{
      console.log(err)
    })
  }

  setTitle(title:string){
    this.title.setTitle(title)
  }

  googleLogin(){
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  logOut(){
    this.afAuth.auth.signOut().then(()=>{
        this.router.navigate(["/"]);
    });
  }

  signWithEmailAndPassword(data1){
    this.afAuth.auth.createUserWithEmailAndPassword(data1["email"],data1["password"]).then((auth)=>{
      this.updateAuthProfile(auth,data1);
    }).catch((err)=>{
      this.errmessage = err.message;
    })
  }

  updateAuthProfile(auth1:auth.UserCredential,data1){
    let Pimage =  this.afAuth.auth.currentUser.photoURL;
    return this.afAuth.auth.currentUser.updateProfile({
      displayName:data1["firstName"]+" "+data1["lastName"],
        photoURL: Pimage?Pimage:"assets/profile.png"
    }).then(auth=>this.updateUserData(auth1.user,data1))
  }

  updateUserData(user:User,d){
    const userRef: AngularFirestoreDocument<any> = this.afFirebaseData.doc(user.uid);
    const data = {
      userId:user.uid,
      userName:user.displayName,
      userEmail:user.email,
      userPhoneNo:user.phoneNumber?user.phoneNumber:d?d["mobileNo"]:null,
      userProfile:user.photoURL,
      createDate:user.metadata.creationTime,
      lastSeen:user.metadata.lastSignInTime,
      roles:{
        isStudent:true
      }
    }
    userRef.set(data,{merge:true}).catch(err=>console.log(err));
  }

  resetPassword(email){
    return this.afAuth.auth.sendPasswordResetEmail(email["forgotEmail"]);
  }
  
}
