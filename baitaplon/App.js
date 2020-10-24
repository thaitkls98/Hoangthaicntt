import React from 'react';
import { View, Text ,StyleSheet, FlatList,TouchableOpacity, TextInput, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class HomeScreen extends React.Component {
  state = {
    Tenxa: '',
    dientich: '',
    sodan: '',
    matdodan: '',
    mahanhchinh: ''
  }
  handleTenx = (text) => {
      this.setState({ Tenxa: text })
  }
  handledientich = (text) => {
      this.setState({ dientich: text })
  }
  handlesodan = (text) => {
    this.setState({ sodan: text })
  }
  handlematdodan = (text) => {
    this.setState({ matdodan: text })
  }
  handlemahanhchinh = (text) => {
    this.setState({ mahanhchinh: text })
  }
   login = (Tenxa,dientich, sodan,matdodan,mahanhchinh) => {
    fetch('http://192.168.0.104:8080/tr_reactnative/insert.php',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        Tenx: Tenxa,
        DienTich: dientich,
        SoDan: sodan,
        MatDoDan: matdodan,
        MaHanhChinh: mahanhchinh
      }),        
    }).then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson);
    }).catch((error) =>{
      console.error(error);
    })
}
  render(){
    return (
      <View style={styles.container,{flex:1}}>
        <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}> 
        <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Ten Xa..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleTenx}
          />

          <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Dien Tich..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handledientich}
          />
          <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "so dan..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handlesodan}
          />
          <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "mat do dan..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handlematdodan}
          />
          <TextInput
              style={styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Ma hanh chinh..."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handlemahanhchinh}
          />
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={
                () => this.login(this.state.Tenxa, this.state.dientich, this.state.sodan,this.state.matdodan,this.state.mahanhchinh)
              }
              >
              <Text style={ styles.submitButtonText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={
                () => {this.props.navigation.navigate("Data Users");
              }}
              >
              <Text style={ styles.submitButtonText}>Hien Dan SO</Text>
          </TouchableOpacity>
        </View>

      </View>
      
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      dataSource:[]
    }
  }

  Action_Click(Max, Tenx, DienTich, SoDan,MatDoDan,MaHanhChinh){
    this.props.navigation.navigate("Update User",{
      Max: Max,
      Tenx: Tenx,
      DienTich: DienTich,
      SoDan: SoDan,
      MatDoDan: MatDoDan,
      MaHanhChinh: MaHanhChinh
    })
  }

  componentDidMount(){
    fetch('http://192.168.0.104:8080/tr_reactnative/getdataUsers.php')
    .then((response)=>response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        dataSource:responseJson
      })
    })
  }

  _renderItem = ({item,index}) => {
    return(
      <View style={styles.item}>
        <Text onPress={this.Action_Click.bind(this,
            item.Max,
            item.Tenx,
            item.DienTich,
            item.SoDan,
            item.MatDoDan,
            item.MaHanhChinh
          )}
        >
            {item.Tenx}
        </Text>
      </View>
    )
  }
  render(){
    let {dataSource, isLoading} = this.state
    return (
      <View style={styles.containerDatastudents}>
        <FlatList
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor = {(item,index) => index.toString()}
        >
        </FlatList>
      </View>
    );
  }

};


class UpdateDataUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputMaX: '',
      TextInputTenX: '',
      TextInputDienT: '',
      TextInputSoD: '',
      TextInputMaDoD:'',
      TextInputMaHC:''
    }
  }

  componentDidMount(){    
    this.setState({
      TextInputMaX : this.props.route.params.Max,
      TextInputTenX : this.props.route.params.Tenx,
      TextInputDienT : this.props.route.params.DienTich,
      TextInputSoD : this.props.route.params.SoDan,
      TextInputMaDoD : this.props.route.params.MatDoDan,
      TextInputMaHC : this.props.route.params.MaHanhChinh,

    })
  }

  UpdateUser= () =>{
    fetch('http://192.168.0.104:8080/tr_reactnative/update.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Max : this.state.TextInputMaX,
        Tenx : this.state.TextInputTenX,
        DienTich : this.state.TextInputDienT,
        SoDan : this.state.TextInputSoD,
        MatDoDan : this.state.TextInputMaDoD,
        MaHanhChinh : this.state.TextInputMaHC
        
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
  }

  DeleteUser= () =>{
    fetch('http://192.168.0.104:8080/tr_reactnative/delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Max : this.state.TextInputMaX
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
  }
  render(){
    return (
      <View style={styles.container,{flex:1}}>
        <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}> 
        <TextInput
              style={styles.input}
              placeholder = "Ten xa..."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputTenX : TextInputValue }) }
              value={this.state.TextInputTenX}
          />

          <TextInput
              style={styles.input}
              placeholder = "Dien tich..."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputDienT : TextInputValue }) }
              value={this.state.TextInputDienT}
          />
          <TextInput
              style={styles.input}
              placeholder = "so dan..."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputSoD : TextInputValue }) }
              value={this.state.TextInputSoD}
          />
          <TextInput
              style={styles.input}
              placeholder = "mat do dan..."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputMaDoD : TextInputValue }) }
              value={this.state.TextInputMaDoD}
          />
          <TextInput
              style={styles.input}
              placeholder = "Ma hanh chinh."
              placeholderTextColor = "#9a73ef"
              onChangeText={ TextInputValue => this.setState({ TextInputMaHC : TextInputValue }) }
              value={this.state.TextInputMaHC}
          />
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={this.UpdateUser}
              >
              <Text style={ styles.submitButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style = {styles.submitButton}
              onPress={this.DeleteUser}
              >
              <Text style={ styles.submitButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
};


const Stack = createStackNavigator(
);

export default class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#009688',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen name='Student management' component={HomeScreen} />
          <Stack.Screen name='Data Users' component={DetailsScreen} />
          <Stack.Screen name='Update User' component={UpdateDataUser} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
} 
  
const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        padding:10,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#009688',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius:4
    },
    submitButtonText: {
        color: 'white',
        textAlign:'center',
        textTransform:'uppercase'
    },
    containerDatastudents:{
      flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5
    },

    item:{
      padding:10,
      borderBottomWidth:1,
      borderBottomColor:'#ddd'
    },

    MainContainer: {
      alignItems: 'center',
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#fff'
    }
  })
