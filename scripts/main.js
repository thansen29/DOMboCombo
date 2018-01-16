$t(() => {
  $t.ajax({
    url: "https://api.github.com/users/thansen29/repos",
    success: (repos) => handleRepos(repos)
  });

  function handleRepos(repos){
    repos = JSON.parse(repos);
    const masterList = $t(".banner-list");
    repos.forEach((repo) => {
      masterList.append(`<li><a href=${repo.html_url}/>${repo.name}</li>`);
      $t("li").addClass("list-item");
    });
  }
});
