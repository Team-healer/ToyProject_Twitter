import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView,Alert} from 'react-native';
import { theme } from './styles';
import React, { useState } from 'react';
import DialogInput from 'react-native-dialog-input';

export default function App() {
  const [mytweeting, setmytweeting] = useState(false);
  const [text, setText]=useState("");
  const [toTweet, setToTweet] = useState({});
  const alltweet =()=>setmytweeting(false);
  const mytweet=()=>setmytweeting(true);

  const onChangeText=(payload)=>setText(payload);
  const onChangeNick=(account)=>setNickname(account);
  const [visible, setVisible] = React.useState(false);
  const [nickname, setNickname]=useState("");
  const addNickname =()=>{
    if(nickname===""){return;} 
  };
  const addTweet =()=>{
    //alert(text);
    if(text===""){//아무것도 안적었을때
      return;
    }
    // const newToTweet = Object.assign({},toTweet,{
    //   [Date.now()]: {text, alltweet: alltweeting},
    // });//newToTweet함수를 만듦: hashmap만드는 역할
    const newToTweet = {...toTweet, [Date.now()]: {text, mytweeting, nickname}};
    setToTweet(newToTweet);//setToTweet상태를 newToTweet으로 하여 toTweet에 넣어주는 역할.
    setText("");//버튼 누르면 다시 원래대로
  };
  const deleteTweet = (key) => {
    Alert.alert("Delete Tweet", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToTweet = { ...toTweet };
          delete newToTweet[key];
          setToTweet(newToTweet);
        },
      },
    ]);
  };
  // const modifyTweet = (key) => {
  //   if(input===""){
  //     return;
  //   }
   
  //   const newToTweet = {...toTweet};
  //   newToTweet[key].text = input;
  //   setToTweet(newToTweet);
   
    
    
  // };
  
  console.log(toTweet);


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={{fontSize: 30, color: "white"}}>Dwitter</Text>
        <Text style={{color:theme.blue}}>@</Text>
        <TextInput 
        onSubmitEditing={addNickname}
         onChangeText={onChangeNick}
         placeholder={"nickname"}
         value={nickname}
         style = {styles.inputnickname}/>
        
      <TouchableOpacity onPress={alltweet}>
        <Text style={{...styles.btnText,color: mytweeting? theme.grey:"white"}}>All Tweets</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={mytweet}>
        <Text style={{...styles.btnText,color: mytweeting? "white":theme.grey}}>My Tweets</Text>
      </TouchableOpacity>  
        <TouchableOpacity>
          <Text style={{...styles.btnText, color: theme.grey}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputpadding}>
        <TextInput 
        onSubmitEditing={addTweet}
         onChangeText={onChangeText}
         placeholder={"Edit your tweet"}
         value={text}
         style = {styles.input}/>
        <TouchableOpacity onPress={addTweet}>
          <Text style={styles.post} >Post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {Object.keys(toTweet).map((key)=>(
          (!mytweeting||toTweet[key].nickname ===nickname)?(
          <View style={styles.toTweet} key={key}>
            <Text>{toTweet[key].nickname}</Text>
            <TouchableOpacity onPress={() => deleteTweet(key)}>
              {toTweet[key].nickname ===nickname?
                (<Text>삭제하기</Text>):null}
            </TouchableOpacity>
            <DialogInput
                isDialogVisible={visible}
                title={"Modify Tweet"}
                message={"Do you want to modify tweet?"}
                hintInput ={"Enter Text"}
                
                submitInput={ (inputText) => {  
                  const newToTweet = {...toTweet};
                  newToTweet[key].text = inputText;
                  setToTweet(newToTweet);
                    setVisible(false);
                }}
                
                closeDialog={() =>{setVisible(false)}}>
            </DialogInput>
            <TouchableOpacity onPress={() => {
              setVisible(true)
              }}>
              {toTweet[key].nickname ===nickname?
                (<Text>수정하기</Text>):null}
            </TouchableOpacity>
           
            <Text style={styles.toTweetText}>{toTweet[key].text}</Text>
          </View>):null
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  toTweet:{
    backgroundColor:"white",
    margin:5,
    padding:20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  toTweetText:{
      color:"black",
      fontSize:16,

  },
  post: {
    color:"white", backgroundColor:theme.blue, fontSize:18,
    marginVertical:10,
    marginRight:20,
  },
  inputpadding:{
    backgroundColor:theme.grey,
    flexDirection:"row",
    
  },
  input:{
    backgroundColor:"white",
    paddingHorizontal: 15,  
    marginLeft:20,
    marginVertical:20,
    fontSize:15,
  },
  inputnickname:{
    backgroundColor:"black",
    color: theme.blue,
  },
  header: {
    backgroundColor: '#000',
    justifyContent: "space-between",//나중에 정렬 필요
    marginTop:30,//이것도 어떻게?
    flexDirection:"row",
    paddingHorizontal:20,
  },
  btnText:{
    fontSize: 15,
    fontWeight: "400",
  },
});
