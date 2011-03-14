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

var StoryBoard = new Class({

    storyCols: null,
    tableContainer:null,
    tableUniqueRow:null,
    tableContainerStyle:{
        width: '100%',
        padding: '0px',
        margin: '0px',
        display: 'table',
        'table-layout':'fixed',
        'border-collapse': 'separate',
        'border-spacing': '5px 5px'
    },
    tableRowStyle:{
        display: 'table-row',
        'border-collapse': 'collapse'
    },
    tableCellStyle:{
        display: 'table-cell',
        'border-collapse': 'collapse',
        'vertical-align': 'top'
    },
    //constructor
    initialize: function(tableContainerId)
    {
        this.storyCols = {};
        this.tableContainer = document.getElementById(tableContainerId);
        this.tableContainer.setStyles(this.tableContainerStyle);
        this.tableUniqueRow = this.tableContainer.insertRow(0);
        this.tableUniqueRow.setStyles(this.tableRowStyle);

    },

    addStoryColumn: function (sc)
    {
        var cell = this.tableUniqueRow.insertCell(this.tableUniqueRow.cells.length);
        cell.setStyles(this.tableCellStyle);
        cell.grab(sc.getContent());
        this.storyCols[sc.storyState] = sc;
    },


    addStory: function(story)
    {
    	var colType;
    	//putting unscheduled stories in the same column as unstarted ones
        if (story.state == "unscheduled")
        	colType = "unstarted";
        //putting rejected stories in the same column as accepted ones
        else if (story.state == "rejected")
        	colType = "accepted";
        else
        	colType = story.state;

        var col = this.storyCols[colType];

        if (col == null)
        	return;

        col.addStory(story);

    },

    getLabelForStoryState: function(state)
    {
        var label = localStorage["storyBoard-"+state+"-label"];
        if (label == undefined || label == "")
            label = state;
        return label;
    },

    clear: function()
    {
        for (var col in this.storyCols)
            this.storyCols[col].clear();
    }

});
