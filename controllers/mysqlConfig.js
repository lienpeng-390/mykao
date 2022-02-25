
var mysql = require('mysql');
var config = require('./defaultConfig');

var pool = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
});

let allServices = {
	query(sql, values) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				if (err) reject(err)
				connection.query(sql, values, (err, rows) => {
					if (err) reject(err) 
					resolve(rows)
					connection.release()
				})
				
			})
		})

	},
	findAllUser() {
		let _sql = `SELECT * FROM user;`
		return allServices.query(_sql)
	},
	findUserData(params) {
		if(Object.keys(params).length) {
			let str = ''
			if(Object.keys(params).length == 1) {
				str = `${Object.keys(params)[0]} = ?`
			} else {
				Object.keys(params).forEach((v, index) => {
					if(index != Object.keys(params).length -1) {
						str+=`${v} = ? AND `
					} else {
						str+=`${v} = ?`
					}
				});
			}
			let _sql = `SELECT * FROM user WHERE ${str};`
			return allServices.query(_sql, Object.values(params))
		} else {
			let _sql = `SELECT * FROM user ;`
			return allServices.query(_sql)
		}
		

		
	},
	addUserData(obj) {
		let _sql = "INSERT INTO user SET ?;"
		return allServices.query(_sql, obj)
	},
	updateData({ passWord,  userName }) {
		let _sql = `UPDATE user SET passWord = ${passWord} WHERE userName = '${userName}';`
		return allServices.query(_sql)
	},

	deleteData({ userName }) {
		let _sql = `DELETE FROM user WHERE userName = '${userName}';`
		return allServices.query(_sql)
	},
}

module.exports = allServices;