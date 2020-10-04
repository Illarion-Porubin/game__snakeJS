// задаем константу
const canvas = document.getElementById("game");
// указываем типы создаваемой игры 2d
const ctx = canvas.getContext("2d");
// прописываем пути к картинкам игры
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";
// указываем значение пикселей в box
let box = 32;
// указываем изначальный счет игры
let score = 0;
// устанавливаем рандомное появление еды на поле
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};
// создаем массив заейки
let snake = [];
snake[0] = {
// указываем где стартует змейка по X,Y
	x: 9 * box,
	y: 10 * box,
};
// создаем обработчик события
document.addEventListener("keydown", direction); // обработчик события


let dir;// указываем переменную которая будет возвращать заданое значение
// задаем значения кнопок в обработчике
function direction(event) {
	if(event.keyCode == 37 && dir != "right")// keyCode значение позволяет обратиться к указанной клавише
		dir = "left";
	else if (event.keyCode == 38 && dir != "down")
		dir = "up";
	else if (event.keyCode == 39 && dir != "left")
		dir = "right";
	else if (event.keyCode == 40 && dir != "up")
		dir = "down";
}

// Если змейка будет есть свой хвост, то останавливаем игру
function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)

		clerInterval(game); // должен прекращать обновления цикал, но что-то он не прекращает
	}
}

// Рисуем элементы игры с помощью drawImage
function drawGame() {
	ctx.drawImage(ground, 0, 0); // drawImage ресует элементы по оси X и Y

	ctx.drawImage(foodImg, food. x, food. y);
// Рисуем змейку
	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "purple"; //fillStyle задает цвет змейки, голова + тело
		ctx.fillRect(snake[i].x, snake[i].y, box, box ); //fillRect рисует залитый прямоугольник, цвет по умолчанию, черный
	}
// Рисуем счетчик съединой еды (score)
	ctx.fillStyle = "white"; // fillStyle указывает цвет текса
	ctx.font = "50px Arial"; // font задает высоту в PX + тип шрифта Arial
	ctx.fillText(score, box * 2.5, box * 1.7); // fillText ресует сам текст, указывает переменную score+ координаты по x 2.5, y 1.7

// рисуем передвижение самой змейки по X и Y
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

// добавляем +1 в счетчик и съедаем еду
// проверяем условие по if если мы съели то 
	if(snakeX == food.x && snakeY == food.y) {
		score++;
	  food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,//Math.random позволяет выбрать случайное значение от 0 до 1(или заданного значения (17+1))Math.floor округляет полученное значение до целочисленного значения
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else {
		 snake.pop();// функция .pop() позволяет удалить последний элемент в массиве
	}


// если змейка врежится в себя, то начнет себя есть
	if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17)
		clerInterval(game);// прекращает игру(обновление события)

// проверям куда смещается змейка и смещаем её на 1 box
	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

// новый массив змейки в которы будут добавляться элементы
	let newHead = {
		x: snakeX, // координаты появления элемента по X
		y: snakeY // координаты появления элемента по y
	};

	eatTail(newHead, snake); //eatTail вызывает функцию поедания змейки, указываем параметры (newHead, snake) 

// если еду съели то добавляется + 1 элемент к змейке 
	snake.unshift(newHead); //unshift добавляет 1 или более элементов к массиву
}

// устанавливаем частоту обновления события
let game = setInterval(drawGame, 150);
