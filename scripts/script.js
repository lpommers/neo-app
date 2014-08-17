//for simplicity I have placed the attached JSON directly in the scripts file. Under different cicumstances I would most likely make an HTTP request to get all the review data as it is unlikely review data would be hard-coded.
var reviews = [
    {
        "firstName":"Simon",
        "lastName":"Lock",
        "fullName":"Simon Lock",
        "location":"Kolding",
        "reviewTitle":"Super quality.. I will show here again!",
        "reviewBody":"Super nice quality, fast devilery, good prices. I will shop here again!",
        "starRating":"5",
        "date" : "2011-01-27T11:40:52.280Z"
    },
    {
        "firstName":"Gav",
        "lastName":"",
        "fullName":"Gav",
        "location":"",
        "reviewTitle":"Princely Sum",
        "reviewBody":"A decent local curry house in Faversham, Kent known for its Elvis nights.",
        "starRating":"4",
        "date" : "2014-03-23T11:40:52.280Z"
    },
    {
        "firstName":"Justin",
        "lastName":"Wright",
        "fullName":"Justin Wright",
        "location":"London, GB",
        "reviewTitle":"Good Services",
        "reviewBody":"A decent place to introduce your taste buds to fiery Indian fare",
        "starRating":"3",
        "date" : "2014-04-13T11:40:52.280Z"
    },
    {
        "firstName":"Erika",
        "lastName":"Wolfe",
        "fullName":"Erika Wolfe",
        "location":"Gothenburg, SE",
        "reviewTitle":"Nightmare experience - no product, no communication, no refund; improved by rapid resolution",
        "reviewBody":"In early 2012, I ordered a set of chairs from Infurn. I thought that by ordering in March, I would have what I needed by November, certainly. I wanted the perfect chairs for my house, and really did not NEED them before the annual Thanksgiving dinner (the only time of year I have a need for a whole lot of chairs at one time).I played it safe, I thought, by ordering so far in advance.Week after week, month after month, Infurn's website kept updating the status of the order so that the chairs' arrival would be further and further in the distant future. Finally when the week of Thanksgiving arrived, and I had had contact with their customer service in early November (and their only clueless reply was to say, 'We had manufacturing problems; let's hope the chairs arrive this week as scheduled.'), I still had no chairs, had to go out and buy some other chairs and still had no clue when the Infurn chairs might arrive.At some point I finally just requested a refund because Infurn could neither deliver my chairs nor give me a solid date about when I might receive them when I inquired about a delivery date. They finally offered me a refund - which I accepted on 14 December 2012.",
        "starRating":"2",
        "date" : "2012-09-03T11:40:52.280Z"
    },
    {
        "firstName":"Hugo",
        "lastName":"Beja",
        "fullName":"Hugo Beja",
        "location":"Praia Da Barra, PT",
        "reviewTitle":"FRAUD",
        "reviewBody":"I've been patiently waiting for a miracle to happen with our order AU-316084, 12 Chairs!! First the delays, lots and lots of delays with no apparent reason... after they send just 1/2 of the order and say it's all... So we bought 'Pairs' of chairs... we paid for 5 PAIRS and received 5 chairs!!! The other 2, the rocket chairs we never receive....Communication ZERO, they simply ignore the e-mails... when they did respond they asked us to prove our order to be pairs!!! LOL and just stopped communicating... their website is constantly down... probably to make lose interest and rest your forces to recover what you paid for!!",
        "starRating":"1",
        "date" : "2014-05-03T11:40:52.280Z"
    }
];

///
///
///HELPER FUNCTIONS
///
///

//sort by newest review
function sortNewest(a,b){
	var prev = new Date(a.date);
	var next = new Date(b.date);
	return next - prev;
}

//sort by oldest review
function sortOldest(a,b){
	var prev = new Date(a.date);
	var next = new Date(b.date);
	return  prev - next;
}

//sort by highest rated
function sortHighest(a,b){
	var prev = Number(a.starRating);
	var next = Number(b.starRating);
	return next - prev;
}

//sort by lowest rated
function sortLowest(a,b){
	var prev = Number(a.starRating);
	var next = Number(b.starRating);
	return prev - next;
}


//takes date from Javascript and formats it into a string with abbreviated months
function dateFormat(dateString){
	var date = new Date(dateString),
			months = ['Jan', 'Feb', 'Mar', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	return months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
}

//takes the starRating from each review adds them and returns an average
function average(reviews){
	var ratings = reviews.map(function(each){
		return each.starRating;
	});
	var total = ratings.reduce(function(a,b){
		return Number(a) + Number(b);
	});
	return Math.floor(total / ratings.length);
}

//build html with correct average rating image and the number of reviews and inserts it into the DOM in the correct spot. use of IIFE to do this immediately
(function buildAverageRating(){
	var reviewImg = document.createElement('img'),
			src = "images/" + average(reviews) + "-stars-260x48.png";
	reviewImg.setAttribute('src', src);
	reviewImg.setAttribute('class', 'review-img');

	var parent = document.getElementsByClassName('average')[0];
	var secondChild = parent.childNodes[2];
	parent.insertBefore(reviewImg, secondChild);

	var small = document.getElementById('average-rating');
	small.innerText = "(" + reviews.length + " reviews)";
})();

//finds all the paragraphs that are long and require the show more/less button. Everything over 150 chars is considered long.
function findLongParas(){
	var paragraphs = document.getElementsByTagName('p'),
			charLength = 150;

	[].map.call(paragraphs, function(each){
		if (each.innerText.length > charLength) {
		each.nextSibling.className +=
	' show';
		}
	});
}

//jquery
$(function(){

	//I would have preferred to use something like Angular here with ng-repeat to avoid all this nested HTML in JS. Angular would allow for dynamic native HMTL. But the instructions said no 3rd party JS except JQuery.. so this is what I came up with
function buildAllReviews (reviews) {
	//removes old reviews from DOM
	$('.review').remove();
	//builds new review DOM structure
	$.each(reviews, function(index) {
		$("body")
			.append(
					//add container div
			    $("<div class='container review'>")
			    //star review img
			    .append("<img class='review-img' src='images/" + reviews[index].starRating + "-stars-260x48.png'>")
			    //review title
			    .append(
			        $("<h1 class = 'title'>" + reviews[index].reviewTitle + "</h1>"))
			    //review content
			    .append(
			        $("<p class= 'show-less'>" + reviews[index].reviewBody+ "</p>")
			        )
			    .append(
			    	$("<a class='hide more-less-button'>Show More...</a>"))
			    //nested div
			    .append(
			        $("<div class='review-footer'>")
			        //full name
			        .append("<h2>" + reviews[index].fullName +"</h2>")
			        //location
			        .append("<h2>" + reviews[index].location +"</h2>")
			        //date
			        .append("<h2>" + dateFormat(reviews[index].date) +"</h2>")
			    )
			);
	});
	//add show more/less button to long paragraphs
	findLongParas();
}


///
///
///EVENT LISTENERS
///
///

	//show more/less action
	//changes the height of the <p> that contains review body.
	$('body').on('click', 'a.more-less-button' ,function(){
		if ($(this).prev().hasClass('show-less')) {

			$(this).prev().css('height', 'auto');
			$(this).prev().addClass('show-more');
			$(this).prev().removeClass('show-less');
			$(this).text('Show Less...');
		}
		else {

			$(this).prev().css('height', '25px');
			$(this).prev().addClass('show-less');
			$(this).prev().removeClass('show-more');
			$(this).text('Show More...');
		}
	});

//finds which radio button is selected and then sort the reviews based on the selected radio
$('#review-sort input').click(function(){
	var sortRadio = document.getElementById('review-sort').sortOptions;
	var checked, sortedReviews;
	for (var i = 0; i < sortRadio.length; i++){
		if (sortRadio[i].checked === true) {
			checked = sortRadio[i].id;
		}
	}
	//sort based on case
	switch (checked) {
		case "newest":
			sortedReviews = reviews.sort(sortNewest);
			return buildAllReviews(sortedReviews);
		case "oldest":
			sortedReviews = reviews.sort(sortOldest);
			return buildAllReviews(sortedReviews);
		case "highest":
			sortedReviews = reviews.sort(sortHighest);
			return buildAllReviews(sortedReviews);
		case "lowest":
			sortedReviews = reviews.sort(sortLowest);
			return buildAllReviews(sortedReviews);
	}
});


///
///
/// INITIALIZE DEFAULT REVIEWS
///
///

buildAllReviews(reviews);

});



