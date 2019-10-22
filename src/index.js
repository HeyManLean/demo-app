import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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
            'allProducts': allProducts,
            'filteredProducts': {},
        }

        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleTextInput(event) {
        this.setState({
            'filterText': event.target.value
        });
    }

    handleChecked(event) {
        this.setState({
            'inStockOnly': event.target.checked
        });
    }

    fetchAllProducts() {
        return products;
    }

    filterProducts() {
        const filterText = this.state.filterText;
        const inStockOnly = this.state.inStockOnly;

        let filteredProducts = {};

        this.state.allProducts.forEach(element => {
            if (inStockOnly && !element.stocked) {
                return;
            }
            if (!element.name.toLowerCase().startsWith(filterText.toLowerCase())) {
                return;
            }
            const category = element.category;
            if (!filteredProducts[category]) {
                filteredProducts[category] = [];
            }
            filteredProducts[category].push(element);
        });

        return filteredProducts;
    }

    render() {
        let filteredProducts = this.filterProducts();
        return (
            <div>
                <SearchBar
                    value={this.state.filterText}
                    onTextChange={this.handleTextInput}
                    onChecked={this.handleChecked}
                ></SearchBar>
                <ProductTable filteredProducts={filteredProducts}></ProductTable>
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
        const filteredProducts = this.props.filteredProducts;
        let displayData = [];
        displayData.push(
            <ProductRow
                key='name'
                name='name'
                price='price'
                nameClassName='product-header'
                priceClassName='product-header'
            />
        )
        Object.keys(filteredProducts).forEach((category) => {
            displayData.push(
                <ProductCategoryRow value={category} key={category}></ProductCategoryRow>
            );

            const productList = filteredProducts[category];

            productList.forEach((element) => {
                const className = element.stocked? 'product-row': 'product-row-red';
                displayData.push(
                    <ProductRow
                        key={element.name}
                        name={element.name}
                        price={element.price}
                        nameClassName={className}
                    />
                );
            });
        })
        console.log(displayData);

        return <div>{displayData}</div>
    }
}


class ProductCategoryRow extends React.Component {
    render() {
        return <div className="product-category-row">{this.props.value}</div>
    }
}


class ProductRow extends React.Component {
    render() {
        return (
            <div>
                <div className={this.props.nameClassName}>{this.props.name}</div>
                <div className={this.props.priceClassName || 'product-row'}>{this.props.price}</div>
            </div>
        )
    }
}


ReactDOM.render(
    <FilterableProductTable />,
    document.getElementById('root')
);
