var slider_nav = document.getElementById('slider_nav');

noUiSlider.create(slider_nav, {
    start: [GameSelectedFrom, GameSelectedTo],
    connect: true,
    steps: 1,
    range: {
        'min': 0,
        'max': 30
    },
    behaviour: 'tap-drag',
    tooltips: true,
    format: wNumb({
        decimals: 0
    })/*,
    pips: {
        mode: 'steps',
        stepped: true,
        density: 4
    }*/

});
