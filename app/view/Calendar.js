/*
 * File: app/view/Calendar.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('DNB.view.Calendar', {
    extend: 'Ext.Panel',
    alias: 'widget.calendar',

    config: {
        centered: true,
        activeDate : null,
        activeMonth : null,
        cls: 'ux-date-picker calender-default-date-picker-cls calendar-widget-wrapper-cls',
        id: 'Calendar',
        width: '80%',
        zIndex: 9999,
        hideOnMaskTap: false,
        modal: true
    },

    GetWeekstart: function() {
        return 1;
    },

    setDateValue: function(date) {
        if (Ext.isDate(date)) {
            this.value = date;
        } else {
            this.value = null;
        }

        this.refresh();
    },

    refresh: function() {
        var d = this.value || new Date();
                //alert('Value :'+this.value+'\n'+d+'\n'+d.getMonth());
                this.setHtml(this.generateCalendar(d.getMonth(), d.getFullYear()));
                /*var CalendarHtml=this.generateCalendar(d.getMonth(), d.getFullYear());
                if(Ext.getCmp('FollowUp-Calendar-panel'))
                Ext.getCmp('FollowUp-Calendar-panel').setHtml(CalendarHtml);

                if(Ext.getCmp('calendar-panel'))
                Ext.getCmp('calendar-panel').setHtml(CalendarHtml);*/
                // will force repaint() on iPod Touch 4G
                this.getHeight();
    },

    dayMarkup: function(format, day, month, year, column) {
        var classes = ['day'];
        if (format === 0) {
            classes.push('prevmonth');
        } else if (format == 9) {
            classes.push('nextmonth');
        }

        if (column === 0 || column == 6) {
            // classes.push('weekend');
        }

        var datetime = year + '-' + (month + 1) + '-' + day;
        var date = new Date(year, (month), day);
        var id = day + '_' + (month) + '_' + year;
        if ((this.minDate && date < this.minDate) || (this.maxDate && date > this.maxDate)) {
            classes.push('unselectable');
        }
        var this_day = '';
        var new_date = new Date();
        if(day == new_date.getDate())
            this_day = '<td class=" today-cls ' + classes.join(' ') + '" day="' + day + '" id="' + id + '" ' + ' datetime="' + datetime + '" onClick="getEventsByDateFilter(' + day + ',this.id);" ><div class="calendar-weekday-cls">'; //
        else
            this_day = '<td class="' + classes.join(' ') + '" day="' + day + '" id="' + id + '" ' + ' datetime="' + datetime + '" onClick="getEventsByDateFilter(' + day + ',this.id);" ><div class="calendar-weekday-cls">'; //
        
        this_day += day;
        this_day += '</div></td>';

        return this_day;
    },

    monthLength: function(month, year) {
        var dd = new Date(year, month, 0);
                return dd.getDate();
    },

    monthMarkup: function(month, year) {
        this.setActiveMonth(month);
        if(currentSearchDate.getMonth() == month){
            var context = this;
            setTimeout(function(){
                context.setSelectedDate(currentSearchDate);
            },100);
            
        }
        var c = new Date();
        c.setDate(1);
        c.setMonth(month);
        c.setFullYear(year);
        var x = parseInt(this.GetWeekstart(), 10);
        var s = (c.getDay() - x) % 7;
        if (s < 0) {
            s += 7;
        }

        var dm = this.monthLength(month, year);

        var this_month = '<table cellspacing="0" cellpadding="0" class="ux-date-picker calendar-popup-wrapper"><thead style="background-color:#32AFE7;background:#32AFE7;">';
        this_month += '<tr style="background-color:#32AFE7;">';
        this_month += '<td colspan="5" style="border-top-left-radius: 4px;background: #32AFE7;height:55px;"><span style="color:#FFFFFF;margin-top: -45px;">' +
            this.getMonths()[month] + ' ' + year + '</span></td>';

        this_month += '<th class="goto-prevmonth calendar-nav-buttons-cls" onClick="loadPreviousMonth(\'CalendarPanel\');">'+
            '<img style="left:10px;" width="10" height="12" src="resources/images/back_white_arrow.png"></th>';
        this_month += '<th class="goto-nextmonth calendar-nav-buttons-cls" onClick="loadNextMonth(\'CalendarPanel\');">'+
            '<img style="margin-right:10px;" width="10" height="12" src="resources/images/next_white_arrow.png"></th>';
        this_month += '</tr>';
        this_month += '</thead>';

        this_month += '<tbody>';
        this_month += '<tr>';
        this_month += '<td class="weekdayname"><div class="calendar-weekdayname-cls">' + this.getDays()[(0 + x) % 7] + '</div></td>';
        this_month += '<td class="weekdayname"><div class="calendar-weekdayname-cls">' + this.getDays()[(1 + x) % 7] + '</div></td>';
        this_month += '<td class="weekdayname"><div class="calendar-weekdayname-cls">' + this.getDays()[(2 + x) % 7] + '</div></td>';
        //this_month += '<td><span style="margin-top: -50px;">' + this.getMonths()[month] + ' ' + year + '</span>' + this.getDays()[(3 + x) % 7] + '</td>';
        this_month += '<td class="weekdayname"><div class="calendar-weekdayname-cls">'+ this.getDays()[(3 + x) % 7] + '</div></td>';
        this_month += '<td class="weekdayname"><div class="calendar-weekdayname-cls">' + this.getDays()[(4 + x) % 7] + '</div></td>';
        this_month += '<td class="weekdayname"><div class="calendar-weekdayname-cls">' + this.getDays()[(5 + x) % 7] + '</div></td>';
        this_month += '<td class="weekdayname"><div class="calendar-weekdayname-cls">' + this.getDays()[(6 + x) % 7] + '</div></td>';
        this_month += '</tr>';



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
            // this_month += '<tr><td colspan="7">&nbsp;</td></tr>';
        }
        this_month += '<tr><td colspan="7" style="background-color:#DCB209;text-align:center;border-radius:4px;" onclick="DNB.app.getController(\'Events\').CloseCalendar();">Close</td></tr>';
        this_month += '</tbody>';
        this_month += '</table>';
        //alert(this_month);
        return this_month;
    },

    generateCalendar: function(month, year) {
        return this.monthMarkup(month, year);
    },

    getCellDate: function(dateCell) {
        var date = dateCell.dom.getAttribute('datetime');
                return this.stringToDate(date);
    },

    stringToDate: function(dateString) {
        var a = dateString.split('-');
                return new Date(Number(a[0]), (a[1] - 1), Number(a[2]));
    },

    dateToString: function(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    },

    removeSelectedCell: function() {
        this.element.select('.selected-cls').removeCls('selected-cls');
    },
    setSelectedDate : function(date){
        this.removeSelectedCell();
        this.element.select('td[datetime="' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '"]').addCls('selected-cls');
     },

    setToday: function() {
        var date = new Date();
                // this.body.select('td[datetime="' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '"]').addCls('today-cls');
                this.element.select('td[datetime="' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '"]').addCls('today-cls');
    },

    sameDay: function(date1, date2) {
        return (date1.getDate && date2.getDate) && date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    },

    setSelected: function(date) {
        this.removeSelectedCell();

                this.body.select('td').each(function(td) {
                    var clickedDate = this.getCellDate(td);
                    if (!td.hasCls("prevmonth") && !td.hasCls("nextmonth") && this.sameDay(date, clickedDate)) {
                        td.addCls('selected');
                    }
                }, this);

                this.setToday();
    },

    loadMonthDelta: function(delta) {
        var day;
                var selected = this.down('.selected');


                if (selected) {
                    day = this.stringToDate(selected.dom.getAttribute('datetime')).getDate();
                } else {
                    day = new Date().getDate();
                }

                var v = this.value || new Date();
                //alert(this.value+'\n v:'+v+'\n v.getMonth():'+v.getMonth()+'\n day:'+day);
                //Months are zero based
                var currentMonth = v.getMonth() + 1;
                /*if(day>28 && ((currentMonth==1 && delta==1) || (currentMonth==3  && delta==-1))){
                if(v.getFullYear()%4==0 || v.getFullYear()%400==0){
                day=29;
                }else{
                day = 28;
                }
                }*/

                var newDay = new Date(v.getFullYear(), v.getMonth(), 1);

                //alert('NEW DATE :'+newDay);
                if (day > 28 && ((currentMonth == 1 && delta == 1) || (currentMonth == 3 && delta == -1))) {
                    if (v.getFullYear() % 4 == 0 || v.getFullYear() % 400 == 0) {
                        newDay = new Date(v.getFullYear(), 1, 29);
                    } else {
                        newDay = new Date(v.getFullYear(), 1, 28);
                    }
                } else {
                    newDay.setMonth(newDay.getMonth() + delta);
                }
                //alert(newDay);
                if (this.minDate && Ext.Date.format(Ext.Date.getLastDateOfMonth(newDay), 'Y-m-d') < Ext.Date.format(this.minDate, 'Y-m-d')) {
                    return;
                }
                if (this.maxDate && Ext.Date.format(Ext.Date.getFirstDateOfMonth(newDay), 'Y-m-d') > Ext.Date.format(this.maxDate, 'Y-m-d')) {
                    return;
                }
                if (this.minDate && newDay < this.minDate) {
                    newDay = Ext.Date.clone(this.minDate);
                }

                if (this.maxDate && newDay > this.maxDate) {
                    newDay = Ext.Date.clone(this.maxDate);
                }
                //alert(newDay);
                if (Ext.getCmp('FollowUpList')) {
                    Ext.getCmp('FollowUpList').setHtml('<table style="color:gray;font-family:Arial;width:100%;height:440px;text-align:center;"><tbody><tr><td style="vertical-align:middle">No Followup data found.</td></tr></tbody></table>');
                }

                this.setDateValue(newDay);
                //alert('this.value :'+this.value);
    },

    getMonths: function() {
        return [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];
    },

    getDays: function() {
        return [
                    'SU',
                    'MO',
                    'TU',
                    'WD',
                    'TH',
                    'FR',
                    'SA'
                ];
    }

});