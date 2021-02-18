# ApiTestsJS
docker image for swagger https://hub.docker.com/r/ibnxotabu4/swagger-api-petstore

docker pull ibnxotabu4/swagger-api-petstore

docker run -d -e SWAGGER_HOST=http://petstore.swagger.io -e SWAGGER_URL=http://localhost -e SWAGGER_BASE_PATH=/v2 -p 80:8080 ibnxotabu4/swagger-api-petstore

You can now open swagger-ui on your machine via 80
