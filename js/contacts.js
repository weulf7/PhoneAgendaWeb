//This is like a class in JAVA
window.PhoneAgenda = {

    //Variable to stock our url
    //all our request will do on this url
    API_URL: "http://localhost:8082/contacts",


    //Creating a function respecting JSON syntax(name and value)

    createTask: function () {

        //We identify with jquerry the element

        const firstNameValue = $('#contact-first-name').val();
        const lastNameValue = $('#contact-last-name').val();
        const phoneNumberValue = $('#contact-phone-number').val();


        let body = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            phoneNumber: phoneNumberValue

        };


        //Now we send a request on the server
        $.ajax({
            url: PhoneAgenda.API_URL,
            method: "POST",
            contentType: "application/json",

            //This variable is a JSON file,so we ensure we transform it to string
            data: JSON.stringify(body)

            //Call-Back function(executable only once)
        }).done(function () {
            PhoneAgenda.getContacts();

        });


    },

    getContacts: function () {
        $.ajax({
            url: PhoneAgenda.API_URL,
            method: "GET",

        }).done(function (response) {
            PhoneAgenda.displayContacts(JSON.parse(response));
        })
    },

    getContactRow: function (contact) {
        return `
             <tr>
                <td>${contact.firstName}</td>
                <td>${contact.lastName}</td>
                <td>${contact.phoneNumber}</td>
                <td><a href="#" class="fas fa-trash-alt" data-id=${contact.id}></a>
                    <a href="#" class="fas fa-user-edit" data-id=${contact.id}></a>
                </td>
             </tr>
        `

    },

    displayContacts:function (contacts){
      let contactsHtml='';

      contacts.forEach(contact=> contactsHtml += PhoneAgenda.getContactRow(contact));

      $("#contacts tbody").html(contactsHtml);

    },


    bindEvents: function () {
        const submit = $('.save-button').click(function (event) {
            //We stop the default
            event.preventDefault();

            PhoneAgenda.createTask();


        });
    }

};
PhoneAgenda.getContacts();
PhoneAgenda.bindEvents();