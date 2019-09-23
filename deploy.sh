#!/bin/bash
source ~/.profile
echo "Start Deploying Glossary"
cd ~/CS50-Glossary/Glossary
echo "-- start pulling from github"
git pull
echo "-- start installing independencies"
npm install
echo "-- start building"
npm run build
echo "-- restart service"
pkill -f node
sudo supervisorctl -c ~/supervisor.conf restart Glossary
echo "-- Deployment Success"