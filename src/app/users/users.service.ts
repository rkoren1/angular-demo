import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetUsers } from "app/shared/interfaces/user.model";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<GetUsers>("https://dummyjson.com/users")
      .pipe(map((res) => res.users));
  }

  searchUsers(name: string) {
    const params = new HttpParams().set("q", name);
    return this.http.get("https://dummyjson.com/users/search", { params });
  }
  addUser(userData) {
    return this.http.post(
      "https://dummyjson.com/users/add",
      JSON.stringify(userData)
    );
  }
  updateUser(userId: number, userData) {
    return this.http.put(
      "https://dummyjson.com/users/" + userId,
      JSON.stringify(userData)
    );
  }
  deleteUser(userId: number) {
    return this.http.delete("https://dummyjson.com/users/" + userId);
  }
}
