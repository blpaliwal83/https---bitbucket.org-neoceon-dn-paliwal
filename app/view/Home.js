/*
 * File: app/view/Home.js
 *
 * Do NOT hand edit this file.
 */
Ext.define('DNB.view.Home', {
    extend: 'Ext.Container',
    alias: 'widget.home',
    requires: ['Ext.Img', 'Ext.Button', 'Ext.Panel', 'Ext.dataview.DataView', 'Ext.XTemplate', 'Ext.Spacer', 'Ext.Toolbar', 'DNB.view.EventSearch', 'DNB.view.AddEvent', 'DNB.view.AddPromotion', 'DNB.view.CategoryOnSearch', 'DNB.view.EventDetail', 'DNB.view.Category', 'DNB.view.Calendar', 'DNB.view.EventLocation','Ext.carousel.Carousel'],
    config: {
        height: '100%',
        id: 'Home',
        layout: 'vbox',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Noticeboard',
            items: [{
                xtype: 'button',
                itemId: 'categorylistmenu',
                name: 'categorylistmenuButton',
                ui: 'plain',
                iconCls: 'list',
                padding: 0,
                margin: 0
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                itemId: 'search',
                name: 'searchButton',
                ui: 'plain',
                // icon: 'search',
                iconCls: 'search'
            }]
        }, {
            xtype: 'container',
            height: 50,
            itemId: 'HotFivePanel',
            style: 'background-color:#DCB209',
            layout: 'hbox',
            items: [{
                xtype: 'image',
                cls: 'seticon',
                itemId: 'AddEvent',
                width: '32px',
                height: '32px',
                style: 'background-size: contain;margin-top: 9px;margin-left:6px;',
                // width: 50,
                src: 'resources/images/addnotice.png'
            }, {
                xtype: 'button',
                flex: 1,
                height: '100%',
                html: '<div class="noticbordheading"> <i> Hot Five Notices </i> </div>',
                itemId: 'HotFiveEvents',
                style: 'background-color:#DCB209;color:White;',
                ui: 'plain',
                text: 'MyButton40'
            }, {
                xtype: 'image',
                itemId: 'addpromo',
                style: 'background-size: contain; margin-top: 8px;margin-right:10px;',
                width: '34px',
                height: '34px',
                src: 'resources/images/addpromotion.png'

            }]
        }, { // Hot list container carousel
            xtype: 'carousel',
            indicator: false,
            flex:1,
            name: 'hotFiveListCarousel',
            cls: 'home-items-carousel-cls',
            listeners: {
                initialize: function(c) {
                    c.setItemLength(window.innerWidth * 0.7);
                    home_hotfive_cr = c;
                    home_hotfive_cr.element.on('tap', function(e, el) {
                        if(home_hotfive_cr.items.length<1){
                            return;
                        }
                        // Here you will get the target element
                        var data = home_hotfive_cr.getActiveItem().getData();

                        console.log(e.target.className);
                        var className = e.target.className;
                        
                        if (className.indexOf('carousel-item-image-cls') > -1) {
                            console.log('Image Clicked');
                            eventDetailPageOpenFrom = "Home";
                            DNB.app.getController('EventDetail').FillEventDetail({id: data.id});

                        } else if ((className.indexOf('home-notice-details-calander-icon-cls') > -1) || (className.indexOf('home-notice-details-date-label-cls') > -1)) {
                            console.log('Calendar Clicked')
                            selectedEventDetail.Notice=data;
                            DNB.app.getController('Events').AddToCalendar();
                        } else if ((className.indexOf('home-notice-details-map-icon-cls') > -1)||(className.indexOf('home-notice-details-location-label-cls') > -1)) {
                            console.log('Map Clicked')
                            mapPageOpenFrom='Home';
                            selectedEventDetail.Notice=data;
                            DNB.app.getController('Events').ShowMap(data.venu_detail);
                        }
                    }, this);
                },
                painted: function(element, eOpts) {
                    if (home_hotfive_cr.getActiveItem()) {
                        home_hotfive_cr.getActiveItem().setHeight('100%');
                    }
                },
                activeitemchange: function(ths, value, oldValue, eOpts) {
                    if (value) {
                        value.setHeight('100%');
                    }
                    if ((oldValue) && (oldValue.innerItems.length>0)) {
                        oldValue.setHeight('92%');
                    }
                    
                                                                        
                }
            }
        },
        
        {
            xtype: 'container',
            height: 50,
            itemId: 'OtherEventPanel',
            style: 'background-color:#DCB209',
            layout: 'hbox',
            items: [{
                xtype: 'image',
                itemId: 'leftArrow',
                style: '    background-size: 16px;',
                width: 40,
                src: 'resources/images/back_white_arrow.png'
            }, {
                xtype: 'panel',
                flex: 1,
                layout: 'hbox',
                items: [{
                    xtype: 'spacer',
                    flex: 1
                }, {
                    xtype: 'button',
                    flex: 1,
                    cls: 'OtherEventSearchByDateButton',
                    height: '100%',
                    html: '<div class="noticbordheading"> <i> Date </i> </div>',
                    id: 'OtherEventSearchByDateButton',
                    name: 'otherEventSearchByDateButton',
                    style: 'width: auto !important;background-color:#DCB209;color:White;font-size:16px;   font-family: lab_sans_promedium;    ',
                    ui: 'plain',
                    text: 'date'
                }, {
                    xtype: 'spacer',
                    flex: 1
                }]
            }, {
                xtype: 'image',
                itemId: 'rightArrow',
                style: '    background-size: 16px;',
                width: 40,
                src: 'resources/images/next_white_arrow.png'
            }]
        }, {
            xtype: 'carousel',
            indicator: false,
            // style : 'height:200px;',
            flex:1,
            name: 'HomeCarousel',
            cls: 'home-items-carousel-cls',
            listeners: {
                initialize: function(c) {
                    c.setItemLength(window.innerWidth * 0.7);
                    home_cr = c;
                    home_cr.element.on('tap', function(e, el) {
                        // Here you will get the target element
                        if(home_cr.items.length<1){
                            return;
                        }
                        var data = home_cr.getActiveItem().getData();
                        // console.log(home_cr.getActiveItem().getData());
                        // console.log(e.target);
                        console.log(e.target.className);
                        var className = e.target.className;
                        if (className.indexOf('carousel-item-image-cls') > -1) {
                            console.log('Image Clicked');
                            eventDetailPageOpenFrom = "Home";
                            DNB.app.getController('EventDetail').FillEventDetail({id: data.id});
                        } else if ((className.indexOf('home-notice-details-calander-icon-cls') > -1) || (className.indexOf('home-notice-details-date-label-cls') > -1)) {
                            console.log('Calendar Clicked')
                            selectedEventDetail.Notice=data;
                            DNB.app.getController('Events').AddToCalendar();
                        } else if ((className.indexOf('home-notice-details-map-icon-cls') > -1)||(className.indexOf('home-notice-details-location-label-cls') > -1)) {
                            console.log('Map Clicked')
                            mapPageOpenFrom='Home';
                            selectedEventDetail.Notice=data;
                            DNB.app.getController('Events').ShowMap(data.venu_detail);
                        }
                    }, this);
                },
                painted: function(element, eOpts) {
                    if (home_cr.getActiveItem()) {
                        home_cr.getActiveItem().setHeight('100%');
                    }
                },
                activeitemchange: function(ths, value, oldValue, eOpts) {
                    if (value) {
                        value.setHeight('100%');
                    }
                    if ((oldValue) && (oldValue.innerItems.length>0)) {
                        oldValue.setHeight('92%');
                    }
                }
            }
        }],
        listeners: [{
            fn: 'onLeftArrowTap',
            event: 'tap',
            delegate: '#leftArrow'
        }, {
            fn: 'onRightArrowTap',
            event: 'tap',
            delegate: '#rightArrow'
        }, {
            fn: 'onSearchTap',
            event: 'tap',
            delegate: '#search'
        }]
    },
    onLeftArrowTap: function(image, e, eOpts) {
        
        currentSearchDate.setDate(currentSearchDate.getDate() - 1);
        DNB.app.getController('Events').SetDateOnOtherEventButton(currentSearchDate);
        var obj = currentSearchDate.getDate() + '_' + (currentSearchDate.getMonth()) + '_' + currentSearchDate.getFullYear();
        getEventsByDateFilter('', obj);
    },
    onRightArrowTap: function(image, e, eOpts) {
        currentSearchDate.setDate(currentSearchDate.getDate() + 1);
        DNB.app.getController('Events').SetDateOnOtherEventButton(currentSearchDate);
        var obj = currentSearchDate.getDate() + '_' + (currentSearchDate.getMonth()) + '_' + currentSearchDate.getFullYear();
        getEventsByDateFilter('', obj);
    }
});