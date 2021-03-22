const pool = require('./datosBD')
const ObtenerDatosUsuario = async (id) => {
    try{
        let query = 'select u.username, u.nombres, u.apellidos, u.correo, tu.descripcion from usuarios u'
        query += ' inner join tipo_usuario tu on u.id_tipoUsuario = tu.id_tipoUsuario'
        query += " where u.username ilike '$1' "
        const res = await pool.query (query, id);
        res.rows.map(val => {
            let username = val.username;
            let nombres = val.nombres;
            let apellidos = val.apellidos;
            let correo = val.correo;
            let descripcion = val.descripcion;
            /* console.log('username: ' + username)
            console.log('nombres: ' + nombres)
            console.log('apellidos: ' + apellidos)
            console.log('correo: ' + correo)
            console.log('descripcion: ' + descripcion) */
        });
        pool.end();                         

    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD: " + e)
    }}
ObtenerDatosUsuario()