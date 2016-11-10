// app.js

// // servings_table Component
// Vue.component('servings-table', {
//   template:'#servings-table-template'
// });
// // endof: servings_table Component

var vm = new Vue({

  // We want to target the div with an id of 'events'
  el: '#app',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    // event: { name: '', description: '', date: '' },
    // events: []
    weight: 50,
    height: 1.70,
    obesity_factor: 20,
    cho_percentage: 60,
    fat_percentage: 20,
    protein_percentage: 20,
    category_bar_percentage: 0,
    category_bar_class: '',
    //
    isDebugMode: false,
    //
    servings_ranges: {},
    servings_ranges_array: [],
    servings: {},
    servings_array: [],
    out_of_range_servings_array: [],
    out_of_range: "",
    isShowOutOfRange: false,
    servings_calculation_status: 'not started',
    servings_calculation_result: 'not started',
    //
    isShowServingsCalculator: false,
    calc_vegetables: 3,
    calc_vegetables_min: 3,
    calc_vegetables_max: 7,
    calc_fruits: 3,
    calc_fruits_min: 3,
    calc_fruits_max: 7,
    calc_milk: 1,
    calc_milk_min: 1,
    calc_milk_max: 4,
    calc_legumes: 0,
    calc_legumes_min: 0,
    calc_legumes_max: 4,
    // Filters
    starchesFilter: '',
    vegetablesFilter: '',
    fruitsFilter: '',
    milkFilter: '',
    meatFilter: '',
    legumesFilter: '',
    fatsFilter: '',
    // Out of Range Filters
    starchesOrFilter: '',
    vegetablesOrFilter: '',
    fruitsOrFilter: '',
    milkOrFilter: '',
    meatOrFilter: '',
    legumesOrFilter: '',
    fatsOrFilter: '',
    // Diet Patterns ----------------------------------------------
    diet_pattern: {
      starches:   { breakfast:0, snak1:0, lunch:0, snak2:0, dinner:0, total:0, },
      vegetables: { breakfast:0, snak1:0, lunch:0, snak2:0, dinner:0, total:0, },
      fruits:     { breakfast:0, snak1:0, lunch:0, snak2:0, dinner:0, total:0, },
      milk:       { breakfast:0, snak1:0, lunch:0, snak2:0, dinner:0, total:0, },
      meat:       { breakfast:0, snak1:0, lunch:0, snak2:0, dinner:0, total:0, },
      legumes:    { breakfast:0, snak1:0, lunch:0, snak2:0, dinner:0, total:0, },
      fats:       { breakfast:0, snak1:0, lunch:0, snak2:0, dinner:0, total:0, },
    },
    diet_pattern_array:  [],
    dp_starches_array:   [],
    dp_vegetables_array: [],
    dp_fruits_array:     [],
    dp_milk_array:       [],
    dp_meat_array:       [],
    dp_legumes_array:    [],
    dp_fats_array:       [],
    // Foods ----------------------------------------------
    foods_array: [],
    // foods_starches_array:   [],
    // foods_vegetables_array: [],
    // foods_fruits_array:     [],
    // foods_milk_array:       [],
    // foods_meat_array:       [],
    // foods_legumes_array:    [],
    // foods_fats_array:       [],
    // Alternatives ----------------------------------------------
    alternatives_array: [],
    alt_starches_array:   [],
    alt_vegetables_array: [],
    alt_fruits_array:     [],
    alt_milk_array:       [],
    alt_meat_array:       [],
    alt_legumes_array:    [],
    alt_fats_array:       [],
    //
  },
  // Computed Properties
  // For any logic that requires more than one expression, you should use a computed property. 
  computed: {
    // BMI
    bmi: function () {
      // `this` points to the vm instance
      result = this.weight / (this.height * this.height);
      return result.toFixed(4);
    },
    // Category
    category: function () {
      // `this` points to the vm instance
      result = '';
      if (this.bmi <= 0) {
        result = '';
        this.category_bar_percentage = 0;
        this.category_bar_class = '';
      } else if (this.bmi < 16.5) {
        result = 'Severely Underweight';
        this.category_bar_percentage = 20;
        this.category_bar_class = 'progress-bar-info';
      } else if (this.bmi < 18.5) {
        result = 'Underweight';
        this.category_bar_percentage = 30;
        this.category_bar_class = 'progress-bar-info';
      } else if (this.bmi < 25) {
        result = 'Normal';
        this.category_bar_percentage = 50;
        this.category_bar_class = 'progress-bar-success';
      } else if (this.bmi <= 30) {
        result = 'Overweight';
        this.category_bar_percentage = 70;
        this.category_bar_class = 'progress-bar-warning';
      } else if (this.bmi < 35) {
        result = 'Obesity - Class I';
        this.category_bar_percentage = 80;
        this.category_bar_class = 'progress-bar-warning';
      } else if (this.bmi < 40) {
        result = 'Obesity - Class II';
        this.category_bar_percentage = 90;
        this.category_bar_class = 'progress-bar-danger';
      } else if (this.bmi >= 40) {
        result = 'Obesity - Class III';
        this.category_bar_percentage = 100;
        this.category_bar_class = 'progress-bar-danger';
      } else {
      }
      return result;
    },
    // Kcal
    kcal: function () {
      //
      this.resetServingsArray();
      // `this` points to the vm instance
      result = this.weight * this.obesity_factor;
      //
      return result;
    },
    // healthy_diet_total
    healthy_diet_total: function () {
      //
      this.resetServingsArray();
      // `this` points to the vm instance
      result = +this.cho_percentage + +this.fat_percentage + +this.protein_percentage;
      // 
      return result;
    },
    // cho_kcal
    cho_kcal: function () {
      // `this` points to the vm instance
      result = this.kcal * this.cho_percentage / 100;
      return result;
    },
    // cho_gms
    cho_gms: function () {
      // `this` points to the vm instance
      result = this.cho_kcal / 4;
      return result.toFixed(2);
    },
    // fat_kcal
    fat_kcal: function () {
      // `this` points to the vm instance
      result = this.kcal * this.fat_percentage / 100;
      return result;
    },
    // fat_gms
    fat_gms: function () {
      // `this` points to the vm instance
      result = this.fat_kcal / 9;
      return result.toFixed(2);
    },
    // protein_kcal
    protein_kcal: function () {
      // `this` points to the vm instance
      result = this.kcal * this.protein_percentage / 100;
      return result;
    },
    // protein_gms
    protein_gms: function () {
      // `this` points to the vm instance
      result = this.protein_kcal / 4;
      return result.toFixed(2);
    },
  },

  // Anything within the ready function will run when the application loads
  ready: function () {
    // When the application loads, we want to call the method that initializes
    // some data
    this.fetchEvents();
    this.fetchServingsRanges();

  },

  // Methods we want to use in our application are registered here
  methods: {
    // We dedicate a method to retrieving and setting some data
    fetchEvents: function () {
      /*
      var events = [
        {
          id: 1,
          name: 'TIFF',
          description: 'Toronto International Film Festival',
          date: '2015-09-10'
        },
        {
          id: 2,
          name: 'The Martian Premiere',
          description: 'The Martian comes to theatres.',
          date: '2015-10-02'
        },
        {
          id: 3,
          name: 'SXSW',
          description: 'Music, film and interactive festival in Austin, TX.',
          date: '2016-03-11'
        }
      ];
      // $set is a convenience method provided by Vue that is similar to pushing
      // data onto an array
      this.$set('events', events);
      */
    },

    // Adds an event to the existing events array
    addEvent: function () {
      /*
      if (this.event.name) {
        this.events.push(this.event);
        this.event = { name: '', description: '', date: '' };
      }
      */
    },

    // Deletes an event from the existing events array
    deleteEvent: function (event) {
      /*
      if (confirm("Are you sure you want to delete this event?")) {
        // $remove is a Vue convenience method similar to splice
        this.events.$remove(event);
      }
      */
    },

    //
    fetchServingsRanges: function () {
      this.servings_ranges_array = [
        { kcal: 1000, starches_s: 4,  starches_e: 5,  vegetables_s: 3, vegetables_e: 4, fruits_s: 3, fruits_e: 4, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 4, legumes_s: 0, legumes_e: 1, fats_s: 2, fats_e: 13 },
        { kcal: 1100, starches_s: 4,  starches_e: 6,  vegetables_s: 3, vegetables_e: 4, fruits_s: 3, fruits_e: 4, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 4, legumes_s: 0, legumes_e: 1, fats_s: 2, fats_e: 13 },
        { kcal: 1200, starches_s: 5,  starches_e: 7,  vegetables_s: 3, vegetables_e: 5, fruits_s: 3, fruits_e: 5, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 5, legumes_s: 0, legumes_e: 1, fats_s: 2, fats_e: 13 },
        { kcal: 1300, starches_s: 5,  starches_e: 7,  vegetables_s: 3, vegetables_e: 5, fruits_s: 3, fruits_e: 5, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 5, legumes_s: 0, legumes_e: 1, fats_s: 2, fats_e: 13 },
        { kcal: 1400, starches_s: 6,  starches_e: 8,  vegetables_s: 3, vegetables_e: 6, fruits_s: 3, fruits_e: 6, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 6, legumes_s: 0, legumes_e: 1, fats_s: 2, fats_e: 13 },
        { kcal: 1500, starches_s: 6,  starches_e: 8,  vegetables_s: 3, vegetables_e: 6, fruits_s: 3, fruits_e: 6, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 6, legumes_s: 0, legumes_e: 1, fats_s: 2, fats_e: 13 },
        { kcal: 1600, starches_s: 7,  starches_e: 9,  vegetables_s: 5, vegetables_e: 6, fruits_s: 3, fruits_e: 6, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 6, legumes_s: 0, legumes_e: 1, fats_s: 2, fats_e: 13 },
        { kcal: 1700, starches_s: 7,  starches_e: 9,  vegetables_s: 4, vegetables_e: 6, fruits_s: 3, fruits_e: 6, milk_s: 1, milk_e: 2, meat_s: 3, meat_e: 6, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 1800, starches_s: 7,  starches_e: 10, vegetables_s: 4, vegetables_e: 7, fruits_s: 4, fruits_e: 7, milk_s: 1, milk_e: 3, meat_s: 3, meat_e: 6, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 1900, starches_s: 7,  starches_e: 10, vegetables_s: 4, vegetables_e: 7, fruits_s: 4, fruits_e: 7, milk_s: 1, milk_e: 3, meat_s: 3, meat_e: 6, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2000, starches_s: 7,  starches_e: 10, vegetables_s: 4, vegetables_e: 7, fruits_s: 4, fruits_e: 7, milk_s: 1, milk_e: 3, meat_s: 4, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2100, starches_s: 9,  starches_e: 11, vegetables_s: 5, vegetables_e: 7, fruits_s: 4, fruits_e: 7, milk_s: 1, milk_e: 3, meat_s: 4, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2200, starches_s: 9,  starches_e: 11, vegetables_s: 5, vegetables_e: 7, fruits_s: 4, fruits_e: 7, milk_s: 1, milk_e: 3, meat_s: 4, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2300, starches_s: 9,  starches_e: 11, vegetables_s: 5, vegetables_e: 7, fruits_s: 5, fruits_e: 7, milk_s: 1, milk_e: 3, meat_s: 4, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2400, starches_s: 9,  starches_e: 11, vegetables_s: 5, vegetables_e: 7, fruits_s: 5, fruits_e: 7, milk_s: 1, milk_e: 3, meat_s: 5, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2500, starches_s: 9,  starches_e: 12, vegetables_s: 5, vegetables_e: 7, fruits_s: 5, fruits_e: 7, milk_s: 2, milk_e: 3, meat_s: 5, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2600, starches_s: 10, starches_e: 13, vegetables_s: 5, vegetables_e: 7, fruits_s: 5, fruits_e: 7, milk_s: 2, milk_e: 3, meat_s: 5, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2700, starches_s: 10, starches_e: 13, vegetables_s: 6, vegetables_e: 8, fruits_s: 6, fruits_e: 8, milk_s: 2, milk_e: 3, meat_s: 5, meat_e: 7, legumes_s: 0, legumes_e: 2, fats_s: 2, fats_e: 13 },
        { kcal: 2800, starches_s: 10, starches_e: 14, vegetables_s: 6, vegetables_e: 8, fruits_s: 6, fruits_e: 8, milk_s: 2, milk_e: 3, meat_s: 5, meat_e: 8, legumes_s: 0, legumes_e: 3, fats_s: 2, fats_e: 13 },
        { kcal: 2900, starches_s: 10, starches_e: 15, vegetables_s: 6, vegetables_e: 8, fruits_s: 6, fruits_e: 8, milk_s: 2, milk_e: 3, meat_s: 6, meat_e: 8, legumes_s: 0, legumes_e: 3, fats_s: 2, fats_e: 13 },
        { kcal: 3000, starches_s: 10, starches_e: 15, vegetables_s: 6, vegetables_e: 8, fruits_s: 6, fruits_e: 8, milk_s: 2, milk_e: 3, meat_s: 6, meat_e: 8, legumes_s: 0, legumes_e: 3, fats_s: 2, fats_e: 13 },
      ];
    },

    // Adds a servings to the existing servings array
    // =========================================================================
    addServings: function (servings) {
      this.servings_array.push(servings);
    },

    // Sort servings array
    // =========================================================================
    sortServings: function () {
      this.servings_array.sort(function (a, b){
        if(a.calculated_kcal < b.calculated_kcal) return -1;
        if(a.calculated_kcal > b.calculated_kcal) return  1;
        return 0;
      });
    },

    // Adds a servings to the existing out of range servings array
    // =========================================================================
    addOutOfRangeServings: function (servings) {
      //
      this.out_of_range_servings_array.push(servings);
      //
    },

    //
    // =========================================================================
    //
    calculateFat: function (servings) {
      var fat = this.fat_gms;
      // 
      fat -= 3 * servings.milk;
      fat -= 3 * servings.meat;
      fat /= 5;
      fat = Math.round(fat);
      //  
      return fat;
    },

    calculateChoGmsFromServings: function (servings) {
      var cho = 0;
      // 
      cho += 15 * servings.starches;
      cho += 5 * servings.vegetables;
      cho += 15 * servings.fruits;
      cho += 15 * servings.milk;
      cho += 0 * servings.meat;
      cho += 15 * servings.legumes;
      cho += 0 * servings.fats;
      //  
      return cho;
    },

    //
    calculateProteinGmsFromServings: function (servings) {
      var protein = 0;
      // 
      protein += 3 * servings.starches;
      protein += 2 * servings.vegetables;
      protein += 0 * servings.fruits;
      protein += 8 * servings.milk;
      protein += 7 * servings.meat;
      protein += 7 * servings.legumes;
      protein += 0 * servings.fats;
      //  
      return protein;
    },

    //
    calculateFatGmsFromServings: function (servings) {
      var fat = 0;
      // 
      fat += 0 * servings.starches;
      fat += 0 * servings.vegetables;
      fat += 0 * servings.fruits;
      fat += 3 * servings.milk;
      fat += 3 * servings.meat;
      fat += 0 * servings.legumes;
      fat += 5 * servings.fats;
      //  
      return fat;
    },

    //
    calculateKcalFromServings: function (servings) {
      var kcal = 0;
      // 
      kcal += 80 * servings.starches;
      kcal += 25 * servings.vegetables;
      kcal += 60 * servings.fruits;
      kcal += 100 * servings.milk;
      kcal += 45 * servings.meat;
      kcal += 100 * servings.legumes;
      kcal += 45 * servings.fats;
      //  
      return kcal;
    },

    //
    calculateServingsGms: function (servings) {
      // Calculate gms
      servings.calculate_cho_gms = this.calculateChoGmsFromServings(servings);
      servings.calculate_protein_gms = this.calculateProteinGmsFromServings(servings);
      servings.calculate_fat_gms = this.calculateFatGmsFromServings(servings);
      //  
      return servings;
    },

    //
    isServingsGmsInRange: function (servings) {
      //
      this.out_of_range = "";
      //
      s = +this.cho_gms - 6;
      e = +this.cho_gms + 6;
      if (servings.calculate_cho_gms < s || servings.calculate_cho_gms > e) {
        msg = "calculate_cho_gms: " + servings.calculate_cho_gms + " not in range [" + s + " : " + e + "]";
        this.out_of_range += msg;
        return false;
      }
      //
      s = +this.protein_gms - 2;
      e = +this.protein_gms + 2;
      if (servings.calculate_protein_gms < s || servings.calculate_protein_gms > e) {
        msg = "calculate_protein_gms: " + servings.calculate_protein_gms + " not in range [" + s + " : " + e + "]";
        this.out_of_range += msg;
        return false;
      }
      //
      s = +this.fat_gms - 2;
      e = +this.fat_gms + 2;
      if (servings.calculate_fat_gms < s || servings.calculate_fat_gms > e) {
        msg = "calculate_fat_gms: " + servings.calculate_fat_gms + " not in range [" + s + " : " + e + "]";
        this.out_of_range += msg;
        return false;
      }
      //  
      return true;
    },

    //
    calculateServingsTotalsRow: function (servings) {
      // Calculate kcal
      servings.calculate_cho_kcal = 4 * servings.calculate_cho_gms;
      servings.calculate_protein_kcal = 4 * servings.calculate_protein_gms;
      servings.calculate_fat_kcal = 9 * servings.calculate_fat_gms;
      // Calculate total kcal
      servings.calculated_kcal = servings.calculate_cho_kcal;
      servings.calculated_kcal += servings.calculate_protein_kcal;
      servings.calculated_kcal += servings.calculate_fat_kcal;
      // Calculate kcal
      servings.calculate_cho_percentage = +((servings.calculate_cho_kcal / servings.calculated_kcal * 100).toFixed(2));
      servings.calculate_protein_percentage = +((servings.calculate_protein_kcal / servings.calculated_kcal * 100).toFixed(2));
      servings.calculate_fat_percentage = +((servings.calculate_fat_kcal / servings.calculated_kcal * 100).toFixed(2));
      //
      servings.calculated_kcal_from_servings = this.calculateKcalFromServings(servings);
      //  
      return servings;
    },

    //
    // =================================================================================
    resetServingsArray: function () {
      //
      this.servings_calculation_status = 'not started';
      this.servings_calculation_result = 'reseted';
      //  
      this.servings_array = [];
      this.out_of_range_servings_array = [];
      this.dp_starches_array = [];
      //
    },//endof: resetServingsArray

    //
    // =================================================================================
    showOutOfRange: function () {
      //
      this.isShowOutOfRange = !this.isShowOutOfRange;
      //
    },

    //
    // =================================================================================
    showServingsCalculator: function () {
      // 
      this.resetServingsArray();
      //
      this.isShowServingsCalculator = !this.isShowServingsCalculator;
      //
      
    },

    //
    // =================================================================================
    generateServings: function () {
      // Measure Execution Time
      // *******************************
      var executionStart = performance.now();
      // *******************************
      // 
      this.resetServingsArray();
      //
      this.servings_calculation_status = 'started';
      this.servings_calculation_result = 'started';
      //
      // Set global servings range
      // ----------------------------------------------
      sr = { 
        starches_s: 4, starches_e: 15, 
        vegetables_s: 3, vegetables_e: 8, 
        fruits_s: 3, fruits_e: 8, 
        milk_s: 1, milk_e: 3, 
        meat_s: 3, meat_e: 8, 
        legumes_s: 0, legumes_e: 3, 
        // fats_s: 2, fats_e: 13 
      };
      //
      // Set servings range limitations
      // ----------------------------------------------
      kcal_id = Math.floor(this.kcal/100) * 100;
      this.servings_ranges_array.find(function (element) {
        if (element.kcal == kcal_id) {
          sr = element;
          return true;
        }
      }, this);
      
      // this.servings_ranges = sr;
      // return true;
      //
      // ----------------------------------------------
      for (var          starches = sr.starches_s; starches     <= sr.starches_e; starches++) {
        for (var      vegetables = sr.vegetables_s; vegetables <= sr.vegetables_e; vegetables++) {
          for (var        fruits = sr.fruits_s; fruits         <= sr.fruits_e; fruits++) {
            for (var        milk = sr.milk_s; milk             <= sr.milk_e; milk++) {
              for (var      meat = sr.meat_s; meat             <= sr.meat_e; meat++) {
                for (var legumes = sr.legumes_s; legumes       <= sr.legumes_e; legumes++) {
                  // for (var fats  = sr.fats_s; fats             <= sr.fats_e; fats++) {

                    servings = {
                      kcal: this.kcal,
                      starches: starches,
                      vegetables: vegetables,
                      fruits: fruits,
                      milk: milk,
                      meat: meat,
                      legumes: legumes,
                      // fats: fats,
                    };
                    servings.fats = this.calculateFat(servings);
                    //
                    //...................................................................
                    // Roles
                    //...................................................................
                    
                    //
                    // meat and legumes conflict
                    //...................................................................
                    if (this.kcal >= 1700 && meat >= sr.meat_e && legumes >= sr.legumes_e) {
                      // Out of Range
                      if (this.isDebugMode) {
                        msg = "meat and legumes conflict: kcal >= 1700 and meat >= " + sr.meat_e + " and legumes >= " + sr.legumes_e;
                        servings.out_of_range = msg;
                        this.addOutOfRangeServings(servings);
                      }
                      // if so breaks current iteration (not the loop), and continues with the next iteration
                      continue;
                    }
                    
                    //
                    // milk and legumes conflict
                    //...................................................................
                    if (this.kcal >= 1700 && milk >= sr.milk_e && legumes >= sr.legumes_e) {
                      // Out of Range
                      if (this.isDebugMode) {
                        msg = "milk and legumes conflict: kcal >= 1700 and milk >= " + sr.milk_e + " and legumes >= " + sr.legumes_e;
                        servings.out_of_range = msg;
                        this.addOutOfRangeServings(servings);
                      }
                      // if so breaks current iteration (not the loop), and continues with the next iteration
                      continue;
                    }
                    
                    //
                    // Check if Servings Gms are out of Range
                    //...................................................................
                    // calculate Servings Gms
                    servings = this.calculateServingsGms(servings);
                    servings.gms_in_range = this.isServingsGmsInRange(servings);
                    if (!servings.gms_in_range) {
                      // Out of Range
                      if (this.isDebugMode) {
                        servings = this.calculateServingsTotalsRow(servings);
                        servings.out_of_range = this.out_of_range;
                        this.addOutOfRangeServings(servings);
                      }
                      // if so breaks current iteration (not the loop), and continues with the next iteration
                      continue;
                    }
                    
                    //
                    //...................................................................
                    // if OK, Servings Gms are in Range and passes all previous roles
                    //...................................................................
                    servings = this.calculateServingsTotalsRow(servings);
                    this.addServings(servings);
                    // 
                    this.servings_calculation_result = 'success';
                    //
                  // } // fats
                } // legumes
              } // meat
            } // milk
          } // fruits
        } // vegetables
      } // starches
      //
      if (this.servings_calculation_result !== 'success') {
        this.servings_calculation_result = 'fail';
      }
      //
      this.sortServings();
      //
      this.servings_calculation_status = 'finished';
      //
      // Measure Execution Time
      // *******************************
      var executionEnd = performance.now();
      var executionTime = executionEnd - executionStart;
      console.log('generateServings Execution time: ' + executionTime + ' ms.');
      // *******************************
      //
    }, //endof: generateServings()

    //                                  *************************
    //                                  ***   Diet Patterns   ***
    //                                  *************************

    //
    // =================================================================================
    selectServings: function (servings) {
      //
      this.resetServingsArray();
      //  
      this.addServings(servings);
    }, //endof: selectServings()

    //
    // =========================================================================
    resetDietPatternArray: function () {
      //
      // this.servings_calculation_status = 'not started';
      // this.servings_calculation_result = 'reseted';
      //  
      this.diet_pattern_array = [];
      // this.out_of_range_servings_array = [];
      //
    },//endof: resetServingsArray
    
    // Adds a Diet Pattern to the existing Diet Patterns array
    // =========================================================================
    addDietPattern: function (diet_pattern) {
      this.diet_pattern_array.push(diet_pattern);
    },//endof: addDietPattern

    // reset Starches
    // =========================================================================
    resetDpStarchesArray: function () {
      //
      this.dp_starches_array = [];
      //
    },//endof: resetDpStarchesArray
    
    // add Starches
    // =========================================================================
    addDpStarches: function (dp_starches) {
      this.dp_starches_array.push(dp_starches);
    },//endof: addDpStarches
    
    // reset Vegetables
    // =========================================================================
    resetDpVegetablesArray: function () {
      //
      this.dp_vegetables_array = [];
      //
    },//endof: resetDpVegetablesArray

    // add Vegetables
    // =========================================================================
    addDpVegetables: function (dp_vegetables) {
      this.dp_vegetables_array.push(dp_vegetables);
    },//endof: addDpVegetables

    // reset Fruits
    // =========================================================================
    resetDpFruitsArray: function () {
      //
      this.dp_fruits_array = [];
      //
    },//endof: resetDpFruitsArray
    
    // add Fruits
    // =========================================================================
    addDpFruits: function (dp_fruits) {
      this.dp_fruits_array.push(dp_fruits);
    },//endof: addDpFruits
    
    // reset Milk
    // =========================================================================
    resetDpMilkArray: function () {
      //
      this.dp_milk_array = [];
      //
    },//endof: resetDpMilkArray
    
    // add Milk
    // =========================================================================
    addDpMilk: function (dp_milk) {
      this.dp_milk_array.push(dp_milk);
    },//endof: addDpMilk
    
    // reset Meat
    // =========================================================================
    resetDpMeatArray: function () {
      //
      this.dp_meat_array = [];
      //
    },//endof: resetDpMeatArray
    
    // add Meat
    // =========================================================================
    addDpMeat: function (dp_meat) {
      this.dp_meat_array.push(dp_meat);
    },//endof: addDpMeat
    
    // reset Legumes
    // =========================================================================
    resetDpLegumesArray: function () {
      //
      this.dp_legumes_array = [];
      //
    },//endof: resetDpLegumesArray
    
    // add Legumes
    // =========================================================================
    addDpLegumes: function (dp_legumes) {
      this.dp_legumes_array.push(dp_legumes);
    },//endof: addDpLegumes
    
    // reset Fats
    // =========================================================================
    resetDpFatsArray: function () {
      //
      this.dp_fats_array = [];
      //
    },//endof: resetDpFatsArray
    
    // add Fats
    // =========================================================================
    addDpFats: function (dp_fats) {
      this.dp_fats_array.push(dp_fats);
    },//endof: addDpFats
    
    // Check if current iteration Food Group Total is equal to Servings Food Group Total
    // ===================================================================================
    isFoodGroupTotalOk: function (food_group) {
      //
      food_group_total  = food_group.breakfast;
      food_group_total += food_group.snak1;
      food_group_total += food_group.lunch;
      food_group_total += food_group.snak2;
      food_group_total += food_group.dinner;
      // Debugging
      if  (food_group_total != food_group.total){
        this.out_of_range = "total";
      }
      //
      return (food_group_total == food_group.total);
    }, //endof: isFoodGroupTotalOk

    // Diet Pattern Role # 1
    // snak1 must be less than or equal to breakfast, lunch, or dinner
    // ===================================================================================
    isDpRole1: function (food_group) {
      //
      if ( food_group.snak1 > food_group.breakfast
        || food_group.snak1 > food_group.lunch
        || food_group.snak1 > food_group.dinner) {
        // Debugging
        this.out_of_range = "Role 1";
        return false;
      }
      return true;
    }, //endof: isDpRole1

    // Diet Pattern Role # 2
    // snak2 must be less than or equal to breakfast, lunch, or dinner
    // ===================================================================================
    isDpRole2: function (food_group) {
      //
      if ( food_group.snak2 > food_group.breakfast
        || food_group.snak2 > food_group.lunch
        || food_group.snak2 > food_group.dinner) {
        // Debugging
        this.out_of_range = "Role 2";
        return false;
      }
      return true;
    }, //endof: isDpRole2

    // Diet Pattern Role # 3
    // dinner must be less than or equal to breakfast, lunch
    // ===================================================================================
    isDpRole3: function (food_group) {
      //
      if ( food_group.dinner > food_group.breakfast
        || food_group.dinner > food_group.lunch) {
        // Debugging
        this.out_of_range = "Role 3";
        return false;
      }
      return true;
    }, //endof: isDpRole3

    // Diet Pattern Role # 4
    // breakfast must be less than or equal to ( lunch * 2 )
    // ===================================================================================
    isDpRole4: function (food_group) {
      //
      if (food_group.breakfast > (food_group.lunch * 2)) {
        // Debugging
        this.out_of_range = "Role 4";
        return false;
      }
      return true;
    }, //endof: isDpRole4

    // Diet Pattern Role # 5
    // lunch must be greater than others
    // ===================================================================================
    isDpRole5: function (food_group) {
      //
      if ( food_group.lunch <= food_group.breakfast
        || food_group.lunch <= food_group.snak1
        || food_group.lunch <= food_group.snak2
        || food_group.lunch <= food_group.dinner ) {
        // Debugging
        this.out_of_range = "Role 5";
        return false;
      }
      return true;
    }, //endof: isDpRole5

    // Diet Pattern Role # 6
    // dinner and snaks must be greater than others
    // ===================================================================================
    isDpRole6: function (food_group) {
      //
      if ( food_group.dinner <= food_group.breakfast
        || food_group.dinner <= food_group.lunch

        || food_group.snak1  <= food_group.breakfast
        || food_group.snak1  <= food_group.lunch

        || food_group.snak2  <= food_group.breakfast
        || food_group.snak2  <= food_group.lunch ) {
        // Debugging
        this.out_of_range = "Role 6";
        return false;
      }
      return true;
    }, //endof: isDpRole6

    // Diet Pattern Role # 7
    // breakfast must be greater than others
    // ===================================================================================
    isDpRole7: function (food_group) {
      //
      if ( food_group.breakfast <= food_group.snak1
        || food_group.breakfast <= food_group.lunch
        || food_group.breakfast <= food_group.snak2
        || food_group.breakfast <= food_group.dinner ) {
        // Debugging
        this.out_of_range = "Role 7";
        return false;
      }
      return true;
    }, //endof: isDpRole7

    // Diet Pattern Role # 8
    // breakfast must be greater than others
    // ===================================================================================
    isDpRole8: function (food_group) {
      //
      count = 0;
      if (food_group.breakfast > 0) count++;
      if (food_group.snak1     > 0) count++;
      if (food_group.lunch    > 0) count++;
      if (food_group.snak2     > 0) count++;
      if (food_group.dinner    > 0) count++;
      if (count < 3 ) {
        // Debugging
        this.out_of_range = "Role 8";
        return false;
      }
      return true;
    }, //endof: isDpRole8

    // Check if all Starches Diet Pattern Roles are OK
    // ===================================================================================
    isStarchesDietPatternOk: function (food_group) {
      //
      // total
      //...................................................................
      if (! this.isFoodGroupTotalOk(food_group)) {
        return false;
      }
      // Role # 1
      //...................................................................
      if (! this.isDpRole1(food_group)) {
        return false;
      }
      // Role # 2
      //...................................................................
      if (! this.isDpRole2(food_group)) {
        return false;
      }
      // Role # 3
      //...................................................................
      if (! this.isDpRole3(food_group)) {
        return false;
      }
      // Role # 4
      //...................................................................
      if (! this.isDpRole4(food_group)) {
        return false;
      }
      //
      return true;
    },

    // Check if all Vegetables Diet Pattern Roles are OK
    // ===================================================================================
    isVegetablesDietPatternOk: function (food_group) {
      //
      // total
      //...................................................................
      if (! this.isFoodGroupTotalOk(food_group)) {
        return false;
      }
      // Role # 1
      //...................................................................
      if (! this.isDpRole1(food_group)) {
        return false;
      }
      // Role # 2
      //...................................................................
      if (! this.isDpRole2(food_group)) {
        return false;
      }
      // Role # 5
      //...................................................................
      if (! this.isDpRole5(food_group)) {
        return false;
      }
      // Role # 8
      //...................................................................
      if (! this.isDpRole8(food_group)) {
        return false;
      }
      //
      return true;
    },

    // Check if all Fruits Diet Pattern Roles are OK
    // ===================================================================================
    isFruitsDietPatternOk: function (food_group) {
      //
      // total
      //...................................................................
      if (! this.isFoodGroupTotalOk(food_group)) {
        return false;
      }
      // Role # 6
      //...................................................................
      if (! this.isDpRole6(food_group)) {
        return false;
      }
      //
      return true;
    },

    // Check if all Milk Diet Pattern Roles are OK
    // ===================================================================================
    isMilkDietPatternOk: function (food_group) {
      //
      // total
      //...................................................................
      if (! this.isFoodGroupTotalOk(food_group)) {
        return false;
      }
      // Role # 1
      //...................................................................
      if (! this.isDpRole1(food_group)) {
        return false;
      }
      // Role # 2
      //...................................................................
      if (! this.isDpRole2(food_group)) {
        return false;
      }
      //
      return true;
    },

    // Check if all Meat Diet Pattern Roles are OK
    // ===================================================================================
    isMeatDietPatternOk: function (food_group) {
      //
      // total
      //...................................................................
      if (! this.isFoodGroupTotalOk(food_group)) {
        return false;
      }
      // Role # 1
      //...................................................................
      if (! this.isDpRole1(food_group)) {
        return false;
      }
      // Role # 2
      //...................................................................
      if (! this.isDpRole2(food_group)) {
        return false;
      }
      // Role # 5
      //...................................................................
      if (! this.isDpRole5(food_group)) {
        return false;
      }
      //
      return true;
    },

    // Check if all Legumes Diet Pattern Roles are OK
    // ===================================================================================
    isLegumesDietPatternOk: function (food_group) {
      //
      // total
      //...................................................................
      if (! this.isFoodGroupTotalOk(food_group)) {
        return false;
      }
      // Role # 1
      //...................................................................
      if (! this.isDpRole1(food_group)) {
        return false;
      }
      // Role # 2
      //...................................................................
      if (! this.isDpRole2(food_group)) {
        return false;
      }
      // Role # 7
      //...................................................................
      if (! this.isDpRole7(food_group)) {
        return false;
      }
      //
      return true;
    },

    // Check if all Fats Diet Pattern Roles are OK
    // ===================================================================================
    isFatsDietPatternOk: function (food_group) {
      //
      // total
      //...................................................................
      if (! this.isFoodGroupTotalOk(food_group)) {
        return false;
      }
      // Role # 1
      //...................................................................
      if (! this.isDpRole1(food_group)) {
        return false;
      }
      // Role # 2
      //...................................................................
      if (! this.isDpRole2(food_group)) {
        return false;
      }
      // Role # 5
      //...................................................................
      if (! this.isDpRole5(food_group)) {
        return false;
      }
      //
      return true;
    },

    //
    // Generate Diet Patterns
    // =================================================================================
    generateDietPatterns: function (servings) {
      //
      this.selectServings(servings);
      //
      // Measure Execution Time
      // *******************************
      var executionStart = performance.now();
      // *******************************
      // 
      this.resetDpStarchesArray();
      this.resetDpVegetablesArray();
      this.resetDpFruitsArray();
      this.resetDpMilkArray();
      this.resetDpMeatArray();
      this.resetDpLegumesArray();
      this.resetDpFatsArray();
      //
      // this.servings_calculation_status = 'started';
      // this.servings_calculation_result = 'started';

      //
      // Set Diet Pattern upper limit
      // ----------------------------------------------
      upper_limit = {
        starches:     Math.round(servings.starches   * 0.50),
        vegetables:   3,
        vegetables_l: Math.round(servings.vegetables * 0.60),
        fruits_b:     Math.round(servings.fruits     * 0.40),
        fruits_s1:    Math.round(servings.fruits     * 0.40),
        fruits_l:     1,
        fruits_s2:    Math.round(servings.fruits     * 0.40),
        fruits_d:     Math.round(servings.fruits     * 0.50),
        milk:         2,
        milk_l:       0,
        meat:         2,
        meat_l:       Math.round(servings.meat       * 0.75),
        legumes:      2,
        fats:         Math.round(servings.fats       - 1   ),
        fats_l:       Math.round(servings.fats       - 1   ),
      };
      // 
      if(this.kcal >= 2000){
        upper_limit.starches = Math.round(servings.starches * 0.4);
      }
      // 
      if(servings.meat == 3){
        upper_limit.meat   = 0;
        upper_limit.meat_l = 3;
      }
      // 
      if(servings.fats == 2){
        upper_limit.fats   = 0;
        upper_limit.fats_l = 2;
      }

      // Starches
      // -------------------------------------------------------------------------------------------------
      for (var starches_b = 0; starches_b <= upper_limit.starches; starches_b++) { // breakfast
        for (var starches_s1 = 0; starches_s1 <= upper_limit.starches; starches_s1++) { // snak1
          for (var starches_l = 0; starches_l <= upper_limit.starches; starches_l++) { // lunch
            for (var starches_s2 = 0; starches_s2 <= upper_limit.starches; starches_s2++) { // snak2
              // for (var starches_d = 0; starches_d <= upper_limit.starches; starches_d++) { // dinner
                //
                // Calculate dinner
                starches_d = servings.starches - (starches_b + starches_s1 + starches_l + starches_s2);
                if(starches_d < 0 || starches_d > upper_limit.starches){
                  continue;
                }
                // 
                dp_starches = {
                  breakfast: starches_b,
                  snak1: starches_s1,
                  lunch: starches_l,
                  snak2: starches_s2,
                  dinner: starches_d,
                  total: servings.starches,
                  // Debugging
                  status: "Yes",
                  due_to: " ",
                };
                // Debugging
                if (this.isDebugMode) {
                  dp_starches.status = "Yes";
                  dp_starches.due_to = " ";
                }
                //...................................................................
                // Check if all Starches Diet Pattern Roles are OK
                //...................................................................
                if (! this.isStarchesDietPatternOk (dp_starches)) {
                  // if so breaks current iteration (not the loop), and continues with the next iteration
                  // continue;
                  // Debugging
                  if (this.isDebugMode) {
                    dp_starches.status = "No";
                    dp_starches.due_to = this.out_of_range;
                  }else{
                    continue;
                  }
                }
                //...................................................................
                // if OK, Passes all previous roles
                //...................................................................
                this.addDpStarches(dp_starches);
                // 
                // this.servings_calculation_result = 'success';
                //
              // } // starches_d
            } // starches_s2
          } // starches_l
        } // starches_s1
      } // starches_b

      // Vegetables
      // -------------------------------------------------------------------------------------------------
      for (var vegetables_b = 0; vegetables_b <= upper_limit.vegetables; vegetables_b++) { // breakfast
        for (var vegetables_s1 = 0; vegetables_s1 <= upper_limit.vegetables; vegetables_s1++) { // snak1
          for (var vegetables_l = 0; vegetables_l <= upper_limit.vegetables_l; vegetables_l++) { // lunch
            for (var vegetables_s2 = 0; vegetables_s2 <= upper_limit.vegetables; vegetables_s2++) { // snak2
              // for (var vegetables_d = 0; vegetables_d <= upper_limit.vegetables; vegetables_d++) { // dinner
                //
                // Calculate dinner
                vegetables_d = servings.vegetables - (vegetables_b + vegetables_s1 + vegetables_l + vegetables_s2);
                if(vegetables_d < 0 || vegetables_d > upper_limit.vegetables){
                  continue;
                }
                //
                dp_vegetables = {
                  breakfast: vegetables_b,
                  snak1: vegetables_s1,
                  lunch: vegetables_l,
                  snak2: vegetables_s2,
                  dinner: vegetables_d,
                  total: servings.vegetables,
                };
                // Debugging
                if (this.isDebugMode) {
                  dp_vegetables.status = "Yes";
                  dp_vegetables.due_to = " ";
                }
                //...................................................................
                // Check if all Vegetables Diet Pattern Roles are OK
                //...................................................................
                if (! this.isVegetablesDietPatternOk (dp_vegetables)) {
                  // if so breaks current iteration (not the loop), and continues with the next iteration
                  // continue;
                  // Debugging
                  if (this.isDebugMode) {
                    dp_vegetables.status = "No";
                    dp_vegetables.due_to = this.out_of_range;
                  }else{
                    continue;
                  }
                }
                //...................................................................
                // if OK, Passes all previous roles
                //...................................................................
                this.addDpVegetables(dp_vegetables);
                // 
                // this.servings_calculation_result = 'success';
                //
              // } // vegetables_d
            } // vegetables_s2
          } // vegetables_l
        } // vegetables_s1
      } // vegetables_b

      // Fruits
      // -------------------------------------------------------------------------------------------------
      for (var fruits_b = 0;        fruits_b  <= upper_limit.fruits_b; fruits_b++) { // breakfast
        for (var fruits_s1 = 0;     fruits_s1 <= upper_limit.fruits_s1; fruits_s1++) { // snak1
          for (var fruits_l = 0;    fruits_l  <= upper_limit.fruits_l; fruits_l++) { // lunch
            for (var fruits_s2 = 0; fruits_s2 <= upper_limit.fruits_s1; fruits_s2++) { // snak2
              // for (var fruits_d = 0; fruits_d <= upper_limit.fruits; fruits_d++) { // dinner
                //
                // Calculate dinner
                fruits_d = servings.fruits - (fruits_b + fruits_s1 + fruits_l + fruits_s2);
                if(fruits_d < 0 || fruits_d > upper_limit.fruits_d){
                  continue;
                }
                // 
                dp_fruits = {
                  breakfast: fruits_b,
                  snak1: fruits_s1,
                  lunch: fruits_l,
                  snak2: fruits_s2,
                  dinner: fruits_d,
                  total: servings.fruits,
                  // Debugging
                  status: "Yes",
                  due_to: " ",
                };
                // Debugging
                if (this.isDebugMode) {
                  dp_fruits.status = "Yes";
                  dp_fruits.due_to = " ";
                }
                //...................................................................
                // Check if all Fruits Diet Pattern Roles are OK
                //...................................................................
                if (! this.isFruitsDietPatternOk (dp_fruits)) {
                  // if so breaks current iteration (not the loop), and continues with the next iteration
                  // continue;
                  // Debugging
                  if (this.isDebugMode) {
                    dp_fruits.status = "No";
                    dp_fruits.due_to = this.out_of_range;
                  }else{
                    continue;
                  }
                }
                //...................................................................
                // if OK, Passes all previous roles
                //...................................................................
                this.addDpFruits(dp_fruits);
                // 
                // this.servings_calculation_result = 'success';
                //
              // } // fruits_d
            } // fruits_s2
          } // fruits_l
        } // fruits_s1
      } // fruits_b

      // Milk
      // -------------------------------------------------------------------------------------------------
      for (var milk_b = 0; milk_b <= upper_limit.milk; milk_b++) { // breakfast
        for (var milk_s1 = 0; milk_s1 <= upper_limit.milk; milk_s1++) { // snak1
          for (var milk_l = 0; milk_l <= upper_limit.milk_l; milk_l++) { // lunch
            for (var milk_s2 = 0; milk_s2 <= upper_limit.milk; milk_s2++) { // snak2
              // for (var milk_d = 0; milk_d <= upper_limit.milk; milk_d++) { // dinner
                //
                // Calculate dinner
                milk_d = servings.milk - (milk_b + milk_s1 + milk_l + milk_s2);
                if(milk_d < 0 || milk_d > upper_limit.milk){
                  continue;
                }
                // 
                dp_milk = {
                  breakfast: milk_b,
                  snak1: milk_s1,
                  lunch: milk_l,
                  snak2: milk_s2,
                  dinner: milk_d,
                  total: servings.milk,
                  // Debugging
                  status: "Yes",
                  due_to: " ",
                };
                // Debugging
                if (this.isDebugMode) {
                  dp_milk.status = "Yes";
                  dp_milk.due_to = " ";
                }
                //...................................................................
                // Check if all Milk Diet Pattern Roles are OK
                //...................................................................
                if (! this.isMilkDietPatternOk (dp_milk)) {
                  // if so breaks current iteration (not the loop), and continues with the next iteration
                  // continue;
                  // Debugging
                  if (this.isDebugMode) {
                    dp_milk.status = "No";
                    dp_milk.due_to = this.out_of_range;
                  }else{
                    continue;
                  }
                }
                //...................................................................
                // if OK, Passes all previous roles
                //...................................................................
                this.addDpMilk(dp_milk);
                // 
                // this.servings_calculation_result = 'success';
                //
              // } // milk_d
            } // milk_s2
          } // milk_l
        } // milk_s1
      } // milk_b

      // Meat
      // -------------------------------------------------------------------------------------------------
      for (var meat_b = 0; meat_b <= upper_limit.meat; meat_b++) { // breakfast
        for (var meat_s1 = 0; meat_s1 <= upper_limit.meat; meat_s1++) { // snak1
          for (var meat_l = 0; meat_l <= upper_limit.meat_l; meat_l++) { // lunch
            for (var meat_s2 = 0; meat_s2 <= upper_limit.meat; meat_s2++) { // snak2
              // for (var meat_d = 0; meat_d <= upper_limit.meat; meat_d++) { // dinner
                //
                // Calculate dinner
                meat_d = servings.meat - (meat_b + meat_s1 + meat_l + meat_s2);
                if(meat_d < 0 || meat_d > upper_limit.meat){
                  continue;
                }
                // 
                dp_meat = {
                  breakfast: meat_b,
                  snak1: meat_s1,
                  lunch: meat_l,
                  snak2: meat_s2,
                  dinner: meat_d,
                  total: servings.meat,
                  // Debugging
                  status: "Yes",
                  due_to: " ",
                };
                // Debugging
                if (this.isDebugMode) {
                  dp_meat.status = "Yes";
                  dp_meat.due_to = " ";
                }
                //...................................................................
                // Check if all Meat Diet Pattern Roles are OK
                //...................................................................
                if (! this.isMeatDietPatternOk (dp_meat)) {
                  // if so breaks current iteration (not the loop), and continues with the next iteration
                  // continue;
                  // Debugging
                  if (this.isDebugMode) {
                    dp_meat.status = "No";
                    dp_meat.due_to = this.out_of_range;
                  }else{
                    continue;
                  }
                }
                //...................................................................
                // if OK, Passes all previous roles
                //...................................................................
                this.addDpMeat(dp_meat);
                // 
                // this.servings_calculation_result = 'success';
                //
              // } // meat_d
            } // meat_s2
          } // meat_l
        } // meat_s1
      } // meat_b

      // Legumes
      // -------------------------------------------------------------------------------------------------
      for (var legumes_b = 0; legumes_b <= upper_limit.legumes; legumes_b++) { // breakfast
        for (var legumes_s1 = 0; legumes_s1 <= upper_limit.legumes; legumes_s1++) { // snak1
          for (var legumes_l = 0; legumes_l <= upper_limit.legumes; legumes_l++) { // lunch
            for (var legumes_s2 = 0; legumes_s2 <= upper_limit.legumes; legumes_s2++) { // snak2
              // for (var legumes_d = 0; legumes_d <= upper_limit.legumes; legumes_d++) { // dinner
                //
                // Calculate dinner
                legumes_d = servings.legumes - (legumes_b + legumes_s1 + legumes_l + legumes_s2);
                if(legumes_d < 0 || legumes_d > upper_limit.legumes){
                  continue;
                }
                // 
                dp_legumes = {
                  breakfast: legumes_b,
                  snak1: legumes_s1,
                  lunch: legumes_l,
                  snak2: legumes_s2,
                  dinner: legumes_d,
                  total: servings.legumes,
                  // Debugging
                  status: "Yes",
                  due_to: " ",
                };
                // Debugging
                if (this.isDebugMode) {
                  dp_legumes.status = "Yes";
                  dp_legumes.due_to = " ";
                }
                //...................................................................
                // Check if all Legumes Diet Pattern Roles are OK
                //...................................................................
                if (! this.isLegumesDietPatternOk (dp_legumes)) {
                  // if so breaks current iteration (not the loop), and continues with the next iteration
                  // continue;
                  // Debugging
                  if (this.isDebugMode) {
                    dp_legumes.status = "No";
                    dp_legumes.due_to = this.out_of_range;
                  }else{
                    continue;
                  }
                }
                //...................................................................
                // if OK, Passes all previous roles
                //...................................................................
                this.addDpLegumes(dp_legumes);
                // 
                // this.servings_calculation_result = 'success';
                //
              // } // legumes_d
            } // legumes_s2
          } // legumes_l
        } // legumes_s1
      } // legumes_b

      // Fats
      // -------------------------------------------------------------------------------------------------
      for (var fats_b = 0; fats_b <= upper_limit.fats; fats_b++) { // breakfast
        for (var fats_s1 = 0; fats_s1 <= upper_limit.fats; fats_s1++) { // snak1
          for (var fats_l = 0; fats_l <= upper_limit.fats_l; fats_l++) { // lunch
            for (var fats_s2 = 0; fats_s2 <= upper_limit.fats; fats_s2++) { // snak2
              // for (var fats_d = 0; fats_d <= upper_limit.fats; fats_d++) { // dinner
                //
                // Calculate dinner
                fats_d = servings.fats - (fats_b + fats_s1 + fats_l + fats_s2);
                if(fats_d < 0 || fats_d > upper_limit.fats){
                  continue;
                }
                // 
                dp_fats = {
                  breakfast: fats_b,
                  snak1: fats_s1,
                  lunch: fats_l,
                  snak2: fats_s2,
                  dinner: fats_d,
                  total: servings.fats,
                  // Debugging
                  status: "Yes",
                  due_to: " ",
                };
                // Debugging
                if (this.isDebugMode) {
                  dp_fats.status = "Yes";
                  dp_fats.due_to = " ";
                }
                //...................................................................
                // Check if all Fats Diet Pattern Roles are OK
                //...................................................................
                if (! this.isFatsDietPatternOk (dp_fats)) {
                  // if so breaks current iteration (not the loop), and continues with the next iteration
                  // continue;
                  // Debugging
                  if (this.isDebugMode) {
                    dp_fats.status = "No";
                    dp_fats.due_to = this.out_of_range;
                  }else{
                    continue;
                  }
                }
                //...................................................................
                // if OK, Passes all previous roles
                //...................................................................
                this.addDpFats(dp_fats);
                // 
                // this.servings_calculation_result = 'success';
                //
              // } // fats_d
            } // fats_s2
          } // fats_l
        } // fats_s1
      } // fats_b


      //
      // if (this.servings_calculation_result !== 'success') {
      //   this.servings_calculation_result = 'fail';
      // }
      // //
      // this.sortServings();
      // //
      // this.servings_calculation_status = 'finished';
      //
      // Measure Execution Time
      // *******************************
      var executionEnd = performance.now();
      var executionTime = executionEnd - executionStart;
      console.log('generateDietPatterns Execution time: ' + executionTime + ' ms.');
      // *******************************
      //



      //
    }, //endof: generateDietPatterns()


    // Show Specific bootstrap Tab
    // =========================================================================
    showTab: function (tab_id) {
      //
      $('a[href="#' + tab_id + '"]').tab('show');
      //
    },//endof: showTab

    // Set Food Group Diet Patterns values to The Diet Patterns Object  
    // =========================================================================
    setDpFoodGroup: function (food_group_name, food_group) {
      //
      eval('this.diet_pattern.' + food_group_name + '.breakfast = ' + food_group.breakfast);
      eval('this.diet_pattern.' + food_group_name + '.snak1     = ' + food_group.snak1);
      eval('this.diet_pattern.' + food_group_name + '.lunch     = ' + food_group.lunch);
      eval('this.diet_pattern.' + food_group_name + '.snak2     = ' + food_group.snak2);
      eval('this.diet_pattern.' + food_group_name + '.dinner    = ' + food_group.dinner);
      eval('this.diet_pattern.' + food_group_name + '.total     = ' + food_group.total);
      //
    },//endof: setDpFoodGroup

    // Set Food Group Diet Patterns values to The Diet Patterns Object  
    // =========================================================================
    setDpFoodGroupAndShowTab: function (food_group_name, food_group, tab_id) {
      //
      this.setDpFoodGroup(food_group_name, food_group);
      //
      this.showTab(tab_id);
      //
    },//endof: setDpFoodGroup





    //                                  ************************
    //                                  ***   Alternatives   ***
    //                                  ************************


    // reset Alternatives Array
    // =========================================================================
    resetAlternativesArray: function () {
      this.alternatives_array = [];
    },//endof: resetAlternativesArray
    
    // Adds an Alternative to the existing Alternatives array
    // =========================================================================
    addAlternative: function (alternative) {
      this.alternatives_array.push(alternative);
    },//endof: addAlternative

    // reset Starches
    // =========================================================================
    resetAltStarchesArray: function () {
      this.alt_starches_array = [];
    },//endof: resetAltStarchesArray
    
    // add Starches
    // =========================================================================
    addAltStarches: function (alt_starches) {
      this.alt_starches_array.push(alt_starches);
    },//endof: addAltStarches
    
    // reset Vegetables
    // =========================================================================
    resetAltVegetablesArray: function () {
      this.alt_vegetables_array = [];
    },//endof: resetAltVegetablesArray

    // add Vegetables
    // =========================================================================
    addAltVegetables: function (alt_vegetables) {
      this.alt_vegetables_array.push(alt_vegetables);
    },//endof: addAltVegetables

    // reset Fruits
    // =========================================================================
    resetAltFruitsArray: function () {
      this.alt_fruits_array = [];
    },//endof: resetAltFruitsArray
    
    // add Fruits
    // =========================================================================
    addAltFruits: function (alt_fruits) {
      this.alt_fruits_array.push(alt_fruits);
    },//endof: addAltFruits
    
    // reset Milk
    // =========================================================================
    resetAltMilkArray: function () {
      this.alt_milk_array = [];
    },//endof: resetAltMilkArray
    
    // add Milk
    // =========================================================================
    addAltMilk: function (alt_milk) {
      this.alt_milk_array.push(alt_milk);
    },//endof: addAltMilk
    
    // reset Meat
    // =========================================================================
    resetAltMeatArray: function () {
      this.alt_meat_array = [];
    },//endof: resetAltMeatArray
    
    // add Meat
    // =========================================================================
    addAltMeat: function (alt_meat) {
      this.alt_meat_array.push(alt_meat);
    },//endof: addAltMeat
    
    // reset Legumes
    // =========================================================================
    resetAltLegumesArray: function () {
      this.alt_legumes_array = [];
    },//endof: resetAltLegumesArray
    
    // add Legumes
    // =========================================================================
    addAltLegumes: function (alt_legumes) {
      this.alt_legumes_array.push(alt_legumes);
    },//endof: addAltLegumes
    
    // reset Fats
    // =========================================================================
    resetAltFatsArray: function () {
      this.alt_fats_array = [];
    },//endof: resetAltFatsArray
    
    // add Fats
    // =========================================================================
    addAltFats: function (alt_fats) {
      this.alt_fats_array.push(alt_fats);
    },//endof: addAltFats
    

    // select Recommended Meal Servings Servings number
    // =========================================================================
    selectRecommendedMealServings: function (item, meal) {
      //
      if (this.kcal < 1400) {
        kcal_id = 1000;
      } else if (this.kcal < 1900) {
        kcal_id = 1400;
      } else if (this.kcal < 2700) {
        kcal_id = 1900;
      } else {
        kcal_id = 2700;
      }
      //
      eval('rms = item.' + meal + '_' + kcal_id);
      //
      return rms;
    },//endof: selectRecommendedMealServings

    // select Foods By specific Food Group
    // =========================================================================
    selectFoodsByFoodGroup: function (food_group) {
      //
      var selected_array = this.foods_array.filter(function (item) {
        if (item.group == food_group) {
          return true;
        }
      }, this);
      //
      return selected_array;
    },//endof: selectFoodsByFoodGroup

    // select Foods for a meal By a specific Servings number
    // =========================================================================
    selectFoodsByServings: function (foods_array, meal, servings) {
      //
      var selected_array = [];
      if (servings <= 0) {        
        return selected_array;
      }

      selected_array = foods_array.filter(function (item) {
        rms = this.selectRecommendedMealServings(item, meal);
        if (rms == servings) {
          return true;
        }
      }, this);
      //
      return selected_array;
    },//endof: selectFoodsByServings


    //
    // Generate Alternatives
    // =================================================================================
    generateAlternatives: function () {
      //
      // Testing: Set Diet Patterns ----------------------------------------------
      // this pattern for 3016 kcal
      // ----------------------------
      this.diet_pattern.starches =   { breakfast:3, snak1:2, lunch:4, snak2:3, dinner:3, total:15, };
      this.diet_pattern.vegetables = { breakfast:1, snak1:1, lunch:2, snak2:1, dinner:1, total:6,  };
      this.diet_pattern.fruits =     { breakfast:1, snak1:2, lunch:0, snak2:3, dinner:2, total:8,  };
      this.diet_pattern.milk =       { breakfast:1, snak1:0, lunch:0, snak2:0, dinner:2, total:3,  };
      this.diet_pattern.meat =       { breakfast:1, snak1:1, lunch:3, snak2:1, dinner:2, total:8,  };
      this.diet_pattern.legumes =    { breakfast:2, snak1:0, lunch:0, snak2:0, dinner:0, total:2,  };
      this.diet_pattern.fats =       { breakfast:1, snak1:1, lunch:3, snak2:1, dinner:1, total:7,  };
      //
      // Testing: Set Foods Array (must be read from DB) ----------------------------------------------
      this.foods_array = [
        { id: 1, group: 'starches', amount: 0.25, unit: 'رغيف', name: 'عيش بلدي', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 4, s1_1000: 0, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 2, ln_1400: 3, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 4, compatible: '7,11,13,14,18,21,23,24,25,26,27,28,30,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 2, group: 'starches', amount: 0.5, unit: 'رغيف', name: 'عيش فينو', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 4, s1_1000: 0, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 2, ln_1400: 3, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 4, compatible: '' },
        { id: 3, group: 'starches', amount: 0.5, unit: 'رغيف', name: 'عيش كيزر', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 4, s1_1000: 0, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 2, ln_1400: 3, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 4, compatible: '' },
        { id: 4, group: 'starches', amount: 1, unit: 'شريحة', name: 'توست', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 4, s1_1000: 0, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 0, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 4, compatible: '' },
        { id: 5, group: 'starches', amount: 2, unit: 'أصابع', name: 'بقسماط', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 4, s1_1000: 0, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 0, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 4, compatible: '' },
        { id: 6, group: 'starches', amount: 1, unit: 'رغيف', name: 'تورتيلا', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 4, s1_1000: 0, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 2, ln_1400: 3, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 4, compatible: '' },
        { id: 7, group: 'starches', amount: 0.5, unit: 'ثمرة', name: 'بطاطس مسلوقه', bf_1000: 1, bf_1400: 2, bf_1900: 2, bf_2700: 2, s1_1000: 0, s1_1400: 0, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 2, ln_1900: 2, ln_2700: 2, s2_1000: 0, s2_1400: 0, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,20' },
        { id: 8, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'شوفان', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '' },
        { id: 9, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'بليلة', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '12,14,21,41,42,43,44,45,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,65,66,67,68,70,72,89,90,91,92,99' },
        { id: 10, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'كورن فليكس', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '12,14,21,41,42,43,44,45,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,65,66,67,68,70,72,89,90,91,92,99' },
        { id: 11, group: 'starches', amount: 0.5, unit: 'ثمرة', name: 'بطاطس مشوية', bf_1000: 1, bf_1400: 2, bf_1900: 2, bf_2700: 2, s1_1000: 0, s1_1400: 0, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 2, ln_1900: 2, ln_2700: 2, s2_1000: 0, s2_1400: 0, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,18,19,20,26,30,31,32,34,35,36,37,38,39,40,41,42,44,46,47,49,51,52,54,55,56,57,62,63,64,65,66,67,68,70,72,74,75,76,77,78,79,80,81,82,84,85,86,87,94,95,96,100,101,102' },
        { id: 12, group: 'starches', amount: 0.5, unit: 'ثمرة', name: 'بطاطا', bf_1000: 0, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 0, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '9,10,29,43,47,59,62,63,64,65,66,67,68,69,70,71,72,73,89,90,91,92,99,101' },
        { id: 13, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'قلقاس ', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 2, ln_2700: 2, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,19,20,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 14, group: 'starches', amount: 8, unit: 'قطعة', name: 'مقرمشات', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 2, s1_1900: 3, s1_2700: 3, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 3, s2_2700: 3, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,15,16,62,63,64,65,66,67,68,69,70,71,72,73,89,90,91,92,99' },
        { id: 15, group: 'starches', amount: 3, unit: 'قطعة', name: 'بسكوت تاك المملح', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 2, s1_1900: 3, s1_2700: 3, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 3, s2_2700: 3, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '14,16,62,63,64,65,66,67,68,69,70,71,72,73,89,90,91,92,99' },
        { id: 16, group: 'starches', amount: 3, unit: 'كوب', name: 'فيشار', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '14,15,62,63,64,65,66,67,89,90,91,92,99' },
        { id: 17, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'كسكسي', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 0, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '24,27,28,33,34,35,36,37,38,39,40,43,62,63,64,65,66,67,68,70,72,74,78,84,88,89,90,91,92,94,101' },
        { id: 18, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'ذرة مسلوقة', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 2, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,11,34,36,62,63,64,65,66,67,74,78,84,89,90,91,92,94,95,96,97,98,99,101' },
        { id: 19, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'شعرية', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '11,13,20,24,25,26,27,28,33,34,35,36,37,38,39,40,41,42,43,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,70,72,74,77,78,82,84,88,89,90,91,92,94,95,96,99,101' },
        { id: 20, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'أرز مصري', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '7,11,13,19,24,25,26,27,28,31,33,34,35,36,37,38,39,40,41,42,43,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,70,72,74,77,78,82,83,84,88,89,90,91,92,94,96,99,100,101' },
        { id: 21, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'جنين القمح', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,34,35,36,37,38,39,40,68,69,70,71,72,73' },
        { id: 22, group: 'starches', amount: 3, unit: 'ملعقة كبيرة', name: 'فريك', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '27,28,33,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,74,78,84,88,94,96,101' },
        { id: 23, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'بسلة خضراء مطهية', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 24, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'سبانخ مطهية', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,17,19,20,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 25, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'خرشوف مطهي', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,19,20,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 26, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'قرنبيط مطهي', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,19,20,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 27, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'بامية مطهية', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,17,19,20,22,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 28, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'كوسة مطهية', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,17,19,20,22,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 29, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'قرع عسلي مطهي', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '12,41,42,43,44,47,48,49,50,51,52,54,55,56,57,58,59,60,61,89,90,91,92,99,101' },
        { id: 30, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'بنجر مطهي', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,74,78,84,94,95,96,101' },
        { id: 31, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'فول أخضر مطهي', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '11,20,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,94,95,96,101' },
        { id: 32, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'بروكلي مطهي', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,74,78,84,94,95,96,101' },
        { id: 33, group: 'vegetables', amount: 0.5, unit: 'كوب', name: 'فاصوليا خضراء مطهية', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,17,19,20,22,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,74,78,84,94,96,101' },
        { id: 34, group: 'vegetables', amount: 1, unit: 'ثمرة', name: 'طماطم طازجة', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 3, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '1,11,13,17,18,19,20,21,22,23,24,25,26,27,28,30,31,32,33,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,95,96,97,98,100,101,102' },
        { id: 35, group: 'vegetables', amount: 1, unit: 'ثمرة', name: 'خيار طازج', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 3, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '1,11,13,17,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,95,96,97,98,100,101,102' },
        { id: 36, group: 'vegetables', amount: 1, unit: 'ثمرة', name: 'فلفل طازج', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 3, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '1,11,13,17,18,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,95,96,97,98,100,101,102' },
        { id: 37, group: 'vegetables', amount: 1, unit: 'كوب', name: 'كرنب طازج', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,13,17,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,95,96,97,98,100,101,102' },
        { id: 38, group: 'vegetables', amount: 1, unit: 'ثمرة', name: 'جزر طازج', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,13,17,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,95,96,97,98,100,101,102' },
        { id: 39, group: 'vegetables', amount: 1, unit: 'ثمرة', name: 'بصل أخضر طازج', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,13,17,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,95,96,97,98,100,101,102' },
        { id: 40, group: 'vegetables', amount: 1, unit: 'ثمرة', name: 'بصل طازج', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,13,17,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38,39,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,95,96,97,98,100,101,102' },
        { id: 41, group: 'fruits', amount: 1, unit: 'ثمرة صغيرة', name: 'تفاح', bf_1000: 1, bf_1400: 2, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,44,46,47,48,49,50,51,52,54,55,56,57,58,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,99' },
        { id: 42, group: 'fruits', amount: 4, unit: 'ثمرة', name: 'مشمش طازج', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,44,46,47,48,49,50,51,52,54,55,56,57,58,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,99' },
        { id: 43, group: 'fruits', amount: 4, unit: 'ثمرة', name: 'مشمش مجفف', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '9,10,12,17,19,20,29,89,90,91,92,99' },
        { id: 44, group: 'fruits', amount: 1, unit: 'ثمرة صغيرة', name: 'موز', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,46,47,48,49,50,51,52,54,55,56,57,58,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,99' },
        { id: 45, group: 'fruits', amount: 0.75, unit: 'كوب', name: 'توت أسود', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '9,10,89,90,91,92' },
        { id: 46, group: 'fruits', amount: 1, unit: 'كوب', name: 'كانتلوب', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,30,31,33,34,35,36,37,38,39,40,41,42,44,47,48,49,50,51,52,54,55,56,57,58,60,69,71,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,92,93,99' },
        { id: 47, group: 'fruits', amount: 3, unit: 'ثمرة', name: 'بلح', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,12,13,23,24,25,26,27,28,29,33,34,35,36,37,38,39,40,41,42,44,46,48,49,51,52,54,55,56,57,58,60,68,69,70,71,72,73,89,90,91,92,93,99,101' },
        { id: 48, group: 'fruits', amount: 2, unit: 'ثمرة', name: 'تين', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,49,50,51,52,54,55,56,57,58,60,61,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,99,100,101,102' },
        { id: 49, group: 'fruits', amount: 0.5, unit: 'ثمرة كبيرة', name: 'جريب فروت', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,50,51,52,54,55,56,57,58,60,61,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,99,100,101,102' },
        { id: 50, group: 'fruits', amount: 17, unit: 'ثمرة صغيرة', name: 'عنب', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,48,49,51,52,54,55,56,57,58,60,61,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,99,100,101,102' },
        { id: 51, group: 'fruits', amount: 1, unit: 'ثمرة', name: 'كيوى', bf_1000: 1, bf_1400: 2, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,52,54,55,56,57,58,60,61,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,99,100,101,102' },
        { id: 52, group: 'fruits', amount: 1, unit: 'ثمرة كبيرة', name: 'يوسفى ماندارين', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,54,55,56,57,58,60,61,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,99,100,101,102' },
        { id: 53, group: 'fruits', amount: 0.5, unit: 'كوب', name: 'مانجو قطع', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '89,90,91,92,99' },
        { id: 54, group: 'fruits', amount: 1, unit: 'ثمرة صغيرة', name: 'برتقال', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,55,56,57,58,60,69,71,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,92,93,99' },
        { id: 55, group: 'fruits', amount: 1, unit: 'ثمرة', name: 'خوخ', bf_1000: 1, bf_1400: 2, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,56,57,58,60,69,71,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,92,93,99' },
        { id: 56, group: 'fruits', amount: 1, unit: 'ثمرة', name: 'كمثرى', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,57,58,60,69,71,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,92,93,99' },
        { id: 57, group: 'fruits', amount: 0.75, unit: 'كوب', name: 'الأناناس الطازج', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,58,60,69,71,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,92,93,99' },
        { id: 58, group: 'fruits', amount: 2, unit: 'ثمرة صغيرة', name: 'برقوق طازج', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,60,69,71,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,92,93,99' },
        { id: 59, group: 'fruits', amount: 3, unit: 'ثمرة', name: 'قراصيا', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,12,29,68,70,72,89,90,91,92,93,99,101' },
        { id: 60, group: 'fruits', amount: 1.25, unit: 'كوب', name: 'فراولة قطع', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,46,47,48,49,50,51,52,54,55,56,57,58,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 61, group: 'fruits', amount: 1.25, unit: 'كوب', name: 'بطيخ مكعبات', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,13,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,48,49,50,51,52,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 62, group: 'fruits', amount: 0.5, unit: 'كوب', name: 'عصير التفاح', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,11,12,14,15,16,17,18,19,20,22,30,31,32,34,35,36,37,38,39,40,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 63, group: 'fruits', amount: 0.5, unit: 'كوب', name: 'عصير كوكتيل', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,11,12,14,15,16,17,18,19,20,22,30,31,32,34,35,36,37,38,39,40,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 64, group: 'fruits', amount: 0.5, unit: 'كوب', name: 'عصير العنب', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,11,12,14,15,16,17,18,19,20,22,30,31,32,34,35,36,37,38,39,40,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 65, group: 'fruits', amount: 0.5, unit: 'كوب', name: 'عصير جريب فروت', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,12,14,15,16,17,18,19,20,22,30,31,32,34,35,36,37,38,39,40,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 66, group: 'fruits', amount: 0.5, unit: 'كوب', name: 'عصير برتقال', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,12,14,15,16,17,18,19,20,22,30,31,32,34,35,36,37,38,39,40,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 67, group: 'fruits', amount: 0.5, unit: 'كوب', name: 'عصير أناناس', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,9,10,11,12,14,15,16,17,18,19,20,22,30,31,32,34,35,36,37,38,39,40,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102' },
        { id: 68, group: 'milk', amount: 1, unit: 'كوب', name: 'لبن خالي الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,12,14,15,17,19,20,21,34,35,36,37,38,39,40,41,42,44,47,48,49,50,51,52,59,75,76,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 69, group: 'milk', amount: 1, unit: 'كوب', name: 'زبادي خالي الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,12,14,15,21,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,75,76,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 70, group: 'milk', amount: 1, unit: 'كوب', name: 'لبن قليل الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,12,14,15,17,19,20,21,34,35,36,37,38,39,40,41,42,44,47,48,49,50,51,52,59,75,76,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 71, group: 'milk', amount: 1, unit: 'كوب', name: 'زبادي قليل الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,12,14,15,21,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,75,76,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 72, group: 'milk', amount: 1, unit: 'كوب', name: 'لبن كامل الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,11,12,14,15,17,19,20,21,34,35,36,37,38,39,40,41,42,44,47,48,49,50,51,52,59,75,76,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 73, group: 'milk', amount: 1, unit: 'كوب', name: 'زبادي كامل الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,12,14,15,21,34,35,36,37,38,39,40,41,42,44,46,47,48,49,50,51,52,54,55,56,57,58,75,76,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 74, group: 'meat', amount: 30, unit: 'جم', name: 'لحم بقري ستيك خالي من الدهون', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 3, ln_1400: 4, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,13,17,18,19,20,22,23,24,25,26,27,28,30,32,33,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,88,94,96,101' },
        { id: 75, group: 'meat', amount: 1, unit: 'قطعة', name: 'جبن قريش', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 76, group: 'meat', amount: 1, unit: 'معلقة كبيرة', name: 'جبن خالي الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,77,79,80,81,82,85,86,87,93,94,95,96,101,102' },
        { id: 77, group: 'meat', amount: 2, unit: 'وحدة', name: 'بياض البيض', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,19,20,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,79,80,81,85,86,87,93,94,95,96,101,102' },
        { id: 78, group: 'meat', amount: 30, unit: 'جم', name: 'فراخ بدون جلد خالي من الدهون ', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 3, ln_1400: 4, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,13,17,18,19,20,22,23,24,25,26,27,28,30,32,33,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,94,95,96,101' },
        { id: 79, group: 'meat', amount: 1, unit: 'معلقة كبيرة', name: 'جبن قليل الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,82,85,87,93,94,95,96,101,102' },
        { id: 80, group: 'meat', amount: 1, unit: 'معلقة كبيرة', name: 'جبن ريكوتا قليل الدسم ', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,82,85,87,93,94,95,96,101,102' },
        { id: 81, group: 'meat', amount: 1, unit: 'معلقة كبيرة', name: 'جبن فيتا قليل الدسم', bf_1000: 1, bf_1400: 1, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 2, dn_2700: 2, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,82,85,87,93,94,95,96,101,102' },
        { id: 82, group: 'meat', amount: 1, unit: 'وحدة', name: 'بيض', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 2, ln_1900: 2, ln_2700: 2, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,19,20,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,79,80,81,85,86,87,94,95,96,101,102' },
        { id: 83, group: 'meat', amount: 1, unit: 'وحدة', name: 'سمكة صغيرة مقلية قليل الدسم', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 3, ln_1400: 4, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,20,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,94,96,100,101' },
        { id: 84, group: 'meat', amount: 30, unit: 'جم', name: 'فراخ بجلد قليل الدسم', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 3, ln_1400: 4, ln_1900: 4, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,13,17,18,19,20,22,23,24,25,26,27,28,30,32,33,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,88,94,96,101' },
        { id: 85, group: 'meat', amount: 3, unit: 'شريحة', name: 'بيكون ديك رومي  ', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,79,80,81,82,86,87,93,94,95,96,101,102' },
        { id: 86, group: 'meat', amount: 1, unit: 'شريحة', name: 'جبن شيدر', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,48,49,50,51,52,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,82,85,87,93,94,95,96,101,102' },
        { id: 87, group: 'legumes', amount: 3, unit: 'معلقة كبيرة', name: 'فول مدمس', bf_1000: 1, bf_1400: 2, bf_1900: 3, bf_2700: 3, s1_1000: 1, s1_1400: 1, s1_1900: 2, s1_2700: 2, ln_1000: 1, ln_1400: 3, ln_1900: 3, ln_2700: 3, s2_1000: 1, s2_1400: 1, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 2, dn_1900: 3, dn_2700: 3, compatible: '1,11,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,79,80,81,82,85,86,93,94,95,96,100,101,102' },
        { id: 88, group: 'legumes', amount: 0.5, unit: 'كوب', name: 'لوبيا / فاصوليا بيضاء', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 3, ln_2700: 4, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,17,19,20,22,34,35,36,37,38,39,40,41,42,44,46,48,49,50,51,52,54,55,56,57,58,74,84,94,96,101' },
        { id: 89, group: 'fats', amount: 6, unit: 'حبات', name: 'لوز', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,12,14,15,16,17,18,19,20,29,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,90,91,92,93,99,101' },
        { id: 90, group: 'fats', amount: 6, unit: 'حبات', name: 'كاجو', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,12,14,15,16,17,18,19,20,29,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,89,91,92,99,101' },
        { id: 91, group: 'fats', amount: 10, unit: 'حبات', name: 'فول سودانى', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,12,14,15,16,17,18,19,20,29,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,89,90,92,93,99,101' },
        { id: 92, group: 'fats', amount: 5, unit: 'حبات', name: 'بندق', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,12,14,15,16,17,18,19,20,29,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,89,90,91,93,99,101' },
        { id: 93, group: 'fats', amount: 1, unit: 'ملعقة كبيرة', name: 'زبدة الفول السوداني', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,79,80,81,85,86,87,89,91,92,94,95' },
        { id: 94, group: 'fats', amount: 1, unit: 'ملعقة صغيرة', name: 'زيت صحي', bf_1000: 1, bf_1400: 2, bf_1900: 2, bf_2700: 2, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 2, ln_1400: 3, ln_1900: 3, ln_2700: 4, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 2, dn_1900: 2, dn_2700: 2, compatible: '1,11,13,17,18,19,20,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38,39,40,48,49,50,51,52,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,93,95,96,97,98,100,101,102' },
        { id: 95, group: 'fats', amount: 8, unit: 'حبات', name: 'زيتون أسود', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,18,19,30,31,32,34,35,36,37,38,39,40,48,49,50,51,52,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,78,79,80,81,82,85,86,87,93,94,101,102' },
        { id: 96, group: 'fats', amount: 10, unit: 'حبات', name: 'زيتون أخضر', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,13,18,19,20,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38,39,40,48,49,50,51,52,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,94,97,98,100,101,102' },
        { id: 97, group: 'fats', amount: 1, unit: 'معلقة كبيرة', name: 'مايونيز قليل الدسم', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,18,34,35,36,37,38,39,40,60,61,62,63,64,65,66,67,94,96' },
        { id: 98, group: 'fats', amount: 2, unit: 'معلقة صغيرة', name: 'مايونيز', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 1, ln_1900: 1, ln_2700: 1, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,18,34,35,36,37,38,39,40,60,61,62,63,64,65,66,67,94,96' },
        { id: 99, group: 'fats', amount: 2, unit: 'ثمرة', name: 'عين الجمل', bf_1000: 0, bf_1400: 0, bf_1900: 0, bf_2700: 0, s1_1000: 1, s1_1400: 2, s1_1900: 2, s1_2700: 2, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 2, s2_1900: 2, s2_2700: 2, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,9,10,12,14,15,16,18,19,20,29,41,42,43,44,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,89,90,91,92' },
        { id: 100, group: 'fats', amount: 2, unit: 'معلقة صغيرة', name: 'طحينة', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 2, ln_2700: 2, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,20,34,35,36,37,38,39,40,48,49,50,51,52,60,61,62,63,64,65,66,67,83,87,94,96' },
        { id: 101, group: 'fats', amount: 1, unit: 'معلقة صغيرة', name: 'زبدة', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 0, s1_1400: 0, s1_1900: 0, s1_2700: 0, ln_1000: 1, ln_1400: 2, ln_1900: 2, ln_2700: 2, s2_1000: 0, s2_1400: 0, s2_1900: 0, s2_2700: 0, dn_1000: 0, dn_1400: 0, dn_1900: 0, dn_2700: 0, compatible: '1,11,12,13,17,18,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,47,48,49,50,51,52,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,94,95,96,102' },
        { id: 102, group: 'fats', amount: 1, unit: 'معلقة كبيرة', name: 'جبن كريمي', bf_1000: 1, bf_1400: 1, bf_1900: 1, bf_2700: 1, s1_1000: 1, s1_1400: 1, s1_1900: 1, s1_2700: 1, ln_1000: 0, ln_1400: 0, ln_1900: 0, ln_2700: 0, s2_1000: 1, s2_1400: 1, s2_1900: 1, s2_2700: 1, dn_1000: 1, dn_1400: 1, dn_1900: 1, dn_2700: 1, compatible: '1,11,34,35,36,37,38,39,40,48,49,50,51,52,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,79,80,81,82,85,86,87,94,95,96,101' },

      ];
      //
      // Testing: Reduce number of items in DP Arrays to 1 item each ----------------------------------------------
      this.dp_starches_array    = this.dp_starches_array.slice  (3, 5);
      this.dp_vegetables_array  = this.dp_vegetables_array.slice(3, 4);
      this.dp_fruits_array      = this.dp_fruits_array.slice    (10, 11);
      this.dp_milk_array        = this.dp_milk_array.slice      (0, 1);
      this.dp_meat_array        = this.dp_meat_array.slice      (5, 6);
      this.dp_legumes_array     = this.dp_legumes_array.slice   (0, 1);
      this.dp_fats_array        = this.dp_fats_array.slice      (9, 10);
      // endof: Testing ===============================================

      // reset Alternative Arrays
      // ------------------------
      this.resetAltStarchesArray();
      this.resetAltVegetablesArray();
      this.resetAltFruitsArray();
      this.resetAltMilkArray();
      this.resetAltMeatArray();
      this.resetAltLegumesArray();
      this.resetAltFatsArray();
      
      // Starches
      // ------------------------------------------------------------------------------------------
      // set foods_starches_array
      // ------------------------
      foods_starches_array = this.selectFoodsByFoodGroup('starches');

      // loop for each item in Diet Pattern Starches array
      // -------------------------------------------------
      this.dp_starches_array.forEach(function(dp_food_group) {

        // alert(dp_food_group.breakfast);

        //
        var foods_st_bf_array = this.selectFoodsByServings(foods_starches_array, 'bf', dp_food_group.breakfast);
        //
        foods_st_bf_array.forEach(function(bf) {
          //
          rms = this.selectRecommendedMealServings(bf, 'bf');

          starches_bf  = bf.amount * rms + ' ' + bf.unit + ' ' + bf.name;
          //
          alt_starches = {
            breakfast:  starches_bf,
            breakfast_test:  bf,
            snak1:      0,//starches_s1,
            lunch:	    0,//starches_ln,
            snak2:      0,//starches_s2,
            dinner:     0,//starches_dn,
          };        
          this.addAltStarches(alt_starches);
          //  
        }, this);









      }, this);

      //
    },//endof: generateAlternatives






  } //endof: methods

});