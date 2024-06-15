import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize, map, Observable } from "rxjs";
import { Timestamp } from "firebase/firestore";


@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}
  /**
   * Fetch all docs from collection
   *
   * @param list string
   *
   * @returns Observeable
   */
  getAllData(list: string) {
    return new Promise((resolve, reject) => {
      const holder: any = [];
      this.firestore
        .collection(list, (ref) => ref.orderBy("created_at", "desc"))
        .get()
        .subscribe((data) => {
          data.forEach((item) => {
            const data: any = item.data();
            data["docId"] = item.id;
            holder.push(data);
          });
          resolve(holder);
        });
    });
  }

  getLimitData(list: string, limit: number, pageNumber: number) {
    return new Promise((resolve, reject) => {
      const holder: any = [];
      const startIndex = (pageNumber - 1) * limit;

      this.firestore
        .collection(list, (ref) =>
          ref.orderBy("name").limit(limit).startAfter(startIndex)
        )
        .get()
        .subscribe((data) => {
          data.forEach((item) => {
            const documentData: any = item.data();
            documentData["docId"] = item.id;
            holder.push(documentData);
          });
          resolve(holder);
        });
    });
  }

  /**
   * Fetch all docs from collection with where query
   *
   * @param collectionName string
   * @param whereKey string
   * @param whereCondition string
   * @param whereValue string
   *
   * @returns Array
   */
  getDataWithWhere = (
    collectionName: string,
    whereKey: string,
    whereCondition: string,
    whereValue: string
  ) => {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection(collectionName, (ref: any) =>
          ref.where(whereKey, whereCondition, whereValue)
        )
        .get()
        .toPromise()
        .then((querySnapshot: any) => {
          const dataWithIds = querySnapshot.docs.map((doc: any) => ({
            docId: doc.id,
            ...doc.data(),
          }));
          resolve(dataWithIds);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  /**
   * Update doc within collection w.r.t doc Id
   *
   * @param id string
   * @param list string
   * @param data any
   *
   * @returns Observeable
   */
  updateDataById(id: any, list: string, data: any) {
    return this.firestore.collection(list).doc(id).update(data);
  }

  /**
   * Get doc from collection w.r.t doc Id
   *
   * @param id string
   * @param list string
   *
   * @returns Observeable
   */
  getById(id: string, list: string) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection(list)
        .doc(id)
        .get()
        .subscribe((item) => {
          if (!item.exists) {
            reject("No doc found.");
          } else {
            resolve(item.data());
          }
        });
    });
  }

  /**
   * Upload file to cloud storage
   *
   * @param fileInstance object
   * @param path string
   *
   * @returns Observeable
   */
  uploadFile(fileInstance: any, path: string) {
    return new Promise((resolve, reject) => {
      const filePath = `${path}/${fileInstance.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileInstance);
      // delete existing file if available w.r.t url
      if (fileInstance.removeFile && fileInstance.removeUrl !== "") {
        this.storage.refFromURL(fileInstance.removeUrl).delete();
      }

      // detect upload progress
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() =>
            storageRef.getDownloadURL().subscribe((res) => {
              resolve({ path: filePath, response: res });
            })
          )
        )
        .subscribe();
    });
  }

  downloadFile = () => {
    const fileRef = this.storage.ref("path/to/file");
    fileRef.getDownloadURL().subscribe(
      (url) => {
        // Use the URL to download the file
        // For example, you can create a link to the file and programmatically click it
        const link = document.createElement("a");
        link.href = url;
        link.download = "filename.ext";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  /**
   * Delete a doc from collecton w.r.t doc Id
   *
   * @param list string
   * @param doc string
   *
   * @returns Observeable
   */
  delete(list: string, doc: string) {
    return this.firestore.collection(list).doc(doc).delete();
  }

  /**
   * Add new doc into a collection
   *
   * @param data any
   * @param collection string
   *
   * @returns Observeable
   */
  addDatatoDb(data: any, collection: any) {
    const isNotificationOrReminder = collection === 'notifications' || collection === 'reminders';
    
    return new Promise((resolve, reject) => {
      const newData = { ...data };
      if (!isNotificationOrReminder) {
        newData.created_at = new Date();
      }
      this.firestore
        .collection(collection)
        .doc()
        .set(newData)
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
}

  /**
   * query in collection
   *
   * @param field string
   * @param value string
   * @param collection string
   * @returns returns only single value
   */
  getData(dbfield: any, value: any, collection: any) {
    return new Promise<any>((resolve) => {
      const holder: any = [];
      this.firestore
        .collection(collection, (ref) => ref.where(dbfield, "==", value))
        .valueChanges({ idField: "docId" })
        .subscribe((data: any) => {
          resolve(data[0]);
        });
    });
  }

  /**
   * query in collection
   *
   * @param field string
   * @param value string
   * @param collection string
   * @returns returns only single value
   */
  getMultipleData(dbfield: any, value: any, collection: any) {
    return new Promise<any>((resolve) => {
      const holder: any = [];
      this.firestore
        .collection(collection, (ref) => ref.where(dbfield, "==", value))
        .valueChanges({ idField: "docId" })
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }

  async checkWhetherPhoneNumberExists(phoneNumber: string): Promise<boolean> {
    const leadsCollectionRef = this.firestore.collection("Leads", (ref) =>
      ref.where("phone_number", "==", phoneNumber)
    );
    const leadsSnapshot = await leadsCollectionRef.get().toPromise();

    if (leadsSnapshot === undefined) {
      // Handle the case where leadsSnapshot is undefined
      console.error("Error: leadsSnapshot is undefined.");
      return false;
    }

    return !leadsSnapshot.empty;
  }

  async checkWhetherFullAddressAlreadyExists(fullAddress: string): Promise<boolean> {
    const leadsCollectionRef = this.firestore.collection("Leads", (ref) =>
      ref.where("full_address", "==", fullAddress.toLowerCase())
    );
    const leadsSnapshot = await leadsCollectionRef.get().toPromise();

    if (leadsSnapshot === undefined) {
      // Handle the case where leadsSnapshot is undefined
      console.error("Error: leadsSnapshot is undefined.");
      return false;
    }

    return !leadsSnapshot.empty;
  }
  //
  searchLeadsByPhoneNumber(phoneNumber: string): Observable<any[]> {
    return this.firestore
      .collection("Leads", (ref) =>
        ref.where("phone_number", "==", phoneNumber)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const id = action.payload.doc.id;
            const data = action.payload.doc.data() as any; // Cast to any to avoid TypeScript error
            return { id, ...data }; // Use spread operator on data object
          });
        })
      );
  }

  /**
   * Add new Notification into a collection
   *
   * @param data any
   * @param collection string
   *
   * @returns docId string
   */
  addDataReturnID(data: any, collection: string): Promise<string> {
      return new Promise((resolve, reject) => {
          const docId = this.firestore.createId(); // Generate a unique ID for the document
          const docRef = this.firestore.collection(collection).doc(docId); // Create a document reference with the specified ID
          docRef.set({ ...data, created_at: new Date() })
              .then(() => resolve(docId)) // Resolve with the custom ID of the document
              .catch((error) => reject(error));
      });
  }

  /**
   * Returns an observable that will be subscribed and get updates
   *
   * @param collection string
   *
   * @returns observable
   */
  getObservableData(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

  getTodaysUnreadReminders(date: Date, currentUserID: any): Observable<any[]> {
    // Set the start and end date for the query
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    // Convert dates to Firestore timestamps
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

    return this.firestore.collection('reminders',
      ref => ref.where('user_id', '==', currentUserID)
        .where('is_marked_read', '==', false)
        .where('call_back_date', '>=', startTimestamp)
        .where('call_back_date', '<=', endTimestamp)
    ).valueChanges({idField: 'id'})
  }
  
}
