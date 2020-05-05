<template>
    <v-container class="grid w3-animate-opacity">
        <section class="answerPanel">
            <h4 id="functionality">number systems</h4>
            <table id="twoBy2B" class="w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showToBase">
                <tbody>
                    <tr>
                        <td><p><span class="num"> {{ num }}</span><sub class="base">{{ dec }}</sub><span  class="equal"> {{ equal }} </span><span class="logAns">{{ decToBase }}</span><sub class="base">{{ base }}</sub></p></td>
                    </tr>
                </tbody>
            </table>
        </section>
        
        <section class="message">
            <span>{{ msg }}</span>
        </section>

        <section class="inputs">
            <table id="twoBy2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr" v-show="showToBase">
                <tbody>
                    <tr><td><input :type="type" v-model.number="num" v-on:keyup="getDecimalToBase()" size="4" class="entry" placeholder="Number (10)"></td></tr>
                    <tr><td><input :type="type" v-model.number="base" v-on:keyup="getDecimalToBase()" size="4" class="entry" placeholder="To base..."></td></tr>
                </tbody>
            </table>
        </section>
    </v-container>
</template>

<script>
import {toBase} from '../special_functions/number_bases.js'

export default {
    name: 'NumberSystems',
    data() {
        return {
            num: "",
            base: "",
            NUM: "",
            BASE: "",
            decToBase: "",
            type: "number",
            equal: "=",
            dec: "10",
            showToBase: true,
            quotient: "",
            msg: "Convert base 10 to other bases"
        }
    },

    methods: {
        getDecimalToBase() {
           if (this.num === "" && this.base === "") {
                this.msg = "Enter base 10 number and base"
                this.decToBase = ""
                this.base = ""
            } else if (this.num === "" && this.base !== "") {
                this.msg = "Enter base 10 number" 
                this.decToBase = ""
            } else if (this.num !== "" && this.base === "") {
                this.msg = "Enter base"
                this.decToBase = ""
            } else if (this.base > 16 || this.base <= 0) {
                this.decToBase = ""
                this.msg = "Allowed range: 1 - 16"
                this.base = ""
            // } else if (this.base > 0 && this.base <= 16) {
            //     this.msg = ""
            
            } else {
                this.msg = ""
                this.NUM = eval(this.num)
                this.BASE = eval(this.base)

                this.decToBase = toBase(this.NUM, this.BASE)
            }
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
        grid-template-columns: 1fr;
        grid-template-rows: 370px 20px 160px;
        grid-template-areas: 
       // "functionality"
        "answerPanel"
        "message"
        "inputs";
    }

    // .functionality {
    //     grid-area: functionality;
    //     // margin-left:-4px;
    //     // margin-right:-4px;
    //     background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
        
    //     /*background-color: #ccc; */
    //      // rgb(252, 213, 105);
    // }

    #functionality {
        color: #999;
    }
    .answerPanel {
        grid-area: answerPanel;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 204, 255), lightblue, rgb(77, 255, 210));
        
        padding: 15px;
        padding-bottom: 30px;
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

    .message {
        grid-area: message;
        font-size: 14px;
        color: white;
        background-color: indigo;
    }

    .inputs {
        grid-area: inputs;
       
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
    }

    
    .num, .equal, .logAns {
        font-size: 1.5rem;
    }

    .base {
        font-size: 1rem;
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
    // Main grid
        .grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 22px 260px;
            grid-template-areas: 
            "answerPanel"
            "message"
            "inputs";
            background-color: skyblue;
        }
        
        
                

        .buttons {
            margin-bottom: -9%;
        }

         .answerPanel {
            grid-area: answerPanel;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 204, 255), lightblue, rgb(77, 255, 210));
            padding: 15px;
        }

        
        .table {
            grid-area: table;
           // margin-top: 10px;
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
            margin-bottom: 30px;
            margin-top: 6px !important;
            background-image: -webkit-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -moz-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -o-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -ms-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
        }

    }

</style>