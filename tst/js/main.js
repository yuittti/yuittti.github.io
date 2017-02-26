(function(){
	var btnMenu = document.getElementById('btnMenu'),
		mobMenu = document.querySelectorAll('.menu-mobile'),
		btnMenuWrap = document.querySelectorAll('.menu-btn'),
		btnsLang = document.querySelectorAll('.lang-item');

	// toggle dropdown menu (mobile)
	btnMenu.addEventListener('click', function(ev){
		ev.preventDefault();
		var parent = this.parentElement;
		if (parent.classList.contains('-opened')) {
			parent.classList.remove('-opened');
		} else {
			parent.classList.add('-opened');
		}

	});

	document.addEventListener('click', function(ev) {
		console.log(mobMenu);
		console.log(ev.target);
		console.log(mobMenu[0]);
		if (mobMenu[0] != ev.target && !mobMenu[0].contains(ev.target) && btnMenu != ev.target) {
			btnMenuWrap[0].classList.remove('-opened');
		}

	});


	// change Language btns
	for (var i=0; i < btnsLang.length; i++) {
		btnsLang[i].addEventListener('click', function(ev){
			ev.preventDefault();
			var curActive = document.querySelector('.lang-item.-active');

			if (this.classList.contains('-active')) {
				return false;
			} else {
				curActive.classList.remove('-active');
				this.classList.add('-active');

			}	
		})
	};



})();