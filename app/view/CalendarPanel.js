//var calendarView = new Ext.ux.TouchCalendarView({
//					mode: 'month',
//					weekStart: 1,
//					value: new Date()
//                });
Ext.define('POS.view.CalendarPanel', {
    extend: 'Ext.Panel',
    xtype: 'calendarpanel',
    id: 'calendar-panel',
    //requires: ['POS.view.TouchCalendarView'],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    cls: 'ux-date-picker',
    bodyCls: 'ux-date-picker',
    minDate: new Date(2011, 1, 1),
    maxDate: new Date(2012, 12, 1),
    autoHeight: true,
    value: new Date(),
    weekstart: 1,
    config: {
    //title: ''///,
    //                items: [new Ext.ux.DatePicker({
    //                  fullscreen: true,
    //                })]
    //        items: [{ xtype: 'calanderview', width: 400 }]
    //html: '<input id="date" type="textbox"/><div id="calendar "/>'
    //items: [calendarView]
    //        listeners: {
    //            activate: function () {
    //                alert(123);
    //                new Ext.ux.DatePicker({ fullscreen: true });
    //            }
    //        }
},
constructor: function (config) {
    this.callParent(arguments);
    this.minDate = this.minDate ? Ext.Date.clearTime(this.minDate, true) : null;
    this.maxDate = this.maxDate ? Ext.Date.clearTime(this.maxDate, true) : null;
    //alert('this.maxDate' + this.maxDate);
    //this.body.update('this.generateCalendar(d.getMonth(), d.getFullYear())');
},
/**
* Set selected date.
* @cfg {Date} v Date to select.
*/
setValue: function (v) {
    //alert('setValue: function (v)');
    if (Ext.isDate(v)) {
        this.value = v;
    } else {
        this.value = null;
    }

    this.refresh();
},
onRender: function (ct, position) {
    //alert('onRender: function (ct, position) {');
    this.refresh();
    //        var d = this.value || new Date();
    //        this.body.update(this.generateCalendar(d.getMonth(), d.getFullYear()));
    //        this.body.getHeight();
},
refresh: function () {
    //alert('refresh');
    var d = this.value || new Date();
    this.body.update(this.generateCalendar(d.getMonth(), d.getFullYear()));
    //Ext.getCmp('calendar-panel').setHtml(this.generateCalendar(d.getMonth(), d.getFullYear()));
    // will force repaint() on iPod Touch 4G
    this.body.getHeight();

    //        this.setToday();
    //        if (this.value) {
    //            this.setSelected(this.value);
    //        }

    //this.fireEvent('refresh');

},
dayMarkup: function (format, day, month, year, column) {
    var classes = ['day'];
    if (format === 0) {
        classes.push('prevmonth');
    } else if (format == 9) {
        classes.push('nextmonth');
    }

    if (column === 0 || column == 6) {
        classes.push('weekend');
    }

    var datetime = year + '-' + (month + 1) + '-' + day;
    var date = new Date(year, month, day);
    var id = day + '_' + month + '_' + year;
    if ((this.minDate && date < this.minDate) || (this.maxDate && date > this.maxDate)) {
        classes.push('unselectable');
    }

    var this_day = '<td class="' + classes.join(' ') + '" day="' + day + '" id="' + id + '" ' + ' datetime="' + datetime + '" onclick="fnFillShiftGrid(' + day + ',this.id);" >'; //
    this_day += day;
    this_day += '</td>';

    return this_day;
},

monthLength: function (month, year) {
    var dd = new Date(year, month, 0);
    return dd.getDate();
},

monthMarkup: function (month, year) {
    var c = new Date();
    c.setDate(1);
    c.setMonth(month);
    c.setFullYear(year);
    //alert(month);
    var x = parseInt(this.weekstart, 10);
    var s = (c.getDay() - x) % 7;
    if (s < 0) {
        s += 7;
    }

    var dm = this.monthLength(month, year);

    var this_month = '<table cellspacing="0" class="ux-date-picker"><thead><tr>';

    this_month += '<th class="goto-prevmonth" onclick="loadPreviousMonth();">' + this.days[(0 + x) % 7] + '</th>';
    this_month += '<th>' + this.days[(1 + x) % 7] + '</th>';
    this_month += '<th>' + this.days[(2 + x) % 7] + '</th>';
    this_month += '<th><span>' + this.months[month] + ' ' + year + '</span>' + this.days[(3 + x) % 7] + '</th>';
    this_month += '<th>' + this.days[(4 + x) % 7] + '</th>';
    this_month += '<th>' + this.days[(5 + x) % 7] + '</th>';
    this_month += '<th class="goto-nextmonth" onclick="loadNextMonth();">' + this.days[(6 + x) % 7] + '</th>';
    this_month += '</tr>';
    this_month += '</thead>';

    this_month += '<tbody>';
    this_month += '<tr>';
    var trCount = 1;
    for (var i = s; i > 0; i--) {
        var this_y = (month - 1) < 0 ? year - 1 : year;
        this_month += this.dayMarkup(0, dm - i + 1, (month + 11) % 12, this_y, (s - i + x) % 7);
    }

    dm = this.monthLength(month + 1, year);
    for (i = 1; i <= dm; i++) {
        if ((s % 7) === 0) {
            this_month += '</tr>';
            this_month += '<tr>';
            trCount++;
            s = 0;
        }
        this_month += this.dayMarkup(1, i, month, year, (s + x) % 7);
        s++;
    }

    var j = 1;
    for (i = s; i < 7; i++) {
        this_y = (month + 1) > 11 ? year + 1 : year;
        this_month += this.dayMarkup(9, j, (month + 1) % 12, this_y, (i + x) % 7);
        j++;
    }

    this_month += '</tr>';
    if (trCount == 5) {
        this_month += '<tr><td colspan="7">&nbsp;</td></tr>';
    }
    this_month += '</tbody>';
    this_month += '</table>';

    //this_month += '<tfoot><tr><th colspan="7">&nbsp;</th></tr></tfoot>';

    return this_month;
},

generateCalendar: function (month, year) {
    return this.monthMarkup(month, year);
},

getCellDate: function (dateCell) {
    var date = dateCell.dom.getAttribute('datetime');
    return this.stringToDate(date);
},

stringToDate: function (dateString) {
    var a = dateString.split('-');
    return new Date(Number(a[0]), (a[1] - 1), Number(a[2]));
},

dateToString: function (date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
},

removeSelectedCell: function () {
    this.body.select('.selected').removeCls('selected');
},

setToday: function () {
    var date = new Date();
    this.body.select('td[datetime="' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '"]').addCls('today');
},

sameDay: function (date1, date2) {
    return (date1.getDate && date2.getDate) && date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
},

setSelected: function (date) {
    this.removeSelectedCell();

    this.body.select('td').each(function (td) {
        var clickedDate = this.getCellDate(td);
        if (!td.hasCls("prevmonth") && !td.hasCls("nextmonth") && this.sameDay(date, clickedDate)) {
            td.addCls('selected');
        }
    }, this);

    this.setToday();
},
//    loadPreviousMonth: function () {
//        alert('loadPreviousMonth');
//        loadMonthDelta(-1);
//    },
//    loadNextMonth: function () {
//        alert('loadNextMonth');
//        loadMonthDelta(1);
//    },
loadMonthDelta: function (delta) {
    var day;
    //alert('loadMonthDelta' + delta);
    var selected = this.body.down('.selected');
    if (selected) {
        day = this.stringToDate(selected.dom.getAttribute('datetime')).getDate();
    } else {
        day = new Date().getDate();
    }

    var v = this.value || new Date();
    //var v = currentCalendarDate;
    var newDay = new Date(v.getFullYear(), v.getMonth() + (delta), day);
    //currentCalendarDate = newDay;
    //alert(Ext.Date.format(Ext.Date.getLastDateOfMonth(newDay), 'Y-m-d') + '\n' + Ext.Date.format(this.minDate, 'Y-m-d'));
    //alert(Ext.Date.format(Ext.Date.getLastDateOfMonth(newDay), 'Y-m-d') < Ext.Date.format(this.minDate, 'Y-m-d'));
    //alert(Ext.Date.format(Ext.Date.getFirstDateOfMonth(newDay), 'Y-m-d') > Ext.Date.format(this.maxDate, 'Y-m-d'));
    if (this.minDate && Ext.Date.format(Ext.Date.getLastDateOfMonth(newDay), 'Y-m-d') < Ext.Date.format(this.minDate, 'Y-m-d')) {
        return;
    }
    //alert(Ext.Date.format(Ext.Date.getFirstDateOfMonth(newDay), 'Y-m-d') > Ext.Date.format(this.maxDate, 'Y-m-d'));
    //alert(Ext.Date.getFirstDateOfMonth(newDay));
    if (this.maxDate && Ext.Date.format(Ext.Date.getFirstDateOfMonth(newDay), 'Y-m-d') > Ext.Date.format(this.maxDate, 'Y-m-d')) {
        return;
    }
    //alert('Valid with min and max');
    if (this.minDate && newDay < this.minDate) {
        newDay = Ext.Date.clone(this.minDate);
    }

    if (this.maxDate && newDay > this.maxDate) {
        newDay = Ext.Date.clone(this.maxDate);
    }
    //alert(newDay);
    this.setValue(newDay);
}
});
