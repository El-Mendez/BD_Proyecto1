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

module.exports = pool
