// Determine if device can hover and add class to body
const canHover = !(matchMedia('(hover: none)').matches);
if (canHover) {
    document.body.classList.add('can-hover');
}

async function contactSend() {
    const uri = 'https://localhost:5201/api/forms';
    var contactName = document.getElementById('contact-name');
    var contactEmail = document.getElementById('contact-email');
    var contactCompany = document.getElementById('contact-company');
    var message = document.getElementById('contact-message');
    var data = {};
    data['Name'] = contactName.value;
    data['Email'] = contactEmail.value;
    data['Company'] = contactCompany.value;
    data['Message'] = message.value;
    data = JSON.stringify(data);

    console.log('contactSend');
    console.log('data: ' + data);

    try {
        const response = await fetch(uri, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log('Success: ', result);

        // Update UI
        contactName.value = "";
        contactEmail.value = "";
        contactCompany.value = "";
        message.value = "";
    } catch (error) {
        console.error('Error: ', error);
    }
};

$("a[href^='#']").click(function(e) {
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top;

    $("body, html").animate(
        {
            scrollTop: position
        }, 400, 'linear'
    );
});

$(document).on("click", function(e) {
    var navMenu = $("#nav-menu");
    if (!navMenu.is(e.target) && navMenu.has(e.target).length === 0) {
        // $(".navbar-collapse").collapse("hide");
        navMenu.collapse("hide");
    }
});