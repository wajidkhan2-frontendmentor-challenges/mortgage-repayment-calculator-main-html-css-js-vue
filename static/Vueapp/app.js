// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
// import { createApp } from 'http://127.0.0.1:5500/mortgage-repayment-calculator-main/static/Vueapp/vue@3/vue.esm-browser.js'
import { createApp } from './vue@3/vue.esm-browser.js'

createApp({
    data() {
        return {
            result_window: true,

            // Mortgage_Type: 'Repayment',
            // loan: 300000,
            // term: 25,
            // interest: 5.25,
            

            loan: null,
            term: null,
            interest: null,
            Mortgage_Type: null,

            loanError: false,
            termError: false,
            interestError: false,
            Mortgage_TypeError: false,

            monthly_repayments: 0,
            Total_repay_over_term: 0,
        }
    },
    // created() {
        

    // },

    methods: {
        oninputClear(e) {
            this.result_window = true;

            this.loan = null;
            this.term = null;
            this.interest = null;
            this.$refs.loanref.value = '';
            this.$refs.termref.value = '';
            this.$refs.interestref.value = '';

            this.monthly_repayments = 0;
            this.Total_repay_over_term = 0;

            this.Mortgage_Type = null;
            this.$refs.Repaymentradioref.checked = false;
            this.$refs.InterestOnlyradioref.checked = false;

            this.loanError = false;
            this.termError = false;
            this.interestError = false;
            this.Mortgage_TypeError = false;
        },

        oninputLoan(e) {
            this.loan = e.target.value
        },

        oninputTerm(e) {
            this.term = e.target.value
        },

        oninputInterest(e) {
            this.interest = e.target.value
        },

        oninputMortgageType(e) {
            this.Mortgage_Type = e.target.value
        },

        formSubmit(e) {
            e.preventDefault();

            let Cerror = 0
            if (this.loan == null) {
                this.loanError = true;
                Cerror += 1;
            } else { this.loanError = false; }

            if (this.term == null) {
                this.termError = true;
                Cerror += 1;
            } else { this.termError = false; }

            if (this.interest == null) {
                this.interestError = true;
                Cerror += 1;
            } else { this.interestError = false; }

            if (this.Mortgage_Type == null) {
                this.Mortgage_TypeError = true;
                Cerror += 1;
            } else { this.Mortgage_TypeError = false; }
            

            if (Cerror == 0){
                if (this.Mortgage_Type == 'Repayment')
                {
                    this.Repayments()
                }
    
                if (this.Mortgage_Type == 'InterestOnly')
                {
                    this.InterestOnly()
                }
                this.result_window = false;
            }           
        },

        Repayments() {
            let loan = this.loan;
            let term = this.term;
            let interest = this.interest;

            let P = loan;
            let R = interest/100;
            let N = 12;
            let T = term;

            let divident = P*(R/N);

            let power = N * T
            power = power * -1

            let divisorn = 1 + R / N;
            divisorn = Math.pow(divisorn, power);
            divisorn = 1 - divisorn;

            let MP = divident / divisorn

            this.monthly_repayments = MP.toFixed(2);

            let TT = (MP * N) * T;
            this.Total_repay_over_term = TT.toFixed(2)
        },

        InterestOnly() {
            let loan = this.loan;
            let term = this.term;
            let interest = this.interest;

            let P = loan;
            let R = interest/100;
            let N = 12;
            let T = term;


            let RR = R / 12;

            let MP = P * RR;
            this.monthly_repayments = MP.toFixed(2);

            let TT = (MP * N) * T;
            this.Total_repay_over_term = TT.toFixed(2)

        }
    }
}).mount('#app')