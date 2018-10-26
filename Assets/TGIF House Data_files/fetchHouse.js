window.onload = fetch

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
        method: 'GET',
        headers: {
            "X-API-Key": "zEEELIbcwg91kCKzmbrgN6wJAktMNQlWj1FhsbKW"
        }
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        createVue(data.results[0].members);
    })






function createVue(data) {

    var senateTable = new Vue({
        el: "#filteredTable",
        data: {
            senators: data,
            partyCheckBox: [],
            stateDropdown: [],
            selectedState: 'all'
        },
        created() {
            this.populateStateList()
        },
        methods: {
            populateStateList: function () {
                var uniqueStates = []
                for (i = 0; i < this.senators.length; i++) {
                    if (uniqueStates.includes(this.senators[i].state)) {} else {
                        uniqueStates.push(this.senators[i].state)
                    }
                }
                this.stateDropdown = uniqueStates.sort()
            }
        },
        computed: {
            checkboxFilter: function () {
                var selectedParty = []
                for (i = 0; i < this.senators.length; i++)
                    if ((this.partyCheckBox.includes(this.senators[i].party) || this.partyCheckBox.length < 1)
                        &&
                        (this.selectedState.includes(this.senators[i].state) ||
                            this.selectedState == "all"))
                {selectedParty.push(this.senators[i])}

                return selectedParty
            }
        }
    })
}