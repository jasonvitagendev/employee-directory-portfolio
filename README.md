# Employee Directory

### Demo

Main page<br>
https://demo.mobile360.net

Employee profile page<br>
https://demo.mobile360.net/employee-profile.html

System metrics<br>
https://kibana.mobile360.net/app/dashboards#/view/2c945c00-bda4-11ed-bd7a-a995402f23e3?_g=(filters:!(),refreshInterval:(pause:!f,value:10000),time:(from:now-1h,to:now))
<br>Username: visitor
<br>Password: test123

Web server log analysis<br>
https://kibana.mobile360.net/app/dashboards#/view/55a9e6e0-a29e-11e7-928f-5dbe6f6f5519-ecs?_g=(filters:!(),refreshInterval:(pause:!f,value:10000),time:(from:now-1h,to:now))
<br>Username: visitor
<br>Password: test123

### Use cases

- View employee listing
- Search employee by full name
- Call employee (call at https://demo.mobile360.net)
- Receive call (receive at https://demo.mobile360.net/employee-profile.html)
- View system metrics (https://kibana.mobile360.net/app/dashboards#/view/2c945c00-bda4-11ed-bd7a-a995402f23e3?_g=(filters:!(),refreshInterval:(pause:!f,value:10000),time:(from:now-1h,to:now)))
- Analyze web server logs with Kibana (https://kibana.mobile360.net/app/dashboards#/view/55a9e6e0-a29e-11e7-928f-5dbe6f6f5519-ecs?_g=(filters:!(),refreshInterval:(pause:!f,value:10000),time:(from:now-1h,to:now)))

### Services

- client-web - a static website using Typescript and GraphQL, served via nginx
- db
  - postgresql - a sql database, to store employee table
  - elasticsearch 
    - a search engine, for full text queries of employee full name
    - an analytics engine for logs analytics
  - kibana - a data visualization dashboard
- server - a nodejs service using Typescript and GraphQL
- sip - a FreeSWITCH server
- reverse-proxy - an nginx server as the main entry point to APIs and static server, secured with SSL/TLS

For portfolio purpose, these services reside in a single GIT repository


### Deployment

#### Software prerequisites

Recent version of:
- docker


#### Deployment steps

- Rename all .env.sample files to .env and fill up the environment values
- Rename all domain names in nginx configuration files
- Execute ./deploy.sh
