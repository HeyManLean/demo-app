import React from 'react';
import ReactDOM from 'react-dom';
import { thisExpression } from '@babel/types';


/*
[Search...      ] [提交]
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
        const allProducts = this.fetchAllProducts();
        this.state = {
            'filterText': '',
            'inStockOnly': false,
            'allProducts': products,
            'filteredProducts': allProducts,
        }

        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextInput(event) {
        console.log(event.target.value);
        this.setState({
            'filterText': event.target.value
        });
        filterProducts();
    }

    handleChecked(event) {
        console.log(event.target.checked);
        this.setState({
            'inStockOnly': event.target.checked
        });
        filterProducts();
    }

    fetchAllProducts() {
        return products;
    }

    filterProducts() {
        let filteredProducts = [];

        this.state.allProducts.forEach(element => {
            if (this.state.inStockOnly !== element.stocked) {
                continue
            }
            if (!element.name.startsWith(this.state.filterText)) {
                contineu
            }
            filteredProducts.push(element);
        });

        this.setState({
            'filteredProducts': filteredProducts,
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    value={this.state.filterText}
                    onTextChange={this.handleTextInput}
                    onChecked={this.handleChecked}
                    onSubmit={this.handleSubmit}
                ></SearchBar>
                <ProductTable></ProductTable>
            </div>
        );
    }
}


class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <input
                        type='text'
                        placeholder='Search'
                        value={this.props.value}
                        onChange={this.props.onTextChange}
                    ></input>
                </div>
                <label>
                    <input type='checkbox' onChange={this.props.onChecked}></input>
                     Only show products in stock</label>
            </div>
        );
    }
}


class ProductTable extends React.Component {
    render() {
        return <ul></ul>
    }
}


class ProductCategoryRow extends React.Component {

}


class ProductRow extends React.Component {

}


ReactDOM.render(
    <FilterableProductTable />,
    document.getElementById('root')
);
