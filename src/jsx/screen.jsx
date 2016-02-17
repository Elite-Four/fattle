import React from 'react'
import io from 'socket.io-client'



export default class Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {imageData: ''}
  }
  componentDidMount = () => {
    let socket = io.connect('https://fattle-gerhut.c9users.io/')
    socket.on('screen', screen => {
      let blob = new Blob([screen], {type: 'image/png'})
      this.setState({imageData: URL.createObjectURL(blob)})
    })
  }
  render () {
    return (<div>
      <img src={this.state.imageData} alt='loading' />
    </div>)
  }
}
