
async function contactSend() {
    const uri = "https://drewmccarthy.com/api/contact";
    var contactName = document.getElementById("contact-name");
    var contactEmail = document.getElementById('contact-email');
    var contactCompany = document.getElementById('contact-company');
    var contactMessage = document.getElementById("contact-message");
    var data = {};
    data['Name'] = contactName.value;
    data['Email'] = contactEmail.value;
    data['Company'] = contactCompany.value;
    data['Message'] = contactMessage.value;
    data = JSON.stringify(data);
    console.log(data);

    try {
        const response = await fetch(uri, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!await response.ok) {
            throw response.status + response.statusText;
        }
       
        console.log('Success: ', response);

        // Update UI
        contactName.value = "";
        contactEmail.value = "";
        contactCompany.value = "";
        contactMessage.value = "";
    } catch (error) {
        console.error('Error: ', error);
    }
};

// Smooth Scroll
$("a[href^='#']").click(function(e) {
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top;

    $("body, html").animate(
        {
            scrollTop: position
        }, 400, 'linear'
    );
});

// Click anywhere to collapse menu
$(document).on("click", function(e) {
    var navMenu = $("#nav-menu");
    if (!navMenu.is(e.target) && navMenu.has(e.target).length === 0) {
        // $(".navbar-collapse").collapse("hide");
        navMenu.collapse("hide");
    }
});