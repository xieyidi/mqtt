<template>
  <div id="app">
    <div class="head">
      <div class="left">
        <span class="device-name">{{device.name}}</span>
        <span class="device-status">{{device.status}}</span><br/>
        <span class="date">{{device.date | formatDate}}</span>
      </div>
      <div class="right"><span class="logo-top"></span></div>
    </div>
    <div class="middle cent">
      <span>pm2.5</span>
      <span>{{device.pm25}}</span>
      <span>ug/m3</span>
      <span>{{device.pm25 | grade}}</span>
    </div>
    <div class="intro cent">
      <span>我是仪器{{device.type}}</span>
    </div>
    <div class="bottom cent">
      <span>{{device.location}}</span>
      <span>{{device.weather}}</span>
      <span>PM2.5 {{device.outpm25}}{{device.outpm25 | grade}}</span>
    </div>
    <div class="nav cent">
      <span class="toggle" @click="toggle">开关</span>
      <span class="network" @click="network">配网</span>
      <span class="more" @click="more">更多</span>
    </div>
  </div>
</template>

<script>
  import {formatDate} from './common/date.js'
  import pam from './common/mqttws3.1.js'
  export default {
    name: 'App',
    data () {
      return {
        device: {
          type: '小  Q-P',
          name: '设备名称',
          status: true,
          date: new Date(),
          pm25: 40,
          location: '北京市 海淀区',
          weather: '多云',
          outpm25: 67
        },
        options: {
          timeout: 5,
          userName: 'hj',
          password: '123456',
          willMessage: {},
          keepAliveInterval: 60,
          cleanSession: false,
          useSSL: false,
          invocationContext: {},
          onSuccess: this.onConnect,
          onFailure: this.onConnectionLost,
          hosts: '39.106.63.136',
          ports: 443,
          mqttVersion: 4
        },
        cli: new pam.MQTT(),
        client: new pam.MQTT().Client('39.106.63.136',443,'clientId-NX75qTbKES'), // 第三个参数是clientID可以为空
        topic: '001/in' // 订阅的主题
      }
    },
    methods: {
      toggle () {
          console.log('cli'+this.cli);
          console.log(this.client);
      },
      network () {

      },
      more () {

      },
      onConnectionLost: function (responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
          console.log('连接已断开')
        }
      },
      onMessageArrived: function (message) {
        console.log('收到消息:' + message.payloadString)
      },
      onConnect: function () {
        console.log('onConnected')
        this.client.subscribe(this.topic)// 订阅主题
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      grade (pm) {
        let g = '未知'
        if (pm < 35) {
          g = '优'
        } else if (pm < 75) {
          g = '良'
        } else if (pm < 115) {
          g = '轻度污染'
        } else if (pm < 150) {
          g = '中度污染'
        } else if (pm < 250) {
          g = '重度污染'
        } else {
          g = '严重污染'
        }
        return g
      }
    },
    created: function() {
//      var self = this;
      console.log(this.cli);
      console.log(this.client);
//      this.client.connect({onSuccess:onConnect}) // 连接服务器并注册连接成功处理事件
      this.client.connect(this.options)
      this.client.onConnectionLost = this.onConnectionLost // 注册连接断开处理事件
      this.client.onMessageArrived = this.onMessageArrived // 注册消息接收处理事件
      // this.client.disconnect(); // 断开连接
    }
  }
</script>
<style scoped lang="less">
  @IMG_PATH : '../static/img';
  #app{
    display: block;
    width: 100vw;
    height: 675px;
  }
  .head{
    width: 100vw;
  }
  .left{
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #000;
    width: 325px;
  }
  .right{
    display: inline-block;
    float: right;
    width: 50px;
    height: 50px;
  }
  .logo-top{
    display: inline-block;
    width: 100%;
    height: 100%;
    background-image: url("@{IMG_PATH}/logo.png");
    background-position: center;
    background-size: 100% 100%;
  }
  .cent{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle{
    width: 100%;
    height: 200px;
    margin: 25px auto;
    flex-flow: column;
    background-image: url("@{IMG_PATH}/greencircle.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .bottom{
    width: 100%;
    height: 180px;
    margin: 15px auto;
    flex-flow: column;
    background-image: url("@{IMG_PATH}/bluerect.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 70% 100%;
  }
  .nav{
    color: #ffffff;
    flex-flow: row;
    width: 100%;
    height: 80px;
  }
  .nav span{
    display: inline-block;
    width: auto;
    height: 100%;
    flex: 0 0 33%;
    background-image: url("@{IMG_PATH}/rhombus.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 100%;
    line-height: 80px;
    text-align: center;
  }
  .middle span{
    flex: 0 0 25%;
    line-height: 45px;
  }
</style>
