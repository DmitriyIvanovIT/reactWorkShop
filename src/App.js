import React, { Component } from 'react';
import Total  from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

    state = {
        transactions: [],
        description: '',
        amount: '',
        allIncomeState: 0,
        allExpensesState: 0,
        balance: 0
    };

    addTransaction = add => {
        const transactions = [...this.state.transactions];

        const transaction = {
            id: `cmr${(+new Date).toString(16)}key`,
            description: this.state.description,
            amount: this.state.amount,
            add
        };

        transactions.push(transaction);
        
        this.setState({ 
            transactions,
            description: '',
            amount: ''
         }, () => {
            this.calculate(true);
            this.calculate(false);
        });
    };

    addAmount = e => {
        this.setState({amount: e.target.value});
    };

    addDescription = e => {
        this.setState({description: e.target.value});
    };

    getBalance = () => {
        const balance = this.state.allIncomeState - this.state.allExpensesState;
        this.setState({ balance });
    };

    calculate = type => {

        const sum = this.state.transactions.reduce((accum, item) => item.add === type ? accum + +item.amount : accum, 0);
        
        if (type) {

            this.setState({
                allIncomeState: sum
            }, this.getBalance);

        } else {

            this.setState({
                allExpensesState: sum
            }, this.getBalance);
        
        }

    }; 

    render () {
        return (
            <>
            <header>
                <h1>Кошелек</h1>
                <h2>Калькулятор расходов</h2>
            </header>
        
            <main>
                <div className="container">
                    <Total
                        balance={this.state.balance}
                        allIncomeState={this.state.allIncomeState}
                        allExpensesState={this.state.allExpensesState}
                    />
                    <History transactions={this.state.transactions}/>
                    <Operation 
                        addTransaction={this.addTransaction}
                        addDescription={this.addDescription}
                        addAmount={this.addAmount}
                        description={this.state.description}
                        amount={this.state.amount}
                    />
                </div>
            </main>
        
            </>
        );
  };
}

export default App;
