<script setup>
    import CustomLayout from '@/layouts/components/CustomLayout.vue'

    import { computed, onMounted, reactive, ref, watch } from "vue";
    import { useRouter, useRoute } from 'vue-router'
    import { mapGetters, mapState, useStore } from 'vuex';
    import validator from 'validator';
    import { AXIOS_GET_DEPARTMENTS, 
            AXIOS_GET_PLACECHIEFS_BY_DEPARTMENTS, 
            AXIOS_GET_NEIGHBORHOODS_BY_PLACECHIEDID, 
            AXIOS_GET_TAXCENTERS_BY_NEIGHBORDHOODID,
            AXIOS_GET_TAXTYPES } from "@/queries/axios-queries";
    import axios from "axios";
    
    // GLOBAL CONST
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const loginStatus = computed(() => store.getters['auth/getLoginStatus'])
    const actionLogin = (login) => store.dispatch('auth/login', login)
    const error = computed(() => store.state.auth.error)
    const loading = computed(() => store.state.auth.loading)

    // DATA
    let totalAmount = ref(0)
    let ifunumber = ref('')
    let name = ref('')
    // let allPlaceChiefs = ref([])
    // let department = ref('')
    // let placeChief = ref('')
    // let neighborhood = ref('')
    // let taxCenter = ref('')
    // let ilot = ref('')
    // let plot = ref('')
    // let taxType = ref('')
    // let payAmount = ref(false)
    let payForms = ref([
       {
            allPlaceChiefs: ref([]),
            allNeighborhoods: [],
            allTaxCenters: [],
            amountPayed: 0,
            dueAmount: 0,
            department: '',
            placeChief: '',
            neighborhood: '',
            taxCenter: '',
            ilot: '',
            plot: '',
            taxType: '',
            payAmount: false
       }
    ])
    const isFormValid = ref(true)

    const nameRules = ref([
        name => !!name || 'Champ obligatoire',
    ])

    const departmentsRules = ref([
        departments => !!departments || 'Champ obligatoire',
    ])

    const ilotRules = ref([
        ilot => !!ilot || 'Champ obligatoire',
    ])

    const plotRules = ref([
        plot => !!plot || 'Champ obligatoire',
    ])

    const taxCentersRules = ref([
        taxCenter => !!taxCenter || 'Champ obligatoire',
    ])

    const taxTypeRules = ref([
        taxType => !!taxType || 'Champ obligatoire',
    ])

    const neighborhoodsRules = ref([
        neighborhood => !!neighborhood || 'Champ obligatoire',
    ])
    
    const placeChiefsRules = ref([
        placeChiefs => !!placeChiefs || 'Champ obligatoire',
    ])
    
    const amountRules = ref([
        amountVal => !!amountVal || 'Champ obligatoire',
        amountVal => amountVal >= 200 || "Montant trop petit"
    ])

    function validPay(arrayKey) {
        payForms.value[arrayKey].payAmount = true;
        // return ;
    }

    function unValidPay(arrayKey) {
        payForms.value[arrayKey].payAmount = false;
        payForms.value[arrayKey].amountPayed = 0;
    }
    
    const getDeparts = async () => {
        const departments = await axios.post(
                            process.env.BACK_END_URI,
                            {
                            "query": AXIOS_GET_DEPARTMENTS,
                            },
                            { headers: { 'Content-Type': 'application/json' } }
                        )
        return departments.data.data.getDepartments
    }

    let allDepartments = ref(await getDeparts())
    
    const getTaxTypes = async () => {
        const taxTypes = await axios.post(
                            process.env.BACK_END_URI,
                            {
                                "query": AXIOS_GET_TAXTYPES,
                            },
                            { headers: { 'Content-Type': 'application/json' } }
                        )
        return taxTypes.data.data.getTaxTypes
    }

    let allTaxTypes = ref(await getTaxTypes())

    async function getPlaceChiefs(event, arrayKey) {
        payForms.value[arrayKey].allNeighborhoods = [];
        payForms.value[arrayKey].allTaxCenters = [];

        const getPChiefs = async () => {
            const placeChiefs = await axios.post(
                                process.env.BACK_END_URI,
                                {
                                    "query": AXIOS_GET_PLACECHIEFS_BY_DEPARTMENTS,
                                    "variables": { departmentId: event.target.value }
                                },
                                { headers: { 'Content-Type': 'application/json' } }
                            )
            return placeChiefs.data.data.getPlaceChiefsByDepartementId
        }

        payForms.value[arrayKey].allPlaceChiefs = ref(await getPChiefs())
        console.log(payForms.value[arrayKey].allPlaceChiefs)
    }

    async function getNeighborhoods(event, arrayKey) {
        payForms.value[arrayKey].allTaxCenters = [];
        
        const getNeighB = async () => {
            const neighborhoods = await axios.post(
                                process.env.BACK_END_URI,
                                {
                                    "query": AXIOS_GET_NEIGHBORHOODS_BY_PLACECHIEDID,
                                    "variables": { placeChiefId: event.target.value }
                                },
                                { headers: { 'Content-Type': 'application/json' } }
                            )
            return neighborhoods.data.data.getNeighborhoodsByPlaceChiefId
        }

        payForms.value[arrayKey].allNeighborhoods = ref(await getNeighB())
    }

    async function getTaxCenters(event, arrayKey) {
        const getTaxC = async () => {
            const taxCenters = await axios.post(
                                process.env.BACK_END_URI,
                                {
                                    "query": AXIOS_GET_TAXCENTERS_BY_NEIGHBORDHOODID,
                                    "variables": { neighborhoodId: event.target.value }
                                },
                                { headers: { 'Content-Type': 'application/json' } }
                            )
            return taxCenters.data.data.getNeighborhoodsByPlaceChiefId
        }

        payForms.value[arrayKey].allTaxCenters = ref(await getTaxC())
    }

    function incrementTotalAmount(event) {
        console.log(totalAmount.value)
        totalAmount.value = totalAmount.value  + parseInt(event.target.value);
        console.log('tt', totalAmount.value)
        console.log(event.target.value)
    }

    function addPayFrom(){
      payForms.value.push({
        allPlaceChiefs: [],
        allNeighborhoods: [],
        allTaxCenters: [],
        amountPayed: 0,
        dueAmount: 0,
        department: '',
        placeChief: '',
        neighborhood: '',
        taxCenter: '',
        ilot: '',
        plot: '',
        taxType: '',
        payAmount: false
      })
    }

    function ignorePayForm() {

    }

    function deleteForm(counter){
      payForms.value.splice(counter,1);
    }

    function addPay() {

    }
    
    onMounted(() => {

    })
</script>

<template>
  <CustomLayout>
    <template v-slot:MainContent>

    
    <div class="auth-wrapper custom_style d-flex align-center justify-center">
      <div class="custom_style">
    
        <div class="mt-7">
            <VRow>
                <!-- ifunumber -->
                <VCol cols="12"
                sm="6"
                md="6">
                <span
                    class="text-xl ma-2"
                >IFU/NC : {{ifunumber}}</span>
                </VCol>

                <!-- property -->
                <VCol 
                    cols="12"
                sm="6"
                md="6"
                >
                <VTextField
                    v-model="name"
                    label="Nom et Prénoms"
                    type="text"
                    :rules="nameRules"
                    required
                />

                </VCol>

            </VRow>
            <VRow>
                <VCol cols="12"
                sm="6"
                md="6">
                    <span class="text-xl ma-2">Montant total à payer(en CFA) :</span>
                </VCol>

                <!-- property -->
                <VCol 
                    cols="12"
                    sm="6"
                    md="6"
                >
                <span>{{ totalAmount }}</span>

                </VCol>

            </VRow>
        </div>
        <!-- {{payForms}} -->

        <VLayout v-if="error" row wrap small class="mx-3 text-white col-12">
            <span mx3 small>
            <form-error-alert :message="error"></form-error-alert>
            </span>
        </VLayout>
        <VCard
            class="mt-5 elevation-0"
            style="height: 10%; overflow-y: scroll; overflow-x: hidden"
            elevation-0
        >
            <VCardText>
                <VForm v-model="isFormValid" lazy-validation @submit.prevent="addPay">
                    <div class="" >
                        <div class="" v-for="(payForm, counter) in payForms" :key="counter">
                            <span @click="deleteForm(counter)" v-if="counter >= 1" style="float: right; margin-left: 10px">
                                <v-icon>mdi-close</v-icon>
                            </span>
                            <VRow class="">
                                <VCol
                                    cols="12"
                                    style="background-color: rgb(209, 206, 206)"
                                    class="mb-4"
                                >
                                    <h3>Propriété {{ counter + 1}}</h3>
                                </VCol>
                                <VCol
                                    cols="12"
                                    sm="6"
                                    md="6"
                                >
                                    <select
                                        class="custom-select"
                                        v-model="payForm.department"
                                        label="Département"
                                        @change="getPlaceChiefs($event, counter)"
                                        required
                                    >
                                        <option value="" selected disabled>Département</option>
                                        <option
                                            class="custom-select-options"
                                            v-for="(department, _id) in allDepartments" 
                                            :key="_id"
                                            :value="department._id"
                                        >
                                            {{ department.name }}
                                        </option>
                                    </select>
                                </VCol>
                                <VCol
                                    cols="12"
                                    sm="6"
                                    md="6"
                                >
                                    <select
                                        class="custom-select"
                                        v-model="payForm.placeChief"
                                        label="Chef-lieu"
                                        @change="getNeighborhoods($event, counter)"
                                        required
                                        :disabled="!payForm.department"
                                    >
                                        <option value="" selected disabled>Chef-lieu</option>
                                        <option
                                            class="custom-select-options"
                                            v-for="(placeChief, _id) in payForms[counter].allPlaceChiefs" 
                                            :key="_id"
                                            :value="placeChief._id"
                                        >
                                            {{ placeChief.name }}
                                        </option>
                                    </select>
                                </VCol>
                                <VCol
                                    cols="12"
                                    sm="6"
                                    md="6"
                                >
                                    <select
                                        class="custom-select"
                                        v-model="payForm.neighborhood"
                                        label="Village/Quartier"
                                        @change="getTaxCenters($event, counter)"
                                        required
                                        :disabled="!payForm.placeChief"
                                    >
                                        <option value="" selected disabled>Village/Quartier</option>
                                        <option
                                            class="custom-select-options"
                                            
                                            v-for="(neighborhood, _id) in payForms[counter].allNeighborhoods" 
                                            :key="_id"
                                            :value="neighborhood._id"
                                        >
                                            {{ neighborhood.name }}
                                        </option>
                                    </select>
                                </VCol>
                                <VCol
                                    cols="12"
                                    sm="6"
                                    md="6"
                                >
                                    <select
                                        class="custom-select"
                                        v-model="payForm.taxCenter"
                                        label="Centre d'impôt"
                                        @change="getTaxCenters($event, counter)"
                                        required
                                        :disabled="!payForm.neighborhood"
                                    >
                                        <option value="" selected disabled>Centre d'impôt</option>
                                        <option
                                            class="custom-select-options"
                                            
                                            v-for="(neighborhood, _id) in payForms[counter].allTaxCenters" 
                                            :key="_id"
                                            :value="neighborhood._id"
                                        >
                                            {{ neighborhood.name }}
                                        </option>
                                    </select>
                                </VCol>
                                <VCol
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <VTextField :rules="ilotRules" v-model="payForm.ilot" label="Îlot" type="text" required></VTextField>
                                </VCol>
                                <VCol
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <VTextField :rules="plotRules" v-model="payForm.plot" label="Parcelle" type="text" required></VTextField>
                                </VCol>
                                <VCol
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                <v-autocomplete
                                    v-model="payForm.taxType"
                                    :items="allTaxTypes"
                                    :rules="taxTypeRules"
                                    item-title="name"
                                    item-value="_id"
                                    label="Type d'impôt"
                                    required
                                >
                                </v-autocomplete>
                                </VCol>
                            </VRow>
                            <VRow class="mt-3">
                                <VCol cols="12"
                                sm="6"
                                md="6">
                                    <span
                                        class="text-xl ma-2"
                                    >Montant de l'avis d'imposition :</span>
                                </VCol>
                                
                                <VCol 
                                    cols="12"
                                    sm="6"
                                    md="6"
                                >
                                    <VTextField
                                        v-model="payForm.dueAmount"
                                        label="Montant"
                                        type="number"
                                        :rules="amountRules"
                                        required
                                    />

                                </VCol>
                            </VRow>
                            <VRow>
                                <VCol 
                                    cols="12"
                                    sm="6"
                                    md="8"
                                >
                                    <span
                                        class="text-xl ma-2"
                                    >Voulez-vous payer l'impôt de cette propriété ?</span>
                                </VCol>

                                <VCol 
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    class="d-flex mx-auto"
                                >
                                    <VBtn
                                        text
                                        class="text-primary bg-none font-weight-semibold mx-auto"
                                        variant="plain"
                                        @click="validPay(counter)"
                                    >
                                    Oui
                                    </VBtn>  
                                    <VBtn
                                        text
                                        class="text-primary bg-none font-weight-semibold "
                                        variant="plain"
                                        @click="unValidPay(counter)"
                                    >
                                    Non
                                    </VBtn>  
                                </VCol>

                            </VRow>
                            <VRow v-if="payForm.payAmount == true">
                                <VCol 
                                    cols="12"
                                    sm="6"
                                    md="8"
                                >
                                    <span
                                        class="text-xl ma-2"
                                    >Quel est le montant que vous voulez payer ?</span>
                                </VCol>
                                
                                <VCol 
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <VTextField
                                        v-model="payForm.amountPayed"
                                        label="Renseigner le montant"
                                        type="number"
                                        :rules="amountRules"
                                        @focusout="incrementTotalAmount"
                                        :required="payForm.payAmount"
                                    />

                                </VCol>
                            </VRow>
                            <v-divider class="mt-2" style="background-color: #000"></v-divider>
                            <v-divider class="mb-6" style="background-color: #000"></v-divider>
                        </div>
                    </div>
                    <VRow>
                        <VCol 
                            cols="12"
                            sm="6"
                            md="9"
                        >
                            <span
                                class="text-xl ma-2"
                            >Voulez-vous payer l'impôt pour une autre propriété ?</span>
                        </VCol>

                        <VCol 
                            cols="12"
                            sm="6"
                            md="3"
                            class="d-flex mx-auto"
                        >
                            <VBtn
                                text
                                class="text-primary bg-none font-weight-semibold mx-auto"
                                variant="plain"
                                @click="addPayFrom"
                            >
                            Oui
                            </VBtn>  
                            <VBtn
                                text
                                class="text-primary bg-none font-weight-semibold "
                                variant="plain"
                                @click="ignorePayForm"
                            >
                            Non
                            </VBtn>  
                        </VCol>

                    </VRow>
                    <VRow>
                        <VCol
                        cols="12"
                        sm="6"
                        md="4"
                        >
                        <VBtn
                            block
                            type="submit"
                            class="text-white"
                            :loading="loading"
                            :disabled="!isFormValid"
                        >
                            <span slot="loader" class="custom-loader text-white" color="#fff">
                            <VIcon light>cached</VIcon>
                            </span>
                            Suivant
                        </VBtn>  
                        </VCol>
                    </VRow>

                </VForm>
            </VCardText>
        </VCard>
        </div>
    </div>
    
    </template>
  </CustomLayout>
</template>

<style lang="scss">
    .custom_style {
        margin-left: 10%;
        width: 80%;
        margin-right: 10%;    
    }

    @media(max-width: 825px) {
        .custom_style {
            margin-left: 5%;
            width: 90%;
            margin-right: 5%;
        }
    }

    @media(max-width: 515px) {
        .custom_style {
            margin-left: 3%;
            width: 94%;
            margin-right: 3%;
        }
    }

    .custom-select {
        width: 100%;
        color: rgb(99, 98, 98);
        padding: 13px;
        border-radius: 5px;
        font-size: 16px;
        border: rgb(201, 199, 199) 1px solid;
        outline: none;
    }

    .custom-select > option {
        border: none;
        outline: none;
        margin-bottom: 4px;
    }

    .custom-select .custom-select-options:hover {
        background-color: none;
        cursor: pointer;
    }
</style>

