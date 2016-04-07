Ext.define('DNB.view.locationView',{
extend:'Ext.Panel',
xtype:'location',
requires:['Ext.TitleBar'],
config:{

    id: 'locationView',
	items:[
	{
                xtype: 'toolbar',
                docked: 'top',
                scrollable: 'vertical',
                title: 'Location',
                items: [
                    {
                        xtype: 'button',
                        html: 'Back',
                        itemId: 'AboutBack',
                        ui: 'plain',
                        iconCls: 'previousArrowIcon',
                        name:'locationViewToolBarBackButtonName'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            // {
            // 	xtype:'textfield',
            // 	label:'Enter location',
            //     cls:'locationViewTextFieldClass'
            // },
             {
                
                html: '<div class="x-container x-field-text x-field x-label-align-left x-field-labeled default-label-class x-form-label-nowrap x-empty" id="currentLocation" style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(207, 207, 207); border-top-width: 1px; border-top-style: solid; border-top-color: rgb(207, 207, 207);">'+
                            '<div class="x-form-label" id="" style="width: 35% !important;">'+
                                '<span id="ext-element-651">Location</span>'+
                            '</div>'+
                            '<div class="x-component-outer" id="" style="padding: 0px !important;">'+
                                '<div class="x-unsized x-field-input" id="ext-input-8">'+
                                    '<input class="x-input-el x-form-field x-input-text" type="text" id="userLocationField" name="locationPoint" placeholder="">'+
                                    '<div class="x-field-mask" style="display: none !important;" id=""></div>'+
                                    '<div class="x-clear-icon" id=""></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>',
                
                autoComplete: true
            },
            {
                 xtype:'button',
                 id:'locationDoneButton',
                 ui:'action',
                 text:'Done',
                 name:'locationViewDoneButtonName',
                 cls:'locationViewDoneButtonClass'
                 // style:'margin:auto;width:80%;border: 5px;height:50px;margin-top:100px;background-color: #32AFE7;background-image: -webkit-linear-gradient(top, #32AFE7,#32AFE7 3%,#32AFE7);font-size: x-large;'
            }],
            listeners: [
                            {
                                fn: 'init',
                                event: 'painted'
                                // delegate: '#EventImageOnEventPage'
                            }
                        ]
        },
        init: function(){
            console.log('text working');
            var me = this;
            var locationInput = document.getElementById('userLocationField');
         
            //Create new autocomplete object
            locationComplete = new google.maps.places.Autocomplete(locationInput);
         
            //Bias to users current location
            this.geolocate();
            var place;
         
            google.maps.event.addListener(locationComplete, 'place_changed', function() {
                place = locationComplete.getPlace();
                console.log(place); 
                usersCurrentLocation  = place.formatted_address;
                usersCurrentLocationLat = place.geometry.location.lat();
                usersCurrentLocationLong = place.geometry.location.lng();
                // address
                // console.log(place.formatted_address); //address
                // console.log(place.geometry.location.lat()); //latitude
                // console.log(place.geometry.location.lng()); //longitude
            });
        },
        geolocate: function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var geolocation = new google.maps.LatLng(
                  position.coords.latitude, position.coords.longitude);
         
              locationComplete.setBounds(new google.maps.LatLngBounds(geolocation,
                  geolocation));
            });
          }
        }
});