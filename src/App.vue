<template>
  <div id="app">
      <div id="list" v-if="onPageIndex">
      <div class="device" v-for="item in deviceInfo">
        <div class="imgWrap">
          <img class="deviceIcon" :src="item.type"/>
        </div>
        <div class="deviceInfo">
          <span class="macId">
            {{item.macId}}<br/>
          </span>
          <img class="statusIcon" :src="item.state"/><br/>
          <span class="deviceName">
            {{item.deviceName}}
          </span>
        </div>
        <div class="devide"><img class="line" src="../static/img/line.png"/></div>
        <div class="wrapMore" @click="changePage">
          <img class="imgMore" src="../static/img/go.png"/>
        </div>
        <div class="rightInfo">
          <span class="indexTitle">PM2.5</span>
          <span class="pmIndex">{{item.pm25}}</span>

        </div>

      </div>
      </div>

      <div id="detailWrap" v-if="onPageDetail">
        <DetailCmp></DetailCmp>
      </div>
  </div>
</template>
<script>
  var bq = require("../static/img/bq.png");
  var sq = require("../static/img/sq.png");
  var c  = require("../static/img/c.png");
  var on  = require("../static/img/online.png");

  import DetailCmp from './components/detail'

  export default {
    name:'list',
    components:{ DetailCmp },
    data(){
        return{
            onPageDetail:false,
            onPageIndex:true,
            //type有三种：大Q--bq 小Q--sq C--c
            deviceInfo:[
              {
                'deviceName':'谷歌大厦五楼',
                'type': bq,
                'macId':'8900c234',
                'state':on,
                'pm25':30,
                'deviceId':'123'
              },
              {
                'deviceName':'宝马展厅',
                'type': bq,
                'macId':'8900c234',
                'state':on,
                'pm25':30,
                'deviceId':'12'
              }
            ]
        }
    },
    methods:{
        changePage(){
            this.onPageDetail = true;
            this.onPageIndex = false;
        }
    }
  }
</script>
<style lang="postcss" scoped>
  body{
    margin:0;
    padding:0;
  }
  #list{
    margin-top: -10px;
    padding-top: 30px;
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: rgb(25,24,102);
    color: white;
  }
  .device{
    display: block;
    width: 94%;
    height:72px;
    margin: 10px 3%;
    background-color: rgba(255,255,255,.2);
    overflow: hidden;
    font-family: "Microsoft YaHei";
  }
  .imgWrap{
    display: block;
    position:relative;
    line-height: 60px;
    /*text-align: center;*/
    width: 70px;
    height: 100%;
    float: left;
    margin-right: 10px;
    /*border: 1px solid #fff;*/
  }
  .deviceInfo{
    display: inline-block;
    width: 45%;
    height: 100%;
  }

  .deviceIcon{
    display:block;
    position: absolute;
    top:50%;
    left:50%;
    margin-top: -20px;
    margin-left: -20px;
    /*vertical-align: middle;*/
    width:40px;
    height: 40px;
  }
  .macId{
    display: inline-block;
    padding-top: 12px;
    color: rgba(255,255,255,.5);
    font-size:15px;
  }
  .deviceName{
    display: block;
    padding-top: 2px;
    font-size: 16px;
    color: rgba(255,255,255,.8);
  }
  .devide{
    display: inline-block;
    height: 60%;
    width: 15px;
  }
  .line{
    display: inline-block;
    /*float: right;*/
    height: 100%;
    width: 15px;

  }
  .rightInfo{
    display: inline-block;
    float: right;
    width: 14%;
    height: 70%;
  }
  .indexTitle{
    display: inline-block;
    padding-top: 12px;
    color: rgba(255,255,255,.5);
    font-size:15px;
  }
  .pmIndex{
    display: block;
    font-size: 16px;
    text-align: right;
    padding-top: 0px;
    color: rgba(255,255,255,.8);
  }

  .statusIcon{
    display: inline-block;
    width: 13px;
    height: 13px;
  }
  .wrapMore{
    display: inline-block;
    float: right;
    width: 10%;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    padding-top: 19px;
  }
  .imgMore{
    width: 20%;
    height: 20%;
  }
</style>
