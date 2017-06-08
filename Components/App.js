import React, {Component} from 'react';
import {View, Text, ListView, Image} from 'react-native';

export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
        }
    }

    render(){
        return (
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={(r) => 
                    <View style={{padding:20, borderWidth:1}}>
                        <Image source={{uri: r.image}} style={{width: 70,height: 100}}/>
                        <Text>{r.name}</Text>
                    </View>
                }
            />
        )
        
    }

    componentDidMount() {
        //load data
        fetch('http://localhost:3333/books')
            .then((responsive) => responsive.json())
            .then((responsiveJson) => {
                console.log(responsiveJson)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responsiveJson)
                })
            })
            .catch((error) => {
                console.log("da error")
                console.log(error)
            });
        
        
        
    }
}