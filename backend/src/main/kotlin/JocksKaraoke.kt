package com.jockskaraoke.main

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.crud
import org.jetbrains.exposed.sql.Database

class JocksKaraoke() {

    init {
        val app = Javalin.create().start(7000)
        Database.connect(
            url = JDBC_URL,
            driver = "com.mysql.cj.jdbc.Driver",
            user = "root",
            password = System.getenv("MYSQL_ROOT_PASSWORD")
        )
        app.routes {
            crud("songs/:songId", SongHandler())
        }
    }
}