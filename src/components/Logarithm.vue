<template>
    <v-container class="grid"> 
        <section class="answerPanel">
            <!-- Mode -->
            <span class="mode">{{ mode }}</span>

            <!-- Logarithm Answer -->
            <table id="twoBy2B" class="table w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showLogarithm">
                <tbody>
                    <tr>
                        <td><p><span class="log">log</span><sub class="base">{{ base }}</sub><span class="num"> {{ num }}</span><span  class="logEqual"> {{ logEqual }} </span> <span class="logAns">{{ logAns }}</span></p></td>
                    </tr>
                </tbody>
            </table>

            <!-- Antilogarithm Answer -->
             <table id="twoBy2B" class="table w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showAntiLogarithm">
                <tbody>
                    <tr>
                        <td><p><span class="log">log</span><sup>-1</sup><sub class="base">{{ base }}</sub><span class="num"> {{ logAns }}</span><span  class="logEqual"> {{ logEqual }} </span> <span class="logAns">{{ num }}</span></p></td>
                    </tr>
                </tbody>
            </table>

            <!-- Natural Logarithm Answer -->
            <table id="twoBy2B" class="table w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showNaturalLogarithm">
                <tbody>
                    <tr>
                        <td><p><span class="log">log</span><sub class="base">{{ natLogBase }}</sub><span class="num"> {{ natLogNum }}</span><span  class="logEqual"> {{ logEqual }} </span> <span class="logAns">{{ natLogAns }}</span></p></td>
                    </tr>
                </tbody>
            </table>

             <!-- Inverse Natural Logarithm Answer -->
            <table id="twoBy2B" class="table w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showInverseNaturalLogarithm">
                <tbody>
                    <tr>
                        <td><p><span class="log">log</span><sup>-1</sup><sub class="base">{{ natLogBase }}</sub><span class="num"> {{ natLogAns }}</span><span  class="logEqual"> {{ logEqual }} </span> <span class="logAns">{{ natLogNum }}</span></p></td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="method"><span id="method">{{ method }}</span></section>
        
        <section class="matrix">
            <!-- Logarithm inputs -->
            <table id="twoBy2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr" v-show="showLogarithm">
                <tbody>
                    <tr><td><input :type="type" v-model.number="num" v-on:keyup="getLogarithm()" size="4" class="entry" placeholder="Number"></td></tr>
                    <tr><td><input :type="type" v-model.number="base" v-on:keyup="getLogarithm()" size="4" class="entry" placeholder="Base"></td></tr>
                </tbody>
            </table>

            <!-- Antilogarithm Inputs -->
            <table id="twoBy2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr" v-show="showAntiLogarithm">
                <tbody>
                    <tr><td><input :type="type" v-model.number="logAns" v-on:keyup="getAntiLogarithm()" size="4" class="entry" placeholder="Logarithm"></td></tr>
                    <tr><td><input :type="type" v-model.number="base" v-on:keyup="getAntiLogarithm()" size="4" class="entry" placeholder="Base"></td></tr>
                </tbody>
            </table>

            <!-- Natural Logarithm Inputs -->
            <table id="twoBy2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr" v-show="showNaturalLogarithm">
                <tbody>
                    <tr><td><input :type="type" v-model.number="natLogNum" v-on:keyup="getNaturalLogarithm()" size="4" class="entry" placeholder="Number"></td></tr>
                    <tr><td><input :type="type" v-model.number="natLogBase" v-on:keyup="getNaturalLogarithm()" size="4" class="entry" placeholder="e"></td></tr>
                </tbody>
            </table>

            <!-- Inverse Natural Logarithm Inputs -->
            <table id="twoBy2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr" v-show="showInverseNaturalLogarithm">
                <tbody>
                    <tr><td><input :type="type" v-model.number="natLogAns" v-on:keyup="getInverseNaturalLogarithm()" size="4" class="entry" placeholder="Natural Log"></td></tr>
                    <tr><td><input :type="type" v-model.number="natLogBase" v-on:keyup="getInverseNaturalLogarithm()" size="4" class="entry" placeholder="e"></td></tr>
                </tbody>
            </table>
        </section>

        <section class="buttons w3-animate-bottom w3-small">
            <!--<aside class=""> -->
            <div class="blank1"></div>    
           
            <button id="detBtn" class="logmode w3-btn" v-on:click="getLogarithm()"> log </button>
            <button id="detBtn" class="antilogmode w3-btn" v-on:click="getAntiLogarithm()"> antilog </button>
            <button id="trnBtn" class="natlogmode w3-btn" v-on:click="getNaturalLogarithm()">natural log</button>
            <button id="trnBtn" class="natantilogmode w3-btn" v-on:click="getInverseNaturalLogarithm()">inverse natural log</button>
            <button id="clrBtn" class="clear w3-btn" v-on:click="clear()">Clear</button>

            <div class="blank2"></div>

            <!-- </aside> -->
        </section>
        <section class="bottomSpace"></section>
    </v-container>
</template>

<script>
import {log, antilog, ln, aln} from '../special_functions/logarithm.js'

export default {
    name: 'Logarithm',
    data() {
        return {
            num: "",
            base: "",
            logAns: "",
            logEqual: "",
            natLogNum: "",
            natLogBase: "",
            natLogAns: "",
            type: "number",
            method: "",
            mode: "logarithm",
            showLogarithm: true,
            showAntiLogarithm: false,
            showNaturalLogarithm: false,
            showInverseNaturalLogarithm: false,
            showAnsMatrix: true,
            showDiv: false
        }
    },

    methods: {
        getLogarithm() {
            this.mode = "logarithm"

            // Clear out natural log and inverse natural log variables
            this.natLogAns = ""
            this.natLogNum = ""
            this.natLogBase = ""

             // Display current mode UI
            this.showLogarithm = true
            this.showAntiLogarithm = false
            this.showNaturalLogarithm = false
            this.showInverseNaturalLogarithm = false

            if (this.method == `natural log of ${this.natLogNum} to base ${this.natLogBase}`
            || this.method == `inverse natural log of ${this.natLogAns} to base ${this.natLogBase}`) {
                //Don't carry over values from natural log and natural antilog modes
                this.method = ""
                this.natLogAns = ""
                this.natLogNum = ""
                this.natLogBase = ""
            } else

            if (this.num === "" && this.base === "") { // If any input is missing...
                // ...show message and do nothing
                this.method = "Enter number and base"
                this.logAns = ""
                this.logEqual = ""
                this.base = ""
            } else if (this.num === "" && this.base !== "") {
                this.logAns = ""
                this.method = "Enter number"
            } else if (this.num !== "" && this.base === "") {
                this.logAns = ""
                this.method = "Enter base"
            } else {
                // Convert numeric string to number and assign to holding variable
                this.NUM = eval(this.num)
                this.BASE = eval(this.base)
               
                let logArr = [this.NUM, this.BASE]

                // Compute determinant
                this.logAns = log(logArr)
                this.logEqual = "="

                this.method = `log of ${this.num} to base ${this.base}`
            }
        },

        getAntiLogarithm() {
            this.mode = "Anti logarithm"

            // Clear out natural log and inverse natural log variables
            this.natLogAns = ""
            this.natLogNum = ""
            this.natLogBase = ""

             // Display current mode UI
            this.showLogarithm = false
            this.showAntiLogarithm = true
            this.showNaturalLogarithm = false
            this.showInverseNaturalLogarithm = false

            if (this.method == `natural log of ${this.natLogNum} to base ${this.natLogBase}` 
            || this.method == `inverse natural log of ${this.natLogAns} to base ${this.natLogBase}`) {
                //Don't carry over values from natural log and natural antilog modes
                this.method = ""
                this.natLogAns = ""
                this.natLogNum = ""
                this.natLogBase = ""
            } else

            if (this.logAns === "" && this.base === "") { // If any input is missing...
                // ...show message and do nothing
                this.method = "Enter logarithm and base"
                this.num = ""
                this.logEqual = ""
                this.base = ""
            } else if (this.logAns === "" && this.base !== "") {
                this.num = ""
                this.method = "Enter logarithm"
            } else if (this.logAns !== "" && this.base === "") {
                this.num = ""
                this.method = "Enter base"
            } else {
                // Convert numeric string to number and assign to holding variable
                this.LOGANS = eval(this.logAns)
                this.BASE = eval(this.base)
               
                let antilogArr = [this.BASE, this.LOGANS]

                // Compute antilogarithm
                this.num = antilog(antilogArr)
                this.logEqual = "="
           
                this.method = `antilog of ${this.logAns} to base ${this.base}`
            }
        },

        getNaturalLogarithm() {
            this.mode = "Natural logarithm"

            // Clear out log and antilog variables
            this.num = ""
            this.logAns = ""
            this.base = ""

             // Display current mode UI
            this.showLogarithm = false
            this.showAntiLogarithm = false
            this.showNaturalLogarithm = true
            this.showInverseNaturalLogarithm = false

            if(this.method == `log of ${this.num} to base ${this.base}` 
            || this.method == `antilog of ${this.logAns} to base ${this.base}`) 
            {
                //Don't carry over values from log and antilog modes
                this.method = ""
                this.base = ""
                this.logAns = ""
                this.num = ""
            }

            this.natLogBase = "e"

            if (this.natLogNum === "") { // If number is missing...
                // ...show message and do nothing
                this.method = "Enter number"
                this.natLogAns = ""
                this.logEqual = ""
            } else {       
                // Convert numeric string to number and assign to holding variable
                this.NATLOGNUM = eval(this.natLogNum)

                // Compute determinant
                this.natLogAns = ln(this.NATLOGNUM)
                this.logEqual = "="
               
                this.method = `natural log of ${this.natLogNum} to base ${this.natLogBase}`
            }
        },

        getInverseNaturalLogarithm() {
            this.mode = "Inverse Natural logarithm"

            // Clear out log and antilog variables
            this.num = ""
            this.logAns = ""
            this.base = ""

            // Display current mode UI
            this.showLogarithm = false
            this.showAntiLogarithm = false
            this.showNaturalLogarithm = false
            this.showInverseNaturalLogarithm = true

            if(this.method == `log of ${this.num} to base ${this.base}` 
            || this.method == `antilog of ${this.logAns} to base ${this.base}`) 
            {
                //Don't carry over values from log and antilog modes
                this.method = ""
                this.base = ""
                this.logAns = ""
                this.num = ""
            }

            this.natLogBase = "e"

            if (this.natLogAns === "") { // If nat log answer is missing...
                // ...show message and do nothing
                this.method = "Enter natural Logarithm"
                this.natLogNum = ""
                this.logEqual = ""
            } else {   
                // Convert numeric string to number and assign to holding variable
                this.NATLOGANS = eval(this.natLogAns)

                // Compute Inverse natural logarithm
                this.natLogNum = aln(this.NATLOGANS)
                this.logEqual = "="
 
                this.method = `inverse natural log of ${this.natLogAns} to base ${this.natLogBase}`
            }
        },

        clear() {
            this.num = ""
            this.base = ""
            this.logAns = ""
            this.logEqual = ""
            this.method = ""
            this.natLogNum = ""
            this.natLogAns = ""
            this.natLogBase = ""
        }
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Default styling for mobile 
    
    *{
        margin-top: 0;
        padding: 0;
        
    }

    // Main grid
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 110px 15px 20px 160px auto 45px;
        grid-template-areas: 
        "answerPanel answerPanel answerPanel"
        "method method method"
        "scalar scalar scalar"
        "matrix matrix matrix"
        "blank1 buttons blank2"
        "bottomSpace bottomSpace bottomSpace";
    
    }

    .answerPanel {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 90px auto;
        grid-template-areas: 
        "mode"
        "table";
        grid-area: answerPanel;
        margin-top: 0%;
        margin-left:-4px;
        margin-right:-4px;
        align-items:center;
        justify-content: center;
        // grid-row-start: 1;
        // grid-row-end: 3;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 204, 255), lightblue, rgb(77, 255, 210));
        
        /* background-color: #ccc; */
        padding: 15px;
    }

    
    .table {
        grid-area: table;
        margin-top: 10px;
    }
    .mode {
        grid-area: mode;
        margin-bottom: 10px;
        align-items: center;
    }

    .method {
        grid-area: method;
        margin-left:-4px;
        margin-right:-4px;
        font-size: 12px;
        color: white;
        background-color: indigo;
    }

    .matrix {
        grid-area: matrix;
        margin-left:-4px;
        margin-right:-4px;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
        
        /*background-color: #ccc; */
         // rgb(252, 213, 105);
    }
    

    // Button as subgrid
    .buttons {
        display: grid;
        grid-template-columns:2fr repeat(3, 1fr) 2fr; 
        grid-template-rows: auto auto;
        grid-template-areas: 
        "logmode logmode antilogmode antilogmode clear"
        "natlogmode natlogmode natantilogmode natantilogmode clear";
        grid-area: buttons;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 188, 255)); 
        vertical-align: bottom;
        margin-left:-4px;
        margin-right:-4px;
    }

    .bottomSpace {
        grid-area: bottomSpace;
        margin-bottom: -20%;
        margin-left:-4px;
        margin-right:-4px;
        //background-color: blue;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
    }

    .clear {
        grid-area: clear;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .log {
        font-size: 25px;
    }

    .num, .logEqual, .logAns {
        font-size: 20px;
    }

    .mode {
        font-size: 16px;
        font-weight: 600;
        color: #999;
        margin-top: 5px;
    }

    .answer {
        grid-area: answer;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .matMultiply {
        grid-area: matMultiply;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    #method {
        color: white;
    }

    .logmode, .antilogmode, .natlogmode, .natantilogmode {
        background-color: inherit;
        color: white;
        font-size: 14px;
    }

    .modeBtn {
        background-color: #fd0356;
        color: white;
    }

    div.blank1 {
        background-color: inherit;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 200, 255), rgb(0, 190, 255), rgb(0, 176, 255));
        background-image: -moz-linear-gradient(120deg, rgb(0, 200, 255), rgb(0, 190, 255), rgb(0, 176, 255)); 
        background-image: -o-linear-gradient(120deg, rgb(0, 200, 255), rgb(0, 190, 255), rgb(0, 176, 255)); 
        background-image: -ms-linear-gradient(120deg, rgb(0, 200, 255), rgb(0, 190, 255), rgb(0, 176, 255)); 
        background-image: linear-gradient(120deg, rgb(0, 200, 255), rgb(0, 190, 255), rgb(0, 176, 255));  
    }

    div.blank2 {
        background-color: inherit;
        background-image: -webkit-linear-gradient(120deg,  rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255), rgb(0, 168, 255)); 
        background-image: -moz-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255), rgb(0, 168, 255)); 
        background-image: -o-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255), rgb(0, 168, 255)); 
        background-image: -ms-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255), rgb(0, 168, 255)); 
        background-image: linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255), rgb(0, 168, 255)); 
    }

    .value{
        font-size: 12px;
        font-weight: 100;
    }


    input {
        margin: 5px;
        padding: 5px 5px 5px 5px;
        width: 90%;   //55px;
        border: 0;
        text-align: center;
        font-size: 10px;
        border-radius: 4px;
        color: #ffffff;
        background-color: #000000;
    }

    input:focus, input.selectScalar { 
        color: #000000;
        background-color: #ffffff;
    }

    // Remove scrollbar from number input fields
    .entry::-webkit-inner-spin-button,
    .entry::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    #twoBy2 {
        width: 180px;
        float: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
        margin-top: 16px !important;
        background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
    }

    #twoBy2B {
        width: 180px;
        height: 90px;
        opacity: 1;
        float: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0 !important;
        margin-bottom: 10px;
        border-radius: 5px;
        background-image: -webkit-linear-gradient(120deg, rgb(34, 116, 192), rgb(121, 121, 206));
        background-image: -moz-linear-gradient(120deg, rgb(34, 116, 192), rgb(121, 121, 206));
        background-image: -o-linear-gradient(120deg, rgb(34, 116, 192),rgb(121, 121, 206));
        background-image: -ms-linear-gradient(120deg, rgb(34, 116, 192),rgb(121, 121, 206));
        background-image: linear-gradient(120deg, rgb(34, 116, 192),rgb(121, 121, 206));
    }

    // iPhone 5/5E
     @media screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 115px 15px 20px 125px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
          
        }

        .answerPanel, .scalar, .method, .matrix, .buttons {
            margin-left: -5%;
            margin-right: -5%;
        }

        .answerPanel {
            margin-top: -25%;
        }

        .buttons {
            margin-bottom: -5%;
        }
    }

    // Pixel 2
    @media screen and (min-device-width: 411px) and (max-device-height: 731px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2.6)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 200px 15px 20px 140px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons {
            margin-left: -6%;
            margin-right: -10%;
        }

        .buttons {
            margin-bottom: -5%;
        }
    }

    // Pixel 2 XL
     @media screen and (min-device-width: 411px) and (max-device-height: 823px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3.5)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 265px 15px 20px 140px auto 15px;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons"
            "bottomSpace bottomSpace bottomSpace";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }

        .buttons {
             div.blank1, div.blank2 {
                display: none;
            }
            display: grid;
            grid-template-columns:repeat(3, 1fr); 
            grid-template-rows: auto;
            grid-template-areas: 
            "logmode antilogmode clear"
            "natlogmode natantilogmode clear";
            grid-area: buttons;
        }
    }

    // iPhone 5/5E (Landscape)
     @media screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 60px 15px 20px 50px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }
    }
          
        

    // iPhone 6/7/8
     @media screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 170px 15px 20px 165px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons {
            margin-left: -5%;
            margin-right: -5%;
        }

        .buttons {
             div.blank1, div.blank2 {
                display: none;
            }
            display: grid;
            grid-template-columns:repeat(3, 1fr); 
            grid-template-rows: auto;
            grid-template-areas: 
            "logmode antilogmode clear"
            "natlogmode natantilogmode clear";
            grid-area: buttons;
            margin-bottom: -5%;
        }
    }

    // iPhone 6/7/8 (Landscape)
    @media screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)
    {
        .grid {
            grid-template-rows: 170px 15px 20px 165px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .buttons {
            margin-bottom: -5%;
        }
    }


    // iPhone 6/7/8 plus
    @media screen and (min-device-width: 414px) and (max-device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 200px 15px 20px 140px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons {
            margin-left: -6%;
            margin-right: -10%;
        }

        .buttons {
            margin-bottom: -5%;
        }
    }

    // iPhone X
     @media screen and (min-device-width: 375px) and (max-device-height: 812px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 240px 15px 20px 140px auto 15px;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons"
            "bottomSpace bottomSpace bottomSpace";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }

               // Button as subgrid
        .buttons {
            div.blank1, div.blank2 {
                display: none;
            }
            display: grid;
            grid-template-columns:repeat(3, 1fr); 
            grid-template-rows: auto;
            grid-template-areas: 
            "logmode antilogmode clear"
            "natlogmode natantilogmode clear";
            grid-area: buttons;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 188, 255)); 
            vertical-align: bottom;
            // margin-left:-4px;
            // margin-right:-4px;
        }
    }

    // iPhone X (Landscape)
     @media screen and (min-device-width: 812px) and (max-device-height: 375px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)
    {
        .grid {
            grid-template-rows: 80px 10px 15px 60px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .matrix > #twoBy2 {
            width: 180px;
        }
    }

    // Samsung Galaxy S5
     @media screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 145px 15px 20px 160px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }

        .buttons {
             div.blank1, div.blank2 {
                display: none;
            }
            display: grid;
            grid-template-columns:repeat(3, 1fr); 
            grid-template-rows: auto;
            grid-template-areas: 
            "logmode antilogmode clear"
            "natlogmode natantilogmode clear";
            grid-area: buttons;
            margin-bottom: -5%;
        }
    }

    // Samsung Galaxy S5 (Landscape)
     @media screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 70px 15px 20px 110px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }
        
        .buttons {
            margin-bottom: -5%;
        }
    }


    // iPad
     @media screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 280px 20px 30px 230px auto 125px;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons"
            "bottomSpace bottomSpace bottomSpace";
        }

        .matrix > #twoBy2 {
            width: 210px;
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }

        .bottomSpace {
            margin-bottom: -5%;
        }
    }

    // iPad (Landscape)
     @media screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 200px 20px 30px 190px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons"
           // "bottomSpace bottomSpace bottomSpace";
        }

        .matrix > #twoBy2 {
            width: 245px;
        }

        .answerPanel, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }

        .buttons {
            margin-bottom: -5%;
        }
    }

    // // iPad Pro


    // Styling for large screens
     @media screen and (min-width: 736px)
    {
        input {
            width: 70%;
            font-size: 12px;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 250px 20px 30px 190px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
             background-color: skyblue;
             
        }

        .buttons {
            margin-bottom: -9%;
        }

         .answerPanel {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 90px auto;
            grid-template-areas: 
            "mode"
            "table";
            grid-area: answerPanel;
            margin-top: 0%;
            margin-left:-4px;
            margin-right:-4px;
            align-items:center;
            justify-content: center;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 204, 255), lightblue, rgb(77, 255, 210));
            padding: 15px;
        }

        
        .table {
            grid-area: table;
            margin-top: 10px;
        }
        .mode {
            grid-area: mode;
            margin-bottom: 10px;
            align-items: center;
        }
                
        #twoBy2 {
            width: 26%;
            float: center;
            margin-left: 37%;
            margin-right: 37%;
            border-radius: 5px;
            margin-top: 16px !important;
            background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        }

        #twoBy2B {
            width: 30%;
            float: center;
            margin-left: 35%;
            margin-right: 35%;
            border-radius: 5px;
            margin-bottom: 0px;
            margin-top: 6px !important;
            background-image: -webkit-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -moz-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -o-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -ms-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
        }

        .buttons {
            display: grid;
            grid-template-columns:2fr repeat(3, 1fr) 2fr;
            grid-template-areas: 
            "blank1 logmode antilogmode clear blank2"
            "blank1 natlogmode natantilogmode clear blank2";
        }

        .blank1 {
            grid-area: blank1;
            background-color: lightblue;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255));
            background-image: -moz-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255)); 
            background-image: -o-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255)); 
            background-image: -ms-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255)); 
            background-image: linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255));  
        }

        .blank2 {
            grid-area: blank2;
            background-color: lightblue;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: -moz-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: -o-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: -ms-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
        }

        .grid {
            margin-top: -70px;
            margin-right: 35px;
            margin-bottom: 0;
        }

    }

</style>