# Employee Directory

### Demo

https://portfolio.mobile360.net

https://portfolio.mobile360.net/employee-profile.html


### Use cases

- View employee listing
- Search employee by full name
- Call employee (call at https://demo.mobile360.net)
- Receive call (receive at https://demo.mobile360.net/employee-profile.html)


### Services

- client-web - a static website using Typescript and GraphQL, served via nginx
- db
  - postgresql - a sql database, to store employee table
  - elasticsearch - a search engine, for full text queries of employee full name
- server - a nodejs service using Typescript and GraphQL
- sip - a FreeSWITCH server

For portfolio purpose, these services reside in a single GIT repository


### Deployment

#### Software prerequisites

Recent version of:
- docker


#### Deployment steps

- Rename all .env.sample files to .env and fill up the environment values
- Rename all domain names in nginx configuration files
- Execute ./deploy.sh
