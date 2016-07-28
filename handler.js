const Pokeio = require('pokemon-go-node-api');
const Immutable = require('immutable');
const config = require('./config.json');

const pokedex = new Immutable.Map(Pokeio.pokemonlist.map(p => [p.id, Immutable.fromJS(p)]));
const locationType = 'coords';

module.exports.getPokegoNearby = (event, context, cb) => {
  const latitude = parseFloat(event.query.lat) || -37.867877;
  const longitude = parseFloat(event.query.lon) || 144.974005;
  const altitude = parseFloat(event.query.alt) || 5;
  const location = {
    type:  locationType,
    coords: {
      latitude: latitude,
      longitude: longitude,
      altitude: altitude
    }
  };

  Pokeio.init(config.username, config.password, location, config.provider, function(err) {
    if (err) {
      console.log(err);
      cb(err);
    }

    Pokeio.Heartbeat(function(err, heartbeat) {
      if (err) {
        console.log(err);
        cb(err);
      }

      const mapPokemon = new Immutable.Map(
        Immutable.fromJS(heartbeat.cells.map(cell => cell.MapPokemon))
          .flatten()
          .map(p => [p.PokedexTypeId.toString(), Immutable.fromJS(Object.assign({}, p))])
        );

      const mapPokemonWithPokedexData = mapPokemon.mergeDeep(pokedex.filter((p, id) => mapPokemon.has(id)));

      const nearbyPokemon = new Immutable.Map(
        Immutable.fromJS(heartbeat.cells.map(cell => cell.NearbyPokemon))
          .flatten()
          .map(p => [p.PokedexNumber.toString(), Immutable.fromJS(Object.assign({}, p))])
        );

      const nearbyPokemonWithPokedexData = nearbyPokemon.mergeDeep(pokedex.filter((p, id) => nearbyPokemon.has(id)));

      const wildPokemon = new Immutable.Map(
        Immutable.fromJS(heartbeat.cells.map(cell => cell.WildPokemon))
          .flatten()
          .map(p => [p.pokemon.PokemonId.toString(), Immutable.fromJS(Object.assign({}, p))])
        );

      const wildPokemonWithPokedexData = wildPokemon.mergeDeep(pokedex.filter((p, id) => wildPokemon.has(id)));

      const response = {
        mapPokemon: mapPokemonWithPokedexData,
        nearbyPokemon: nearbyPokemonWithPokedexData,
        wildPokemon: wildPokemonWithPokedexData
      }

      cb(null, response);
    });
  });
}

module.exports.getPokegoNearbyRaw = (event, context, cb) => {
  const latitude = parseFloat(event.query.lat) || -37.867877;
  const longitude = parseFloat(event.query.lon) || 144.974005;
  const altitude = parseFloat(event.query.alt) || 5;
  const location = {
    type:  locationType,
    coords: {
      latitude: latitude,
      longitude: longitude,
      altitude: altitude
    }
  };

  Pokeio.init(username, key, location, provider, function(err) {
    if (err) {
      console.log(err);
      cb(err);
    }

    Pokeio.Heartbeat(function(err, hb) {
      if (err) {
        console.log(err);
        cb(err);
      }

      cb(null, hb);
    });
  });
}
