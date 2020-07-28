var animations_1 = require('@angular/animations');
exports.fadeInAnimation = animations_1.trigger('fadeInAnimation', [
    // route 'enter' transition
    animations_1.transition(':enter', [
        // styles at start of transition
        animations_1.style({ transform: 'translateX(-1000px)' }),
        animations_1.animate('0.3s', animations_1.style({ transform: 'translateX(0px)', opacity: 1 }))
    ]),
]);
