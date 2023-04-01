import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "app/shared/interfaces/user.model";
import { UserProfileService } from "./user-profile.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  userData: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.userProfileService
      .getUser(this.activatedRoute.snapshot.params.id)
      .subscribe((user) => {
        this.userData = user;
        console.log(user);
      });
  }
}
