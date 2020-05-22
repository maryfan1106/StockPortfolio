CREATE DATABASE stock_portfolio;

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    pwhash TEXT NOT NULL
);