<template>
<div>
   
    
    <!-- --------------------Modal------------------------ -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="onSubmitUpdate" @reset.prevent="onResetUpdate">
            <div class="form-group">
                <input type="text" v-model="editForm_.title" v-bind:class="{'form-control':true,'is-invalid':editForm_.titleError }" id="edit_title" placeholder="标题" required>
                <div class="invalid-feedback">{{editForm_.titleError}}</div>
            </div>
            <div class="form-group">
                <input type="text" v-model="editForm_.summary" class="form-control" id="edit_summary" placeholder="摘要">
            </div>
            <div class="form-group">
                <textarea v-model="editForm_.body" id="edit_body" rows="5" class="form-control"></textarea>
                <div class="invalid-feedback">{{editForm_.bodyError}}</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="edit_modal_cancel">Cancel</button>
                <button type="submit" class="btn btn-primary" id="edit_modal_update">Update</button>
            </div>

            </form>
        </div>

        </div>
    </div>
    </div><!-- End Modal -->


    <button @click="onClick">{{show}}</button>

    

    
</div>
</template>
<script>

export default {
    name:'edit-post-modal',
    model:{
        prop:'show',
        event:'clicka'
    },
    props:{
        formType:String,
        editForm:Object,
        show:Boolean
    },
    //---------------------------
    data(){
        return {
            editForm_:{
                title:'',
                summary:'',
                body:'',
                errors:0,
                titleError:null,
                bodyError:null
            }
        }
    },
    //------------------------------
    watch:{
        show:function(val,oldVal){
            if(val){
                $("#exampleModal").modal('show')
            }
        }
    },
    methods:{
        onClick(){
            this.$emit('clicka',!this.show)
        }
    },
    mounted:function(){
        let that=this;
        $('#exampleModal').on('hide.bs.modal', function (e) {
            that.$emit('clicka',false)
        // do something...
        })
    }

}
</script>