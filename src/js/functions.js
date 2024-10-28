document.addEventListener('DOMContentLoaded', function () {
	initSlider();
	initImageMove();
});

function initSlider() {
	const colorOptions = document.querySelectorAll('.color-options input');
	const productImage = document.querySelector('.product-image');
	const colorNameSpan = document.querySelector('.color-name');

	colorOptions.forEach((option) => {
		if (option.checked) {
			const selectedColor = option.value;
			productImage.src = `pic/sweater-${selectedColor}.webp`;
			colorNameSpan.textContent = `Color: ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`; 
		}
	});

	colorOptions.forEach((option) => {
		option.addEventListener('click', () => {
			const selectedColor = option.value;
			productImage.src = `pic/sweater-${selectedColor}.webp`;
			colorNameSpan.textContent = `Color: ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`;
		});
	});
}

function initImageMove() {
	const productImage = document.querySelector('.product-image');
	const parentContainer = document.querySelector('.container');
	parentContainer.addEventListener('mousemove', (event) => {
		const rect = parentContainer.getBoundingClientRect();
		const x = event.clientX - rect.left; // Позиция X курсора относительно родителя
		const y = event.clientY - rect.top;  // Позиция Y курсора относительно родителя
		
		// Центр родительского контейнера
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		// Смещение изображения на основе расстояния от центра
		const offsetX = (x - centerX) * -0.1; // умножение на -0.1 для эффекта "отталкивания"
		const offsetY = (y - centerY) * -0.1;
	
		// Применяем смещение к изображению
		productImage.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
	});
}