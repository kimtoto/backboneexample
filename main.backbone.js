'use strict';
var Team = Backbone.Model.extend({
    defaults: {
        name: '',
        age: '',
        hobby: ''
    }
});


var Teams = Backbone.Collection.extend({});

var teams = new Teams();

var TeamView = Backbone.View.extend({
    model: new Team(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.teams-list-template').html());
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var TeamsView = Backbone.View.extend({
    model: teams,
    el: $('.teams-list'),
    initialize: function() {
        var self = this;
        this.model.on('add', this.render, this);
    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(team) {
            self.$el.append((new TeamView({
                model: team
            })).render().$el);
        });
        return this;
    }
});

var teamsView = new TeamsView();

$(document).ready(function() {
    $('.add-team').on('click', function() {
      var team = new Team({
          name: $('.name-input').val(),
          age: $('.age-input').val(),
          hobby: $('.hobby-input').val()
      });

      console.log(team.toJSON());
      teams.add(team);
    })
})
