<?php

/**
 * The header.
 *
 * @package Kandinsky
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body id="top" <?php body_class(); ?>>
	<div class="ally-settings is-hidden" id="ally-settings" role="dialog" aria-labelledby="ally-title" tabindex="0">
		<div class="ally-settings__controlls controlls">
			<button class="controlls__btn" aria-label="Вернуть стандартные настройки" type="button" id="ally-default" data-ally="ally-reset">
				<span aria-hidden="true">
					<svg fill="currentColor" width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
						<path d="M793 242H366v-74c0-6.7-7.7-10.4-12.9-6.3l-142 112a8 8 0 0 0 0 12.6l142 112c5.2 4.1 12.9.4 12.9-6.3v-74h415v470H175c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-28.7 64-64V306c0-35.3-28.7-64-64-64z" />
					</svg>
				</span>

			</button>
			<button class="controlls__btn" aria-label="Закрыть меню настроек доступности" type="button" id="close-ally">
				<span aria-hidden="true">
					<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="currentColor" />
					</svg>
				</span>
			</button>
		</div>
		<h2 class="ally-settings__title" id="ally-title">Настройки доступности</h2>
		<div class="ally-settings__menu ally-menu">
			<div class="ally-menu__item">
				<h3 class="ally-menu__title" id="ally-colors">Цветовая схема сайта</h3>
				<ul class="ally-menu__submenu submenu" aria-labelledby="ally-colors">
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить светлую тему" id="ally-theme-light" data-ally="ally-theme" data-ally-value="light">Светлая</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить тёмную тему" id="ally-theme-dark" data-ally="ally-theme" data-ally-value="dark">Темная</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить голубую тему" id="ally-theme-blue" data-ally="ally-theme" data-ally-value="blue">Голубая</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить коричневую тему" id="ally-theme-brown" data-ally="ally-theme" data-ally-value="brown">Коричневая</button>
					</li>
				</ul>
			</div>
			<div class="ally-menu__item">
				<h3 class="ally-menu__title" id="ally-fz">Размер шрифта</h3>
				<ul class="ally-menu__submenu submenu" aria-labelledby="ally-fz">
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить стандартный размер" id="ally-fz-normal" data-ally="ally-fz" data-ally-value="normal">Стандартный</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить средний размер" id="ally-fz-medium" data-ally="ally-fz" data-ally-value="medium">Средний</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить большой размер" id="ally-fz-big" data-ally="ally-fz" data-ally-value="big">Большой</button>
					</li>
				</ul>
			</div>
			<div class="ally-menu__item">
				<h3 class="ally-menu__title" id="ally-ls">Расстояние между буквами</h3>
				<ul class="ally-menu__submenu submenu" aria-labelledby="ally-ls">
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить стандартное расстояние" id="ally-ls-normal" data-ally="ally-ls" data-ally-value="normal">Стандартное</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить среднее расстояние" id="ally-ls-medium" data-ally="ally-ls" data-ally-value="medium">Среднее</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить большое расстояние" id="ally-ls-big" data-ally="ally-ls" data-ally-value="big">Большое</button>
					</li>
				</ul>
			</div>
			<div class="ally-menu__item">
				<h3 class="ally-menu__title" id="ally-lh">Расстояние между строчками</h3>
				<ul class="ally-menu__submenu submenu" aria-labelledby="ally-lh">
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить стандартное расстояние" id="ally-lh-normal" data-ally="ally-lh" data-ally-value="normal">Стандартное</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить среднее расстояние" id="ally-lh-medium" data-ally="ally-lh" data-ally-value="medium">Среднее</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить большое расстояние" id="ally-lh-big" data-ally="ally-lh" data-ally-value="big">Большое</button>
					</li>
				</ul>
			</div>
			<div class="ally-menu__item">
				<h3 class="ally-menu__title" id="ally-ff">Шрифт</h3>
				<ul class="ally-menu__submenu submenu" aria-labelledby="ally-ff">
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Использовать шрифт с засечками" id="ally-ff-serif" data-ally="ally-ff" data-ally-value="serif">С засечками</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Использовать шрифт без засечек" id="ally-ff-sans" data-ally="ally-ff" data-ally-value="sans">Без засечек</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Использовать шрифт, помогающий при дислексии" id="ally-ff-dyslexic" data-ally="ally-ff" data-ally-value="dyslexic">Для дислексии</button>
					</li>
				</ul>
			</div>
			<div class="ally-menu__item">
				<h3 class="ally-menu__title" id="ally-img">Изображения</h3>
				<ul class="ally-menu__submenu submenu" aria-labelledby="ally-img">
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Показывать изображения" id="ally-img-show" data-ally="ally-img" data-ally-value="show">Есть</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Убрать изображения" id="ally-img-hide" data-ally="ally-img" data-ally-value="hide">Нет</button>
					</li>
				</ul>
			</div>
			<div class="ally-menu__item">
				<h3 class="ally-menu__title" id="ally-speech">Синтез речи</h3>
				<ul class="ally-menu__submenu submenu" aria-labelledby="ally-speech">
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Включить синтез речи" id="ally-speech-show" data-ally="ally-speech" data-ally-value="show" data-speech-exists="Включить синтез речи" data-speech-error="Синтез речи недоступен">Есть</button>
					</li>
					<li class="submenu__item">
						<button class="submenu__btn" type="button" aria-label="Выключить синтез речи" id="ally-speech-hide" data-ally="ally-speech" data-ally-value="hide" data-speech-exists="Выключить синтез речи" data-speech-error="Синтез речи недоступен">Нет</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<a href="#main" class="skip-to-main-content-link">Перейти к основному содержимому сайта</a>
	<?php wp_body_open(); ?>

	<?php get_template_part('template-parts/header'); ?>
	<main class="knd-main" id="main">