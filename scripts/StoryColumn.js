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

var StoryColumn = new Class({
    //properties
	title: "",

	numberOfStories: 0,

	divContainer: null,

	divTitle: null,

	divStoriesContainer:null,

	divStoriesSuperContainer:null,

	storyState:"",

	divSuperContainer:null,
	divSuperContainerStyle:{
		width: '25%',
		height: '100%',
		display: 'table-cell',
		margin: '5px',
		'padding-top': '10px',
		'padding-right': '10px',
		'padding-left': '2px'


	},


	divContainerStyle:{
		background: '#F2F2F2',
		'min-width': '250px',
		display: 'block',
		height: '100%',
		width: '100%',
		'border-radius': '10px',
		border: '2px solid #D1D1D1',
		padding: '5px'

	},

	divTitleStyle:{
		width: '100%',
		height: '40px',
		background: '#858585',
		color: '#FFFFFF',
		'font-family': 'Courier New, Verdana',
		'text-align': 'center',
		'vertical-align': 'middle',
		'line-height': '40px',
		display: 'block',
		'border-top-left-radius': '10px',
		'border-top-right-radius': '10px',
		'font-weight': 'bold'
	},

	divStoriesContainerStyle:{
		width: '100%',
		height: '100%',
		color: 'red',
		'font-style': 'italic',
		'font-weight': 'bold',
		'font-family': 'Courier New, Verdana',
		'text-align': 'center',
		display: 'block',
		'overflow-y': 'auto',
		'overflow-x': 'hidden',
		position: 'relative',
		margin: '0px',
		padding: '0px'

	},

	divStoriesSuperContanerStyle:{
		height:'750px',
		display: 'block',
		margin: '0px',
		padding: '0px',
		border: '1px solid #858585'
	},


	//constructor
	initialize: function(storyState)
	{
		this.storyState = storyState;
    	this.createColumnDiv();
    	this.addTitleDiv();
    	this.addStoriesContainerDiv();
    	document.addEvent('domready',  this.onWindowResize.bind(this));
    	window.addEvent('resize', this.onWindowResize.bind(this));
    	this.numberOfStories = 0;


	},

	//methods
	setTitle: function(newTitle)
	{
		this.title = newTitle;
		this.updateTitle();
	},

	updateTitle: function()
	{
		if (this.divTitle != null)
			this.divTitle.set('html', this.title + " ("+this.numberOfStories+")");
	},

	createColumnDiv: function()
	{
		this.divContainer = new Element('div');
		this.divContainer.setStyles(this.divContainerStyle);
		this.divSuperContainer = new Element('div');
		this.divSuperContainer.setStyles(this.divSuperContainerStyle);
		this.divSuperContainer.grab(this.divContainer);

	},

	addTitleDiv: function()
	{
		this.divTitle = new Element('div');
		this.divTitle.setStyles(this.divTitleStyle);
		this.setTitle(this.title);
		this.divContainer.grab(this.divTitle);
	},


	addStoriesContainerDiv: function()
	{
		this.divStoriesContainer = new Element('div');
		this.divStoriesContainer.setStyles(this.divStoriesContainerStyle);
		this.divStoriesSuperContainer = new Element('div');
		this.divStoriesSuperContainer.setStyles(this.divStoriesSuperContanerStyle);
		this.divStoriesSuperContainer.grab(this.divStoriesContainer);
		this.divContainer.grab(this.divStoriesSuperContainer);
	},

	addStory: function(story)
	{
		this.divStoriesContainer.grab(story.getContent());
		this.numberOfStories++;
		this.updateTitle();
	},

	onWindowResize: function ()
	{
		if (this.divStoriesSuperContainer == null)
			return;
		var pos = getOffset(this.divStoriesSuperContainer);
		var newHeight = window.innerHeight - pos.top;
		this.divStoriesSuperContainer.setStyle('height', newHeight);
	},


	clear: function()
	{
		this.divStoriesContainer.empty();
		this.numberOfStories = 0;
		this.updateTitle();
	},

	getContent: function()
	{
		return this.divSuperContainer;
	}


});