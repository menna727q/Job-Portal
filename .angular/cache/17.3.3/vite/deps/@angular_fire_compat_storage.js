import {
  TransferState,
  makeStateKey
} from "./chunk-YJA7LPAB.js";
import "./chunk-B3WXQAZI.js";
import "./chunk-GCAKL4PI.js";
import {
  AsyncPipe
} from "./chunk-MNYXMSAJ.js";
import {
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
  ɵcacheInstance,
  ɵfirebaseAppFactory
} from "./chunk-6Q2SDH2Z.js";
import {
  firebase
} from "./chunk-23SX7UER.js";
import {
  FbsBlob,
  Location,
  StringFormat,
  TaskEvent,
  TaskState,
  UploadTask,
  _getChild,
  connectStorageEmulator,
  dataFromString,
  deleteObject,
  getDownloadURL,
  getMetadata,
  invalidArgument,
  invalidRootOperation,
  list,
  listAll,
  ref,
  updateMetadata,
  uploadBytesResumable
} from "./chunk-EUTKX6M4.js";
import "./chunk-JWY2NHWW.js";
import {
  VERSION,
  keepUnstableUntilFirst,
  observeOutsideAngular,
  ɵAngularFireSchedulers,
  ɵAppCheckInstances
} from "./chunk-JWVWLEQV.js";
import "./chunk-NP2OOQWR.js";
import {
  Component
} from "./chunk-5OW5MGC7.js";
import {
  ChangeDetectorRef,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  Pipe,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵinject
} from "./chunk-3PQUARVJ.js";
import {
  Observable,
  debounceTime,
  from,
  map,
  of,
  switchMap,
  tap
} from "./chunk-LQ7JEHJ2.js";
import "./chunk-LHRTKJE6.js";
import "./chunk-47AXDMZD.js";

// node_modules/@firebase/storage-compat/dist/esm/index.esm2017.js
var UploadTaskSnapshotCompat = class {
  constructor(_delegate, task, ref2) {
    this._delegate = _delegate;
    this.task = task;
    this.ref = ref2;
  }
  get bytesTransferred() {
    return this._delegate.bytesTransferred;
  }
  get metadata() {
    return this._delegate.metadata;
  }
  get state() {
    return this._delegate.state;
  }
  get totalBytes() {
    return this._delegate.totalBytes;
  }
};
var UploadTaskCompat = class {
  constructor(_delegate, _ref) {
    this._delegate = _delegate;
    this._ref = _ref;
    this.cancel = this._delegate.cancel.bind(this._delegate);
    this.catch = this._delegate.catch.bind(this._delegate);
    this.pause = this._delegate.pause.bind(this._delegate);
    this.resume = this._delegate.resume.bind(this._delegate);
  }
  get snapshot() {
    return new UploadTaskSnapshotCompat(this._delegate.snapshot, this, this._ref);
  }
  then(onFulfilled, onRejected) {
    return this._delegate.then((snapshot) => {
      if (onFulfilled) {
        return onFulfilled(new UploadTaskSnapshotCompat(snapshot, this, this._ref));
      }
    }, onRejected);
  }
  on(type, nextOrObserver, error, completed) {
    let wrappedNextOrObserver = void 0;
    if (!!nextOrObserver) {
      if (typeof nextOrObserver === "function") {
        wrappedNextOrObserver = (taskSnapshot) => nextOrObserver(new UploadTaskSnapshotCompat(taskSnapshot, this, this._ref));
      } else {
        wrappedNextOrObserver = {
          next: !!nextOrObserver.next ? (taskSnapshot) => nextOrObserver.next(new UploadTaskSnapshotCompat(taskSnapshot, this, this._ref)) : void 0,
          complete: nextOrObserver.complete || void 0,
          error: nextOrObserver.error || void 0
        };
      }
    }
    return this._delegate.on(type, wrappedNextOrObserver, error || void 0, completed || void 0);
  }
};
var ListResultCompat = class {
  constructor(_delegate, _service) {
    this._delegate = _delegate;
    this._service = _service;
  }
  get prefixes() {
    return this._delegate.prefixes.map((ref2) => new ReferenceCompat(ref2, this._service));
  }
  get items() {
    return this._delegate.items.map((ref2) => new ReferenceCompat(ref2, this._service));
  }
  get nextPageToken() {
    return this._delegate.nextPageToken || null;
  }
};
var ReferenceCompat = class _ReferenceCompat {
  constructor(_delegate, storage) {
    this._delegate = _delegate;
    this.storage = storage;
  }
  get name() {
    return this._delegate.name;
  }
  get bucket() {
    return this._delegate.bucket;
  }
  get fullPath() {
    return this._delegate.fullPath;
  }
  toString() {
    return this._delegate.toString();
  }
  /**
   * @returns A reference to the object obtained by
   * appending childPath, removing any duplicate, beginning, or trailing
   * slashes.
   */
  child(childPath) {
    const reference = _getChild(this._delegate, childPath);
    return new _ReferenceCompat(reference, this.storage);
  }
  get root() {
    return new _ReferenceCompat(this._delegate.root, this.storage);
  }
  /**
   * @returns A reference to the parent of the
   * current object, or null if the current object is the root.
   */
  get parent() {
    const reference = this._delegate.parent;
    if (reference == null) {
      return null;
    }
    return new _ReferenceCompat(reference, this.storage);
  }
  /**
   * Uploads a blob to this object's location.
   * @param data - The blob to upload.
   * @returns An UploadTask that lets you control and
   * observe the upload.
   */
  put(data, metadata) {
    this._throwIfRoot("put");
    return new UploadTaskCompat(uploadBytesResumable(this._delegate, data, metadata), this);
  }
  /**
   * Uploads a string to this object's location.
   * @param value - The string to upload.
   * @param format - The format of the string to upload.
   * @returns An UploadTask that lets you control and
   * observe the upload.
   */
  putString(value, format = StringFormat.RAW, metadata) {
    this._throwIfRoot("putString");
    const data = dataFromString(format, value);
    const metadataClone = Object.assign({}, metadata);
    if (metadataClone["contentType"] == null && data.contentType != null) {
      metadataClone["contentType"] = data.contentType;
    }
    return new UploadTaskCompat(new UploadTask(this._delegate, new FbsBlob(data.data, true), metadataClone), this);
  }
  /**
   * List all items (files) and prefixes (folders) under this storage reference.
   *
   * This is a helper method for calling list() repeatedly until there are
   * no more results. The default pagination size is 1000.
   *
   * Note: The results may not be consistent if objects are changed while this
   * operation is running.
   *
   * Warning: listAll may potentially consume too many resources if there are
   * too many results.
   *
   * @returns A Promise that resolves with all the items and prefixes under
   *  the current storage reference. `prefixes` contains references to
   *  sub-directories and `items` contains references to objects in this
   *  folder. `nextPageToken` is never returned.
   */
  listAll() {
    return listAll(this._delegate).then((r) => new ListResultCompat(r, this.storage));
  }
  /**
   * List items (files) and prefixes (folders) under this storage reference.
   *
   * List API is only available for Firebase Rules Version 2.
   *
   * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
   * delimited folder structure. Refer to GCS's List API if you want to learn more.
   *
   * To adhere to Firebase Rules's Semantics, Firebase Storage does not
   * support objects whose paths end with "/" or contain two consecutive
   * "/"s. Firebase Storage List API will filter these unsupported objects.
   * list() may fail if there are too many unsupported objects in the bucket.
   *
   * @param options - See ListOptions for details.
   * @returns A Promise that resolves with the items and prefixes.
   * `prefixes` contains references to sub-folders and `items`
   * contains references to objects in this folder. `nextPageToken`
   * can be used to get the rest of the results.
   */
  list(options) {
    return list(this._delegate, options || void 0).then((r) => new ListResultCompat(r, this.storage));
  }
  /**
   * A `Promise` that resolves with the metadata for this object. If this
   * object doesn't exist or metadata cannot be retreived, the promise is
   * rejected.
   */
  getMetadata() {
    return getMetadata(this._delegate);
  }
  /**
   * Updates the metadata for this object.
   * @param metadata - The new metadata for the object.
   * Only values that have been explicitly set will be changed. Explicitly
   * setting a value to null will remove the metadata.
   * @returns A `Promise` that resolves
   * with the new metadata for this object.
   * @see firebaseStorage.Reference.prototype.getMetadata
   */
  updateMetadata(metadata) {
    return updateMetadata(this._delegate, metadata);
  }
  /**
   * @returns A `Promise` that resolves with the download
   * URL for this object.
   */
  getDownloadURL() {
    return getDownloadURL(this._delegate);
  }
  /**
   * Deletes the object at this location.
   * @returns A `Promise` that resolves if the deletion succeeds.
   */
  delete() {
    this._throwIfRoot("delete");
    return deleteObject(this._delegate);
  }
  _throwIfRoot(name2) {
    if (this._delegate._location.path === "") {
      throw invalidRootOperation(name2);
    }
  }
};
var StorageServiceCompat = class {
  constructor(app, _delegate) {
    this.app = app;
    this._delegate = _delegate;
  }
  get maxOperationRetryTime() {
    return this._delegate.maxOperationRetryTime;
  }
  get maxUploadRetryTime() {
    return this._delegate.maxUploadRetryTime;
  }
  /**
   * Returns a firebaseStorage.Reference for the given path in the default
   * bucket.
   */
  ref(path) {
    if (isUrl(path)) {
      throw invalidArgument("ref() expected a child path but got a URL, use refFromURL instead.");
    }
    return new ReferenceCompat(ref(this._delegate, path), this);
  }
  /**
   * Returns a firebaseStorage.Reference object for the given absolute URL,
   * which must be a gs:// or http[s]:// URL.
   */
  refFromURL(url) {
    if (!isUrl(url)) {
      throw invalidArgument("refFromURL() expected a full URL but got a child path, use ref() instead.");
    }
    try {
      Location.makeFromUrl(url, this._delegate.host);
    } catch (e) {
      throw invalidArgument("refFromUrl() expected a valid full URL but got an invalid one.");
    }
    return new ReferenceCompat(ref(this._delegate, url), this);
  }
  setMaxUploadRetryTime(time) {
    this._delegate.maxUploadRetryTime = time;
  }
  setMaxOperationRetryTime(time) {
    this._delegate.maxOperationRetryTime = time;
  }
  useEmulator(host, port, options = {}) {
    connectStorageEmulator(this._delegate, host, port, options);
  }
};
function isUrl(path) {
  return /^[A-Za-z]+:\/\//.test(path);
}
var name = "@firebase/storage-compat";
var version = "0.3.7";
var STORAGE_TYPE = "storage-compat";
function factory(container, { instanceIdentifier: url }) {
  const app = container.getProvider("app-compat").getImmediate();
  const storageExp = container.getProvider("storage").getImmediate({ identifier: url });
  const storageServiceCompat = new StorageServiceCompat(app, storageExp);
  return storageServiceCompat;
}
function registerStorage(instance) {
  const namespaceExports = {
    // no-inline
    TaskState,
    TaskEvent,
    StringFormat,
    Storage: StorageServiceCompat,
    Reference: ReferenceCompat
  };
  instance.INTERNAL.registerComponent(new Component(
    STORAGE_TYPE,
    factory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setServiceProps(namespaceExports).setMultipleInstances(true));
  instance.registerVersion(name, version);
}
registerStorage(firebase);

// node_modules/@angular/fire/fesm2022/angular-fire-compat-storage.mjs
function fromTask(task) {
  return new Observable((subscriber) => {
    const progress = (snap) => subscriber.next(snap);
    const error = (e) => subscriber.error(e);
    const complete = () => subscriber.complete();
    progress(task.snapshot);
    const unsub = task.on("state_changed", progress);
    task.then((snapshot) => {
      progress(snapshot);
      complete();
    }, (e) => {
      progress(task.snapshot);
      error(e);
    });
    return function unsubscribe() {
      unsub();
    };
  }).pipe(
    // deal with sync emissions from first emitting `task.snapshot`, this makes sure
    // that if the task is already finished we don't emit the old running state
    debounceTime(0)
  );
}
function createUploadTask(task) {
  const inner$ = fromTask(task);
  return {
    task,
    then: task.then.bind(task),
    catch: task.catch.bind(task),
    pause: task.pause.bind(task),
    cancel: task.cancel.bind(task),
    resume: task.resume.bind(task),
    snapshotChanges: () => inner$,
    percentageChanges: () => inner$.pipe(map((s) => s.bytesTransferred / s.totalBytes * 100))
  };
}
function createStorageRef(ref2) {
  return {
    getDownloadURL: () => of(void 0).pipe(observeOutsideAngular, switchMap(() => ref2.getDownloadURL()), keepUnstableUntilFirst),
    getMetadata: () => of(void 0).pipe(observeOutsideAngular, switchMap(() => ref2.getMetadata()), keepUnstableUntilFirst),
    delete: () => from(ref2.delete()),
    child: (path) => createStorageRef(ref2.child(path)),
    updateMetadata: (meta) => from(ref2.updateMetadata(meta)),
    put: (data, metadata) => {
      const task = ref2.put(data, metadata);
      return createUploadTask(task);
    },
    putString: (data, format, metadata) => {
      const task = ref2.putString(data, format, metadata);
      return createUploadTask(task);
    },
    list: (options) => from(ref2.list(options)),
    listAll: () => from(ref2.listAll())
  };
}
var BUCKET = new InjectionToken("angularfire2.storageBucket");
var MAX_UPLOAD_RETRY_TIME = new InjectionToken("angularfire2.storage.maxUploadRetryTime");
var MAX_OPERATION_RETRY_TIME = new InjectionToken("angularfire2.storage.maxOperationRetryTime");
var USE_EMULATOR = new InjectionToken("angularfire2.storage.use-emulator");
var AngularFireStorage = class _AngularFireStorage {
  storage;
  constructor(options, name2, storageBucket, platformId, zone, schedulers, maxUploadRetryTime, maxOperationRetryTime, _useEmulator, _appCheckInstances) {
    const app = ɵfirebaseAppFactory(options, zone, name2);
    this.storage = ɵcacheInstance(`${app.name}.storage.${storageBucket}`, "AngularFireStorage", app.name, () => {
      const storage = zone.runOutsideAngular(() => app.storage(storageBucket || void 0));
      const useEmulator = _useEmulator;
      if (useEmulator) {
        storage.useEmulator(...useEmulator);
      }
      if (maxUploadRetryTime) {
        storage.setMaxUploadRetryTime(maxUploadRetryTime);
      }
      if (maxOperationRetryTime) {
        storage.setMaxOperationRetryTime(maxOperationRetryTime);
      }
      return storage;
    }, [maxUploadRetryTime, maxOperationRetryTime]);
  }
  ref(path) {
    return createStorageRef(this.storage.ref(path));
  }
  refFromURL(path) {
    return createStorageRef(this.storage.refFromURL(path));
  }
  upload(path, data, metadata) {
    const storageRef = this.storage.ref(path);
    const ref2 = createStorageRef(storageRef);
    return ref2.put(data, metadata);
  }
  static ɵfac = function AngularFireStorage_Factory(t) {
    return new (t || _AngularFireStorage)(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(BUCKET, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(ɵAngularFireSchedulers), ɵɵinject(MAX_UPLOAD_RETRY_TIME, 8), ɵɵinject(MAX_OPERATION_RETRY_TIME, 8), ɵɵinject(USE_EMULATOR, 8), ɵɵinject(ɵAppCheckInstances, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AngularFireStorage,
    factory: _AngularFireStorage.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireStorage, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [FIREBASE_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [FIREBASE_APP_NAME]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [BUCKET]
    }]
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }, {
    type: ɵAngularFireSchedulers
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAX_UPLOAD_RETRY_TIME]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAX_OPERATION_RETRY_TIME]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_EMULATOR]
    }]
  }, {
    type: ɵAppCheckInstances,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var GetDownloadURLPipe = class _GetDownloadURLPipe {
  storage;
  state;
  asyncPipe;
  path;
  downloadUrl$;
  constructor(storage, cdr, state) {
    this.storage = storage;
    this.state = state;
    this.asyncPipe = new AsyncPipe(cdr);
  }
  transform(path) {
    if (path !== this.path) {
      this.path = path;
      const key = makeStateKey(`|getDownloadURL|${path}`);
      const existing = this.state?.get(key, void 0);
      this.downloadUrl$ = existing ? of(existing) : this.storage.ref(path).getDownloadURL().pipe(tap((it) => this.state?.set(key, it)));
    }
    return this.asyncPipe.transform(this.downloadUrl$);
  }
  ngOnDestroy() {
    this.asyncPipe.ngOnDestroy();
  }
  static ɵfac = function GetDownloadURLPipe_Factory(t) {
    return new (t || _GetDownloadURLPipe)(ɵɵdirectiveInject(AngularFireStorage, 16), ɵɵdirectiveInject(ChangeDetectorRef, 16), ɵɵdirectiveInject(TransferState, 24));
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "getDownloadURL",
    type: _GetDownloadURLPipe,
    pure: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GetDownloadURLPipe, [{
    type: Pipe,
    args: [{
      name: "getDownloadURL",
      pure: false
    }]
  }], () => [{
    type: AngularFireStorage
  }, {
    type: ChangeDetectorRef
  }, {
    type: TransferState,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var GetDownloadURLPipeModule = class _GetDownloadURLPipeModule {
  static ɵfac = function GetDownloadURLPipeModule_Factory(t) {
    return new (t || _GetDownloadURLPipeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _GetDownloadURLPipeModule,
    declarations: [GetDownloadURLPipe],
    exports: [GetDownloadURLPipe]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GetDownloadURLPipeModule, [{
    type: NgModule,
    args: [{
      declarations: [GetDownloadURLPipe],
      exports: [GetDownloadURLPipe]
    }]
  }], null, null);
})();
var AngularFireStorageModule = class _AngularFireStorageModule {
  constructor() {
    firebase.registerVersion("angularfire", VERSION.full, "gcs-compat");
  }
  static ɵfac = function AngularFireStorageModule_Factory(t) {
    return new (t || _AngularFireStorageModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AngularFireStorageModule,
    exports: [GetDownloadURLPipeModule]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AngularFireStorage],
    imports: [GetDownloadURLPipeModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireStorageModule, [{
    type: NgModule,
    args: [{
      exports: [GetDownloadURLPipeModule],
      providers: [AngularFireStorage]
    }]
  }], () => [], null);
})();
export {
  AngularFireStorage,
  AngularFireStorageModule,
  BUCKET,
  GetDownloadURLPipe,
  GetDownloadURLPipeModule,
  MAX_OPERATION_RETRY_TIME,
  MAX_UPLOAD_RETRY_TIME,
  USE_EMULATOR,
  createStorageRef,
  createUploadTask,
  fromTask
};
/*! Bundled license information:

@firebase/storage-compat/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@angular_fire_compat_storage.js.map
