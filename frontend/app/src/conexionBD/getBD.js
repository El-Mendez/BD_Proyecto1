const pool = require('./datosBD')
const ObtenerDatos = async (tabla, datos) => {
    try{
        let query = 'select $1 from $2'
        const res = await pool.query([tabla, datos], query)
        res.rows.map(val => {
            console.log(val.columna1);
        });
        console.log(res.command);
        pool.end();                         

    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD: " + e)
    }}

