import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        // padroniza o caminho para acesso ao arquivo
        filename: path.resolve( __dirname, 'database.sqlite'), 
    },
    useNullAsDefault: true,
})

export default connection;

// Migrations = Histório do banco de dados

// create table points
// create table users




