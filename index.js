function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

function searchRepositories() {
  const search = document.getElementById("searchTerms").value
  const url = 'https://api.github.com/search/repositories?q='+ search
  $.get(url, function(data) {
    let results = data.items
    const src = document.getElementById("user-details-partial").innerHTML
    const template = Handlebars.compile(src)
    const resultsList = template(results)
    document.getElementById("results").innerHTML = resultsList
  }).fail(displayError)
}

function showCommits(el) {
  debugger
  const repo = el.dataset.repository
  const owner = el.dataset.owner
  const url = 'https://api.github.com/repos/'+owner+'/repo/commits'
  $.get(url, function(data) {
    let commits = data
    const src = document.getElementById("commits-template").innerHTML
    const template = Handlebars.compile(src)
    const commitsList = template(commits)
    document.getElementById("details").innerHTML = commitsList
  })
}

function displayError(error) {
  document.getElementById("errors").innerHTML = "I'm sorry, there's an error. Please try again."
}

$(document).ready(function (){
  handlebarsSetup()
});
