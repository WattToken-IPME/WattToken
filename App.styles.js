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
      width: '100%',
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
      width: '95%',
      maxWidth: 720,
      padding: 32,
      backgroundColor: '#88BCB1',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
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

    buttonDisabled: {
      opacity: 0.6,
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
    },

    balanceContainer: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      padding: 18,
      borderRadius: 10,
      marginBottom: 20,
    },
    balanceScreenContainer: {
      padding: 24,
    },
    balanceTitle: {
      color: '#012D33',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 12,
    },
    tokenTitle: {
      color: '#012D33',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 4,
    },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    balanceLabel: {
      color: '#34565A',
      fontSize: 14,
      flexBasis: '42%',
      flexShrink: 1,
      marginRight: 12,
    },
    balanceValue: {
      color: '#012D33',
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
      flexShrink: 1,
      textAlign: 'right',
    },
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: 12,
    },
    loadingText: {
      color: '#34565A',
      marginTop: 8,
    },
    errorText: {
      color: '#A32121',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 8,
    },

  });

export default styles;
