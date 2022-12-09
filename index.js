'use strict'

function makeGETRequest(url) {
	return fetch(url).then(respone => {
		return respone.json();
	})
};


class GoodsItem {
	constructor(title, price, src) {
		this.title = title;
		this.price = price;
		this._src = src;
	}

		render() {
			return `<div class="card">
		<div class="img-wrapper">
			<img src=${this._src} class="card-img">
		</div>
		<div class="card-body">
			<h5 class="card-title">${this.title}</h5>
			<p class="price">${this.price} руб.</p>
			<button class="btn-primary">
				<span class="btn-text">Купить
				</span>
			</button>
		</div>
	</div>`;
		};
};

class GoodsList {
	constructor() {
		this.goods = [];
		this.filteredGoods = [];
	};

	fetchGoods() {
		return makeGETRequest('/goods')
			.then((data) => {
				this.goods = data;
				this.filteredGoods = data;
			});
	};

	filterGoods(value) {
		const regexp = new RegExp(value, 'i');
		this.filteredGoods = this.goods.filter(good => 
			regexp.test(good.title));
			this.render();
	};



	render() {
		let goodsHTML = '';
		this.filteredGoods.forEach((good) => {
			const goodItem = new GoodsItem(good.title, good.price, good.src);
			goodsHTML += goodItem.render();
		});
		document.querySelector('.main__goods-list').innerHTML = goodsHTML;
	};

	getSumGoods() {
		return this.goods.reduce((accum, good) => accum + Number(good.price), 0);
	};
	renderSumGoods() {
		const totalPrice = this.getSumGoods();
		document.querySelector('.main__total-price').innerHTML = `Сумма всех товаров: ${totalPrice} рублей.`;
	}
};

class CartList {
	constructor(qty) {
		this.cart = [];
		this.qty = qty;
	};

	fetchCart() {
		return makeGETRequest('/cart')
		.then((data) => {
			this.cart = data;
		});
		};
	
	add() {
	};

	render() {

		let cartGoodsHTML = document.createElement('ul');
		cartGoodsHTML.classList.add('cart-list');
		this.cart.forEach((good) => {
			const goodItem = new CartItem(good.title, good.price, good.src, good.qty);
			cartGoodsHTML.insertAdjacentHTML('beforeend', goodItem.render());
		});
		if (this.cart.length === 0) {
			document.querySelector('.cart-hidden').innerHTML = 'Ваша корзина пуста';
		} else {
			document.querySelector('.cart-hidden').insertAdjacentElement('beforeend', cartGoodsHTML);
		}
	};
};

class CartItem extends GoodsItem {
	constructor(title, price, src, qty) {
		super(title, price, src)
		this.qty = qty;
	}
	render() {
		return `<li class="cart-good">
			<div class="good-img-wrapper">
				<img src=${this._src} class="good-img">
			</div>
			<div class="good-title-wrapper">
			<h5 class="good-title">${this.title}</h5>
			<p class="good-price">${this.price} руб.</p>
			<p class="good-qty">${this.qty} шт.</p>
			</div>
		</li>`
	};
};

const goods = new GoodsList();
goods.fetchGoods().then(() => {
	goods.render();
	goods.renderSumGoods();
});
const cart = new CartList();
cart.fetchCart().then(() => {
	cart.render();
})

document.querySelector('.cart-btn').addEventListener('click', () => {
	const btn = document.querySelector('.cart__goods-wrapper');
	btn.classList.toggle('cart-hidden')
});
const searchInput = document.querySelector('.goods-search');
document.querySelector('.search-btn').addEventListener('click', () => {
	const value = searchInput.value;
	goods.filterGoods(value);
});