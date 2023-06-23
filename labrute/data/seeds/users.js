/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const bcrypt= require("bcrypt")
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'Totz', password: bcrypt.hashSync('azerty31', 10)},
    {id: 2, username: 'Vinz', password: bcrypt.hashSync('azerty31', 10)},
    {id: 3, username: 'Romz', password: bcrypt.hashSync('azerty31', 10)},
    {id: 4, username: 'Janu', password: bcrypt.hashSync('azerty31', 10)},
  ]);
};
