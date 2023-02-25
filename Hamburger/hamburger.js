'use strict'

class Hamburger{
	constructor (size, id, price, src, colories) {
		this.id = id;
		this.src = src;
		this.size = size;
		this.price = price;
		this.colories = colories;
	};

	render() {
		return `<div class="burger">
				<img src=${this.src} class="burger-img">
				<div class="burger-size">${this.size} гамбургер
					<input type="checkbox" class="buy-product" data-id=${this.id} data-price=${this.price} data-colories=${this.colories}>
					<div class="wrapper-title">
						<div class="burger-price">Стоимость: ${this.price} рублей</div>
						<span class="игкпук-colories">Колорий: ${this.colories} Ккал</span>
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
				id: 'Big-daddy',
				price: 100, 
				src: 'burger-image/big-burger.jpg', 
				colories: 40,
			},
			{
				size: 'Маленький',
				id: 'mini-burger',
				price: 50, 
				src: 'burger-image/small.jpg', 
				colories: 20,
			}
		]
	}

	render() {
		let listHTML = '';
		this.products.forEach(product => {
			const productItem = new Hamburger(product.size, product.id, product.price, product.src, product.colories);
			listHTML += productItem.render();
			return listHTML;
		});
		document.querySelector('.burger-wrapper').innerHTML = listHTML;
	}
};

class OptionItem {
	constructor(id, name, price, colories){
		this.id = id;
		this.name = name;
		this.price = price;
		this.colories = colories;
	}
	render() {
		return `<div class="burger-option">
					<input type="checkbox" class="buy-product" data-id=${this.id} data-price=${this.price} data-colories=${this.colories}>
					<span>Добавить:
						<span class="burger-option__title">${this.name}</span>
						<p>Стоимость: <span class="option-price">${this.price}</span> рублей</p>
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
				id: 'cheese',
				name: 'Сыр',
				price: 10,
				colories: 20,
			},
			{
				id: 'salat',
				name: 'Салат',
				price: 20,
				colories: 5,
			},
			{
				id: 'potato',
				name: 'Картофель',
				price: 15,
				colories: 10,
			},
			{
				id: 'spice',
				name: 'Приправа',
				price: 15,
				colories: 0,
			},
			{
				id: 'mayonnaise',
				name: 'Майонез',
				price: 20,
				colories: 5,
			},
		]
	};

	render() {
		let optionsList = '';
		this.options.forEach(option => {
			const optionItem = new OptionItem(option.id, option.name, option.price, option.colories);
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
		const burger = new ProductList();
		burger.fetchProducts();
		burger.render();

		const option = new OptionList();
		option.fetchOptions();
		option.render();

		document.querySelectorAll('.buy-product').forEach((element) => {
			element.addEventListener('change', (event) => {this.checkboxChangeHandler(event)})
		}
		);

		this.render();
	};

	checkboxChangeHandler(event) {
		const productId = event.target.dataset.id;
		const productPrice = +event.target.dataset.price;
		const productColories = +event.target.dataset.colories;
		event.target.checked === true ? this.addElem({id: productId, price: productPrice, colories: productColories}) : this.removeElem(productId);
	};

	addElem({id, price, colories}) {
		this.cart.push({id: id, price: price, colories: colories});
		this.render();
	};
	getElemIndex(id) {
		return this.cart.findIndex((i) => i.id === id);
	};
	removeElem(id) {
		this.cart.splice(this.getElemIndex(id), 1);
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