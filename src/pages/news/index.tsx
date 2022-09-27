import { Component, PropsWithChildren, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import news from "./index/module.less"
import { baseUrl } from '../../data/index'
import Taro from '@tarojs/taro'
import INewsData from './type'
import { Grid, GridItem } from '@nutui/nutui-react-taro'

export default function index() {
  const [videoes,setVideos]=useState<INewsData>({total:0,list:[]})
  useEffect(()=>{
    Taro.request({url:baseUrl.news}).then(
      res=>{
    if(res.statusCode!==200) throw new Error(res.errMsg)
    setVideos(res.data.result)
      }
    ).catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <view>
     <Grid columnNum={2}>
    {/* {videoes.list.map(video=> <GridItem><img  src={`https://images.weserv.nl/?url=${video.coverUrl}`} /></GridItem>)} */}
    </Grid>
  </view>
  )
}

