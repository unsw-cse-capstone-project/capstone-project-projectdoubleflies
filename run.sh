#!/bin/bash
fuser -k 8080/tcp
fuser -k 3000/tcp
cd system/cs
mvn spring-boot:run &
sleep 5
cd ../frontend/project
npm start
