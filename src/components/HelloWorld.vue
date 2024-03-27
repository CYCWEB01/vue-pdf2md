<template>
  <div class="hello">
    <button @click="addPdf">PDF-TO-MD</button>
  </div>
</template>

<script>

import pdf2md from '@opendocsg/pdf2md';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      inputElement: null
    };
  },
  mounted() {
    
  },

  methods: {
    pdfToMd(files){
      const pdfPath = files;
      pdf2md(pdfPath, (err, markdown) => {
        if (err) {
          console.error('Error converting PDF to Markdown:', err);
          return;
        }
        // 处理转换后的 Markdown
        console.log('Converted Markdown:', markdown);
      }).then(text => {
          console.log('Done.',text)
      });
    },
    addPdf(){
        if (this.inputElement === null) {
            // 生成文件上传的控件
            this.inputElement = document.createElement('input')
            this.inputElement.setAttribute('type', 'file')
            this.inputElement.accept="application/pdf"
            this.inputElement.style.display = 'none'

            if (window.addEventListener) {
            this.inputElement.addEventListener('change', this.uploadFile, false)
            } else {
            this.inputElement.attachEvent('onchange', this.uploadFile)
            }

            document.body.appendChild(this.inputElement)
        }
        this.inputElement.click();
    },
    uploadFile(el) {
        if (el && el.target && el.target.files && el.target.files.length > 0) {
            // const files = el.target.files[0]
            const that = this;
            const reader = new FileReader(); // 创建读取文件对象
            reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
            reader.onload = function(event) { // 文件读取完成后
                // 读取完成后，将结果赋值给img的src
                const data = new Uint8Array(event.target.result);
                that.pdfToMd(data)
                // that.pdfToMd(files)
                console.log('data',data);
                
                this.inputElement = null
            };
        }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
