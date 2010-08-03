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

var StoryCard = new Class({

	description: "",
	type: "",
	owner: "",
	points: 0,
	state:"",
	divContainer:null,

    divContainerStyle:
    {
		background: '#FFF',
		height: "120px",
		padding: "5px",
		margin: "5px",
		'min-width': "200px",
		'border-radius': '10px',
		border: '2px solid #D1D1D1',
		padding: '10px'
	},
	divDescription:null,

	divDescriptionStyle:
	{
		width: '100%',
		height: '90%',
		color: 'black',
		'font-style': 'normal',
		'font-weight': 'bold',
		'font-family': 'Courier New, Verdana',
		'text-align': 'left',
		display: 'block',
		'white-space': 'normal'
	},

	divOwner:null,
	divOwnerStyle:
	{
		width: '70%',
		height: '10%',
		color: 'black',
		'font-style': 'normal',
		'font-weight': 'normal',
		'font-family': 'Courier New, Verdana',
		'text-align': 'left',
		'float': 'left',
		'font-size': '12px'
	},

	divTypeAndPointsContainer:null,
	divTypeAndPointsContainerStyle:
	{
		width: '30%',
		height: '10%',
		'text-align': 'center',
		'float': 'right'
	},

	divTypeContainer:null,
	divTypeContainerStyle:
	{
		width: '50%',
		height: '100%',
		'text-align': 'center',
		'float': 'left'
	},

	divPointsContainer:null,
	divPointsContainerStyle:
	{
		width: '50%',
		height: '100%',
		color: 'black',
		'font-style': 'italic',
		'font-weight': 'bold',
		'font-family': 'Courier New, Verdana',
		'text-align': 'right',
		'float': 'right'
	},


	//constructor
	initialize: function(description, state, type, owner, points)
	{
    	this.description = description;
    	this.state = state;
    	this.type = type;
    	this.owner = owner;
    	this.points = points;
		this.createDivContainer();
		this.createDivDescription();
		this.createDivOwner();
		this.createDivTypeAndPoints();

	},

	createDivContainer: function()
	{
		this.divContainer = new Element('div');
		this.divContainer.setStyles(this.divContainerStyle);
		var bg;
		switch (this.state)
		{
			case "started":
				bg = "#FCE1E4";
				break;
			case "finished":
				bg = "#FCF6D9";
				break;
			case "delivered":
				bg = "#EAFCD7";
				break;

		}
		this.divContainer.setStyle('background', bg);
	},

	createDivDescription: function()
	{
		this.divDescription = new Element('div');
		this.divDescription.setStyles(this.divDescriptionStyle);
		this.divDescription.set('html',this.description);
		this.divContainer.grab(this.divDescription);
	},

	createDivOwner: function()
	{
		this.divOwner = new Element('div');
		this.divOwner.setStyles(this.divOwnerStyle);
		this.divOwner.set('html', this.owner);
		this.divContainer.grab(this.divOwner);
	},


	createDivTypeAndPoints: function()
	{
		this.divTypeAndPointsContainer = new Element('div');
		this.divTypeAndPointsContainer.setStyles(this.divTypeAndPointsContainerStyle);

		this.divTypeContainer = new Element('div');
		this.divTypeContainer.setStyles(this.divTypeContainerStyle);
		this.divTypeAndPointsContainer.grab(this.divTypeContainer);

		var typeIcon = new Element('img');
		if (this.type == 'feature')
			typeIcon.src = 'images/feature_icon.png';
		else if (this.type == 'chore')
			typeIcon.src = 'images/chore_icon.png';
		this.divTypeContainer.grab(typeIcon);


		this.divPointsContainer = new Element('div');
		this.divPointsContainer.setStyles(this.divPointsContainerStyle);
		this.divTypeAndPointsContainer.grab(this.divPointsContainer);
		this.divPointsContainer.set('html', this.points);
		this.divContainer.grab(this.divTypeAndPointsContainer);

	},

	getContent: function()
	{
		return this.divContainer;
	}

});