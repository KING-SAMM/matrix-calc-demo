<template>
    <v-container class="grid">
        <section class="answerPanel" id="answerPanel">
        <!-- Mode -->
            <span class="mode">{{ mode }}</span>

            <table id="threeBy3Ans" class="answerTable w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showAnsMatrix">
                <tbody>
                    <tr>
                        <td><p id="a_adj">{{a11}}</p></td><td><p id="b_adj">{{b12}}</p></td><td><p id="c_adj">{{c13}}</p></td>
                    </tr>
                    <tr>
                        <td><p id="d_adj">{{d21}}</p></td><td><p id="e_adj">{{e22}}</p></td><td><p id="f_adj">{{f23}}</p></td>
                    </tr>
                    <tr>
                        <td><p id="g_adj">{{g31}}</p></td><td><p id="h_adj">{{h32}}</p></td><td><p id="i_adj">{{i33}}</p></td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="method"><span id="method">{{ method }}</span></section>

        <section class="determinant" v-if="removeSection">
            <span class="value">Determinant</span><h4 v-show="showDeterminant">{{ det }}</h4>
        </section>

        <section class="eigenValues" v-if="removeSection">
            <span class="value">Eigenvalues</span>
            <h6 v-show="showEigenvalues">{{ lambda1_2 }}</h6>
            <h6 v-show="showEigenvaluesScalarProd">{{ lambdaScalarProd1_2 }}</h6>
        </section>
        <section class="rank" v-if="removeSection"><span class="value">Rank</span><h6 v-show="showRank">{{ rank }}</h6></section>

        <section class="scalar">
            <aside class="doubleMatrixName" v-show="showDoubleInputMatrix">
                <h6>{{ matrixA }}</h6>
                <h6>{{ matrixB }}</h6>
            </aside>
            <input id="scalar" type="number" size="4" v-show="showScalarInputMatrix" v-model.number="scalar" maxlength="3" v-on:keyup="getScalarProduct()" class="entry" placeholder="scalar">
        </section>

        <!--<section class="matrices w3-container w3-center">
            
        </section> -->

        <section class="matrix">
            <div class="blankPre"></div>
            <aside class="doubleMatrix" v-show="showDoubleInputMatrix">
                <!-- <aside class="w3-col s5 m3 w3-center table_sec"> -->
                <table id="first_By3" class="w3-center table_sec w3-animate-zoom w3-card-4 w3-black w3-centered tr td">
                    <tbody>
                        <tr><td><input type="number" v-model.number="M1_a" size="4" class="entry" placeholder="x11"></td><td><input type="number" v-model.number="M1_b" size="4" class="entry" placeholder="x12"></td><td><input type="number" v-model.number="M1_c" size="4" class="entry" placeholder="x13"></td></tr>
                        <tr><td><input type="number" v-model.number="M1_d" size="4" class="entry" placeholder="x21"></td><td><input type="number" v-model.number="M1_e" size="4" class="entry" placeholder="x22"></td><td><input type="number" v-model.number="M1_f" size="4" class="entry" placeholder="x23"></td></tr>
                        <tr><td><input type="number" v-model.number="M1_g" size="4" class="entry" placeholder="x31"></td><td><input type="number" v-model.number="M1_h" size="4" class="entry" placeholder="x32"></td><td><input type="number" v-model.number="M1_i" size="4" class="entry" placeholder="x33"></td></tr>
                    </tbody>
                </table>
                <!-- </aside> -->
                <table id="opr" class="opr w3-center w3-animate-zoom w3-centered tr td">
                    <tbody>
                        <tr><td><v-icon>{{ opr }}</v-icon></td></tr>
                    </tbody>
                </table>
                <!-- <aside class="w3-col s5 m3 w3-center table_sec"> -->
                <table id="sec_By3" class="w3-center table_sec w3-animate-zoom w3-card-4 w3-black w3-centered tr td">
                    <tbody>
                        <tr><td><input type="number" v-model.number="M2_a" size="4" class="entry" placeholder="x11"></td><td><input type="number" v-model.number="M2_b" size="4" class="entry" placeholder="x12"></td><td><input type="number" v-model.number="M2_c" size="4" class="entry" placeholder="x13"></td></tr>
                        <tr><td><input type="number" v-model.number="M2_d" size="4" class="entry" placeholder="x21"></td><td><input type="number" v-model.number="M2_e" size="4" class="entry" placeholder="x22"></td><td><input type="number" v-model.number="M2_f" size="4" class="entry" placeholder="x23"></td></tr>
                        <tr><td><input type="number" v-model.number="M2_g" size="4" class="entry" placeholder="x31"></td><td><input type="number" v-model.number="M2_h" size="4" class="entry" placeholder="x32"></td><td><input type="number" v-model.number="M2_i" size="4" class="entry" placeholder="x33"></td></tr>
                    </tbody>
                </table>
                <!-- </aside> -->
            </aside>

            <aside class="singleMatrix" v-show="showSingleInputMatrix">
                <table id="threeBy3" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr td" v-show="showSingleInputMatrix">
                    <tbody>
                        <tr><td><input v-model.number="a" size="4" class="entry" placeholder="x11"></td><td><input v-model.number="b" size="4" class="entry" placeholder="x12"></td><td><input v-model.number="c" size="4" class="entry" placeholder="x13"></td></tr>
                        <tr><td><input v-model.number="d" size="4" class="entry" placeholder="x21"></td><td><input v-model.number="e" size="4" class="entry" placeholder="x22"></td><td><input v-model.number="f" size="4" class="entry" placeholder="x23"></td></tr>
                        <tr><td><input v-model.number="g" size="4" class="entry" placeholder="x31"></td><td><input v-model.number="h" size="4" class="entry" placeholder="x32"></td><td><input v-model.number="i" size="4" class="entry" placeholder="x33"></td></tr>
                    </tbody>
                </table>
            </aside>
            <div class="blankPost"></div>
        </section>

        <section class="buttons w3-animate-bottom w3-small">
            <div class="blank1"></div>
            <button id="subBtn" class="minus w3-btn" v-on:click="getSubtraction()" :class="isDoubleDisabled"><v-icon class="white--text" small>remove</v-icon></button>
            <button class="fn w3-btn" v-on:click="getDeterminant()" :class="isDisabled">| <i>X</i> |</button>
            <button class="fn w3-btn" v-on:click="getRank()" :class="isDisabled"><i>Rnk</i></button>
            <button id="detBtn" class="fn w3-btn" v-on:click="getEigenValues()" :class="isDisabled"> <i>λ</i> </button>
            <button class="fn w3-btn" v-on:click="getTranspose()" :class="isDisabled"><i>X</i><sup>T</sup></button>
            <button class="clear special w3-btn" v-on:click="clear()">CLR</button> 
            <section class="blank2"></section>

            <button id="matMultiplyBtn" class="matMultiply w3-btn" v-on:click="matMultiply()" :class="isDoubleDisabled"><v-icon class="white--text" small>clear</v-icon></button>
            <button id="adjBtn" class="fn w3-btn" v-on:click="getAdjoint()" :class="isDisabled">ADJ</button>
            <button id="matSquaredBtn" class="fn w3-btn" v-on:click="matSquared()" :class="isDisabled"><i>X</i><sup>2</sup></button>
            <button id="invBtn" class="fn w3-btn" v-on:click="getInverse()" :class="isDisabled"><i>X</i><sup>-1</sup></button>
            <button id="scalarMultiplyBtn" class="fn w3-btn" v-on:click="scalarMultiply()" :class="isDisabled"><strong>k</strong><i>X</i></button>
            <button id="invBtn" class="answer special w3-btn" v-on:click="getAnswer()"><i>ANS</i></button>
            
            <button id="addBtn" class="plus w3-btn" v-on:click="getSum()" :class="isDoubleDisabled"><v-icon class="white--text" small>add</v-icon></button> 
            <button id="invBtn" class="identity w3-btn" v-on:click="getIdentity()"><i>I</i></button>
            <button id="clrBtn" class="swap w3-btn w3-blue" v-on:click="swapMatrices()" :class="isDoubleDisabled">{{ swap }}</button>
            <button id="clrBtn" class="double special w3-btn modeBtn" v-on:click="doubleOperations()">{{ modeBtn }}</button>
            <section class="blank2"></section>
    
        </section>
    </v-container>
</template>

<script>
import {find_rational} from '../special_functions/find_rational.js'
import {adjoint3x3} from '../special_functions/matrix_Adjoint_3x3.js'
import {det3x3} from '../special_functions/determinant.js'
import {eigenvalues3x3} from '../special_functions/eigenvalues.js'


export default {
    name: 'Matrix3x3',
    data() {
        return {
            a: "",
            b: "",
            c: "",
            d: "",
            e: "",
            f: "",
            g: "",
            h: "",
            i: "",
            A: "",
            B: "",
            C: "",
            D: "",
            E: "",
            F: "",
            G: "",
            H: "",
            I: "",
            a11: "",
            b12: "",
            c13: "",
            d21: "",
            e22: "",
            f23: "",
            g31: "",
            h32: "",
            i33: "",
            M1_a: "", 
            M1_b: "", 
            M1_c: "",
            M1_d: "",
            M1_e: "", 
            M1_f: "", 
            M1_g: "",
            M1_h: "",
            M1_i: "",
            M2_a: "",
            M2_b: "",
            M2_c: "",
            M2_d: "",
            M2_e: "", 
            M2_f: "", 
            M2_g: "",
            M2_h: "",
            M2_i: "",
            det: "",
            rank: "",
            lambda1_2: "",
            lambdaScalarProd1_2: "",
            method: "",
            mode: "matrices",
            matrixA: "A",
            matrixB: "B",
            opr: "",
            scalar: "",
            removeSection: true,
            showScalarInputMatrix: false,
            showSingleInputMatrix: true,
            showDoubleInputMatrix: false,
            showAnsMatrix: false,
            showDeterminant: false,
            showRank: false,
            showEigenvalues: "",
            showEigenvaluesScalarProd: false,
            isDisabled: true,
            isDoubleDisabled: "w3-disabled",
            modeBtn: "DOUBLE",
            swap: "A <=> B"

        }
    },

    methods: {
        getDeterminant() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (   // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
            } else {
                // Else compute determinant
                let detArr = [[eval(this.a), eval(this.b), eval(this.c)], [eval(this.d), eval(this.e), eval(this.f)], [eval(this.g), eval(this.h), eval(this.i)]]
               
                this.det = det3x3(detArr)
                this.det = find_rational(this.det).join(" / ")

                // Display only relevant value(s)
                this.scalar = ""
                this.method = ""
                this.rank = ""
                this.showDeterminant = true
                this.showEigenvalues = ""
                this.showEigenvaluesScalarProd = ""
                this.a11 = ""
                this.d21 = ""
                this.g31 = ""
                this.b12 = ""
                this.e22 = "" 
                this.h32 = "" 
                this.c13 = ""
                this.f23 = ""
                this.i33 = ""
            }
       },

       getRank() {
           // Comvert numeric string to number and assign into holding variables
            this.A = eval(this.a)
            this.B = eval(this.b) 
            this.C = eval(this.c)
            this.D = eval(this.d) 
            this.E = eval(this.e) 
            this.F = eval(this.f)
            this.G = eval(this.g) 
            this.H = eval(this.h) 
            this.I = eval(this.i) 

           if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showRank = false
                alert("Every entry is required")
            } else if (   // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showRank = false
            } else {
                // Else compute determinant
                this.det = this.A * ((this.E * this.I) - (this.H * this.F)) - this.B * ((this.D * this.I) - (this.G * this.F)) + this.C * ((this.D * this.H) - (this.G * this.E))
                this.det = find_rational(this.det).join(" / ")

                if (this.det !== 0) {
                    this.rank = 3
                    this.method = ""
                    this.showRank = true
                } else if (this.det === 0 && this.A === 0 && this.B === 0 && this.C === 0 && this.D === 0 && this.E === 0 && this.F === 0 && this.G === 0 && this.H === 0 && this.I === 0) {
                    this.rank = 0
                    this.method = ""
                    this.showRank = true
                    return
                } else if (this.det === 0 && ((this.E * this.I) - (this.H * this.F) !== 0 || (this.D * this.I) - (this.G * this.F) !== 0 || (this.D * this.H) - (this.G * this.E) !== 0
                || (this.B * this.I) - (this.H * this.C) !== 0 || (this.A * this.I) - (this.G * this.C) !== 0 || (this.A * this.H) - (this.G * this.B) !== 0
                || (this.B * this.F) - (this.E * this.C) !== 0 || (this.A * this.F) - (this.D * this.C) !== 0 || (this.A * this.E) - (this.D * this.B) !== 0)) {
                    this.rank = 2
                    this.method = ""
                    this.showRank = true
                } else if ((this.A !== 0 || this.B !== 0 || this.C !== 0 || this.D !== 0 || this.E !== 0 || this.F !== 0 || this.G !== 0 || this.H !== 0 || this.I !== 0) && ((this.E * this.I) - (this.H * this.F) === 0 && (this.D * this.I) - (this.G * this.F) === 0 && (this.D * this.H) - (this.G * this.E) === 0
                && (this.B * this.I) - (this.H * this.C) === 0 && (this.A * this.I) - (this.G * this.C) === 0 && (this.A * this.H) - (this.G * this.B) === 0
                && (this.B * this.F) - (this.E * this.C) === 0 && (this.A * this.F) - (this.D * this.C) === 0 && (this.A * this.E) - (this.D * this.B) === 0)) {
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
            this.E = eval(this.e) 
            this.F = eval(this.f)
            this.G = eval(this.g) 
            this.H = eval(this.h) 
            this.I = eval(this.i) 

            let arr = [[this.A, this.B, this.C], [this.D, this.E, this.F], [this.G, this.H, this.I]]
            let arr2 = [[this.a11, this.b12, this.c13], [this.d21, this.e22, this.f23], [this.g31, this.h32, this.i33]];

            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (   // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if ((this.showScalarInputMatrix === false) || (this.showScalarInputMatrix === true && (this.scalar === "" || this.scalar === undefined || this.scalar === isNaN))) { 
                // If scalar field is inactive or scalar is not set...
                // ... do regular transpose
                let rows = 3
                let cols = 3
            
                for (let i = 0; i < rows; ++i) {
                    let columns = []
                    for (let j = 0; j < cols; ++j) {
                        columns[j] = arr[j][i]           
                    }
                    arr2[i] = columns
                }

                this.a11 = find_rational(arr2[0][0]).join("/")
                this.b12 = find_rational(arr2[0][1]).join("/") 
                this.c13 = find_rational(arr2[0][2]).join("/")
                this.d21 = find_rational(arr2[1][0]).join("/")
                this.e22 = find_rational(arr2[1][1]).join("/") 
                this.f23 = find_rational(arr2[1][2]).join("/") 
                this.g31 = find_rational(arr2[2][0]).join("/")
                this.h32 = find_rational(arr2[2][1]).join("/")
                this.i33 = find_rational(arr2[2][2]).join("/")

                this.method = "Transpose"
                this.showDeterminant = true
                this.showAnsMatrix = true
            } else if (this.showScalarInputMatrix === true && (this.scalar !== "" || this.scalar !== undefined)) { // If scalar is set...
                // ... do scalar multiplication of transpose

                // Convert scalar numeric string to number and transpose
                let A1 = this.A * eval(this.scalar)
                let D1 = this.B * eval(this.scalar)
                let G1 = this.C * eval(this.scalar)
                let B1 = this.D * eval(this.scalar)
                let E1 = this.E * eval(this.scalar)
                let H1 = this.F * eval(this.scalar)
                let C1 = this.G * eval(this.scalar)
                let F1 = this.H * eval(this.scalar)
                let I1 = this.I * eval(this.scalar)

                // Rationalize scalar product, convert back to string and display
                this.a11 = find_rational(A1).join("/")
                this.d21 = find_rational(D1).join("/")
                this.g31 = find_rational(G1).join("/")
                this.b12 = find_rational(B1).join("/")
                this.e22 = find_rational(E1).join("/") 
                this.h32 = find_rational(H1).join("/") 
                this.c13 = find_rational(C1).join("/")
                this.f23 = find_rational(F1).join("/")
                this.i33 = find_rational(I1).join("/")


                this.method = this.scalar + " x Transpose"
                this.showAnsMatrix = true

            } 
        },

        getAdjoint() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty, show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (    // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
            } else {   // Else comput adjoint

                // Comvert numeric string to number and assign into holding variables
                this.A = eval(this.a)
                this.B = eval(this.b) 
                this.C = eval(this.c)
                this.D = eval(this.d) 
                this.E = eval(this.e) 
                this.F = eval(this.f)
                this.G = eval(this.g) 
                this.H = eval(this.h) 
                this.I = eval(this.i) 

                let detArr = [[this.A, this.B, this.C], [this.D, this.E, this.F], [this.G, this.H, this.I]]
            
                // Do adjoint and assign resltant array to holding array
                let Arr2 = adjoint3x3(detArr)

                // Convert each element to rational string and display in answer matrix
                this.a11 = find_rational(Arr2[0][0]).join(" / ")
                this.b12 = find_rational(Arr2[0][1]).join(" / ")
                this.c13 = find_rational(Arr2[0][2]).join(" / ")
                this.d21 = find_rational(Arr2[1][0]).join(" / ")
                this.e22 = find_rational(Arr2[1][1]).join(" / ")
                this.f23 = find_rational(Arr2[1][2]).join(" / ")
                this.g31 = find_rational(Arr2[2][0]).join(" / ")
                this.h32 = find_rational(Arr2[2][1]).join(" / ")
                this.i33 = find_rational(Arr2[2][2]).join(" / ")

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
            } else if (  // If input is empty, show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
            } else {
                
                // Comvert numeric string to number and assign into holding variables
                this.A = eval(this.a)
                this.B = eval(this.b) 
                this.C = eval(this.c)
                this.D = eval(this.d) 
                this.E = eval(this.e) 
                this.F = eval(this.f)
                this.G = eval(this.g) 
                this.H = eval(this.h) 
                this.I = eval(this.i) 

                let detArr = [[this.A, this.B, this.C], [this.D, this.E, this.F], [this.G, this.H, this.I]]

                
                // Do adjoint and assign resltant array to holding array
                let Arr2 = adjoint3x3(detArr)

                let scalarMultiply = (arr) => {return arr *= num} 

                let scalarMultiplyArray = (arr, rows) => {
                    let arr2 = []
                    for(let i = 0; i < rows; i++) {
                        arr2[i] = arr[i].map(scalarMultiply)
                    }
                    return arr2
                }
                
                
                let invArr = [[],[],[]]
                this.det = this.A * ((this.E * this.I) - (this.H * this.F)) - this.B * ((this.D * this.I) - (this.G * this.F)) + this.C * ((this.D * this.H) - (this.G * this.E))
                let num = (1/this.det)
                
                if (this.det === 0) {
                    alert("Matrix is NON-INVERTIBLE when Det = 0")
                } else {
                    
                    let i = 0
                    let rows = Arr2[i].length
                   
                    invArr = scalarMultiplyArray(Arr2, rows)


                    this.a11 = find_rational(invArr[0][0]).join("/")
                    this.b12 = find_rational(invArr[0][1]).join("/")
                    this.c13 = find_rational(invArr[0][2]).join("/")
                    this.d21 = find_rational(invArr[1][0]).join("/")
                    this.e22 = find_rational(invArr[1][1]).join("/")
                    this.f23 = find_rational(invArr[1][2]).join("/")
                    this.g31 = find_rational(invArr[2][0]).join("/")
                    this.h32 = find_rational(invArr[2][1]).join("/")
                    this.i33 = find_rational(invArr[2][2]).join("/")

                    this.det = find_rational(this.det).join(" / ")

                    this.showScalarInputMatrix = false

                    this.method = "Inverse"
                    this.showAnsMatrix = true
                }
            }
        },

        getEigenValues() {
            this.a11 = ""
            this.b12 = ""
            this.c13 = ""
            this.d21 = ""
            this.e22 = ""
            this.f23 = ""
            this.g31 = ""
            this.h32 = ""
            this.i33 = ""

            // Comvert numeric string to number and assign into holding variables
            this.A = eval(this.a)
            this.B = eval(this.b) 
            this.C = eval(this.c)
            this.D = eval(this.d) 
            this.E = eval(this.e) 
            this.F = eval(this.f)
            this.G = eval(this.g) 
            this.H = eval(this.h) 
            this.I = eval(this.i) 

            let Arr = [[this.A, this.B, this.C], [this.D, this.E, this.F], [this.G, this.H, this.I]]

    
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {  // If any input is missing...
                // ...show alert and do nothing
                this.showEigenvalues = false
                this.method = ""
                alert("Every entry is required")
            } else if (this.showScalarInputMatrix === false) { // If scalar field is inactive...
                // ... do regular eigenvalues

                this.lambda1_2 = eigenvalues3x3(Arr).join(", ")

                this.showEigenvalues = true
                this.showEigenvaluesScalarProd = false
                this.method = ""
            
            } else if (this.showScalarInputMatrix === true && (this.scalar === "" || this.scalar === undefined || this.scalar === isNaN)) { // If scalar is not set...
                // ... do regular eigenvalues

                this.lambda1_2 = eigenvalues3x3(Arr).join(", ")

                this.showEigenvalues = true
                this.showEigenvaluesScalarProd = false
                this.method = ""

            } else if (this.showScalarInputMatrix === true && (this.scalar !== "" || this.scalar !== undefined)) { // If scalar is set...
                // ... do scalar multiplication of and find eigenvalues of scalar product
                this.a11 = this.A * eval(this.scalar)
                this.b12 = this.B * eval(this.scalar)
                this.c13 = this.C * eval(this.scalar)
                this.d21 = this.D * eval(this.scalar)
                this.e22 = this.A * eval(this.scalar)
                this.f23 = this.B * eval(this.scalar)
                this.g31 = this.C * eval(this.scalar)
                this.h32 = this.D * eval(this.scalar)
                this.i33 = this.A * eval(this.scalar)

                Arr = [[this.a11, this.b12, this.c13], [this.d21, this.e22, this.f23], [this.g31, this.h32, this.i33]] 

                this.lambda1_2 = eigenvalues3x3(Arr).join(", ")

                // Reconvert answer matrix elements back to string rationals
                this.a11 = find_rational(this.A * eval(this.scalar)).join("/")
                this.b12 = find_rational(this.B * eval(this.scalar)).join("/")
                this.c13 = find_rational(this.C * eval(this.scalar)).join("/")
                this.d21 = find_rational(this.D * eval(this.scalar)).join("/")
                this.e22 = find_rational(this.E * eval(this.scalar)).join("/")
                this.f23 = find_rational(this.F * eval(this.scalar)).join("/")
                this.g31 = find_rational(this.G * eval(this.scalar)).join("/")
                this.h32 = find_rational(this.H * eval(this.scalar)).join("/")
                this.i33 = find_rational(this.I * eval(this.scalar)).join("/")

                this.showEigenvalues = false
                this.showEigenvaluesScalarProd = true
                this.method = "Eigenvalues of " + this.scalar + " x Matrix"
                this.showAnsMatrix = true

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
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === "") {  

                //...else if any entry is missing or invalid, show akert and do nothing
                alert("Every entry is required")
                return
            } else if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {
                //...else if scalar is provided and valid, proceed with scalar multiplication

                this.A = eval(this.a)
                this.B = eval(this.b) 
                this.C = eval(this.c)
                this.D = eval(this.d) 
                this.E = eval(this.e) 
                this.F = eval(this.f)
                this.G = eval(this.g) 
                this.H = eval(this.h) 
                this.I = eval(this.i) 

                let arr = [[this.A, this.B, this.C], [this.D, this.E, this.F], [this.G, this.H, this.I]]

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        arr[i][j] = this.scalar * arr[i][j]
                    }
                }


                this.a11 = find_rational(arr[0][0]).join("/")
                this.b12 = find_rational(arr[0][1]).join("/") 
                this.c13 = find_rational(arr[0][2]).join("/")
                this.d21 = find_rational(arr[1][0]).join("/")
                this.e22 = find_rational(arr[1][1]).join("/") 
                this.f23 = find_rational(arr[1][2]).join("/") 
                this.g31 = find_rational(arr[2][0]).join("/")
                this.h32 = find_rational(arr[2][1]).join("/")
                this.i33 = find_rational(arr[2][2]).join("/")

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
            this.E = eval(this.e) 
            this.F = eval(this.f)
            this.G = eval(this.g) 
            this.H = eval(this.h) 
            this.I = eval(this.i) 

            let arr = [[this.A, this.B, this.C], [this.D, this.E, this.F], [this.G, this.H, this.I]]

            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } 

            // If scalar is non-numeric or undefined, do nothing...
            if (this.scalar === undefined || this.scalar === isNaN || this.a === "" || this.b === "" || this.c === "" || this.d === "" 
                || this.e === "" || this.f === "" || this.g === "" || this.h === "" || this.i === "") {
                this.a11 = "" 
                this.b12 = "" 
                this.c13 = ""
                this.d21 = ""
                this.e22 = "" 
                this.f23 = "" 
                this.g31 = ""
                this.h32 = ""
                this.i33 = ""
                return
            }

            // If scalalr is missing, update eigenvalues accordingly
            if (this.showScalarInputMatrix === true && this.scalar === "") {

                this.lambda1_2 = eigenvalues3x3(arr).join(", ")

                // ...and display relevant values
                this.showEigenvalues = true
                this.showEigenvaluesScalarProd = false
                this.method = ""

                this.a11 = this.a 
                this.b12 = this.b 
                this.c13 = this.c
                this.d21 = this.d
                this.e22 = this.e 
                this.f23 = this.f 
                this.g31 = this.g
                this.h32 = this.h
                this.i33 = this.i
                return

            }

            //...else if scalar is provided and valid, proceed with scalar multiplication
            if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {
                
                
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        arr[i][j] = this.scalar * arr[i][j]
                    }
                }

                // Eigenvalues of scalar product matrix
                this.lambdaScalarProd1_2 = eigenvalues3x3(arr).join(", ")

                this.a11 = find_rational(arr[0][0]).join("/")
                this.b12 = find_rational(arr[0][1]).join("/") 
                this.c13 = find_rational(arr[0][2]).join("/")
                this.d21 = find_rational(arr[1][0]).join("/")
                this.e22 = find_rational(arr[1][1]).join("/") 
                this.f23 = find_rational(arr[1][2]).join("/") 
                this.g31 = find_rational(arr[2][0]).join("/")
                this.h32 = find_rational(arr[2][1]).join("/")
                this.i33 = find_rational(arr[2][2]).join("/")

                this.showDeterminant = false
                this.method = "Scalar Multiplication"
                this.showAnsMatrix = true
                this.showEigenvalues === false

                if (this.showEigenvalues === false && this.showEigenvaluesScalarProd === false) { 
                    // If eigenbalues are NOT already displayed, leave them undisplayed 
                    this.showEigenvalues = false
                    this.showEigenvaluesScalarProd = false
                    return
                } else if ((this.showEigenvalues === false && this.showEigenvaluesScalarProd === true) || (this.showEigenvalues === true && this.showEigenvaluesScalarProd === false)) {
                    // However, if displayed, update them accordingly
                    this.showEigenvalues = false
                    this.showEigenvaluesScalarProd = true
                }
            }
        },
    


        matSquared() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (   // If input is empty, show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                let rows = 3
                let cols = 3

                this.A = eval(this.a)
                this.B = eval(this.b) 
                this.C = eval(this.c)
                this.D = eval(this.d) 
                this.E = eval(this.e) 
                this.F = eval(this.f)
                this.G = eval(this.g) 
                this.H = eval(this.h) 
                this.I = eval(this.i) 

                let arr = [[this.A, this.B, this.C], [this.D, this.E, this.F], [this.G, this.H, this.I]]
                let arr2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            
                for (let k = 0; k < cols; k++) {
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                            arr2[i][k] += (arr[i][j] * arr[j][k]) 
                        }          
                    }
                }

                this.a11 = find_rational(arr2[0][0]).join("/")
                this.b12 = find_rational(arr2[0][1]).join("/") 
                this.c13 = find_rational(arr2[0][2]).join("/")
                this.d21 = find_rational(arr2[1][0]).join("/")
                this.e22 = find_rational(arr2[1][1]).join("/") 
                this.f23 = find_rational(arr2[1][2]).join("/") 
                this.g31 = find_rational(arr2[2][0]).join("/")
                this.h32 = find_rational(arr2[2][1]).join("/")
                this.i33 = find_rational(arr2[2][2]).join("/")

                this.showScalarInputMatrix = false

                this.method = "Matrix Squared"
                this.showAnsMatrix = true
                this.showEigenvalues = ""
                this.showEigenvaluesScalarProd = ""
            }
        },

        clear() {
            this.showAnsMatrix = false
            this.a11 = "" 
            this.b12 = "" 
            this.c13 = ""
            this.d21 = ""
            this.e22 = "" 
            this.f23 = "" 
            this.g31 = ""
            this.h32 = ""
            this.i33 = ""
            this.method = ""
            this.scalar = ""
            this.lambda1_2 = ""
            this.lambdaScalarProd1_2 = ""
            if (this.showSingleInputMatrix === true && this.showDoubleInputMatrix === false) {
                this.a = "" 
                this.b = "" 
                this.c = ""
                this.d = ""
                this.e = "" 
                this.f = "" 
                this.g = ""
                this.h = ""
                this.i = ""
                this.det = ""
                this.rank = ""
            } else if (this.showSingleInputMatrix === false && this.showDoubleInputMatrix === true) {
                this.M1_a = this.M2_a = "" 
                this.M1_b = this.M2_b ="" 
                this.M1_c = this.M2_c = ""
                this.M1_d = this.M2_d = ""
                this.M1_e = this.M2_e = "" 
                this.M1_f = this.M2_f = "" 
                this.M1_g = this.M2_g = ""
                this.M1_h = this.M2_h = ""
                this.M1_i = this.M2_i = ""
            
                this.opr = ""
            }
        }, 

        doubleOperations() {        
            this.det = ""
            this.rank = ""
            this.method = ""
            this.showAnsMatrix = false
            this.removeSection = !this.removeSection
            this.showScalarInputMatrix = false
            this.showSingleInputMatrix = !this.showSingleInputMatrix
            this.showDoubleInputMatrix = !this.showDoubleInputMatrix
            
            // Enable buttons and view for binary operations when on double matrices mode
            if (this.showDoubleInputMatrix === true) {
                // Clear out single operations variables
                this.a = this.b = this.c = this.d = this.e = this.f = this.g = this.h = this.i = this.scalar = ""

                this.isDisabled = "w3-disabled"
                this.isDoubleDisabled = !this.isDoubleDisabled
                this.modeBtn = "SINGLE"
                this.opr = ""
            } else if (this.showDoubleInputMatrix === false) {
                // Clear out double operations variables
                this.M1_a = this.M1_b = this.M1_c = this.M1_d = this.M1_e = this.M1_f = this.M1_g = this.M1_h = this.M1_i = ""
                this.M2_a = this.M2_b = this.M2_c = this.M2_d = this.M2_e = this.M2_f = this.M2_g = this.M2_h = this.M2_i = ""

                // // Remove rank, determinant and eigenvalues row
                // this.removeSection = true
                

                this.isDisabled = !this.isDisabled
                this.isDoubleDisabled = "w3-disabled"
                this.modeBtn = "DOUBLE"
            }
        },

        getSum() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M1_e === ""
                || this.M1_f === "" || this.M1_g === "" || this.M1_h === "" || this.M1_i === "" 
                || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "" || this.M2_e === ""
                || this.M2_f === "" || this.M2_g === "" || this.M2_h === "" || this.M2_i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {    // Else compute sum
                let rows = 3
                let cols = 3
                let arr1 = [[this.M1_a, this.M1_b, this.M1_c], [this.M1_d, this.M1_e, this.M1_f], [this.M1_g, this.M1_h, this.M1_i]]
                let arr2 = [[this.M2_a, this.M2_b, this.M2_c], [this.M2_d, this.M2_e, this.M2_f], [this.M2_g, this.M2_h, this.M2_i]]
            
                for (let i = 0; i < rows; ++i) {
                    for (let j = 0; j < cols; ++j) {
                        arr2[i][j] = arr1[i][j] + arr2[i][j]           
                    }
                }

                this.a11 = arr2[0][0]
                this.b12 = arr2[0][1]
                this.c13 = arr2[0][2]
                this.d21 = arr2[1][0]
                this.e22 = arr2[1][1]
                this.f23 = arr2[1][2]
                this.g31 = arr2[2][0]
                this.h32 = arr2[2][1]
                this.i33 = arr2[2][2]

                this.opr = "add"
                this.method = "Matrix Addition"
                this.showAnsMatrix = true
            }
        },

        getSubtraction() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (
                this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M1_e === ""
                || this.M1_f === "" || this.M1_g === "" || this.M1_h === "" || this.M1_i === "" 
                || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "" || this.M2_e === ""
                || this.M2_f === "" || this.M2_g === "" || this.M2_h === "" || this.M2_i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else compute difference
                let rows = 3
                let cols = 3
                let arr1 = [[this.M1_a, this.M1_b, this.M1_c], [this.M1_d, this.M1_e, this.M1_f], [this.M1_g, this.M1_h, this.M1_i]]
                let arr2 = [[this.M2_a, this.M2_b, this.M2_c], [this.M2_d, this.M2_e, this.M2_f], [this.M2_g, this.M2_h, this.M2_i]]
            
                for (let i = 0; i < rows; ++i) {
                    for (let j = 0; j < cols; ++j) {
                        arr2[i][j] = arr1[i][j] - arr2[i][j]           
                    }
                }

                this.a11 = arr2[0][0]
                this.b12 = arr2[0][1]
                this.c13 = arr2[0][2]
                this.d21 = arr2[1][0]
                this.e22 = arr2[1][1]
                this.f23 = arr2[1][2]
                this.g31 = arr2[2][0]
                this.h32 = arr2[2][1]
                this.i33 = arr2[2][2]

                this.opr = "remove"
                this.method = "Matrix Subtraction"
                this.showAnsMatrix = true
            }
        },

        matMultiply() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M1_e === ""
                || this.M1_f === "" || this.M1_g === "" || this.M1_h === "" || this.M1_i === "" 
                || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "" || this.M2_e === ""
                || this.M2_f === "" || this.M2_g === "" || this.M2_h === "" || this.M2_i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                let rows = 3
                let cols = 3
                let arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
                let arr1 = [[this.M1_a, this.M1_b, this.M1_c], [this.M1_d, this.M1_e, this.M1_f], [this.M1_g, this.M1_h, this.M1_i]]
                let arr2 = [[this.M2_a, this.M2_b, this.M2_c], [this.M2_d, this.M2_e, this.M2_f], [this.M2_g, this.M2_h, this.M2_i]]
            
                for (let k = 0; k < cols; k++) {
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                        arr[i][k] += (arr1[i][j] * arr2[j][k]) 
                        }          
                    }
                }
        
                this.a11 = arr[0][0]
                this.b12 = arr[0][1]
                this.c13 = arr[0][2]
                this.d21 = arr[1][0]
                this.e22 = arr[1][1]
                this.f23 = arr[1][2]
                this.g31 = arr[2][0]
                this.h32 = arr[2][1]
                this.i33 = arr[2][2]

                this.opr = "clear"
                this.method = "Matrix Multiplication"
                this.showAnsMatrix = true
            }
        },

        getIdentity() {
            if (this.showDoubleInputMatrix !== true && 
                (this.a === "" && this.b === "" && this.c === "" && this.d === "" && this.e === "" 
                && this.f === "" && this.g === "" && this.h === "" && this.i === "")
            ) {
                this.a = 1
                this.b = 0
                this.c = 0
                this.d = 0
                this.e = 1
                this.f = 0
                this.g = 0
                this.h = 0
                this.i = 1

                this.scalar = ""
                this.det = ""
                this.rank = ""
                return
            } else if (this.showDoubleInputMatrix !== true && (this.a !== 1 && this.e !== 1 && this.i !== 1)) {
                this.a = 1
                this.b = 0
                this.c = 0
                this.d = 0
                this.e = 1
                this.f = 0
                this.g = 0
                this.h = 0
                this.i = 1

                this.a11 = ""
                this.b12 = ""
                this.c13 = ""
                this.d21 = ""
                this.e22 = ""
                this.f23 = ""
                this.g31 = ""
                this.h32 = ""
                this.i33 = ""

                this.scalar = ""
                this.det = ""
                this.rank = ""
                return
            } else if (this.showDoubleInputMatrix !== true && (
                    this.a === 1 && this.b === 0 && this.c === 0 && this.d === 0 && this.e === 1 
                    && this.f === 0 && this.g === 0 && this.h === 0 && this.i === 1
                    )
                ) {
                this.a11 = this.a
                this.b12 = this.b
                this.c13 = this.c
                this.d21 = this.d
                this.e22 = this.e
                this.f23 = this.f
                this.g31 = this.g
                this.h32 = this.h
                this.i33 = this.i

                this.scalar = ""
                return
            } else if (this.showDoubleInputMatrix === true) {
                this.M2_a = 1 
                this.M2_b = 0 
                this.M2_c = 0
                this.M2_d = 0
                this.M2_e = 1 
                this.M2_f = 0 
                this.M2_g = 0
                this.M2_h = 0
                this.M2_i = 1
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
                this.e = this.M1_e
                this.f = this.M1_f
                this.g = this.M1_g
                this.h = this.M1_h
                this.i = this.M1_i

                this.M1_a = this.M2_a
                this.M1_b = this.M2_b
                this.M1_c = this.M2_c
                this.M1_d = this.M2_d
                this.M1_e = this.M2_e
                this.M1_f = this.M2_f
                this.M1_g = this.M2_g
                this.M1_h = this.M2_h
                this.M1_i = this.M2_i

                this.M2_a = this.a
                this.M2_b = this.b
                this.M2_c = this.c
                this.M2_d = this.d
                this.M2_e = this.e
                this.M2_f = this.f
                this.M2_g = this.g
                this.M2_h = this.h
                this.M2_i = this.i

                this.a = this.b = this.c = this.d = this.e = this.f = this.g = this.h = this.i = ""
                this.a11 = this.b12 = this.c13 = this.d21 = this.e22 = this.f23 = this.g31 = this.h32 = this.i33 = ""

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
                this.e = this.M1_e
                this.f = this.M1_f
                this.g = this.M1_g
                this.h = this.M1_h
                this.i = this.M1_i

                this.M1_a = this.M2_a
                this.M1_b = this.M2_b
                this.M1_c = this.M2_c
                this.M1_d = this.M2_d
                this.M1_e = this.M2_e
                this.M1_f = this.M2_f
                this.M1_g = this.M2_g
                this.M1_h = this.M2_h
                this.M1_i = this.M2_i

                this.M2_a = this.a
                this.M2_b = this.b
                this.M2_c = this.c
                this.M2_d = this.d
                this.M2_e = this.e
                this.M2_f = this.f
                this.M2_g = this.g
                this.M2_h = this.h
                this.M2_i = this.i

                this.a = this.b = this.c = this.d = this.e = this.f = this.g = this.h = this.i = ""
                this.a11 = this.b12 = this.c13 = this.d21 = this.e22 = this.f23 = this.g31 = this.h32 = this.i33 = ""

                
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
                this.a = this.a11
                this.b = this.b12
                this.c = this.c13
                this.d = this.d21
                this.e = this.e22
                this.f = this.f23
                this.g = this.g31
                this.h = this.h32
                this.i = this.i33


                // Clear values based up of previous input matrix
                this.scalar = ""
                this.det = ""
                this.rank = ""

                // ..and clear answer matrix
                this.a11 = ""
                this.b12 = ""
                this.c13 = ""
                this.d21 = ""
                this.e22 = ""
                this.f23 = ""
                this.g31 = ""
                this.h32 = ""
                this.i33 = ""
            } else if (this.showDoubleInputMatrix === true) {
                // Move answer matrix to matrix A (for further manipulation)...
                this.M1_a = this.a11
                this.M1_b = this.b12
                this.M1_c = this.c13
                this.M1_d = this.d21
                this.M1_e = this.e22
                this.M1_f = this.f23
                this.M1_g = this.g31
                this.M1_h = this.h32
                this.M1_i = this.i33

                // ..and clear answer matrix and matrux B
                this.a11 = this.M2_a = ""
                this.b12 = this.M2_b = ""
                this.c13 = this.M2_c = ""
                this.d21 = this.M2_d = ""
                this.e22 = this.M2_e = ""
                this.f23 = this.M2_f = ""
                this.g31 = this.M2_g = ""
                this.h32 = this.M2_h = ""
                this.i33 = this.M2_i = ""

                this.method = this.opr = ""
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
    // Main grid
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows:310px 15px auto 20px auto auto;  
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
        margin-left:-4px;
        margin-right:-4px;
        grid-area: matrix;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
         // rgb(252, 213, 105);
    }

    .buttons {
        display: grid;
        margin-left:-4px;
        margin-right:-4px;
        grid-template-columns:0px repeat(5, 1fr) 80px; 
        grid-template-rows: 33% 33% 33%;
        grid-template-areas: 
        "blank1 minus fn fn fn fn clear"
        "blank1 matMultiply fn fn fn fn answer"
        "blank1 plus fn fn fn fn double";
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
        background-image: -webkit-linear-gradient(120deg, rgb(0, 168, 255), rgb(0, 128, 255), rgb(0, 132, 255), rgb(0, 138, 255)); 
        background-image: -moz-linear-gradient(120deg, rgb(0, 168, 255), rgb(0, 128, 255), rgb(0, 132, 255), rgb(0, 138, 255)); 
        background-image: -o-linear-gradient(120deg, rgb(0, 168, 255), rgb(0, 128, 255), rgb(0, 132, 255), rgb(0, 138, 255)); 
        background-image: -ms-linear-gradient(120deg, rgb(0, 168, 255), rgb(0, 128, 255), rgb(0, 132, 255), rgb(0, 138, 255)); 
        background-image: linear-gradient(120deg, rgb(0, 168, 255), rgb(0, 128, 255), rgb(0, 132, 255), rgb(0, 138, 255)); 
    }

    .value{
        font-size: 12px;
        font-weight: 100;
    }

    .doubleMatrix {
        //width: 80%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        align-items: baseline;
        align-content: space-around;
    }

    input {
        margin: 2px;
        padding: 3px 3px 3px 3px;
        width: 60px;
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

    #first_By3, #sec_By3 {
        width: 200px;
        border-radius: 5px;
        margin-top: 5px !important;
        background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
    }

    .doubleMatrix {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        align-content: space-around;
    }

    .doubleMatrixName {
        width: 100%;
        color: aliceblue;
        font-size: 12px sans-serif;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
    }

    #threeBy3 {
        width: 200px;
        float: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
        margin-top: 18.364px !important;
        margin-bottom: 18px !important;
        background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
    }

    #threeBy3Ans {
        width: 180px;
        height: 80px;
        font-size: 12px;
        opacity: 1;
        float: center;
        margin-left: 35%;
        margin-right: 35%;
        margin-bottom:-10%;
        margin-top: 14% !important;
        justify-content:center;
        border-radius: 5px;
        background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
        background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
    }

    @media screen and (min-width: 736px)
    {
        input {
            width: 80%;
            font-size: 12px;
        }

        .grid {
            grid-template-rows: 175px 18px 70px 24px 120px 70px;
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

        #threeBy3Ans {
            width: 30%;
            height: 120px;
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
            "blankPre doubleMatrix singleMatrix blank2";
            vertical-align: center;
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
            background-image: -webkit-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: -moz-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: -o-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: -ms-linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
            background-image: linear-gradient(120deg, rgb(0, 138, 255), rgb(0, 132, 255), rgb(0, 128, 255)); 
        }


        .identity {
            grid-column: 3 / 5;
            background-color: inherit;
            color: white;
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
