window.onload = getStats(data.results[0].members)
window.onload = createGlanceTable()
window.onload = createLoyaltyTable()

function getStats(memberList) {

    dCount = 0
    rCount = 0
    iCount = 0
    dVotedPercAvg = []
    rVotedPercAvg = []
    iVotedPercAvg = []
    missedVotesPerc = []
    partyVotesPerc = []
    missedVotesUpperPtile = 0
    missedVotesLowerPtile = 0
    partyVotesLowerPtile = 0
    partyVotesUpperPtile = 0

    function sumArray(a, b) {
        return a + b;
    }

    function sortArray(a, b) {
        return a - b;
    }

    for (i = 0; i < memberList.length; i++) {
        missedVotesPerc.push(memberList[i].missed_votes_pct)
        partyVotesPerc.push(memberList[i].votes_with_party_pct)

        if (memberList[i].party == "D") {
            dVotedPercAvg.push(memberList[i].votes_with_party_pct) &&
                dCount++
        }
        if (memberList[i].party == "R") {
            rVotedPercAvg.push(memberList[i].votes_with_party_pct) &&
                rCount++
        }
        if (memberList[i].party == "I") {
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

    stats.engagedInfo.leastEngaged = data.results[0].members.filter(element => element.missed_votes_pct >= missedVotesUpperPtile).sort((b, a) => a.missed_votes_pct - b.missed_votes_pct)
    stats.engagedInfo.mostEngaged = data.results[0].members.filter(element => element.missed_votes_pct <= missedVotesLowerPtile).sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
    stats.loyaltyInfo.leastLoyal = data.results[0].members.filter(element => element.votes_with_party_pct <= partyVotesLowerPtile).sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
    stats.loyaltyInfo.mostLoyal = data.results[0].members.filter(element => element.votes_with_party_pct >= partyVotesUpperPtile).sort((b, a) => a.votes_with_party_pct - b.votes_with_party_pct)

    stats.glanceTableInfo[0].memberCount = dCount
    stats.glanceTableInfo[1].memberCount = rCount
    stats.glanceTableInfo[2].memberCount = iCount
    stats.glanceTableInfo[3].memberCount = (dCount + rCount + iCount)

    stats.glanceTableInfo[0].votesPartyPctAverage = dVotedPercAvg
    stats.glanceTableInfo[1].votesPartyPctAverage = rVotedPercAvg
    stats.glanceTableInfo[2].votesPartyPctAverage = iVotedPercAvg
    stats.glanceTableInfo[3].votesPartyPctAverage = Math.round(((dVotedPercAvg + rVotedPercAvg + iVotedPercAvg) / 3) * 100) / 100
}

function createGlanceTable() {
    for (i = 0; i < stats.glanceTableInfo.length; i++) {
        var mytable = document.getElementById("senateGlance");
        var row = document.createElement("tr");
        row.insertCell().innerHTML = stats.glanceTableInfo[i].party;
        row.insertCell().innerHTML = stats.glanceTableInfo[i].memberCount;
        row.insertCell().innerHTML = stats.glanceTableInfo[i].votesPartyPctAverage;
        mytable.append(row)
    }
}

function createLoyaltyTable() {

    for (i = 0; i < stats.loyaltyInfo.leastLoyal.length; i++) {
        var mytable = document.getElementById("leastLoyal");
        var row = document.createElement("tr");
        if (stats.loyaltyInfo.leastLoyal.middle_name == null) {
            middleName = " ";
        } else {
            var middleName = (stats.loyaltyInfo.leastLoyal.middle_name);
        }

        var name = (stats.loyaltyInfo.leastLoyal[i].first_name + middleName + stats.loyaltyInfo.leastLoyal[i].last_name)
        row.insertCell().innerHTML = name
        row.insertCell().innerHTML = stats.loyaltyInfo.leastLoyal[i].total_votes;
        row.insertCell().innerHTML = stats.loyaltyInfo.leastLoyal[i].votes_with_party_pct;
        mytable.append(row)
    }
    for (i = 0; i < stats.loyaltyInfo.leastLoyal.length; i++) {
        var mytable = document.getElementById("mostLoyal");
        var row = document.createElement("tr");
        if (stats.loyaltyInfo.leastLoyal.middle_name == null) {
            middleName = " ";
        } else {
            var middleName = (stats.loyaltyInfo.mostLoyal.middle_name);
        }

        var name = (stats.loyaltyInfo.mostLoyal[i].first_name + middleName + stats.loyaltyInfo.mostLoyal[i].last_name)
        row.insertCell().innerHTML = name
        row.insertCell().innerHTML = stats.loyaltyInfo.mostLoyal[i].total_votes;
        row.insertCell().innerHTML = stats.loyaltyInfo.mostLoyal[i].votes_with_party_pct;
        mytable.append(row)
    }
}
