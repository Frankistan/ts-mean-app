import mysql from "promise-mysql";

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

pool.getConnection().then(connection => {
	pool.releaseConnection(connection);
	console.log("DB is Connected");
});

export default pool;
