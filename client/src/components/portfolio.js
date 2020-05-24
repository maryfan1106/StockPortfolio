import React, { useState } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
    const [accountBalance, setAccountBalance] = useState(accountInfo.accountbalance);
    const [portfolioValue, setPortfolioValue] = useState(accountInfo.value);
    const [stocks, setStocks] = useState(accountInfo.stocks);

    return (
        <div>
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
            <Form>
                <FormGroup>
                    <Label for="symbolField">Ticker Symbol</Label>
                    <Input type="text" name="symbol" id="symbolField" placeholder="enter ticker symbol" />
                </FormGroup>
                <FormGroup>
                    <Label for="sharesField">Number of Shares</Label>
                    <Input type="number" name="shares" id="sharesField" placeholder="enter number of shares" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    );
  };
  
  export default Portfolio;