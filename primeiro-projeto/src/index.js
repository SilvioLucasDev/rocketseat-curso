const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

// Middleware
function verifyExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find(
        customer => customer.cpf === cpf
    );

    if (!customer) {
        return response.status(400).json({ error: "Customer not found!" });
    }

    request.customer = customer;

    return next();
};

// Calc extract for user
function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
};

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */
// Create account
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some(
        customer => customer.cpf === cpf
    );

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already existis!" });
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send();
});

// Chama o middleware para todas as rotas abaixo do comando
// app.use(verifyExistsAccountCPF);

// Update account - Está chamando um middleware direto na rota e somente nela
app.put("/account", verifyExistsAccountCPF, (request, response) => {
    const { name } = request.body;

    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
});

// Get account
app.get("/account", verifyExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.status(201).json(customer);
});

// Delete account
app.delete("/account", verifyExistsAccountCPF, (request, response) => {
    const { customer } = request;

    customers.splice(customer, 1);

    return response.status(200).json(customers);
});

// Get extract 
app.get("/statement", verifyExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statement);
});

// Get extract by date
app.get("/statement/date", verifyExistsAccountCPF, (request, response) => {
    const { date } = request.query;

    const { customer } = request;

    const { dateFormat } = new Date(date + " 00:00");

    const statement = costumer.statement.filter(
        statement => statement.created_at.toDateString() === new Date(dateFormat).toDateString()
    )

    return response.json(statement);
});

// Create deposit
app.post("/deposit", verifyExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(200).send();
});

// Create withdraw
app.post("/withdraw", verifyExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).json({ error: "Insufficient funds!" })
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);

    return response.status(200).send();
});

// Get balance
app.get("/balance", verifyExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);

    return response.json(balance);
})

app.listen(3333);