import React from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Portfolio = props => {
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
                    <tr>
                    <td>APPL</td>
                    <td>50</td>
                    <td>$545.68</td>
                    </tr>
                    <tr>
                    <td>GOOGL</td>
                    <td>25</td>
                    <td>$87.97</td>
                    </tr>
                    <tr>
                    <td>NFLX</td>
                    <td>30</td>
                    <td>$234.56</td>
                    </tr>
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