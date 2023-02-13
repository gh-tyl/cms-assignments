let http = require('http');
let fs = require('fs');

let user_columns = [
	{
		"c_name": "id",
		"c_type": "int",
	},
	{
		"c_name": "fname",
		"c_type": "text",
	},
	{
		"c_name": "lname",
		"c_type": "text",
	},
	{
		"c_name": "email",
		"c_type": "text",
	},
	{
		"c_name": "pass",
		"c_type": "text",
	},
	{
		"c_name": "role",
		"c_type": "text",
	}
];

let student_columns = [
	{
		"c_name": "studentid",
		"c_type": "int",
	},
	{
		"c_name": "fname",
		"c_type": "text",
	},
	{
		"c_name": "lname",
		"c_type": "text",
	},
	{
		"c_name": "email",
		"c_type": "text",
	},
	{
		"c_name": "pass",
		"c_type": "text",
	},
	{
		"c_name": "teacherid",
		"c_type": "int",
	},
	{
		"c_name": "gpa",
		"c_type": "float",
	},
	{
		"c_name": "findJob",
		"c_type": "int",
	},
	{
		"c_name": "role",
		"c_type": "text",
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
			let studentDrop = dropTableQuery("students");
			config.query(studentDrop, function (err, result) {
				if (err) throw err;
				console.log("Table dropped");
			});
			let studentTable = createTableQuery("students", student_columns);
			config.query(studentTable, function (err, result) {
				if (err) throw err;
				console.log("Table created");
			});
		})
		res.end('Hello World!');
	}

	if (req.url === '/insert') {
		let user_path = './data/users.json';
		user_json = readJson(user_path);
		console.log("user");
		for (let i = 0; i < user_json.length; i++) {
			let user = user_json[i];
			let role = "teacher";
			let user_values = [
				user.id,
				user.fname,
				user.lname,
				user.uname,
				user.pass,
				role
			];
			let sql = insertQuery("users", user_columns, user_values);
			config.query(sql, function (err, result) {
				// console.log(sql)
				if (err) throw err;
				// console.log("1 record inserted");
			});
		}
		console.log("student");
		let student_path = './data/students.json';
		student_json = readJson(student_path);
		for (let i = 0; i < student_json.length; i++) {
			let student = student_json[i];
			let role = "student";
			let student_values = [
				student.studentid,
				student.fname,
				student.lname,
				student.email,
				student.pass,
				student.teacherid,
				student.gpa,
				student.findJob,
				role
			];
			let sql = insertQuery("students", student_columns, student_values);
			// console.log(sql)
			config.query(sql, function (err, result) {
				if (err) throw err;
				// console.log("1 record inserted");
			});
		}
		res.end('Hello World!');
	}

	if (req.url === '/upload') {
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			let post = JSON.parse(body);
			console.log(post);
		});
		res.end('Hello World!');
	}

	if (req.url === '/login') {
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			let post = JSON.parse(body);
			console.log(post);
			if (post.role == "teacher") {
				var table = "users";
			} else {
				var table = "students";
			}
			let sql = "SELECT * FROM " + table + " WHERE email = '" + post.email + "' AND pass = '" + post.password + "'";
			config.query(sql, function (err, result) {
				if (err) throw err;
				if (result != null) {
					console.log(result);
					res.end(JSON.stringify(result));
				}
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
			let sql = ""
			if (post.role == "teacher") {
				// get teacher data and student data
				sql = "SELECT * FROM users WHERE id = '" + post.user_id + "'";
				// sql = "SELECT * FROM users WHERE id = '" + post.user_id + "'";
			} else {
				sql = "SELECT * FROM students WHERE studentid = '" + post.user_id + "'";
			}
			config.connect(function (err) {
				if (err) throw err;
				config.query(sql, function (err, result) {
					if (err) throw err;
					console.log(result);
					res.end(JSON.stringify(result));
				});
			});
		});
	}

	if (req.url === '/teacher') {
		// get student data
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			let post = JSON.parse(body);
			console.log(post);
			let sql = "SELECT * FROM students WHERE teacherid = '" + post.user_id + "'";
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
			let sql = ""
			if (post.role == "teacher") {
				sql = "UPDATE users SET pass = '" + post.password + "' WHERE id = '" + post.user_id + "'";
			} else {
				sql = "UPDATE students SET pass = '" + post.password + "' WHERE studentid = '" + post.user_id + "'";
			}
			config.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.end(JSON.stringify(result));
			});
		});
		// req.on('end', function () {
		// 	let post = JSON.parse(body);
		// 	console.log(post);
		// 	let sql = "UPDATE students SET pass = '" + post.password + "' WHERE studentid = '" + post.user_id + "'";
		// 	config.query(sql, function (err, result) {
		// 		if (err) throw err;
		// 		console.log(result);
		// 		res.end(JSON.stringify(result));
		// 	});
		// });
	}

});


server.listen(8080, 'localhost', function () {
	console.log('Server is running!');
});

function readJson(path) {
	let json = JSON.parse(fs.readFileSync(path, 'utf8'));
	// console.log(json);
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
		// sql += "'" + table_values[i] + "'";
		sql += '"' + table_values[i] + '"';
		if (i < table_values.length - 1) {
			sql += ", ";
		}
	}
	sql += ")";
	return sql;
}