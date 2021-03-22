const pool = require('./datosBD')
export default obtenerDatosCancion = async (nombreCancion) => {
    try{
        let query = 'select c.nombre as cancion, a.nombre as artista, g.nombre as genero from canciones c'
        query += ' inner join artista a on c.id_artista = a.Id_artista'
        query += ' inner join genero_canciones gc on c.id_cancion = gc.id_canciones'
        query += ' inner join genero g on g.id_genero = gc.id_genero'
        query += ' where c.nombre = $1%'
        const res = await pool.query (nombreCancion, query);
        res.rows.map(val => {
            let artista = val.artista;
            let cancion = val.cancion;
            let genero = val.genero;
            /* console.log('Nombre Cancion: ' + cancion)
            console.log('Nombre artista: ' + artista)
            console.log('Nombre artista: ' + genero) */
        }) 
        pool.end()
        return artista, cancion, genero;
        
    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD: " + e)
        pool.end();     
        return null                    
    }
}
