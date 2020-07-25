#!/bin/bash
fuser -k 8080/tcp
cd system/cs
mvn spring-boot:run &
cd ../frontend/project
npm start