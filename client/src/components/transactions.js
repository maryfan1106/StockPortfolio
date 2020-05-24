import React, { useState } from 'react';
import { Table } from 'reactstrap';

const sampleTransactions = [
    {
        "transtype": "BUY",
        "symbol": "GOOGL",
        "shares": 10,
        "price": "1415.28"
    },
    {
        "transtype": "BUY",
        "symbol": "MSFT",
        "shares": 10,
        "price": "185.36"
    },
    {
        "transtype": "BUY",
        "symbol": "BBY",
        "shares": 15,
        "price": "78.50"
    },
    {
        "transtype": "BUY",
        "symbol": "BBY",
        "shares": 15,
        "price": "78.42"
    },
    {
        "transtype": "BUY",
        "symbol": "GE",
        "shares": 50,
        "price": "6.47"
    },
    {
        "transtype": "BUY",
        "symbol": "ACN",
        "shares": 25,
        "price": "195.14"
    },
    {
        "transtype": "BUY",
        "symbol": "BBY",
        "shares": 1,
        "price": "78.20"
    }
];

const Transactions = props => {
    const [transactions, setTransactions] = useState(sampleTransactions);

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                    <th>Transaction Type</th>
                    <th>Ticker Symbol</th>
                    <th>Number of Shares</th>
                    <th>Buying Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map(transaction => {
                            return (
                                <tr>
                                <td>{transaction.transtype}</td>
                                <td>{transaction.symbol}</td>
                                <td>{transaction.shares}</td>
                                <td>${transaction.price}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
  };
  
  export default Transactions;