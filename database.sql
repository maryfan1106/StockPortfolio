CREATE DATABASE stock_portfolio;

CREATE TYPE ttype AS ENUM ('BUY','SELL');

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    pwhash TEXT NOT NULL
);

CREATE TABLE transactions (
    tid SERIAL PRIMARY KEY,
    uid INTEGER NOT NULL,
    transtype ttype NOT NULL,
    symbol TEXT NOT NULL,
    shares INTEGER,
    price NUMERIC(9,2),
    FOREIGN KEY (uid) REFERENCES users (uid) 
);

INSERT INTO users (email, pwhash) 
VALUES ('test@gmail.com', 'password123');

INSERT INTO transactions (uid, transtype, symbol, shares, price)
VALUES (16, 'BUY', 'MSFT', 15, 183.45);