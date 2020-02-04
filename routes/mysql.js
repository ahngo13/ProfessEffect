const mysql = require('mysql');

const db_config = {
    host: "70.12.113.171",
    user: "test",
    password: "test",
    port:"3307",
    database:"professeffect"
}

const con = mysql.createPool(db_config);

/* const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    port:"3307",
    database:"professeffect"
}); */

con.getConnection(function(err){
    if(err) {
        console.log("\n\t *** Cannot establish a connection with the database. ***");

        con = reconnect(con);
    }else {
        console.log("\n\t *** New connection established with the database. ***")
    }
});

function reconnect(con){
    console.log("\n New connection tentative...");

    con = mysql_npm.createPool(db_config);

    con.getConnection(function(err){
        if(err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect(con), 2000);
        }else {
            console.log("\n\t *** New connection established with the database. ***")
            return con;
        }
    });
}


con.on('error', function(err) {

    if(err.code === "PROTOCOL_CONNECTION_LOST"){    
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(con);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(con);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(con);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
    }

    else{
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(con);
    }

});

module.exports = con;