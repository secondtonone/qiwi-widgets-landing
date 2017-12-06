import { h, Component } from 'preact';

import './About.scss';

const About = () => (
    <section class="about">
        <h1 class="about__title">Разнообразие форматов отображения. Простота установки.</h1>
        <ol class="about__paragraphs">
            <li><div class="about__marker">1</div>Скопируйте код виджета</li>
            <li><div class="about__marker">2</div>Откройте HTML код вашей страницы для редактирования</li>
            <li><div class="about__marker">3</div>Вставьте код виджета в необходимое место страницы</li>
            <li><div class="about__marker">4</div>Сохраните HTML код страницы и обновите ее на сайте</li>
        </ol>
    </section>
)

export default About;