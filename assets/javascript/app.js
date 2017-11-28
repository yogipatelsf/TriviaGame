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
        images: ["../images/Rajah.gif"],
        correct: 0
    }, {
        question: "Who led the team in terms of rushing yards?",
        choices: ["Reggie Hush", "Reggie Bush", "Reggie Tush", "Mike"],
        correct: 1

    }, {
        question: "Which player broke USCs career record for rushing touchdowns in 2005",
        choices: ["Long Beach White", "Inglewood White", "Glendale White", "LenDale White"],
        correct: 3

    }, {
        question: "Which of the following Trojan Heisman trophy winners played on a National Championship team?",
        choices: ["Tom, Dick, and Harry", "Simpson, White, Allen", "Larry, Moe, Curley", "Habib, Chang, Garcia"],
        correct: 1

    }, {
        question: "How many touchdown passes did Matt Lienart throw for in his USC career?",
        choices: ["98", "98.1", "98.2", "98.3"],
        correct: 0

    }, {
        question: "Who was the starting quarterback who elected to stay for his senior year, when he could have gone to the NFL after his junior season?",
        choices: ["Matt Damon", "Matt McConaughey", "Matt Leinart", "Matt LeBlanc"],
        correct: 2

    }, {
        question: "Reggie Bush had 513 total yards in the Trojans' 50-42 win over Fresno State. How many of those yards were on the ground?",
        choices: ["0", "-294", "294", "514"],
        correct: 2

    }, {
        question: "Who was the first Trojan player to win the Butkus Award (for best linebacker)?",
        choices: ["Chrissy Claiborne", "Kris Claiborne", "Chris Klineborn", "Chris Claiborne"],
        correct: 3
    }, {
        question: "Which receiver led the team in receiving yards?",
        choices: ["Debra Winger", "Denzel Washington", "Dwayne Wade", "Dwayne Jarrett"],
        correct: 3
    }, {
        question: "How much time was USCs offense on the field in the first quarter of their game against Arkansas in the 2005 season?",
        choices: ["6:66", "-6:66", "365 days", "1:32"],
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

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(trivia.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    trivia.questions.length - (trivia.answers.correct + trivia.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    trivia.timer = function() {
        trivia.count--;
        if (trivia.count <= 0) {
            setTimeout(function() {
                trivia.nextQ();
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
        }, 1000)
    };
    trivia.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + trivia.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + trivia.answers.incorrect);
    };
    trivia.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        trivia.answers[string]++;
        $('.' + string).html(string + ' answers: ' + trivia.answers[string]);
    };
    return trivia;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).triviaGame();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        trivia = Trivia || $(window).trivia(),
        index = trivia.questions[trivia.current].correct,
        correct = trivia.questions[trivia.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        trivia.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        trivia.answer(true);
    }
    trivia.nextQuestion();
});

