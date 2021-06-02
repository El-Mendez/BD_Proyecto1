// Complaciendo a Orlando y Méndez


db.canciones.aggregate([
    {$unwind: "$generos"},

    {$sample: {size: 3}},
    {$project:{cancion:"$nombre_cancion"}}
])


db.canciones.aggregate([
    { $unwind: "$generos" },
    {
        $lookup: {
            from: "genre_recommendation",
            localField: "generos._id",
            foreignField: "genre_recommendation.genre._id",
            as: "grp"
        }
    },
])

// Consulta del número de reproducciones por artista para cada usuario
db.usuarios.aggregate([
    { $unwind: "$reproducciones" },

    { $group: {
            _id:{ usuario:"$_id", artist:"$reproducciones.nombre_artista"},
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

// Recomendación de canciones más escuchadas
db.usuarios.aggregate([
    { $unwind: "$reproducciones" },

    { $group: {
            _id: "$reproducciones.nombre_cancion",
            total:{$sum:"$reproducciones.reproduccion"}
        }
    },

    {$sort: {"total": -1}},
    {$limit: 5},

    {$project: {nombre: "$reproducciones.nombre_cancion"}}
])
