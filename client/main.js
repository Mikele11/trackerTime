import { Template } from 'meteor/templating';
import { Times } from '../imports/api/times.js';
import './main.html';

var showDB = false;
function hideElem() {
  $('.addTimeBlock').hide();
  $('.proposalTime').hide();
  $('.tableDuv').hide();
  $('.addt').hide();
  $('.aboutProject').hide();
}  
Template.hello.onCreated(function() {

  var tmpl = this;

  tmpl.sortBy = new ReactiveVar('userEmail');
  tmpl.sortOrder = new ReactiveVar(1);
  tmpl.search = new ReactiveVar('');
  tmpl.searchBool = new ReactiveVar(false);
});

Template.hello.helpers({
  comp: function() {

    var tmpl = Template.instance();
    var sortBy = tmpl.sortBy.get();
    var sortOrder = tmpl.sortOrder.get();
    var search = tmpl.search.get();
    var searchBool = tmpl.searchBool.get();
    var sortSpecifier = {};
    sortSpecifier[sortBy] = sortOrder;
    var comp = Times.find({}, {sort: sortSpecifier});

    if (searchBool) {
      return Times.find({'userEmail':search});
    }

    return comp;
  }
});

Template.hello.events({
/*
  'click .start': function (e) {
    e.preventDefault();
    console.log('start');
    displayStopButton();
    startStopwatch();
    displayTimer();
  },
  'click .stop': function (e) {
    e.preventDefault();
    stopTimer()
  },
  'click .checking': function (e) {
    e.preventDefault();
    console.log('checking',document.getElementsByClassName("proposalTimeH"))
    document.querySelector('.pHours').innerHTML = document.getElementsByClassName("proposalTimeH")[0].value
    document.querySelector('.pMinute').innerHTML = document.getElementsByClassName("proposalTimeM")[0].value
  },
  'click .save': function (e) {
    e.preventDefault();
    var item = {
      userEmail: Meteor.user().emails[0].address,
      spentH: +document.getElementsByClassName("timeHouts")[0].value,
      spentM: +document.getElementsByClassName("timeMinute")[0].value,
      data: new Date()
    };
    Times.insert(item);
    console.log('tmes',Times.find().fetch());
  },
  'click .showTime': function (e) {
    e.preventDefault();
    var times = Times.find().fetch();
    var hrs = 0;
    var min = 0;
    for (var i = 0; i < times.length; i++) {
      if (Meteor.user().emails[0].address === times[i].userEmail) {
        hrs = hrs+ times[i].spentH;
        min = min+ times[i].spentM;
      }
    }
    if (min>59) {
      var th = Math.trunc(min/60);
      hrs = hrs+ th;
      min=min-th*60
    }
    document.querySelector('.allSpendetTime').innerHTML='Hours'+hrs+'  '+'Minute'+min;
  },
  */
 'click .propButton': function (e) {
    e.preventDefault();
    let hrs = +document.getElementsByClassName("needH")[0].value;
    let min = +document.getElementsByClassName("needM")[0].value;
    if (min>59) {
      var th = Math.trunc(min/60);
      hrs = hrs+ th;
      min=min-th*60
    }
    document.querySelector('.timeWhatYouNeed').innerHTML = 'Потрібно год : '+hrs+'  '+'хвилин : '+min;
  },
  'click .addBtn': function (e) {
    e.preventDefault();
    let hrs = +document.getElementsByClassName("spentH")[0].value;
    let min = +document.getElementsByClassName("spentM")[0].value;
    let business = document.getElementsByClassName("spentD")[0].value;
    if (min>59) {
      var th = Math.trunc(min/60);
      hrs = hrs+ th;
      min=min-th*60
    }
    try {
      var item = {
        userEmail: Meteor.user().emails[0].address,
        spentH: hrs,
        spentM: min,
        spentD: business,
        data: new Date()
      };
      Times.insert(item);
      console.log('tmes',Times.find().fetch());
    } catch (error) {
      alert('Please log in or register')
    }
  }, 
  'click th[data-sortby]': function(e, tmpl) {
    var sortBy = e.currentTarget.getAttribute('data-sortby');
    if (tmpl.sortBy.get() === sortBy) {
      tmpl.sortOrder.set(-tmpl.sortOrder.get());
    } else {
      tmpl.sortBy.set(sortBy);
      tmpl.sortOrder.set(1);
    }
  },
  'click .btnSearchUser': function (event, tmpl) {
    event.preventDefault();
    tmpl.search.set(document.getElementsByClassName("searchInTable")[0].value);
    tmpl.searchBool.set(true);
  },
  'click .btnSearchTotalTime': function (event) {
    event.preventDefault();
    var mail = document.getElementsByClassName("searchTotalTime")[0].value;
    var tim = Times.find({ userEmail: mail }).fetch();
    let hours = 0;
    let min = 0;
    for (let i=0;i<tim.length;i++) {
      hours = hours + tim[i].spentH;
      min = min + tim[i].spentM;
    }
    if (min>59) {
      var th = Math.trunc(min/60);
      hours = hours+ th;
      min=min-th*60;
    }
    alert('This user spent hours: '+hours+' and spent minute: '+min);
  },
  'click .addTimeMemuItem': function (event) {
    event.preventDefault();
    hideElem();
    $('.addTimeBlock').show();
    $('.addt').show();
  },
  'click .addNeedMemuItem': function (event) {
    event.preventDefault();
    hideElem();
    $('.proposalTime').show();
  },
  'click .tableMenuItem': function (event) {
    event.preventDefault();
    hideElem();
    $('.tableDuv').show();
  },
  'click .aboutMenuItem': function (event) {
    event.preventDefault();
    hideElem();
    $('.aboutProject').show();
  },
});
