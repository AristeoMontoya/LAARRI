const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST')
      console.error('CONECCION CON BASE DE DATOS PERDIDA');
    else
      if(err.code === 'ER_CON_COUNT_ERROR')
        console.error('LA BASE DE DATOS TIENE DEMASIADAS CONECCIONES');
      else
        if(err.code === 'ECONNREFUSED')
          console.error('CONECCION CON LA BASE DE DATOS RECHAZADA');
  }
  if(connection) {
    connection.release;
  }
  console.log('BASE DE DATOS CONECTADA 8]');
  return;
});

// PROMISIFY POOL QUERY (haces promesas lo que antes fue callback)
pool.query = promisify(pool.query);

module.exports = pool;
