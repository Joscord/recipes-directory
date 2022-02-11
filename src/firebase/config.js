// importamos firebase (el core de firebase)
import firebase from 'firebase/app';
// Importamos los servicios que necesitemos de firebase. En este caso firestore
import 'firebase/firestore';

// Copiamos el objeto de configuración
const firebaseConfig = {
	apiKey: 'AIzaSyB_ZvXmcgylrPyr9omxmIuLs8Que-BADQE',
	authDomain: 'react-recipe-directory.firebaseapp.com',
	projectId: 'react-recipe-directory',
	storageBucket: 'react-recipe-directory.appspot.com',
	messagingSenderId: '603048275681',
	appId: '1:603048275681:web:ab1da368d62b2522bdd1a0',
};

// Para poder conectar la app necesitamos inicializar firebase usando el método initializeApp, pasando el objto de configuración. Este método es el que hace la conexión al backend de firebase. Una vez hecha la conexión podemos usar cualquiera de los servicios que hayamos importado
firebase.initializeApp(firebaseConfig);

// Inicializamos los servicios deseados, en este caso firestore. Nótese que el método firestore() (que podemos usar porque importamos el servicio) nos devuelve un objeto con diferentes métodos para interactuar con el servicio. Por eso lo almacenamos en una constante
const projectFirestore = firebase.firestore();

// Exportamos todo lo que necesitemos, en este caso  el objeto de firestore

export { projectFirestore };
