import { Component, OnInit } from "@angular/core";
import { LoadOptions } from "devextreme/data";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import { lastValueFrom, of } from "rxjs";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  customStore;
  treelistDatasource;
  constructor(private usersService: UsersService) {}
  ngOnInit() {
    this.initTreelistCustomStore();
  }

  initTreelistCustomStore() {
    this.customStore = new CustomStore({
      key: "id",
      load: (loadOptions: LoadOptions) => {
        const loadData$ = this.usersService.getUsers();
        return lastValueFrom(loadData$).then((data) => ({
          data,
        }));
      },
      totalCount: (options) => lastValueFrom(of(3000)),
      insert: (values) => lastValueFrom(this.usersService.addUser(values)),
      update: (key, values) => values,
      remove: (key) =>
        lastValueFrom(this.usersService.deleteUser(key))
          .then((data: any) => data)
          .catch((e) => {
            throw e && e.error && e.error.Message;
          }),
    });
    this.treelistDatasource = new DataSource({
      store: this.customStore,
      key: "id", // set up primary key,
    });
  }
}
