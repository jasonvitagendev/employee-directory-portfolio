create role jason
login
password 'Test123123';

create database app
with
owner = jason;

grant usage
on schema "employees"
to jason;

grant all privileges
on all tables
in schema "employees"
to jason;

-- using sample database
-- https://github.com/h8/employees-database

-- list tables
select table_name, table_schema from information_schema.tables where table_schema = 'employees';

-- for development querying purposes
select * from employee;
select * from department;
select * from salary;
select * from department_employee;

select *
from employee
left join department_employee on department_employee.employee_id = employee.id
left join department on department.id = department_employee.department_id;

select *
from employee
join department_employee on department_employee.employee_id = employee.id
join department on department.id = department_employee.department_id
where department.dept_name = 'Research';

-- top 5 employees with most received salary per department
select department.dept_name, ss.employeeid, ss.employee_firstname, ss.employee_salary
from department
left join lateral (
    select employee.id, employee.first_name, sum(salary.amount)
    from employee
    join department_employee on department_employee.employee_id = employee.id
    join salary on salary.employee_id = employee.id
    where department_employee.department_id = department.id
    group by employee.id
    order by sum(salary.amount) desc
    limit 5
) ss (employeeid, employee_firstname, employee_salary) on true
