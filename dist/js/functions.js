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
	
	// Function to handle the mousemove event
	function handleMouseMove(event) {
		const rect = parentContainer.getBoundingClientRect();
		const x = event.clientX - rect.left; // X position of the cursor relative to the container
		const y = event.clientY - rect.top;  // Y position of the cursor relative to the container
		
		// Center of the container
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		// Offset the image based on distance from the center
		const offsetX = (x - centerX) * -0.1;
		const offsetY = (y - centerY) * -0.1;
	
		// Apply the offset to the image
		productImage.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
	}
	
	// Function to toggle the event listener based on screen width
	function toggleMouseEffect() {
		if (window.innerWidth > 768) {
			// Add the event listener if screen width is greater than 768px
			parentContainer.addEventListener('mousemove', handleMouseMove);
		} else {
			// Remove the event listener if screen width is 768px or less
			parentContainer.removeEventListener('mousemove', handleMouseMove);
			// Reset transform when the effect is disabled
			productImage.style.transform = '';
		}
	}
	
	// Run the toggle function on initial load and on window resize
	toggleMouseEffect();
	window.addEventListener('resize', toggleMouseEffect);
}