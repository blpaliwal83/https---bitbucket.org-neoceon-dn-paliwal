/*
 * File: app/view/Settings.js
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

Ext.define('DNB.view.Settings', {
    extend: 'Ext.Container',
    alias: 'widget.settings',

    requires: [
        'Ext.Button',
        'Ext.Spacer',
        'Ext.field.Toggle',
        'Ext.Panel',
        'Ext.Label',
        'Ext.Toolbar',
        'DNB.view.NotificationCategoryMultiSelect',
        'DNB.view.Account',
        'DNB.view.About',
        'DNB.view.Feedback'
    ],

    config: {
        id: 'Settings',
        style: 'background-color: rgb(255, 255, 255); ',
        layout: 'vbox',
        scrollable: 'vertical',
        items: [
            {
                xtype: 'button',
                flex: 1,
                cls: 'accountSettings default-label-class ',
                html: 'Account Settings',
                itemId: 'AccountButton',
                style: '',
                ui: 'plain',
                iconAlign: 'right',
                iconCls: 'nextArrowIcon',
                labelCls: 'x-button-label x-button-left',
                text: 'Account Settings',
                padding: '0 20 0 10'
            },
            {
                xtype: 'spacer',
                flex: 1,
                height: 10,
                id:'settingsSpacer',
                style: 'background-color:#F0F0F0;'
            },
            {
                xtype: 'togglefield',
                flex: 1,
                height: 55,
                cls : 'setting-toggle-cls settings-label-text-cls accountSettingsCls',
                id: 'PushNoificaions',
                itemId: 'PushNoificaions',
                label: 'Push Notifications',
                // cls : 'setting-toggle-cls',
                // padding: 5,
                cls: 'default-label-class default-botom-border default-toggle-field-cls',
                // labelCls: 'label-setting-toggle-cls',
                labelWidth: '85%'
            },
            {
                xtype: 'panel',
                flex: 1,
                id:'settingSelectNotificationPanel',
                layout: 'hbox',
                cls : 'default-label-class default-botom-border',
                items: [
                    {
                        xtype: 'label',
                        flex: 1,
                        html: 'Notification Category',
                        style:'padding-left: 10px;'
                    },
                    {
                        xtype: 'button',
                        height: 38,
                        html: '<img width="32px" height="32px" src="resources/images/plus-icon.png">',
                        id: 'NotificationCategoryButton',
                        itemId: 'NotificationCategoryButton',
                        // padding: '5 8 2 2',
                        style: 'background-color:white',
                        // cls:'settings-label-text-cls',
                        ui: 'plain'
                    }
                ]
            },
            {
                xtype: 'togglefield',
                flex: 1,
                id: 'LocationService',
                itemId: 'LocationService',
                label: 'Location Service',
                // cls : 'setting-toggle-cls',
                // padding: 5,
                cls: 'default-label-class default-botom-border default-toggle-field-cls',
                // labelCls: 'label-setting-toggle-cls',
                labelWidth: '85%'
            },
            {
                xtype: 'panel',
                flex: 1,
                // height: 55,
                name:'userLocation',
                itemId: 'LocationPanel',
                // padding: '0 0 0 0',
                id:'settingsCurrentLocationPanel',
                // style: 'background-color:#FFFFFF;color:gray;border-bottom:3px solid #f2f2f2;height:55px !important;',
                layout: 'hbox',
                cls:'default-botom-border default-label-class',
                // cls : 'default-label-class',
                items: [
                    {
                        xtype: 'label',
                        html: 'Current Location',
                        // padding:'0 0 0 10',
                        cls : 'default-label-class',
                        style:'padding-left: 10px;'    
                        // cls:'settings-label-text-cls'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'label',
                        cls: 'UserLocattion',
                        id: 'UserLocattion',
                        name:'settingViewLabelName' 
                    }
                ]
            },
            {
                xtype: 'spacer',
                height: 10,
                style: 'background-color:#F0F0F0;'
            },
            {
                xtype: 'panel',
                flex: 1,
                height: 55,
                itemId: 'RadiusPanel',
                padding: '10 0 0 0',
                style: 'background-color:#FFFFFF;color:gray;height:55px !important;',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        html: 'Radius for Nearby',
                        // padding: '0 0 0 10',
                        // style: 'font-weight:normal;color:gray;',
                        // cls:'settings-label-text-cls settings-updated-label-text-cls accountSettingsCls'
                        padding: '0 0 0 20',
                        cls:'default-label-class'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'label',
                        cls: 'RadiusLabelValue settings-label-text-cls accountSettingsCls',
                        html: '160 mile',
                        id: 'RadiusLabelValue',
                        padding: '0 20 0 0'
                    }
                ]
            },
            {
                xtype: 'sliderfield',
                flex: 1,
                cls: 'radius settings-label-text-cls accountSettingsCls',
                height: 55,
                id: 'Radius',
                itemId: 'mysliderfield',
                style: 'height:55px !important;',
                label: '',
                padding: '0 20 0 0',
                maxValue: 200
            },
            {
                xtype: 'panel',
                cls:'setting-select-panel-cls setting-select-radius-panel-cls',
                html: '<div id="slidercolor"></div>'
            },
            {
                xtype: 'spacer',
                height: 10,
                style: 'background-color:#F0F0F0;'
            },
            {
                xtype: 'button',
                flex: 1,
                cls: 'default-label-class default-botom-border',
                // height: 55,
                itemId: 'HelpFeedback',
                // style: 'background-color:#FFFFFF;color:gray;border-bottom:3px solid #f2f2f2;height:55px !important;font-weight:normal;',
                ui: 'plain',
                iconAlign: 'right',
                id:'settingsHelpAndFeedBack',
                iconCls: 'nextArrowIcon',
                labelCls: 'x-button-label x-button-left',
                text: 'Help & Feedback',
                padding: '0 20 0 10'
            },
            {
                xtype: 'button',
                flex: 1,
                cls: 'default-label-class default-botom-border',
                // height: 55,
                itemId: 'TermsConditions',
                // style: 'background-color:#FFFFFF;color:gray;border-bottom:3px solid #f2f2f2 ;height:55px !important;font-weight:normal;',
                ui: 'plain',
                id:'settingsTermsAndCondition',
                iconAlign: 'right',
                iconCls: 'nextArrowIcon',
                labelCls: 'x-button-label x-button-left',
                text: 'Terms & Conditions',
                padding: '0 20 0 10'
            },
            {
                xtype: 'button',
                flex: 1,
                cls: 'default-label-class default-botom-border',
                // height: 55,
                itemId: 'About',
                // style: 'background-color:#FFFFFF;color:gray;border-bottom:3px solid #f2f2f2;height:55px !important;font-weight:normal;',
                ui: 'plain',
                id:'settingsAbout',
                iconAlign: 'right',
                iconCls: 'nextArrowIcon',
                labelCls: 'x-button-label x-button-left',
                text: 'About',
                padding: '0 20 0 10'
            },
            {
                xtype: 'panel',
                flex: 4,
                height: 50,
                margin: '0 0 0 0',
                style: 'height:50px !important;background-color:#F0F0F0;',
                layout: 'hbox',
                cls:'setting-select-panel-cls',
                items: [
                    {
                        xtype: 'spacer',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        cls: 'logout',
                        itemId: 'Logout',
                        margin: '5% 0 0 0',
                        style: '',
                        ui: 'plain',
                        text: 'Logout'
                    },
                    {
                        xtype: 'spacer',
                        flex: 1
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                scrollable: 'vertical',
                title: 'Settings'
            }
        ],
        listeners: [
            {
                fn: 'onPushNoificaionsChange',
                event: 'change',
                delegate: '#PushNoificaions'
            },
            {
                fn: 'onLocationServiceChange',
                event: 'change',
                delegate: '#LocationService'
            },
            {
                fn: 'onRadiusChange',
                event: 'change',
                delegate: '#Radius'
            },
            {
                fn: 'onRadiusDrag',
                event: 'drag',
                delegate: '#Radius'
            },
            {
                fn: 'onRadiusDragEnd',
                event: 'dragend',
                delegate: '#Radius'
            }
        ]
    },

    onPushNoificaionsChange: function(togglefield, newValue, oldValue, eOpts) {
        var PushNoificaions=Ext.getCmp('PushNoificaions').getValue();
        if(PushNoificaions=='0' || PushNoificaions==0)
            PushNoificaions='no';
        else
            PushNoificaions='yes';
            localStorage.setItem('notification',PushNoificaions);
            Ext.Ajax.request({
                url:DNB.util.Common.api.saveUserNotification,
                method:'POST',
                params :  {
                    notification:PushNoificaions,uid:localStorage.getItem('userid')
                },
                success:function(res,options){
                    var res=Ext.decode(res.responseText).Result;
                    if(res.status){

                    }
                },
                failure:function(res,options){
                    Ext.Msg.alert('','failure'+res.responseText);
                }
            });

    },

    onLocationServiceChange: function(togglefield, newValue, oldValue, eOpts) {
        //debugger
        var LocationService= Ext.getCmp('LocationService').getValue();
        var locationlocked = localStorage.getItem('locationlocked');
        var latitude=localStorage.getItem('latitude');
        var longitude=localStorage.getItem('longitude');
        var currentAddress=localStorage.getItem('currentAddress');

        if(locationlocked=='yes' && LocationService==1){
            LocationService='yes';
            window.navigator.geolocation.getCurrentPosition(function(position){
                                    currentLat =  position.coords.latitude;
                                    currentLong = position.coords.longitude;
                                    localStorage.setItem('latitude',currentLat);
                                    localStorage.setItem('longitude',currentLong);

                                    var latlng = new google.maps.LatLng(currentLat, currentLong);
                                    var geocoder=new google.maps.Geocoder();
                                    geocoder.geocode({latLng:latlng},function(data,status){
                                        if(status == google.maps.GeocoderStatus.OK){
                                            currentAddress = data[1].formatted_address; //this is the full address
                                            console.log(currentAddress);
                                            localStorage.setItem('currentAddress',currentAddress);
                                            Ext.getCmp('UserLocattion').setHtml(currentAddress);
                                        }
                                        //alert(currentAddress);
                                        // Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating..'});
                                        DNB.app.getController('Settings').SaveUserLocation(currentLat, currentLong, currentAddress, LocationService);
                                    });
                                    
                            }, function(error){

                            },{enableHighAccuracy: true, timeout: 10000});
        }
        else if(LocationService=='0' || LocationService==0){
            LocationService='no';
            DNB.app.getController('Settings').SaveUserLocation(latitude, longitude, currentAddress, LocationService);
        }
        else{
            LocationService='yes';
            Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating..'});
            window.navigator.geolocation.getCurrentPosition(function(position){
                                    currentLat =  position.coords.latitude;
                                    currentLong = position.coords.longitude;
                                    localStorage.setItem('latitude',currentLat);
                                    localStorage.setItem('longitude',currentLong);

                                    var latlng = new google.maps.LatLng(currentLat, currentLong);
                                    var geocoder=new google.maps.Geocoder();
                                    geocoder.geocode({latLng:latlng},function(data,status){
                                        if(status == google.maps.GeocoderStatus.OK){
                                            currentAddress = data[1].formatted_address; //this is the full address
                                            console.log(currentAddress);
                                            localStorage.setItem('currentAddress',currentAddress);
                                            Ext.getCmp('UserLocattion').setHtml(currentAddress);
                                        }
                                        //alert(currentAddress);
                                        // Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating..'});
                                        DNB.app.getController('Settings').SaveUserLocation(currentLat, currentLong, currentAddress, LocationService);
                                    });
                                    
                            }, function(error){
                                Ext.Viewport.setMasked(false);
                            },{enableHighAccuracy: true, timeout: 10000});
        }
        localStorage.setItem('locationlocked',LocationService);

    },

    onRadiusChange: function(me, sl, thumb, newValue, oldValue, eOpts) {
        var html = '';
        if(newValue<=1){
            html = newValue+' mile';
        }else{
            html = newValue+' miles';
        }

        Ext.getCmp('RadiusLabelValue').setHtml(html);
        var radius=newValue;
        oldRadius = oldValue;
        if(radius=='' || radius==null)
            radius=0;
        //console.log('radius:'+radius);
        var slidercolor=Ext.select('#slidercolor').elements[0];
        //alert(deviceName+'\n'+ (deviceWidth<400));
        // if(deviceName=='phone' && deviceWidth<400){
        //     var w=parseInt(((radius*5)/2)-(radius/2)-(radius/2)+(radius>60?(radius>100?10:5):0));
        //     if(deviceWidth<350){
        //         w=(((radius*5)/2)-(radius/2)-(radius/2)+(radius>60?(radius>100?(radius>140?12:10):5):0));
        //     }else{
        //         w=(((radius*5)/2)-(radius/2)-(radius>60?(radius>100?8:10):5));
        //     }
        //     slidercolor.style.cssText=''.concat(
        //         '-webkit-text-fill-color: blue;',
        //         'fill: rgb(0, 255, 255);',
        //         'width: '+w+'px !important;',
        //         ' height: 5px !important;',
        //         ' margin-left: 20px !important;',
        //         ' margin-top: -42px !important;',
        //         ' background-color: #32AFE7;');
        // }
        // else{
        //     slidercolor.style.cssText=''.concat(
        //         '-webkit-text-fill-color: blue;',
        //         'fill: rgb(0, 255, 255);',
        //         'width: '+(((radius*10)/2)-(radius/2)-(radius>100?15:8))+'px !important;',
        //         ' height: 5px !important;',
        //         ' margin-left: 20px !important;',
        //         ' margin-top: -42px !important;',
        //         ' background-color: #32AFE7;');
        // }
        Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating notices.'});
        userRadius = radius;
        noticeCallFrom = 'radius';
        DNB.app.getController('Events').GetNotices();
        // Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating..'});
        // Ext.Ajax.request({
        //         //url:webserviceURL+'users/set_radius.json',
        //         url:DNB.util.Common.api.setRadius,
        //         method:'POST',
        //         params :  {
        //             radius:radius,uid:localStorage.getItem('userid')
        //         },
        //         success:function(res,options){
        //             Ext.Viewport.setMasked(false);
        //             localStorage.setItem('radius',radius);
                    
        //             var res=Ext.decode(res.responseText).Result;
        //             Ext.Msg.alert('','Location radius set.');
        //             userRadius = radius;
        //             noticeCallFrom = 'radius';
        //             DNB.app.getController('Events').GetNotices();
        //             DNB.app.getController('Events').GetHotFiveNotices();
        //         },
        //         failure:function(res,options){
        //             Ext.Viewport.setMasked(false);
        //             Ext.Msg.alert('','failure'+res.responseText);
        //         }
        //     });
    },

    onRadiusDrag: function(sliderfield, sl, thumb, e, eOpts) {
        var html = '';
        if(sliderfield.getValue()[0]<=1){
            html = sliderfield.getValue()[0]+' mile';
        }else{
            html = sliderfield.getValue()[0]+' miles';
        }

        Ext.getCmp('RadiusLabelValue').setHtml(html);

        // Ext.getCmp('RadiusLabelValue').setHtml(sliderfield.getValue()[0]+' miles');
        var slidercolor=Ext.select('#slidercolor').elements[0];
                // if(deviceOSName=='ios'){
                //     if(deviceName=='phone'){
                //         sliderColorMarginTop=45;
                //     }else{
                //        sliderColorMarginTop=45;
                //     }
                // }

                setTimeout(function(){
                    slidercolor.style.cssText=''.concat(
                            '-webkit-text-fill-color: blue;',
                            'fill: rgb(0, 255, 255);',
                            'display:block;',
                            'width: '+(thumb.translatableBehavior.translatable.x-10)+'px !important;',
                            ' height: 5px !important;',
                            ' margin-left: 16px !important;',
                            ' margin-top: -33px !important;',
                            ' background-color: #32AFE7;');
                    if(thumb.translatableBehavior.translatable.x<15){
                    	slidercolor.style.cssText=''.concat(
                                '-webkit-text-fill-color: RED;',
                                'fill: RED;',
                                'display:none;',
                                'width: 0px !important;',
                                ' height: 5px !important;',
                                ' margin-left: 16px !important;',
                                ' margin-top: -33px !important;',
                                ' background-color: RED;');
                    }
                },10);//200 for intex
    },

    onRadiusDragEnd: function(sliderfield, sl, thumb, value, e, eOpts) {
        var html = '';
        if(sliderfield.getValue()[0]<=1){
            html = sliderfield.getValue()[0]+' mile';
        }else{
            html = sliderfield.getValue()[0]+' miles';
        }

        Ext.getCmp('RadiusLabelValue').setHtml(html);

        // Ext.getCmp('RadiusLabelValue').setHtml(sliderfield.getValue()[0]+' miles');
        //Ext.getCmp('RadiusLabelValue').setHtml('SS'+sliderfield.getValue()[0]);
        //console.log(sliderfield.getValue([0]));
        var radius=sliderfield.getValue()[0];
        if(radius=='' || radius==null)
            radius=0;

    }

});