import {Resolvers} from "./generated/graphql";
import {Pool} from "pg";
import {EmployeeRow} from "./types/sqlquery";

const pool = new Pool();

export const resolvers: Resolvers = {
    Query: {
        async allEmployees(_, args) {
            const res = await pool.query<EmployeeRow>(
                `
                    select employee.id,
                           employee.first_name,
                           employee.last_name,
                           employee.birth_date,
                           employee.hire_date,
                           department.dept_name,
                           department.id as dept_id
                    from employees.employee employee
                             left join employees.department_employee department_employee
                                       on department_employee.employee_id = employee.id
                             left join employees.department department
                                       on department.id = department_employee.department_id
                    limit $1 offset $2;
                `,
                [args.limit || 10, args.offset]
            );
            return res.rows.map((row) => ({
                ...row,
                department: {
                    dept_name: row.dept_name,
                    id: row.dept_id,
                },
            }));
        },
        async employeesByDepartment(_, args) {
            const res = await pool.query<EmployeeRow>(
                `
                    select employee.id,
                           employee.first_name,
                           employee.last_name,
                           employee.birth_date,
                           employee.hire_date,
                           department.dept_name,
                           department.id as dept_id
                    from employees.employee employee
                             join employees.department_employee department_employee
                                  on department_employee.employee_id = employee.id
                             join employees.department department on department.id = department_employee.department_id
                    where department.dept_name = $1
                    limit $2 offset $3;
                `,
                [args.department, args.limit || 10, args.offset || 0]
            );
            return res.rows.map((row) => ({
                ...row,
                department: {
                    dept_name: row.dept_name,
                    id: row.dept_id,
                },
            }));
        },
    },
};
