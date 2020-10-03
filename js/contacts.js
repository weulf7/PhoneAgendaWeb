let editId="";

//This is like a class in JAVA
window.PhoneAgenda = {

    //Variable to stock our url
    //all our request will do on this url
    API_URL: "http://localhost:8082/contacts",


    //Creating a function respecting JSON syntax(name and value)

    createTask: function () {

        //We identify with jQuery the element

        const firstNameValue = $('#contact-first-name').val();
        const lastNameValue = $('#contact-last-name').val();
        const phoneNumberValue = $('#contact-phone-number').val();
        const emailValue = $('#contact-email').val();


        let body = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            phoneNumber: phoneNumberValue,
            email:emailValue

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
            PhoneAgenda.hideButtonUpdate();
        })
    },

    clearForm:function (){
        document.getElementById("create-contact-form").reset();
    },

    updateContacts:function(id){
        const firstNameValue = $('#contact-first-name').val();
        const lastNameValue = $('#contact-last-name').val();
        const phoneNumberValue = $('#contact-phone-number').val();
        const emailValue = $('#contact-email').val();


        let body = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            phoneNumber: phoneNumberValue,
            email: emailValue
        };

        console.log(body);


        $.ajax({
            url:PhoneAgenda.API_URL + '?id='+id,
            method:"PUT",
            contentType: "application/json",
            data: JSON.stringify(body)

        }).done(function (response) {
            // PhoneAgenda.updateContacts(id);
            PhoneAgenda.clearForm();
            PhoneAgenda.getContacts();
        });

    },



    deleteContact:function (id){
        $.ajax({
            url:PhoneAgenda.API_URL + '?id='+id,
            method:"DELETE",
        }).done(function (){
            PhoneAgenda.getContacts();
        });

    },

    getContactRow: function (contact) {
        return `
             <tr data-id=${contact.id}>
                <td >${contact.firstName}</td>
                <td >${contact.lastName}</td>
                <td >${contact.phoneNumber}</td>
                <td>${contact.email}</td>
                <td><a href="#" class="fas fa-trash-alt"  data-id=${contact.id}></a>
                    <a href="#" class="fas fa-user-edit" data-first=${contact.firstName} data-last=${contact.lastName} data-phone=${contact.phoneNumber} data-email=${contact.email} data-id=${contact.id}></a>
                </td>
             </tr>
        `

    },

    displayContacts:function (contacts){
      let contactsHtml='';

      contacts.forEach(contact=> contactsHtml += PhoneAgenda.getContactRow(contact));

      $("#contacts tbody").html(contactsHtml);

    },

    hideButtonUpdate:function (){
        $(".update-button").hide();
    },

    hideButtonSave:function (){
        $(".save-button").hide();
    },



    bindEvents: function () {
        const submit = $('.save-button').click(function (event) {
            //We stop the default
            event.preventDefault();

            PhoneAgenda.createTask();


        });

        $('.update-button').click(function (event){
           event.preventDefault();
            let id=$(this).data('id');
           PhoneAgenda.updateContacts(id);
           $(".save-button").show();
            $(".create-update").text("Create contact");

        });



        $('#contacts').delegate('.fa-user-edit','click', function (event) {
            event.preventDefault();

            $(".create-update").text("Update contact");
            PhoneAgenda.hideButtonSave();
            $(".update-button").show();


            let id=$(this).data('id');
            const firstName = $(this).data("first");
            const last = $(this).data("last");
            const phone=$(this).data("phone");
            const email=$(this).data("email");

            $('.update-button').data("id",id);
            $('#contact-first-name').val(firstName);
            $('#contact-last-name').val(last);
            $('#contact-phone-number').val(phone);
            $('#contact-email').val(email);



        });



    $('#contacts').delegate('.fa-trash-alt','click', function (event) {
        event.preventDefault();

        const id = $(this).data('id');

        PhoneAgenda.deleteContact(id);

    });

        },




};
PhoneAgenda.getContacts();
PhoneAgenda.bindEvents();