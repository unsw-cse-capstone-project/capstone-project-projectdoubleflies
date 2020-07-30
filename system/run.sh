#!/bin/bash
fuser -k 8080/tcp
fuser -k 3000/tcp
cd frontend/project
npm install &&
cd ../../cs
mvn spring-boot:run &
sleep 5
cd ../frontend/project
npm start
