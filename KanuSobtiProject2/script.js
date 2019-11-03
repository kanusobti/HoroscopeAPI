///when we click on a zodiac sign, it should open the result div which contains the horoscope for that zodiac sign for today with image of the zodiac sign. further it should also have options down below for other periodicals like week, month and year.


///
///lets declare variables
let apiEndpoint = 'http://horoscope-api.herokuapp.com/horoscope/';
let horoscopeResult = '';
let todaysDate = new Date();
let selectedSign = '';
let imgSrc = '';


//Create Horoscope App & Initialize it
const app =  {};

$(document).ready (function() {
	app.init();	
})//end of document ready

app.init = () => {

	 $('#mainGetHoroscope').on('click', function(e) { 
	 	 $('#videoDiv').hide();		 
    });


	 $('.zodiac').on('click', function(e) { 
	 	$("#zodiacPage").hide();
	 	let sign = $(this).attr('id');
	 	selectedSign = sign; //Fetch Selected Zodiac Sign here so that its accessible in other button/functions as well.
	 	imgSrc =  $(this).children('img').attr('src');
	    app.getHoroscope(sign,'today');	 
    });

	 $('#today').on('click', function(e) { 
	 	console.log('Today is Clicked: '+ selectedSign);
	 	 app.getHoroscope(selectedSign,'today');
    });

	 $('#weekly').on('click', function(e) { 
	 	console.log('Week is Clicked: '+ selectedSign);
	 	 app.getHoroscope(selectedSign,'week');
    });

	 $('#monthly').on('click', function(e) { 
	 	console.log('Month is Clicked: '+ selectedSign);
	 	 app.getHoroscope(selectedSign,'month');
    });

	 $('#yearly').on('click', function(e) { 
	 	console.log('Year is Clicked: '+ selectedSign);
	 	 app.getHoroscope(selectedSign,'year');
    });

	 $('#checkAgain').click(function() {
		     	location.reload();
	});
};



app.getHoroscope = (zodiacSign, periodical) => {    
		$.ajax({
						url: 'http://proxy.hackeryou.com',
						dataType: 'json',
						method:'GET',
						data: {
							reqUrl: apiEndpoint +periodical +`/`+zodiacSign,
							},
						
					}).then((result) => {
						// console.log(result);
						console.log(result);
						app.displayHoroscope(result, periodical, imgSrc);
					})
			
	};

app.displayHoroscope = (horoscope, periodical, image) =>{
   console.log(`My Horoscope: `+ horoscope.horoscope);
   console.log(`Sunsign: `+ horoscope.sunsign);
   $('.resultZodiacTitle').text(horoscope.sunsign);
   $('#emPrediction').text(horoscope.horoscope);
   $('.resultImage').attr('src',image);
   console.log('Image Source from Result is: '+ image);

   if(periodical == `today`){
	   console.log(`Today: `+ horoscope.date);
	   $('#periodicalPrediction').text(`DATE: ` + todaysDate);
   }
   else if (periodical == `week`){
   	   console.log(`Week: `+ horoscope.week);
       $('#periodicalPrediction').text(`WEEK: ` + horoscope.week);
   }
   else if(periodical == `month`){
   	console.log('Month: '+ horoscope.month);
   	$('#periodicalPrediction').text(`MONTH: ` + horoscope.month);
   }
   else{
   	console.log('Year: ' + horoscope.year);
   	$('#periodicalPrediction').text(`YEAR: ` + horoscope.year);
   }
};


