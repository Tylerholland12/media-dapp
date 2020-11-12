import React, { Component } from 'react';
import MediaDapp from '../abis/MediaDapp.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //Load ethereum accounts
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    //Add first account the the state

    //Get network ID
    const networkId = await web3.eth.net.getId()
    //Get network data
    const networkData = MediaDapp.networks[networkId]
    if(networkData) {
      const mediadapp = new web3.eth.Contract(MediaDapp.abi, networkData.address)
      this.setState({ mediadapp })
      const videosCount = await mediadapp.methods.videoCount().call()
      this.setState({ videosCount })

      for (var i=videosCount; i>=1; i--) {
        const video = await mediadapp.methods.videos(i).call()
        this.setState({
          videos: [...this.state.videos, video]
        })
      }

      const latest = await mediadapp.methods.videos(videosCount).call()
      this.setState({
        currentHash: latest.hash,
        currentTitle: latest.title
      })

      this.setState({ loading:false })

    } else {
      window.alert('MediaDapp is not deployed to the detected network')
    }
    //Check if net data exists, then
      //Assign mediadapp contract to a variable
      //Add mediadapp to the state

      //Check videoAmounts
      //Add videAmounts to the state

      //Iterate throught videos and add them to the state (by newest)


      //Set latest video and it's title to view as default 
      //Set loading state to false

      //If network data doesn't exisits, log error
  }

  //Get video
  captureFile = event => {

  }

  //Upload video
  uploadMedia = title => {

  }

  //Change Video
  changeVideo = (hash, title) => {

  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      account: '',
      mediadapp: null,
      videos: [],
      loading: true,
      currentHash: null,
      currentTitle: null,
      //set states
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar 
          account={this.state.account}
          //Account
        />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              //states&functions
            />
        }
      </div>
    );
  }
}

export default App;