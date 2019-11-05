<template>
<div>
    <div class="card notes__add-note">
      <h3 class="instructor">Add something todo!</h3>
      <span>
      <div class="flexbox-container">
        <input v-model="addNoteData.text_content"
        class="form-control"
        placeholder="e.g. buy milk from the store...">
        <i
          id="addBtn"
          @click="onAdd" 
          class="material-icons medium add">
          add
        </i>
        </div>
        </span>
    </div>
    <br/>
    <br/>
    <div 
    v-for="note in notes"
    v-bind:key="note.note_id"
    class="todoItem">
      <div
      v-if="editId === note.note_id"
      class="collection-item notes__list-item"
      >
      <div>
        <input class="validate"
        v-model="editNoteData.text_content"/>
      </div>
      <div>
          <i
        @click="onEditSubmit()"
        class="material-icons edit">
        check
        </i>
        <i
        @click="onCancel()"
        class="material-icons cancel">
        cancel
        </i>
        </div>
      </div>
      <div 
        v-else
        class="collection-item note__list-item">
        <div id="note_content">
        <div class="note_layout"><h4 @click="onEdit(note)" class="note_title">{{note.text_content}}</h4><div>
        </div>
        </div>
      </div>
    </div>
    <div><span class="badge badge-pill badge-light">Last saved At: {{note.savedAt}}</span></div>
    <div>
        <i
        @click="onDelete(note.note_id)"
        class="material-icons del">
        delete
        </i>
        </div>
    </div>
  </div>
</template>

<script>
import db from '@/db'
import moment from 'moment'
import uuid from 'uuid'

export default {
    name:"TodoItems",
    data(){
      const input = document.getElementById('addBtn');
        const currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        return{
            notes: [],
            addNoteData:{
                note_id: uuid.v4(),
                savedAt:currentDateWithFormat,
                statusCompleted: false,
                text_content:''
            },
            editId: '',
            editNoteData:{
                note_id: '',
                savedAt:'',
                statusCompleted:'',
                text_content: ''
            }
            }
        },
        created() {
          this.getNotes()
        },
        methods: {
    getNotes(){
      db.collection('notes').get().then(
        querySnapshot =>{
        const notes = []
        querySnapshot.forEach(doc => {
        notes.push(doc.data())
      })
      this.notes = notes
      this.addNoteData.text_content = ''
    })
    },
    onAdd(){
      db.collection('notes').add(this.addNoteData).then(this.getNotes())
    },
    onDelete(note_id){
      db.collection('notes').where('note_id' ,'==', note_id).get()
      .then(querySnapshot=>{
        querySnapshot.forEach(doc =>{
          doc.ref.delete().then(this.getNotes())
        })
      })
    },
    onEdit(note){
      this.editId = note.note_id
      this.editNoteData.text_content = note.text_content
    },
    onCancel(){
      this.editId = '',
      this.editNoteData.text_content = ''
    },
    onEditSubmit(){
      db.collection('notes').where('note_id', '==', this.editId).get()
        .then(querySnapshot=>{
          querySnapshot.forEach(doc =>{
            doc.ref.set({
              note_id: this.editId,
              savedAt: this.addNoteData.savedAt,
              statusCompleted: this.addNoteData.statusCompleted,
              text_content: this.editNoteData.text_content
            }).then(this.getNotes())
          })
            this.onCancel()
        })
    }
  }
}
</script>

<style scoped>
.todoItem{
    color:#000;
    margin-left:20%;
    margin-right:20%;
    background-color: #fff;
    border-bottom: .5px purple dashed; 
    border-radius: 2px;
    height:150px;
    margin-bottom:20px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19);
}
.note_layout{
  display: flex;
  align-items: center;
}
/* .mark-as-complete{
    background-color: green;
    text-decoration: line-through;
} */

/* .deleteTodoItem{
    background: #ff0000;
    color: #fff;
    border: none;
    border-radius: 2%;
    float: right;
    margin-top:10px; 
} */

.collection-item{
  align-items: center;
  display: flex;
  font-size: 30px;
  margin-left:10px;
  margin-top:20px;
}
.collection-item.note__list-item.material-icons{
  float: left;
}

.material-icons{
  cursor: pointer;
}
.material-icons.del{
  float:right;
  margin-right:10px;
}
.material-icons.cancel, .material-icons.edit{
  float:left;
  margin-right:500px;
}

.material-icons.medium.add{
  margin-left:5px;
  margin-top:5px;
}

.badge.badge-pill.badge-light{
  font-weight: normal;
  float: left;
  margin-top:50px;
}

.card.notes__add-note{
  border: none;
  margin-top:20px;
}

.instructor{
  font-family: 'Rubik', sans-serif;
  font-size:20px;
}

.note_title{
  font-size: 30px;
  margin-left:10px;
  margin-top:20px;
}

.form-control{
  margin-top:10px;
  width:250px;
}
.flexbox-container{
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 650px){
    .todoItem{
    margin-left:10%;
    margin-right:10%;
    }
}

</style>