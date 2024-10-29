document.addEventListener('DOMContentLoaded', () => {
	initSlider();
	initImageMove();
});

// Initialize slider functionality for changing product colors
const initSlider = () => {
	'use strict';
	const colorOptions = document.querySelectorAll('.color-options input');
	const productImage = document.querySelector('.product-image');
	const colorNameSpan = document.querySelector('.color-name');

	// Function to update the product image and color name
	const updateImageAndText = (selectedColor) => {
		productImage.src = `pic/sweater-${selectedColor}.webp`;
		colorNameSpan.textContent = `Color: ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`;
	};

	// Set the initial image and color name based on the checked option
	colorOptions.forEach(option => {
		if (option.checked) {
			updateImageAndText(option.value);
		}
		// Update image and color name when a new option is selected
		option.addEventListener('click', () => updateImageAndText(option.value));
	});
};

// Initialize the image movement effect based on mouse position
const initImageMove = () => {
	'use strict';
	const productImage = document.querySelector('.product-image');
	const parentContainer = document.querySelector('.container');

	// Handle mouse movement to apply an offset to the image
	const handleMouseMove = (event) => {
		const rect = parentContainer.getBoundingClientRect();
		const offsetX = (event.clientX - rect.left - rect.width / 2) * -0.1;
		const offsetY = (event.clientY - rect.top - rect.height / 2) * -0.1;
		productImage.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
	};

	// Toggle mouse effect based on screen width
	const toggleMouseEffect = () => {
		if (window.innerWidth > 768) {
			// Enable mousemove effect on larger screens
			parentContainer.addEventListener('mousemove', handleMouseMove);
		} else {
			// Disable mousemove effect on smaller screens and reset transform
			parentContainer.removeEventListener('mousemove', handleMouseMove);
			productImage.style.transform = '';
		}
	};

	// Initialize the effect and re-check on window resize
	toggleMouseEffect();
	window.addEventListener('resize', toggleMouseEffect);
};
