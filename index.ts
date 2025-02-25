import { Fighter,Team } from "./types";
import rl from 'readline-sync';
import chalk from "chalk";
console.clear();
console.log(chalk.bgRed.bold("--------------------------"))
console.log(`
██╗░░░██╗███████╗░█████╗░
██║░░░██║██╔════╝██╔══██╗
██║░░░██║█████╗░░██║░░╚═╝
██║░░░██║██╔══╝░░██║░░██╗
╚██████╔╝██║░░░░░╚█████╔╝
░╚═════╝░╚═╝░░░░░░╚════╝░`)
console.log(chalk.bgRed.bold("--------------------------"))
let choice:number= rl.questionInt('Welcome to the JSON of fighters data viewer!\n\n1.Show all fighters\n2.Filter by ID\n3.Show all champions\n4.Show all teams\n5.Show by country\n6.Exit\n\nPlease enter your choice: ')
switch (choice) {
    case 1:
        console.clear()
        fetchAllFighters()
        break;
    case 2:
        console.clear();
        let searchById:number = rl.questionInt("Give the ID whose fightercard you want to check: ")
        fetchFighterByID(searchById);
        break;
    case 3:
        console.clear();
        fetchAllChampions();
        break;
    case 4:
        console.clear();
        fetchAllTeams();
        break;
    case 5:
        console.clear();
        fetchByCountry();
        break;
    default:
        break;
}

function fetchAllFighters() {
    fetch('https://raw.githubusercontent.com/Serhathub/UFC_Project_WebOntwikkeling/refs/heads/main/fighters.json')
    .then(response =>response.json())
    .then((fighters:Fighter[])=>{
        fighters.forEach(fighter => {
            console.log(`➤ ID: ${fighter.id}`);
            console.log(`➤ Name: ${fighter.name}`);
            console.log(`➤ Nickname: ${fighter.nickname}`);
            console.log(`➤ Age: ${fighter.age}`);
            console.log(`➤ Champion: ${fighter.champion ? chalk.yellow("Yes 🥇") : "No"}`);
            console.log(`➤ Birthdate: ${fighter.birthdate}`);
            console.log(`➤ Nation: ${fighter.nation}`);
            console.log(`➤ Weight Class: ${fighter.weightClass}`);
            console.log(`➤ Record: ${fighter.record}`);
            console.log(`➤ Organizations: ${fighter.foughtInOrganisations.join(", ")}`);
            console.log(`➤ Description: ${fighter.description}`);
            console.log("====================================\n");
          });
    }).catch((error) =>{
        console.log("Error fetching data:",error)
    })
}

function fetchFighterByID(id:number){
    fetch('https://raw.githubusercontent.com/Serhathub/UFC_Project_WebOntwikkeling/refs/heads/main/fighters.json')
    .then(response =>response.json())
    .then((fighters:Fighter[])=>{
        const fighter = fighters.find(f => f.id ===id); 
        if(fighter){
            console.log(`➤ ID: ${id}`);
            console.log(`➤ Name: ${fighter.name} `);
            console.log(`➤ Nickname: ${fighter.nickname}`);
            console.log(`➤ Age: ${fighter.age}`);
            console.log(`➤ Champion: ${fighter.champion ? chalk.yellow("Yes 🥇"): "No"}`);
            console.log(`➤ Birthdate: ${fighter.birthdate}`);
            console.log(`➤ Nation: ${fighter.nation}`);
            console.log(`➤ Weight Class: ${fighter.weightClass}`);
            console.log(`➤ Record: ${fighter.record}`);
            console.log(`➤ Organizations: ${fighter.foughtInOrganisations.join(", ")}`);
            console.log(`➤ Description: ${fighter.description}`);
            console.log("====================================\n");
          }
        else{
            console.log("There is no fighter with this ID")
        };
    }).catch((error) =>{
        console.log("Error fetching data:",error)
    })
}
function fetchAllChampions() {
    fetch('https://raw.githubusercontent.com/Serhathub/UFC_Project_WebOntwikkeling/refs/heads/main/fighters.json')
    .then(response =>response.json())
    .then((fighters:Fighter[])=>{
        const champions = fighters.filter(fighter => fighter.champion);

        if(champions.length === 0){
            console.log("No champions found!")
        }
        champions.forEach(fighter => {
            console.log(`➤ ID: ${fighter.id}`);
            console.log(`➤ Name: ${fighter.name}`);
            console.log(`➤ Nickname: ${fighter.nickname}`);
            console.log(`➤ Age: ${fighter.age}`);
            console.log(`➤ Champion: ${chalk.yellow("Yes 🥇")}`);
            console.log(`➤ Birthdate: ${fighter.birthdate}`);
            console.log(`➤ Nation: ${fighter.nation}`);
            console.log(`➤ Weight Class: ${fighter.weightClass}`);
            console.log(`➤ Record: ${fighter.record}`);
            console.log(`➤ Organizations: ${fighter.foughtInOrganisations.join(", ")}`);
            console.log(`➤ Description: ${fighter.description}`);
            console.log("====================================\n");
          });
    }).catch((error) =>{
        console.log("Error fetching data:", error)
    })
}
function fetchAllTeams() {
    fetch('https://raw.githubusercontent.com/Serhathub/UFC_Project_WebOntwikkeling/refs/heads/main/teams.json')
    .then(response =>response.json())
    .then((Teams:Team[])=>{
        Teams.forEach(team => {
            let establishedDate:string = team.established.toString();
            let locationColor = team.location;
            if (team.location.toLowerCase().includes("usa")) {
                locationColor = chalk.red(team.location);
            } else if (team.location.toLowerCase().includes("england")) {
                locationColor = chalk.blue(team.location);
            } else if (team.location.toLowerCase().includes("chechnya")) {
                locationColor = chalk.green(team.location);
            } else if (team.location.toLowerCase().includes("south africa")) {
                locationColor = chalk.cyan(team.location);
            } else if (team.location.toLowerCase().includes("france")) {
                locationColor = chalk.magenta(team.location);
            }else if (team.location.toLowerCase().includes("new zealand")) {
                locationColor = chalk.yellow(team.location);
            }else if (team.location.toLowerCase().includes("spain")) {
                locationColor = chalk.gray(team.location);
            }
            if(team.established<=2000){
                establishedDate = chalk.bgRed(team.established);
            }else{
                establishedDate = chalk.bgBlue(team.established);
            }
            console.log(`➤ ID: ${team.id}`);
            console.log(`➤ Name: ${team.name}`);
            console.log(`➤ Location: ${locationColor}`);
            console.log(`➤ Established: ${establishedDate}`);
            console.log(`➤ Coach: ${team.coach}`);
            console.log("====================================\n");
          });
    }).catch((error) =>{
        console.log("Error fetching data:",error)
    })
}

function fetchByCountry() {
    fetch('https://raw.githubusercontent.com/Serhathub/UFC_Project_WebOntwikkeling/refs/heads/main/fighters.json')
    .then(response => response.json())
    .then((fighters: Fighter[]) => {
        const countryCount: { [key: string]: number } = {};
        fighters.forEach(fighter => {
            countryCount[fighter.nation] = (countryCount[fighter.nation] || 0) + 1;
        });

        console.log("Select a country to view its fighters:");
        Object.entries(countryCount).forEach(([country, count]) => {
            console.log(`➤ ${country} (${count})`);
        });

        const selectedCountry = rl.question("Enter the name of the country: ").trim();
        console.log();
        console.log();
        const filteredFighters = fighters.filter(fighter => fighter.nation.toLowerCase() === selectedCountry.toLowerCase());

        if (filteredFighters.length === 0) {
            console.log("No fighters found from this country!");
        } else {
            filteredFighters.forEach(fighter => {
                console.log(`➤ ID: ${fighter.id}`);
                console.log(`➤ Name: ${fighter.name}`);
                console.log(`➤ Nickname: ${fighter.nickname}`);
                console.log(`➤ Age: ${fighter.age}`);
                console.log(`➤ Champion: ${fighter.champion ? chalk.yellow("Yes 🥇") : "No"}`);
                console.log(`➤ Birthdate: ${fighter.birthdate}`);
                console.log(`➤ Nation: ${fighter.nation}`);
                console.log(`➤ Weight Class: ${fighter.weightClass}`);
                console.log(`➤ Record: ${fighter.record}`);
                console.log(`➤ Organizations: ${fighter.foughtInOrganisations.join(", ")}`);
                console.log(`➤ Description: ${fighter.description}`);
                console.log("====================================\n");
            });
        }
    }).catch((error) => {
        console.log("Error fetching data:", error);
    });
}