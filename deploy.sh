echo "Start Deploying Glossary"
echo "-- start pulling from github"
git pull
echo "-- start installing independencies"
npm install
echo "-- start building"
npm run build
echo "-- restart service"
sudo supervisorctl -c ~/supervisor.conf restart Glossary