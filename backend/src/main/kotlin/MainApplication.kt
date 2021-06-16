package com.jockskaraoke.main;

import org.flywaydb.core.Flyway

const val JDBC_URL = "jdbc:mysql://localhost:3306/jocks-karaoke"

fun main() {
    val flyway = Flyway.configure().dataSource(
        JDBC_URL,
        "root",
        System.getenv("MYSQL_ROOT_PASSWORD")
    )
        .load()
    flyway.migrate()

    JocksKaraoke()
}