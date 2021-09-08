<template>
	<section class="container">
		<h2>Награды</h2>
		<div class="slider">
			<div class="slider__wrapper">
				<div class="slider__item prize">
					<img
						class="prize__img"
						width="423"
						height="364"
						alt="Кубок"
						src="/img/imgComponents/StartVoting/10/IMG_2079.jpg"
					/>
					<div class="prize__desc">
						<h3 class="prize__title">Региональный этап</h3>
						<p class="prize__text">
							Все победители регионального этапа награждаются стелами «Звезда
							команды», сертификатами и ценными призами. За второе место
							участники награждаются сертификатами и поощрительными призами.
						</p>
					</div>
				</div>
				<div class="slider__item prize">
					<img
						class="prize__img"
						width="423"
						height="364"
						alt="Кубок"
						src="/img/imgComponents/StartVoting/salut.jpg"
					/>
					<div class="prize__desc">
						<h3 class="prize__title">Полуфинал</h3>
						<p class="prize__text">
							Все победители полуфинала получают приглашение принять участие в
							официальной церемонии награждения финалистов.
						</p>
					</div>
				</div>
				<div class="slider__item prize">
					<img
						class="prize__img"
						width="423"
						height="364"
						alt="Кубок"
						src="/img/imgComponents/StartVoting/10/IMG_2084_2.jpg"
					/>
					<div class="prize__desc">
						<h3 class="prize__title">Финал</h3>
						<p class="prize__text">
							Победитель Конкурса награждается стелой «Золотой Лидер перемен»,
							сертификатом, денежной премией в размере 100 000 рублей и
							туристической поездкой на двоих человек. Остальные финалисты
							награждаются стелами «Серебряный Лидер перемен», сертификатами и
							ценными призами.
						</p>
					</div>
				</div>
			</div>
			<!-- КНОПКИ "НАЗАД" И "ВПЕРЁД" -->
			<a
				class="slider__control slider__control_left"
				href="#"
				role="button"
			></a>
			<a
				class="slider__control slider__control_right slider__control_show"
				href="#"
				role="button"
			></a>
		</div>
	</section>
</template>

<script>
export default {
	name: "PrizeMainBlock",
	created() {}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/index";
@import "../../../assets/styles/StartVotingOther";

/* ОСНОВНЫЕ СТИЛИ */
.slider {
	position: relative;
	overflow: hidden;

	margin-bottom: 100px;
}
.slider__wrapper {
	display: flex;
	transition: transform 0.6s ease; /* 0.6 длительность смены слайда в секундах */
}
.slider__item {
	flex: 0 0 100%; /* определяет количество активных слайдов (в данном случае 2 */
	max-width: 100%; /* определяет количество активных слайдов (в данном случае 2 */
}
/* СТИЛИ ДЛЯ КНОПОК "НАЗАД" И "ВПЕРЁД" */
.slider__control {
	position: absolute;
	display: none;
	top: 50%;
	transform: translateY(-50%);
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 40px; /* ширина кнопки */
	height: 50px; /* высота кнопки */
	opacity: 0.5; /* прозрачность */
	background: #000; /* цвет фона */
}
.slider__control_show {
	display: flex;
}
.slider__control:hover,
.slider__control:focus {
	text-decoration: none;
	outline: 0;
	opacity: 0.9; /* прозрачность */
}
.slider__control_left {
	left: 0;
}
.slider__control_right {
	right: 0;
}
.slider__control::before {
	content: "";
	display: inline-block;
	width: 20px; /* ширина иконки (стрелочки) */
	height: 20px; /* высота иконки (стрелочки) */
	background: transparent no-repeat center center;
	background-size: 100% 100%;
}
.slider__control_left::before {
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}
.slider__control_right::before {
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}

.prize {
	display: flex;
	width: 90%;
	max-width: 1028px;
	margin: 0 auto;
}

.prize__img {
	object-fit: cover;
	width: 423px;
	height: 364px;
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
}

.prize__desc {
	width: 453px;
	margin-left: 76px;
	margin-right: 76px;
	margin-top: 61px;
}

.prize__title {
	font-size: 48px;
	color: #181818;
}

@media screen and (max-width: 850px) {
	.prize__img {
		width: 300px;
	}

	.prize__desc {
		margin-left: 40px;
		margin-right: 40px;
		margin-top: 0px;
	}
}

@media screen and (max-width: 640px) {
	.prize__img {
		border-radius: 10px;
		width: 100%;
	}

	.prize {
		flex-direction: column-reverse;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.prize__desc {
		margin: 0px;
		width: 100%;
	}
}
</style>
