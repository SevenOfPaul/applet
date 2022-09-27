  interface IRoom{
    avatar: string
    hn: string
    isLive: number
    isVertical: number
    nickname: string
    rid: number
    roomName: string
    //房间链接
    roomSrc: string
    //房间图片链接
    verticalSrc: string
    vipId: number
  }
  //返回值类型
  interface IStreamDta{
    nowPage:number,
    pageCount:number
  }
  export type {IRoom, IStreamDta}
