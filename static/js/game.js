const memoryGame = {
    cardCount : document.getElementById('game').dataset.x * document.getElementById('game').dataset.y, 
    cardOnRow : document.getElementById('game').dataset.x, 
    divBoard : document.getElementById('game-board'),
    cards : [], 
    cardsChecked : [], 
    cardPairs : 0, 
    canGet : true, 
    cardsImg : [ 
        'static/images/anchor.svg',
        'static/images/apple-alt.svg',
        'static/images/atom.svg',
        'static/images/baseball-ball.svg',
        'static/images/basketball-ball.svg',
        'static/images/bath.svg',
        'static/images/beer.svg',
        'static/images/bell.svg',
        'static/images/bicycle.svg',
        'static/images/binoculars.svg',
        'static/images/bomb.svg',
        'static/images/bong.svg',
        'static/images/bowling-ball.svg',
        'static/images/bus-alt.svg',
        'static/images/camera-retro.svg',
        'static/images/cannabis.svg',
        'static/images/car-side.svg',
        'static/images/car.svg',
        'static/images/child.svg',
        'static/images/church.svg',
        'static/images/coffee.svg',
        'static/images/crow.svg',
        'static/images/desktop.svg',
        'static/images/dove.svg',
        'static/images/feather-alt.svg',
        'static/images/fighter-jet.svg',
        'static/images/fire-extinguisher.svg',
        'static/images/fish.svg',
        'static/images/flag-checkered.svg',
        'static/images/futbol.svg',
        'static/images/gem.svg',
        'static/images/glasses.svg',
        
    ],

    

    cardClick : function(e) {
        if (this.canGet) {
            if (!this.cardsChecked[0] || (this.cardsChecked[0].dataset.index !== e.target.dataset.index)) {
                this.cardsChecked.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.cardsImg[e.target.dataset.cardType] + ')';
            }

            if (this.cardsChecked.length === 2) {
                this.canGet = false;
                if (this.cardsChecked[0].dataset.cardType === this.cardsChecked[1].dataset.cardType) {
                    setTimeout(this.leaveCards.bind(this), 500);
                } else {
                    setTimeout(this.resetCards.bind(this), 500);
                }
            }
        }
    },

    leaveCards : function() {

        this.cardsChecked[0].className = "game-card disabled";
        this.cardsChecked[1].className = "game-card disabled";

        this.canGet = true;
        this.cardsChecked = [];

        this.cardPairs++;
        if (this.cardPairs >= this.cardCount / 2) {
            alert("Congratulation :)\n\nIf you want to play again click 'Quit' button below the table ;)");
        }
    },

    resetCards : function() {
        this.cardsChecked[0].style.backgroundImage = 'url(static/images/ask.png)';
        this.cardsChecked[1].style.backgroundImage = 'url(static/images/ask.png)';

        this.cardsChecked = [];
        this.canGet = true;
    },


    startGame : function() {
        
        document.getElementById('game-board').innerHTML = '';
        this.cards = [];
        this.cardsChecked = [];
        this.canGet = true;
        this.cardPairs = 0;

        //generujemy tablicę numerów kart (parami)
        for (let i=0; i<this.cardCount; i++) {
            this.cards.push(Math.floor(i/2));
        }

        //i ją mieszamy
        for (let i=this.cardCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.cards[i];
            this.cards[i] = this.cards[swap];
            this.cards[swap] = tmp;
        }
        //mieszanie obrazków
        for (let i=31; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.cardsImg[i];
            this.cardsImg[i] = this.cardsImg[swap];
            this.cardsImg[swap] = tmp;
        }

        document.getElementById("game-board").style.height = (this.cardCount/this.cardOnRow)*110 + 'px';
        document.getElementById("game-board").style.width = this.cardOnRow*110 + 'px';

        for (let i=0; i<this.cardCount; i++) {
            const card = document.createElement('div');
            card.setAttribute("class", "game-card");
            document.getElementById('game-board').appendChild(card);

            card.dataset.cardType = this.cards[i];
            card.dataset.index = i;

            card.style.left = 5 + (card.offsetWidth+10) * (i%this.cardOnRow) + 'px'
            card.style.top = 5 + (card.offsetHeight+10) * (Math.floor(i/this.cardOnRow)) + 'px';

            card.addEventListener('click', this.cardClick.bind(this));
        }
    }
}


memoryGame.startGame();
