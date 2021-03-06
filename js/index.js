//Add progress meter


//Add readme
//link to articles on binary, hex "don't know binary? etc."
//Inform user if incorrect, correct : alert for now
//Pull Jquery from a CDN
// refactor li options to radio buttons
//Use form instead of ul

//As a user, I should know how many are correct or wrong
//Requirements as feature requests
const App = {
   VALUES : [0],
	numQuestions: 10,
	counter : 0,
	answers : [],
	landingPage : {

	},
	quizPage : {

	}
};

//Landing Page Generation
App.landingPage.generateLandingPage = function(){
	App.landingPage.generateBoxes();
	$('main').addClass('landing');
	$('main').append(`<div class='result' aria-live="polite"><p class='chewy'>0x0</p></div>`); 
   $('main').append(`<aside class='chewy'>
                           <p>Click the boxes</p>
                           <p>This is a <a href="https://www.youtube.com/watch?v=ry1hpm1GXVI">binary calculator</a></p>
                           <p>Output is in <a href="https://www.youtube.com/watch?v=4EJay-6Bioo">hexadecimal</a></p>
                        </aside>`)
	$('main').append(
		`<form id='start-quiz'>
         <fieldset>
            <legend>Start the quiz</legend>
   			<button type='submit' class='start-quiz' autofocus>
               <h1><span class='start-quiz'>Start quiz<span></h1>
            </button>
         </fieldset>
		</form>`
	); 	
	App.landingPage.clickFunctionalityBoxes();
	App.landingPage.startQuiz();
}

App.landingPage.generateBoxes = function(){
	$('main').append(
		`<article class='boxes'>
		    <form>
            <fieldset>
               <legend>Tab over the buttons to read the 4-bit binary value</legend>
                  <ul class="boxes">
                   <button type="button" class="box unclicked" data-id='8'>
                      <li>0</li>
                   </button>
                   <button type="button" class="box unclicked" data-id='4'>
                      <li>0</li>
                   </button>
                   <button type="button" class="box unclicked" data-id='2'>
                      <li>0</li>
                   </button>
                   <button type="button" class="box unclicked" data-id='1'>
                      <li>0</li>
                   </button>
                  </ul>
            </fieldset>     
         </form>
	  </article>`
	);
}

App.landingPage.clickFunctionalityBoxes = function(){
	App.landingPage.unclickedBoxes(App.VALUES);
	App.landingPage.clickedBoxes(App.VALUES);
}

App.landingPage.unclickedBoxes = function(){
   $('ul').on('click', '.unclicked', function(event){
      event.preventDefault();
      const num = $(event.currentTarget).data('id');
      App.VALUES.push(num);
      $(event.currentTarget).find('li').empty().   append('1');
      $(event.currentTarget).removeClass('unclicked');
      $(event.currentTarget).addClass('clicked');
      $(event.currentTarget).addClass('active');
      $('main').find('.result').replaceWith(`<div class="result"><p class='chewy'>${App.landingPage.getTotal(App.VALUES)}</p></div>`);
   });  
}



App.landingPage.clickedBoxes = function(){
   $('ul').on('click', '.clicked', function(event){
      const num = $(event.currentTarget).data('id');
      $(event.currentTarget).find('li').empty().append('0');
      const indexToRemove = App.VALUES.indexOf(num);
      App.VALUES.splice(indexToRemove, 1);
      $(event.currentTarget).removeClass('clicked');
      $(event.currentTarget).addClass('unclicked');
      $(event.currentTarget).removeClass('active');
      $('main').find('.result').replaceWith(`<div class="result"><p class='chewy'>${App.landingPage.getTotal(App.VALUES)}</p></div>`);
   });
}

App.landingPage.startQuiz = function(){
	$('#start-quiz input[type=submit], #start-quiz button').on('click', function(event) { 
		event.preventDefault();
		//randGen for answer param
		let answer = App.randGen();
		App.quizPage.generateQuizPage(answer);
	});
}

App.landingPage.getTotal = function(){
	const val = App.VALUES.reduce(reducer);
	const hex = val.toString(16);
	return `0x${hex}`;
	function reducer(total, number){
		return total + number;
	}
}
//generateQuizPage


App.quizPage.generateQuizPage = function(answer){
	let intArray = App.quizPage.makeArray(answer);
	App.quizPage.removeLanding(answer, intArray);
	App.quizPage.statusBar();
	App.landingPage.generateBoxes();
	App.quizPage.createOptionBoxes(answer, intArray);
	App.quizPage.renderAnswers(answer);
	App.quizPage.selectOption(answer);
}

App.quizPage.restart = function(){ 
   $('.article-header').empty();
   $('.article-header').append(`<h2>You got ${App.quizPage.correct()} out of ${App.numQuestions} correct!</h2>`);
   $('.example-boxes').remove();

   $('.boxes').remove();
   App.landingPage.generateBoxes();
   App.landingPage.clickFunctionalityBoxes();



   $('main').append(`<form id="restart"><button type="button"><h1><span class="span-restart">Try again</span></h1></button></form>`);
   //restart button
   $('#restart input[type=button], #restart button').on('click', function(event) { 
      window.location.reload(true);
   });
}

App.quizPage.correct = function(){
   let num = 0;
   for(answer of App.answers){
      if(answer == 'correct'){
         num++;
      }
   }
   return num;
}

App.renderWindow = function(){
	if(App.answers.length == App.numQuestions){ 
      window.setTimeout(function(){ 
         App.landingPage.clickFunctionalityBoxes();
         App.quizPage.updateStatusBar();
         App.quizPage.restart();
      }, 500);
	} else {
		window.setTimeout(function(){ 
			App.quizPage.generateQuizPage(App.randGen());
         App.quizPage.updateStatusBar();
		}, 700);
	}
}

App.quizPage.statusBar = function(){
	$('main').append(`
    <div class="status-bar">
      <ul>
	      <li data-id='1'></li>
	      <li data-id='2'></li>
	      <li data-id='3'></li>
	      <li data-id='4'></li>
	      <li data-id='5'></li>
	      <li data-id='6'></li>
	      <li data-id='7'></li>
	      <li data-id='8'></li>
	      <li data-id='9'></li>
	      <li data-id='10'></li>
      </ul>
    </div> 
    <article class="article-header" aria-live="polite">
      <h2>Question: ${App.answers.length + 1}/${App.numQuestions}</h2>
      <div role="header">
         <p class='invisible' aria-live="polite">Current score: ${App.quizPage.correct()} correct</p>
      </div>
    	<h1>Select the answer!</h1>
    </article>
	`);
}

App.quizPage.updateStatusBar = function(){
		$('.status-bar li').each(function(index, element){
			let litmus = App.answers[index];
			$(element).addClass(litmus);
		});
}	

App.quizPage.selectOption = function(answer){
   $('.options').each((event) => {
      $(event.currentTarget).removeClass('correct');
      $(event.currentTarget).removeClass('incorrect');
   });

  $('.options').on('click keypress',function(event){
      event.preventDefault();
      if(selected(event)){
         innerFunction(event);
         //prevents 'overloading' of simultaneous submits when key pressed down
         $(event.currentTarget).prop("disabled", true); 
      };

      function selected(event){
         if(event.type === 'click'){
            return true;
         } else if( event.type === 'keypress' ){
            const code = event.charCode || event.keyCode;
            if((code === 32) || (code === 13)){
               return true;
            }
         }
      }
   });

      function innerFunction(event){
         let currentTarget = $(event.currentTarget);
         let val = currentTarget.html();
         if(val == answer){
            currentTarget.addClass('animate-correct');
            App.answers.push('correct');
            $('h1').replaceWith(`<h1>Correct!</h1>`);
         } else {
            currentTarget.addClass('animate-incorrect');
            App.answers.push('incorrect');
            $('h1').replaceWith(`<h1>Incorrect - it's ${answer}</h1>`);
         }
         //find out value of last answer
         if(App.answers[App.answers.length - 1] == 'correct'){
            setTimeout(function(){
                    App.renderWindow();
            }, 250);
         } else {
            setTimeout(function(){
                    App.renderWindow();
            }, 1000);
         }
      }
}


// a11y
App.quizPage.a11yClick = function(event){
    if(event.type === 'click'){
        return true;
    }
    else if(event.type === 'keypress'){
        var code = event.charCode || event.keyCode;
        if((code === 32)|| (code === 13)){
            return true;
        }
    }
    else{
        return false;
    }
}

$('li').on('click keypress', function(event){
  if(a11yClick(event) === true){
  		App.quizPage.a11yClick();
  }
});

App.quizPage.removeLanding = function(){
	$('main').removeClass('landing');
	$('main').addClass('quizPage');
	$('main > *').remove();
}


App.quizPage.renderAnswers = function(answers) {
	let array = App.quizPage.generateAnswers(answers);
 	array.forEach((element, index) => {
    	$('.options')[index].append(element);
  	});			
}



//Turns binary string to array
App.quizPage.makeArray = function(ans){
	return App.quizPage.dec2bin(ans).split("");
}

//returns "0100", "1000", etc.
App.quizPage.dec2bin = function(num){
	if(num === 0){
		return "0000";
	} else if(num === 1){
		return "0001";
	} else if(num === 2){
		return "0010";
	} else if(num === 3){
		return "0011";
	} else if (num === 4){
		return "0100";
	} else if (num === 5){
		return "0101";
	} else if (num === 6){
		return "0110";
	} else if (num === 7){
		return "0111";
	} else if (num === 8){
		return "1000";
	} else if (num === 9){
		return "1001";
	} else if (num === 10){
		return "1010";
	} else if (num === 11){
		return "1011";
	} else if (num === 12){
		return "1100";
	} else if(num === 13){
		return "1101";
	} else if (num === 14){
		return "1110";
	} else if (num === 15){
		return "1111";
	} else {
		return "error";
	}
}

const makeDisplayBoxes = function(numberArray, answer){
	$('.box').each(function(i){
		if(numberArray[i] == "0"){
			$(this).removeClass('clicked unclicked');
			$(this).addClass('blank');
			$(this).html('0');
		} else {
			$(this).html('1');
			$(this).removeClass('clicked unclicked');
			$(this).addClass('lightning');
		}
	});
}


//Generates random number 0-15
App.randGen = function(){
	return Math.floor(Math.random() * 15);
}

App.quizPage.createOptionBoxes = function(answer, numberArray){
	//$('main').prepend(`<article><p>${generatedNumber}</p></article>`);
	$('main').append(
		`
			<form class="example-boxes">
            <fieldset class='multiple-choice-buttons'>
               <legend>Select an answer</legend>
   				<button class='options' type="button"></button>
   				<button class='options' type="button"></button>
   				<button class='options' type="button"></button>
   				<button class='options' type="button"></button>
            </fieldset>
			</form>
	`);	
	$('.box').each(function(index){
		if(numberArray[index] == "0"){
			$(this).html('0')
			$(this).removeClass('clicked unclicked');
			$(this).addClass('blank');
		} else {
			$(this).removeClass('clicked unclicked');
			$(this).addClass('lightning');
			$(this).html('1')
		}
	});
}

App.quizPage.renderAnswers = function(answers) {
	let array = App.quizPage.generateAnswers(answers);
 	array.forEach((element, index) => {
    	$('.options')[index].append(element);
  	});			
}

// article.multiple-choice > ul > li > label

App.quizPage.generateAnswers = function(answer) {
	let array = [];
	for(let i = 0; i < 4; i++){
		let flag = true; 
		let number = App.quizPage.generateNumber(answer, array);
		for(let j = 0; j < array.length; j++){
			if(array[j] === number){
				flag = false;
			}
		}
		if(flag == true){
			array.push(number);
		} else {
			i--;
		}
	}
	let answerIndex = Math.floor(Math.random() * 4);
	array.splice(answerIndex, 1, answer);
  	return array;
}

App.quizPage.generateNumber = function(answer, array){
	let number = App.randGen();
	if(number !== answer && !array.find(function(element){ return element === answer})) {
		return number;
	} else {
		return App.quizPage.generateNumber(answer, array);
	}
}
	
$( document ).ready(function(){
	App.landingPage.generateLandingPage();
});	