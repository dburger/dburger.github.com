$(function() {
  // for the given user and repository loads the first level file list into a ul
  var repo2ul = function(user, repo, ul) {
    var baseUrl = "http://github.com/api/v2/json/";
    // determine the sha1 of the last commit
    $.getJSON(baseUrl + "commits/list/" + user + "/" + repo + "/master?callback=?", function(data) {
      // grab the filelist via the last commit
      var commit = data.commits[0].id;
      $.getJSON(baseUrl + "tree/show/" + user + "/" + repo + "/" + commit + "?callback=?", function(data) {
        var fileUrl = "http://github.com/" + user + "/" + repo + "/blob/master/";
        $.each(data.tree, function(i, val) {
          ul.append($("<li><a href='" + fileUrl + val.name + "'>" + val.name + "</a></li>"));
        });
      });
    });
  };

  repo2ul("dburger", "cheats", $("section#cheats>ul"));
});
