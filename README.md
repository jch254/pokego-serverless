# pokego-serverless

![Pokemon](https://upload.wikimedia.org/wikipedia/commons/f/f7/English_Pok%C3%A9mon_logo.svg)

## Overview

Serverless-powered API to fetch nearby Pokemon Go data. Currently returns mapPokemon, nearbyPokemon and wildPokemon.

Technologies used
* [Serverless v1.0](https://github.com/serverless/serverless/tree/v1.0/)
* [Poke.io](https://github.com/Armax/Pokemon-GO-node-api)
* [Immutable](https://github.com/facebook/immutable-js/)

## Live Demo

![Live Demo](https://img.jch254.com/PokemonDemo.png)

https://1kse7tu24a.execute-api.us-east-1.amazonaws.com/dev/nearby?lat=-12.462827&lon=130.841782&alt=27.8

Adjust lat, lon and alt parameters as needed.

Please note that live demo is rate-limited ;)

## Deploying to AWS

1. ```cp config.json_template config.json```
2. Update config.json with your Pokemon Go account details
3. ```npm install -g serverless@alpha```
4. ```npm install```
5. ```cp serverless.env.yaml_template serverless.env.yaml```
6. ```serverless deploy```

You will need to build/npm install against an Amazon Linux image on EC2 in order for the compiled node_modules to be usable on their Lambda service. See [here](https://aws.amazon.com/blogs/compute/nodejs-packages-in-lambda/) for more information.

## Good times!
