document.addEventListener("DOMContentLoaded", function(event) {
    "use strict";

    function makeAjaxCall(callback, url,type,myMovieName,val,apiKey){
        $.ajax({
            type: 'GET',
            url: url + type + val + apiKey,
            async: true,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            statusCode: {
                500: function(){
                    console.error( " 500 Internal Server Error")
                },
                200: function(){
                    console.log( "200: Server Response Active")
                }
            },
            success: function(data) {
                console.info(data);
                //     $(".myMovieReturn").append('<li>' + JSON.stringify(data) + '</li>');

                let rows = data.results;
                for (var i in rows){
                    var poster = rows[i].poster_path;
                    var adult = rows[i].adult;
                    var overview = rows[i].overview;
                    var release = rows[i].release_date;
                    var genre = rows[i].genre_ids[0];
                    var id = rows[i].id;
                    var originalTitle = rows[i].original_title;
                    var originalLanguage = rows[i].original_language;
                    var title = rows[i].title;
                    var backrop = rows[i].backdrop_path;
                    var popularity = rows[i].popularity;
                    var voteCount = rows[i].vote_count;
                    var video = rows[i].video;
                    var voteAverage = rows[i].vote_average;

                    $('#myMovieReturn').append(
                        "<li><b>poster: </b>"+poster+"</li>"+
                        "<li><b> adult: </b>"+adult+"</li>"+
                        "<li><b> overview: </b>"+overview+"</li>"+
                        "<li><b> release: </b>"+release+"</li>"+
                        "<li><b> genre: </b>"+genre+"</li>"+
                        "<li><b> id: </b>"+id+"</li>"+
                        "<li><b> originalTitle: </b>"+originalTitle+"</li>"+
                        "<li><b> originalLanguage: </b>"+originalLanguage+"</li>"+
                        "<li><b>title: </b>"+title+"</li>"+
                        "<li><b>backrop: </b>"+backrop+"</li>"+
                        "<li><b>popularity: </b>"+popularity+"</li>"+
                        "<li><b>voteCount: </b>"+voteCount+"</li>"+
                        "<li><b>video: </b>"+video+"</li>"+
                        "<li><b>voteAverage: </b>"+voteAverage+"</li></br></br>");
                }
            },
            complete: function(e){
                console.log("Request Complete");
            }
        }).always(function(data) {
            console.info("Request Completed: " + JSON.stringify(data) );
            if ( callback !== 1 ){
                callback(data.responseText);
            }

        });
    }


/*
*
* If you are planning to test this solution please use the proper apiKey
*
* */
    $('button').on('click',(function(){
        var url = 'http://api.themoviedb.org/3/',
            type = 'search/movie?query=',
            apiKey = '&api_key=b25196cb6ea1946dc9e8fd6c3ddbe0a9'; // api key need to be generated on: www.themoviedb.org
        var val = $('#myMovie').val(),
            myMovieName = encodeURI(val);
        makeAjaxCall(1, url,type,myMovieName,val,apiKey);
    }));

    /*  Unit-tests */
    describe("Unit-tests specs", function() {
        var request, btn;

        beforeEach(function() {
            jasmine.Ajax.useMock();
            $('#btn').trigger('click');
        });

        it("[1.1] should on click function: ", function() {
            expect( $("#myMovie") !== null).toBeTruthy;
        });

        it("[1.2] should find search :", function() {
            var complete = false;

            makeAjaxCall(function(repo){
                expect(repo.name).toEqual('testPass');
                complete = true;
            });

            // fake HTTP request should return
            request = mostRecentAjaxRequest();
            request.response({
                status: 200,
                responseText: {name:"testPass"}
            });

            waitsFor(function(){
                return complete;
            });

        });

    });

})();


