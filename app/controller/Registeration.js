/*
 * File: app/controller/Registeration.js
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

Ext.define('DNB.controller.Registeration', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            "button[itemId=btnSignUp]": {
                tap: 'onSignUpButtonTap'
            },
            "button[itemId=SignInButton]": {
                tap: 'onSignInButtonTap'
            }
        }
    },

    onSignUpButtonTap: function(button, e, eOpts) {
        var registerPanel=Ext.getCmp('Register');
        var email=registerPanel.getComponent('email').getValue();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var checkemail=filter.test(email);
        var username=registerPanel.getComponent('UsernameInRegister').getValue();
        var password=registerPanel.getComponent('password').getValue();
        var confirmPassword=registerPanel.getComponent('confirmPassword').getValue();
        var dob=registerPanel.getComponent('dob').getValue();
        var currentAddress='';
        if(email==''){
            Ext.Msg.alert('','Email is mandatory!');
        }
        else if(!checkemail){
            Ext.Msg.alert('','Invalid Email!');
        }
        /*else if(username==''){
            Ext.Msg.alert('Username is mandatory!');
        }*/
        else if(password==''){
            Ext.Msg.alert('','Password is mandatory!');
        }
        else if(password.length<6){
            Ext.Msg.alert('','Password should have minimum 6 characters!');
        }
        else if(confirmPassword==''){
            Ext.Msg.alert('','Confirm password should not be empty!');
        }
        else if(password!=confirmPassword){

            Ext.Msg.alert('','Confirm Password does not match! Please type again.');
        }
        else if(dob=='' || (dob==null)){
            Ext.Msg.alert('','Date of Birth is mandatory!');
        }
        else{
            var latitude,longitude,currentAddress='';

            //LocationService='yes';
            // device.getLatLong(function(res){
            //     //alert(res.lat+'\n'+res.long);
            //     console.log(res);
            //     latitude =res.lat;
            //     longitude =res.longi;

            //     if(latitude.indexOf('0.00')<0 && longitude.indexOf('0.00')<0){
            //         var latlng = new google.maps.LatLng(latitude, longitude);
            //         var geocoder=new google.maps.Geocoder();
            //         geocoder.geocode({latLng:latlng},function(data,status){

            //             if(status == google.maps.GeocoderStatus.OK){
            //                 currentAddress = data[1].formatted_address; //this is the full address
            //                 DNB.app.getController('Registeration').SignUp(email,username,password,dob,latitude,longitude,currentAddress);
            //             }
            //             else
            //                 DNB.app.getController('Registeration').SignUp(email,username,password,dob,latitude,longitude,currentAddress);
            //         });
            //     }else{
            //         DNB.app.getController('Registeration').SignUp(email,username,password,dob,latitude,longitude,currentAddress);
            //     }


            // },function(error){//xlat -= 0;
            //     latitude=0;
            //     longitude=0;
            // });
                latitude=0;
                longitude=0;
                currentAddress='Lahore,Pakistan';
            //For TESTING :
            DNB.app.getController('Registeration').SignUp(email,username,password,dob,latitude,longitude,currentAddress);
        }
    },

    onSignInButtonTap: function(button, e, eOpts) {
                Ext.getCmp('Register').hide();
                Ext.getCmp('Login').show();
                //var LoginPanel=Ext.getCmp('Login');
                //LoginPanel.getComponent('txtUserEmail').setValue('');
                //Ext.getCmp('LoginPassword').setValue('');
                DNB.app.getController('Login').ReSetLoginView();
    },

    SignUp: function(email, username, password, dob, latitude, longitude, address) {

                   /*var pushNotification = window.plugins.pushNotification;
                   pushNotification.register( function(res){
                                             //alert('sucees:');
                                             //alert(res);
                                             devicetokenid=res;
                                             },

                                             function(){
                                             alert('fail');
                                             },
                                             {
                                             "badge":"true",
                                             "sound":"true",
                                             "alert":"true",
                                             "ecb":"onNotificationAPN"
                                             });*/

        Ext.Viewport.setMasked({xtype:'loadmask',message:'SignUp is in process...'});
        Ext.Ajax.request({
                url:DNB.util.Common.api.userRegisteration,
                method:'POST',
                params :  {
                    First_name:"" ,
                    Last_name:"",
                    email:email,
                    userName:username,
                    password:password,
                    birthday:dob,
                    contact_no:'1234567890',
                    latitude:latitude,
                    longitude:longitude,
                    regType: '',
                    address:address,
                    device_id:devicetokenid
                },
                success:function(res,options){
                    Ext.Viewport.setMasked(false);
                    console.log(res.responseText);
                    var res=Ext.decode(res.responseText).response_data;
                    //Ext.Msg.alert(res.message);

                    if(res.status){
                        var registerPanel=Ext.getCmp('Register');
                        registerPanel.getComponent('email').setValue('');
                        registerPanel.getComponent('UsernameInRegister').setValue('');
                        registerPanel.getComponent('password').setValue('');
                        registerPanel.getComponent('confirmPassword').setValue('');
                        registerPanel.getComponent('dob').setValue('');
                        localStorage.setItem('email',email);
                        Ext.Msg.alert('','Verification mail has been sent to your email id. Please check your email and activate your account.');
                        Ext.getCmp('Register').hide();
                        Ext.getCmp('Login').hide();
                        termconditionsPageOpenFrom='Register';
                        if(Ext.getCmp('TMShow'))
                            Ext.getCmp('TMShow').show();
                        else
                            Ext.Viewport.add({xtype:'tmshow'}).show();
                        Ext.getCmp('BackButtonInTermsCondition').setHidden(true);

                    }
                    else{
                        Ext.Msg.alert('',res.message);
                    }
                },
                failure:function(res,options){
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('','failure'+res.responseText);
                }

            });
    }

});