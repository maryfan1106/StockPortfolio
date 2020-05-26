CREATE DATABASE stock_portfolio;

CREATE TYPE ttype AS ENUM ('BUY','SELL');

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    pwhash TEXT NOT NULL,
    accountbalance NUMERIC(9,2) DEFAULT 5000.00
);

CREATE TABLE transactions (
    tid SERIAL PRIMARY KEY,
    uid INTEGER NOT NULL,
    transtype ttype NOT NULL DEFAULT 'BUY',
    symbol TEXT NOT NULL,
    shares INTEGER,
    price NUMERIC(9,2),
    FOREIGN KEY (uid) REFERENCES users (uid) 
);

CREATE TABLE stocks (
    uid INTEGER NOT NULL,
    symbol TEXT NOT NULL,
    totalshares INTEGER DEFAULT 0,
    FOREIGN KEY (uid) REFERENCES users (uid) 
);