'use strict'

function makeGETRequest(url) {
	return fetch(url).then(respone => {
		return respone.json();
	})
	// return new Promise((resolve) => {
	// 	const xhr = new XMLHttpRequest();
	// xhr.open('GET', url);
	// xhr.onreadystatechange = function() {
	// 	if (xhr.readyState === XMLHttpRequest.DONE) {
	// 		const goods = JSON.parse(xhr.responseText);
	// 		resolve(goods);
	// 	};
	// };
	// xhr.send();
	// });
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
			<button class="btn btn-primary">
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
	};

	fetchGoods() {
		return makeGETRequest('/goods')
			.then((goods) => {
				this.goods = goods;
			}
		)
	};

	render() {
		let goodsHTML = '';
		this.goods.forEach((good) => {
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

class Cart {
	constructor(quantity) {
		this.cart = [];
		this.quantity = quantity;
	};

	fetchCart() {
		return document.querySelector('.cart-btn').addEventListener('click', () => {
			makeGETRequest('/cart')
				.then((cart) => {
					this.cart = cart;
				})
		})
	};
	
	add() {
	};

	render() {
		let cartGoodsHTML = document.createElement('ul');
		cartGoodsHTML.classList.add('cart-list');
		this.cart.forEach((good) => {
			const goodItem = new GoodsCartElem(good.title, good.price, good.src, good.quantity);
			cartGoodsHTML.insertAdjacentHTML('beforeend', goodItem.render());
		});
		document.querySelector('.cart__goods-wrapper').innerHTML = cartGoodsHTML;
	};
};

class GoodsCartElem extends GoodsItem {
	constructor(quantity) {
		super(title, price, src)
		this.quantity = quantity;
	}
	render() {
		return `<li class="cart-good">
			<img src=${this.src} class="card-img">
			<h5 class="good-title">${this.title}</h5>
			<p class="good-price">${this.price} руб.</p>
			<p class="good-quantity">${this.quantity} шт.</p>
		</li>`
	};
};

const goods = new GoodsList();
goods.fetchGoods().then(() => {
	goods.render();
	goods.renderSumGoods();
});
const cart = new Cart();
cart.fetchCart().then(() => {
	cart.render();
})