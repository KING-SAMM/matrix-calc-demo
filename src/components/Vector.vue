<template>
    <v-container class="grid">
        <section class="answerPanel" id="answerPanel">
            <!-- Mode -->
            <span class="mode">{{ mode }}</span>

            <table id="threeBy3B" class="w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showAnsMatrix">
                <tbody>
                    <tr>
                        <td><p id="Cx">{{Cx}} {{ i }}</p></td><td><p id="Cy">{{Cy}} {{ j }}</p></td><td><p id="Cz">{{Cz}} {{ k }}</p></td>
                    </tr>
                </tbody>
            </table>

            <p id="C" class="w3-center">{{ C }}</p>
        </section>

        <section class="method"><span id="method">{{ method }}</span></section>

        <section class="determinant">
            <span id="angle" class="value">θ</span><h3 v-show="showAngle">{{ angle }}</h3>
        </section>


        <section class="scalar">
            <aside class="doubleMatrixName" v-show="showDoubleInputMatrix">
                <h3>{{ matrixA }}</h3>
                <h3>{{ matrixB }}</h3>
            </aside>
            <input id="scalar" type="number" size="4" v-show="showScalarInputMatrix" v-model.number="scalar" maxlength="3" v-on:keyup="getScalarProduct()" class="entry" placeholder="scalar">
        </section>

        <!--<section class="matrices w3-container w3-center">
            
        </section> -->

        <section class="matrix">
            <div class="blank3"></div>
            <aside class="doubleMatrix" v-show="showDoubleInputMatrix">
                <!--<aside class="w3-center table_sec"> -->
                <table id="first_By3" class="w3-center table_sec w3-animate-zoom w3-card-4 w3-black w3-centered tr td">
                    <tbody>
                        <tr><td><input :type="type" v-model.number="Ax" size="4" class="entry" placeholder="Ax"><span class="component">i</span></td><td><input :type="type" v-model.number="Ay" size="4" class="entry" placeholder="Ay"><span class="component">j</span></td><td><input :type="type" v-model.number="Az" size="4" class="entry" placeholder="Az"><span class="component">k</span></td></tr>
                    </tbody>
                </table>
                <!-- </aside> -->
                <table id="opr" class="opr w3-center w3-animate-zoom w3-centered tr td">
                    <tbody>
                        <tr><td><v-icon>{{ opr }}</v-icon></td></tr>
                    </tbody>
                </table>
                <!-- <aside class="w3-center table_sec opr"><v-icon>{{opr}}</v-icon></aside> -->
                <!-- <aside class="w3-center table_sec"> -->
                <table id="sec_By3" class="w3-center table_sec w3-animate-zoom w3-card-4 w3-black w3-centered tr td">
                    <tbody>
                        <tr><td><input :type="type" v-model.number="Bx" size="4" class="entry" placeholder="Bx"><span class="component">i</span></td><td><input :type="type" v-model.number="By" size="4" class="entry" placeholder="By"><span class="component">j</span></td><td><input :type="type" v-model.number="Bz" size="4" class="entry" placeholder="Bz"><span class="component">k</span></td></tr>
                    </tbody>
                </table>
                <!-- </aside> -->
            </aside>

            <aside class="singleMatrix" v-show="showSingleInputMatrix">
                <table id="threeBy3" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr td">
                    <tbody>
                        <tr><td><input v-model.number="a" size="4" class="entry" placeholder="x"><span class="component">i</span></td><td><input v-model.number="b" size="4" class="entry" placeholder="y"><span class="component">j</span></td><td><input v-model.number="c" size="4" class="entry" placeholder="z"><span class="component">k</span></td></tr>
                        <!--<tr><td><input v-model.number="d" size="4" class="entry" placeholder="x21"></td><td><input v-model.number="e" size="4" class="entry" placeholder="x22"></td><td><input v-model.number="f" size="4" class="entry" placeholder="x23"></td></tr> -->
                        <!--<tr><td><input v-model.number="g" size="4" class="entry" placeholder="x31"></td><td><input v-model.number="h" size="4" class="entry" placeholder="x32"></td><td><input v-model.number="i" size="4" class="entry" placeholder="x33"></td></tr> -->
                    </tbody>
                </table>
            </aside>
            <div class="blank2"></div>
        </section>

        <section class="buttons w3-animate-bottom w3-small">
            <div class="blank1"></div>
            <button id="subBtn" class="minus w3-btn" v-on:click="getSubtraction()" :class="isDoubleDisabled">-</button>
            <button id="invBtn" class="fn w3-btn" v-on:click="getAbsA()" :class="isDoubleDisabled">|<i>A</i>|</button>
            <button id="invBtn" class="fn w3-btn" v-on:click="getAbsB()" :class="isDoubleDisabled">|<i>B</i>|</button>
            <button id="invBtn" class="fn w3-btn" v-on:click="getAHat()" :class="isDoubleDisabled"><b>â</b></button>
            <button id="invBtn" class="fn w3-btn" v-on:click="getBHat()" :class="isDoubleDisabled"><b>û</b></button>
            <button class="clear special w3-btn" v-on:click="clear()">CLR</button>
            <section class="blank2"></section>

            <button id="addBtn" class="plus w3-btn" v-on:click="getSum()" :class="isDoubleDisabled">+</button> 
            <button id="invBtn" class="angle fn w3-btn" v-on:click="getAngle()" :class="isDoubleDisabled">θ</button> 
            <button id="scalarMultiplyBtn" class="fn w3-btn" v-on:click="scalarMultiply()" :class="isDisabled"><strong>k</strong><i>X</i></button>
            <button id="matSquaredBtn" class="fn w3-btn" v-on:click="matSquared()" :class="isDisabled"><i>X</i><sup>2</sup></button>
            <button id="invBtn" class="answer special w3-btn" v-on:click="getAnswer()"><i>ANS</i></button>
            
            <button id="dotProdBtn" class="dot w3-btn" v-on:click="dotProduct()" :class="isDoubleDisabled">{{ dotProdBtnSwap }}</button>
            <button id="crossProdBtn" class="cross w3-btn" v-on:click="crossProduct()" :class="isDoubleDisabled">{{ crossProdBtnSwap }}</button>
            <button id="crossProdBtn" class="absCross w3-btn" v-on:click="absCrossProduct()" :class="isDoubleDisabled">|{{ crossProdBtnSwap }}|</button>
            <button id="clrBtn" class="swap w3-btn" v-on:click="swapMatrices()" :class="isDoubleDisabled">{{ swap }}</button>    
            <button id="clrBtn" class="double special w3-btn w3-red" v-on:click="doubleOperations()">{{ modeBtn }}</button>
            <section class="blank2"></section>

        </section>
    </v-container>
</template>

<script>
import {find_rational, find_rational2} from '../special_functions/find_rational.js'
import {square} from '../special_functions/squares.js'
import {simplify_surd} from '../special_functions/surds.js'
import {toDegrees, toRadians} from '../special_functions/angle_conversion.js'


export default {
    name: 'Vector',
    data() {
        return {
            a: "",
            b: "",
            c: "",
            i: " i",
            j: " j",
            k: " k",
            A: "",
            B: "",
            C: "",
            Cx: "",
            Cy: "",
            Cz: "",
            Ax: "", 
            Ay: "", 
            Az: "",
            Bx: "",
            By: "",
            Bz: "",
            angle: "",
            rank: "",
            lambda1_2: "",
            lambdaScalarProd1_2: "",
            method: "",
            mode: "vectors",
            matrixA: "A",
            matrixB: "B",
            opr: "  ",
            scalar: "",
            showScalarInputMatrix: false,
            showSingleInputMatrix: false,
            showDoubleInputMatrix: true,
            showAnsMatrix: false,
            showAngle: false,
            inDegrees: true,
            inRadians: false,
            showRank: false,
            showEigenvalues: "",
            showEigenvaluesScalarProd: false,
            isDisabled: "w3-disabled",
            isDoubleDisabled: true,
            modeBtn: "SINGLE",
            swap: "A<─>B",
            crossProdBtnSwap: "AxB",
            dotProdBtnSwap: "A.B",
            type: "number"
        }
    },

    methods: {
         doubleOperations() {        
            this.det = ""
            this.rank = ""
            this.method = ""
            this.angle = ""
            this.C = ""
            this.showAngle = false
            this.showAnsMatrix = false
            this.showScalarInputMatrix = false
            this.showSingleInputMatrix = !this.showSingleInputMatrix
            this.showDoubleInputMatrix = !this.showDoubleInputMatrix

            if (this.showDoubleInputMatrix === true) {
                // Clear out single operations variables
                this.a = this.b = this.c = ""
                

                this.isDisabled = "w3-disabled"
                this.isDoubleDisabled = !this.isDoubleDisabled
                this.modeBtn = "SINGLE"
                this.opr = ""
            } else if (this.showDoubleInputMatrix === false) {
                // Clear out double operations variables
                this.Ax = this.Ay = this.Az = ""
                this.Bx = this.By = this.Bz = ""

                this.isDisabled = !this.isDisabled
                this.isDoubleDisabled = "w3-disabled"
                this.modeBtn = "DOUBLE"
            }
        },

        getAbsA() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === ""
                // || this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                let arr1 = [this.Ax, this.Ay, this.Az]
                let absoluteOfA = Math.sqrt(square(this.Ax) + square(this.Ay) + square(this.Az))
                this.C = "|A| = " + absoluteOfA

                this.opr = ""
                this.method = "Absolute Value of Vector A"
                this.showAnsMatrix = false
            }
        },

        getAbsB() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Bx === "" || this.By === "" || this.Bz === ""
                // || this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                let arr1 = [this.Bx, this.By, this.Bz]
                let absoluteOfB = Math.sqrt(square(this.Bx) + square(this.By) + square(this.Bz))
                this.C = "|B| = " + absoluteOfB

                this.opr = ""
                this.method = "Absolute Value of Vector B"
                this.showAnsMatrix = false
            }
        

        },

        getAHat() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === ""
                // || this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                let arr1 = [eval(this.Ax), eval(this.Ay), eval(this.Az)]
                let absoluteOfA_square = square(eval(this.Ax)) + square(eval(this.Ay)) + square(eval(this.Az))
                let surd = simplify_surd(absoluteOfA_square)
                if (surd[2] == 1 && surd[1] == "" && surd[0] == 1) {
                    this.Cx = find_rational(arr1[0]).join(" / ")   //, surd[1] + surd[2]].join("/") 
                    this.Cy = find_rational(arr1[1]).join(" / ")   //, surd[1] + surd[2]].join("/") 
                    this.Cz = find_rational(arr1[2]).join(" / ")   //, surd[1] + surd[2]].join("/") 
                } else if (surd[2] == 1 && surd[1] == "") {
                    this.Cx = [arr1[0], surd[0]].join(" / ")     //, surd[1] + surd[2]].join("/") 
                    this.Cy = [arr1[1], surd[0]].join(" / ")      //, surd[1] + surd[2]].join("/") 
                    this.Cz = [arr1[2], surd[0]].join(" / ")     //, surd[1] + surd[2]].join("/") 
                } else if (surd[2] != 1 && surd[1] == "√") {
                    this.Cx = [find_rational2(eval(arr1[0]/surd[0])).join(" / "), surd[1] + surd[2]].join("") 
                    this.Cy = [find_rational2(eval(arr1[1]/surd[0])).join(" / "), surd[1] + surd[2]].join("") 
                    this.Cz = [find_rational2(eval(arr1[2]/surd[0])).join(" / "), surd[1] + surd[2]].join("") 
                }
                
                this.i = " i"
                this.j = " j"
                this.k = " k"
                this.C = ""
                this.opr = ""
                this.method = "Unit Vector of A"
                this.showAnsMatrix = true
            }
        },

        getBHat() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                let arr1 = [eval(this.Bx), eval(this.By), eval(this.Bz)]
                let absoluteOfB_square = square(eval(this.Bx)) + square(eval(this.By)) + square(eval(this.Bz))
                let surd = simplify_surd(absoluteOfB_square)
                if (surd[2] == 1 && surd[1] == "" && surd[0] == 1) {
                    this.Cx = find_rational(arr1[0]).join(" / ")   //, surd[1] + surd[2]].join("/") 
                    this.Cy = find_rational(arr1[1]).join(" / ")   //, surd[1] + surd[2]].join("/") 
                    this.Cz = find_rational(arr1[2]).join(" / ")   //, surd[1] + surd[2]].join("/") 
                } else if (surd[2] == 1 && surd[1] == "") {
                    this.Cx = [arr1[0], surd[0]].join(" / ")     //, surd[1] + surd[2]].join("/") 
                    this.Cy = [arr1[1], surd[0]].join(" / ")      //, surd[1] + surd[2]].join("/") 
                    this.Cz = [arr1[2], surd[0]].join(" / ")     //, surd[1] + surd[2]].join("/") 
                } else if (surd[2] != 1 && surd[1] == "√") {
                    this.Cx = [find_rational2(eval(arr1[0]/surd[0])).join(" / "), surd[1] + surd[2]].join("") 
                    this.Cy = [find_rational2(eval(arr1[1]/surd[0])).join(" / "), surd[1] + surd[2]].join("") 
                    this.Cz = [find_rational2(eval(arr1[2]/surd[0])).join(" / "), surd[1] + surd[2]].join("") 
                }
                
                this.i = " i"
                this.j = " j"
                this.k = " k"
                this.C = ""
                this.opr = ""
                this.method = "Unit Vector of B"
                this.showAnsMatrix = true
            }
        },


        crossProduct() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === ""
                || this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                let rows = 3
                let cols = 3
                //let arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
                let arr1 = [eval(this.Ax), eval(this.Ay), eval(this.Az)]
                let arr2 = [eval(this.Bx), eval(this.By), eval(this.Bz)]
            
                // Gives greater accuracy for very small values without converting to rational
                this.Cx = (arr1[1] * arr2[2]) - (arr1[2] * arr2[1])          //find_rational((arr1[1] * arr2[2]) - (arr1[2] * arr2[1])).join(" / ")
                this.Cy = (arr1[2] * arr2[0]) - (arr1[0] * arr2[2])           //find_rational((arr1[2] * arr2[0]) - (arr1[0] * arr2[2])).join(" / ")
                this.Cz = (arr1[0] * arr2[1]) - (arr1[1] * arr2[0])          //find_rational((arr1[0] * arr2[1]) - (arr1[1] * arr2[0])).join(" / ") 

                this.i = " i"
                this.j = " j"
                this.k = " k"
                this.C = ""
                this.opr = "clear"
                this.method = "Cross Product"
                this.showAnsMatrix = true
            }
        },

        absCrossProduct() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === ""
                || this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
        
                // let rows = 3
                // let cols = 3
                // //let arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
                // let arr1 = [this.Ax, this.Ay, this.Az]
                // let arr2 = [this.Bx, this.By, this.Bz]
            
    
                this.Cx = (this.Ay * this.Bz) - (this.Az * this.By) 
                this.Cy = (this.Az * this.Bx) - (this.Ax * this.Bz)   
                this.Cz = (this.Ax * this.By) - (this.Ay * this.Bx) 

                this.Cx = eval(this.Cx)
                this.Cy = eval(this.Cy)
                this.Cz = eval(this.Cz)

                let aCrossBAbs = Math.sqrt(square(this.Cx) + square(this.Cy) + square(this.Cz))

                // Change solution text based on whether |AxB| or |BxA|
                if (this.swap === "A<─>B") {
                    this.C = "|A x B| = " + aCrossBAbs
                    this.method = "Absolute Value of A Cross B"
                } else if (this.swap === "B<─>A") {
                    this.C = "|B x A| = " + aCrossBAbs
                    this.method = "Absolute Value of B Cross A"
                }

                this.opr = ""
                this.showAnsMatrix = false
            }
        },

        dotProduct() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === ""
                || this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                this.showAnsMatrix = false
                let rows = 1
                let cols = 3

                let arr1 = [eval(this.Ax), eval(this.Ay), eval(this.Az)]
                let arr2 = [eval(this.Bx), eval(this.By), eval(this.Bz)]
                let arr3 = []
            
                for (let j = 0; j < cols; j++) {
                    arr3[j] = arr1[j] * arr2[j]        
                }

                this.Cx = find_rational(arr3[0]).join("/") 
                this.Cy = find_rational(arr3[1]).join("/") 
                this.Cz = find_rational(arr3[2]).join("/") 
                this.C = find_rational((arr1[0] * arr2[0]) + (arr1[1] * arr2[1]) + (arr1[2] * arr2[2])).join("/")
        
                this.opr = "lens"
                this.method = "Dot Product"
            }
        },

        getAngle() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === ""
                || this.Bx === "" || this.By === "" || this.Bz === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                this.showAnsMatrix = false
                let rows = 1
                let cols = 3

                this.Ax = eval(this.Ax)
                this.Ay = eval(this.Ay)
                this.Az = eval(this.Az)

                this.Bx = eval(this.Bx)
                this.By = eval(this.By)
                this.Bz = eval(this.Bz)
                
                let arr1 = [this.Ax, this.Ay, this.Az]
                let arr2 = [this.Bx, this.By, this.Bz]
                let arr3 = []
            
                for (let j = 0; j < cols; j++) {
                    arr3[j] = arr1[j] * arr2[j]        
                }

                this.Cx = find_rational(arr3[0]).join("/") 
                this.Cy = find_rational(arr3[1]).join("/")
                this.Cz = find_rational(arr3[2]).join("/")  
                this.C = (arr1[0] * arr2[0]) + (arr1[1] * arr2[1]) + (arr1[2] * arr2[2])

                let absoluteOfA = Math.sqrt(square(arr1[0]) + square(arr1[1]) + square(arr1[2]))
                let absoluteOfB = Math.sqrt(square(arr2[0]) + square(arr2[1]) + square(arr2[2]))

                this.angle = toDegrees(Math.acos(this.C/(absoluteOfA * absoluteOfB))) // Math.acos give values in radians
                this.angle = this.angle.toFixed(1) + " ̊ "

                // if (this.inRadians) {    // If in radians, change to degrees on click
                //     this.angle = toDegrees(this.angle)
                //     this.angle = this.angle.toFixed(1) + " ̊ "
                //     this.inDegrees = true
                //     this.inRadians = false
                    
                // } else if (this.inDegrees) {      // If in degrees, change to radians on click
                //     this.angle = find_rational(toRadians(this.angle)).join("/") + " π"
                //     this.inDegrees = false
                //     this.inRadians = true
                    
                // }
                this.C = ""
                this.opr = ""
                this.method = "Angle Between Vectors"
                this.showAngle = true
            }
        },


        clear() {
            this.showAnsMatrix = false
            this.Cx = this.i = "" 
            this.Cy = this.j = "" 
            this.Cz = this.k = ""
            this.C =""
            this.angle = ""
            this.scalar = ""
            this.lambda1_2 = ""
            this.lambdaScalarProd1_2 = ""
            if (this.showSingleInputMatrix === true && this.showDoubleInputMatrix === false) {
                this.a = "" 
                this.b = "" 
                this.c = ""
            } else if (this.showSingleInputMatrix === false && this.showDoubleInputMatrix === true) {
                this.Ax = this.Bx = "" 
                this.Ay = this.By ="" 
                this.Az = this.Bz = ""
            
                this.opr = ""
            }
        },
        
        getSum() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === "" 
                || this.Bx === "" || this.By === "" || this.Bz === "" 
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {    // Else compute sum
                let rows = 1
                let cols = 3
                let arr1 = [eval(this.Ax), eval(this.Ay), eval(this.Az)]
                let arr2 = [eval(this.Bx), eval(this.By), eval(this.Bz)]
            
                for (let j = 0; j < cols; j++) {
                    arr2[j] = arr1[j] + arr2[j]           
                }
            
                this.C = ""
                this.Cx = find_rational(arr2[0]).join("/") 
                this.Cy = find_rational(arr2[1]).join("/")
                this.Cz = find_rational(arr2[2]).join("/")  

                this.opr = "add"
                this.method = "Vector Addition"
                this.showAnsMatrix = true
            }
        },

        getSubtraction() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.Ax === "" || this.Ay === "" || this.Az === "" 
                || this.Bx === "" || this.By === "" || this.Bz === "" 
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {    // Else compute sum
                let rows = 1
                let cols = 3
                let arr1 = [eval(this.Ax), eval(this.Ay), eval(this.Az)]
                let arr2 = [eval(this.Bx), eval(this.By), eval(this.Bz)]
            
                for (let j = 0; j < cols; j++) {
                    arr2[j] = arr1[j] - arr2[j]           
                }
            
                this.C = ""
                this.Cx = find_rational(arr2[0]).join("/") 
                this.Cy = find_rational(arr2[1]).join("/")
                this.Cz = find_rational(arr2[2]).join("/") 

                this.opr = "remove"
                this.method = "Vector Subtraction"
                this.showAnsMatrix = true
            }
        },
        swapMatrices() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (this.showSingleInputMatrix === false && this.swap === "A<─>B") {
                this.swap = "B<─>A"
                this.dotProdBtnSwap = "B.A"
                this.crossProdBtnSwap = "BxA"

                this.a = this.Ax
                this.b = this.Ay
                this.c = this.Az

                this.Ax = this.Bx
                this.Ay = this.By
                this.Az = this.Bz

                this.Bx = this.a
                this.By = this.b
                this.Bz = this.c

                this.a = this.b = this.c = ""
                this.Cx = this.Cy = this.Cz = ""
                this.i = this.j = this.k = ""

                this.opr = ""
                this.method = ""
                this.matrixA = "B"
                this.matrixB = "A"

                return
            } else if (this.showSingleInputMatrix === false && this.swap === "B<─>A") {
                this.swap = "A<─>B"
                this.dotProdBtnSwap = "A.B"
                this.crossProdBtnSwap = "AxB"

                this.a = this.Ax
                this.b = this.Ay
                this.c = this.Az

                this.Ax = this.Bx
                this.Ay = this.By
                this.Az = this.Bz

                this.Bx = this.a
                this.By = this.b
                this.Bz = this.c

                this.a = this.b = this.c = ""
                this.Cx = this.Cy = this.Cz = ""
                this.i = this.j = this.k = ""

                
                this.opr = ""
                this.method = ""
                this.matrixA = "A"
                this.matrixB = "B"
                return
            }
        },

        getAnswer() {
            this.i = this.k = this.j = ""

            if (this.showDoubleInputMatrix === false) {
                // Move answer matrix to input matrix (for further manipulation)...
                this.Ax = this.Cx
                this.Ay = this.Cy
                this.Az = this.Cz

                // Clear values based up of previous input matrix
                this.scalar = ""
                this.angle = ""
                this.C = ""

                // ..and clear answer matrix
                this.Cx = ""
                this.Cy = ""
                this.Cz = ""
        
            } else if (this.showDoubleInputMatrix === true) {
                this.type = "text" 
                // Move answer matrix to matrix A (for further manipulation)...
                this.Ax = this.Cx
                this.Ay = this.Cy
                this.Az = this.Cz

                // ..and clear answer matrix and matrux B
                this.Cx = this.Bx = ""
                this.Cy = this.By = ""
                this.Cz = this.Bz = ""

                this.method = this.opr = ""
                this.scalar = this.angle = this.C = ""
            }

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    *{
        margin-top: 0;
        padding: 0;
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 130px 20px 90px 30px 130px 35px;
        grid-template-areas: 
        "answerPanel answerPanel answerPanel"
        "method method method"
        "rank determinant eigenValues"
        "scalar scalar scalar"
        "matrix matrix matrix"
        "buttons buttons buttons";
    }

    .answerPanel {
        display:flex;
        grid-area: answerPanel;
        align-items:center;
        justify-content: center;
        margin-top: -75px;
        margin-left:-4px;
        margin-right:-4px;
        grid-row-start: 1;
        grid-row-end: 1;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 204, 255), lightblue, rgb(77, 255, 210));
        padding: 10px 15px 25px 15px;

        display: grid;
        grid-template-columns:1000px;
        grid-template-rows: 30px 200px;
        grid-template-areas:
        "mode"
        "answerTable";

    }

    .mode {
        padding-top: 20px;
        grid-area: mode;
        margin-bottom: 5px;
        align-items: center;
        color: #999;
        font-size: 18px;
    }

    .answerTable {
        grid-area: answerTable;
        margin-bottom: 30px;
        align-items: center;
    }

    .method {
        margin-left:-4px;
        margin-right:-4px;
        grid-area: method;
        font-size: 12px;
        color: white;
        background-color: indigo;
    }

    .determinant {
        grid-area: determinant;
        height: 80px;
    }

    .eigenValues {
        grid-area: eigenValues;
        height: 80px;
    }

    .rank {
        grid-area: rank;
        height: 80px;
    }

    .scalar {
        margin-left:-4px;
        margin-right:-4px;
        grid-area: scalar;
        font-size: 10px;
        background-color: indigo;
        color: white;
    }

    .matrix {
        display: grid;
        grid-template-columns:1fr 1fr 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas: 
        "blank1 doubleMatrix threeBy3 blank2";
        margin-left:-4px;
        margin-right:-4px;
        grid-area: matrix;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
        vertical-align: center;

    }

    .buttons {
        display: grid;
        margin-left:-4px;
        margin-right:-4px;
        grid-template-columns:0px repeat(5, 1fr) 80px; 
        grid-template-rows: 33% 33% 33%;
        grid-template-areas: 
        "blank1 minus fn fn fn fn clear"
        "blank1 plus fn fn fn fn answer"
        "blank1 dot cross absCross swap swap double";
        grid-area: buttons;
         background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 188, 255)); 
        vertical-align: bottom;
        height: 20vh;
    }

    .clear {
        grid-area: clear;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .answer {
        grid-area: answer;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .double {
        grid-area: double;
        background-color: #fd0356;
        color: white;
    }

    .plus {
        grid-area: plus;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .minus {
        grid-area: minus;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .dot {
        grid-area: dot;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .cross {
        grid-area: cross;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .swap {
        grid-area: swap;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .angle {
        grid-column: 3 / 5;
    }

    .absCross {
        grid-area: absCross;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    #method {
        color: white;
    }

    .fn {
        background-color: inherit;
        color: white;
    }

    .value{
        font-size: 12px;
        font-weight: 100;
    }

    #angle {
        font-size: 16px;
    }

    .doubleMatrix {
        //width: 80%;
        display: flex;
        flex-wrap: wrap;
    }

    input {
        margin: 5px;
        padding: 5px 5px 5px 5px;
        width: 50px;
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

    input#scalar {
        width: 60px;
        margin-top: 0;
        margin-bottom: 0;
    }

    // Remove scrollbar from number input fields
    .entry::-webkit-inner-spin-button,
    .entry::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .doubleMatrix {

        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: baseline;
        align-content: space-around;
    }

    .doubleMatrixName {
        width: 100%;
        color: aliceblue;
        font: 14px sans-serif;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
    }

    .component {
        color: #333;
        font-weight: 800;
    }

    .C-component {
        color: #fff;
        font-weight: 800;
    }

    #C {
        font-size: 25px;
    }

    @media screen and (min-width: 736px)
    {
        input {
            width: 70%;
            font-size: 12px;
        }

        #threeBy3 {
             width: 40%;
            float: center;
            margin-left: 30%;
            margin-right: 30%;
            border-radius: 5px;
            margin-top: 16px !important;
            background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        }

        #threeBy3B {
            width: 30%;
            height: 40px;
            opacity: 1;
            float: center;
            margin-left: 35%;
            margin-right: 35%;
            margin-top: 15px !important;
            margin-bottom:5px;
            border-radius: 5px;
            background-image: -webkit-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -moz-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -o-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -ms-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
        }

        .matrix {
            display: grid;
            grid-template-columns:1fr 1fr 1fr;
            grid-template-rows: auto auto auto;
            grid-template-areas: 
            "blank1 doubleMatrix singleMatrix blank2";
            vertical-align: center;
        }

        .buttons {
            display: grid;
            grid-template-columns:2fr repeat(5, 1fr) 150px 2fr;
            grid-template-areas: 
            "blank1 minus fn fn fn fn clear blank2"
            "blank1 plus fn fn fn fn answer blank2"
            "blank1 dot cross absCross swap swap double blank2";
        }

        .blank1 {
            grid-area: blank1;
            background-color: inherit;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 190, 255));
            background-image: -moz-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 190, 255)); 
            background-image: -o-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 190, 255)); 
            background-image: -ms-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 190, 255)); 
            background-image: linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 190, 255));  
        }

        .blank2 {
            grid-area: blank2;
            background-color: lightblue;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: -moz-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: -o-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: -ms-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
        }


        .doubleMatrix, .singleMatrix {
            display: flex;
            width: 100%;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: baseline;
        }

        .opr {
            flex-basis: 50px;
        }

        #threeBy3 {
            width: 700px;
        }

         #first_By3, #sec_By3 {
            width: 300px;
            background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        }



    }

</style>