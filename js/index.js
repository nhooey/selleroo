$(document).ready(function () {

Person = Backbone.Model.extend({
  defaults: {
    name: 'default'
  },
  initialize: function(){
    console.log("Welcome to this world");
    this.on("change:name", function(model) {
      console.log("name changed to " + model.get("name"));
    });
  }
});

var person = new Person;
person.set({name: "foo"})

MissionStatus = Backbone.Model.extend({
  defaults: {
    name: "Mission",
    rank: 0,
    days_left: 0
  },
  initialize: function() {
  }
});

MissionStatuses = Backbone.Collection.extend({
  model: MissionStatus
});

mission_statuses = new MissionStatuses([
  { name: "Highest [Roo]turn",    rank: 1, days_left: 2  },
  { name: "Money Maker",          rank: 2, days_left: 2  },
  { name: "Display Flip",         rank: 3, days_left: 3  },
  { name: "Varietal Match",       rank: 4, days_left: 6  },
  { name: "Launch Push",          rank: 5, days_left: 7  },
  { name: "Objections Overruled", rank: 6, days_left: 12 }
]);

MissionView = Backbone.View.extend({
  tagName: 'tr',

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    console.log('MissionView.render()');
    var template = _.template( $("#template_mission_status").html(), this.model.toJSON() );
    this.$el.html(template);
    return this;
  },

});

App = Backbone.View.extend({
  el: $('#main'),

  initialize: function() {
    console.log('Initializing App...');
    this.list = $('#mission_list');

    var that = this;

    mission_statuses.each(function(ms) {
      var view = new MissionView({ model: ms });
      that.list.append(view.render().el);
    });
  },
});

SearchView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){
    //Pass variables in using Underscore.js Template
    var variables = { search_label: "My Search" };
    // Compile the template using underscore
    var template = _.template( $("#search_template").html(), variables );
    // Load the compiled HTML into the Backbone "el"
    this.$el.html( template );
  },
  events: {
    "click input[type=button]": "doSearch"
  },
  doSearch: function( event ){
    // Button clicked, you can access the element that was clicked with event.currentTarget
    console.log( "Search for " + $("#search_input").val() );
  }
});

var search_view = new SearchView({ el: $("#search_container") });

new App();

});
