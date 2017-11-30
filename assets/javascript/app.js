

// $("#question_div").attr('id', 'center');

//declaring a function in JQuery
$.fn.triviaGame = function() {
    //variable 'trivia' to store data per question
    var trivia = this;
    trivia.userPick = null;
    trivia.answers = {
        correct: 0,
        incorrect: 0
    };
    trivia.images = null;
    trivia.count = 30;
    trivia.current = 0;
    trivia.questions = [{
        question: " Johnnie Morton had a brother that also played for USC. What is his name?",
        choices: ["Chad", "Chadette", "Chadder", "Chadley"],
        images: ["<img src=\"assets/images/Chad.jpg\">"],
        correct: 0
    }, {
        question: "Who led the team in terms of rushing yards?",
        choices: ["Reggie Hush", "Reggie Bush", "Reggie Tush", "Mike"],
        images: ["<img src=\"assets/images/bush.jpg\">"],
        correct: 1

    }, {
        question: "Which player broke USCs career record for rushing touchdowns in 2005",
        choices: ["Long Beach White", "Inglewood White", "Glendale White", "LenDale White"],
        images: ["<img src=\"assets/images/white.png\">"],
        correct: 3

    }, {
        question: "Which of the following Trojan Heisman trophy winners played on a National Championship team?",
        choices: ["Tom, Dick, and Harry", "Simpson, White, Allen", "Larry, Moe, Curley", "Habib, Chang, Garcia"],
        images: ["<img src=\"assets/images/simpson.jpg\">"],
        correct: 1

    }, {
        question: "How many touchdown passes did Matt Lienart throw for in his USC career?",
        choices: ["98", "98.1", "98.2", "98.3"],
        images: ["<img src=\"assets/images/leblanc.jpeg\">"],
        correct: 0

    }, {
        question: "Who was the starting quarterback who elected to stay for his senior year, when he could have gone to the NFL after his junior season?",
        choices: ["Matt Damon", "Matt McConaughey", "Matt Leinart", "Matt LeBlanc"],
        images: ["<img src=\"assets/images/matt.jpg\">"],
        correct: 2

    }, {
        question: "Reggie Bush had 513 total yards in the Trojans' 50-42 win over Fresno State. How many of those yards were on the ground?",
        choices: ["0", "-294", "294", "514"],
        images: ["<img src=\"assets/images/reggie.jpg\">"],
        correct: 2

    }, {
        question: "Who was the first Trojan player to win the Butkus Award (for best linebacker)?",
        choices: ["Chrissy Claiborne", "Kris Claiborne", "Chris Klineborn", "Chris Claiborne"],
        images: ["<img src=\"assets/images/chris.jpg\">"],
        correct: 3
    }, {
        question: "Which receiver led the team in receiving yards?",
        choices: ["Debra Winger", "Denzel Washington", "Dwayne Wade", "Dwayne Jarrett"],
        images: ["<img src=\"assets/images/denzel.jpg\">"],
        correct: 3
    }, {
        question: "How much time was USCs offense on the field in the first quarter of their game against Arkansas in the 2005 season?",
        choices: ["6:66", "-6:66", "365 days", "1:32"],
        images: ["<img src=\"assets/images/offense.jpg\">"],
        correct: 3
    }];
    //start
    trivia.ask = function() {
        //
        if (trivia.questions[trivia.current]) {
            $("#timer").html("Time remaining: " + "00:" + trivia.count + " secs");
            $("#question_div").html(trivia.questions[trivia.current].question);
            var choicesArr = trivia.questions[trivia.current].choices;
            var buttonsArr = [];
// create the buttons for the answers in the array
            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                button.attr('class', 'hvr-radial-out');
                button.attr('id', 'buttons');
                $('#choices_div').append(button);
            }
            //delay before the clock restarts; set at 1 sec
            window.triviaCounter = setInterval(trivia.timer, 1000);
        } else {
            $('body').append($('.container', {
                text: (
                    trivia.questions.length - (trivia.answers.correct + trivia.answers.incorrect)),

            }));
            $('.start_button').text('Restart').appendTo('body').show();
        }
    };
    //if timer runs out
    trivia.timer = function() {
        trivia.count--;
        if (trivia.count <= 0) {
            setTimeout(function() {
                index = trivia.questions[trivia.current].correct,
                correct = trivia.questions[trivia.current].choices[index];
                images = trivia.questions[trivia.current].images[0];
                trivia.answers.incorrect++;
                $('#choices_div').html("Too Slow! The correct answer was: " + correct + "<br><br>" + images);
                $('.correct').html('Correct answers: ' + trivia.answers.correct);
                $('.incorrect').html('Incorrect answers: ' + trivia.answers.incorrect);
                trivia.nextQuestion();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + trivia.count + " secs");
        }
    };
    trivia.nextQuestion = function() {
        trivia.current++;
        clearInterval(window.triviaCounter);
        trivia.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            trivia.cleanUp();
            trivia.ask();
        }, 5000)
    };
    trivia.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + trivia.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + trivia.answers.incorrect);
    };
    trivia.answer = function(correct) {
        var string = correct ? 'Correct' : 'Incorrect';
        trivia.answers[string]++;
        $('.' + string).html(string + ' answers: ' + trivia.answers[string]);
    };
    return trivia;
};
var Trivia;



$(".start_button").click(function() {
    //clear img

    $(this).hide();
    Trivia = new $(window).triviaGame();
    Trivia.ask();
    $('.correct').html('');
    $('.incorrect').html('');

});


$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        trivia = Trivia || $(window).trivia(),
        index = trivia.questions[trivia.current].correct,
        correct = trivia.questions[trivia.current].choices[index];
        images = trivia.questions[trivia.current].images[0];

    if (userPick !== index) {
        $('#choices_div').html("Wrong Answer! The answer was: " + correct + "<br><br>" + images);
        trivia.answers.incorrect++;
        trivia.answer(false);
        $('.correct').html('Correct answers: ' + trivia.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + trivia.answers.incorrect);
        
    } else {
        $('#choices_div').html("Correct!!! The answer is: " + correct + "<br><br>" + images);
        trivia.answers.correct++;
        trivia.answer(true);
        $('.correct').html('Correct answers: ' + trivia.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + trivia.answers.incorrect);
       
    }
    trivia.nextQuestion();
});

