/*
 * File: app/controller/Login.js
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
Ext.define('DNB.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['Login'],
        control: {
            "button[itemId=LoginButton]": {
                tap: 'onLoginButtonTap'
            },
            "button[itemId=LoginWithFacebook]": {
                tap: 'onLoginWithFacebookButtonTap'
            },
            "button[itemId=LoginWithTwitter]": {
                tap: 'TwitterLoginImageButton'
            },
            "button[itemId=ForgotPasswordButton]": {
                tap: 'onForgotPasswordButtonTap'
            },
            "button[itemId=Signup]": {
                tap: 'onSignupButtonTap'
            }
        }
    },
    onLoginButtonTap: function(button, e, eOpts) {
        if (isUserNameFocus) {
            isUserNameFocus = false;
            return;
        }
        var LoginPanel = this; // Ext.getCmp('ForgotPassword');
        var email = Ext.getCmp('txtUserEmail').getValue();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var checkemail = filter.test(email);
        var password = Ext.getCmp('txtUserPassword').getValue();
        if (email == '') {
            Ext.Msg.alert('', 'Email is mandatory!');
        } else if (!checkemail) {
            Ext.Msg.alert('', 'Invalid Email!');
        } else if (password == '') {
            Ext.Msg.alert('', 'Password is mandatory!');
        } else {
            //Ext.Viewport.setMasked({xtype:'loadmask',message:'loading notices'});
            Ext.Ajax.request({
                url: DNB.util.Common.api.mLogin,
                method: 'POST',
                params: {
                    username: email,
                    password: password
                },
                success: function(res, options) {
                    console.log(res.responseText);
                    var res = Ext.decode(res.responseText).response_data;
                    //Ext.Viewport.setMasked(false);
                    if (res.status) {
                        isLogin = true;
                        isLoginWithFB = false;
                        isLoginWithTwitter = false;
                        isLocationServiceToggleButtonSet = false;
                        var user = res.User_data.User;
                        localStorage.setItem('userid', user.id);

                        //console.log('userid:'+localStorage.getItem('userid'));
                        localStorage.setItem('First_name', user.First_name);
                        localStorage.setItem('Last_name', user.Last_name);
                        localStorage.setItem('username', user.username);
                        localStorage.setItem('email', user.email);
                        if (user.img == null) {
                            localStorage.setItem('image', '');
                        } else {
                            localStorage.setItem('image', user.img);
                        }
                        localStorage.setItem('isLogin', 'YES');
                        localStorage.setItem('isLoginWithFB', 'NO');
                        localStorage.setItem('isLoginWithTwitter', 'NO');
                        localStorage.setItem('radius', user.radius);
                        localStorage.setItem('usermessage', (user.user_message == null || user.user_message == 'null') ? '' : user.user_message);
                        localStorage.setItem('locationlocked', user.location);
                        localStorage.setItem('latitude', user.latitude);
                        localStorage.setItem('longitude', user.longitude);
                        localStorage.setItem('currentAddress', (user.address == null || user.address == 'null') ? '' : user.address);
                        localStorage.setItem('notification', user.notification);
                        localStorage.setItem('notificationCategory', Ext.encode(res.NC));
                        Ext.getCmp('Login').hide();
                        Ext.getCmp('DNBView').show();
                        if (loginPageOpenFrom == 'GoLiveTab') {
                            //to promotions
                            currentBannerPageName = 'promotionImageOnGoLive';
                            DNB.app.getController('Events').ShowPromotions(0, 'promotionImageOnGoLive');
                        } else if (loginPageOpenFrom == 'EventDetail') {
                            ShowHideHomePages('HomeContainer');
                        } else if (loginPageOpenFrom == 'SettingsTab') {
                            DNB.app.getController('Settings').FillSettingsInfo();
                        }
                        Ext.getCmp('MainTabView').getTabBar().getComponent(3).enable();
                        Ext.getCmp('MainTabView').getTabBar().getComponent(4).enable();
                    } else {
                        //console.log(res.message);
                        if (res.isActive == 'block') {
                            Ext.Msg.alert('', 'Please verify and activate your account first.');
                            var btn = confirm('Would you like to resend verification link?');
                            if (btn == true) {
                                if (Ext.getCmp('ReSendLink')) {
                                    Ext.getCmp('ReSendLink').show();
                                } else Ext.Viewport.add({
                                    xtype: 'resendlink'
                                }).show();
                                Ext.getCmp('ReSendEmail').setValue('');
                            } else {
                                Ext.getCmp('Login').hide();
                                if (loginPageOpenFrom == 'GoLiveTab') {
                                    //to promotions
                                    currentBannerPageName = 'promotionImageOnGoLive';
                                    DNB.app.getController('Events').ShowPromotions(0, 'promotionImageOnGoLive');
                                    Ext.getCmp('DNBView').show();
                                } else {
                                    Ext.getCmp('DNBView').show();
                                }
                            }
                        } else if (res.isActive == 0 || res.isActive == '0') {
                            Ext.Msg.alert('', 'Email or Password is Incorrect!');
                        }
                    }
                },
                failure: function(res, options) {
                    //Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('', 'Login failed. Please try again.');
                }
            });
        }
    },
    TwitterLogin: function(data) {

        console.log(data);
        // return;

        Ext.Ajax.request({
            url: DNB.util.Common.api.twitterSignUp,
            method: 'POST',
            params: {
                "username": data.screen_name
            },
            success: function (res, options) {
                debugger;
                var res = Ext.decode(res.responseText).result;
                console.log(res);
               
                // re = res
                //alert(res.response_data.status);
                if (res.status) {
                    twitteruserid = res.user_id;
                    userName = data.screen_name;

                    if (res.email == null || res.email == 'null') {
                        if (Ext.getCmp('UserEmail')) Ext.getCmp('UserEmail').show();
                        else Ext.Viewport.add({
                            xtype: 'useremail'
                        }).show();
                        Ext.getCmp('UserEmailAddress').setValue('');
                    } else if (res.isVerified == 'active') {
                        isLogin = true;
                        isLoginWithFB = false;
                        isLoginWithTwitter = true;
                        isLocationServiceToggleButtonSet = false;
                        localStorage.setItem('isLoginWithFB', 'NO');
                        localStorage.setItem('isLoginWithTwitter', 'YES');
                        Ext.getCmp('Login').hide();
                        /*My change(dev_test)*/
                        localStorage.setItem('userid', res.user_id);
                        localStorage.setItem('First_name', res.name);
               //         localStorage.setItem('Last_name', res.last_name);
                        localStorage.setItem('email', res.email);
                        DNB.app.getController('Events').GetUserById(res.user_id);

                        termconditionsPageOpenFrom = 'Register';
                        if (Ext.getCmp('TMShow')) Ext.getCmp('TMShow').show();
                        else Ext.Viewport.add({
                            xtype: 'tmshow'
                        }).show();
                        Ext.getCmp('BackButtonInTermsCondition').setHidden(true);
                    } else if (res.isVerified == 'block') {
                        Ext.Msg.alert('', 'Please verify and activate your account first.');
                        var btn = confirm('Would you like to resend verification link?');
                        if (btn == true) {
                            if (Ext.getCmp('ReSendLink')) {
                                Ext.getCmp('ReSendLink').show();
                            } else Ext.Viewport.add({
                                xtype: 'resendlink'
                            }).show();
                            Ext.getCmp('ReSendEmail').setValue('');
                        } else {
                            Ext.getCmp('Login').hide();
                            Ext.getCmp('DNBView').show();
                            if (loginPageOpenFrom == 'SettingsTab') {
                                Ext.getCmp('MainTabView').setActiveItem(0);
                            }
                        }
                    } else {
                        Ext.Msg.alert('', 'Verification mail has been sent to your email id. Please check your email and activate your account.');
                        Ext.getCmp('Login').hide();
                        Ext.getCmp('DNBView').show();
                    }
                }
            },
            failure: function(res, options) {
                Ext.Msg.alert('', 'failure' + res.responseText);
            }
        });
    },
    onLoginWithFacebookButtonTap: function (image, e, eOpts) {
        openFB.init({
            appId: '501215073392051'
        });
        openFB.login('501215073392051', ["email"], function (response) {
            if (response.status === 'connected') {
                openFB.api({
                    path: '/v2.5/me',
                    params: {
                        fields: "id,name,gender,location,hometown,email,first_name,last_name",
                        format: "json"
                    },
                    success: function(data) {
                        // console.log(JSON.stringify(data));
                        Ext.Ajax.request({
                            url: DNB.util.Common.api.userRegistration,
                            method: 'POST',
                            params: {
                                "First_name": data.first_name,
                                "Last_name": data.last_name,
                                "email": data.email,
                                "password": "123456",
                                "birthday": "11-11-2015",
                                "contact_no": "1234567890",
                                "regType": "social",
                                userName: data.first_name + ' ' + data.last_name,
                                device_id: ''
                            },
                            success: function(response) {
                                console.log(response);
                                var res = JSON.parse(response.responseText);
                                localStorage.setItem('email', data.email);
                                isLogin = false;
                                isLoginWithFB = true;
                                isLoginWithTwitter = false;
                                localStorage.setItem('email', data.email);
                                if (res.response_data.status) {
                                    Ext.Msg.alert('', 'Verification mail has been sent to your email id. Please check your email and activate your account.');
                                    Ext.getCmp('Login').hide();
                                    Ext.getCmp('DNBView').show();
                                } else if (res.response_data.isActive == 'active') {
                                    isLogin = true;
                                    isLoginWithFB = true;
                                    isLoginWithTwitter = false;
                                    isLocationServiceToggleButtonSet = false;
                                    localStorage.setItem('isLoginWithFB', 'YES');
                                    localStorage.setItem('isLoginWithTwitter', 'NO');
                                    localStorage.setItem('userid', res.response_data.user_id);
                                    localStorage.setItem('First_name', data.first_name);
                                    localStorage.setItem('Last_name', data.last_name);
                                    localStorage.setItem('email', data.email);
                                    DNB.app.getController('Events').GetUserById(res.response_data.user_id);
                                    Ext.getCmp('Login').hide();
                                    termconditionsPageOpenFrom = 'Register';
                                    if (Ext.getCmp('TMShow')) Ext.getCmp('TMShow').show();
                                    else Ext.Viewport.add({
                                        xtype: 'tmshow'
                                    }).show();
                                    Ext.getCmp('BackButtonInTermsCondition').setHidden(true);
                                } else if (res.response_data.isActive == 'block') {
                                    Ext.Msg.alert('', 'Please verify and activate your account first.');
                                    var btn = confirm('Would you like to resend verification link?');
                                    if (btn == true) {
                                        if (Ext.getCmp('ReSendLink')) {
                                            Ext.getCmp('ReSendLink').show();
                                        } else Ext.Viewport.add({
                                            xtype: 'resendlink'
                                        }).show();
                                        Ext.getCmp('ReSendEmail').setValue('');
                                    } else {
                                        Ext.getCmp('Login').hide();
                                        Ext.getCmp('DNBView').show();
                                        if (loginPageOpenFrom == 'SettingsTab') {
                                            Ext.getCmp('MainTabView').setActiveItem(0);
                                        }
                                    }
                                }
                            },
                            failure: function(res) {}
                        });
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            } else {
                console.log(response)
            }
        });
    },

    TwitterLoginImageButton: function(image, e, eOpts) {
        // if (deviceOSName == 'ios') {
        //     window.socialAuth.isTwitterAvailable(function success() {
        //         window.socialAuth.returnTwitterAccounts(function success(res) {
        //             if (res == false) {
        //                 Ext.Msg.alert('', 'Please Configure Twitter Account In Your Device');
        //             } else {
        //                 DNB.app.getController('Login').TwitterLogin(res);
        //             }
        //         }, function error() {});
        //     }, function error() {});
        // } else {
            DNB.util.Twitter.init();
        // }
    },
    onForgotPasswordButtonTap: function(button, e, eOpts) {
        if (Ext.getCmp('ForgotPassword')) Ext.getCmp('ForgotPassword').show();
        else Ext.Viewport.add({
            xtype: 'forgotpassword'
        }).show();
        Ext.getCmp('ResetEmail').setValue('');
    },
    onSignupButtonTap: function(button, e, eOpts) {
        Ext.getCmp('Login').hide();
        if (Ext.getCmp('Register')) Ext.getCmp('Register').show();
        else Ext.Viewport.add({
            xtype: 'register'
        }).show();
        var registerPanel = Ext.getCmp('Register');
        registerPanel.getComponent('email').setValue('');
        registerPanel.getComponent('UsernameInRegister').setValue('');
        registerPanel.getComponent('password').setValue('');
        registerPanel.getComponent('confirmPassword').setValue('');
        registerPanel.getComponent('dob').setValue('');
        // var pushNotification = window.plugins.pushNotification;
        //           pushNotification.register( function(res){
        //                                     //alert('sucees:');
        //                                     //alert(res);
        //                                     devicetokenid=res;
        //                                     },
        //                                     function(){
        //                                     Ext.Msg.alert('fail');
        //                                     },
        //                                     {
        //                                     "badge":"true",
        //                                     "sound":"true",
        //                                     "alert":"true",
        //                                     "ecb":"onNotificationAPN"
        //                                     });
    },
    ReSetLoginView: function() {
            var LoginPanel = Ext.getCmp('Login');
            LoginPanel.down('#txtUserEmail').setValue('');
            LoginPanel.down('#txtUserPassword').setValue('');
            //Ext.getCmp('txtUserEmail').setValue('');
            //Ext.getCmp('txtUserPassword').setValue('');
        } //,
        // TwitterLogin: function(username) {
        //     Ext.Ajax.request({
        //         url: DNB.util.Common.api.twitterSignUp,
        //         method: 'POST',
        //         params: {
        //             "username": username
        //         },
        //         success: function(res, options) {
        //             //alert('success:'+res.responseText);
        //             resl = res
        //             opt = options
        //             var res = Ext.decode(res.responseText).result;
        //             //alert(res.response_data.status);
        //             if (res.status) {
        //                 twitteruserid = res.user_id;
        //                 if (res.email == null || res.email == 'null') {
        //                     alert('email is null  here');
        //                     if (deviceOSName == 'ios') {
        //                         Ext.getCmp('Login').hide();
        //                     }
        //                     if (Ext.getCmp('UserEmail')) Ext.getCmp('UserEmail').show();
        //                     else Ext.Viewport.add({
        //                         xtype: 'useremail'
        //                     }).show();
        //                     Ext.getCmp('UserEmailAddress').setValue('');
        //                 } else if (res.isVerified == 'active') {
        //                     isLogin = true;
        //                     isLoginWithFB = false;
        //                     isLoginWithTwitter = true;
        //                     isLocationServiceToggleButtonSet = false;
        //                     localStorage.setItem('isLoginWithFB', 'NO');
        //                     localStorage.setItem('isLoginWithTwitter', 'YES');
        //                     DNB.app.getController('Events').GetUserById(res.user_id);
        //                 } else if (res.isVerified == 'block') {
        //                     ///Ext.Msg.alert('Please verify and activate your account first.');
        //                     Ext.Msg.alert('', 'Please verify and activate your account first.', function() {
        //                         Ext.Msg.confirm('', 'Would you like to resend verification link?', function(btn) {
        //                             if (btn == 'yes') {
        //                                 if (Ext.getCmp('ReSendLink')) {
        //                                     Ext.getCmp('ReSendLink').show();
        //                                 } else Ext.Viewport.add({
        //                                     xtype: 'resendlink'
        //                                 }).show();
        //                                 Ext.getCmp('ReSendEmail').setValue('');
        //                             } else {
        //                                 Ext.getCmp('Login').hide();
        //                                 Ext.getCmp('DNBView').show();
        //                             }
        //                         });
        //                     });
        //                     /*var btn=confirm('Would you like to resend verification link?');//,function(btn){
        //                     if(btn==true){
        //                         if(Ext.getCmp('ReSendLink')){
        //                             Ext.getCmp('ReSendLink').show();
        //                         }
        //                         else
        //                             Ext.Viewport.add({xtype:'resendlink'}).show();
        //                         Ext.getCmp('ReSendEmail').setValue('');
        //                     }
        //                     else{
        //                         Ext.getCmp('Login').hide();
        //                         Ext.getCmp('DNBView').show();
        //                     }*/
        //                 } else {
        //                     Ext.Msg.alert('', 'Verification mail has been sent to your email id. Please check your email and activate your account.');
        //                     Ext.getCmp('Login').hide();
        //                     Ext.getCmp('DNBView').show();
        //                 }
        //             }
        //         },
        //         failure: function(res, options) {
        //             Ext.Msg.alert('', 'failure' + res.responseText);
        //         }
        //     });
        // }
});