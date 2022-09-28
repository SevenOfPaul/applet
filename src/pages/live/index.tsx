import {useState,useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import live from  './index.module.less'
import { Input } from '@nutui/nutui-react-taro';
import { Button } from '@nutui/nutui-react-taro';
import { Icon } from '@nutui/nutui-react-taro';

export default function index() {
  const [room,setRoom]=useState({name:"",src:"",avater:"",nickname:""})
  useEffect(()=>{
   const {roomName,roomSrc,avaterUrl,nickname}=Taro.getCurrentInstance().router.params
   setRoom({name:roomName,src:roomSrc,avater:`https://images.weserv.nl/?url=${avaterUrl}`,nickname});
   Taro.setNavigationBarTitle({title:roomName})
  },[])
  return (
    <view className={live.live}>
    <img src={room.src} className={live.image}/>
    <view className={live.middle}>
    <img src={room.avater} className={live.avator}/>
    <text>{room.nickname}</text>
    <Button type="primary">+关注</Button>
    </view>
    <text style="color:red;margin:5Px 0 0 10Px">保证弹幕和谐哦</text>
    <view className={live.down}> 
    <Icon  name="github" size="24" className={live.ic} />
    <Input type="text" placeholder="发送弹幕" border={true}/>
     <Button type="success">发送</Button>
     </view>
  </view>
  )
}
