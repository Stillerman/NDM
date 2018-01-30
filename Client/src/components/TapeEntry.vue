<template>
  <div class="tape-entry container">
    <h1>Tape Test</h1>
    <input type="text" v-model="sampleName" name="Sample Name" placeholder="Sample Name" value="">
    <div class="input-field col s12">
          <textarea v-model="notes" id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Notes</label>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <input id="rampRate" type="number" step="0.001" v-model="rampRate" value="">
        <label for="rampRate">Ramp Rate</label>
      </div>
      <div class="input-field col s6">
        <input id="rampGoal" type="number" step="0.01" v-model="vGoal" value="">
        <label for="rampGoal">v Goal</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <input id="voltTap" type="number" v-model="voltageTap" value="">
        <label for="voltTap">Voltage Tap Length (cm)</label>
      </div>
      <div class="input-field col s6">
        <input id="voltFloor" type="number" step="0.01" v-model="voltageFloor" value="">
        <label for="voltFloor">Voltage Floor (cV)</label>
      </div>
    </div>
    <button type=button>Take Shot</button>
  </div>
</template>

<script>
import VueEditor from 'vue2-editor'

export default {
  components: {
    ve: VueEditor
  },
  data () {
    return {
      sampleName: '',
      notes: '',
      voltageTap: '',
      voltageFloor: '',
      rampRate: 0.005,
      vGoal: 0.25,
      schema: {
        shot: {
          sampleName: String,
          notes: String
        }
      }
    }
  }
}
</script>

<style>

</style>
