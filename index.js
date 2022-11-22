'use strict'

const goods = [
	{title: 'Видеокарта MSI GeForce RTX 3090 Ti SUPRIM X 24Gb', price: '109 999', src: 'image/card-image/MSIGeForceRTX3090TiSUPRIMX.jpg'},
	{title: 'Видеокарта GIGABYTE GeForce RTX 3090 24Gb', price: '106 499', src: 'image/card-image/GIGABYTEGeForceRTX3090GamingOC.jpg'},
	{title: 'Видеокарта Palit GeForce RTX 4080 GameRock 16Gb', price: '106 999', src: 'image/card-image/PalitGeForceRTX4080GameRock.jpg'},
	{title: 'Видеокарта GIGABYTE GeForce RTX 4080 AORUS MASTER 16Gb', price: '119 999', src: 'image/card-image/GIGABYTEGeForceRTX4080AORUSMASTER.jpg'},
	{title: 'Видеокарта GIGABYTE AORUS GeForce RTX 4080 XTREME WATERFORCE 16Gb', price: '123 999', src: 'image/card-image/GIGABYTEAORUSGeForceRTX4080XTREMEWATERFORCE.jpg'},
	{title: 'Видеокарта ASUS ROG Strix GeForce RTX 3080 V2 OC Edition 10Gb', price: '94 299', src: 'image/card-image/ASUSROGStrixGeForceRTX3080V2OCEdition.jpg'},
	{title: 'Видеокарта GIGABYTE GeForce RTX 3080 GAMING OC (LHR) 10Gb', price: '84 299', src: 'image/card-image/GIGABYTEGeForceRTX3080GAMINGOC(LHR).jpg'},
	{title: 'Видеокарта ColorFul iGame GeForce RTX 3080 Advanced OC LHR-V 10Gb', price: '97 799', src: 'image/card-image/ColorFuliGameGeForceRTX3080AdvancedOCLHR-V.jpg'},
	{title: 'Видеокарта Palit GeForce RTX 3080 Ti GamingPro 12Gb', price: '98 999', src: 'image/card-image/PalitGeForceRTX3080TiGamingPro.jpg'},
	{title: 'Видеокарта GIGABYTE GeForce RTX 3080 Ti EAGLE OC 12Gb', price: '98 999', src: 'image/card-image/GIGABYTEGeForceRTX3080TiEAGLEOC.jpg'},
	{title: 'Видеокарта PowerColor AMD Radeon RX 6900 XT Red Devil 24Gb', price: '73 799', src: 'image/card-image/PowerColorAMDRadeonRX6900XTRedDevil.jpg'},
	{title: 'Видеокарта Sapphire TOXIC AMD Radeon RX 6900 XT Air Cooled 24Gb', price: '74 499', src: 'image/card-image/SapphireTOXICAMDRadeonRX6900XTAirCooled.jpg'},
	{title: 'Видеокарта MSI AMD Radeon RX 6950 XT GAMING X TRIO 24Gb', price: '89 999', src: 'image/card-image/MSIAMDRadeonRX6950XTGAMINGXTRIO.jpg'},
	{title: 'Видеокарта GIGABYTE AMD Radeon RX 6950 XT GAMING OC 24Gb', price: '112 999', src: 'image/card-image/GIGABYTEAMDRadeonRX6950XTGAMINGOC.jpg'},
];

const renderGoodsItem = (title, price, src) => {
	return `<div class="card">
					<div class="img-wrapper">
						<img src=${src} class="card-img">
					</div>
					<div class="card-body">
						<h5 class="card-title">${title}</h5>
						<p class="price">${price} руб.</p>
						<button class="btn btn-primary">
							<span class="btn-text">Купить
							</span>
						</button>
					</div>
			</div>`;
	};

const renderGoodsList = (list) => {
	let goodsList = list.map(({title, price, src}) => renderGoodsItem(title, price, src));
	document.querySelector('.main__goods-list').innerHTML = goodsList.join('');
};

renderGoodsList(goods);