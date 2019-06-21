$(function () {
  // This is our API key
  var APIKey = "Ygr8fsMC2n7esXN8Dfcqxy86smMt87Tw";

  let searchBtn = $('#search');
  let clearBtn = $('#clear');



  clearBtn.click((event) => {
    event.preventDefault();
    $('#articleList').empty();
    $('#searchTerm').val('');
    $('#startYear').val('');
    $('#endYear').val('');
  });

  searchBtn.click(function (event) {

    event.preventDefault();
    let searchTerm = $('#searchTerm').val();
    let numRecords = $('#records').val();
    let yearStart = $('#startYear').val();
    let yearEnd = $('#endYear').val();

    let optional = '';
    if (yearStart !== '') {
      optional += 'begin_date=' + yearStart + '0101&';
    }
    if (yearEnd !== '') {
      optional += 'end_date=' + yearEnd + '1230&';
    }

    // https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20100101&end_date=20111230&api-key=kLum9kZVE7GfgNn2NRvRcCAMEd99yQsB

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + optional + "q=" + searchTerm + "&api-key=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (data) {
        let results = data.response.docs;
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(results);

        for (let i = 0; i < results.length; i++) {
          let newsArticle = results[i];
          let divNews = $('<div>').addClass('card');
          divNews.text(newsArticle.abstract);
          $('#articleList').append(divNews);
        }
      });
  })
})