window.onload = fetch

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
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
        createMainTable(data.results[0].members);
    })

function createMainTable(data) {

    var mainTable = new Vue({
        el: "#filteredTable",
        data: {
            members: data,
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
                for (i = 0; i < this.members.length; i++) {
                    if (uniqueStates.includes(this.members[i].state)) {} else {
                        uniqueStates.push(this.members[i].state)
                    }
                }
                this.stateDropdown = uniqueStates.sort()
            }
        },
        computed: {
            checkboxFilter: function () {
                var selectedParty = []
                for (i = 0; i < this.members.length; i++)
                    if ((this.partyCheckBox.includes(this.members[i].party) || this.partyCheckBox.length < 1) &&
                        (this.selectedState.includes(this.members[i].state) ||
                            this.selectedState == "all")) {
                        selectedParty.push(this.members[i])
                    }

                return selectedParty
            }
        }
    })
}
