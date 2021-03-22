const pool = require('./datosBD')
export default insertNewUser = async (username, contraseña, nombres, apellidos, correo, id_tipoUsuario) => {
    try{
        let query = "insert into usuarios values ($1, crypt('$2', gen_salt('bf')), $3, $4, $5, $6);";
        await pool.query([username, contraseña, nombres, apellidos, correo, id_tipoUsuario], query)
        pool.end();              
    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD")
        pool.end(); 
    }}