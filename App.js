import React, {Component} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { firebaseApp, cadastrosDB } from './Firebase.js';

export default class Cadastro extends Component{
  state={
    nome: "",
    telefone: "",
    cadastros: [ ]
  }

  componentDidMount() {
    this.listarCadastros();
  }

  listarCadastros = () => {

    var cadastroTemp = [];

    cadastrosDB.on("value", (cadastros) => {
      
        cadastros.forEach((cadastro) => {
          
          cadastroTemp.push({
            key: cadastro.key,
            nome: cadastro.val().nome,
            telefone: cadastro.val().telefone
          });

        });
        this.setState({cadastros: cadastroTemp});
    });
  }

  adicionarCadastro = () => {
    if (this.state.cadastros.length > 0){
      
      var cadastro = {
        nome: this.state.nome,
        telefone: this.state.telefone
      };

      cadastrosDB.push(cadastro);

      this.listarCadastros();
    }
  }

  excluirCadastro = (key) => {

    cadastrosDB.child(key).remove();
    
    this.listarCadastros();
  }

 
  render(){
    return(
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Cadastro</Text>

          <View style={styles.itemContainer}>
            <TextInput style={styles.input} placeholder="Nome" value={this.state.nome} 
            onChange={ (nome) => this.setState({nome: nome})} />
          </View>

          <View style={styles.itemContainer}>
            <TextInput style={styles.input} placeholder="Telefone" valu={this.state.telefone} 
            onChange={ (telefone) => this.setState({telefone: telefone})} />
          </View>

          <View>
            <Button style={styles.botao} title="Adicionar" onPress={ () => this.adicionarCadastro()}/>
          </View>

          <Text style={styles.titulo}>Lista</Text> 

          <FlatList style={styles.lista} data={this.state.cadastros} renderItem={
            ({ item, index}) =>
              <View style={styles.item}>
                <Text>{item.nome}</Text>
                <Text>{item.telefone} </Text>
                  <View style={styles.botao}>
                    <Button style={styles.botao} title="X" color="#FF0000" onPress={ () => this.excluirCadastro(item.key)} />
                  </View>
              </View>
                
          } />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  titulo:{
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 28,
    fontWeight: "bold"
  },
  lista: {
    width: "100%",
    borderWidth: 1,
    height: 1,
    margin: 1,
    padding: 10
  },
  item: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 20,
    width: "50%"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  botao: {
    width: "20%",
    
  },
  input: {
    height: 40,
    padding: 2,
    margin: 12,
    borderWidth: 1,
    width: "90%"
  }
});
