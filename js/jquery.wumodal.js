(function($){
	jQuery.fn.wumodal = function(options){
		var defaults = {
			template : 'Вы видите базовый шаблон для этого модального окна!',
			closeClickOverlay : true,
			closeKeydown : true,
			closeKeydownNum : 27, 
		};

		options = $.extend(defaults, options);

		return this.each(function(){

			//Определим переменные	
			var body = $('body'),
				overlay = $('<div class="wumodal-overlay"></div>'),
				container = $('<div class="wumodal-container"></div>'),
				content = $('<div class="wumodal-content"></div>'),
				close = $('<a href="#" class="wumodal-close-button">Закрыть</a>');

			//
			function showModal(){
				if($('.wumodal-overlay').length === 0 && $('.wumodal-container').length === 0){
					body.append(overlay, container);
				}
			};

			container.append(close, content.append(options.template));

			function animateShow(){
				overlay.fadeIn('500');
				$(container).animate({
					top : '50%'
				}, 500)
			};

			function animateHide(){
				overlay.fadeOut('500');
				$(container).animate({
					top : '0%'
				}, 500)
			};


			//Закрытие окна
			body.on('keydown', keydownClose);
			body.on('click', clickOverlay);
			body.on('click', '.wumodal-close-button', function(event){
				event.preventDefault();
				hideModal();
			});

			function keydownClose (event){
				if(options.closeKeydown){
					if (event.keyCode === options.closeKeydownNum){
						hideModal();
					}
				}
			};

			function clickOverlay(event){
				if (options.closeClickOverlay){
					if ($(event.target).is('.wumodal-overlay')){
						hideModal();
					}
				}
			};


			//Функция скрытия
			function hideModal(){
				animateHide();
				setTimeout(function(){
					overlay.remove();
					container.remove();
				}, 500);
			};


			//Запустим
			$(this).on('click', function(event) {
				event.preventDefault();
				showModal();
				animateShow();
			});
			

		});

	};
})(jQuery)
