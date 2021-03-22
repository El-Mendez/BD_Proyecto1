const pool = require('./datosBD')
export default verificarUsuario = async (username, password) => {
    try{
        let query = "SELECT * FROM usuarios u WHERE "
        query += " u.username Ilike $1 AND "
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
//verificarUsuario('Zara12', 'noSequePoner')
