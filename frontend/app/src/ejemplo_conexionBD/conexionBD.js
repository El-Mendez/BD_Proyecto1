//Para instalar la libreria: npm i pg
const { Pool,  Client } = require('pg') //Pool y Client son casi lo mismo

const config = {
    user: 'patito',
    host: 'postgresql-24257-0.cloudclusters.net',
    database: 'Musica',
    password: 'j_es_un_traicionero',
    port: 24257,
}

const pool = new Pool (config);

//pool.connect();           //Esto se debe de colocar si se utiliza Client en vez de Pool

const ObtenerDatos = async () => {
    try{
        const res = await pool.query ("select * from prueba;");
        console.log(res.rows);
        console.log(res.command);
        pool.end();                         //Esto solo para cuando se quiera imprimir el resultado en consola, en la pagina web se elimina esto

    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD")
    }}

const insertarDatos = async () => {
    try{
        const valor = 'insert into prueba values ($1)';
        const values = ['SOMEBODY KILL ME']
        await pool.query(valor, values)           //Lo se, soy muy creativo con los nombres
    }catch(e){
        console.log("Ha ocurrido un error con la conexion a la BD")
    }}
//insertarDatos()
ObtenerDatos()