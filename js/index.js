$(function() {

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

});
