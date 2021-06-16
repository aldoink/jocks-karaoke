package com.jockskaraoke.main

import io.javalin.apibuilder.CrudHandler
import io.javalin.http.Context
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.LoggerFactory

class SongHandler : CrudHandler {

    val logger = LoggerFactory.getLogger(this::class.java)

    override fun create(ctx: Context) {
        TODO("Not yet implemented")
    }

    override fun delete(ctx: Context, resourceId: String) {
        TODO("Not yet implemented")
    }

    override fun getAll(ctx: Context) {
        transaction {
            Song.all()
        }
    }

    override fun getOne(ctx: Context, resourceId: String) {
        TODO("Not yet implemented")
    }

    override fun update(ctx: Context, resourceId: String) {
        TODO("Not yet implemented")
    }

}
