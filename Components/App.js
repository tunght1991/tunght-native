import React, {Component} from 'react';
import {View, Text, ListView, Image,
        RefreshControl} from 'react-native';

export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            refreshing: false,
            page: 0,
            dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
        }
    }

    loadNewData() {
        this.setState({
            refreshing: true
        })

        fetch(`http://localhost:3333/books?page=${this.state.page + 1}`)
            .then((responsive) => responsive.json())
            .then((responsiveJson) => {
                if(responsiveJson.length !== 0){
                    mang = mang.concat(responsiveJson)
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(mang),
                        refreshing: false,
                        page: this.state.page + 1
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render(){
        return (
            <ListView 
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.refreshing}
                        onRefresh={this.loadNewData.bind(this)}
                    />
                }
                dataSource={this.state.dataSource}
                renderRow={(r) => 
                    <View style={{padding:20, borderWidth:1}}>
                        <Image source={{uri: r.image}} style={{width: 70,height: 100}}/>
                        <Text>{r.id}</Text>
                    </View>
                }
            />
        )
        
    }

    componentDidMount() {
        //load data
        fetch(`http://localhost:3333/books?page=${this.state.page}`)
            .then((responsive) => responsive.json())
            .then((responsiveJson) => {
                mang = responsiveJson
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(mang)
                })
            })
            .catch((error) => {
                console.log(error)
            });
        
        
        
    }
}