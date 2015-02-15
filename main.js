document.addEventListener('DOMContentLoaded', function() {

    var stack;

    stack = gajus.Swing.Stack();

    cards.writeAll();

    [].forEach.call(document.querySelectorAll('.stack li'), function(targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

    stack.on('throwout', function(e) {
        console.log('Out,', e.throwDirection == 1 ? 'right' : 'left');


        //var log = 'Out, ' + (e.throwDirection == 1 ? 'right' : 'left');
        //updateStatus(log);
        //console.log(e.target.id);
        points = e.target.getAttribute('data-points');
        //console.log(e.target.getAttribute('data-name'));
        //console.log(e.target.getAttribute('data-points'));
        e.target.classList.remove('in-deck');
        if (e.target.classList.contains('used')) {
            console.log('Already used.');
        } else {

            e.target.classList.add('used');
            updateScore(points, game.turn);
            game.next();
            if (game.cur() > (game.max() - 1)) {
                updateStatus('Game over, Player ' + game.win() + ' wins!');
            } else {
                updateStatus('Player ' + game.turn + "'s turn");
            }
        };

    });

    stack.on('throwin', function(e) {
        //console.log('In,', e.throwDirection == 1 ? 'right' : 'left');
        //console.log(e.target.id);
        //console.log(e.target.getAttribute('data-name'));
        //points = e.target.getAttribute('data-points');
        //console.log(e.target.getAttribute('data-points'));
        e.target.classList.add('in-deck');

        //updateScore(points * -1);
    });



});

function updateScore(theScore, player) {
    var id = "score" + parseInt(player);
    var prev = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = parseInt(theScore) + parseInt(prev);
}

function updateStatus(status) {
    document.getElementById("status").innerHTML = status;
}

var game = {
    max: function() {
        var total = 0;

        for (var i = 0; i < cards.id.length; i++) {
            var cur = parseInt(cards.points[i]);

            total = total + cur;
        }
        return parseInt(total);
    },
    cur: function() {
        var one = parseInt(document.getElementById("score1").innerHTML);
        var two = parseInt(document.getElementById("score2").innerHTML);

        return parseInt(one + two);
    },
    win: function() {
        var one = parseInt(document.getElementById("score1").innerHTML);
        var two = parseInt(document.getElementById("score2").innerHTML);

        if (one > two) {
            return 1;
        } else if(two > one){
            return 2;
        } else {
            return 'draw';
        }

    },
    "turn": 1,
    next: function() {
        var turn = this.turn;
        if (turn == 1) {
            turn = turn + 1;
        } else {
            turn = turn - 1;
        }
        this.turn = turn;
    }
}

var cards = {
    "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    "name": ['Name', 'Name', 'Name', 'Craig', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name'],
    "points": [3, 4, 1, 2, 1, 2, 3, 4, 5, 4, 2, 1, 5, 4],
    "url": ['Name.png', 'Name.png', 'Name.jpg', 'craig.jpg', 'Name.jpg', 'Name.png', 'Name.jpg', 'Name.png', 'Name.png', 'Name.png', 'Name.jpg', 'Name.png', 'Name.png', 'Name.jpg'],
    ran: function() {

        var length0 = 0,
            length = arguments.length,
            i,
            j,
            rnd,
            tmp;

        for (i = 0; i < length; i += 1) {
            if ({}.toString.call(arguments[i]) !== "[object Array]") {
                throw new TypeError("Argument is not an array.");
            }

            if (i === 0) {
                length0 = arguments[0].length;
            }

            if (length0 !== arguments[i].length) {
                throw new RangeError("Array lengths do not match.");
            }
        }


        for (i = 0; i < length0; i += 1) {
            rnd = Math.floor(Math.random() * i);
            for (j = 0; j < length; j += 1) {
                tmp = arguments[j][i];
                arguments[j][i] = arguments[j][rnd];
                arguments[j][rnd] = tmp;
            }
        }

    },
    shuffle: function(times) {
        for (var i = 0; i < times; i++) {
            this.ran(this.id, this.name, this.points, this.url);
        };

    },
    writeAll: function() {
        this.shuffle(6);
        for (i = 0; i < this.id.length; i++) {

            $('#deck').append(
                '<li id="' + this.id[i] + '" class="in-deck" data-name="' + this.name[i] + '" data-points="' + this.points[i] + '" style="cursor: pointer; background-image: url(images/' + this.url[i] + '); background-size: 200px 300px; background-repeat: no-repeat;"><div class="bottom">' + this.name[i] + ' - <span class="coin"></span>' + this.points[i] + '</div></li>'
            );

        }
    }

};
