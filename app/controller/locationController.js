Ext.define('DNB.controller.locationController',{
extend:'Ext.app.Controller',
config:{
	refs:{
		backButton:'toolbar button[name=locationViewToolBarBackButtonName]',
		doneButton:'button[name=locationViewDoneButtonName]',
		locationLabel:'label[name=settingViewLabelName]'
	},
	control:{
		backButton:{
			tap:'onBackButtonTap'
		},
		doneButton:{
			tap:'onDoneButtonTap'
		}
	}
},
onBackButtonTap:function(btn){
	Ext.getCmp('locationView').hide();
	Ext.getCmp('DNBView').show();
},
onDoneButtonTap:function(btn){
	Ext.getCmp('locationView').hide();
	Ext.getCmp('DNBView').show();
	localStorage.setItem('currentAddress',usersCurrentLocation);
	localStorage.setItem('latitude',usersCurrentLocationLat);
	localStorage.setItem('longitude',usersCurrentLocationLong);
	// var value=document.getElementById('locationField').value;
	this.getLocationLabel().setHtml(usersCurrentLocation);
	Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating..'});
	DNB.app.getController('Settings').SaveUserLocation(usersCurrentLocationLat, usersCurrentLocationLong, usersCurrentLocation, 'no');

	
}	
});