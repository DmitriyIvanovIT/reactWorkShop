import React, { Component } from 'react';
import Total  from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

    state = {
        transactions: JSON.parse(localStorage.getItem('calcMoney')) || [],
        description: '',
        amount: '',
        resultIncome: 0,
        resultExpeses: 0,
        totalBalance: 0,
    };

    // componentWillMount() {
    //     this.getTotalBalance();
    // };

    addTransaction = add => {
        const transactions = [...this.state.transactions];

        const transaction = {
            id: `cmr${(+new Date()).toString(16)}key`,
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
            this.getTotalBalance();
            this.addStorage();
        });
    };

    addAmount = e => {
        this.setState({amount: parseFloat(e.target.value)});
    };

    addDescription = e => {
        this.setState({description: e.target.value});
    };

    getIncome = () => this.state.transactions
        .filter(item => item.add)
        .reduce((acc, item) => item.amount + acc, 0);

    getExpenses = () => this.state.transactions
        .filter(item => !item.add)
        .reduce((acc, item) => item.amount + acc, 0);

    getTotalBalance = () => {
        const resultIncome = this.getIncome, 
        resultExpeses = this.getExpenses,
        totalBalance = resultIncome - resultExpeses;

        this.setState({
            totalBalance,
            resultIncome,
            resultExpeses
        });

        console.log(this.state);
    }

    addStorage = () => {
        localStorage.setItem('calcMoney', JSON.stringify(this.state.transactions));
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
                        totalBalance={this.state.totalBalance}
                        resultIncome={this.state.resultIncome}
                        resultExpeses={this.state.resultExpeses}
                        
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
