import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "app/shared/interfaces/user.model";

@Injectable({
  providedIn: "root",
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUser(userId: number) {
    return this.http.get<User>(
      "https://dummyjson.com/users/" + userId.toString()
    );
  }
}
