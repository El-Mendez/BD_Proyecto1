const pool = require('./datosBD')
const insertBD = async () => {
    try{
        const valor = 'insert into prueba values ($1)';
        const values = ['SOMEBODY KILL ME']
        await pool.query(valor, values)           //Lo se, soy muy creativo con los nombres
    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD")
    }}