Page({
    wxPayClick: function() {
        var _this = this;
        wx.requestPayment({
            'timeStamp': _this.data.wpay.timeStamp,
            'nonceStr': _this.data.wpay.nonceStr,
            'package': 'prepay_id=' + _this.data.wpay.package,
            'signType': 'MD5',
            'paySign': _this.data.wpay.paySign,
            'success': function(res) {
                wx.redirectTo({
                    url: '../pay/pay'
                });
            },
            'fail': function(res) {
                console.error(JSON.stringify(res));  
            }
        })
    },
    data: {
        hidden:true,
        price: "0.01",
        devCode: "",
        wpay: {},
        nickName: ''
    },
    onLoad: function(option) {
        var _this = this;
        _this.setData({ devCode: option.devCode + '' });
        //获取微信信息
        _this.setData({ hidden: false });
        wx.getUserInfo({
            success: function(userInfo) {
                _this.setData({ nickName: userInfo.userInfo.nickName });
                wx.login({
                    success: function(res) {
                        if (res.code) {
                            getOpenId(res.code, option.devCode);
                        }
                    }
                })
            },
            fail : function(){
                _this.setData({ nickName: '非授权用户' });
                wx.login({
                    success: function(res) {
                        if (res.code) {
                            getOpenId(res.code, option.devCode);
                        }
                    }
                })
            }
        })
        var getOpenId = function(code, devCode) {
            //--需要改造
            wx.request({
                url: 'https://vr.mtscrm.com/api/v1/wx/jscode2session',
                method: 'POST',
                data: {
                    code: code
                },
                success: function(_res) {
                    try {
                        var openid = JSON.parse(_res.data.data).openid;

                        wx.request({
                            url: 'https://vr.mtscrm.com/api/v1/wx/order',
                            method: 'POST',
                            data: {
                                openId: openid,
                                realFee: _this.data.price,
                                devCode: devCode,
                                nickName: _this.data.nickName
                            },
                            success: function(res) {
                                var data = res.data.data;
                                console.log(data)
                                if (res.data.result == 2) { //已经支付过了
                                    wx.navigateTo({
                                        url: '../again/again',
                                    })
                                } else if (res.data.result == 1) { //刚刚创建过订单
                                    _this.data.wpay = data;
                                } else { //失败的处理
                                    wx.showModal({
                                        title: '提示',
                                        showCancel: false,
                                        content: res.data.msg
                                    });
                                }
                               _this.setData({ hidden: true });
                            },
                            fail: function(res) {
                                wx.showModal({
                                    title: '提示',
                                    showCancel: false,
                                    content: JSON.stringify(res),
                                });
                               _this.setData({ hidden: true });
                            }
                        });
                    } catch (error) {
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: JSON.stringify(error),
                        });
                        _this.setData({ hidden: true });
                    }
                },
                fail: function(_res) {
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: JSON.stringify(_res),
                    });
                    _this.setData({ hidden: true });
                }
            })
        };
    }
})