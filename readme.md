# koa2 weibo
author: rumengbaobao

start a project:
1. koa2 -e projectname =>creat a project
2. npm i =>install concerned app
3. npm run dev =>to run the project
4. npm i cross-env -D =>install a tool cross-env
5. set environment as following in package.json
"dev": "cross-env NODE_ENV=dev./node_modules/.bin/nodemon bin/www",
"prd": "cross-env NODE_ENV=production pm2 start bin/www"

refactor your project:
6. add a folder "src" for all source code
  drag "routes","public","view" and "app" into src
  then change the path of app in the bin/www file
7. commit tips:
   for modifying structure of your codes 
   -> commit -m"refactor:xxxx"
   for a new feature
   -> commit -m"feature:xxx"
   for fix a bug
   -> commit -m"fix:xxx"
   for writing a new document
   -> commit -m"doc:xxx"