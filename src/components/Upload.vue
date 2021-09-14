<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="
          w-full
          px-10
          py-20
          rounded
          text-center
          cursor-pointer
          border border-dashed border-gray-400
          text-gray-400
          transition
          duration-500
          hover:text-white
          hover:bg-green-400
          hover:border-green-400 hover:border-solid
        "
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_color">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.varient"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import {
  storage,
  ref,
  uploadBytesResumable,
  auth,
  collection,
  addDoc,
  db,
  getDownloadURL,
  getDoc,
  doc,
} from '../includes/firebase';

export default {
  name: 'Upload',
  props: ['addSong'],
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    upload($event) {
      this.is_dragover = false;

      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return;
        }

        if (!navigator.onLine) {
          this.uploads.push({
            uploadTask: {},
            current_progress: 100,
            name: file.name,
            varient: 'bg-red-400',
            icon: 'fas fa-times',
            text_color: 'text-red-400',
          });
          return;
        }

        const storageRef = ref(storage, `songs/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const uploadIndex = this.uploads.push({
          uploadTask,
          current_progress: 0,
          name: file.name,
          varient: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          text_color: '',
        }) - 1;

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].varient = 'bg-red-400';
            this.uploads[uploadIndex].icon = 'fas fa-times';
            this.uploads[uploadIndex].text_color = 'text-red-400';
            console.log(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: uploadTask.snapshot.ref.name,
              modified_name: uploadTask.snapshot.ref.name,
              genre: '',
              comment_count: 0,
            };
            song.url = await getDownloadURL(ref(storage, `songs/${file.name}`));

            const songRef = await addDoc(collection(db, 'songs'), song);
            const docRef = doc(db, 'songs', songRef.id);
            const songSnapshot = await getDoc(docRef);
            this.addSong(songSnapshot);

            this.uploads[uploadIndex].varient = 'bg-green-400';
            this.uploads[uploadIndex].icon = 'fas fa-check';
            this.uploads[uploadIndex].text_color = 'text-green-400';
          },
        );
      });
    },
    // for parents ref
    // cancelUpload() {
    //   this.uploads.forEach((upload) => {
    //     upload.uploadTask.cancel();
    //   });
    // },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.uploadTask.cancel();
    });
  },
};
</script>
