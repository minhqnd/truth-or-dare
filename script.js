

var mainContainer = document.querySelector('.main');
var allCards = document.querySelectorAll('.card');
// var nope = document.getElementById('nope');
// var love = document.getElementById('love');

function initCards(card, index) {
    var newCards = document.querySelectorAll('.card:not(.removed)');

    newCards.forEach(function(card, index) {
        card.style.zIndex = allCards.length - index;
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10; 
    });

    mainContainer.classList.add('loaded');
}


initCards();

update()

function update() {
    allCards.forEach(function(el) {
        var hammertime = new Hammer(el);
    
        hammertime.on('pan', function(event) {
            el.classList.add('moving');
        });
    
        hammertime.on('pan', function(event) {
            if (event.deltaX === 0) return;
            if (event.center.x === 0 && event.center.y === 0) return;
    
            // mainContainer.classList.toggle('main_love', event.deltaX > 0);
            // mainContainer.classList.toggle('main_nope', event.deltaX < 0);
    
            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;
    
            event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        });
    
        hammertime.on('panend', function(event) {
            el.classList.remove('moving');
            // console.log(el)
            el.setAttribute('data-answer', event.deltaX > 0)
            // mainContainer.classList.remove('main_love');
            // mainContainer.classList.remove('main_nope');
    
            var moveOutWidth = document.body.clientWidth;
            var keep = Math.abs(event.deltaX) < 40 || Math.abs(event.velocityX) < 0.5;
    
            event.target.classList.toggle('removed', !keep);
    
            if (keep) {
                event.target.style.transform = '';
            } else {
                var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                var toX = event.deltaX > 0 ? endX : -endX;
                var endY = Math.abs(event.velocityY) * moveOutWidth;
                var toY = event.deltaY > 0 ? endY : -endY;
                var xMulti = event.deltaX * 0.03;
                var yMulti = event.deltaY / 40;
                var rotate = xMulti * yMulti;
    
                event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                initCards();
            }
        });
    });
}

function createButtonListener(love) {
    return function(event) {
        var cards = document.querySelectorAll('.card:not(.removed)');
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        var card = cards[0];

        card.classList.add('removed');

        if (love) {
            card.style.transform = 'translate(' + moveOutWidth + 'px, -80px) rotate(-20deg)';
        } else {
            card.style.transform = 'translate(-' + moveOutWidth + 'px, -80px) rotate(20deg)';
        }

        initCards();

        event.preventDefault();
    };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

// nope.addEventListener('click', nopeListener);
// love.addEventListener('click', loveListener);

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



var cardtemp = `<div class="card">
<div class="truth">   
    <div class="title">THẬT:</div>
    <div class="cauhoi">%TRUTH%</div>
</div>
<div class="cheo">
    <div class="top"></div>
    <div class="bottom"></div>
</div>
<div class="dare">
    <div class="title">THÁCH:</div>
    <div class="cauhoi">%DARE%</div>
</div>
</div>`

function addcard(truth, dare) {
    var div = cardtemp;
    var div = div.replaceAll('%TRUTH%', truth);
    var div = div.replaceAll('%DARE%', dare);
    console.log(div)
    $('.cards').append(div);
    update()
    initCards();
}