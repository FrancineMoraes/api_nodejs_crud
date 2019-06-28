const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test_nave',
    multipleStatements: true
});

mysqlConnection.connect((error) => {
    if(!error)
    {
        console.log('DB connection succeded');
    }
    else
    {
        console.log('DB connection failed \n Error : ' + JSON.stringify(error, undefined, 2));
    }
});

app.listen(3000, () => console.log('Express server is running at port -  3000'));


// --------------------------------------- POSTS ---------------------------------------------------

//Get all posts
app.get('/posts/:user', (request, response) => {

    let sql = 'SELECT * FROM posts where user_id = ' + request.params.user;

    mysqlConnection.query(sql, (error, rows, fields) => {
        if(!error)
        {
            response.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
});

//Get all posts order by data
app.get('/posts', (request, response) => {
    mysqlConnection.query('SELECT * FROM posts order by created_at desc', (error, rows, fields) => {
        if(!error)
        {
            response.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
});

//Get one post
app.get('/posts/:id/:user', (request, response) => {
    mysqlConnection.query('SELECT * FROM posts where id = ? or user_id = ?', [request.params.id, request.params.user], (error, rows, fields) => {
        if(!error)
        {
            response.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
});

//Delete one post
app.delete('/posts/:id/:user', (request, response) => {
    mysqlConnection.query('DELETE FROM posts where id = ? and user_id = ?', [request.params.id, request.params.user], (error, rows, fields) => {
        if(!error)
        {
            response.send('Deleted successfully');
        }
        else
        {
            console.log(error);
        }
    })
});

//Insert a post
app.post('/posts/:user', (request, response) => {
    
    let data = request.body;
   
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    let sql = "INSERT INTO posts (description, created_at, user_id) values ('" + data.description + "', '" + dateTime + "', '" + request.params.user +"');";

    mysqlConnection.query(sql, [request.params.user], (error, rows, fields) => {
        if(!error)
        {
            response.send('Registered successfuly!');
        }
        else
        {
            console.log(error);
        }
    })  
});

//Update a post
app.put('/posts/:id', (request, response) => {
    let data = request.body;
    let sql = "UPDATE posts SET description = '" + data.description + "' where id = '" + request.params.id + "';";

    mysqlConnection.query(sql, (error, rows, fields) => {
        if(!error)
        {
            response.send('Updated successfuly');
        }
        else
        {
            console.log(error);
        }
    })
});

// ---------------------------------------- END POSTS ------------------------------------------------


// ---------------------------------------- COMMENTS ------------------------------------------------

//Get all comments from a post
app.get('/comments/:post/:user', (request, response) => {
    mysqlConnection.query('SELECT * FROM comments where post_id = ' + request.params.post + ' or user_id = ' + request.params.user , [request.params], (error, rows, fields) => {
        if(!error)
        {
            response.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
});

//Get one comment
app.get('/comment/:id/:post/:user', (request, response) => {
    mysqlConnection.query('SELECT * FROM comments where id = ' + request.params.id + ' and post_id = ' + request.params.post + ' or user_id = ' + request.params.user, [request.params], (error, rows, fields) => {
        if(!error)
        {
            response.send(rows);
        }
        else
        {
            console.log(error);
        }
    })
});

//Delete one comment
app.delete('/comments/:id/:post/:user', (request, response) => {
    mysqlConnection.query('DELETE FROM comments where id = ? and post_id = ? or user_id = ?', [request.params.id, request.params.post, request.params.user], (error, rows, fields) => {
        if(!error)
        {
            response.send('Deleted successfully');
        }
        else
        {
            console.log(error);
        }
    })
});

//Insert one comment
app.post('/comments/:post/:user', (request, response) => {
    
    let data = request.body;

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    let sql = "INSERT INTO comments (description, created_at, post_id, user_id) values ('" + data.description + "', '" + dateTime +"', " + request.params.post +", " + request.params.user + ");";

    mysqlConnection.query(sql, (error, rows, fields) => {
        if(!error)
        {
            response.send('Registered successfuly!');
        }
        else
        {
            console.log(error);
        }
    })  
});

//Update a user
app.put('/comment/:id/:post/:user', (request, response) => {

    let data = request.body;
    let sql = "UPDATE comments SET description = '" + data.description + "' where id = '" + request.params.id + "' and post_id = '" + request.params.post + "' and user_id = '" + request.params.user + "';";

    mysqlConnection.query(sql, (error, rows, fields) => {
        if(!error)
        {
            response.send('Updated successfuly!');
        }
        else
        {
            console.log(error);
        }
    });

});

// -------------------------------------- END COMMENTS ------------------------------------------------


// -------------------------------------- USERS -------------------------------------------------------

//Insert a user
app.post('/user', (request, response) => {

    const bcrypt = require('bcrypt');
    let data = request.body;
    let validate = "SELECT * FROM users where username = '" + data.username + "'";

    mysqlConnection.query(validate, (error, rows, fields) => {
        if(!error)
        {
            //If user does not exists create a new user
            if(rows.length == 0)
            {
                var salt = bcrypt.genSaltSync(10);
                var password = bcrypt.hashSync(data.password, salt);

                let sql = "INSERT INTO users (username, password) values ('" + data.username + "', '" + password +"');";

                mysqlConnection.query(sql, (error, rows, fields) => {
                    if(!error)
                    {
                        response.send('Registered successfuly!');
                    }
                    else
                    {
                        console.log(error);
                    }
                })  
            }
            //If user exist send a message saying that user exist
            else if(rows.length > 0)
            {
                response.send('Usuário já existe');
            }
        }
        else
        {
            console.log(error);
        }
    });

});

//Update a user
app.put('/user/:id', (request, response) => {

    const bcrypt = require('bcrypt');

    let data = request.body;
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(data.password, salt);
    let sql = "UPDATE users SET username = '" + data.username + "', password = '" + password + "' where id = '" + request.params.id + "';";

    mysqlConnection.query(sql, (error, rows, fields) => {
        if(!error)
        {
            response.send('Updated successfuly!');
        }
        else
        {
            console.log(error);
        }
    });

});


//Get a user
app.get('/user/:id', (request, response) => {

    let sql = "SELECT * FROM users where id = " + request.params.id;

    mysqlConnection.query(sql, (error, rows, fields) => {
        if(!error)
        {
            response.send(rows);
        }
        else
        {
            console.log(error);
        }
    });

});

//Delete a user
app.delete('/user/:id', (request, response) => {
    mysqlConnection.query('DELETE FROM users where id = ?', [request.params.id], (error, rows, fields) => {
        if(!error)
        {
            response.send('Deleted successfully');
        }
        else
        {
            console.log(error);
        }
    })
});