# Quasar App (proj-Release-3)

This github repository includes two project:

1. backend microservice in folder ![microservice](/microservice)

   Microservice is dockerized. To run the service, run the below docker commands:

   `docker build -t backend_service_dockerized .`

   `docker run -p 55000:9094 -d backend_service_dockerized`

2. frontend ui project

   To run the frontend service, please run the command, `quasar dev`, for details, refer ![README.md](/README.md)

Once the microservice is up and running, my repository details can be seen in 'My Repos' tab in UI. This tab displays GitHub https://github.com/ds3778/

Architecture diagram for the application:
![Architecture diagram](/src/assets/architecture-diagram.png)
