'use strict'

class Hamburger{
	constructor (size, price, src, colories) {
		this.src = src;
		this.size = size;
		this.price = price;
		this.colories = colories;
	};

	render() {
		return `<div class="burger">
				<img src="${this.src}" class="burger-img">
				<div class="burger-size">${this.size}
					<input type="checkbox" class="buy-product" data-price=${this.price} data-colories=${this.colories}>
					<div class="wrapper-title">
						<div class="burger-price">Стоимость:${this.price}</div>
						<span class="игкпук-colories">Колорий:${this.colories}</span>
					</div>
				</div>
			</div>`
	}
};

class ProductList {
	constructor() {
		this.products = [];
	}

	fetchProducts() {
		this.products = [
			{
				size: 'Большой', 
				price: '100', 
				src: 'image/burger-image/big-burger.jpg', 
				colories: '40'
			},
			{
				size: 'Маленький', 
				price: '50', 
				src: 'image/burger-image/small.jpg', 
				colories: '20'
			}
		]
	}

	render() {
		let listHTML = '';
		this.products.forEach(product => {
			const productItem = new Hamburger(product.size, product.price, product.src, product.colories);
			listHTML += productItem.render();
			return listHTML;
		});
		document.querySelector('.burger-wrapper').innerHTML = listHTML;
	}
};

class OptionItem {
	constructor(name, price, colories){
		this.name = name;
		this.price = price;
		this.colories = colories;
	}
	render() {
		return `<div class="burger-option">
					<input type="checkbox" class="buy-product" data-price=${this.price} data-colories=${this.colories}>
					<span>Добавить:
						<span class="burger-option__title">${this.name}</span>
						<p>Стоимость: <span class="option-price">${this.price}</span></p>
						<p>Калорий: <span class="option-colories">${this.colories}</span></p>
					</span>
				  </div>`
	}
}

class OptionList {
	constructor() {
		this.options = [];
	}

	fetchOptions() {
		this.options = [
			{
				name: 'Сыр',
				price: '10',
				colories: '20',
			},
			{
				name: 'Салат',
				price: '20',
				colories: '5',
			},
			{
				name: 'Картофель',
				price: '15',
				colories: '10',
			},
			{
				name: 'Приправа',
				price: '15',
				colories: '0',
			},
			{
				name: 'Майонез',
				price: '20',
				colories: '5',
			},
		]
	};

	render() {
		let optionsList = '';
		this.options.forEach(option => {
			const optionItem = new OptionItem(option.name, option.price, option.colories);
			optionsList += optionItem.render();
		});
		document.querySelector('.options-wrapper').insertAdjacentHTML('afterbegin', optionsList);
	}
}

class Cart{
	constructor(){
		this.cart = [];
	}

	init() {
		document.querySelectorAll('.buy-product').forEach((element) =>
		element.addEventListener('change', (event) => this.checkboxChangeHandler(event))
		);
		
		const burger = new ProductList();
		burger.fetchProducts();
		burger.render();

		const option = new OptionList();
		option.fetchOptions();
		option.render();

		this.render();
	};

	checkboxChangeHandler(event) {
		const productPrice = event.target.checked ? event.target.dataset.price : null;
		const productColories = event.target.checked ? event.target.dataset.colories : null;
		this.add(productPrice, productColories);
	};

	add(productPrice, productColories) {
		this.cart.push({price: productPrice, colories: productColories});
		this.render();
	};

	render() {
		document.querySelector('.cart-price').innerHTML = this.getProductPrice();
		document.querySelector('.cart-colories').innerHTML = this.getProductColories();
	};
	getProductPrice() {
		return this.cart.reduce((acc, currentEl) => acc + currentEl.price, 0)
	};
	getProductColories() {
		return this.cart.reduce((acc, currentEl) => acc + currentEl.colories, 0)
	};
}

const cart = new Cart();
cart.init();



