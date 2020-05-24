import React, { useState, useEffect } from 'react';
import { Alert, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/portfolio.css';

const accountInfo = {
    "accountbalance": "121.57",
    "value": "13100.70",
    "stocks": [
        {
            "symbol": "NFLX",
            "totalshares": 30,
            "value": "131.12",
            "performance": "negative"
        },
        {
            "symbol": "GE",
            "totalshares": 10,
            "value": "66.10",
            "performance": "equal"
        },
        {
            "symbol": "GOOGL",
            "totalshares": 17,
            "value": "250.27",
            "performance": "positive"
        }
    ]
}

const Portfolio = props => {
    const fetchData = () => {
        setAccountBalance(accountInfo.accountbalance);
        setPortfolioValue(accountInfo.value);
        setStocks(accountInfo.stocks);
    }

    const [accountBalance, setAccountBalance] = useState('');
    const [portfolioValue, setPortfolioValue] = useState('');
    const [stocks, setStocks] = useState([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!symbol || !shares) {
            setError({isOpen:true, message:"Please fill in all fields"});
        } else {
            if (error.isOpen) setError({isOpen:false, message: ""})
            alert(`Submitting form with: ${symbol}, ${shares}`)
            // useEffect to rerender page or display error after post request
        }
    }
    const [symbol, setSymbol] = useState("");
    const [shares, setShares] = useState("");
    const [error, setError] = useState({isOpen:false, message:""});

    useEffect(()=>{
        fetchData()
    },[]);

    return (
        <div>
            <div class="column">
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
            <div class="column">
                <h3>
                    Account Balance: ${accountBalance}
                </h3>
                <Alert color="danger" isOpen={error.isOpen}>
                    {error.message}
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="symbolField">Ticker Symbol</Label>
                        <Input 
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