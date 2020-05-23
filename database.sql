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
    transtype ttype NOT NULL,
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

INSERT INTO users (email, pwhash) 
VALUES ('test@gmail.com', 'password123');

INSERT INTO transactions (uid, transtype, symbol, shares, price)
VALUES (16, 'BUY', 'MSFT', 15, 183.45);

WITH upsert AS (
     UPDATE stocks SET totalshares=totalshares+10
     WHERE uid=1 AND symbol='GOOGL' 
     RETURNING *
)
INSERT INTO stocks (uid, symbol, totalshares) 
SELECT 1, 'GOOGL', 10
WHERE NOT EXISTS (SELECT * FROM upsert);

UPDATE users 
SET accountbalance = 4500
WHERE uid = 1;