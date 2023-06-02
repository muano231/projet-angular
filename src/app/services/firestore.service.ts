import { Injectable } from '@angular/core';
import { Firestore, and, collection, deleteDoc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { setDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  username: string;
  tabDriverVotes: any = [];
  userVoteId: string;

  constructor(
    private db: Firestore
  ) { }

  // Users
  // création d'un utilisateur
  async createUser(username: string, password: string) {
    await setDoc(doc(this.db, 'users', username), {
      username: username,
      password: password,
    })
    // vérification que l'user a bien été ajouté en bdd
    return await this.checkUser(username, password) ? true : false;
  }

  // vérification que l'user existe
  async checkUser(username: string, password: string) {
    const docSnap = await getDoc(doc(this.db, "users", username));

    if (docSnap.exists()) {
      const user = docSnap.data()
      if(user['username'] == username && user['password'] == password) {
        sessionStorage.setItem('username', username)
        return true
      }
    }
    return false;
  }

  // Votes
  // création d'un vote
  async setVote(round: string, driverId: string) {
    this.username = sessionStorage.getItem('username') || "";
    await setDoc(doc(this.db, 'polls', round+"-"+this.username), {
      driverId: driverId,
      round: round,
      username: this.username
    });
    // vérification que le vote a bien été ajouté en bdd
    return await this.getVote(round) ? true : false;
  }

  // lecture du vote
  async getVote(round: string, username: string = sessionStorage.getItem('username') || "") {
    let voteFound = false;
    const q = query(collection(this.db, 'polls'), where("round", "==", round), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.userVoteId = doc.id;
      voteFound = true;
    });
    return voteFound;
  }

  // lecture de tous les votes
  async getAllVotes(round: string) {
    const q = query(collection(this.db, 'polls'), where("round", "==", round))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // vérifie si un pilote existe déjà dans le tableau tab
      let driverExists = this.tabDriverVotes.find(function(value) {
        return value.driverId == doc.data()['driverId']
      })

      // si le pilote existe, alors on incrémente son nombre de votes, sinon on ajoute le nouveau pilote dans le tableau
      driverExists ? driverExists.votes++ : this.tabDriverVotes.push({"driverId": doc.data()['driverId'], "votes": 1});
    })
    return this.tabDriverVotes;
  }

  // supprime le vote
  async deleteVote() {
    if(this.userVoteId) {
      // supprime sur l'id du vote
      await deleteDoc(doc(this.db, "polls", this.userVoteId));
      return true;
    }
    return false;
  }

}
