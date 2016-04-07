//var oauth; // It Holds the oAuth data request
var requestParams; // Specific param related to request
var options = {
    // consumerKey: 'nFfkFJQMXkMUgbL41Jm12Pn0s',
    // consumerSecret: 'oUNjgSCJeQaIREQDzqI4xJsTZE7KY26tn0HXy6L4pKICt4q32p', // YOUR Twitter CONSUMER_SECRET

    consumerKey:'7wZqRHizZnPdZsJNDsPQ',
    consumerSecret: 'H3agoDV4cWQkSBZOoi53svfImEYX8Lh4Erv1LJ7IgGA', // YOUR Twitter CONSUMER_SECRET
    callbackUrl: "http://bitazure.com/callback.html"
}; // YOU have to replace it on one more Place                   
var twitterKey = "twtrKey"; // This key is used for storing Information related
var ref = '';
Ext.define('DNB.util.Twitter', {
    singleton: true,
    oauth: {},
    init: function () {

        debugger;

        window.localStorage.removeItem(twitterKey);
        // Apps storedAccessData , Apps Data in Raw format
        var storedAccessData, rawData = localStorage.getItem(twitterKey);
        // here we are going to check whether the data about user is already with us.
        if (localStorage.getItem(twitterKey) !== null) {
            alert('already login');
            // when App already knows data
            storedAccessData = JSON.parse(rawData); //JSON parsing
            options.accessTokenSecret = storedAccessData.accessTokenSecret; // data will be saved when user first first signin
            this.oauth = OAuth(options);
            this.oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true', function(data) { //alert('data.text-2:'+data.text);
                var entry = JSON.parse(data.text);
                console.log("USERNAME: " + entry.screen_name);
            }, function(data) {
                alert("ERROR: " + JSON.stringify(data));
            });
        } else {
            // we have no data for save user
            this.oauth = OAuth(options);
            this.oauth.get('https://api.twitter.com/oauth/request_token', function(data) {
                console.log("Here:A ");
                console.log(data);

                requestParams = data.text;
                var ot = (requestParams).split('&')[0];

                console.log('token:'+ot);
                ref = window.open('https://api.twitter.com/oauth/authenticate?' +ot, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes'); // This opens the Twitter authorization / sign in page
                ref.addEventListener('loadstart', function(event) {
                    console.log("Here:D ");
                    console.log(event.url);

                    if (event.url.match('http://bitazure.com/callback.html')) { 
                   
                        DNB.util.Twitter.success(event.url);
                        ref.close();
                    }
                });
                ref.addEventListener('loadstop', function(event) {
                    console.log("Here:E ");
                    DNB.util.Twitter.success(event.url);
                });
                ref.addEventListener('loaderror', function(event) {});
                ref.addEventListener('exit', function(event) {});
            }, function(data) {
                console.log("Here:A ");
                console.log("ERROR: " + data);
            });
        }
    },
    /*
     When ChildBrowser's URL changes we will track it here.
     We will also be acknowledged was the request is a successful or unsuccessful
     */
    success: function(loc) {
        
        // Here the URL of supplied callback will Load
        //alert(loc.toString().toLowerCase().indexOf("http://your-callback-url/?"));
        /*
         Here Plugin will check whether the callback Url matches with the given Url
         */
         console.log(loc);
         // return;
        if (loc.indexOf("http://bitazure.com/callback.html") > -1) {
            // alert('call back url success is >> '+loc);
            console.log("Here:B ");

            // Parse the returned URL
            var index, verifier = '';
            var params = loc.substr(loc.indexOf('?') + 1);
            params = params.split('&');
            for (var i = 0; i < params.length; i++) {
                var y = params[i].split('=');
                if (y[0] === 'oauth_verifier') {
                    verifier = y[1];
                }
            };
            // Here we are going to change token for request with token for access
            /*
             Once user has authorised us then we have to change the token for request with token of access
            here we will give data to localStorage.
             */
            this.oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier=' + verifier + '&' + requestParams, function(data) { //alert('data.text-123:'+data.text);
                var accessParams = {};
                var qvars_tmp = data.text.split('&');
                for (var i = 0; i < qvars_tmp.length; i++) {
                    var y = qvars_tmp[i].split('=');
                    accessParams[y[0]] = decodeURIComponent(y[1]);
                }
                options.accessTokenKey = accessParams.oauth_token; // data will be saved when user first time signin
                options.accessTokenSecret = accessParams.oauth_token_secret; // data will be saved when user first first signin
                // Saving token of access in Local_Storage
                var accessData = {};
                accessData.accessTokenKey = accessParams.oauth_token;
                accessData.accessTokenSecret = accessParams.oauth_token_secret;
                // Configuring Apps LOCAL_STORAGE
                console.log("TWITTER: Storing token key/secret in localStorage");
                localStorage.setItem('twitterKey', JSON.stringify(accessData));
                this.oauth = OAuth(options);
                this.oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true', function(data) {
                   
                    entry = JSON.parse(data.text);
                    
                    // DNB.app.getController('Login').TwitterLogin(entry.screen_name);
                    DNB.app.getController('Login').TwitterLogin(entry);
                }, function(data) {
                    Ext.Msg.alert("ERROR: " + JSON.stringify(data));
                });
               
                ref.close();
            }, function(data) {
                Ext.Msg.alert("ERROR: " + data.text);
                console.log(data);
            });
        } else {
            // Just Empty
            console.log("Here:C");
        }
    },
    api: (function() {
        // This is the base API url 
        var webserviceBaseUrl = 'http://192.169.199.42/dnb/';
        return {
            baseUrl: webserviceBaseUrl
        }
    })(),
    config: {
       
    },
    constructor: function(config) {
        this.initConfig(config);
    }
});