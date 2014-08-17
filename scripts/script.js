//for simplicity I have placed the attached JSON directly in the scripts file. Under different cicumstances I would most likely make an HTTP request to get all the review data as it is unlikely review data would be hard-coded.
var reviews = [
    {
        "firstName":"Simon",
        "lastName":"Lock",
        "fullName":"Simon Lock",
        "location":"Kolding",
        "reviewTitle":"Super quality.. I will show here again!",
        "reviewBody":"Super nice quality, fast devilery, good prices. I will shop here again!",
        "starRating":"5"
    },
    {
        "firstName":"Gav",
        "lastName":"",
        "fullName":"Gav",
        "location":"",
        "reviewTitle":"Princely Sum",
        "reviewBody":"A decent local curry house in Faversham, Kent known for its Elvis nights.",
        "starRating":"4"
    },
    {
        "firstName":"Justin",
        "lastName":"Wright",
        "fullName":"Justin Wright",
        "location":"London, GB",
        "reviewTitle":"Good Services",
        "reviewBody":"A decent place to introduce your taste buds to fiery Indian fare",
        "starRating":"3"
    },
    {
        "firstName":"Erika",
        "lastName":"Wolfe",
        "fullName":"Erika Wolfe",
        "location":"Gothenburg, SE",
        "reviewTitle":"Nightmare experience - no product, no communication, no refund; improved by rapid resolution",
        "reviewBody":"In early 2012, I ordered a set of chairs from Infurn. I thought that by ordering in March, I would have what I needed by November, certainly. I wanted the perfect chairs for my house, and really did not NEED them before the annual Thanksgiving dinner (the only time of year I have a need for a whole lot of chairs at one time).I played it safe, I thought, by ordering so far in advance.Week after week, month after month, Infurn's website kept updating the status of the order so that the chairs' arrival would be further and further in the distant future. Finally when the week of Thanksgiving arrived, and I had had contact with their customer service in early November (and their only clueless reply was to say, 'We had manufacturing problems; let's hope the chairs arrive this week as scheduled.'), I still had no chairs, had to go out and buy some other chairs and still had no clue when the Infurn chairs might arrive.At some point I finally just requested a refund because Infurn could neither deliver my chairs nor give me a solid date about when I might receive them when I inquired about a delivery date. They finally offered me a refund - which I accepted on 14 December 2012.",
        "starRating":"2"
    },
    {
        "firstName":"Hugo",
        "lastName":"Beja",
        "fullName":"Hugo Beja",
        "location":"Praia Da Barra, PT",
        "reviewTitle":"FRAUD",
        "reviewBody":"I've been patiently waiting for a miracle to happen with our order AU-316084, 12 Chairs!! First the delays, lots and lots of delays with no apparent reason... after they send just 1/2 of the order and say it's all... So we bought 'Pairs' of chairs... we paid for 5 PAIRS and received 5 chairs!!! The other 2, the rocket chairs we never receive....Communication ZERO, they simply ignore the e-mails... when they did respond they asked us to prove our order to be pairs!!! LOL and just stopped communicating... their website is constantly down... probably to make lose interest and rest your forces to recover what you paid for!!",
        "starRating":"1"
    }
];


$(function(){

	//here I loop over all the data from the JSON and create an HTML structure for each review that is appended to the body
	//


	//I would have preferred to use something like Angular here with ng-repeat to avoid all this nested HTML in JS. Angular would allow for dynamic native HMTL. But the instructions said no 3rd party JS except JQuery.. so this is what I came up with
	$.each(reviews, function(index) {

		$("body")
			.append(
					//add container div
			    $("<div class='container'>")
			    //star review img
			    .append("<img class='review-img' src='images/" + reviews[index].starRating + "-stars-260x48.png'>")
			    //review title
			    .append(
			        $("<h1>" + reviews[index].reviewTitle + "</h1>"))
			    //review content
			    .append(
			        $("<p class= 'less'>" + reviews[index].reviewBody+ "</p>")
			        )
			    .append(
			    	$("<a class='hide'>show more</a>"))
			    //nested div
			    .append(
			        $("<div class='review-footer'>")
			        //full name
			        .append("<h2>" + reviews[index].fullName +"</h2>")
			        //location
			        .append("<h2>" + reviews[index].location +"</h2>")
			        //date
			        .append("<h2>Aug 20th 2014</h2>")
			    )
			);
	});

	var paragraphs = $('p');
	console.log(paragraphs);

	for(var i = 0; i < paragraphs.length; i++){
		console.log(paragraphs[i].nextSibling);
		console.log(paragraphs[i].innerText.length);
		if (paragraphs[i].innerText.length > 100) {
			paragraphs[i].nextSibling.setAttribute('class' ,'show');
			paragraphs[i].nextSibling.className += ' more';

		}
	}

	$('a').click(function(){
		console.log($(this).prev());
		if ($(this).prev().hasClass('less')) {

			$(this).prev().css('height', '100px');
		}
	});

});
