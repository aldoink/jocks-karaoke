package com.jockskaraoke.main;

import io.javalin.Javalin
import org.flywaydb.core.Flyway

fun main() {
    val flyway = Flyway.configure().dataSource(
            "jdbc:mysql://localhost:3306/jocks-karaoke",
            "root",
            System.getenv("MYSQL_ROOT_PASSWORD"))
            .load()
    flyway.migrate()

    val app = Javalin.create().start(7000)
    app.get("/") { ctx ->
        ctx.result("Served via Caddy!")
    }
}