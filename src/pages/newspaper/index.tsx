import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Newspaper extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='newspaper'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
