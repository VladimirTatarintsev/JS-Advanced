'use strict'
//1, 2
// const regText = new RegExp('\'([A-ZА-Я]{1}.+?)\'([^A-zА-я]{1})', 'g');
// const str = "1. 'У меня нет его номера телефона', — огорчился Богдан. 2. Саша спросил: 'Сколько aren't лет твоей сестре?' 3. 'Я не помню этот стих, — вздохнул Олег, — я совсем его забыл'. 4. Анна не унималась: 'Сколько нужно топлива, чтоб долететь до Луны?' — спрашивала она все время папиного сослуживца. 5. Подруга сказала: 'Вчера был отличный теплый вечер' — и мечтательно закрыла глаза. 6. 'Я очень волнуюсь', — признался Вадик через силу. 7. Первоклассники не могли поверить: 'Каникулы продляться целое лето!'"





// const validPhone = document.querySelector('.form-control-phone');

// validPhone.value.replace(regUserPhone, '$1($2)$3-$4');

// const validMail = document.querySelector('.form-control-mail');
// const regUserMail = new RegExp('^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$');

const form = {
	init() {
	const formEl = document.querySelector('.form');
	formEl.addEventListener('submit', (e) => {this.formSubmit(e)})
	},

	formSubmit(e) {
		if (!this.validate()) {
			e.preventDefault();
		};
	},

	validate() {
		let isValid = true;
		const errors = [];
		const massage = document.querySelectorAll('.error');
		const formInputs = document.querySelectorAll('.form-control');
		const inputName = document.querySelector('[data-name="name"]');
		const inputPhone = document.querySelector('[data-name="phone"]');
		const inputMail = document.querySelector('[data-name="e-mail"]');
		const inputText = document.querySelector('[data-name="text"]')

		formInputs.forEach(input => {
			if (input.value === '') {
				errors.push({massage: 'Поле не может быть пустым.', attr: `${input.dataset.name}`})
				isValid = false;
			}
		});
		if (inputName.value !== '' && !this.validUserName(inputName)) {
			errors.push({massage: 'Поле должно содержать только буквы.', attr: `${inputName.dataset.name}`})
			const massage = inputName.nextElementSibling;
			massage ? massage.remove() : null;
			isValid = false;
		}else {
			inputName.classList.remove('form-invalid');
			const massage = inputName.nextElementSibling;
			massage ? massage.remove() : null;
		};
		
		if (inputPhone.value !== '' && !this.validPhone(inputPhone)) {
			errors.push({massage: 'Поле должно содержать только цифры в формате: +7000-000-0000.', attr: `${inputPhone.dataset.name}`})
			isValid = false;
			const massage = inputPhone.nextElementSibling;
			massage ? massage.remove() : null;
		}else {
			inputPhone.classList.remove('form-invalid');
			const massage = inputPhone.nextElementSibling;
			massage ? massage.remove() : null;
		};
		
		if (inputMail.value !== '' && !this.validMail(inputMail)) {
			errors.push({massage: `Введен некорректный E-mail.`, attr: `${inputMail.dataset.name}`})
			const massage = inputMail.nextElementSibling;
			massage ? massage.remove() : null;
			isValid = false;
		} else {
			inputMail.classList.remove('form-invalid');
			const massage = inputMail.nextElementSibling;
			massage ? massage.remove() : null;
		}		
		if(inputText.value !== '') {
			inputText.classList.remove('form-invalid');
			const massage = inputText.nextElementSibling;
			massage ? massage.remove() : null;
		} else {
			const massage = inputText.nextElementSibling;
			massage ? massage.remove() : null;
		}

		if (errors.length !== 0) {
			errors.forEach(field => {
				const input = document.querySelector(`[data-name=${field.attr}]`);
				input.classList.add('form-invalid');
				const errElem = document.createElement('span');
				errElem.classList.add('error');
				errElem.innerHTML = field.massage;
				input.insertAdjacentElement('afterend', errElem)
			});
		};
		console.log(errors)
		return isValid;
	},

	validUserName(userName) {
		const regUserName = /^[А-яёA-z]+$/;
		return regUserName.test(userName.value);
	},

	validPhone(phone) {
		const regPhone = /^\+\d{1,3}\d{3}\-\d{3}\-\d{4}$/;
		return regPhone.test(phone.value);
	},

	validMail(mail) {
		const regMail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
		return regMail.test(mail.value)
	},
};
form.init();