import React from 'react';
import { Table } from 'reactstrap';

const Transactions = props => {
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
                    <tr>
                    <td>BUY</td>
                    <td>APPL</td>
                    <td>50</td>
                    <td>$545.68</td>
                    </tr>
                    <tr>
                    <td>BUY</td>
                    <td>GOOGL</td>
                    <td>25</td>
                    <td>$87.97</td>
                    </tr>
                    <tr>
                    <td>BUY</td>
                    <td>NFLX</td>
                    <td>30</td>
                    <td>$234.56</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
  };
  
  export default Transactions;