import { createApp } from './vue@3/vue.esm-browser.js'

createApp({
    data() {
        return {
            result_window: true,

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

            this.$refs.ErrorList.innerHTML = '';
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

            let ErrorMap = new Map();
            let ErrorCounter = 0;

            if (this.loan == null) {

                this.loanError = true;

                ErrorCounter += 1;

                ErrorMap.set("Mortgage Amount", {
                    inpid: "#input-mortgage-amount", for: "Mortgage Amount", errormsg: "Mortgage Amount is required"
                });

            } else { this.loanError = false; }

            if (this.term == null) {

                this.termError = true;

                ErrorCounter += 1;

                ErrorMap.set("Mortgage Term", {
                    inpid: "#input-mortgage-term", for: "Mortgage Term", errormsg: "Mortgage Term is required"
                });

            } else { this.termError = false; }

            if (this.interest == null) {

                this.interestError = true;
                
                ErrorCounter += 1;

                ErrorMap.set("Interest Rate", {
                    inpid: "#input-mortgage-interest", for: "Interest Rate", errormsg: "Interest Rate is required"
                });

            } else { this.interestError = false; }

            if (this.Mortgage_Type == null) {

                this.Mortgage_TypeError = true;

                ErrorCounter += 1;

                ErrorMap.set("Mortgage Type", {
                    inpid: "#Repaymentradio", for: "Mortgage Type", errormsg: "Mortgage Type is required"
                });

            } else { this.Mortgage_TypeError = false; }
            

            if (ErrorCounter == 0){
                if (this.Mortgage_Type == 'Repayment')
                {
                    this.Repayments()
                }
    
                if (this.Mortgage_Type == 'InterestOnly')
                {
                    this.InterestOnly()
                }

                this.result_window = false;

                this.$refs.MortgageRepayments.focus();

            } else {
                let errorstring = "";
                ErrorMap.forEach(function(value, key, map) {
                    errorstring += `<li><a href="${value.inpid}" data-srfocus="${value.inpid}" >${value.errormsg}</a></li>`
                });

                this.$refs.ErrorList.innerHTML = `
                    <h2>please fix errors</h2>
                    <ul id="error-message-list">
                    ${errorstring}
                    </ul>
                `;

                this.$refs.ErrorList.focus()
            }          
        },

        Repayments() {
            // Principal loan amount
            let P = this.loan;

            // annual interest rate
            let R = this.interest / 100;

            // number of payment made every year
            let N = 12;

            // term of loan
            let T = this.term;

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
            // Principal loan amount
            let P = this.loan;

            // annual interest rate
            let R = this.interest / 100;

            // number of payment made every year
            let N = 12;

            // term of loan
            let T = this.term;

            let RR = R / 12;

            let MP = P * RR;
            this.monthly_repayments = MP.toFixed(2);

            let TT = (MP * N) * T;
            this.Total_repay_over_term = TT.toFixed(2)

        }
    }
}).mount('#app')