const { Usuarios, UserRecommendation, Cancion, ArtistRecommendation } = require('./models');

const topGenres = async () => {
    const recommendation = [];
    let user_recommendation = {};

    const users = Usuarios.aggregate([
        {$unwind: "$reproducciones"},

        {$unwind: "$reproducciones.generos"},

        {
            $group: {
                _id: {usuario: "$_id", genre: "$reproducciones.generos._id"},
                total: {$sum: 1}
            }
        },

        {$sort: {"total": -1}},

        {
            $group: {
                _id: "$_id.usuario",
                genres: {
                    $push: {
                        id_genre: "$_id.genre",
                        total: "$total"
                    },

                }
            }

        },

        {$project: {genre: {$slice: ["$genres", 1]}}},
    ])

    for await (const user of users) {
        user_recommendation = {_id: user._id, recomendaciones: []}
        const songs = Cancion.aggregate([
            {$unwind: "$generos"},
            {$match: {'generos._id': user.genre[0].id_genre}},
            {$sample: {size: 5}},
            {$project:{cancion:"$nombre_cancion"}}
        ])
        for await (const song of songs) {
            user_recommendation.recomendaciones.push(song.cancion)
        }
        recommendation.push(user_recommendation);
    }

    for (var i = 0; i < recommendation.length; i++) {
        await (UserRecommendation.findByIdAndUpdate(recommendation[i]._id,{ ...recommendation[i] },
            { new: true, useFindAndModify: false, upsert: true }
        ))
    }

}

const topArtists = async () => {
    const recommendation = [];
    let user_recommendation = {};
    let r_song = {};
    const users = Usuarios.aggregate([
        { $unwind: "$reproducciones" },

        { $group: {
                _id:{ usuario:"$_id", id_artist:"$reproducciones.id_artista", artist:"$reproducciones.nombre_artista"},
                total:{$sum:1}
            }
        },

        {$sort: {"total": -1}},

        { $group: {
                _id:"$_id.usuario",
                artists: {
                    $push: {
                        id_artist:"$_id.id_artist",
                        artist: "$_id.artist",
                        total:"$total"
                    }
                }}
        },

        { $project: { artist: {$slice: [ "$artists", 1 ] }}  },
    ])

    for await (const user of users) {
        user_recommendation = {_id: user._id, artista:user.artist[0].artist, recomendaciones: []}
        const songs = Cancion.aggregate([
            {$unwind: "$generos"},
            {$match: {id_artista: user.artist[0].id_artist}},
            {$sample: {size: 5}},
            {$project:{cancion:"$nombre_cancion", artista: "$nombre_artista"}}
        ])
        for await (const song of songs) {
            r_song = {_id: song._id, cancion: song.cancion}
            user_recommendation.recomendaciones.push(r_song)
        }
        recommendation.push(user_recommendation);
    }

    for (var i = 0; i < recommendation.length; i++) {
        await (ArtistRecommendation.findByIdAndUpdate(recommendation[i]._id,{ ...recommendation[i] },
            { new: true, useFindAndModify: false, upsert: true }
        ))
    }

}


const topSongs = async () => {
    let user_recommendation = {};
    const top_songs = Usuarios.aggregate([
        {$unwind: "$reproducciones"},

        {
            $group: {
                _id: "$reproducciones.nombre_cancion",
                total: {$sum: "$reproducciones.reproduccion"}
            }
        },

        {$sort: {"total": -1}},
        {$limit: 7},

        {$project: {nombre: "$reproducciones.nombre_cancion"}}
    ])

    user_recommendation = {_id: 'Zara12', recomendaciones: []}

    for await (const song of top_songs) {
        user_recommendation.recomendaciones.push(song._id)
        console.log('--Canción: ' + song._id)
    }


}

module.exports = { topGenres, topSongs, topArtists }



const queryQueNoSirve = `db.getCollection("usuarios").aggregate([
  { $unwind: "$reproducciones" },
  {
    $group: {
      _id: { username: "$_id", artista: "$reproducciones.id_artista"},
      nombre_artista_favorito: { $first: "$reproducciones.nombre_artista" },
      reproducciones: {"$sum": 1}
    }
  },

  { $sort: { "reproducciones": -1} },

  {
    $group: {
      _id: "$_id.username",
      id_artista_favorito: { $first: "$_id.artista" },
      nombre_artista_favorito: { $first: "$nombre_artista_favorito" }
    }
  },

  {
    $lookup: {
      from: "canciones",
      let: { artist_identifier: "$id_artista_favorito" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$id_artista", "$$artist_identifier"] }
          }
        },
        { $limit: 5 },
        { $project: { _id: 1, nombre_cancion: 1 }  }
      ],
      as: "recomendadas"
    }
  }
])

`
