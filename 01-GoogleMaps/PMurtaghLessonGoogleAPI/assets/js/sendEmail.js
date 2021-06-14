function sendMail(contactForm){
    //first argument is the service and second is the template
    //email.js is a promise
    emailjs.send("service_6ilt0wn","rosie_JStest_101",{
        "from_name":contactForm.name.value, 
        "from_email":contactForm.emailaddress.value,
        "project_request":contactForm.projectsummary.value
    })
    .then(
        function(response){
            console.log("SUCCESS", response);
        },
        function(error){
            console.log("FAILED", error);
        });

        return false;
}