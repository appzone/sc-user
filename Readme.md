### SC-USER
Sejutacita microservice for handling user. (Create user, get user, update user, etc)
```
Stack : Nodejs, ExpressJs
Database : MongoDB hosted in MongoDb Atlas 
CI/CD : Github actions
Deployment: Kubernetes managed by Digitalocean
Docker Registry : Digitalocean
```

### Base url : 
```http://167.99.29.250/sc-user/```

### Path : 
```
/users (POST) ==> to create user
/users (GET) => to get all user
/users/:userId (GET) => to get user by user id
/users/:userId (PUT) => to update user by user id
/users/:userId (DELETE) => to delete user by user id
```
for more detail of the api path can be found on http://167.99.29.250/sc-swagger/


## Configuration / Setup


1. Manual localhost run
```javascript
npm install
node server.js
```

2. Docker in localhost (docker token value is in do-token.txt file)
```
docker login registry.digitalocean.com/sejutacita
docker build -t xxx .
docker run -d -it xxx
```

3. Manual Kubernetes
Update the sc-user.yaml line 32  into
where xxx is the docker image name (must have same value as per step 2)
```
          image: xxx
```
Run kubernetes command
```
kubectl --kubeconfig="kubeconfig.yaml" apply -f sc-ingress.yaml
kubectl --kubeconfig="kubeconfig.yaml" apply -f sc-user.yaml
```
4. Automate kubernetes (deployed to Digitalocean)
```
Just push to the repo and wait +- 1-2 minutes
```