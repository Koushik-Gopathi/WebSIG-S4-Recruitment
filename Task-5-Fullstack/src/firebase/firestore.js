import { db } from "./config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const tasksCol = collection(db, "tasks");

export const addTask = async ({ title, uid }) => {
  return addDoc(tasksCol, {
    title: title.trim(),
    status: "todo",
    uid,
    createdAt: serverTimestamp(),
  });
};

export const deleteTask = (taskId) => {
  const ref = doc(db, "tasks", taskId);
  return deleteDoc(ref);
};

export const updateTask = (taskId, data) => {
  const ref = doc(db, "tasks", taskId);
  return updateDoc(ref, data);
};

// realtime listener for current user's tasks
export const listenToTasks = (uid, cb) => {
  const q = query(tasksCol, where("uid", "==", uid));
  return onSnapshot(q, (snap) => {
    const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(tasks);
  });
};
