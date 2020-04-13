<template>
  <div class="page-cntr row center">
    <div class="page-wrap col pull-left">
      <div class="page__filter-cntr">

      </div>
      <div class="section-cntr">
        <div class="section__head">
          Pass Holders
        </div>
        <div class="section__body">
          <div class="section__body-filter-cntr row pull-right">
            <div class="ip__checkbox row center">
              <input type="checkbox" name="exclude_essential_workers">
              <label for="exclude_essential_workers">Exclude Essential Workers</label>
            </div>
          </div>
        </div>
        <table class="pass_holder-tbl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Barangay</th>
              <th>Time out</th>
              <th>Duration</th>
              <th>Time in</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pass, index) in passes" :key=index>
              <td>{{ `${pass.holder.first_name} ${pass.holder.last_name}` }}</td>
              <td>{{ pass.barangay }}</td>
              <td>{{ new Date(pass.check_out.seconds * 1000) | moment("h:mma") }}</td>
              <td :class="{'duration_done': !!pass.check_in}">{{ getTimeDuration(pass.check_out, pass.check_in || currentTime, !!!pass.check_in) }}</td>
              <td :class="{'still_out': !!!pass.check_in}">{{ getCheckinValue(pass.check_in) }}</td>
              <td>{{ pass.purpose }}</td>
            </tr>
            <tr>
              <td colspan="6">
                <div class="row pull-apart table-footer">
                  <div class="table-total">
                    256 total today as of {{ this.$moment(currentTime.seconds * 1000).format('h:mm:ssa, MMMM D') }}.
                  </div>
                  <div class="table-action">
                    View all
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {fireDb} from '~/plugins/firebase.js'
import StatCard from '~/components/StatCard.vue'

export default {
  components: {
    StatCard
  },
  data() {
    return {
      passes: [],
      isLoading: 'true',
      currentTime: {
        'seconds': (new Date().getTime())/1000
      }
    }
  },
  mounted() {
    fireDb
      .collection('passes')
      .where('check_out', '>=', this.getCurrentStartOfDay.toDate())
      .orderBy('check_out', 'desc')
      .limit(5)
      .onSnapshot(querySnapshot => {
        let queryPasses = [];

        querySnapshot.forEach(documentSnapshot => {
          queryPasses.push(documentSnapshot.data());
        });

        this.passes = queryPasses;
        this.isLoading = false;
      })
    setInterval(() => {
      this.currentTime = {
        'seconds': (new Date().getTime())/1000
      }
    }, 1000);
  },
  methods: {
    epochToHumanTime: function(epoch) {
      var currDivisor = [1,60,60,24,7,4, 12];
      var unitTime = ['s','m','h',' day',' week', ' month'];
      var sentence = "";
      var majorTime;
      var minorTime = 0;
      var majorTimeUnit;
      var minorTimeUnit = '';
      var i = 0;
      var majorTimePhrase;
      var minorTimePhrase;

      majorTime = epoch;

      for(let realTime = 1; i < currDivisor.length; i++){
        majorTime /= currDivisor[i];
        realTime *= currDivisor[i+1];

        if((epoch) < (realTime)) break;
      }

      minorTime = Math.floor(parseFloat((majorTime - Math.floor(majorTime))*currDivisor[i]).toPrecision(12));
      majorTime = Math.floor(majorTime);
      majorTimeUnit = unitTime[i];
      if(i > 0){
        minorTimeUnit = unitTime[i-1];
      }

      majorTimePhrase = `${majorTime}${majorTimeUnit}${majorTime > 1 ? '' : ''}`;
      minorTimePhrase = `${minorTime}${minorTimeUnit}${minorTime > 1 ? '' : ''}`;

      sentence = `${majorTimePhrase}${i > 0 && minorTime != 0 ? ' ' : ''}${i == 0 ? '' : ''}${ minorTime == 0 ? '' : i == 0 ? '' : minorTimePhrase + '' }`;
      return sentence;
    },
    getTimeDuration: function(timeOut, timeIn, onGoing) {
      let suffix = '';

      if(onGoing) {
        suffix = '...';
      }
      let diff = this.$moment(timeIn.seconds * 1000).diff(this.$moment(timeOut.seconds * 1000), 'seconds', true);
      return this.epochToHumanTime(diff) + suffix;
    },
    getCheckinValue(time) {
      try {
        if(!!time) {
          if(!!time.seconds) {
            return this.$moment(time.seconds * 1000).format('h:mma');
          }
        }
      } catch (error) {}
      return '- -';
    }
  },
  computed: {
    getCurrentStartOfDay() {
      let moment = this.$moment;
      let local = moment().local();

      let currentDay = moment(moment([
        local.year(),
        local.month(),
        local.date(),
        0,
        0
      ]));

      return currentDay;
    }
  }
}
</script>

<style lang="scss">
  .container {
    padding: $inset-gutter;
  }

  .page-wrap {
    max-width: $max-width-container + $inset-gutter*2;
    width: 100%;
  }

  .page__filter-cntr {
    margin: $space__base-6 0;
  }

  .section__body-filter-cntr {
    margin: $space__base-1 0;
  }

  .tb-col {
    white-space: nowrap;
    &+.tb-col {
      margin-left: $space__base-5;
    }
  }

  .tb-col-1 {
    max-width: 36rem;
    width: 100%;
  }

  .ip__checkbox {
    label {
      margin-left: 6px;
      font-size: 12px;
      font-weight: 500;
      color: $color__slate-2;
    }
    input[type='checkbox'] {
      -webkit-appearance:button;
      background-color: $color__dark;
      border: 1px solid rgba(0, 0, 0, .05);
    }
  }

  .pass_holder-tbl {
    margin: $space__base-2 0;
    box-shadow: $shadow__natural--low_contrast;
  }


  /*
	Max width before this PARTICULAR table gets nasty. This query will take effect for any screen smaller than 760px and also iPads specifically.
	*/
	@media
	  only screen
    and (max-width: 620px)  {

		/* Force table to not be like tables anymore */
		table, thead, tbody, th, td, tr {
			display: block;
		}

		/* Hide table headers (but not display: none;, for accessibility) */
		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

    tr {
      margin: 0 0 1rem 0;
    }

    tr:nth-child(odd) {
      background: #ccc;
    }

		td {
			/* Behave  like a "row" */
			border: none;
			border-bottom: 1px solid #eee;
			position: relative;
			padding-left: 50%;
		}

		td:before {
			/* Now like a table header */
			position: absolute;
			/* Top/left values mimic padding */
			top: 0;
			left: 6px;
			width: 45%;
			padding-right: 10px;
			white-space: nowrap;
		}

		/*
		Label the data
    You could also use a data-* attribute and content for this. That way "bloats" the HTML, this way means you need to keep HTML and CSS in sync. Lea Verou has a clever way to handle with text-shadow.
		*/
		td:nth-of-type(1):before { content: "First Name"; }
		td:nth-of-type(2):before { content: "Last Name"; }
		td:nth-of-type(3):before { content: "Job Title"; }
		td:nth-of-type(4):before { content: "Favorite Color"; }
		td:nth-of-type(5):before { content: "Wars of Trek?"; }
		td:nth-of-type(6):before { content: "Secret Alias"; }
		td:nth-of-type(7):before { content: "Date of Birth"; }
		td:nth-of-type(8):before { content: "Dream Vacation City"; }
		td:nth-of-type(9):before { content: "GPA"; }
    td:nth-of-type(10):before { content: "Arbitrary Data"; }
  }

  @media
    only screen
    and (min-width: 621px) {

    td, th {
      padding: 0 $inset-gutter;
      &:nth-child(1) {
        max-width: 10rem;
      }
      &:nth-child(2) {
        max-width: 9rem;
      }
      &:last-child {
        max-width: 14rem;
      }
    }

    th {
      &:nth-child(3), &:nth-child(4) {
        padding-right: 1rem;
      }
    }

    td {
      padding-top: $space__base-3;
      padding-bottom: $space__base-3;
      font-size: 14px;
      font-weight: 500;
      color: $color__slate-3;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        &:nth-child(even) {
          opacity: .8;
        }
        &:nth-last-child(2) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.025);
        }
        &:last-child {
          border-bottom: none;
          td {
            padding-bottom: $inset-gutter;
            padding-top: $inset-gutter;
          }
        }
      }
      border-right: $inset-gutter*2 solid $color__black;
      border-left: $inset-gutter*2 solid $color__black;
    }

    th {
      text-align: left;
      padding-right: 2rem;
      padding-bottom: $space__base-2;
      padding-top: $space__base-2;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 500;
      color: $color__slate-gray;
    }

    thead {
      border-top-right-radius: $border_radius-2;
      border-top-left-radius: $border_radius-2;
      background-color: #202A39;
    }

    tbody {
      background-color: $color__black;
    }

    table {
      border-collapse: collapse;
      border-radius: $border_radius-2;
      overflow: hidden;
    }

    table, th, td {
      border: none;
    }

    .table-total {
      font-size: 13px;
      color: $color__slate-gray;
    }

    .duration_done {
      color: $color__green-primary
    }

    .still_out {
      font-weight: 400;
      font-style: italic;
      color: $color__slate-gray;
      text-align: center;
    }
  }
</style>
