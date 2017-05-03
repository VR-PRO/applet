Page({

  goToPay:function(){
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success':function(res){
      },
      'fail':function(res){
      }
    })
  },
  goToPay1:function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  data:{
    tit: "速度与激情",
    price: "9.00",
    num: 12345
  }

})