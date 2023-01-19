let http = require('http');
let fs = require('fs');

let user_columns = [
	{
		"c_name": "uid",
		"c_type": "int",
	},
	{
		"c_name": "fname",
		"c_type": "varchar(255)",
	},
	{
		"c_name": "lname",
		"c_type": "varchar(255)",
	},
	{
		"c_name": "email",
		"c_type": "varchar(255)",
	},
	{
		"c_name": "pass",
		"c_type": "varchar(255)",
	},
	{
		"c_name": "role",
		"c_type": "int",
	}
];

let drug_columns = [
	{
		"c_name": "uid",
		"c_type": "int",
	},
	{
		"c_name": "ip_address",
		"c_type": "text",
	},
	{
		"c_name": "price",
		"c_type": "float",
	}
];

let server = http.createServer(function (req, res) {
	res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
	if (req.url === '/favicon.ico') {
		res.writeHead(200, { 'Content-Type': 'image/x-icon' });
		res.end();
		return;
	}
	if (req.url === '/init') {
		config.connect(function (err) {
			if (err) throw err;
			console.log("Connected!");
			let userDrop = dropTableQuery("users");
			config.query(userDrop, function (err, result) {
				if (err) throw err;
				console.log("Table dropped");
			});
			let userTable = createTableQuery("users", user_columns);
			config.query(userTable, function (err, result) {
				if (err) throw err;
				console.log("Table created");
			});
			let drugDrop = dropTableQuery("drugs");
			config.query(drugDrop, function (err, result) {
				if (err) throw err;
				console.log("Table dropped");
			});
			let drugTable = createTableQuery("drugs", drug_columns);
			config.query(drugTable, function (err, result) {
				if (err) throw err;
				console.log("Table created");
			});
		});
		let user_path = './data/users.json';
		user_json = readJson(user_path);
		for (let i = 0; i < user_json.length; i++) {
			let user = user_json[i];
			let user_values = [
				user.uid,
				user.fname,
				user.lname,
				user.email,
				user.pass,
				user.role
			];
			let sql = insertQuery("users", user_columns, user_values);
			config.query(sql, function (err, result) {
				if (err) throw err;
				console.log("1 record inserted");
			});
		}
		let drug_path = './data/drugs.json';
		drug_json = readJson(drug_path);
		for (let i = 0; i < drug_json.length; i++) {
			let drug = drug_json[i];
			drug.price = drug.price.substring(1);
			drug.price = parseFloat(drug.price);
			let drug_values = [
				drug.uid,
				drug.ip_address,
				drug.price,
			];
			let sql = insertQuery("drugs", drug_columns, drug_values);
			config.query(sql, function (err, result) {
				if (err) throw err;
				console.log("1 record inserted");
			});
		}
		res.end('Hello World!');
	}

	if (req.url === '/prescriptions') {
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			let post = JSON.parse(body);
			console.log(post);
			let sql = "SELECT * FROM drugs WHERE uid = '" + post.user_id + "'";
			config.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.end(JSON.stringify(result));
			});
		});
	}

	if (req.url === '/login') {
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			let post = JSON.parse(body);
			console.log(post);
			let sql = "SELECT * FROM users WHERE email = '" + post.email + "' AND pass = '" + post.password + "'";
			config.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.end(JSON.stringify(result));
			});
		});
	}

	if (req.url === '/user') {
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			let post = JSON.parse(body);
			console.log(post);
			let sql = "SELECT * FROM users WHERE uid = '" + post.user_id + "'";
			config.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.end(JSON.stringify(result));
			});
		});
	}

	if (req.url === '/change_password') {
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			let post = JSON.parse(body);
			console.log(post);
			let sql = "UPDATE users SET pass = '" + post.password + "' WHERE uid = '" + post.user_id + "'";
			config.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.end(JSON.stringify(result));
			});
		});
	}
});
server.listen(8080, 'localhost', function () {
	console.log('Server is running!');
});

function readJson(path) {
	let json = JSON.parse(fs.readFileSync(path, 'utf8'));
	console.log(json);
	return json;
}

let mysql = require('mysql2');
let config = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: 'exam_db'
});

function dropTableQuery(table_name) {
	return "DROP TABLE IF EXISTS " + table_name + ";";
}

function createTableQuery(table_name, table_columns) {
	let sql = "CREATE TABLE " + table_name + " (";
	for (let i = 0; i < table_columns.length; i++) {
		sql += table_columns[i].c_name + " " + table_columns[i].c_type;
		if (i < table_columns.length - 1) {
			sql += ", ";
		}
	}
	sql += ")";
	return sql;
}

function insertQuery(table_name, table_columns, table_values) {
	let sql = "INSERT INTO " + table_name + " (";
	for (let i = 0; i < table_columns.length; i++) {
		sql += table_columns[i].c_name;
		if (i < table_columns.length - 1) {
			sql += ", ";
		}
	}
	sql += ") VALUES (";
	for (let i = 0; i < table_values.length; i++) {
		sql += "'" + table_values[i] + "'";
		if (i < table_values.length - 1) {
			sql += ", ";
		}
	}
	sql += ")";
	return sql;
}