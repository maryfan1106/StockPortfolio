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

    const setSuccess = async (mess) => {
        setLoading(true);
        fetchData();
        setMessage({isOpen:true, message: mess, color:"success"})
    };
    const setErrorMessage = (err) => setMessage({isOpen:true, message: err, color:"danger"});
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // clear previous error
        if (message.isOpen) setMessage({isOpen:false, message: "", color:""});
        makeTransaction(
            {transtype: 'BUY', symbol, shares: Number(shares)},
            setSuccess,
            setErrorMessage
        );
    }
    const [accountBalance, setAccountBalance] = useState('');
    const [portfolioValue, setPortfolioValue] = useState('');
    const [stocks, setStocks] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
    const [symbol, setSymbol] = useState("");
    const [shares, setShares] = useState("");
    const [message, setMessage] = useState({isOpen:false, message:"", color:""});

    useEffect(()=>{
        fetchData()
    },[]);

    return (
        <div>
            <div className="column">
                {
                    portfolioValue<0 ? <div style={{textAlign:'center'}}> Could not get stock info at this time </div> :
                    <h3>
                        Portfolio (${portfolioValue})
                    </h3>
                }
                
                {
                    isLoading || portfolioValue<0 ? <div style={{textAlign:'center'}}> . . . </div> :
                    (
                        stocks.length<1 ? <div style={{textAlign:'center'}}>You don't own any stocks</div> : 
                        <Table style={{textAlign:'center', color:'white'}}>
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
                    )
                }
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
                    <Button style={{width: '100%'}}type="submit" value="Submit">BUY</Button>
                </Form>
            </div>
        </div>
    );
  };
  
  export default Portfolio;