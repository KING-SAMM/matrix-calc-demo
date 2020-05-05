<template>
    <v-container class="grid"> 
        <section class="answerPanel">
            <!-- Mode -->
            <span class="mode">{{ mode }}</span>
            
            <table id="twoBy2B" class="answerTable w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showAnsMatrix">
                <tbody>
                    <tr>
                        <td><p id="a_adj">{{a11}}</p></td><td><p id="b_adj">{{b12}}</p></td>
                    </tr>
                    <tr>
                        <td><p id="c_adj">{{c21}}</p></td><td><p id="d_adj">{{d22}}</p></td>
                    </tr>
                </tbody>
            </table>
        </section>

       <section class="method"><span id="method">{{ method }}</span></section>

        <section class="determinant">
            <span class="value">Determinant</span><h4 v-show="showDeterminant">{{ det }}</h4>
        </section>

        <section class="eigenValues">
            <span class="value">Eigenvalues</span>
            <h6 v-show="showEigenvalues">{{ lambda1_2 }}</h6>
            <h6 v-show="showEigenvaluesScalarProd">{{ lambdaScalarProd1_2 }}</h6>
        </section>
        <section class="rank"><span class="value">Rank</span><h6 v-show="showRank">{{ rank }}</h6></section>

        <section class="scalar">
            <aside class="doubleMatrixName" v-show="showDoubleInputMatrix">
                <h6>{{ matrixA }}</h6>
                <h6>{{ matrixB }}</h6>
            </aside>
            <input id="scalar" type="number" size="2" v-show="showScalarInputMatrix" v-model.number="scalar" maxlength="3" v-on:keyup="getScalarProduct()" step="1" min="1" placeholder="scalar" class="entry">
        </section>
        
        <section class="matrix">
            <section class="doubleMatrix" v-show="showDoubleInputMatrix">
                <aside class="w3-col s5 m3 table_sec">
                    <table id="first_By2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr">
                        <tbody>
                            <tr>
                            <td><input :type="type" v-model.number="M1_a" size="4" placeholder="x11" class="entry" required></td><td><input :type="type" v-model.number="M1_b" size="4" placeholder="x12" class="entry" required></td>
                            </tr>
                            <tr>
                            <td><input :type="type" v-model.number="M1_c" size="4" placeholder="x21" class="entry" required></td><td><input :type="type" v-model.number="M1_d" size="4" placeholder="x22" class="entry" required></td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
                <aside class="w3-col s1 m1 w3-center table_sec opr"><v-icon>{{opr}}</v-icon></aside>
                <aside class="w3-col s5 m3 table_sec">
                    <table id="sec_By2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr">
                        <tbody>
                            <tr>
                            <td><input :type="type" v-model.number="M2_a" size="4" placeholder="x11" class="entry" required></td><td><input :type="type" v-model.number="M2_b" size="4" placeholder="x12" class="entry" required></td>
                            </tr>
                            <tr>
                            <td><input :type="type" v-model.number="M2_c" size="4" placeholder="x21" class="entry" required></td><td><input :type="type" v-model.number="M2_d" size="4" placeholder="x22" class="entry" required></td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </section>

            <table id="twoBy2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr" v-show="showSingleInputMatrix">
                <tbody>
                    <tr>
                        <td><input size="4" v-model.number="a" maxlength="3" placeholder="x11" class="entry" required></td><td><input size="4" v-model.number="b" maxlength="3" placeholder="x12" class="entry" required></td>
                    </tr>
                    <tr>
                        <td><input size="4" v-model.number="c" maxlength="3" placeholder="x21" class="entry" required></td><td><input size="4" v-model.number="d" maxlength="3" placeholder="x22" class="entry" required></td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="buttons w3-animate-bottom w3-small">
            <!--<aside class=""> -->
            <div class="blank1"></div>    
            <button id="addBtn" class="minus w3-btn" v-on:click="matSubtract()" :class="isDoubleDisabled"><v-icon class="white--text" small>remove</v-icon></button>
            <button id="detBtn" class="fn w3-btn" v-on:click="getDeterminant()" :class="isDisabled">| <i>X</i> |</button>
            <button id="detBtn" class="fn w3-btn" v-on:click="getRank()" :class="isDisabled"> <i>Rnk</i> </button>
            <button id="detBtn" class="fn w3-btn" v-on:click="getEigenValues()" :class="isDisabled"> <i>λ</i> </button>
            <button id="trnBtn" class="fn w3-btn" v-on:click="getTranspose()" :class="isDisabled"><i>X</i><sup>T</sup></button>
            <button id="clrBtn" class="clear special w3-btn" v-on:click="clear()">CLR</button>
            <section class="blank2"></section>

            <button id="matMultiplyBtn" class="matMultiply w3-btn" v-on:click="matMultiply()" :class="isDoubleDisabled"><v-icon class="white--text" small>clear</v-icon></button>
            <button id="adjBtn" class="fn w3-btn" v-on:click="getAdjoint()" :class="isDisabled">ADJ</button>
            <button id="matSquaredBtn" class="fn w3-btn" v-on:click="matSquared()" :class="isDisabled"><i>X</i><sup>2</sup></button>
            <button id="invBtn" class="fn w3-btn" v-on:click="getInverse()" :class="isDisabled"><i>X</i><sup>-1</sup></button>
            <button id="scalarMultiplyBtn" class="fn w3-btn" v-on:click="scalarMultiply()" :class="isDisabled"><strong>k</strong><i>X</i></button>
            <button id="invBtn" class="answer special w3-btn" v-on:click="getAnswer()"><i>ANS</i></button>
          
            <button id="addBtn" class="plus w3-btn" v-on:click="matAdd()" :class="isDoubleDisabled"><v-icon class="white--text" small>add</v-icon></button>
            <button id="invBtn" class="identity w3-btn" v-on:click="getIdentity()"><i>I</i></button>
            <button id="clrBtn" class="swap w3-btn w3-blue" v-on:click="swapMatrices()" :class="isDoubleDisabled">{{ swap }}</button>
            <button id="clrBtn" class="double special w3-btn modeBtn" v-on:click="doubleOperations()">{{ modeBtn }}</button>
            <div class="blank2"></div>

            <!-- </aside> -->
        </section>
        <section class="bottomSpace"></section>
    </v-container>
</template>

<script>
import {find_rational} from '../special_functions/find_rational.js'
import {square} from '../special_functions/squares.js'
import {det2x2} from '../special_functions/determinant.js'
import {eigenvalues2x2} from '../special_functions/eigenvalues.js'

export default {
    name: 'Matrix2x2',
    data() {
        return {
            a: "",
            b: "",
            c: "",
            d: "",
            A: "",
            B: "",
            C: "",
            D: "",
            a11: "",
            b12: "",
            c21: "",
            d22: "",
            M1_a: "", 
            M1_b: "", 
            M1_c: "",
            M1_d: "",
            M2_a: "",
            M2_b: "",
            M2_c: "",
            M2_d: "",
            type: "number",
            matrixA: "A",
            matrixB: "B",
            scalar: "",
            det: "",
            DET: "",
            rank: "",
            lambda1_2: "",
            lambdaScalarProd1_2: "",
            method: "",
            mode: "matrices",
            opr: "",
            showSingleInputMatrix: true,
            showDoubleInputMatrix: false,
            showAnsMatrix: false,
            showDeterminant: false,
            showRank: "",
            showEigenvalues: "",
            showScalarInputMatrix: false,
            showEigenvaluesScalarProd: false,
            isDisabled: "",
            isDoubleDisabled: "w3-disabled",
            modeBtn: "DOUBLE",
            swap: "A <=> B",
        }
    },

    methods: {
        getDeterminant() {

            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") { // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {

                // Convert numeric string to number and assign to holding variable
                this.A = eval(this.a)
                this.B = eval(this.b)
                this.C = eval(this.c)
                this.D = eval(this.d)
               
                let detArr = [[this.A, this.B], [this.C, this.D]]

                // Compute determinant
                this.det = det2x2(detArr)

                // Convert result back to rational numeric string
                this.det = find_rational(this.det).join(" / ")

                // Display only relevant value(s)
                this.scalar = ""
                this.method = ""
                this.rank = ""
                this.showDeterminant = true
                this.showEigenvalues = ""
                this.showEigenvaluesScalarProd = ""
                this.a11 = "" 
                this.b12 = ""
                this.c21 = ""
                this.d22 = ""
                
                
            }
        },
        
        getRank() {
           if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === ""
            ) {
                this.showAnsMatrix = false
                this.showRank = false
                alert("Every entry is required")
            } else if (   // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showRank = false
            } else {
                // Else compute determinant
                this.det = (eval(this.a) * eval(this.d)) - (eval(this.b) * eval(this.c))
                this.det = find_rational(this.det).join(" / ")
                if (this.det !== 0) {
                    this.rank = 2
                    this.method = ""
                    this.showRank = true
                } else if (this.det === 0 && this.a === 0 && this.b === 0 && this.c === 0 && this.d === 0) {
                    this.rank = 0
                    this.method = ""
                    this.showRank = true
                    return
                } else if (this.det === 0 && (this.a !== 0 || this.b !== 0 || this.c !== 0 || this.d !== 0)) {
                    this.rank = 1
                    this.method = ""
                    this.showRank = true
                }
            }
       },

        getTranspose() {

            this.A = eval(this.a)
            this.B = eval(this.b)
            this.C = eval(this.c)
            this.D = eval(this.d)

            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (this.showScalarInputMatrix === false) { // If scalar field is inactive...
                // ... do regular transpose

                this.a11 = find_rational(this.A).join("/")
                this.c21 = find_rational(this.B).join("/") 
                this.b12 = find_rational(this.C).join("/")
                this.d22 = find_rational(this.D).join("/")

                this.method = "Transpose"
                this.showAnsMatrix = true
            } else if (this.showScalarInputMatrix === true && (this.scalar === "" || this.scalar === undefined || this.scalar === isNaN)) { // If scalar is not set...
                // ... do regular transpose

                this.a11 = find_rational(this.A).join("/")
                this.c21 = find_rational(this.B).join("/") 
                this.b12 = find_rational(this.C).join("/")
                this.d22 = find_rational(this.D).join("/")

                this.method = "Transpose"
                this.showAnsMatrix = true
            } else if (this.showScalarInputMatrix === true && (this.scalar !== "" || this.scalar !== undefined)) { // If scalar is set...
                // ... do scalar multiplication of transpose
                this.a11 = find_rational(this.A * eval(this.scalar)).join("/")
                this.c21 = find_rational(this.B * eval(this.scalar)).join("/")
                this.b12 = find_rational(this.C * eval(this.scalar)).join("/")
                this.d22 = find_rational(this.D * eval(this.scalar)).join("/")

                this.method = this.scalar + " x Transpose"
                this.showAnsMatrix = true

            } 
        },

        getAdjoint() {
            this.showEigenvaluesScalarProd = false
            this.showEigenvalues = false
            this.showScalarInputMatrix = false
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.showScalarInputMatrix = false) { // If scalar is not set
                this.showEigenvaluesScalarProd = false
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                this.a11 = this.d 
                this.B = -1 * eval(this.b)
                this.b12 = find_rational(this.B).join(" / ") 
                this.C = -1 * eval(this.c)
                this.c21 = find_rational(this.C).join(" / ")
                this.d22 = this.a

                this.showScalarInputMatrix = false
                this.method = "Adjoint"
                this.showAnsMatrix = true
                this.scalar = ""
                this.showEigenvalues = ""
                this.showEigenvaluesScalarProd = ""
            }

        },

        getInverse() {
             if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
                return
            } 


            function scalarMultiply(arr) {return arr *= num }

            function scalarMultiplyArray(arr, rows) {
                let arr2 = []
                for(let i = 0; i < rows; i++) {
                    arr2[i] = arr[i].map(scalarMultiply)
                }
            return arr2
            }
            
            
            let newMat = []

            this.A = eval(this.a)
            this.B = eval(this.b)
            this.C = eval(this.c)
            this.D = eval(this.d)

            let mat2By2 = [[this.A, this.B],[this.C, this.D]]
            let det = (this.A * this.D) - (this.B * this.C)
            let num = (1/det)
            let rows = 2
            
            if (det === 0) {
                alert("Matrix is NON-INVERTIBLE when Det = 0")
            } else {
                newMat = scalarMultiplyArray(mat2By2, rows)


                let rationalA = find_rational(newMat[0][0])
                let rationalB = find_rational(-1 * newMat[0][1])
                let rationalC = find_rational(-1 * newMat[1][0])
                let rationalD = find_rational(newMat[1][1])
                
                this.d22 = rationalA.join(" / ")
                this.b12 = rationalB.join(" / ")
                this.c21 = rationalC.join(" / ")
                this.a11 = rationalD.join(" / ")

                this.showScalarInputMatrix = false
                this.method = "Inverse"
                // this.showEigenvaluesScalarProd = false
                this.showAnsMatrix = true
            }
            
        },


        getEigenValues() {
            this.a11 = ""
            this.b12 = ""
            this.c21 = ""
            this.d22 = ""

            // Comvert numeric string to number and assign into holding variables
            this.A = eval(this.a)
            this.B = eval(this.b)
            this.C = eval(this.c)
            this.D = eval(this.d)

            let Arr = [[this.A, this.B], [this.C, this.D]]


            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  // If any input is missing...
                // ...show alert and do nothing
                this.showEigenvalues = false
                this.method = ""
                alert("Every entry is required")
            } else if (this.showScalarInputMatrix === false) { // If scalar field is inactive...
                // ... do regular eigenvalues

                this.lambda1_2 = eigenvalues2x2(Arr).join(", ")

                this.showEigenvalues = true
                this.showEigenvaluesScalarProd = false
                this.method = ""
            
            } else if (this.showScalarInputMatrix === true && (this.scalar === "" || this.scalar === undefined || this.scalar === isNaN)) { // If scalar is not set...
                // ... do regular eigenvalues

                this.lambda1_2 = eigenvalues2x2(Arr).join(", ")

                this.showEigenvalues = true
                this.showEigenvaluesScalarProd = false
                this.method = ""

            } else if (this.showScalarInputMatrix === true && (this.scalar !== "" || this.scalar !== undefined)) { // If scalar is set...
                // ... do scalar multiplication of and find eigenvalues of scalar product
                this.a11 = this.A * eval(this.scalar)
                this.b12 = this.B * eval(this.scalar)
                this.c21 = this.C * eval(this.scalar)
                this.d22 = this.D * eval(this.scalar)

                Arr = [[this.a11, this.b12], [this.c21, this.d22]] 

                this.lambda1_2 = eigenvalues2x2(Arr).join(", ")

                // Reconvert answer matrix elements back to string rationals
                this.a11 = find_rational(this.A * eval(this.scalar)).join("/")
                this.b12 = find_rational(this.B * eval(this.scalar)).join("/")
                this.c21 = find_rational(this.C * eval(this.scalar)).join("/")
                this.d22 = find_rational(this.D * eval(this.scalar)).join("/")

                this.showEigenvalues = false
                this.showEigenvaluesScalarProd = true
                this.method = "Eigenvalues of " + this.scalar + " x Matrix"
                this.showAnsMatrix = true

            } 
        },

        clear() {
            // Clear answer matrix
            this.a11 = "" 
            this.b12 = "" 
            this.c21 = ""
            this.d22 = ""
            this.lambda1_2 = ""
            this.lambdaScalarProd1_2 = ""
            this.method = ""
            this.showAnsMatrix = false

            // Clear single operations matrix
            if (this.showSingleInputMatrix === true && this.showDoubleInputMatrix === false) {
                this.a = "" 
                this.b = "" 
                this.c = ""
                this.d = ""
                this.det = ""
                this.scalar = ""
                this.rank = ""
                this.showScalarInputMatrix = false

            // Clear binary operations matrices
            } else if (this.showSingleInputMatrix === false && this.showDoubleInputMatrix === true) {
                this.M1_a = "" 
                this.M1_b = "" 
                this.M1_c = ""
                this.M1_d = ""
                this.M2_a = "" 
                this.M2_b = "" 
                this.M2_c = ""
                this.M2_d = ""
                this.opr = ""
            }
        }, 

        doubleOperations() {        
            this.det = ""
            this.rank = ""
            this.method = ""
            this.showAnsMatrix = false
            this.showScalarInputMatrix = false
            this.showSingleInputMatrix = !this.showSingleInputMatrix
            this.showDoubleInputMatrix = !this.showDoubleInputMatrix

            // Enable buttons and view for binary operations when on double matrices mode
            if (this.showDoubleInputMatrix === true) {
                // Clear out single operations variables
                this.a = this.b = this.c = this.d = ""

                this.lambda1_2 = ""
                this.lambdaScalarProd1_2 = ""
                this.isDisabled = "w3-disabled"
                this.isDoubleDisabled = !this.isDoubleDisabled
                this.modeBtn = "SINGLE"
                this.opr = ""

            // Disable buttons and view for binary operations when on single matrix mode
            } else if (this.showDoubleInputMatrix === false) {
                // Clear out double operations variables
                this.M1_a = this.M1_b = this.M1_c = this.M1_d = ""
                this.M2_a = this.M2_b = this.M2_c = this.M2_d = ""


                this.isDisabled = !this.isDisabled
                this.isDoubleDisabled = "w3-disabled"
                this.modeBtn = "DOUBLE"
            }
        },

        matAdd() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else 
            // If any entry is missing, show alert and do nothing...
            if (this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix addition
                this.a11 = this.M1_a + this.M2_a
                this.b12 = this.M1_b + this.M2_b
                this.c21 = this.M1_c + this.M2_c
                this.d22 = this.M1_d + this.M2_d

                this.showAnsMatrix = true
                
                this.opr = "add"
                this.method = "Matrix Addition"
            }
        },

         matSubtract() {
             if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else 
             // If any entry is missing, show alert and do nothing..
            if (this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix subtraction
                this.a11 = this.M1_a - this.M2_a
                this.b12 = this.M1_b - this.M2_b
                this.c21 = this.M1_c - this.M2_c
                this.d22 = this.M1_d - this.M2_d

                this.showAnsMatrix = true
                
                this.opr = "remove"
                this.method = "Matrix Subtraction"
            }
        },

        matMultiply() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else 
            // If any entry is missing, show alert and do nothing..
            if (this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix multiplication
                this.a11 = (this.M1_a * this.M2_a) + (this.M1_b * this.M2_c)
                this.b12 = (this.M1_a * this.M2_b) + (this.M1_b * this.M2_d)
                this.c21 = (this.M1_c * this.M2_a) + (this.M1_d * this.M2_c)
                this.d22 = (this.M1_c * this.M2_b) + (this.M1_d * this.M2_d)

                this.showAnsMatrix = true
                
                this.opr = "clear"
                this.method = "Matrix Multiplication"
            }
        },

        matSquared() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else 
            // If any entry is missing, show alert and do nothing..
            if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix squared
                this.A = (eval(this.a) * eval(this.a)) + (eval(this.b) * eval(this.c))
                this.B = (eval(this.a) * eval(this.b)) + (eval(this.b) * eval(this.d))
                this.C = (eval(this.c) * eval(this.a)) + (eval(this.d) * eval(this.c))
                this.D = (eval(this.c) * eval(this.b)) + (eval(this.d) * eval(this.d))

                this.a11 = find_rational(this.A).join(" / ")
                this.b12 = find_rational(this.B).join(" / ")
                this.c21 = find_rational(this.C).join(" / ")
                this.d22 = find_rational(this.D).join(" / ")

                this.showAnsMatrix = true
                
                this.showScalarInputMatrix = false
                //this.opr = "clear"
                this.method = "Matrix Squared"
                this.showEigenvalues = ""
                this.showEigenvaluesScalarProd = ""
            }
        },

        /**
         * Scalar multiplication by button click
         */
        scalarMultiply() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } 
            this.showScalarInputMatrix = true
            this.scalar 

            // If scalar is missing, non-numeric or undefined, do nothing...
            if (this.scalar === undefined || this.scalar === "" || this.scalar === isNaN) {
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  
                //...else if any entry is missing or invalid, show alert and do nothing
                alert("Every entry is required")
                return
            } else if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {
                //...else if scalar is provided and valid, proceed with scalar multiplication

                this.A = eval(this.a)
                this.B = eval(this.b)
                this.C = eval(this.c)
                this.D = eval(this.d)

                let arr = [[this.A, this.B],[this.C, this.D]]

                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        arr[i][j] = eval(this.scalar) * arr[i][j]
                    }
                }


                this.a11 = find_rational(arr[0][0]).join(" / ") 
                this.b12 = find_rational(arr[0][1]).join(" / ")
                this.c21 = find_rational(arr[1][0]).join(" / ")
                this.d22 = find_rational(arr[1][1]).join(" / ")

                this.method = "Scalar Multiplication"
                this.showAnsMatrix = true
            } 
        },

        /**
         * Scalar multiplication on keyup from scalar input field
         */
        getScalarProduct() {
            this.A = eval(this.a)
            this.B = eval(this.b)
            this.C = eval(this.c)
            this.D = eval(this.d)

            let arr = [[this.A, this.B],[this.C, this.D]]

            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } 

            // If scalar is non-numeric or undefined, do nothing...
            if (this.scalar === undefined || this.scalar === isNaN || this.a === "" || this.b === "" || this.c === "" || this.d === "") {
                this.a11 = "" 
                this.b12 = "" 
                this.c21 = ""
                this.d22 = ""
                return
            }

            // If scalar is missing, update eigenvalues accordingly
            if (this.showScalarInputMatrix === true && this.scalar === "") {

                this.lambda1_2 = eigenvalues2x2(arr).join(", ")

                // ...and display relevant values
                this.showEigenvalues = true
                this.showEigenvaluesScalarProd = false
                this.method = ""

                this.a11 = this.a 
                this.b12 = this.b 
                this.c21 = this.c
                this.d22 = this.d
            
                return
            }

            //...else if scalar is provided and valid, proceed with scalar multiplication
            if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {

                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        arr[i][j] = eval(this.scalar) * arr[i][j]
                    }
                }

                // Eigenvalues of scalar product matrix
                this.lambdaScalarProd1_2 = eigenvalues2x2(arr).join(", ")

                // Display scalar product matrix with string rational elements
                this.a11 = find_rational(arr[0][0]).join(" / ") 
                this.b12 = find_rational(arr[0][1]).join(" / ")
                this.c21 = find_rational(arr[1][0]).join(" / ")
                this.d22 = find_rational(arr[1][1]).join(" / ")

                this.showDeterminant = false
                this.method = "Scalar Multiplication"
                this.showAnsMatrix = true
                this.showEigenvalues === false

                if (this.showEigenvalues === false && this.showEigenvaluesScalarProd === false) { 
                    // If eigenbalues are NOT already displayed, leave them undisplayed 
                    this.showEigenvalues = false
                    this.showEigenvaluesScalarProd = false
                } else if ((this.showEigenvalues === false && this.showEigenvaluesScalarProd === true) || (this.showEigenvalues === true && this.showEigenvaluesScalarProd === false)) {
                    // However, if displayed, update them accordingly
                    this.showEigenvalues = false
                    this.showEigenvaluesScalarProd = true
                }
            }
        },
        getIdentity() {
            if (this.showDoubleInputMatrix !== true && (this.a === "" && this.b === "" && this.c === "" && this.d === "")) {
                this.a = 1
                this.b = 0
                this.c = 0
                this.d = 1

                this.scalar = ""
                this.det = ""
                this.rank = ""
                return
            } else if (this.showDoubleInputMatrix !== true && (this.a !== 1 && this.d !== 1)) {
                this.a = 1
                this.b = 0
                this.c = 0
                this.d = 1

                this.a11 = ""
                this.b12 = ""
                this.c21 = ""
                this.d22 = ""

                this.scalar = ""
                this.det = ""
                this.rank = ""
                return
            } else if (this.showDoubleInputMatrix !== true && (this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1)) {
                this.a11 = this.a
                this.b12 = this.b
                this.c21 = this.c
                this.d22 = this.d

                this.scalar = ""
                return
            } else if (this.showDoubleInputMatrix === true) {
                this.M2_a = 1
                this.M2_b = 0
                this.M2_c = 0
                this.M2_d = 1
            }
        },

        swapMatrices() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (this.showSingleInputMatrix === false && this.swap === "A <=> B") {
                this.swap = "B <=> A"

                this.a = this.M1_a
                this.b = this.M1_b
                this.c = this.M1_c
                this.d = this.M1_d

                this.M1_a = this.M2_a
                this.M1_b = this.M2_b
                this.M1_c = this.M2_c
                this.M1_d = this.M2_d

                this.M2_a = this.a
                this.M2_b = this.b
                this.M2_c = this.c
                this.M2_d = this.d

                this.a = this.b = this.c = this.d = ""
                this.a11 = this.b12 = this.c21 = this.d22 = ""

                this.opr = ""
                this.method = ""
                this.matrixA = "B"
                this.matrixB = "A"

                return
            } else if (this.showSingleInputMatrix === false && this.swap === "B <=> A") {
                this.swap = "A <=> B"

                this.a = this.M1_a
                this.b = this.M1_b
                this.c = this.M1_c
                this.d = this.M1_d

                this.M1_a = this.M2_a
                this.M1_b = this.M2_b
                this.M1_c = this.M2_c
                this.M1_d = this.M2_d

                this.M2_a = this.a
                this.M2_b = this.b
                this.M2_c = this.c
                this.M2_d = this.d

                this.a = this.b = this.c = this.d = ""
                this.a11 = this.b12 = this.c21 = this.d22 = ""
                
                this.opr = ""
                this.method = ""
                this.matrixA = "A"
                this.matrixB = "B"
                return
            }
        },

         getAnswer() {
            if (this.showDoubleInputMatrix === false) {
                // Move answer matrix to input matrix (for further manipulation)...

                this.A = eval(this.a11)
                this.B = eval(this.b12)
                this.C = eval(this.c21)
                this.D = eval(this.d22)

                this.a = find_rational(this.A).join(" / ")
                this.b = find_rational(this.B).join(" / ")
                this.c = find_rational(this.C).join(" / ")
                this.d = find_rational(this.D).join(" / ")

                // this.a = this.a11
                // this.b = this.b12
                // this.c = this.c21
                // this.d = this.d22

                // this.a = this.A
                // this.b = this.B
                // this.c = this.C
                // this.d = this.D



                // Clear values based up of previous input matrix
                this.scalar = ""
                this.det = ""
                this.rank = ""

                // ..and clear answer matrix
                this.a11 = ""
                this.b12 = ""
                this.c21 = ""
                this.d22 = ""
            } else if (this.showDoubleInputMatrix === true) {
                // Move answer matrix to matrix A (for further manipulation)
                this.M1_a = this.a11
                this.M1_b = this.b12
                this.M1_c = this.c21
                this.M1_d = this.d22

                // ..and clear answer matrix and matrix B
                this.a11 = this.M2_a = ""
                this.b12 = this.M2_b = ""
                this.c21 = this.M2_c = ""
                this.d22 = this.M2_d = ""

                this.method = this.opr = ""
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
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 175px 18px 70px 24px 120px 70px;
        max-height: 100vh;
        grid-template-areas: 
        "answerPanel answerPanel answerPanel"
        "method method method"
        "rank determinant eigenValues"
        "scalar scalar scalar"
        "matrix matrix matrix"
        "buttons buttons buttons"
        "bottomSpace bottomSpace bottomSpace";
        box-sizing: border-box; 
    }

    .answerPanel {
        grid-area: answerPanel;
        margin-left:-4px;
        margin-right:-4px;
        margin-top: -75px;
        align-items:center;
        justify-content: center;
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
        grid-area: method;
        margin-left:-4px;
        margin-right:-4px;
        font-size: 12px;
        color: white;
        background-color: indigo;
    }

    .determinant {
        grid-area: determinant;
    }

    .eigenValues {
        grid-area: eigenValues;
    }

    .rank {
        grid-area: rank;
    }

    .scalar {
        grid-area: scalar;
        margin-left:-4px;
        margin-right:-4px;
        font-size: 10px;
        background-color: indigo;
    }

    .matrix {
        grid-area: matrix;
        margin-left:-4px;
        margin-right:-4px;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
         // rgb(252, 213, 105);
    }
    

    // Button as subgrid
    .buttons {
        display: grid;
        grid-template-columns:0px repeat(5, 1fr) 80px; 
        grid-template-rows: 33% 33% 33%;
        grid-template-areas: 
        "blank1 minus fn fn fn fn clear"
        "blank1 matMultiply fn fn fn fn answer"
        "blank1 plus fn fn fn fn double";
        grid-area: buttons;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 188, 255)); 
        vertical-align: bottom;
        margin-left:-4px;
        margin-right:-4px;
        height: 20vh;
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

    .answer {
        grid-area: answer;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .double {
        grid-area: double;
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

    .matMultiply {
        grid-area: matMultiply;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .swap {
        grid-column: 5 / 7;
    }

    .identity {
        grid-column: 3 / 5;
        background-color: inherit;
        color: white;
    }


    #method {
        color: white;
    }

    .fn {
        background-color: inherit;
        color: white;
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

    #scalar {
        box-sizing: 4;
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

    #first_By2, #sec_By2 {
        width: 100%;      //100px;
        border-radius: 5px;
        margin-top: 16px !important;
        background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
    }

    .doubleMatrix {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
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
        margin-top: 15px !important;
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
            grid-template-rows: 115px 15px 80px 20px 125px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 200px 15px 80px 20px 140px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 265px 15px 80px 20px 140px auto 15px;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons"
            "bottomSpace bottomSpace bottomSpace";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }
    }

    // iPhone 5/5E (Landscape)
     @media screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 60px 15px 60px 20px 50px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 170px 15px 80px 20px 165px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons {
            margin-left: -5%;
            margin-right: -5%;
        }

        .buttons {
            margin-bottom: -5%;
        }
    }

    // iPhone 6/7/8 (Landscape)
    @media screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)
    {
        .grid {
            grid-template-rows: 170px 15px 80px 20px 165px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 200px 15px 80px 20px 140px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 240px 15px 80px 20px 140px auto 15px;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons"
            "bottomSpace bottomSpace bottomSpace";
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }
    }

    // iPhone X (Landscape)
     @media screen and (min-device-width: 812px) and (max-device-height: 375px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)
    {
        .grid {
            grid-template-rows: 80px 10px 40px 15px 60px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 145px 15px 80px 20px 160px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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

    // Samsung Galaxy S5 (Landscape)
     @media screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)
    {
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 70px 15px 60px 20px 110px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 280px 20px 100px 30px 230px auto 125px;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
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
            grid-template-rows: 200px 20px 100px 30px 190px auto;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons"
           // "bottomSpace bottomSpace bottomSpace";
        }

        .matrix > #twoBy2 {
            width: 245px;
        }

        .answerPanel, .scalar, .method, .matrix, .buttons, .bottomSpace {
            margin-left: -5%;
            margin-right: -5%;
        }

        .buttons {
            margin-bottom: -5%;
        }
    }


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
            grid-template-rows: 175px 18px 70px 24px 120px 70px;
            max-height: 100vh;
            grid-template-areas: 
            "answerPanel answerPanel answerPanel"
            "method method method"
            "rank determinant eigenValues"
            "scalar scalar scalar"
            "matrix matrix matrix"
            "buttons buttons buttons";
            box-sizing: border-box;
        }

       

            
        #twoBy2 {
            width: 26%;
            float: center;
            margin-left: 37%;
            margin-right: 37%;
            border-radius: 5px;
            margin-top: 0 !important;
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
            margin-top: 15px !important;
            margin-bottom:5px;
            background-image: -webkit-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -moz-linear-gradient(120deg, rgb(38, 140, 235), rgb(132, 117, 217));
            background-image: -o-linear-gradient(120deg, rgb(38, 140, 235),rgb(132, 117, 217));
            background-image: -ms-linear-gradient(120deg, rgb(38, 140, 235),rgb(132, 117, 217));
            background-image: linear-gradient(120deg, rgb(38, 140, 235),rgb(132, 117, 217));
        }

        #first_By2, #sec_By2 {
            background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        }


        .buttons {
            display: grid;
            grid-template-columns:2fr repeat(5, 1fr) 150px 2fr;
            grid-template-areas: 
            "blank1 minus fn fn fn fn clear blank2"
            "blank1 matMultiply fn fn fn fn answer blank2"
            "blank1 plus fn fn fn fn double blank2";
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

        .swap {
        grid-column: 5 / 7;
        }

        .identity {
            grid-column: 3 / 5;
            background-color: inherit;
            color: white;
        }

    }



</style>