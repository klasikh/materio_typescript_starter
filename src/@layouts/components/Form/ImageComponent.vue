<template>
  <!-- <div :class="customBigClass" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage"> -->
      <div :class="customBigClass" :style="{ 'background-image': `url(${imageData})` }" >
        <label class="placeholder" for="imageId" >
                {{ fileText }}
        </label>
        <input :class="customFileClass" ref="fileInput" type="file" @input="onSelectFile" id="imageId">
      </div>

</template>

<script>
export default {
  props: {
      customClass: {
          type: String,
          default: 'form-group',
      },
      customBigClass: {
          type: String,
          default: 'base-image-input mb-4',
      },
      customFileClass: {
          type: String,
          default: 'file-input',
      },
      fileText: {
          type: String,
          default: 'Attacher un fichier',
      },
      // imageUrl: {
      //   type: String
      // }
  },
  data() {
    return {
      imageData: "",
      imageUrl: "",
      imageModelValue: "",
    }
  },
  methods: {
    // chooseImage () {
    //   this.$refs.fileInput.click()
    // },
    onSelectFile () {
      let input = this.$refs.fileInput
      let files = input.files
      if (files && files[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.imageData = e.target.result
          // this.imgSource = e.target.result
        }
        reader.readAsDataURL(files[0])
        // this.$emit('input', files[0])
        console.log(typeof(files[0]))
        this.imageUrl = files[0];
      }
    },
  }
}
</script>

<style scoped>
.base-image-input {
  display: block;
  width: 100%;
  height: 280px;
  background-size: cover;
  background-position: center center;
  background-color: #ececec;
  border-radius: 10px;
}
.placeholder {
  background-color: #c5c4c4;
  border-radius: 12px;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
  cursor: pointer;
  float: right;
  top: 85%;
  left: -1%;
}
.placeholder:hover {
  background: #E0E0E0;
}
.file-input {
  display: none;
}
</style>
