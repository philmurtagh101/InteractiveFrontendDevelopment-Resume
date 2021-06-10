
function userInformationHTML(user){
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
            </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>
    `;
}

    //from html page
function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();
    // if nothing in username return with a warning between h2 tags.
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
//display a cute looking gif for data loading
    $("#gh-user-data").html(`
    <div id="loader">
        <img src="assets/css/loader.gif" alt="loading..."/>
    </div>`);


// now that the loader gif is displaying we engage a promise methodology using when and then
$.when(
    $.getJSON(`https://api.github.com/users/${username}`)
) .then(
    function(response){
        var userData = response;
        $("#gh-user-data").html(userInformationHTML(userData));
    }, function(errorResponse){
        if(errorResponse.status === 404){
            $("#gh-user-data").html(`<h2>No user info for ${username}</h2>`);
        } else {
            console.log(errorResponse);
            $("gh-user-data").html(
                `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
            );
        }
    });
}