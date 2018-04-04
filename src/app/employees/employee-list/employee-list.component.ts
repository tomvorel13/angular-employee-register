import { Component, OnInit } from "@angular/core";

//services
import { EmployeeService } from "../shared/employee.service";
import { ToastrService } from "ngx-toastr";

//models
import { Employee } from "../shared/employee.model";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    let x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm("Are you sure you want to delete this employee?") == true) {
      this.employeeService.deleteEmployee(key);
      this.toastr.warning("Deleted Successfully", "Employee Register");
    }
  }
}
