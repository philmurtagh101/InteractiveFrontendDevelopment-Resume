
function userInformationHTML(user) {
    //So we have good info and now we can start to display it because we got a response.
    //the user.login is a response back indicating what you are typing. user.html_url is the person's url ref in github and the user.avatar is the their avatar. We just populate the DOM as needed. At the end we also throw in repos and following/follower info. 
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
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

function repoInformationHTML(repos) {
    if(repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    var listItemsHTML = repos.map(function(repo){
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`    
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong> Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
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

    // Promise activation - when() we get the JSON parsed username from api.github etc., then() if good response we pull via userInformationHTML otherwise errorResponse.status of 400 is no such user Else error is due to site problem or too many attempts etc.
    //
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
        , $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No user info for ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                );
            }
        });
}