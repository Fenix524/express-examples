
\\---\\ РУЧНЕ СТВОРЕННЯ \\---\\
1. Створіть каталог для свого застосунку та зробіть
його своїм робочим каталогом.
		- mkdir myapp
		- cd myapp

2. Ініціалізуйте проект
		- npm init -y
	

3. Встановлюємо express та nodemoon
		- npm install express
		- npm i nodemon -D

4. Додаємо скрипт
		"scripts": {
			"start": "node ./bin/www",
			"start:dev": "nodemon ./bin/www"
		},

\\---\\ АВТОМАТИЗОВАНЕ СТВОРЕННЯ \\---\\
		npx express-generator --view=ejs AppName