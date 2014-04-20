(function($){
	jQuery.fn.wumodal = function(options){
		var defaults = {
			template : 'Вы видите базовый шаблон для этого модального окна!',
			closeClickOverlay : true,
			closeKeydown : true,
			closeKeydownNum : 27,
			closeImg : true,
			speedModal : 300,
			speedOverlay : 300, 
			opacityOverlay : 0.7,
			containerClass : '',
			overlayBg : '#000',
		};

		options = $.extend(defaults, options);

		return this.each(function(){

			// Определение переменных	
			var body = $('body'),
				overlay = $('<div class="wumodal-overlay"></div>'),
				container = $('<div class="wumodal-container ' + options.containerClass + '"></div>'),
				content = $('<div class="wumodal-content"></div>'),
				close = $('<a href="#" class="wumodal-close-button">Закрыть</a>');

			// Запуск функций показа модального окна
			$(this).on('click', function(event) {
				event.preventDefault();
				showModal();
				animateShow();
			});	

			// Есть ли уже в DOM элементы
			function showModal(){
				if($('.wumodal-overlay').length === 0 && $('.wumodal-container').length === 0){
					body.append(overlay, container);
				}
			};

			// Добавим в container кнопку и шаблон контента
			container.append(close, content.append(options.template));

			// Как показывать кнопку закрытия (text/img)
			if(options.closeImg){
				close.addClass('wumodal-cl-butt-img');
			};

			// Стили по умолчанию
			container.css({
				opacity: 0,
			})
			overlay.css({
				opacity: 0,
				background: options.overlayBg,
			})

			// Функции анимации
			function animateShow(){
				overlay.animate({
					opacity: options.opacityOverlay,
				}, options.speedOverlay);
				$(container).animate({
					top : '50%',
					opacity: '1',
				}, options.speedModal)
			};

			function animateHide(){
				overlay.animate({
					opacity: 0,
				}, options.speedOverlay);
				$(container).animate({
					top : '20%',
					opacity: '0',
				}, options.speedModal)
			};

			// Запуск функций скрытия окна по различным событиям
			body.on('keydown', keydownClose);
			body.on('click', clickOverlay);
			body.on('click', '.wumodal-close-button', function(event){
				event.preventDefault();
				hideModal();
			});

			// По нажатию клавиатуры
			function keydownClose (event){
				if(options.closeKeydown){
					if (event.keyCode === options.closeKeydownNum){
						hideModal();
					}
				};
			};

			// По клику на затемнение
			function clickOverlay(event){
				if (options.closeClickOverlay){
					if ($(event.target).is('.wumodal-overlay')){
						hideModal();
					}
				};
			};

			// Функция вернет параметр задержки для удаления из DOM
			function maxDelay(a, b){
				return Math.max(a,b);
			};

			// Запуск функции скрытия и методов для удаления элементов из DOM
			function hideModal(){
				animateHide();
				setTimeout(function(){
					overlay.remove();
					container.remove();
				}, maxDelay(options.speedModal, options.speedOverlay));
			};

		});
	};
})(jQuery)
