
apt-get update
apt-get install nginx
npm i
node ace migration:rollback --batch 0
node ace migration:run
node ace serve --watch
