import { StyleSheet } from "react-native";
/* 
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    title: {
        display: "flex",
        alignSelf: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20
    },
});

*/

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#DDEBEB',
      alignItems: 'center',
      justifyContent: 'center',
    },
      title: {
        display: "flex",
        alignSelf: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20
    },
      container: {
      flex: 1,
      margin: 10,
      padding: 80,
      backgroundColor: '#88BCB1',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15, 
    },
  
    button: {
      width: '100%',  
      backgroundColor: '#012D33',
      color: '#FFFFFF',
      padding: 10,
      borderRadius: 5,    
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10 
    },

    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,

    },
        user: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18
    },
        item: {
        padding: 20,
        backgroundColor: 'white'
    },
    title1: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#EEE',
    },

     wallet: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 12
    } 

  });

export default styles;