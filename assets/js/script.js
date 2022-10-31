var currentDayEl = $('#currentDay');
var container = $('.container');
var jumbotron = $('.jumbotron');
var notificationEl = $('#notify');
var currentHour = moment().hour();

var hours = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
];

function displayTime() {
    var today = moment().format('dddd, MMMM Do');
    currentDayEl.text(today);
}

function renderTimeblocks() {
    var blocks = [
        '9AM',
        '10AM',
        '11AM',
        '12PM',
        '1PM',
        '2PM',
        '3PM',
        '4PM',
        '5PM'
    ];

    

    for (var i = 0; i < blocks.length; i++) {
        var timeBlock = $('<div class="row time-block">');
        var time = $('<p class="hour">');
        var eventDescription = $('<textarea>');
        var saveBtn = $('<button class="saveBtn fa-solid fa-floppy-disk">');

        // Uncomment line below to test currentHour at different values
        // currentHour = 14;

        time.attr('style', "width: 10%; text-align: right; padding: 16px; margin: 0px;");
        time.text(blocks[i]);

        eventDescription.attr('style', "width: 80%");

        // Check local storage for stored events
        var storedData = JSON.parse(localStorage.getItem(blocks[i]));
        if (storedData !== null) {
            eventDescription.val(storedData);
        }

        // Assign background class
        if (hours[i] < currentHour) {
            eventDescription.addClass('past');
        }
        else if (hours[i] == currentHour) {
            eventDescription.addClass('present');
        }
        else {
            eventDescription.addClass('future');
        }

        saveBtn.attr('style', "width: 10%");
        
        timeBlock.append(time);
        timeBlock.append(eventDescription);
        timeBlock.append(saveBtn);

        container.append(timeBlock);
    }

}

container.on('click', '.saveBtn', function (event) {
    var row = $(event.target);
    var hour = row.parent().children().eq(0).text();
    var eventInput = row.parent().children().eq(1).val();
    
    // key: hour, value: textarea value
    localStorage.setItem(hour, JSON.stringify(eventInput));
    
    // Save eventInput into local storage
    if (eventInput !== "") {
        // show notification that event was added to local storage
        notificationEl.addClass("show");
    }
    else {
        notificationEl.removeClass("show");
    }
});

displayTime();
renderTimeblocks();
jumbotron.attr('style', "margin: 0px; padding: 0px 32px;");
