/**
 *  The MIT License
 *
 *  Copyright (c) 2010 Simone Vicentini
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var XmlRequest = new Class({

    method: "",
    URL: "",
    async: false,
    username: "",
    password: "",
    onLoad: null,
    onError:null,
    onRequestStart:null,
    params:"",

    initialize: function(method, URL, async, username, password)
    {
        this.method = method;
        this.URL = URL;
        this.async = async;
        this.username = username;
        this.password = password;
    }
});


var PivotalTrackerAPIClient = new Class ({

    httpProtocol:"http",
    httpsProtocol:"https",
    apiRoot: "://www.pivotaltracker.com/services/v3/",
    token: "",
    xmlHttpRequest:null,
    requestQueue:null,
    isHttpRequestRunning: false,
    currentRequest:null,

    initialize: function(token, useHttps)
    {
        this.token = token;
        this.requestQueue = new Array();
        if (useHttps == "true")
            this.apiRoot = this.httpsProtocol + this.apiRoot;
        else
            this.apiRoot = this.httpProtocol + this.apiRoot;
    },

    onRequestSuccess: function(responseText, responseXML)
    {
        this.currentRequest.onLoad(responseText, responseXML);
        this.runNextRequest();
    },

    onRequestFailed: function(xhr)
    {
        this.currentRequest.onError(this.xmlHttpRequest);
        this.runNextRequest();
    },

    onRequestSent: function(xhr)
    {
        this.currentRequest.onRequestStart();
    },


    getProject: function(projectId, onRequestStart, onLoad, onError)
    {
        var request = new XmlRequest("get", this.apiRoot + "projects/" + projectId, true);
        request.onLoad = onLoad;
        request.onError = onError;
        request.onRequestStart = onRequestStart;
        this.fireRequest(request);
    },

    getStories: function(projectId, filter, onRequestStart, onLoad, onError)
    {
        var request = new XmlRequest("get", this.apiRoot + "projects/" + projectId + "/stories", true);
        request.onLoad = onLoad;
        request.onError = onError;
        request.onRequestStart = onRequestStart;
        request.params = filter;
        this.fireRequest(request);
    },

    getCurrentIterationStories: function(projectId, onRequestStart, onLoad, onError)
    {
        var request = new XmlRequest("get", this.apiRoot + "projects/" + projectId + "/iterations/current", true);
        request.onLoad = onLoad;
        request.onError = onError;
        request.onRequestStart = onRequestStart;
        this.fireRequest(request);
    },

    fireRequest: function(request)
    {
        if (this.isHttpRequestRunning)
        {
            this.requestQueue.push(request);
            return;
        }
        try
        {
            this.currentRequest = request;
            this.isHttpRequestRunning = true;
            this.xmlHttpRequest = new Request({method:request.method, url:request.URL, async:request.async});
            this.xmlHttpRequest.setHeader("X-TrackerToken", this.token);
            this.xmlHttpRequest.addEvent('onSuccess', this.onRequestSuccess.bind(this));
            this.xmlHttpRequest.addEvent('onFailure', this.onRequestFailed.bind(this));
            this.xmlHttpRequest.addEvent('onRequest', this.onRequestSent.bind(this));
            this.xmlHttpRequest.send(request.params);
        }catch(e)
        {
            this.currentRequest.onError(this.xmlHttpRequest);
            this.isHttpRequestRunning = false;
            this.runNextRequest();

        }
    },

    runNextRequest: function()
    {
        this.isHttpRequestRunning = false;
        if (this.requestQueue.length > 0)
        {
            var request = this.requestQueue.shift();
            this.fireRequest.delay(500, this, request);
        }
    },


    abortAllRequests: function()
    {
        if (this.isHttpRequestRunning)
            this.xmlHttpRequest.cancel();
        this.requestQueue = new Array();
        this.isHttpRequestRunning = false;
    }

});
