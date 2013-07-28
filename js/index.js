$(document).ready(function () {

Person = Backbone.Model.extend({
  defaults: {
    name: 'default'
  },
  initialize: function(){
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
  { id: 1, name: "Highest [Roo]turn",    rank: 1, days_left: 2  },
  { id: 2, name: "Money Maker",          rank: 2, days_left: 2  },
  { id: 3, name: "Display Flip",         rank: 3, days_left: 3  },
  { id: 4, name: "Varietal Match",       rank: 4, days_left: 6  },
  { id: 5, name: "Launch Push",          rank: 5, days_left: 7  },
  { id: 6, name: "Objections Overruled", rank: 6, days_left: 12 }
]);

MissionView = Backbone.View.extend({
  tagName: 'div',
  className: 'accordion-group',

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var template = _.template( $("#template_mission_status").html(), this.model.toJSON() );
    this.$el.html(template);
    return this;
  },

});

App = Backbone.View.extend({
  el: $('#main'),

  initialize: function() {
    this.list = $('#accordion');

    var that = this;

    mission_statuses.each(function(ms) {
      var view = new MissionView({ model: ms });
      that.list.append(view.render().el);
    });
  },
});

new App();

});
