const pool = require('./datosBD')
const ObtenerDatos = async () => {
    try{
        let query = 'select * from prueba2'
        const res = await pool.query (query);
        res.rows.map(val => {
            console.log(val.columna1);
            console.log(val.columna2);
            console.log(val.columna3);
        });
        console.log(res.command);
        pool.end();                         //Esto solo para cuando se quiera imprimir el resultado en consola, en la pagina web se elimina esto

    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD: " + e)
    }}

