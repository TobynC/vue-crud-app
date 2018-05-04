<template>
<div v-if="smoothie" class="edit-smoothie container">
    <h1>Edit a {{ smoothie.title }} smoothie</h1>
    <form @submit.prevent="editSmoothie()">
        <div v-if="titleFeedback" class="feedback">{{ titleFeedback }}</div>
        <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="smoothie.title" >
        </div>
        <div v-if="ingredientFeedback" class="feedback">{{ ingredientFeedback }}</div>
        <div class="field add-ingredient">
            <label for="add-ingredient">Add an ingredient</label>
            <input @keydown.tab.prevent="addIngredient()" @keydown.enter.prevent="addIngredient()" v-model="another" name="add-ingredient" type="text" />
        </div>
        <div class="field">
            <ul v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="ingredients">
                <li>
                    <span @click="deleteIngredient(ingredient)" class="chip">{{ ingredient }}</span>
                </li>
            </ul>
        </div>
        <div class="field center-align">
            <button class="btn pink">Update Smoothie</button>
        </div>
    </form>
</div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            ingredientFeedback: null,
            titleFeedback: null
        }
    },
    methods: {
        editSmoothie() {
            if (this.smoothie.title) {
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.generateSlug(this.smoothie.title)
                }).then(() => {
                    this.$router.push({
                        name: 'Index'
                    })
                }).catch(error => console.log('error :', error))

                this.titleFeedback = null;
            } else {
                this.titleFeedback = 'you must enter a smoothie title.'
            }
        },
        addIngredient() {
            if (this.another) {
                this.smoothie.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
            } else {
                this.ingredientFeedback = 'You must enter a value to add an ingredient.'
            }
        },
        deleteIngredient(ingredient) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => ing !== ingredient);
        },
        generateSlug(data) {
            return data.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        },
    },
    created() {
        let reference = db.collection('smoothies').where('slug', '==', this.$route.params.id);
        reference.get().then(snapshot => {
            snapshot.forEach(document => {
                this.smoothie = document.data();
                this.smoothie.id = document.id;
                this.ingredients = this.smoothie.ingredients;
            })
        })
    }
}
</script>

<style scoped>
.add-smoothie {
  margin-top: 3rem;
  padding: 1rem;
  max-width: 35rem;
}
.add-smoothie h2 {
  font-size: 2rem;
  margin: 1rem auto;
}
.add-smoothie .field {
  margin: 1rem auto;
}
.ingredients{
    display: inline-block;
}
.feedback{
    color: red;
}
.chip{
    cursor: pointer;
}
</style>
