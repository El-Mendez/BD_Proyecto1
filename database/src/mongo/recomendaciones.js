const { Usuarios, UserRecommendation, Cancion } = require('./models');

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
            console.log(song.cancion)
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

    const users = Usuarios.aggregate([
        { $unwind: "$reproducciones" },

        { $group: {
                _id:{ usuario:"$_id", artist:"$reproducciones.id_artista"},
                total:{$sum:1}
            }
        },

        {$sort: {"total": -1}},

        { $group: {
                _id:"$_id.usuario",
                artists: {
                    $push: {
                        artist:"$_id.artist",
                        total:"$total"
                    }
                }}
        },

        { $project: { artist: {$slice: [ "$artists", 1 ] }}  },
    ])

    for await (const user of users) {
        user_recommendation = {_id: user._id, recomendaciones: []}
        const songs = Cancion.aggregate([
            {$unwind: "$generos"},
            {$match: {id_artista: user.artist[0].artist}},
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


const topSongs = async (username) => {
    const recommendation = [];
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
        {$limit: 5},

        {$project: {nombre: "$reproducciones.nombre_cancion"}}
    ])

    user_recommendation = {_id: username, recomendaciones: []}
    recommendation.push(user_recommendation);

    for await (const song of top_songs) {
        user_recommendation.recomendaciones.push(song._id)
    }

    for (var i = 0; i < recommendation.length; i++) {
        await (UserRecommendation.findByIdAndUpdate(recommendation[i]._id,{ ...recommendation[i] },
            { new: true, useFindAndModify: false, upsert: true }
        ))
    }
}




module.exports = { topGenres, topSongs, topArtists }




