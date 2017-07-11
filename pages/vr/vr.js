Page({
    goToPay: function() {
        wx.requestPayment({
            'timeStamp': '',
            'nonceStr': '',
            'package': '',
            'signType': 'MD5',
            'paySign': '',
            'success': function(res) {},
            'fail': function(res) {}
        })
    },
    data: {
        price: "0.01",
        devCode: ""
    },
    onLoad: function(option) {
        var _this = this;
        _this.setData({ devCode: option.devCode + '' });
        wx.showModal({
            title: '提示-11',
            showCancel: false,
            content: JSON.stringify(option),
        });
        //获取微信信息
        wx.login({
            success: function(res) {
                if (res.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6988b48707511cc1&secret=164d368385cfb0120551ae2cc541eed2&js_code=' + res.code + '&grant_type=authorization_code',
                        // data: {
                        //     code: res.code
                        // },
                        success: function(_res) {
                            try {
                                var openId = _res.data.openid;

                                wx.request({
                                    url: 'https://vr.mtscrm.com/api/v1/order/save',
                                    method: 'POST',
                                    data: {
                                        movieKey: openId,
                                        realFee: _this.data.price,
                                        devCode: option.devCode
                                    },
                                    success: function(res) {
                                        //获取微信支付的信息 
                                        wx.showModal({
                                            title: '提示-success',
                                            showCancel: false,
                                            content: JSON.stringify(res),
                                        });

                                    },
                                    fail: function(res) {
                                        wx.showModal({
                                            title: '提示-err',
                                            showCancel: false,
                                            content: JSON.stringify(res),
                                        });
                                    }
                                });
                            } catch (error) {
                                wx.showModal({
                                    title: '提示-err-err',
                                    showCancel: false,
                                    content: JSON.stringify(error),
                                });
                            }

                        },
                        fail: function(_res) {
                            wx.showModal({
                                title: '提示-err',
                                showCancel: false,
                                content: JSON.stringify(_res),
                            });
                        }
                    })
                } else {

                }
                // wx.getUserInfo({
                //     success: function(res) {
                //         _this.setData({ userInfo: res.userInfo + '' });
                //         wx.showModal({
                //             title: '提示',
                //             showCancel: false,
                //             content: JSON.stringify(res.userInfo),
                //         });
                //     }
                // })
            }
        })

    }
})