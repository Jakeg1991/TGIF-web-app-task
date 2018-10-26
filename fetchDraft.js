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
        createMainTable(data.results[0].members);
        getStats(data.results[0].members);
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
                        (this.selectedState.includes(this.members[i].party) ||
                            this.selectedState == "all")) {
                        selectedParty.push(this.members[i])
                    }

                return selectedParty 
            }
        }
    })
}

function getStats(data) {
    var stats = new Vue({
        el: "#glanceTable",
        data: {
            members: data,
            statistics: {
                "GlanceTableStats": [{
                        "party": "Democrats",
                        "memberCount": 0,
                        "votesPartyPctAverage": 0
                },
                    {
                        "party": "Republicans",
                        "memberCount": 0,
                        "votesPartyPctAverage": 0
                },
                    {
                        "party": "Independants",
                        "memberCount": 0,
                        "votesPartyPctAverage": 0
                },
                    {
                        "party": "All Parties",
                        "memberCount": 0,
                        "votesPartyPctAverage": 0
                }],
                "engagedInfo": [
                    {
                        "leastEngaged": [],
                        "mostEngaged": []
                }],

                "loyaltyInfo": [
                    {
                        "leastLoyal": [],
                        "mostLoyal": [],
                }]
            }
        },

        created() {
            this.getStats()
        },
        methods: {
            getStats: function () {
                var dCount = 0
                var rCount = 0
                var iCount = 0
                var dVotedPercAvg = []
                var rVotedPercAvg = []
                var iVotedPercAvg = []
                var missedVotesPerc = []
                var partyVotesPerc = []
                var missedVotesUpperPtile = 0
                var missedVotesLowerPtile = 0
                var partyVotesLowerPtile = 0
                var partyVotesUpperPtile = 0

                function sumArray(a, b) {
                    return a + b;
                }

                function sortArray(a, b) {
                    return a - b;
                }
            }

            for (i = 0; i < this.members.length; i++) {
                missedVotesPerc.push(this.members[i].missed_votes_pct)
                partyVotesPerc.push(this.members[i].votes_with_party_pct)

                if (this.members[i].party == "D") {
                    dVotedPercAvg.push(this.members[i].votes_with_party_pct) &&
                        dCount++
                }
                if (this.members[i].party == "R") {
                    rVotedPercAvg.push(this.members[i].votes_with_party_pct) &&
                        rCount++
                }
                if (this.members[i].party == "I") {
                    iVotedPercAvg.push(memberList[i].votes_with_party_pct) &&
                        iCount++
                }
            }
            partyVotesPerc.sort(sortArray)
            missedVotesPerc.sort(sortArray)

            missedVotesUpperPtile = Math.ceil(missedVotesPerc.length * 0.90)
            missedVotesLowerPtile = Math.ceil(missedVotesPerc.length * 0.10)
            partyVotesUpperPtile = Math.ceil(partyVotesPerc.length * 0.90)
            partyVotesLowerPtile = Math.ceil(partyVotesPerc.length * 0.10)

            missedVotesUpperPtile = missedVotesPerc[missedVotesUpperPtile - 1]
            missedVotesLowerPtile = missedVotesPerc[missedVotesLowerPtile - 1]
            partyVotesUpperPtile = partyVotesPerc[partyVotesUpperPtile - 1]
            partyVotesLowerPtile = partyVotesPerc[partyVotesLowerPtile - 1]

            dVotedPercAvg = dVotedPercAvg.reduce(sumArray, 0);
            rVotedPercAvg = rVotedPercAvg.reduce(sumArray, 0);
            iVotedPercAvg = iVotedPercAvg.reduce(sumArray, 0);

            dVotedPercAvg = Math.round((dVotedPercAvg / dCount) * 100) / 100;
            rVotedPercAvg = Math.round((rVotedPercAvg / rCount) * 100) / 100;
            iVotedPercAvg = Math.round((iVotedPercAvg / iCount) * 100) / 100;

            if (isNaN(dVotedPercAvg)) {
                iVotedPercAvg = 0
            }
            if (isNaN(rVotedPercAvg)) {
                iVotedPercAvg = 0
            }
            if (isNaN(iVotedPercAvg)) {
                iVotedPercAvg = 0
            }

    statistics.



        }
    })
}
