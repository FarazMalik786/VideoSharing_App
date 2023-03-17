import { storage } from "./Config";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Add_AllPost, Add_Data } from "./Firestore";
import { useDispatch } from "react-redux";
import { fetchUserPost } from "../Redux/UserPost";
import { async } from "@firebase/util";
export const upload = async (video_uri, uid, email, data_obj) => {
  
  const response = await fetch(video_uri)
  const blob = await response.blob();
  let a = video_uri.split("/")
  let post_name = a[a.length - 1].toString();
  console.log(post_name)
  const storageRef = ref(storage, uid + "/" + post_name);
 await uploadBytes(storageRef, blob).then(async (snapshot) => {
    console.log('Uploaded a blob or file!');
   await getDownloadURL(storageRef).then(async (url) => {
      data_obj.Url = url;
      data_obj.Post_Name = post_name;
      await Add_Data("Post", uid, email, post_name, data_obj);
      await Add_AllPost(post_name, data_obj)
      
    })
  });
}
