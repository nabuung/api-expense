# API endpoint for Expense Management
This is API Endpoint for Expense Management

# Available Operation
1. Create Expense: POST /expense

# Knex configuration
Knex is used to create database table using knex migration. It is not used during normal API operation.

To use knex, create file ```knexfile.js```, with the following content:
```
export const development = {
    client: 'cockroachdb',
    connection: <connection string>
  }
```
The value of ```<connection string>``` should be taken from output of cockroach DB. Sample value is ```postgresql://root@127.0.0.1:26257/movr?sslmode=disable```. Run cockroachdb with the following command:

```
cockroach demo --insecure
```
