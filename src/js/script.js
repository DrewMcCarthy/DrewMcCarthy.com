
async function submitForm(event) {
    // console.log(event);
    validateForm(event);
}

async function validateForm(event) {
    if (!event.target.form) {
        return;
    }

    var form = event.target.form;
    form.classList.add("was-validated");

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        contactSend(event);
    }
}

// Send form to API
async function contactSend(event) {
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
    // console.log(data);

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
       
        // Update UI
        event.target.form.reset();
        event.target.form.classList.remove("was-validated");
        event.target.classList.add("animated", "bounceIn");
        event.target.disabled = true;
        event.target.innerText = "Thank You!";
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