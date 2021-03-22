const pool = require('./datosBD')
const insertBD = async (tabla, datos) => {
    try{
        let query = 'insert into $1 values ($2)';
        await pool.query([tabla, datos], query)
        pool.end();              
    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD")
    }}