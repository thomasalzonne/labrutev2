/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTableIfNotExists('users', function (table) {
       table.increments('id');
       table.string('username', 255).notNullable();
       table.string('password', 255).notNullable();
    })
    .createTableIfNotExists('characters', function (table) {
        table.increments('id');
        table.integer('level');
        table.string('name');
        table.integer('strength');
        table.integer('agility');
        table.integer('speed');
        table.integer('vitality');
        table.integer('defence');
     })
     .createTableIfNotExists('pets', function (table) {
         table.increments('id');
         table.string('name');
         table.string('picture');
         table.integer('strength');
         table.integer('agility');
         table.integer('speed');
         table.integer('vitality');
         table.integer('defence');
     })
     .createTableIfNotExists('weapons', function (table) {
         table.increments('id');
         table.string('name');
         table.string('picture');
         table.integer('strength');
         table.integer('agility');
         table.integer('speed');
     })
     .createTableIfNotExists('characters_weapons', function (table) {
         table.increments('id');
         table.integer('character_id')
              .unsigned()
              .references('id')
              .inTable('characters');
         table.integer('weapon_id')
              .unsigned()
              .references('id')
              .inTable('weapons');
     })
     .createTableIfNotExists('characters_pets', function (table) {
         table.increments('id');
         table.integer('character_id')
              .unsigned()
              .references('id')
              .inTable('characters');
         table.integer('pet_id')
              .unsigned()
              .references('id')
              .inTable('pets');
     })
     .createTableIfNotExists('users_characters', function (table) {
         table.increments('id');
         table.integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users');
         table.integer('character_id')
              .unsigned()
              .references('id')
              .inTable('characters');
     })
     .createTableIfNotExists('messages', function (table) {
        table.increments('id');
        table.text('message');
        table.string('user');
    })
     .catch(err => {
        console.error(err)
        throw err
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("users")
      .dropTableIfExists("characters")
      .dropTableIfExists("pets")
      .dropTableIfExists("weapons");
};
