//const pool = require('./datosBD')

import pool from './datosBD';

const verificarUsuario = async (username, password) => {
    try{
        let query = "SELECT * FROM usuarios u WHERE "
        query += " u.username like $1 AND "
        query += "contraseña = crypt($2, contraseña);"
        const res = await pool.query (query, [username, password]);   
        if(res.rowCount > 0){
            pool.end();   
            return true;
        }else {
            pool.end();
            return false;
        }
    }catch(e){
        console.log("Usuario o contraseña incorrecta: " + e)
        pool.end();                         
        return false;
    }
}

export default verificarUsuario;
//verificarUsuario('Zara12', 'noSequePoner')
