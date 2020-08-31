
<div align="center">  
  <img width="220px" src="https://github.com/csehlke/EiDiA/blob/master/EiDiA_frontend/src/assets/logo.png">  
</div>  
  
# EiDiA - Einfach Digitale Akte 
## Encouraging Your Ideas    
 EiDiA is a platform for file digitalization and collaboration in law and tax firms to solve the issue of inefficiency and intransparency of analog files by providing a central data storage.  
  
It was developed within the course "Software Engineering for Business Applications - Master Course: Web Application Engineering" in the summer term 2020 at the Technical University of Munich.  
  
Team members:  
  
 - [Tom Bader](https://github.com/thetommes)  
 - [Philipp Bock](https://github.com/bockph)  
 - [Thien Nguyen](https://github.com/neihtq)  
 - [Carsten Sehlke](https://github.com/csehlke)

## Running the project
### Prerequisites
Install git from [http://git-scm.com/](http://git-scm.com/).
Install node.js and npm from [http://nodejs.org/](http://nodejs.org/).

### Download the project
Clone this repository or download it as .zip:

    git clone https://github.com/csehlke/EiDiA.git
    cd EiDiA
### Install Dependencies


```
npm install
```
### Run backend
```
node EiDiA_backend/index.js
```
This will start the backend on port 3000

### Run frontend
```
webpack-dev-server --open --config EiDiA_frontend/webpack.dev.js
```
This will serve the frontend on port 8000.

## Devstart
To devstart the backend, use 
```
nodemon EiDiA_backend/index.js
```
To devstart the frontend, use the same command already provided
```
webpack-dev-server --open --config EiDiA_frontend/webpack.dev.js
```
This will serve the frontend on port 8000.

## Database
The database is hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), no configuration is needed on your side.

### Optional: Build frontend
```
webpack --config EiDiA_frontend/webpack.prod.js
```
 After building the frontend, you now have a new folder in your EiDiA_frontend directory:

* `dist` - contains all the files of your application and their dependencies.


