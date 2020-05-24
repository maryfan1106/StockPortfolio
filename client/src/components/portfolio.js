import React, { useState, useEffect } from 'react';
import { Alert, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAccountInfo } from '../actions/users';
import { makeTransaction } from '../actions/transactions';
import '../css/portfolio.css';

const Portfolio = props => {
    const fetchData = async () => {
        const accountInfo = await getAccountInfo();
        setAccountBalance(accountInfo.accountbalance);
        setPortfolioValue(accountInfo.portfolioValue);
        setStocks(accountInfo.stocks);
        setLoading(false);
    }

    const [isLoading, setLoading] = useState(true);
    const [accountBalance, setAccountBalance] = useState('');
    const [portfolioValue, setPortfolioValue] = useState('');
    const [stocks, setStocks] = useState([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // clear previous error
        if (message.isOpen) setMessage({isOpen:false, message: "", color:""})

        alert(`Submitting form with: ${symbol}, ${shares}`)
        // useEffect to rerender page or display error after post request
    }
    const [symbol, setSymbol] = useState("");
    const [shares, setShares] = useState("");
    const [message, setMessage] = useState({isOpen:false, message:"", color:""});

    useEffect(()=>{
        fetchData()
    },[]);

    return isLoading ? (<div>Loading</div>) :
    (
        <div>
            <div className="column">
                <h3>
                    Portfolio (${portfolioValue})
                </h3>
                <Table>
                    <thead>
                        <tr>
                        <th>Ticker Symbol</th>
                        <th>Shares Owned</th>
                        <th>Current Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks.map((stock, index) => {
                                return (
                                    <tr className={stock.performance} key={index}>
                                        <td>{stock.symbol}</td>
                                        <td>{stock.totalshares}</td>
                                        <td>${stock.value}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <div className="column">
                <h3>
                    Account Balance: ${accountBalance}
                </h3>
                <Alert color={message.color} isOpen={message.isOpen}>
                    {message.message}
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="symbolField">Ticker Symbol</Label>
                        <Input 
                            required
                            type="text" 
                            name="symbol"
                            id="symbolField" 
                            placeholder="enter ticker symbol" 
                            value={symbol}
                            onChange={e => setSymbol(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="sharesField">Number of Shares</Label>
                        <Input 
                            required
                            type="number" 
                            name="shares" 
                            id="sharesField" 
                            placeholder="enter number of shares" 
                            value={shares}
                            onChange={e => setShares(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit" value="Submit">Submit</Button>
                </Form>
            </div>
        </div>
    );
  };
  
  export default Portfolio;