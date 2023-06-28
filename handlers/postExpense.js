'use strict';

import pg  from 'pg';

export async function postExpense(request, h) {
    const payload = request.payload;

    // Database configuration
    const { Pool } = pg;
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({
        connectionString,
        application_name: "$ api-expenses",
    });

    // Connect to database
    return pool.connect()
    .then ((client) => { 
        const sqlText = 'INSERT INTO expenses(user_id, expense_date, title, category, amount) VALUES ($1, $2, $3, $4, $5)';
        const sqlValue = ['0', payload.date, payload.title, payload.category, payload.amount];
        const result = client.query(sqlText, sqlValue);
        //console.log(result);
        return (result);
    })
    .then ((result)=>{ 
        //console.log(result);
        return h.response({
            status: 0,
            message: 'Record saved'
        }).code(200);
    })
    .catch((err) => {
        console.log(err);
        return h.response({
            status: 99,
            message: 'Record not saved'
        }).code(500); 
    });
}