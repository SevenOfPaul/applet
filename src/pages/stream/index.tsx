import { useEffect, useState } from 'react'
import { Grid,GridItem, Skeleton } from '@nutui/nutui-react-taro'
//引入请求链接
import { baseUrl } from '../../data/index'
//引入less文件
import stream from './index.module.less'
import Taro, { useReachBottom } from '@tarojs/taro'
import { IRoom, IStreamDta } from './type'

export default function index() {
  //数据层

  const [query,setQuery]=useState<IStreamDta>({
    nowPage:1,
    pageCount:0
  })
  const [rooms,setRooms]=useState<IRoom[]>([])
  //show骨架屏
  const [showSkeleton ,changeShow]=useState<boolean>(false)
  //拿取数据
  useEffect(()=>{
    try{
(async()=>{
  let  res=await Taro.request({url:baseUrl.stream})
    if(res.statusCode!==200) throw new Error(res.errMsg)
   let result=[...res.data.data.list]
    res=await Taro.request({url:baseUrl.stream,data:{page:query.nowPage+1}})
    if(res.statusCode!==200) throw new Error(res.errMsg)
    result=[...result,...res.data.data.list]
    changeShow(!showSkeleton)
    setQuery({nowPage:query.nowPage++,pageCount:res.data.data.pageCount})
     setRooms(result)
  })()
}catch(e){
    Taro.showToast({
        title: '网络错误',
        icon: 'error',
        duration: 2000
      })
   }
  },[])
  //触底更新
  useReachBottom(async()=>{
    if(query.nowPage>query.pageCount){
      Taro.showToast({
        title: '数据都用光啦',
        icon: 'error',
        duration: 2000
      })
    }else{
      try{
    let res=await  Taro.request({url:baseUrl.stream,data:{page:query.nowPage+1}})
    if(res.statusCode!==200) throw new Error(res.errMsg)
     setQuery({nowPage:query.nowPage+1,pageCount:res.data.data.pageCount})
       setRooms([...rooms,...res.data.data.list])
     }catch(e){
        Taro.showToast({
        title: '网络错误',
        icon: 'error',
        duration: 2000
      })
     }
    }
  })
  return (
  <view>
    {showSkeleton?
     <Grid columnNum={2}>
    {rooms.map(room=> <GridItem className={stream.room} onClick={
      ()=>{Taro.navigateTo({url:`/pages/live/index?roomSrc=${room.roomSrc}&roomName=${room.roomName}
        &avaterUrl=${room.avatar}&nickname=${room.nickname}
        `})}
    }>
      <view className={stream.hn}>
        <text>{room.hn}</text>
      </view>
      <img className={stream.roomPic} src={`${room.roomSrc}`} />
      <view className={stream.nickname}>
        <text>{room.nickname}</text>
      </view>
      <img className={stream.avatar} src={`https://images.weserv.nl/?url=${room.avatar}`}/>
      <text className={stream.roomName}>{room.roomName}</text>
    </GridItem>)}
    </Grid>:<Skeleton width="400Px" height="30Px" row={10} title animated />
}
  </view>
  )
}

