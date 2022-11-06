class bandMember {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }

    describe() {
        return `${this.name} plays ${this.instrument}.`;
    }
}

class Band {
    constructor(name) {
        this.name = name;
        this.bandMember = [];
    }

    addBandMember(bandMember) {
        if (bandMember instanceof bandMember){
            this.bandMember.push(bandMember);
        } else {
            throw new Error(`You can only add an instance of Band Member. Argument is not a Band Member: ${bandMember}`)
        }
    }

    describe() {
        return `${this.name} has ${this.bandMember.length} Band Members.`
    }
}

class Menu {
    constructor() {
        this.band = [];
        this.selectedBand = null;
    }

    start(){
        let selection = this.showMainMenuOptions();

        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0                   
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!')
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new band
        2) view band
        3) delete band
        4) display all bands
        `);
    }

    showBandMenuOptions(bandInfo) {
        return prompt(`
        0) back
        1) create Band Member
        2) delete Band Member
        ---------------------
        ${bandInfo}
        `);
    }

    displayBands(){
        let bandString = '';
        for (let i = 0; i < this.band.length; i++){
            bandString += i + ') ' + this.band[i].name + '\n';
        }
        alert(bandString);
    }

    createBand(){
        let name = prompt('Enter name for new band:');
        this.band.push(new Band(name));
    }

    viewBand(){
        let index = prompt('Enter the index of the band you wish to view:');
        if (index > -1 && index < this.band.length){
            this.selectedBand = this.band[index];
            let description = 'Band Name: ' +this.selectedBand.name + '\n';
            
            for (let i = 0; i < this.selectedBand.bandMember.length; i++) {
                description += i + ') ' + this.selectedBand.bandMember[i].name + 
                ' - ' + this.selectedBand.bandMember[i].instrument + '\n';

            }

            let selection = this.showBandMenuOptions(description)
            switch (selection) {
                case '1':
                    this.createBandMember();
                    break;
                case '2' :
                    this.deleteBandMember();
                    break;   
            }
        }
    }

    deleteBand(){
        let index = prompt('Enter the index of the band you wish to delete:');
        if (index > -1 && index < this.band.length){
            this.band.splice(index, 1);
        }
    }

    createBandMember(){
        let name = prompt('Enter name for new Band Member:');
        let instrument = prompt ('Enter instrument for new band member:');
        this.selectedBand.bandMember.push(new bandMember (name, instrument));
    }

    deleteBandMember() {
        let index = prompt('Enter the index of the band member you wish to delete:');
        if (index > -1 && index < this.selectedBand.bandMember.length) {
            this.selectedBand.bandMember.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();