import React from 'react';
import ReactDOM from 'react-dom';
import { thisExpression } from '@babel/types';


/*
[Search...      ]
[] Only show products in stock

**Name**        **Price**
**Sporting Goods**
Football        $49.99
Baseball        $9.99
--Basketball--  $29.99
**Electronics**
iPod Touch      $99.99
--iPhone 5--    $399.99
Nexus 7         $199.99
*/


const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'filterText': '',
            'inStockOnly': false,
        }
    }

    handleTextInput(text) {
        alert('Text changed! Src: ' + this.state.filterText + ', Tar: ' + text);
    }

    handleChecked(checked) {
        alert('checked changed! Src: ' + this.state.inStockOnly + ', Tar: ' + checked);
    }

    render() {
        return (
            <SearchBar
                value={this.state.filterText}
                onTextChange={this.handleTextInput}
                onChecked={this.handleChecked}
            ></SearchBar>
        );
    }
}


class SearchBar extends React.Component {

}


class ProductTable extends React.Component {

}


class ProductCategoryRow extends React.Component {

}


class ProductRow extends React.Component {

}


ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
