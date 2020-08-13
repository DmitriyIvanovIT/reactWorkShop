import React from 'react';

const HistoryItem = ({ key, transaction }) => (
    <li 
        className={`history__item ${transaction.add ? 
            'history__item-plus' : 
            'history__item-minus'}`}
        data-key={key}>
        {transaction.description}
        <span className="history__money">{transaction.add ? 
            `+${transaction.amount}` : 
            `-${transaction.amount}`} ₽</span>
        <button className="history__delete">x</button>
    </li>
);

export default HistoryItem;
