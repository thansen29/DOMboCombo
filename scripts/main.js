  const handleSubmit = (e) => {
    e.preventDefault();
    const name = $t('.field').val();
    $t.ajax({
      url: `https://api.github.com/users/${name}/repos?per_page=100`,
      success: (repos) => handleRepos(repos),
      error: () => handleErrors()
    })
  };

  const handleErrors = () => {
    $t('.errors').addClass("visible");
    const masterList = $t(".banner-list");
    masterList.empty();
  };

  const handleRepos = (repos) => {
    repos = JSON.parse(repos);
    const masterList = $t(".banner-list");
    $t('.errors').removeClass("visible");
    masterList.empty();
    if(repos.length){
      let count = 0;
      repos.forEach((repo) => {
        const listItem = $t("<li>");
        const langIcon = handleLanguage(repo.language);
        listItem.addClass("list-item");
        listItem.append(langIcon);
        listItem.append(`<a href=${repo.html_url}>${repo.name}</a>`);
        masterList.append(listItem);
      });
    } else {
      masterList.append("There's nothing here");
    }
  };

  const handleLanguage = (language) => {
    const i = $t("<i>");
    switch (language) {
      case "Ruby":
        i.addClass("devicon-ruby-plain-wordmark");
        return i;
      case "JavaScript":
        i.addClass("devicon-javascript-plain");
        return i;
      case "PHP":
        i.addClass("devicon-php-plain");
        return i;
      case "Java":
        i.addClass("devicon-java-plain-wordmark");
        return i;
      case "HTML":
        i.addClass("devicon-html5-plain-wordmark");
        return i;
      case "CSS":
        i.addClass("devicon-css3-plain");
        return i;
      case "C#":
        i.addClass("devicon-csharp-line");
        return i;
      case "C++":
        i.addClass("devicon-cplusplus-line");
        return i;
      case "TypeScript":
        i.addClass("devicon-typescript-plain");
        return i;
      case "Python":
        i.addClass("devicon-python-plain");
        return i;
      case "Swift":
        i.addClass("devicon-swift-plain");
        return i;
      default:
        i.addClass("fa");
        i.addClass("fa-github");
        return i;
    }
  };
