# Digital Degree (degree-bnav2:frontend)

A proof of concept (PoC) of a permissioned blockchain for verifiable digital diplomas base on the [Blockcerts](https://www.blockcerts.org/about.html) open standard. Digital diplomas are a transparent way of verifying professional or educational accomplishments for a global workforce and it’s a first step toward supplying the full record of a learning experience (transcripts, projects,..). Blockcerts is an open-source project initially led by MIT’s media lab and Learning Machine. Blockcerts focus has been on issuing the certificates on Bitcoin and Ethereum. Our goal is to extend the certification process in a permissioned blockchain using the Hyperledger framework and tools. The initial aim is to build a ledger of digital diplomas to be deployed for a university and extend its possibilities to other institutions.

-----
The project is curretly in development using frameworks and tools from Hyperledger, in particular [Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.1/) and [Composer](https://hyperledger.github.io/composer/latest/introduction/introduction)  

In this posting we will be deploying into a [single-organization](https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-single-org) the same business network, start the rest-server and the user interfaces generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1. 

## Deployment of Hyperledger Fabric onto a single-organization  

Follow *steps one and two* from the tutorial: 1-Starting a Hyperledger Fabric network; 2-Exploring the Hyperledger Fabric network.

In *step three* create a folder called `certificates` and follow the instructions:
3-Building a connection profile (copy the example connection profile) and save to the folder `connection.json`.

Follow *step four* to locate the certificate and private key for the Hyperledger Fabric administrator and copying these certificates in the file `certificates`. Note that these certificates change every time we boostrap the fabric network.

Navigate to the folder you just created and follow *step five*, creating a business network card for the Hyperledger Fabric administrator:
`````
composer card create -p connection.json -u PeerAdmin -c Admin@org1.example.com-cert.pem -k 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin
`````
Follow *step six* to import the business network card for the Hyperledger Fabric administrator,
`````
composer card import -f PeerAdmin@fabric-network.card
`````
In *step seven* we install the Hyperledger Composer business network onto the Hyperledger Fabric peer nodes. The business network `degree` is defined in bna file, `degree@0.0.1.bna` and its located in the repository. A forlder with the specific business network model files, scripts and queries that are packaged in the bna file (using `composer archive create`) is located in the [blockdegree repository](https://github.com/ccastroiragorri/blockdegree/tree/master/degree-bnav2). 
`````
composer network install -c PeerAdmin@fabric-network -a degree@0.0.1.bna
`````
In *step eight* we start the blockchain business network
`````
composer network start --networkName degree --networkVersion 0.0.1 -A admin -S adminpw -c PeerAdmin@fabric-network
`````
In *step nine* we import the business network card for the business network administrator
`````
composer card import -f admin@degree.card
`````
In *step ten* we test the connection to the blockchain business network
`````
composer network ping -c admin@degree
`````
## Interacting with the business network using the REST server

To create the REST API run the following command: 
`````
composer-rest-server
`````
use `admin@degree` as the card name and select: never use namespaces; not to secure the generated API; yes to enable event publication; no to enable TLS security.

## Interacting with an Angular application

In order to build the user interfaces for this busness network please clone the repository and follow the instructions

`````
git clone https://github.com/Blockchain4openscience/bforos-frontend
`````
Now navigate to the folder. Check that npm is installed by running
`````
npm -v
`````
otherwise run. Although npm might already be installed, re-intalling npm is important to update any dependencies.
`````
npm install
`````
Once the installation is complete run,
`````
npm start
`````
OJO aqui encuantre un error, no encuentra los objetos no se si sea un problema con REST-SERVER API.

and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

-----
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Destroy a previous set up
`````
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
`````