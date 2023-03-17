
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "./Config";
import { collection, addDoc , getDoc} from "firebase/firestore";

async function Add_Data(collection_data , uid , email, id ,data) {
    try {
      //  const docRef = await addDoc(collection(db, collection_data , uid , email), data);
      //  console.log("Document written with ID: ", docRef.id);
      await setDoc(doc(db, collection_data ,uid, email , id), data);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

async function Add_AllPost(id , data) {
  await setDoc(doc(db, "All_Post" , id), data);
}

async function allfeeds() {
  await setDoc(doc(db, "cities", "123"), {name:"insha"});
}

async function getallfeeds() {
  const docRef = doc(db, "cities", "123");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}

export { Add_Data , allfeeds , getallfeeds , Add_AllPost}