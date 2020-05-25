import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { getTransactions } from '../actions/transactions';
import '../css/transactions.css';

const Transactions = props => {
    const fetchData = async () => {
        const userTransactions = await getTransactions();
        setTransactions(userTransactions);
        setLoading(false);
    }

    const [transactions, setTransactions] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div className="transactions">
            <h3 style={{margin:25}}>
                Transactions
            </h3>
            {
                isLoading ? <div style={{textAlign:'center'}}>Loading . . . </div> :
                (
                    transactions.length<1 ? <div style={{textAlign:'center'}}>You have no transaction</div> : 
                    <Table striped style={{textAlign:'center', color:'white'}}>
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
                                transactions.map((transaction, index) => {
                                    return (
                                        <tr key={index}>
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
                )
            }
        </div>
    );
  };
  
  export default Transactions;