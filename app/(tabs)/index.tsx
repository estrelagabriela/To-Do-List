import { StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, View, Image, Text,KeyboardAvoidingView,Platform } from 'react-native';
import { useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import Foundation from '@expo/vector-icons/Foundation';


interface task {
  id: string;
  text: string;
  completed: boolean;
}
export default function HomeScreen() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [countTask, setCountTask] = useState(0);
  const [countCompleted, setCountCompleted] = useState(0);


  const handleAddToDo = () => {
    if (newTask.trim() === '') {
      Alert.alert('Tarefa inválida!', 'Por favor, adicione uma tarefa válida!');
      return;
    }
    const task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setCountTask(countTask+1);
  };
  const toggleTaskCompleted = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>{
       if (task.id === id ){ 
        setCountCompleted((prevCount)=>
          task.completed? prevCount-1:prevCount+1
      );
        return {...task,completed:!task.completed};
    }
    return task;
  })
);
};
  const deleteTask = (id: string) => {
    Alert.alert('Excluir tarefa', 'Tem certeza que deseja excluir esta tarefa?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
          setCountTask(countTask-1);
          setCountCompleted(countCompleted-1);
        },
      }
    ]);
  }
  const renderTask = (item: task) => {
    return (
      <View style={styles.taskContainer}>
        <Checkbox
          value={item.completed}
          onValueChange={() => toggleTaskCompleted(item.id)}
          style={styles.checkbox}
          color={item.completed ? '#5e60ce' : '#3a7ca5'}
        />
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.text}
        </Text>
        <TouchableOpacity
          onPress={() => deleteTask(item.id)}
          style={styles.deleteButton}
        >
          <FontAwesome5 name="trash-alt" size={24} color="gray" style={styles.trash} />
        </TouchableOpacity>
      </View>
    )
  };
  return (
       <KeyboardAvoidingView 
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       style={styles.container}
       keyboardVerticalOffset={0}>
      <View style={styles.containerHeader}>
        <Image
          source={require('../image/Logo.png')}></Image>
      </View>
      <View style={styles.containerInferior}>
        <View style={styles.nav}>
          <TextInput
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChangeText={setNewTask}
            style={styles.input}>
          </TextInput>
          <TouchableOpacity style={styles.botao} onPress={handleAddToDo}>
            <Ionicons name="add-circle-outline" size={20} color="white" style={{
            }} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerContador}>
            <Text style={styles.contadorTask}>
              Criadas 
            </Text>
            <Text style={styles.countNumber}>
            {countTask}
            </Text>
            <Text style={styles.concluidaTask}>
              Concluídas 
            </Text>
            <Text style={styles.countNumber}>
            {countCompleted}
            </Text>
          </View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderTask(item.item)}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
              <View style={styles.containerMsg}>
                <Text style={styles.linha}>
                  ______________________________________________________
                </Text>
                <Foundation name="clipboard-notes" size={100} color="gray" />
                <Text style={styles.text01}>
                  Você ainda não tem tarefas cadastradas

                </Text>
                <Text style={styles.text02}>
                  Crie tarefas e organize seus itens a fazer
                </Text>
              </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerHeader: {
    backgroundColor: '#000000',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  containerInferior: {
    backgroundColor: '#423c3c',
    height: '80%',
    width: '100%',

  },
  nav: {
    flexDirection: 'row',
    height: '10%',
    marginTop: -25,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#5c5a5a',
    borderRadius: 5,
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#00000092',
    marginBottom: 5,
  },
  botao: {
    backgroundColor: '#3a7ca5',
    height: 50,
    width: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00000092',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5c5a5a',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: 400,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#00000092',
  },
  checkbox: {
    borderColor: '#000000',
    borderRadius: '50%',
  },
  taskText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
  trash: {
    marginLeft: 'auto',

  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    marginLeft: 10,
  },
  taskList: {
    color: '#ffffff',
    fontSize: 16,
  },
  containerContador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 10,
  },
  linha: {
    marginBottom: 40,
    color: '#5a5858',
  },
  containerMsg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text01: {
    color: '#868383',
    fontWeight: 'bold',
  },
  text02: {
    color: '#7c7a7a',
  },
  contadorTask: {
    color: '#3a7ca5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  concluidaTask: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5e60ce',
  },
  countNumber:{
    color:'#ffffff',
    backgroundColor:'#505052',
    width: 25,
    height: 25,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    marginLeft: -150,
    borderRadius: 8,
  }
});
