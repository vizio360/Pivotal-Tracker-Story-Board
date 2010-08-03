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

var Loader = new Class({

    loaderDiv: null,
    timeout: 0,
    timer: null,

    initialize: function(loaderDiv, timeout)
    {
        this.loaderDiv = loaderDiv;
        this.timeout = timeout;
    },

    showLoader: function()
    {
        this.timer = this.makeLoaderVisible.bind(this).delay(this.timeout);
    },

    makeLoaderVisible: function()
    {
        this.loaderDiv.setStyle('display', 'block');
        window.addEvent('resize',  this.centerLoader.bind(this));
        this.centerLoader();
    },

    centerLoader: function()
    {
        var size = this.loaderDiv.getSize();
        this.loaderDiv.setStyle('top', (window.innerHeight - size.y)/2);
        this.loaderDiv.setStyle('left', (window.innerWidth - size.x)/2);
    },

    hideLoader: function()
    {
        if (this.timer)
            $clear(this.timer);
        this.loaderDiv.setStyle('display', 'none');
    }
});
