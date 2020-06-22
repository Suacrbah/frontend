<template>
    <div>
        <mavon-editor
                @imgAdd="handleEditorImgAdd"
                ref=md
        />
    </div>
</template>

<script>
    export default {
        name: "editor",
        methods: {
            handleEditorImgAdd (pos, $file) {

                let formdata = new FormData()
                formdata.append('file', $file)

                var _this = this;
                this.$axios.post('/answer/image/upload', formdata,{
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        console.log("img upload success")
                        console.log(res.data['msg'])

                        _this.$refs.md.$imglst2Url([[pos, res.data['msg']]])
                    } else {
                        console.log("img upload failed")
                        //this.$Message.error(res.data.msg)
                    }
                })

            }
        }
    }

</script>

<style scoped>

</style>