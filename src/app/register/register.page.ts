import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import auth from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register (){
    const { username, password, cpassword } = this
    if(password !== cpassword){
      return console.error("Mot de passe non identiques.")
    }

    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username, password)
      console.log(res)
    } catch(error) {
      console.dir(error)
    }
  }

}
