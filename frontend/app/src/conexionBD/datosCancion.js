const pool = require('./datosBD')
class Cancion {
        constructor(artista, cancion, genero) {
        this.artista = artista;
        this.cancion = cancion;
        this.genero = genero;
    }

    getCancion(){
        return this.cancion;
    }
}
//Lo mas probable es que si prueban esto no tire nada, esto es debido a que la tabla "genero" no tiene ningun
//dato, por lo que el query no retorna nada
const obtenerDatosCancion = async (nombreCancion) => {
    var listaCanciones = [];
    try{
        let query = 'select c.nombre as cancion, a.nombre as artista, g.nombre as genero from canciones c'
        query += ' inner join artista a on c.id_artista = a.Id_artista'
        query += ' inner join genero_canciones gc on c.id_cancion = gc.id_canciones'
        query += ' inner join genero g on g.id_genero = gc.id_genero'
        query +=  " where c.nombre = $1"
        const res = await pool.query (query, [nombreCancion]);
        res.rows.map(val => {
            listaCanciones.push(new Cancion (val.artista, val.cancion, val.genero))
        }) 
        pool.end()
        //console.log(listaCanciones[0].artista)
        return listaCanciones;
        
    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD: " + e)
        pool.end();     
        //return null                    
    }
}
obtenerDatosCancion('Filthy')