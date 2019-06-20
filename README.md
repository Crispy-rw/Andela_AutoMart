# Andela_AutoMart
[![Build Status](https://travis-ci.org/crispy1996/Andela_AutoMart.svg?branch=develop)](https://travis-ci.org/crispy1996/Andela_AutoMart)

[![Coverage Status](https://coveralls.io/repos/github/crispy1996/Andela_AutoMart/badge.svg?branch=Chore-adding-badges-%23166674243)](https://coveralls.io/github/crispy1996/Andela_AutoMart?branch=Chore-adding-badges-%23166674243)

[![Maintainability](https://api.codeclimate.com/v1/badges/e6716b48dc2ded4f2c27/maintainability)](https://codeclimate.com/github/crispy1996/Andela_AutoMart/maintainability)


Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart,  can sell their cars or buy from trusted dealerships or private sellers

------------------------------------------------------------------------------

## UI

## User Interface (UI)
* HTML
* CSS
* Javascript

### GitHub Pages link for UI
[AutoMart/UI link](https://crispy1996.github.io/Andela_AutoMart/UI)

---------------------------------------------------------------------

## SERVER

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/auth/signup| POST | Get the user to signup |
| /api/v1/auth/login | POST | Get the user to login |
| /api/v1/car | POST | Get the user to post a car sale advertisement |
| /api/v1/order | POST | Get the user to make a purchase order |
| /api/v1/cars/:id/ | PATCH | Get the user to update the price of his/her posted car sale ad |
| /api/v1/order/:id | PATCH | Get the user to update the price or his/her purchase order |
| /api/v1/car/:id | PATCH | Get user to mark his/her posted AD as sold  |
| /api/v1/car/:id | GET | Get user to view a specific car |
| /api/v1/GET /car?status=available | GET | Get user to User can view all unsold cars |
| /api/v1/cars?status=available&min_price=XXXValue&max_price=XXXValue | GET | Get the user to view all unsold cars within a price range |
| /api/v1/car | GET | Get the Aamin to view all posted ads whether sold or unsold |
| /api/v1/car | GET | Get the user to view all used unsold cars |
| /api/v1/car | GET | Get the user to view all new unsold cars |
| /api/v1/car/:id | DELETE | Get the admin to delete a posted AD record |

## Used Tools

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Testing Framework and assertion library
```
 *Mocha* and *Chai*
 ```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### Heroku link Example
[AutoMart heroku link](https://auto-mart-ch.herokuapp.com)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository ```https://github.com/crispy1996/Andela_AutoMart.git``` or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```


## Author
- Nshimyumukiza Christian <nshimyumukizachristian@gmail.com>

---

## License & copyright
Copyright (c) Nshimyumukiza Christian, Junior Software developer



