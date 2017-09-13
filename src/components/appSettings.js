export default {
    idWidgetsBlock: 'widgets',
    widgetsLibrary: {
        navigation: [{
            id: 'widgets',
            name: 'Виджет',
            types: ['widget728x200ps', 'widget728x200', 'widget300x300', 'widget300x180']
        }, {
            id: 'buttons',
            name: 'Кнопка',
            types: ['smallButton', 'mediumButton', 'bigButton']
        }],
        library: [{
            title: 'Большой информационный виджет',
            desc: 'Подходит, если вы хотите познакомить ваших читателей с фондом. Есть в двух вариантах – с предвыбором сумм и с вводом произвольной суммы.',
            types: ['widget728x200ps', 'widget728x200']
        }, {
            title: 'Небольшой виджет',
            desc: 'Подходит для размещения после информации по теме. Есть в двух размерах — выбирайте, какой будет лучше смотреться на сайте!',
            types: ['widget300x300', 'widget300x180']
        }, {
            title: 'Кнопка',
            desc: 'Подходит, если вы делаете отдельную страничку или блок, рассказывающий о фонде. В конце вы можете разместить  кнопку, ведущую на платежную форму. Есть в трех размерах.',
            types: ['smallButton', 'mediumButton', 'bigButton']
        }],
        types: {
            'widget728x200ps': {
                name: '728px x 200px c предвыбором',
                link: 'big-widget-buttons-728x200',
                transparent: false,
                title: '728 px x 200 px с предвыбором сумм',
                "height": 200,
                "width": 728,
                "params": {
                    "text": "Фонд занимается организацией помощи детям с онкологическими и другими тяжёлыми заболеваниями головного мозга.",
                    "button1": 100,
                    "button2": 500,
                    "button3": 10000

                }

            },
            'widget728x200': {
                name: '728px x 200px',
                link: 'big-widget-728x200',
                transparent: false,
                title: '728 px x 200 px с вводом произвольной суммы',
                "height": 200,
                "width": 728,
                "params": {
                    "title": "БФ Константина Хабенского",
                    "button_name": "Помочь сейчас",
                    "text": "Фонд занимается организацией помощи детям с онкологическими и другими тяжёлыми заболеваниями головного мозга."
                }
            },
            'widget300x300': {
                name: '300px x 300px',
                link: 'middle-widget-300x300',
                transparent: false,
                title: '300 px x 300 px',
                "height": 300,
                "width": 300,
                "params": {
                    "button_name": "Помочь сейчас"
                }
            },
            'widget300x180': {
                name: '300px x 180px',
                link: 'small-widget-300x180',
                transparent: false,
                title: '300 px x 180 px',
                "height": 180,
                "width": 300,
                "params": {
                    "button_name": "Помогите сейчас"
                }
            },
            'smallButton': {
                name: 'маленькая',
                link: 'small-button-175x65',
                transparent: true,
                title: '175 px x 65 px маленькая на прозрачном фоне',
                "height": 65,
                "width": 175,
                "params": {
                    "button_name": "Пожертвовать"
                }
            },
            'mediumButton': {
                name: 'средняя',
                link: 'middle-button-200x80',
                transparent: true,
                title: '200 px x 80 px средняя на прозрачном фоне',
                "height": 80,
                "width": 200,
                "params": {
                    "button_name": "Пожертвовать"
                }
            },
            'bigButton': {
                name: 'большая',
                link: 'big-button-220x100',
                transparent: true,
                title: '220 px x 100 px большая на прозрачном фоне',
                "height": 100,
                "width": 220,
                "params": {
                    "button_name": "Пожертвовать"
                }
            }
        }
    }
};