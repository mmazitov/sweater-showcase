document.addEventListener('DOMContentLoaded', function () {
	initSidebarBtn();
});

function initSidebarBtn() {
	const resizeBtn = document.querySelector('.resize');
	const content = document.querySelector('.wrapper');
	resizeBtn.addEventListener('click', function(e) {
		e.preventDefault();
		content.classList.toggle('sb-expand');
	});
}