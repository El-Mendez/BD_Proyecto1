const { Usuarios, GenreRecommendation } = require('./models');

const fillRecommendation = () => {
    GenreRecommendation.insertMany(Usuarios.aggregate([
            { $unwind: "$reproducciones" },

            { $unwind: "$reproducciones.generos" },

            { $group: {
                    _id:{ usuario:"$_id", genre:"$reproducciones.generos._id"},
                    total:{$sum:1}
                }
            },

            {$sort: {"total": -1}},

            { $group: {
                    _id:"$_id.usuario",
                    genres: {
                        $push: {
                            id_genre:"$_id.genre",
                            total:"$total"
                        },

                    }}

            },

            { $project: { genre: {$slice: [ "$genres", 1 ] }}  },
        ])

    )
}


module.exports = { fillRecommendation }




